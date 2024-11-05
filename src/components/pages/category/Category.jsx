import { Avatar, Box, Card, CardActions, CardContent, Chip, Divider, Fab, Grid2, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined, CurrencyRupeeOutlined, LaunchOutlined, LocationOnOutlined, WhatsApp } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { Carousel, scroll, scrollStyling } from "../../layout/LandingPage";
import { useLocation, useNavigate } from "react-router-dom";
import { GetProductImages, GetProductsBySubCategory, SubCategory } from "../../../reducers/slices/seller";
import { config } from "../../../helpers/config";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

export default function Category() {
    const { header, footer } = useSelector(state => state.load)
    const { pathname } = useLocation()
    const category = pathname.split('/')[pathname.split('/').length - 1]
    const dispatch = useDispatch()
    const categoryRef = useRef()
    const navigate = useNavigate()
    const [subcategories, setSubCategories] = useState([])
    const [products, setProducts] = useState([])

    async function get_products(subcategory) {
        try {
            const { payload } = await dispatch(GetProductsBySubCategory(subcategory))
            if (payload?.isSuccess) {
                setProducts(payload?.products)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function get_sub_category() {
        try {
            const { payload } = await dispatch(SubCategory(category))
            if (payload?.isSuccess) {
                setSubCategories(payload?.subcategories)
                get_products(payload?.subcategories[0]?.subcategory)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        get_sub_category()
    }, [])

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
                            subcategories?.map((category, index) => (
                                <Box display={'flex'} width={100} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                                    <Typography noWrap width={80} align="center" gutterBottom sx={{ color: "#2196F3", fontFamily: 'Raleway', fontSize: 12, fontWeight: 'bold' }}>
                                        {category?.subcategory}
                                    </Typography>
                                    <IconButton
                                        key={index}
                                    >
                                        <Avatar
                                            src={category?.url}
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
                        products?.map((product, index) => (
                            <ProductCard product={product} index={index} navigate={navigate} dispatch={dispatch} />
                            // <Card
                            //     key={index}
                            //     sx={{
                            //         flexDirection: 'column',
                            //         padding: { xs: '12px', sm: '16px' },
                            //         boxShadow: 'none',
                            //         width: { xs: 300, sm: 345, lg: 500 },
                            //     }}
                            // >
                            //     <Box
                            //         sx={{
                            //             position: 'relative',
                            //             overflow: 'hidden',
                            //             height: '290px',
                            //             boxShadow: 3,
                            //             '&:hover .card-content': {
                            //                 transform: 'translateY(0)',
                            //             },
                            //             '&:hover .card-image': {
                            //                 opacity: 0.6,
                            //             },
                            //             background: '#696969',
                            //             transition: 'opacity 0.5s ease-in-out'
                            //         }}
                            //     >
                            //         <Box
                            //             component="img"
                            //             src={product?.url}
                            //             alt={"serviceTitle"}
                            //             className="card-image"
                            //             sx={{
                            //                 width: '100%',
                            //                 height: '100%',
                            //                 objectFit: 'cover',
                            //                 transition: 'opacity 0.5s ease-in-out'
                            //             }}
                            //         />
                            //         <Box
                            //             sx={{
                            //                 position: 'absolute',
                            //                 top: 0,
                            //                 left: 0,
                            //                 right: 0,
                            //                 bottom: 0,
                            //                 backgroundColor: '#070f26',
                            //                 opacity: 0.5,
                            //                 transition: 'opacity 0.5s ease-in-out',
                            //             }}
                            //         />
                            //         <Typography
                            //             variant="h6"
                            //             fontWeight={500}
                            //             px={2}
                            //             position={'absolute'}
                            //             top={60}
                            //             color={'#ffffff'}
                            //             fontFamily={'Questrial'}
                            //         >
                            //             {product?.title}
                            //         </Typography>
                            //         <Typography
                            //             variant="h6"
                            //             fontWeight={500}
                            //             px={2}
                            //             position={'absolute'}
                            //             top={120}
                            //             color={'#ffffff'}
                            //             fontFamily={'Questrial'}
                            //             sx={{
                            //                 display: '-webkit-box',
                            //                 WebkitBoxOrient: 'vertical',
                            //                 WebkitLineClamp: 2,
                            //                 overflow: 'hidden',
                            //                 textOverflow: 'ellipsis',
                            //                 maxWidth: '100%',
                            //                 height: '3.2em',
                            //             }}
                            //         >
                            //             {product?.description}
                            //         </Typography>
                            //         <Box
                            //             className="card-content"
                            //             sx={{
                            //                 position: 'absolute',
                            //                 bottom: 0,
                            //                 left: 0,
                            //                 right: 0,
                            //                 p: 2,
                            //                 color: 'white',
                            //                 backgroundColor: '#070f26',
                            //                 transform: 'translateY(100%)',
                            //                 transition: 'transform 0.5s ease-in-out',
                            //                 textAlign: 'start',
                            //                 '& a': {
                            //                     textDecoration: 'underline',
                            //                     color: 'white',
                            //                     fontFamily: 'Questrial'
                            //                 }
                            //             }}
                            //         >
                            //             <Typography variant="body2" fontWeight={500} color={'#ffffff'}>
                            //                 <span
                            //                     onClick={() => navigate(`/product/${product?.title}`)}
                            //                     style={{
                            //                         textDecorationColor: '#ffffff',
                            //                         textUnderlineOffset: '3px',
                            //                         textDecorationLine: 'underline',
                            //                         cursor: 'pointer'
                            //                     }}
                            //                 >
                            //                     Read More
                            //                 </span>
                            //                 &ensp;
                            //                 <IconButton
                            //                     onClick={() => navigate(`/product/${product?.title}`)}
                            //                 >
                            //                     <LaunchOutlined sx={{ color: '#fff', width: '15px', height: "15px" }} />
                            //                 </IconButton>
                            //             </Typography>
                            //         </Box>
                            //     </Box>
                            // </Card>
                        ))
                    }
                </Stack>
            </Grid2>
        </Grid2>
    )
}

function ProductCard({ product, index, navigate, dispatch }) {
    const [images, setImage] = useState([])

    async function get_products() {
        try {
            const { payload } = await dispatch(GetProductImages(product?.product_id))
            if (payload?.isSuccess) {
                console.log(payload?.product_images?.map(image => `${config.BASE_URL}${image?.path}`))
                setImage(payload?.product_images?.map(image => `${config.BASE_URL}${image?.path}`))
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        get_products()
    }, [])

    return (
        <Card
            key={index}
            sx={{
                flexDirection: 'column',
                padding: { xs: '12px', sm: '16px' },
                boxShadow: 'none',
                width: { xs: 300, sm: 300, lg: 300 },
                height: { xs: 300, sm: 300, lg: 300 }
            }}
        >
            {/* <Carousel images={images} /> */}
            <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <img
                    src={`${images[0]}`}
                    style={{
                        height: 100
                    }}
                />
            </Box>
            <CardContent>
                <Typography
                    variant="h6"
                    fontWeight={'bold'}
                    px={2}
                    fontFamily={'Raleway'}
                >
                    {product?.name}
                </Typography>
                <Typography
                    fontWeight={'bold'}
                    fontSize={12}
                    px={2}
                    fontFamily={'Raleway'}
                    sx={{
                        display: '-webkit-box',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 2,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        maxWidth: '100%',
                    }}
                >
                    {product?.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Box flexGrow={1} width={{ xs: '100%' }}>
                    <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                        <Stack spacing={2} direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box display={'flex '} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                <Avatar sx={{ backgroundColor: '#111111', width: 26, height: 26 }}>
                                    <CurrencyRupeeOutlined sx={{ width: 15, height: 15 }} />
                                </Avatar>
                                <Typography
                                    noWrap
                                    fontWeight={'bold'}
                                    sx={{ textDecorationLine: 'line-through' }}
                                    fontFamily={'Raleway'}
                                >{product?.mrp}</Typography>
                                <Typography
                                    noWrap
                                    fontWeight={'bold'}
                                    // sx={{ textDecorationLine: 'line-through' }}
                                    fontFamily={'Raleway'}
                                >{product?.cost}</Typography>
                            </Box>
                            <Box display={'flex '} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                {/* <Avatar sx={{ backgroundColor: '#111111' }}>
                                        <CurrencyRupeeOutlined />
                                    </Avatar> */}
                                <Typography
                                    noWrap
                                    fontWeight={'bold'}
                                    color={product?.stock === 0 ? 'error' : 'success'}
                                    // sx={{ textDecorationLine: 'line-through' }}
                                    fontFamily={'Raleway'}
                                >{product?.stock === 0 ? "out of stock" : 'in-stock'}</Typography>
                            </Box>
                        </Stack>
                    </Item>
                </Box>
            </CardActions>
            {/* <Box
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
                    src={images[0]}
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
                    {product?.name}
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
                            onClick={() => navigate(`/product/${product?.name}`, { state: { ...product, images } })}
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
                            onClick={() => navigate(`/product/${product?.name}`, { state: { ...product, images } })}
                        >
                            <LaunchOutlined sx={{ color: '#fff', width: '15px', height: "15px" }} />
                        </IconButton>
                    </Typography>
                </Box>
            </Box> */}
        </Card>
    )
}