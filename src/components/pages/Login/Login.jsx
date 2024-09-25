import { CardMedia, Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import CustomInputField from "../../../common/CustomInputField";
import { button } from "../../../helpers/features";
import bg from '../../../assets/images/Login.jpg'

export default function Login() {

    return (
        <Grid2 container px={3} columnSpacing={1} py={1}>
            <Grid2 component={Paper} p={2} elevation={10} size={{ xs: 12, lg: 5 }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
                <Stack
                    spacing={{ xs: 1 }}
                    direction="column"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2
                    }}
                >
                    <Typography
                        fontFamily={'Raleway'}
                        color="#aaa"
                        fontWeight={'bold'}
                    >
                        Welcome to
                    </Typography>
                    <Typography
                        fontFamily={'Raleway'}
                        fontSize={'20px'}
                        color="#111"
                        fontWeight={'bold'}
                    >
                        futureBazaar
                    </Typography>
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
                    <CustomInputField
                        label={'Email Address'}
                    />
                    <CustomInputField
                        label={'Password'}
                    />
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
                        <Chip label="Login" sx={button} onClick={() => { }} />
                        <Chip label="Back" sx={{ ...button, backgroundColor: 'transparent', color: '#C62828', textDecorationLine: 'underline' }} onClick={() => { }} />
                    </Stack>
                </Stack>
            </Grid2>
            <Grid2 size={{ xs: 12, lg: 7 }} sx={{ display: { xs: 'none', lg: 'block' } }}>
                <CardMedia
                    image={bg}
                    sx={{
                        height: 500
                    }}
                />
            </Grid2>
        </Grid2>
    )
}