import { Box, Chip, Fab, Grid2, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import { button, sellerField } from "../../../helpers/features";
import CustomInputField from "../../../common/CustomInputField";
import React, { useEffect } from "react";
import * as Yup from 'yup';
import { useFormik } from 'formik'
import { snackon } from "../../../reducers/slices/snackbar";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { MyLocationOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import CustomSelectField from "../../../common/CustomSelectField";

export default function Signup() {
    const [show, setShow] = React.useState(false)
    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [initialValues, setInitialValues] = React.useState({})
    const [initialSchema, setInitialSchema] = React.useState({})

    const handleSubmit = async () => {
        try {
            if (register?.values?.phone?.toString()?.length < 10) {
                dispatch(snackon({ message: "Phone Number Cannot be less than 10 Digits !", color: 'warning' }))
                return
            }
            if (register?.values?.phone?.toString()?.length > 10) {
                dispatch(snackon({ message: "Phone Number Cannot be less than 10 Digits !", color: 'warning' }))
                return
            }
            // await dispatch(Register({ ...register?.values, role: seller ? 'seller' : 'customer' }))
        } catch (e) {
            console.error(e)
        }
    };

    const register = useFormik({
        initialValues: initialValues,
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape(initialSchema),
    })

    function ResetFields() {
        try {
            let initial = {}
            let validateSchema = {}
            // eslint-disable-next-line
            sellerField?.forEach(keys => {
                initial[keys?.id] = ""
                validateSchema[keys?.id] = keys.id === "gst" ? "" : keys.error
            })
            initial['latitude'] = state?.latitude
            initial['longitude'] = state?.longitude
            initial['error'] = state?.accuracy

            setInitialValues(initial)
            setInitialSchema(validateSchema)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        ResetFields()
        // eslint-disable-next-line
    }, [])

    function Locate() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log(position.coords)
                navigate("/map", {
                    state: {
                        accuracy
                            :
                            position.coords.accuracy,
                        altitude
                            :
                            position.coords.altitude,
                        altitudeAccuracy
                            :
                            position.coords.altitudeAccuracy,
                        heading
                            :
                            position.coords.heading,
                        latitude
                            :
                            position.coords.latitude,
                        longitude
                            :
                            position.coords.longitude,
                        speed
                            :
                            position.coords.speed
                    }
                })
            }, function (e) {
                console.error(e)
            }, {
                enableHighAccuracy: true,
                timeout: 5000,            // Timeout in milliseconds
                maximumAge: 0
            })
        }
    }

    return (
        <Grid2 container>
            <Grid2 component={Paper} p={2} elevation={10} size={{ xs: 12 }} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
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
                        alignItems: "center",
                        p: 2,
                    }}
                >
                    {
                        sellerField?.map((key, idx) => (
                            <Box key={idx} width={300}>
                                {
                                    key.isList ?
                                        <CustomSelectField
                                            name={key?.id}
                                            label={key?.label}
                                            type={key?.type === 'password' ? show ? "text" : key?.type : key?.type}
                                            variant="outlined"
                                            value={register.values.category}
                                            onChange={register.handleChange}
                                            onBlur={register.handleBlur}
                                            fullWidth
                                            size='large'
                                            sx={{
                                                fontFamily: 'Raleway',
                                                fontWeight: 'bold !important',
                                                color: '#707070',
                                                fontSize: '14px'
                                            }}
                                            error={
                                                register.errors.category && register.touched.category
                                            }
                                            errormessage={
                                                register.errors.category && register.touched.category
                                                    ? register.errors.category
                                                    : ""
                                            }
                                        >
                                            <option value={""}>Select</option>
                                            <option value={"1"}>Select-1</option>

                                            {/* {categories?.map((option, idx) => {
                                                return <option key={idx} value={option.title}>{option.title}</option>
                                            })} */}
                                        </CustomSelectField> :
                                        <CustomInputField
                                            autoComplete={key?.label}
                                            name={key?.id}
                                            required
                                            fullWidth
                                            id={key?.id}
                                            label={key?.label}
                                            type={key?.type === 'password' ? show ? "text" : key?.type : key?.type}
                                            value={register?.values[key?.id] ? register?.values[key?.id] : ''}
                                            onChange={register.handleChange}
                                            error={
                                                register.errors[key?.id] && register.touched[key?.id]
                                            }
                                            errormessage={
                                                register.errors[key?.id] && register.touched[key?.id]
                                                    ? register.errors[key?.id]
                                                    : ""
                                            }
                                            endAdornment={
                                                key.id === "password" &&
                                                <InputAdornment
                                                    position="end"
                                                    aria-label="toggle password visibility"
                                                    sx={{
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() => setShow(!show)}
                                                    edge="end"
                                                >
                                                    {
                                                        show ?
                                                            <VisibilityOff sx={{ width: 40 }} /> :
                                                            <Visibility sx={{ width: 40 }} />
                                                    }
                                                </InputAdornment>
                                            }
                                            onInput={(e) => {

                                                if (key?.id === "phone" || key?.id === "shopPhoneNumber") {
                                                    if (e.target.value?.length > 10)
                                                        e.target.value = register?.values[key?.id]
                                                    else if (e.target.value?.length > 10)
                                                        register.setErrors(key?.id, "Cannot be less than 10 digits !")

                                                }
                                            }}
                                            autoFocus
                                            size='small'
                                            sx={{
                                                fontFamily: 'Raleway',
                                                fontWeight: 'bold !important'
                                            }}
                                        />
                                }
                            </Box>
                        ))
                    }
                </Stack>
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                        p: 2
                    }}
                >
                    <Chip label="Submit" sx={button} onClick={register?.handleSubmit} />
                    <Chip label="Back" sx={{ ...button, backgroundColor: 'transparent', color: '#C62828', textDecorationLine: 'underline' }} onClick={() => { }} />
                    <Fab
                        color="primary"
                        aria-label="location"
                        onClick={() => Locate()}
                    >
                        <MyLocationOutlined />
                    </Fab>
                </Stack>
            </Grid2>
        </Grid2>
    )
}