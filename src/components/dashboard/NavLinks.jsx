import React from 'react'
import { SpaceDashboardRounded } from '@mui/icons-material';

const navLinks = [
    {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <SpaceDashboardRounded />,
        subpath: ['dashboard']
    },
    // {
    //     name: 'Store',
    //     path: '/stores',
    //     icon: <StorefrontSharp />,
    //     subpath: ['add floor cameras', 'add floor camera virtualine', 'stores', 'view', 'create%20store', 'preview', 'edit%20store', 'client%20details', 'store%20details', 'camera%20details', 'virtual%20line']
    // },
    // {
    //     name: 'List',
    //     path: '/organisation',
    //     icon: <AddBusinessRounded />,
    //     subpath: ['organisation', 'company', 'create%20organisation', 'update%20organisation', 'create%20company', 'update%20company']
    // },
    // {
    //     name: 'Users',
    //     path: '/users',
    //     icon: <Person />,
    //     subpath: ['users', 'create%20user', 'update%20user']
    // }
]
export default navLinks