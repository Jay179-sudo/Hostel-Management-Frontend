import { TextField, Button, Box, Alert, Typography, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserToken } from '../../features/authSlice';
import { getToken, storeToken } from '../../services/LocalStorageService';
import { useUpdateHostelRoomMutation } from '../../services/userAuthApi';
const UpdateHostelRoomComp = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useNavigate();
    const [updateHostelRoom, { isLoading }] = useUpdateHostelRoomMutation()
    const dispatch = useDispatch()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            email: data.get('email'),
            room: data.get('room'),
        }
        const res = await updateHostelRoom({ actualData, access_token })
        if (res.error) {
            // console.log(typeof (res.error.data.errors))
            // console.log(res.error.data.errors)
            setServerError(res.error.data.errors)
        }
        // if (res.data) {
        //     // console.log(typeof (res.data))
        //     // console.log(res.data)
        //     storeToken(res.data.token)
        //     let { access_token } = getToken()
        //     dispatch(setUserToken({ access_token: access_token }))
        //     navigate('/dashboard')
        // }
        navigate('/dashboard')
    }
    let { access_token } = getToken()
    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])


    return <>
        {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
        {server_error.email ? console.log(server_error.email[0]) : ""}
        {server_error.password ? console.log(server_error.password[0]) : ""}
        <Box component='form' noValidate sx={{ mt: 1 }} id='login-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
            {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='room' name='room' label='room' type='text' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.room[0]}</Typography> : ""}
            <Box textAlign='center'>
                {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Submit</Button>}
            </Box>

        </Box>
    </>;
};

export default UpdateHostelRoomComp;
