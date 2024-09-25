import { Grid2, IconButton, Link, Stack, Typography } from "@mui/material";
import { Google, Instagram } from '@mui/icons-material';

export default function Footer() {
    const socialMedia = [
        {
            icon: <Instagram sx={{ color: '#fff' }} />,
            link: 'https://www.instagram.com/srdoomsd?igsh=MWxrYXB3Y3RyOGxucg=='
        },
        {
            icon: <Google sx={{ color: '#fff' }} />,
            link: 'https://mail.google.com/mail/?view=cm&to=futurebazaar@gmail.com'
        }
    ]
    return (
        <Grid2 container sx={{ backgroundColor: '#111', p: 2 }}>
            <Grid2
                size={{ xs: 12 }}
                display={'flex'}
                justifyContent={'center'}
            >
                <Typography
                    fontFamily={'Raleway'}
                    color="#aaa"
                    fontWeight={'bold'}
                >
                    futureBazaar
                </Typography>
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