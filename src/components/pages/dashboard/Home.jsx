import { Grid2, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Verification } from "../../../reducers/slices/seller";

export default function Users() {
    const dispatch = useDispatch();
    const { verified_users } = useSelector(state => state?.seller)
    async function verifiedUsers() {
        try {
            await dispatch(Verification())
        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        try {
            verifiedUsers()
        } catch (e) {
            console.error(e)
        }
    }, [])

    return (
        <Grid2 container>
            <Grid2
                size={{ xs: 12 }}
            >
                <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Raleway', fontWeight: 'bolder' }}>
                    Analytical Data
                </Typography>
            </Grid2>
            <Grid2
                size={{ xs: 12 }}
                sx={{
                    borderBottom: '1px solid #111',
                    pb: 1
                }}
            >
                <Stack
                    direction={{ xs: 'row' }}
                    rowGap={1}
                    columnGap={1}
                    sx={{
                        whiteSpace: "normal",
                        flexWrap: 'wrap',
                        overflow: 'auto',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                    }}
                >
                    {
                        verified_users?.length === 0 ?
                            <>
                            </>
                            :
                            verified_users?.map((seller, idx) => (
                                <Seller seller={seller} idx={idx} />
                            ))
                    }
                </Stack>
            </Grid2>
        </Grid2>
    )
}

function Seller({ seller, idx }) {
    return (
        <>
        </>
    )
}