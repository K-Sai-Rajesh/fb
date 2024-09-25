import * as React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Breadcrumbs, Chip, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { button } from '../../helpers/features';

const drawerBleeding = 56;

const StyledBox = styled('div')(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[800],
    }),
}));

const Puller = styled('div')(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
    ...theme.applyStyles('dark', {
        backgroundColor: grey[900],
    }),
}));

function SwipeableEdgeDrawer({ window, open, toggleDrawer }) {

    // This is used only for the example
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            {/* <CssBaseline /> */}
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(50% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                container={container}
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <StyledBox
                    sx={{
                        position: 'absolute',
                        top: -drawerBleeding,
                        borderRadius: 8,
                        visibility: 'visible',
                        right: 0,
                        left: 0,
                        display: { xs: 'flex', md: 'none' }
                    }}
                >
                    <Puller />
                </StyledBox>
                <StyledBox sx={{ height: '100%', overflow: 'auto', py: 5, backgroundColor: grey[900] }}>
                    <Stack
                        spacing={{ xs: 1 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap',
                            justifyContent: "center",
                            alignItems: "start",
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
                    <br />
                    <Stack
                        spacing={{ xs: 1 }}
                        direction="row"
                        useFlexGap
                        sx={{
                            flexWrap: 'wrap',
                            justifyContent: "center",
                            alignItems: "start",
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
                </StyledBox>
            </SwipeableDrawer>
        </>
    );
}

SwipeableEdgeDrawer.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default SwipeableEdgeDrawer;
