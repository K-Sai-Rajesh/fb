import { Chip, Grid2, Stack } from "@mui/material";
import * as Yup from 'yup';
import CustomInputField from "../../../../common/CustomInputField";
import React from "react";
import { useFormik } from "formik";
import { customerFields } from "../../../../helpers/features";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadoff, loadon } from "../../../../reducers/slices/loading";
import { snackon } from "../../../../reducers/slices/snackbar";

export default function Customer() {
    const customer = sessionStorage.getItem('customer')
    const { header, footer } = useSelector(state => state.load)
    const [initialValues, setInitialValues] = React.useState({})
    const [initialSchema, setInitialSchema] = React.useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        try {
            sessionStorage.setItem('customer', JSON.stringify({ ...JSON.parse(decodeURIComponent(customer)), ...register.values }))
            if (navigator.geolocation) {
                dispatch(loadon(true))
                navigator.geolocation.getCurrentPosition((position) => {
                    console.log(position.coords)
                    dispatch(loadoff(false))
                    navigate("/signup/customer/location", {
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
                    dispatch(loadoff(false))
                    dispatch(snackon({ message: "Unable to fetch your location ! Please reload.", color: 'warning' }))
                }, {
                    enableHighAccuracy: true,
                    timeout: 2000,            // Timeout in milliseconds
                    maximumAge: 0
                })
            }
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

    function SetRegister() {
        let initial = {}
        let validateSchema = {}
        // eslint-disable-next-line
        customerFields?.forEach(field => {
            initial[field?.name] = customer === null ? "" : JSON.parse(decodeURIComponent(customer))[field?.name]
            validateSchema[field?.name] = field?.name === 'gst' ? "" : field.error

        })

        setInitialValues(initial)
        setInitialSchema(validateSchema)
    }
    React.useEffect(() => {
        SetRegister()
        // eslint-disable-next-line
    }, [])

    return (
        <Grid2 size={{ xs: 12 }} p={2} sx={{ height: `${window.innerHeight - (header?.offsetHeight + footer?.offsetHeight)}px`, }}>
            <Grid2 container p={2} columnSpacing={2} rowGap={2}>
                {
                    customerFields?.map((field, index) => (
                        <Grid2
                            key={index}
                            size={{
                                xs: field.xs,
                                sm: field.sm,
                                md: field.md,
                                lg: field.lg
                            }}
                            display={'flex'}
                            flexGrow={1}
                        >
                            <CustomInputField
                                id={`${index}`}
                                key={`${index}-${field.name}`}
                                label={field.label}
                                name={field.name}
                                type={field.type}
                                size="small"
                                variant="outlined"
                                value={register.values[field.name] || ""}
                                disabled={field.disable}
                                fullWidth
                                aria-label={field.label.toLocaleLowerCase()}
                                sx={{ fontFamily: 'Raleway' }}
                                onChange={register.handleChange}
                                error={
                                    register.errors[field.name] && register.touched[field.name]
                                }
                                errormessage={
                                    register.errors[field.name] && register.touched[field.name]
                                        ? register.errors[field.name]
                                        : ""
                                }
                            />
                        </Grid2>
                    ))
                }
                <Grid2 size={{ xs: 12 }}>
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
                            onClick={register.handleSubmit}
                            sx={{
                                width: { xs: '100%', sm: 300, lg: 500 },
                                fontFamily: 'Raleway',
                                fontWeight: 'bold'
                            }}
                        />
                    </Stack>
                </Grid2>
            </Grid2>
        </Grid2>
    )
}