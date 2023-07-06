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
import hostel_room from "../auth/mediafiles/hostel-room.jpg";
import hostel_outer from "../auth/mediafiles/hostel-outer.jpg";
import "../auth/staticfiles/admin-dash-style.css";
import admin_dashbaord from "../auth/mediafiles/admin-dashboard-image.jpg";
import { unSetUserToken } from "../../features/authSlice";
import "../auth/staticfiles/mess-dash-style.css";
import mess_dashboard from "../auth/mediafiles/mess-dashboard-image.jpg";
import { unsetUserInfo } from "../../features/userSlice";
const MessManagerDashboard = () => {
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
          <div class="mess-dash-container">
            <header class="mess-dash-header">
              <h2 class="welcome-mess-dash">Welcome</h2>
              <div class="logout-button-mess-dash">
                {access_token ? (
                  <Button onClick={handleLogout} class="logout-btn-mess-dash">
                    Logout
                  </Button>
                ) : (
                  ""
                  //   TODO can implement a navigate to the login page functionality here
                )}
              </div>
            </header>
            <div class="mess-dash-main">
              <img
                src={mess_dashboard}
                class="mess-dash-img"
                alt="students in hostel"
              />
              <div class="mess-dash-menu">
                {/* TODO Need to have a common page for both mess manager and hostel admin! */}
                <a
                  href="messmanagerdashboard/absentviewtotal/"
                  class="btn-mess-dash"
                >
                  <div class="box-mess-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      class="icon-mess-dash icon-mess-dash-searchfile"
                    >
                      <path d="M17.825 24h-15.825v-24h10.189c3.162 0 9.811 7.223 9.811 9.614v10.071l-2-2v-7.228c0-4.107-6-2.457-6-2.457s1.517-6-2.638-6h-7.362v20h11.825l2 2zm-2.026-4.858c-.799.542-1.762.858-2.799.858-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1-.294 1.932-.801 2.714l4.801 4.872-1.414 1.414-4.787-4.858zm-2.799-7.142c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z" />
                    </svg>
                    <p class="title-mess-dash">
                      <strong>Absent Student General</strong>
                    </p>
                    <p class="text-mess-dash">
                      View a list of all students' absences within a selected
                      date range.
                    </p>
                  </div>
                </a>
                {/* TODO Need to have a common page for both mess manager and hostel admin! */}
                <a
                  href="messmanagerdashboard/absentviewspecific/"
                  class="btn-mess-dash"
                >
                  <div class="box-mess-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="icon-mess-dash icon-mess-dash-searchname"
                    >
                      <path d="M13 8h-8v-1h8v1zm0 2h-8v-1h8v1zm-3 2h-5v-1h5v1zm11.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                    </svg>
                    <p class="title-mess-dash">
                      <strong>Absent Student Specific</strong>
                    </p>
                    <p class="text-mess-dash">
                      Retrieve the absence details of a specific student within
                      a selected date range.
                    </p>
                  </div>
                </a>
                {/* TODO Function call implementation left */}
                <a
                  href="messmanagerdashboard/currentstrength/"
                  class="btn-mess-dash"
                >
                  <div class="box-mess-dash">
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-mess-dash icon-mess-dash-listdeatails"
                    >
                      <path
                        d="m3.3 15.4c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.85c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6.55c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.3c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7.75c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <p class="title-mess-dash">
                      <strong>Current Student Strength</strong>
                    </p>
                    <p class="text-mess-dash">
                      Retrieve the current count of students present in the
                      hostel.
                    </p>
                  </div>
                </a>
                {/* TODO Common Change Password Functionality */}
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

export default MessManagerDashboard;
