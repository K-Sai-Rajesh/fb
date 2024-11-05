import { CurrencyRupeeOutlined, FolderOpenOutlined, StoreMallDirectoryOutlined } from "@mui/icons-material";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, Chip, Dialog, DialogActions, DialogContent, DialogTitle, Grid2, Slide, Stack, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DeleteProduct, GetProducts } from "../../../../reducers/slices/seller";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DashboardProducts() {
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()

    async function get_products() {
        try {
            const { payload } = await dispatch(GetProducts())
            if (payload?.isSuccess) setProducts(payload?.products)
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        get_products()
    }, [])

    return (
        <Grid2 size={{ xs: 12 }}>
            <Stack
                direction={{ xs: 'row' }}
                rowGap={1}
                columnGap={1}
                sx={{
                    whiteSpace: "normal",
                    flexWrap: 'wrap',
                    overflow: 'auto',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 3
                }}>
                {
                    products?.length === 0 ?
                        <Card
                            sx={{ maxWidth: 500, border: '1px solid black' }}
                            elevation={9}
                        >
                            <CardHeader
                                title={
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                    >
                                        No Data Available !
                                    </Typography>
                                }
                            />
                        </Card>
                        :
                        products?.map((product, idx) => (
                            <RecipeReviewCard key={idx} id={idx} get_products={get_products} product={product} dispatch={dispatch} navigate={navigate} setOrganisations={setProducts} />
                        ))

                }
            </Stack>
        </Grid2>
    )
}

function RecipeReviewCard({ product, navigate, dispatch, get_products }) {
    const { name, category, subcategory, description, cost, stock, mrp } = product;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function DeleteOrg(org) {
        try {
            handleClose()
            await dispatch(DeleteProduct(org.product_id))
            get_products()
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Card sx={{ width: { xs: 250, sm: 300 }, minHeight: 200, pb: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={9}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "#273143" }} aria-label="recipe">
                        <FolderOpenOutlined />
                    </Avatar>
                }
                action={
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'15px'}
                        fontWeight={'bold'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        maxWidth={100}
                        textTransform={'capitalize'}
                    >
                        {subcategory}
                    </Typography>
                }
                title={
                    <Tooltip
                        title={name}
                    >
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'15px'}
                            noWrap
                            fontWeight={'bold'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            sx={{
                                cursor: 'pointer'
                            }}
                            maxWidth={100}
                            textTransform={'capitalize'}
                        >
                            {name}
                        </Typography>
                    </Tooltip>
                }
                subheader={
                    <Stack
                        direction={{ xs: 'row' }}
                        rowGap={1}
                        columnGap={1}
                        sx={{
                            whiteSpace: "normal",
                            flexWrap: 'wrap',
                            overflow: 'auto',
                            justifyContent: 'start',
                            alignItems: 'center',
                        }}>
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            {category}
                        </Typography>
                    </Stack>
                }
            />
            <CardContent>
                <Typography
                    fontFamily={"Raleway"}
                    fontSize={'12px'}
                    fontWeight={'bold'}
                    overflow={'auto'}
                    textOverflow={'ellipsis'}
                    textTransform={'capitalize'}
                >
                    {description}
                </Typography>
            </CardContent>
            <CardContent>
                <Box display={'flex'} alignItems={'center'} justifyContent={'end'}>
                    <Avatar
                        sx={{
                            width: 36,
                            height: 36,
                            backgroundColor: '#111'
                        }}
                    >
                        <CurrencyRupeeOutlined
                            sx={{
                                width: 16,
                                height: 16
                            }}
                        />
                    </Avatar>&emsp;
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'14px'}
                        fontWeight={'bold'}
                        overflow={'auto'}
                        color="success"
                        textOverflow={'ellipsis'}
                        textTransform={'capitalize'}
                    >
                        {cost}
                    </Typography>&ensp;
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'12px'}
                        fontWeight={'bold'}
                        overflow={'auto'}
                        textOverflow={'ellipsis'}
                        textTransform={'capitalize'}
                        sx={{
                            textDecorationLine: 'line-through'
                        }}
                    >
                        {mrp}
                    </Typography>
                </Box>
            </CardContent>
            <CardActions disableSpacing sx={{ display: 'flex', justifyContent: 'end', alignSelf: 'end' }}>
                <Chip
                    sx={{ cursor: 'pointer' }}
                    variant={'contained'}
                    onClick={handleClickOpen}
                    color='error'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                            color={'#fff'}
                        >
                            delete
                        </Typography>
                    }
                />&ensp;
                <Chip
                    sx={{ cursor: 'pointer' }}
                    variant={'outlined'}
                    onClick={() => navigate(`update product`, { state: product })}
                    color='primary'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            view
                        </Typography>
                    }
                />
            </CardActions>

            <React.Fragment>
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    aria-describedby="alert-dialog-slide-description"
                >
                    <DialogTitle>
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'15px'}
                            fontWeight={'bold'}
                            overflow={'hidden'}
                            textOverflow={'ellipsis'}
                            textAlign={'center'}
                            textTransform={'capitalize'}
                            color="#767676"
                        >
                            Do you want to delete ?
                        </Typography>
                    </DialogTitle>
                    <DialogContent>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: "#273143" }} aria-label="recipe">
                                    <StoreMallDirectoryOutlined />
                                </Avatar>
                            }
                            title={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'15px'}
                                    fontWeight={'bold'}
                                    overflow={'hidden'}
                                    textOverflow={'ellipsis'}
                                    maxWidth={100}
                                    textTransform={'capitalize'}
                                >
                                    {name}
                                </Typography>
                            }
                            subheader={
                                <Stack
                                    direction={{ xs: 'row' }}
                                    rowGap={1}
                                    columnGap={1}
                                    sx={{
                                        whiteSpace: "normal",
                                        flexWrap: 'wrap',
                                        overflow: 'auto',
                                        justifyContent: 'start',
                                        alignItems: 'center',
                                    }}>
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                        textTransform={'capitalize'}
                                    >
                                        {category},
                                    </Typography>,
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                        textTransform={'capitalize'}
                                    >
                                        {subcategory}
                                    </Typography>
                                </Stack>
                            }
                        />
                    </DialogContent>
                    <DialogActions>
                        <Chip
                            sx={{ width: '80px', cursor: 'pointer' }}
                            variant='outlined'
                            color='error'
                            onClick={handleClose}
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    color="#767676"
                                    textTransform={'capitalize'}
                                >
                                    cancel
                                </Typography>
                            } />&ensp;
                        <Chip
                            sx={{ cursor: 'pointer' }}
                            variant={'contained'}
                            onClick={() => DeleteOrg(product)}
                            color='error'
                            label={
                                <Typography
                                    fontFamily={"Raleway"}
                                    fontSize={'12px'}
                                    fontWeight={'bold'}
                                    overflow={'auto'}
                                    textOverflow={'ellipsis'}
                                    textTransform={'capitalize'}
                                    color={'#fff'}
                                >
                                    confirm
                                </Typography>
                            }
                        />
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </Card>
    );
}