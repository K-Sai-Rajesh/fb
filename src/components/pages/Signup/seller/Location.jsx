import {
    Map, Marker
} from "pigeon-maps";
import { useEffect, useState } from "react";
import { Box, Chip, Grid2, Stack } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function MyLocation() {
    // eslint-disable-next-line
    const { state } = useLocation()
    const seller = sessionStorage.getItem('seller')
    // eslint-disable-next-line
    const [location, setLocation] = useState(state)
    const navigate = useNavigate()

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition((position) => {
                setLocation(position.coords)
            }, function (e) {
                console.error(e)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,            // Timeout in milliseconds
                maximumAge: 0
            })
        }
    }, [])

    return (
        <Grid2 size={{ xs: 12 }} display={'flex'} justifyContent={'center'}>
            <Box
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
            >
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction={"row"}
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        p: 2,
                        flexGrow: 1
                    }}
                >
                    <Chip
                        label="Cancel"
                        color="error"
                        variant="outlined"
                        onClick={() => navigate(-1)}
                        sx={{
                            width: { xs: '100%', sm: 300, lg: 500 },
                            fontFamily: 'Raleway',
                            fontWeight: 'bold',
                        }}
                    />
                    <Chip
                        label="Next"
                        color="primary"
                        variant="contained"
                        onClick={() => {
                            sessionStorage.setItem('seller', JSON.stringify({ ...JSON.parse(decodeURIComponent(seller)), coords: state }))
                            navigate('/signup/seller/profile picture')
                        }}
                        sx={{
                            width: { xs: '100%', sm: 300, lg: 500 },
                            fontFamily: 'Raleway',
                            fontWeight: 'bold'
                        }}
                    />
                </Stack>
                <Map
                    height={"80vh"}
                    width={window.innerWidth}
                    defaultCenter={[location.latitude, location.longitude]}
                    defaultZoom={15}
                >
                    <Marker width={50} anchor={[location.latitude, location.longitude]} />
                </Map>
            </Box>
        </Grid2>
    );
}
