import { CheckCircleOutlineRounded, CloseOutlined } from "@mui/icons-material";
import { Avatar, Chip, Grid2, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

export default function RegistrationStatus() {
    const navigate = useNavigate()
    const { state } = useLocation()
    const { header, footer } = useSelector(state => state.load)
    return (
        <Grid2
            size={{ xs: 12 }}
            display='flex'
            flexDirection='column'
            justifyContent='center'
            rowGap={2}
            alignItems='center'
            sx={{
                height: `${window.innerHeight - (header?.offsetHeight + footer?.offsetHeight)}px`,
            }}
        >
            <Typography variant="h3" align="center" color={state?.isSuccess ? 'success' : 'error'} gutterBottom sx={{ fontFamily: 'Raleway' }}>
                {
                    state?.message
                }
            </Typography>
            {
                state?.isSuccess ?
                    <Avatar
                        sx={{ width: 100, height: 100, backgroundColor: '#fff', border: '1px solid #aaa' }}
                    >
                        <CheckCircleOutlineRounded color="success" sx={{ width: 56, height: 56 }} />
                    </Avatar>
                    :
                    <Avatar
                        sx={{ width: 100, height: 100, backgroundColor: '#fff', border: '1px solid #aaa' }}
                    >
                        <CloseOutlined color="error" sx={{ width: 56, height: 56 }} />
                    </Avatar>
            }
            <Chip
                label="Home"
                color="primary"
                variant="contained"
                onClick={() => navigate('/')}
                sx={{
                    width: { xs: '100%', sm: 300, lg: 500 },
                    fontFamily: 'Raleway',
                    fontWeight: 'bold'
                }}
            />
        </Grid2>
    )
}