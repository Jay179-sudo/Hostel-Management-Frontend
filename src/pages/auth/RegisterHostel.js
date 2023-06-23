import { TextField, FormControlLabel, Checkbox, Button, Box, Alert, Typography } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterHostelMutation } from '../../services/userAuthApi'
import { storeToken } from '../../services/LocalStorageService';

const RegisterHostel = () => {
    const [server_error, setServerError] = useState({})
    const navigate = useNavigate();
    const [registerHostel, { isLoading }] = useRegisterHostelMutation()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            name: data.get('name'),
            location: data.get('location'),
            hostel_code: data.get('hostel_code'),
            capacity: data.get('capacity'),
        }
        const res = await registerHostel(actualData)
        if (res.error) {
            // console.log(typeof (res.error.data.errors))
            // console.log(res.error.data.errors)
            setServerError(res.error.data.errors)
        }
        if (res.data) {
            console.log(typeof (res.data))
            console.log(res.data)
            storeToken(res.data.token)
            navigate('/dashboard')
        }
    }
    return <>
        {/* {server_error.non_field_errors ? console.log(server_error.non_field_errors[0]) : ""}
    {server_error.name ? console.log(server_error.name[0]) : ""}
    {server_error.email ? console.log(server_error.email[0]) : ""}
    {server_error.password ? console.log(server_error.password[0]) : ""}
    {server_error.password2 ? console.log(server_error.password2[0]) : ""}
    {server_error.tc ? console.log(server_error.tc[0]) : ""} */}
        <Box component='form' noValidate sx={{ mt: 1 }} id='registration-form' onSubmit={handleSubmit}>
            <TextField margin='normal' required fullWidth id='name' name='name' label='Name' type='text' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.name[0]}</Typography> : ""}

            <TextField margin='normal' required fullWidth id='location' name='location' label='Location' />
            {server_error.location ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.location[0]}</Typography> : ""}

            <TextField margin='normal' required fullWidth id='capacity' name='capacity' label='Capacity' type='text' />
            {server_error.capacity ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.capacity[0]}</Typography> : ""}

            <TextField margin='normal' required fullWidth id='hostel' name='hostel_code' label='hostel_code' type='text' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.hostel[0]}</Typography> : ""}


            <Box textAlign='center'>
                <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Join</Button>
            </Box>
            {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''}
        </Box>
    </>;
};

export default RegisterHostel;
