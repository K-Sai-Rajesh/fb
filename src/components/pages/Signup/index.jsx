import { Box, Grid2, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { Outlet, useLocation } from "react-router-dom";

export default function App() {
    const { pathname } = useLocation();
    const path = pathname.split('/')[pathname.split('/').length - 1].replace("%20", ' ')
    //-------stepper

    const steps = ["details", 'location', 'profile picture', 'status'];

    return (
        <Grid2 container>
            <Grid2
                size={{ xs: 12 }}
            >
                <Box
                    sx={{ width: '100%' }}
                    display={steps.includes(path) ? 'flex' : 'none'}
                    flexDirection={'column'}
                    borderBottom={'1px solid #9E9E9E'}
                    py={2}
                >
                    <Stepper
                        orientation="horizontal"
                        sx={{
                            display: { xs: 'none', sm: 'flex' },
                            width: '599px',
                            alignSelf: 'center'
                        }}
                        activeStep={steps.indexOf(path)}
                    >
                        {steps.map((label) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        <Typography
                                            fontFamily={"Raleway"}
                                            fontSize={'12px'}
                                            fontWeight={'bold'}
                                            overflow={'auto'}
                                            textOverflow={'ellipsis'}
                                            color={'#767676'}
                                            textTransform={'capitalize'}
                                        >
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                    <Stepper
                        orientation="vertical"
                        sx={{
                            display: { xs: 'flex', sm: 'none' },
                            alignSelf: 'center'
                        }}
                        activeStep={steps.indexOf(path)}
                    >
                        {steps.map((label) => {
                            const stepProps = {};
                            const labelProps = {};
                            return (
                                <Step key={label} {...stepProps}>
                                    <StepLabel {...labelProps}>
                                        <Typography
                                            fontFamily={"Raleway"}
                                            fontSize={'12px'}
                                            fontWeight={'bold'}
                                            overflow={'auto'}
                                            textOverflow={'ellipsis'}
                                            color={'#767676'}
                                            textTransform={'capitalize'}
                                        >
                                            {label}
                                        </Typography>
                                    </StepLabel>
                                </Step>
                            );
                        })}
                    </Stepper>
                </Box>
            </Grid2>
            <Outlet />
        </Grid2>
    )
}