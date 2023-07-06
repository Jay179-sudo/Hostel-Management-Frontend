import {
  TextField,
  Button,
  Box,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUserToken } from "../../features/authSlice";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useCreateLeaveRequestMutation } from "../../services/userAuthApi";
import DatePicker from "../DatePicker";
import "../auth/staticfiles/leave-request-style.css";
import hostel_logo from "../auth/mediafiles/hostel-leave-2.jpg";

const CreateLeaveRequest = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [createLeaveRequest, { isLoading }] = useCreateLeaveRequestMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("ReasonForLeave"));
    const actualData = {
      email: data.get("email"),
      start_date: data.get("start-date"),
      end_date: data.get("end-date"),
      Address: data.get("address"),
      ReasonForLeave: data.get("reason"),
    };
    const res = await createLeaveRequest(actualData);
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      // console.log(typeof (res.data))
      // console.log(res.data)
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      navigate("/dashboard");
    }
  };
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <>
      {server_error.non_field_errors
        ? console.log(server_error.non_field_errors[0])
        : ""}
      {server_error.email ? console.log(server_error.email[0]) : ""}
      {server_error.password ? console.log(server_error.password[0]) : ""}
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        {/* <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
            {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='Address' name='Address' label='Address' type='text' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.Address[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='start_date' name='start_date' label='start_date' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.start_date[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='end_date' name='end_date' label='end_date' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.end_date_date[0]}</Typography> : ""}
            <TextField margin='normal' required fullWidth id='ReasonForLeave' name='ReasonForLeave' label='ReasonForLeave' type='text' />
            {server_error.name ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.ReasonForLeave[0]}</Typography> : ""}
            <Box textAlign='center'>
                {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
            </Box> */}
        <div class="leave-request-container">
          <header class="leave-request-header">
            <div class="dashboard-button-leave-request">
              <button
                className="dashboard-back-button-third-floor"
                onClick={(e) => {
                  navigate("/studentdashboard");
                }}
              >
                Dashboard
              </button>
            </div>
          </header>
          <div class="leave-request-main">
            <img
              src={hostel_logo}
              alt="People at reception"
              class="leave-image"
            />
            <div class="leave-request-form">
              <h2>Leave Request Form</h2>
              <p class="leave-instruction">
                Please fill out the following details to submit your leave
                request.
              </p>
              {/* <form> */}
              <div class="leave-request-form-group leave-request-start-date">
                <label for="start-date">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  name="start-date"
                  class="leave-request-form-control"
                  required
                />
              </div>
              <div class="leave-request-form-group leave-request-end-date">
                <label for="end-date">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  name="end-date"
                  class="leave-request-form-control"
                  required
                />
              </div>
              <div class="leave-request-form-group leave-request-email">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="leave-request-form-control"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div class="leave-request-form-group leave-misc">
                <label for="reason">Reason for Leave</label>
                <textarea
                  id="reason"
                  name="reason"
                  class="leave-request-form-control"
                  placeholder="Enter reason for leave"
                  required
                ></textarea>
              </div>
              <div class="leave-request-form-group leave-misc">
                <label for="address">Address during Leave</label>
                <textarea
                  id="address"
                  name="address"
                  class="leave-request-form-control"
                  placeholder="Enter your address during leave"
                  required
                ></textarea>
              </div>
              <div class="leave-request-form-group">
                <input
                  type="submit"
                  value="Submit"
                  class="submit-btn leave-request-btn"
                />
              </div>
              {/* </form> */}
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateLeaveRequest;
