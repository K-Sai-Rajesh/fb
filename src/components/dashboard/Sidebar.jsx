import React from 'react'
import { useNavigate } from 'react-router-dom/dist';
import { useLocation } from 'react-router-dom'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import navLinks from './NavLinks';
import { Tooltip, Typography } from '@mui/material';

const SideNav = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const activePage = location.pathname;
    const splitPath = activePage.split('/');
    const subPath = splitPath[splitPath.length - 1].replaceAll("%20", " ");

    return (
        <List
            sx={{
                backgroundColor: '#111',
                color: '#ffffff',
                height: `100%`,
                alignItems: 'center',
                overflowY: 'auto',
            }}
        >
            {navLinks?.map((text, index) => (
                <ListItem key={index} selected={text?.subpath?.includes(subPath)} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            backgroundColor: text?.subpath?.includes(subPath) ? '#767676' : '#273143',
                            minHeight: 40,
                            justifyContent: 'center',
                            px: 1.5,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        onClick={() => navigate(`${text.path}`)}
                    >
                        <Tooltip title={text?.name} arrow>
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    justifyContent: 'center',
                                    color: '#ffffff',
                                    alignItems: 'center',
                                }}
                            >
                                {text?.icon}
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText
                            sx={{ opacity: 1 }}
                            primary={
                                <Typography fontSize={9}>
                                    {text.name}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    )
}

export default SideNav