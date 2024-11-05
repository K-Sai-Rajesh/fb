import { Avatar, Box, Chip, Grid2, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { Carousel } from "../../layout/LandingPage";
import { button, images } from "../../../helpers/features";
import { LocationOnOutlined, WhatsApp } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { config } from "../../../helpers/config";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function SellerPage() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { profile_url, phone, shop_name, lat, long } = state

    return (
        <Grid2 container>
            <Grid2 size={{ xs: 12 }}>
                <Box
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                >
                    <img
                        src={`${config.BASE_URL}${profile_url}`}
                        style={{
                            height: 300
                        }}
                    />
                </Box>
                <br />
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="column"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        <span style={{ color: "#2196F3" }}>{shop_name}</span>
                    </Typography>
                    <Box flexGrow={1} width={{ xs: '100%', lg: '50%' }}>
                        <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                            <Stack px={3} spacing={2} direction="row" sx={{ justifyContent: 'end', alignItems: 'center' }}>
                                <Box display={'flex '} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <IconButton
                                        href={`https://wa.me/${phone}`}
                                    >
                                        <Avatar sx={{ backgroundColor: '#111111' }}>
                                            <WhatsApp />
                                        </Avatar>
                                    </IconButton>
                                    <IconButton onClick={() => navigate('/location', { state: { latitude: lat, longitude: long } })}>
                                        <Avatar sx={{ backgroundColor: '#111111' }}>
                                            <LocationOnOutlined />
                                        </Avatar>
                                    </IconButton>
                                </Box>
                            </Stack>
                        </Item>
                    </Box>
                </Stack>
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start",
                        p: 2
                    }}
                >
                    <Chip label="Back" sx={{ ...button, backgroundColor: '#111', color: '#fff', ':hover': { color: '#111' } }} onClick={() => navigate(-1)} />
                </Stack>
            </Grid2>
        </Grid2>
    )
}