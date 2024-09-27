import { DriveFolderUploadOutlined } from "@mui/icons-material";
import { Avatar, Badge, Chip, Grid2, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from '../../../../assets/images/sellerbg.jpg'
import { useState } from "react";
import { useDispatch } from "react-redux";
import { snackon } from "../../../../reducers/slices/snackbar";
import { Register } from "../../../../reducers/slices/register";

export default function ProfilePicture() {
    const seller = sessionStorage.getItem('seller')
    const navigate = useNavigate()
    // eslint-disable-next-line
    const [propic, setPropic] = useState(seller === null ? logo : JSON.parse(decodeURIComponent(seller))?.picture_file);
    const dispatch = useDispatch()

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result);
            };
            reader.onerror = (error) => {
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    function handleProPicChange(e) {
        try {
            const file = e.target.files[0]
            convertToBase64(file)
                .then(base64String => {
                    let sellernew = JSON.stringify({ ...JSON.parse(decodeURIComponent(seller)), picture_file: base64String, type: file.type, file_name: file?.name })
                    setPropic(base64String)
                    sessionStorage.setItem('seller', sellernew)
                })
                .catch(error => {
                    dispatch(snackon({ message: 'Error converting to Base64:', color: "error" }));
                });
        } catch (e) {
            console.error(e)
        }
    }

    async function Submit() {
        try {
            const upload_data = JSON.parse(decodeURIComponent(seller))
            const { payload } = await dispatch(Register(upload_data))
            navigate('/signup/seller/status', { state: payload })
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <Grid2 size={{ xs: 12 }} py={2} display={'flex'} flexDirection={'column'} justifyContent={'center'}>
            <Grid2
                item
                xs={12}
                md={4}
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Badge
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    overlap="circular"
                    onClick={() => document.getElementById('propic').click()}
                    badgeContent={
                        <DriveFolderUploadOutlined
                            sx={{
                                width: 30,
                                height: 30,
                                p: 1,
                                backgroundColor: '#F1F1F1',
                                borderRadius: 5,
                                cursor: 'pointer',
                                color: '#33294E'
                            }}
                        />
                    }
                >
                    <Avatar
                        alt="Remy Sharp"
                        src={propic}
                        sx={{
                            width: 256,
                            height: 256,
                            backgroundColor: '#fff'
                        }}
                    />
                    <input id="propic" type="file" onChange={handleProPicChange} style={{ display: 'none' }} />
                </Badge>
            </Grid2>
            <Stack
                spacing={{ xs: 1, sm: 1 }}
                direction={"row"}
                useFlexGap
                sx={{
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    p: 2,
                    flexGrow: 1
                }}
            >
                <Chip
                    label="Cancel"
                    color="error"
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                        width: { xs: '100%', sm: 300, lg: 500 },
                        fontFamily: 'Raleway',
                        fontWeight: 'bold',
                    }}
                />
                <Chip
                    label="Sign up"
                    color="primary"
                    variant="contained"
                    onClick={() => Submit()}
                    sx={{
                        width: { xs: '100%', sm: 300, lg: 500 },
                        fontFamily: 'Raleway',
                        fontWeight: 'bold'
                    }}
                />
            </Stack>
        </Grid2>
    );
}
