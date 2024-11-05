import { Avatar, Box, Breadcrumbs, Chip, IconButton, Stack, Toolbar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { LogoutOutlined, SpaceDashboardOutlined } from "@mui/icons-material";
import { useRef } from "react";
import logo from '../../assets/images/futurebazaar.png'
import { clearSession } from "../../helpers/cookies";

export default function Header({ setOpen }) {

    const dashboardheader = useRef();
    const navigate = useNavigate();

    return (
        <Toolbar ref={dashboardheader} sx={{ display: 'flex', justifyContent: 'space-between' }}>
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
                            onClick={() => clearSession(true)}
                            style={{
                                textDecorationLine: 'none'
                            }}
                        >
                            <Chip label="Logout" color="primary" variant="contained" />
                        </Link>
                    </Breadcrumbs>
                </Stack>
                <IconButton
                    onClick={() => clearSession(true)}
                    sx={{
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <LogoutOutlined sx={{ color: '#fff' }} />
                </IconButton>
            </Box>
        </Toolbar>
    )
}