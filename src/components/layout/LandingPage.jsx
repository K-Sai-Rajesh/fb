import { Avatar, Box, Card, CardContent, CardHeader, CardMedia, Divider, Fab, Grid2, IconButton, Stack, Typography } from "@mui/material";
import logo from '../../assets/images/sellerbg.jpg'
import React, { useEffect, useRef, useState } from "react";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, LocationOnOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { images } from "../../helpers/features";

export const scrollStyling = {
    ":: -webkit-scrollbar": {
        width: "13px",
        height: "0px"
    },

    ":: -webkit-scrollbar-thumb": {
        background: "linear-gradient(13deg, #f9d4ff 14 %, #c7ceff 64 %)",
        borderRadius: "10px"
    },

    ":: -webkit-scrollbar-thumb:hover": {
        background: "linear - gradient(13deg, #c7ceff 14 %, #f9d4ff 64 %)"
    },

    ":: -webkit-scrollbar-track": {
        background: "#aaa",
        borderRadius: "10px",
        boxShadow: "inset 7px 10px 12px #f0f0f0"
    },
    flexWrap: 'no-wrap',
    overflow: 'auto',
    scrollBehavior: 'smooth',
    width: `${window.innerWidth}px`
}

export const scroll = (ref, scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
};

export const Carousel = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    useEffect(() => {
        try {
            setInterval(() => { nextImage() }, 2000)
        } catch (e) {
            console.error(e)
        }
        // eslint-disable-next-line
    }, [])

    const prevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <Box style={{ position: 'relative', width: '100%', margin: 'auto' }}>
            <Fab
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '20px'
                }}
                onClick={prevImage}
            >
                <ArrowBackIosNewOutlined />
            </Fab>
            <img
                src={images[currentIndex]}
                alt={`new source ${currentIndex + 1}`}
                style={{ width: '100%', height: '70vh' }}
            />
            <Fab
                sx={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px'
                }}
                onClick={nextImage}
            >
                <ArrowForwardIosOutlined />
            </Fab>
        </Box>
    );
};

export default function LandingPage() {
    const containerRef = useRef()
    const categoryRef = useRef()
    const navigate = useNavigate()

    const cards = [
        {
            title: 'Mercedes - DataTrack',
            description: 'This application is designed to record data points of subjects participating In the Mercedes driving inspection strategy.During this process, Mercedes agents collect various data applicable to different driving scenario.​',
            image: logo
        },
        {
            title: 'Avanta - Generative AI',
            description: 'The Avanta AI solution leverages cutting-edge generative AI algorithms, optimized with Intel® technology, to revamp the customer experience through enhanced, life-like, digital interactions.​',
            image: logo
        },
        {
            title: 'Vdeolytics- Retail/Store Analysis',
            description: 'Vdeolytics enhances store operations and customer experiences using CCTV-based analytics and computer vision to track guest demographics, detect brands, and monitor foot traffic.employee behavior, and overall security.',
            image: logo
        },
        {
            title: 'Vdeolytics- Retail/Store Analysis',
            description: 'Vdeolytics enhances store operations and customer experiences using CCTV-based analytics and computer vision to track guest demographics, detect brands, and monitor foot traffic.employee behavior, and overall security.',
            image: logo
        }
    ]
    const category = [
        {
            category: 'Furniture',
            image: 'https://www.codexosoftware.com/assets/img/ecommerce-development.png'
        }
    ]

    return (
        <Grid2 container>

            <Grid2 size={{ xs: 12 }}>
                <Carousel images={images} />
            </Grid2>

            <Grid2 size={{ xs: 12 }} py={{ xs: 2 }} position={'relative'}>
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
                <Fab
                    sx={{
                        position: 'absolute',
                        top: 170,
                        left: 50
                    }}
                    onClick={() => scroll(categoryRef, -300)}
                >
                    <ArrowBackIosNewOutlined />
                </Fab>
                <Stack
                    spacing={{
                        xs: 1,
                        sm: 1
                    }}
                    direction="row"
                    ref={categoryRef}
                    rowGap={2}
                    divider={<Divider orientation="vertical" sx={{ backgroundColor: '#aaa' }} flexItem />}
                    useFlexGap
                    sx={scrollStyling}
                >&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                    {
                        category?.map((category, index) => (
                            <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                <Typography variant="h6" align="center" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                                    <span style={{ color: "#2196F3" }}>{category?.category}</span>
                                </Typography>
                                <IconButton
                                    key={index}
                                    onClick={() => navigate(`/category/${category?.category}`)}
                                >
                                    <Avatar
                                        src={category?.image}
                                        sx={{
                                            width: 145,
                                            height: 145
                                        }}
                                    />
                                </IconButton>
                            </Box>
                        ))
                    }
                </Stack>
                <Fab
                    sx={{
                        position: 'absolute',
                        top: 170,
                        right: 50
                    }}
                    onClick={() => scroll(categoryRef, 300)}
                >
                    <ArrowForwardIosOutlined />
                </Fab>
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
                        py: 1
                    }}
                >
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                flexShrink: 0,
                                width: { xs: 300, sm: 280, md: 300, lg: 400 },
                                borderRadius: '16px',
                                cursor: 'pointer'
                            }}
                            elevation={4}
                            onClick={() => navigate(`/product/${card?.title}`)}
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

            <Grid2 size={{ xs: 12 }} position={'relative'}>
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
                <Fab
                    sx={{
                        position: 'absolute',
                        top: 200,
                        left: 50
                    }}
                    onClick={() => scroll(containerRef, -300)}
                >
                    <ArrowBackIosNewOutlined />
                </Fab>
                <Stack
                    spacing={{
                        xs: 1,
                        sm: 1
                    }}
                    ref={containerRef}
                    className="myscrollbar"
                    direction="row"
                    rowGap={2}
                    useFlexGap
                    py={2}
                    sx={scrollStyling}
                >&emsp;
                    {cards.map((card, index) => (
                        <Card
                            key={index}
                            sx={{
                                flexShrink: 0,
                                width: { xs: 300, sm: 280, md: 300, lg: 400 },
                                borderRadius: '16px',
                                position: 'relative',
                                cursor: 'pointer'
                            }}
                            elevation={4}
                            onClick={() => navigate(`/seller/${card?.title}`)}
                        >
                            <CardHeader
                                sx={{
                                    position: 'absolute',
                                    right: 0
                                }}
                                action={
                                    <IconButton>
                                        <Avatar sx={{ backgroundColor: '#111111' }}>
                                            <LocationOnOutlined />
                                        </Avatar>
                                    </IconButton>
                                }
                            />
                            <CardMedia
                                sx={{ width: '100%', height: { xs: 100, sm: 150 } }}
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
                <Fab
                    sx={{
                        position: 'absolute',
                        top: 200,
                        right: 50
                    }}
                    onClick={() => scroll(containerRef, 300)}
                >
                    <ArrowForwardIosOutlined />
                </Fab>
            </Grid2>

        </Grid2 >
    )
}