import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import { AppBar } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';
import HeaderNavbar from './HeaderNavbar';
import SwipeableEdgeDrawer from './Drawer';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
}));

export default function Home() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <CssBaseline /> */}
            <AppBar position="fixed" sx={{ backgroundColor: '#111' }}>
                <HeaderNavbar toggleDrawer={toggleDrawer} setOpen={setOpen} />
            </AppBar>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <DrawerHeader />
                <Outlet />
                <SwipeableEdgeDrawer toggleDrawer={toggleDrawer} open={open} />
                <Footer />
            </Box>
        </Box>
    );
}