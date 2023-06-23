import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useUploadcsvMutation } from '../../services/userAuthApi';

const UploadCSV = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useNavigate();
    const [uploadcsv, { isLoading }] = useUploadcsvMutation()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            csv: data.get('link')
        }
        const res = await uploadcsv({ actualData, access_token })
        if (res.error) {
            // console.log(typeof (res.error.data.errors))
            // console.log(res.error.data.errors)
            setServerError(res.error.data.errors)
        }
        if (res.data) {
            // console.log(typeof (res.data))
            // console.log(res.data)
            storeToken(res.data.token)
            let { access_token } = getToken()
            dispatch(setUserToken({ access_token: access_token }))
            navigate('/dashboard')
        }
    }
    let { access_token } = getToken()
    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])


    return <>

        <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='link' name='link' label='Link' />
            {server_error.link ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.link[0]}</Typography> : ""}
            <Box textAlign='center'>
                {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>}
            </Box>
        </Box>
    </>;
};

export default UploadCSV;
