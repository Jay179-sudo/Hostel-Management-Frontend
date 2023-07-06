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
import { NavLink, useNavigate } from "react-router-dom";
import { setUserToken } from "../../features/authSlice";
import {
  getToken,
  storeToken,
  removeToken,
} from "../../services/LocalStorageService";
import { useLoginStudentMutation } from "../../services/userAuthApi";
import "../auth/staticfiles/super-dash-style.css";
import { unSetUserToken } from "../../features/authSlice";
import "../auth/staticfiles/stud-dash-style.css";
import super_dashboard from "../auth/mediafiles/super-dashboard-image.jpg";
import { unsetUserInfo } from "../../features/userSlice";

const SuperAdminDashboard = () => {
  const handleLogout = () => {
    dispatch(unsetUserInfo({ name: "", email: "" }));
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/login");
  };
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginStudent, { isLoading }] = useLoginStudentMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        {/* <TextField margin='normal' required fullWidth id='email' name='email' label='Email Address' />
                      {server_error.email ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.email[0]}</Typography> : ""}
                      <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
                      {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
                      <Box textAlign='center'>
                          {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
                      </Box>
                      <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
                      {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''} */}

        {
          <div class="super-dash-container">
            <header class="super-dash-header">
              <h2 class="welcome-super-dash">Welcome</h2>
              <div class="logout-button-super-dash">
                {access_token ? (
                  <Button onClick={handleLogout} class="logout-btn-super-dash">
                    Logout
                  </Button>
                ) : (
                  ""
                  //   TODO can implement a navigate to the login page functionality here
                )}
              </div>
            </header>
            <div class="super-dash-main">
              <img
                src={super_dashboard}
                class="super-dash-img"
                alt="students in hostel"
              />
              <div class="super-dash-menu">
                <a
                  href="./superadmindashboard/uploadcsv/"
                  class="btn-super-dash"
                >
                  <div class="box-super-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="icon-super-dash icon-super-dash-lock"
                    >
                      <path d="M16 16h-3v5h-2v-5h-3l4-4 4 4zm3.479-5.908c-.212-3.951-3.473-7.092-7.479-7.092s-7.267 3.141-7.479 7.092c-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h3.5v-2h-3.5c-1.93 0-3.5-1.57-3.5-3.5 0-2.797 2.479-3.833 4.433-3.72-.167-4.218 2.208-6.78 5.567-6.78 3.453 0 5.891 2.797 5.567 6.78 1.745-.046 4.433.751 4.433 3.72 0 1.93-1.57 3.5-3.5 3.5h-3.5v2h3.5c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408z" />
                    </svg>
                    <p class="title-super-dash">
                      <strong>Allocate Rooms</strong>
                    </p>
                    <p class="text-super-dash">
                      Upload file link containing student data to allocate
                      rooms.
                    </p>
                  </div>
                </a>
                <button
                  className="btn-admin-dash-pass"
                  onClick={(e) => {
                    navigate("/changepassword");
                  }}
                >
                  <div class="box-super-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      viewBox="0 0 24 24"
                      class="icon-super-dash icon-super-dash-lock"
                    >
                      <path d="M23.621 9.012c.247.959.379 1.964.379 3 0 6.623-5.377 11.988-12 11.988s-12-5.365-12-11.988c0-6.623 5.377-12 12-12 2.581 0 4.969.822 6.927 2.211l1.718-2.223 1.935 6.012h-6.58l1.703-2.204c-1.62-1.128-3.582-1.796-5.703-1.796-5.52 0-10 4.481-10 10 0 5.52 4.48 10 10 10 5.519 0 10-4.48 10-10 0-1.045-.161-2.053-.458-3h2.079zm-7.621 7.988h-8v-6h1v-2c0-1.656 1.344-3 3-3s3 1.344 3 3v2h1v6zm-5-8v2h2v-2c0-.552-.448-1-1-1s-1 .448-1 1z"></path>
                    </svg>
                    <p class="title-super-dash">
                      <strong>Change Password</strong>
                    </p>
                    <p class="text-super-dash">
                      Update your current password for improved account
                      security.
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        }
      </Box>
    </>
  );
};

export default SuperAdminDashboard;
