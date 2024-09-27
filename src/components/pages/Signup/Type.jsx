import { Chip, Grid2, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Type() {
    const navigate = useNavigate()
    const { header, footer } = useSelector(state => state.load)
    return (
        <Grid2
            size={{ xs: 12 }}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: `${window.innerHeight - (header?.offsetHeight + footer?.offsetHeight)}px`,
            }}
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
                    label="Customer"
                    color="primary"
                    variant="outlined"
                    onClick={() => navigate('customer/details')}
                    sx={{
                        width: { xs: '100%', sm: 300, lg: 500 },
                        fontFamily: 'Raleway',
                        fontWeight: 'bold'
                    }}
                />
                <Chip
                    label="Seller"
                    color="secondary"
                    variant="contained"
                    onClick={() => navigate('seller/details')}
                    sx={{
                        width: { xs: '100%', sm: 300, lg: 500 },
                        fontFamily: 'Raleway',
                        fontWeight: 'bold',
                    }}
                />
            </Stack>
        </Grid2 >
    )
}