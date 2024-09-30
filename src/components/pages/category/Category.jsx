import { Avatar, Box, Card, Chip, Divider, Fab, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, LaunchOutlined } from "@mui/icons-material";
import { useRef } from "react";
import { scroll, scrollStyling } from "../../layout/LandingPage";
import { useNavigate } from "react-router-dom";

export default function Category() {
    const { header, footer } = useSelector(state => state.load)
    const categoryRef = useRef()
    const navigate = useNavigate()
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
        <Grid2
            container
            sx={{
                minHeight: `${window.innerHeight - (header?.offsetHeight + footer?.offsetHeight)}px`,
            }}
            py={1}
        >
            <Grid2 size={{ xs: 12 }} py={{ xs: 2 }}>
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    px={1}
                    pl={5}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: { xs: 'center', sm: 'space-between', lg: "space-between" },
                        alignItems: "center",
                    }}
                >
                    <Typography textOverflow={'ellipsis'} variant="h3" align="center" color="#2196F3" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        Categories
                    </Typography>
                    <Chip
                        label="Back"
                        color="secondary"
                        variant="contained"
                        onClick={() => navigate(-1)}
                        sx={{
                            width: { xs: '100%', sm: 300, lg: 500 },
                            fontFamily: 'Raleway',
                            fontWeight: 'bold',
                        }}
                    />
                </Stack>
                <Box position={'relative'} py={4}>
                    <Fab
                        sx={{
                            position: 'absolute',
                            top: '40%',
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
                            cards?.map((category, index) => (
                                <Box display={'flex'} width={100} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography noWrap width={80} align="center" gutterBottom sx={{ color: "#2196F3", fontFamily: 'Raleway', fontSize: 12, fontWeight: 'bold' }}>
                                        {category?.title}
                                    </Typography>
                                    <IconButton
                                        key={index}
                                    >
                                        <Avatar
                                            src={category?.image}
                                            sx={{
                                                width: 80,
                                                height: 80
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
                            top: '40%',
                            right: 50
                        }}
                        onClick={() => scroll(categoryRef, 300)}
                    >
                        <ArrowForwardIosOutlined />
                    </Fab>
                </Box>
            </Grid2>
            <Grid2
                size={{ xs: 12 }}
            >
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
                        justifyContent: "center",
                    }}
                >
                    {
                        cards?.map((product, index) => (
                            <Card
                                key={index}
                                sx={{
                                    flexDirection: 'column',
                                    padding: { xs: '12px', sm: '16px' },
                                    boxShadow: 'none',
                                    width: { xs: 300, sm: 345, lg: 500 },
                                }}
                            >
                                <Box
                                    sx={{
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '290px',
                                        boxShadow: 3,
                                        '&:hover .card-content': {
                                            transform: 'translateY(0)',
                                        },
                                        '&:hover .card-image': {
                                            opacity: 0.6,
                                        },
                                        background: '#696969',
                                        transition: 'opacity 0.5s ease-in-out'
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={product?.image}
                                        alt={"serviceTitle"}
                                        className="card-image"
                                        sx={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            transition: 'opacity 0.5s ease-in-out'
                                        }}
                                    />
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            top: 0,
                                            left: 0,
                                            right: 0,
                                            bottom: 0,
                                            backgroundColor: '#070f26',
                                            opacity: 0.5,
                                            transition: 'opacity 0.5s ease-in-out',
                                        }}
                                    />
                                    <Typography
                                        variant="h6"
                                        fontWeight={500}
                                        px={2}
                                        position={'absolute'}
                                        top={60}
                                        color={'#ffffff'}
                                        fontFamily={'Questrial'}
                                    >
                                        {product?.title}
                                    </Typography>
                                    <Typography
                                        variant="h6"
                                        fontWeight={500}
                                        px={2}
                                        position={'absolute'}
                                        top={120}
                                        color={'#ffffff'}
                                        fontFamily={'Questrial'}
                                        sx={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 2,
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            maxWidth: '100%',
                                            height: '3.2em',
                                        }}
                                    >
                                        {product?.description}
                                    </Typography>
                                    <Box
                                        className="card-content"
                                        sx={{
                                            position: 'absolute',
                                            bottom: 0,
                                            left: 0,
                                            right: 0,
                                            p: 2,
                                            color: 'white',
                                            backgroundColor: '#070f26',
                                            transform: 'translateY(100%)',
                                            transition: 'transform 0.5s ease-in-out',
                                            textAlign: 'start',
                                            '& a': {
                                                textDecoration: 'underline',
                                                color: 'white',
                                                fontFamily: 'Questrial'
                                            }
                                        }}
                                    >
                                        <Typography variant="body2" fontWeight={500} color={'#ffffff'}>
                                            <span
                                                onClick={() => navigate(`/product/${product?.title}`)}
                                                style={{
                                                    textDecorationColor: '#ffffff',
                                                    textUnderlineOffset: '3px',
                                                    textDecorationLine: 'underline',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Read More
                                            </span>
                                            &ensp;
                                            <IconButton
                                                onClick={() => navigate(`/product/${product?.title}`)}
                                            >
                                                <LaunchOutlined sx={{ color: '#fff', width: '15px', height: "15px" }} />
                                            </IconButton>
                                        </Typography>
                                    </Box>
                                </Box>
                            </Card>
                        ))
                    }
                </Stack>
            </Grid2>
        </Grid2>
    )
}