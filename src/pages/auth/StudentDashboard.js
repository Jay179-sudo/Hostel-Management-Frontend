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
import "../auth/staticfiles/start-page-style.css";
import "../auth/staticfiles/admin-dash-style.css";
import { unSetUserToken } from "../../features/authSlice";
import "../auth/staticfiles/stud-dash-style.css";
import hostel_dashboard from "../auth/mediafiles/hostel-dashboard-image.jpg";
import { unsetUserInfo } from "../../features/userSlice";

const StudentDashboard = () => {
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
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await loginStudent(actualData);
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
          <div class="stud-dash-container">
            <header class="stud-dash-header">
              <h2 class="welcome-student-dash">Welcome</h2>
              <div class="logout-button-student-dash">
                {access_token ? (
                  <Button
                    onClick={handleLogout}
                    class="logout-btn-student-dash"
                  >
                    Logout
                  </Button>
                ) : (
                  ""
                  //   TODO can implement a navigate to the login page functionality here
                )}
              </div>
            </header>
            <div class="stud-dash-main">
              <img
                src={hostel_dashboard}
                class="stud-dash-img"
                alt="students in hostel"
              />
              <div class="stud-dash-menu">
                <a
                  href="./studentdashboard/studentleavereq"
                  class="btn-student-dash"
                >
                  <div class="box-stud-dash">
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-stud-dash"
                    >
                      <path
                        d="m11.239 15.533c-1.045 3.004-1.238 3.451-1.238 3.84 0 .441.385.627.627.627.272 0 1.108-.301 3.829-1.249zm.888-.888 3.22 3.22 6.408-6.401c.163-.163.245-.376.245-.591 0-.213-.082-.427-.245-.591-.58-.579-1.458-1.457-2.039-2.036-.163-.163-.377-.245-.591-.245-.213 0-.428.082-.592.245zm-3.127-.895c0-.402-.356-.75-.75-.75-2.561 0-2.939 0-5.5 0-.394 0-.75.348-.75.75s.356.75.75.75h5.5c.394 0 .75-.348.75-.75zm5-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75zm0-3c0-.402-.356-.75-.75-.75-2.561 0-7.939 0-10.5 0-.394 0-.75.348-.75.75s.356.75.75.75h10.5c.394 0 .75-.348.75-.75z"
                        fill-rule="nonzero"
                      />
                    </svg>

                    <p class="title-stud-dash">
                      <strong>Leave Request Form</strong>
                    </p>
                    <p class="text-stud-dash">
                      Submit a request for time off from your academic
                      responsibilities.
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

export default StudentDashboard;
