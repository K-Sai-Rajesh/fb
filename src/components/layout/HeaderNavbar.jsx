import { Box, Breadcrumbs, Chip, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { button } from "../../helpers/features";
import { SpaceDashboardOutlined } from "@mui/icons-material";

export default function HeaderNavbar({ setOpen }) {
    return (
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography
                fontFamily={'Raleway'}
                color="#aaa"
                fontWeight={'bold'}
            >
                futureBazaar
            </Typography>
            <Box
                display={'flex'}
                alignItems={'center'}
                columnGap={4}
            >
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start",
                        display: { xs: 'none', md: 'flex' }
                    }}
                >
                    <Link
                        to={'/'}
                        style={{
                            textDecorationLine: 'none'
                        }}
                    >
                        <Typography
                            fontFamily={'Raleway'}
                            color="#aaa"
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            textTransform={'capitalize'}
                            sx={{
                                cursor: 'pointer'
                            }}
                        >
                            home
                        </Typography>
                    </Link>
                </Stack>

                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start",
                        display: { xs: 'none', md: 'flex' }
                    }}
                >
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: '#fff' }}>
                        <Link
                            to={'/login'}
                            style={{
                                textDecorationLine: 'none'
                            }}
                        >
                            <Chip label="Login" sx={button} />
                        </Link>
                        <Link
                            to={'/signup'}
                            style={{
                                textDecorationLine: 'none'
                            }}
                        >
                            <Chip label="Sign Up"
                                sx={{
                                    backgroundColor: 'transparent',
                                    color: '#fff',
                                    textDecorationLine: 'underline'
                                }}
                            />
                        </Link>
                    </Breadcrumbs>
                </Stack>
                <IconButton
                    onClick={() => setOpen(true)}
                    sx={{
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <SpaceDashboardOutlined sx={{ color: '#fff' }} />
                </IconButton>
            </Box>
        </Toolbar>
    )
}