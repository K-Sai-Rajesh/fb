import { Box, Card, CardHeader, Chip, Grid2, IconButton, Stack, Typography } from "@mui/material";
import { Carousel } from "../../../layout/LandingPage";
import { useEffect, useRef, useState } from "react";
import { UploadFileOutlined } from "@mui/icons-material";
import { convertToBase64 } from "../../../../helpers/features";
import { useDispatch } from "react-redux";
import { snackon } from "../../../../reducers/slices/snackbar";
import CustomInputField from "../../../../common/CustomInputField";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { AddProduct, Category, GetProductImages, SubCategory, UpdateProduct } from "../../../../reducers/slices/seller";
import { config } from "../../../../helpers/config";
import CustomSelectField from "../../../../common/CustomSelectField";

export default function CrudProduct() {
    const [images, setImages] = useState([])
    const [categories, setCategories] = useState([])
    const [sub_categories, setSubCategories] = useState([])

    const { state } = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const imageRef = useRef()
    async function handleSubmit() {
        try {
            if (images.length === 0) {
                dispatch(snackon({ message: "Please add product images !", color: 'warning' }))
                return;
            }
            state === null ?
                dispatch(AddProduct({ params: { ...register.values, images }, navigate }))
                :
                dispatch(UpdateProduct({ params: { ...state, ...register.values, images }, navigate }))

        } catch (e) {
            console.error(e)
        }
        console.log(register.values)
    }

    const register = useFormik({
        initialValues: {
            product_name: '',
            product_description: '',
            product_stock: '',
            product_mrp: '',
            product_price: '',
            product_category: '',
            product_subcategory: ''
        },
        enableReinitialize: true,
        onSubmit: handleSubmit,
        validationSchema: Yup.object().shape({
            product_name: Yup.string().required("Field can't be empty !"),
            product_description: Yup.string().required("Field can't be empty !"),
            product_stock: Yup.string().required("Field can't be empty !"),
            product_mrp: Yup.string().required("Field can't be empty !"),
            product_price: Yup.string().required("Field can't be empty !"),
        }),
    })

    async function handleImageChange(e) {
        try {
            const files = Object.values(e.target.files)
            const images = await Promise.all(files.map(async file => {
                const base64 = await convertToBase64(file)
                return { base64, name: file.name, size: file.sizes }
            }))
            setImages(images)
        } catch (e) {

        }
    }

    async function get_product(product) {
        try {
            const { payload } = await dispatch(GetProductImages(product?.product_id))
            register.setFieldValue('product_name', product?.name)
            register.setFieldValue('product_description', product?.description)
            register.setFieldValue('product_stock', product?.stock)
            register.setFieldValue('product_mrp', product?.mrp)
            register.setFieldValue('product_price', product?.cost)
            register.setFieldValue('product_category', product?.product_category)
            register.setFieldValue('product_subcategory', product?.product_subcategory)

            if (payload?.isSuccess) setImages(payload?.product_images?.map(image => ({ base64: `${config.BASE_URL}${image?.path}` })))
        } catch (e) {
            console.error(e)
        }
    }

    async function get_sub_category(category) {
        try {
            const { payload } = await dispatch(SubCategory(category))
            if (payload?.isSuccess) {
                setSubCategories(payload?.subcategories)
                register.setFieldValue('product_subcategory', payload?.subcategories[0]?.subcategory)
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function get_category() {
        try {
            const { payload } = await dispatch(Category())
            if (payload?.isSuccess) {
                setCategories(payload?.categories)
                register.setFieldValue('product_category', payload?.categories[0]?.title)
                get_sub_category(payload?.categories[0]?.title)
            }
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        if (state !== null) get_product(state)
        get_category()
    }, [])

    return (
        <Grid2 size={{ xs: 12 }} display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'}>
            {
                images?.length === 0 ?
                    <Card
                        sx={{ width: { xs: 250, sm: 300, lg: 500 }, border: '1px solid black', mt: 1 }}
                        elevation={9}
                    >
                        <CardHeader
                            title={
                                <Stack
                                    direction={{ xs: 'row' }}
                                    rowGap={1}
                                    columnGap={1}
                                    sx={{
                                        whiteSpace: "normal",
                                        flexWrap: 'wrap',
                                        overflow: 'auto',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                    }}>
                                    <Typography
                                        fontFamily={"Raleway"}
                                        fontSize={'12px'}
                                        fontWeight={'bold'}
                                        overflow={'auto'}
                                        textOverflow={'ellipsis'}
                                    >
                                        No Data Available !
                                    </Typography>
                                    <IconButton onClick={() => imageRef.current.click()}>
                                        <UploadFileOutlined />
                                    </IconButton>
                                    <input
                                        type="file"
                                        multiple
                                        style={{ display: 'none' }}
                                        ref={imageRef}
                                        accept='image/*'
                                        onChange={handleImageChange}
                                    />
                                </Stack>
                            }
                        />
                    </Card>
                    :
                    <Carousel images={images.map(image => image?.base64)} />
            }<br />
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
                    py: 2,
                    borderTop: '1px solid #111'
                }}
            >
                <Box>
                    <CustomInputField
                        label={'Product Name'}
                        name={'product_name'}
                        type={'text'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_name}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_name && register.touched.product_name
                        }
                        errormessage={
                            register.errors.product_name && register.touched.product_name
                                ? register.errors.product_name
                                : ""
                        }
                    />
                </Box>
                <Box>
                    <CustomSelectField
                        label={'Category'}
                        name={'product_category'}
                        type={'text'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_category}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_category && register.touched.product_category
                        }
                        errormessage={
                            register.errors.product_category && register.touched.product_category
                                ? register.errors.product_category
                                : ""
                        }
                    >
                        <option value={''}>
                            select
                        </option>
                        {
                            categories?.map((category, idx) => (<option key={idx} value={category?.title}>{category?.title}</option>))
                        }
                    </CustomSelectField>
                </Box>
                <Box>
                    <CustomSelectField
                        label={'Sub Category'}
                        name={'product_subcategory'}
                        type={'text'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_subcategory}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_subcategory && register.touched.product_subcategory
                        }
                        errormessage={
                            register.errors.product_subcategory && register.touched.product_subcategory
                                ? register.errors.product_subcategory
                                : ""
                        }
                    >
                        <option value={''}>
                            select
                        </option>
                        {
                            sub_categories?.map((sub, idx) => (<option key={idx} value={sub.subcategory}>{sub.subcategory}</option>))
                        }
                    </CustomSelectField>
                </Box>
                <Box>
                    <CustomInputField
                        label={'Product Description'}
                        name={'product_description'}
                        type={'text'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_description}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_description && register.touched.product_description
                        }
                        errormessage={
                            register.errors.product_description && register.touched.product_description
                                ? register.errors.product_description
                                : ""
                        }
                    />
                </Box>
                <Box>
                    <CustomInputField
                        label={'Product Stock'}
                        name={'product_stock'}
                        type={'number'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_stock}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_stock && register.touched.product_stock
                        }
                        errormessage={
                            register.errors.product_stock && register.touched.product_stock
                                ? register.errors.product_stock
                                : ""
                        }
                    />
                </Box>
                <Box>
                    <CustomInputField
                        label={'Product MRP'}
                        name={'product_mrp'}
                        type={'number'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_mrp}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_mrp && register.touched.product_mrp
                        }
                        errormessage={
                            register.errors.product_mrp && register.touched.product_mrp
                                ? register.errors.product_mrp
                                : ""
                        }
                    />
                </Box>
                <Box>
                    <CustomInputField
                        label={'Product Price'}
                        name={'product_price'}
                        type={'number'}
                        size="small"
                        variant="outlined"
                        value={register.values.product_price}
                        fullWidth
                        sx={{ fontFamily: 'Raleway' }}
                        onChange={register.handleChange}
                        error={
                            register.errors.product_price && register.touched.product_price
                        }
                        errormessage={
                            register.errors.product_price && register.touched.product_price
                                ? register.errors.product_price
                                : ""
                        }
                    />
                </Box>
            </Stack><br />
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
                }}
            >
                <Chip
                    sx={{ cursor: 'pointer' }}
                    variant={'outlined'}
                    onClick={() => navigate(-1)}
                    color='error'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            cancel
                        </Typography>
                    }
                />
                <Chip
                    sx={{ cursor: 'pointer' }}
                    variant={'outlined'}
                    onClick={() => setImages([])}
                    color='warning'
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            clear images
                        </Typography>
                    }
                />
                <Chip
                    sx={{ cursor: 'pointer' }}
                    variant={'outlined'}
                    color='primary'
                    onClick={register.handleSubmit}
                    label={
                        <Typography
                            fontFamily={"Raleway"}
                            fontSize={'12px'}
                            fontWeight={'bold'}
                            overflow={'auto'}
                            textOverflow={'ellipsis'}
                            textTransform={'capitalize'}
                        >
                            submit
                        </Typography>
                    }
                />
            </Stack>
        </Grid2>
    )
}