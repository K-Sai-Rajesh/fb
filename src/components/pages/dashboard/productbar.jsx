import { Chip, Grid2, Stack, Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function ProductBar() {
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const path = pathname.split('/')[pathname.split('/')?.length - 1].replace('%20', " ")
    // console.log(pathname.split('/')[pathname.split('/')?.length - 1])

    return (
        <Grid2 container>
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
                    <Typography
                        fontFamily={"Raleway"}
                        fontSize={'15px'}
                        noWrap
                        fontWeight={'bold'}
                        overflow={'hidden'}
                        textOverflow={'ellipsis'}
                        textTransform={'capitalize'}
                    >
                        {path}
                    </Typography>

                    <Stack
                        direction={{ xs: 'row' }}
                        rowGap={1}
                        columnGap={1}
                        sx={{
                            whiteSpace: "normal",
                            flexWrap: 'wrap',
                            overflow: 'auto',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }}
                    >
                        <Chip
                            sx={{ cursor: 'pointer', display: `${path === 'products' ? 'none' : 'flex'}` }}
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
                                    back
                                </Typography>
                            }
                        />
                        <Chip
                            sx={{ cursor: 'pointer', display: `${path === 'products' ? 'flex' : 'none'}` }}
                            variant={'outlined'}
                            onClick={() => navigate(`add product`)}
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
                                    add product
                                </Typography>
                            }
                        />
                    </Stack>
                </Stack>
            </Grid2>
            <Outlet />
        </Grid2>
    )
}