import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { config } from "../../helpers/config";
import client from "../../helpers/client";
import { loadoff, loadon } from "./loading";
import { snackon } from "./snackbar";

// completed integrated
export const AddProduct = createAsyncThunk(
    "AddProduct",
    async ({ params, navigate }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/add_product`;
            const response = await client.post(url, params);
            dispatch(snackon({ message: response?.message, color: response?.isSuccess ? 'success' : 'warning' }))
            response?.isSuccess && navigate(-1)
            return response;
        } catch (error) {
            dispatch(snackon({ message: error?.message, color: 'error' }))
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);
// completed integrated
export const UpdateProduct = createAsyncThunk(
    "UpdateProduct",
    async ({ params, navigate }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/update_product`;
            const response = await client.post(url, params);
            dispatch(snackon({ message: response?.message, color: response?.isSuccess ? 'success' : 'warning' }))
            response?.isSuccess && navigate(-1)
            return response;
        } catch (error) {
            dispatch(snackon({ message: error?.message, color: 'error' }))
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);
// completed integrated
export const GetProducts = createAsyncThunk(
    "GetProducts",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_products`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);
// completed integrated
export const GetProductImages = createAsyncThunk(
    "GetProductImages",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_product_images?product_id=${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetSellers = createAsyncThunk(
    "GetSellers",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_sellers?limit=${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const Verification = createAsyncThunk(
    "Verification",
    async (params, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/verify_sellers`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            console.error(error)
            return rejectWithValue(error)
        } finally {
            dispatch(loadoff(false))
        }
    }
)
// completed integrated
export const DeleteProduct = createAsyncThunk(
    "DeleteProduct",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/delete_product?product_id=${param}`;
            const response = await client.delete(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);
// completed integrated
export const Category = createAsyncThunk(
    "Category",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            const url = `${config.BASE_API}/categories`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);
// completed integrated
export const SubCategory = createAsyncThunk(
    "SubCategory",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            const url = `${config.BASE_API}/get_sub_categories?category=${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetProductsBySubCategory = createAsyncThunk(
    "GetProductsBySubCategory",
    async (param, { rejectWithValue, dispatch }) => {
        try {
            const url = `${config.BASE_API}/get_products_by_sub_categories?sub_category=${param}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
);

export const GetSellersProductById = createAsyncThunk(
    "GetSellersProductById",
    async ({ id, category }, { rejectWithValue, dispatch }) => {
        try {
            dispatch(loadon(true));
            const url = `${config.BASE_API}/get_products/${id}/${category}`;
            const response = await client.get(url);
            return response;
        } catch (error) {
            return rejectWithValue(error);
        } finally {
            dispatch(loadoff(false));
        }
    }
)

const sellerSlice = createSlice({
    name: "seller",
    initialState: {
        verified_users: []
    },
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(Verification.pending, () => { })
            .addCase(Verification.fulfilled, (state, { payload }) => {
                return {
                    ...state,
                    verified_users: payload?.result
                }
            })
            .addCase(Verification.rejected, () => { })

            .addCase(GetProductsBySubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProductsBySubCategory.fulfilled, () => { })
            .addCase(GetProductsBySubCategory.rejected, (state) => {
                state.loading = false;
            })


            .addCase(UpdateProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(UpdateProduct.fulfilled, () => { })
            .addCase(UpdateProduct.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetProductImages.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProductImages.fulfilled, () => { })
            .addCase(GetProductImages.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetSellers.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellers.fulfilled, () => { })
            .addCase(GetSellers.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetSellersProductById.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetSellersProductById.fulfilled, () => { })
            .addCase(GetSellersProductById.rejected, (state) => {
                state.loading = false;
            })

            .addCase(DeleteProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(DeleteProduct.fulfilled, () => { })
            .addCase(DeleteProduct.rejected, (state) => {
                state.loading = false;
            })

            .addCase(GetProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(GetProducts.fulfilled, () => { })
            .addCase(GetProducts.rejected, (state) => {
                state.loading = false;
            })

            .addCase(SubCategory.pending, (state) => {
                state.loading = true;
            })
            .addCase(SubCategory.fulfilled, () => { })
            .addCase(SubCategory.rejected, (state) => {
                state.loading = false;
            })

            .addCase(Category.pending, (state) => {
                state.loading = true;
            })
            .addCase(Category.fulfilled, () => { })
            .addCase(Category.rejected, (state) => {
                state.loading = false;
            })

            .addCase(AddProduct.pending, (state) => {
                state.loading = true;
            })
            .addCase(AddProduct.fulfilled, () => { })
            .addCase(AddProduct.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default sellerSlice.reducer;