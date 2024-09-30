import { Avatar, Box, Chip, Grid2, IconButton, Paper, Stack, styled, Typography } from "@mui/material";
import { Carousel } from "../../layout/LandingPage";
import { button, images } from "../../../helpers/features";
import { LocationOnOutlined, WhatsApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

export default function SellerPage() {
    const navigate = useNavigate()
    return (
        <Grid2 container>
            <Grid2 size={{ xs: 12 }}>
                <Carousel images={images} />
                <Stack
                    spacing={{ xs: 1, sm: 1 }}
                    direction="column"
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
                    <Typography variant="h6" align="center" gutterBottom sx={{ fontFamily: 'Raleway' }}>
                        Our <span style={{ color: "#2196F3" }}>Partners</span>
                    </Typography>
                    <Box flexGrow={1} width={{ xs: '100%', lg: '50%' }}>
                        <Item sx={{ my: 1, mx: 'auto', p: 2 }}>
                            <Stack px={3} spacing={2} direction="row" sx={{ justifyContent: 'end', alignItems: 'center' }}>
                                <Box display={'flex '} justifyContent={'center'} alignItems={'center'} columnGap={1}>
                                    <IconButton>
                                        <Avatar sx={{ backgroundColor: '#111111' }}>
                                            <WhatsApp />
                                        </Avatar>
                                    </IconButton>
                                    <IconButton>
                                        <Avatar sx={{ backgroundColor: '#111111' }}>
                                            <LocationOnOutlined />
                                        </Avatar>
                                    </IconButton>
                                </Box>
                            </Stack>
                        </Item>
                    </Box>
                </Stack>
                <Stack
                    spacing={{ xs: 1 }}
                    direction="row"
                    useFlexGap
                    sx={{
                        flexWrap: 'wrap',
                        justifyContent: "center",
                        alignItems: "start",
                        p: 2
                    }}
                >
                    <Chip label="Back" sx={{ ...button, backgroundColor: '#111', color: '#fff', ':hover': { color: '#111' } }} onClick={() => navigate(-1)} />
                </Stack>
            </Grid2>
        </Grid2>
    )
}