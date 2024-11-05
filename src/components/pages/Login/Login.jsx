import { CardMedia, Chip, Grid2, Paper, Stack, Typography } from "@mui/material";
import CustomInputField from "../../../common/CustomInputField";
import { button } from "../../../helpers/features";
import bg from '../../../assets/images/Login.jpg'
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useDispatch } from "react-redux";
import { signIn } from "../../../reducers/slices/login";
import { useNavigate } from "react-router-dom";
// import { snackon } from "../../../reducers/slices/snackbar";

export default function Login() {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    async function handleSubmit() {
        try {
            await dispatch(signIn({ params: register.values, navigate }))
        } catch (e) {
            console.error(e)
        }
        console.log(register.values)
    }

    const register = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            username: Yup.string().required("Field can't be empty !"),
            password: Yup.string().required("Field can't be empty !")
        }),
    })

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
                        label={'User Name'}
                        name={'username'}
                        type={'text'}
                        size="small"
                        variant="outlined"
                        value={register.values.username}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.username && register.touched.username
                        }
                        errormessage={
                            register.errors.username && register.touched.username
                                ? register.errors.username
                                : ""
                        }
                    />
                    <CustomInputField
                        label={'Password'}
                        name={'password'}
                        type={'password'}
                        size="small"
                        variant="outlined"
                        value={register.values.password}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.password && register.touched.password
                        }
                        errormessage={
                            register.errors.password && register.touched.password
                                ? register.errors.password
                                : ""
                        }
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
                        <Chip label="Login" color="primary" onClick={register.handleSubmit} />
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