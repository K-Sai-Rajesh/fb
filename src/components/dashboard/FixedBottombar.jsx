import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { AccountCircleOutlined, AddCardTwoTone, DashboardOutlined, FolderCopyOutlined, ShieldMoonOutlined } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
// import { getSession } from '../helpers/cookies';/


export default function FixedBottomNavigation() {
    const { pathname } = useLocation()
    // const { user } = getSession()
    const navigate = useNavigate()
    const pathVariable = [
        {
            link: 'admin',
            title: 'admin',
            sub: ['admin'],
            icon: <DashboardOutlined />,
            access: ['admin']
        },
        {
            link: 'add category',
            title: 'add category',
            sub: ['add category'],
            icon: <AddCardTwoTone />,
            access: ['admin']
        },
        {
            link: 'products',
            title: 'products',
            sub: ['products'],
            icon: <FolderCopyOutlined />,
            access: ['admin', 'seller']
        },
        {
            link: 'account',
            title: 'account',
            sub: ['account'],
            icon: <AccountCircleOutlined />,
            access: ['admin', 'seller']
        },
        {
            link: 'profile/basic info',
            title: 'profile',
            sub: ['basic info', 'security'],
            icon: <ShieldMoonOutlined />,
            access: ['admin', 'seller']
        },
    ]
    // .filter(link => link.access.includes(user.role))
    const path = pathname.split('/')[pathname.split('/').length - 1]
    const [value, setValue] = React.useState(pathVariable.map(item => item.title).indexOf(path));
    const ref = React.useRef(null);

    return (
        <Box ref={ref}
            sx={{
                pb: 7,
                display: {
                    xs: 'flex',
                    md: 'none'
                }
            }}
        >
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        const path = pathVariable[newValue].link
                        setValue(newValue);
                        navigate(path === 'auth' ? "" : path)
                    }}
                >
                    {
                        pathVariable.map((path, idx) => {
                            return (
                                <BottomNavigationAction
                                    key={idx}
                                    label={
                                        <Typography
                                            sx={{
                                                textTransform: 'capitalize',
                                                borderRadius: 15,
                                                fontSize: '10px',
                                                fontFamily: 'Raleway',
                                                fontWeight: 'bold',
                                                px: 2
                                            }}
                                        >
                                            {
                                                path.title
                                            }
                                        </Typography>
                                    }
                                    icon={path.icon} />
                            )
                        })
                    }
                </BottomNavigation>
            </Paper>
        </Box>
    );
}