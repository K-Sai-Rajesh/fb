import { Avatar, Grid2, IconButton, Link, Stack, Typography } from "@mui/material";
import { Google, Instagram, WhatsApp } from '@mui/icons-material';
import { useEffect, useRef } from "react";
import { setfooter } from "../../reducers/slices/loading";
import { useDispatch } from "react-redux";
import logo from '../../assets/images/futurebazaar.png'

export default function Footer() {
    const socialMedia = [
        {
            icon: <Instagram sx={{ color: '#fff' }} />,
            link: 'https://www.instagram.com/srdoomsd?igsh=MWxrYXB3Y3RyOGxucg=='
        },
        {
            icon: <Google sx={{ color: '#fff' }} />,
            link: 'https://mail.google.com/mail/?view=cm&to=futurebazaar@gmail.com'
        },
        {
            icon: <WhatsApp sx={{ color: '#fff' }} />,
            link: 'https://api.whatsapp.com/send/?phone=8109636689'
        }
    ]
    const dispatch = useDispatch()
    const footer = useRef()

    useEffect(() => {
        dispatch(setfooter(footer.current))
    }, [footer])
    return (
        <Grid2 ref={footer} container sx={{ backgroundColor: '#111', p: 2 }}>
            <Grid2
                size={{ xs: 12 }}
                display={'flex'}
                justifyContent={'center'}
            >
                <Avatar
                    src={logo}
                    sx={{
                        width: 46,
                        height: 46
                    }}
                />
            </Grid2>
            <hr style={{ width: '100%', backgroundColor: '#aaa', color: '#aaa' }} />
            <Grid2 size={{ xs: 12 }}>
                <br />
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start"
                    }}
                >
                    {
                        socialMedia?.map((icon, idx) => (
                            <IconButton key={idx} href={`${icon?.link}`} target="_blank">
                                {
                                    icon?.icon
                                }
                            </IconButton>
                        ))
                    }
                </Stack>
                <br />
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start"
                    }}
                >
                    <Typography variant="body2" sx={{ color: '#aaa', fontFamily: 'Raleway', fontWeight: 'bold' }}>
                        {'Copyright © '}
                        <Link color="#aaa" href="https://futurebazaar.store" target={'_blank'}>
                            futureBazaar
                        </Link>
                        &nbsp;
                        {new Date().getFullYear()}
                    </Typography>
                </Stack>
                <br />
            </Grid2>
        </Grid2>
    )
}