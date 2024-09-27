import { Avatar, Box, Breadcrumbs, Chip, IconButton, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { button } from "../../helpers/features";
import { SpaceDashboardOutlined } from "@mui/icons-material";
import { useEffect, useRef } from "react";
import { setheader } from "../../reducers/slices/loading";
import { useDispatch } from "react-redux";
import logo from '../../assets/images/futurebazaar.png'

export default function HeaderNavbar({ setOpen }) {

    const header = useRef()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setheader(header.current))
    }, [header])

    return (
        <Toolbar ref={header} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <IconButton>
                <Avatar
                    src={logo}
                    onClick={() => navigate('/')}
                    sx={{
                        width: 46,
                        height: 46
                    }}
                />
            </IconButton>
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
                                    textDecorationLine: 'underline',
                                    fontFamily: 'Raleway',
                                    fontWeight: 'bold'
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