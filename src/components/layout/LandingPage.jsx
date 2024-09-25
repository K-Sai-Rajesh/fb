import { Avatar, Box, Card, CardContent, CardMedia, Grid2, IconButton, Stack, Typography } from "@mui/material";
import logo from '../../assets/images/ecombg.png'
import React from "react";

export default function LandingPage() {
    const cards = [
        {
            title: 'Mercedes - DataTrack',
            description: 'This application is designed to record data points of subjects participating In the Mercedes driving inspection strategy.During this process, Mercedes agents collect various data applicable to different driving scenario.​',
            image: 'https://www.codexosoftware.com/assets/img/ecommerce-development.png'
        },
        {
            title: 'Avanta - Generative AI',
            description: 'The Avanta AI solution leverages cutting-edge generative AI algorithms, optimized with Intel® technology, to revamp the customer experience through enhanced, life-like, digital interactions.​',
            image: 'https://www.codexosoftware.com/assets/img/ecommerce-development.png'
        },
        {
            title: 'Vdeolytics- Retail/Store Analysis',
            description: 'Vdeolytics enhances store operations and customer experiences using CCTV-based analytics and computer vision to track guest demographics, detect brands, and monitor foot traffic.employee behavior, and overall security.',
            image: 'https://www.codexosoftware.com/assets/img/ecommerce-development.png'
        },
        {
            title: 'Vdeolytics- Retail/Store Analysis',
            description: 'Vdeolytics enhances store operations and customer experiences using CCTV-based analytics and computer vision to track guest demographics, detect brands, and monitor foot traffic.employee behavior, and overall security.',
            image: 'https://www.codexosoftware.com/assets/img/ecommerce-development.png'
        }
    ]

    return (
        <Grid2 container>
            <Grid2
                size={{ xs: 12 }}
                sx={{
                    borderBottom: '1px solid #aaa'
                }}
            >
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: 'center',
                        py: 2
                    }}
                >
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography variant="h6" align="center" color="#aaa" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            Sellers
                        </Typography>
                        <Typography variant="h3" align="center" color="#2196F3" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            10
                        </Typography>
                        <Avatar
                            src={logo}
                            sx={{
                                width: 145,
                                height: 145
                            }}
                        />
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography variant="h6" align="center" color="#aaa" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            Customers
                        </Typography>
                        <Typography variant="h3" align="center" color="#2196F3" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            10
                        </Typography>
                        <Avatar
                            src={logo}
                            sx={{
                                width: 145,
                                height: 145
                            }}
                        />
                    </Box>
                    <Box
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Typography variant="h6" align="center" color="#aaa" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            Products
                        </Typography>
                        <Typography variant="h3" align="center" color="#2196F3" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                            10
                        </Typography>
                        <Avatar
                            src={logo}
                            sx={{
                                width: 145,
                                height: 145
                            }}
                        />
                    </Box>
                </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12 }} py={{ xs: 5 }}>
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3" align="center" color="#2196F3" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        Categories
                    </Typography>
                </Stack>
                <Stack
                    spacing={{
                        xs: 1,
                        sm: 1
                    }}
                    direction="row"
                    rowGap={2}
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        justifyContent: 'center',
                        width: '100%',
                        p: 1
                    }}
                >
                    <IconButton>
                        <Avatar
                            src="https://www.codexosoftware.com/assets/img/ecommerce-development.png"
                            sx={{
                                width: 145,
                                height: 145
                            }}
                        />
                    </IconButton>
                </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12 }} py={{ xs: 5 }}>
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3" align="center" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        Our <span style={{ color: "#2196F3" }}>Partners</span>
                    </Typography>
                </Stack>
                <Stack
                    spacing={{
                        xs: 1,
                        sm: 1
                    }}
                    direction="row"
                    rowGap={2}
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        justifyContent: 'center',
                        width: '100%',
                        p: 1
                    }}
                >
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                flexShrink: 0,
                                width: { xs: 300, sm: 280, md: 300, lg: 400 },
                                borderRadius: '16px',
                            }}
                            elevation={4}
                        >
                            <CardMedia
                                sx={{ width: '100%', height: { xs: 100, sm: 130 } }}
                                image={card.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    fontSize={'1.2rem'}
                                    component="div"
                                    color={'#2196F3'}
                                    fontWeight={'bold'}
                                    fontFamily={'Raleway'}
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    fontSize={'0.7rem'}
                                    fontWeight={'bold'}
                                    fontFamily={'Raleway'}
                                    color={'grey'}
                                >
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Grid2>

            <Grid2 size={{ xs: 12 }} py={{ xs: 5 }}>
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography variant="h3" color="#2196F3" align="center" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        Products
                    </Typography>
                </Stack>
                <Stack
                    spacing={{
                        xs: 1,
                        sm: 1
                    }}
                    direction="row"
                    rowGap={2}
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        justifyContent: 'center',
                        width: '100%',
                        p: 1
                    }}
                >
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                flexShrink: 0,
                                width: { xs: 300, sm: 280, md: 300, lg: 400 },
                                borderRadius: '16px',
                            }}
                            elevation={4}
                        >
                            <CardMedia
                                sx={{ width: '100%', height: { xs: 100, sm: 130 } }}
                                image={card.image}
                                title="green iguana"
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    fontSize={'1.2rem'}
                                    component="div"
                                    color={'#2196F3'}
                                    fontWeight={'bold'}
                                    fontFamily={'Raleway'}
                                >
                                    {card.title}
                                </Typography>
                                <Typography
                                    gutterBottom
                                    variant="body2"
                                    fontSize={'0.7rem'}
                                    fontWeight={'bold'}
                                    fontFamily={'Raleway'}
                                    color={'grey'}
                                >
                                    {card.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Grid2>
        </Grid2>
    )
}