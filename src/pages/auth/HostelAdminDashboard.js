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

import { unsetUserInfo } from "../../features/userSlice";
const HostelAdminDashboard = () => {
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
    if (res.data.length !== 0) {
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
          <div class="admin-dash-container">
            <header class="admin-dash-header">
              <h2 class="welcome-admin-dash">Welcome</h2>
              <div class="logout-button-admin-dash">
                <Button onClick={handleLogout} class="logout-btn-admin-dash">
                  Logout
                </Button>
              </div>
            </header>
            <div class="admin-dash-main">
              <img
                src={admin_dashbaord}
                class="admin-dash-img"
                alt="students in hostel"
              />
              <div class="admin-dash-menu">
                <a href="./hosteladmindashboard/ground" class="btn-admin-dash">
                  <div class="box-admin-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="icon-admin-dash icon-admin-dash-clipboard"
                    >
                      <path d="M13 17h4v1h-4v-1zm0-1h4v-1h-4v1zm9-14v22h-20v-22h3c1.23 0 2.181-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1 .553 0 1-.448 1-1s-.447-1-1-1c-.552 0-1 .448-1 1zm9 1h-4l-2 2h-3.897l-2.103-2h-4v18h16v-18zm-7 9h4v-1h-4v1zm0-2h4v-1h-4v1zm-6.5.077l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.288c-.963.841-1.669 1.777-2.686 3.6-.626-.738-1.044-1.208-1.814-1.923zm.098 5l.386-.355c.449.218.735.383 1.241.745.952-1.081 1.58-1.627 2.748-2.355l.125.289c-.963.841-1.669 1.777-2.686 3.6-.627-.739-1.045-1.209-1.814-1.924z" />
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Attendance</strong>
                    </p>
                    <p class="text-admin-dash">
                      Record and track the daily attendance of hostel students.
                    </p>
                  </div>
                </a>

                <a
                  href="./hosteladmindashboard/updateroomalloc"
                  class="btn-admin-dash"
                >
                  <div class="box-admin-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="icon-admin-dash icon-admin-dash-updation"
                    >
                      <path d="M12.255 21.954c-.443.03-.865.046-1.247.046-3.412 0-8.008-1.002-8.008-2.614v-2.04c2.197 1.393 5.513 1.819 8.099 1.778-.146-.64-.161-1.39-.085-1.998h-.006c-3.412 0-8.008-1.001-8.008-2.613v-2.364c2.116 1.341 5.17 1.78 8.008 1.78l.569-.011.403-2.02c-.342.019-.672.031-.973.031-3.425-.001-8.007-1.007-8.007-2.615v-2.371c2.117 1.342 5.17 1.78 8.008 1.78 2.829 0 5.876-.438 7.992-1.78v2.372c0 .871-.391 1.342-1 1.686 1.178 0 2.109.282 3 .707v-7.347c0-3.361-5.965-4.361-9.992-4.361-4.225 0-10.008 1.001-10.008 4.361v15.277c0 3.362 6.209 4.362 10.008 4.362.935 0 2.018-.062 3.119-.205-1.031-.691-1.388-1.134-1.872-1.841zm-1.247-19.954c3.638 0 7.992.909 7.992 2.361 0 1.581-5.104 2.361-7.992 2.361-3.412.001-8.008-.905-8.008-2.361 0-1.584 4.812-2.361 8.008-2.361zm6.992 15h-5l1-5 1.396 1.745c.759-.467 1.647-.745 2.604-.745 2.426 0 4.445 1.729 4.901 4.02l-1.96.398c-.271-1.376-1.486-2.418-2.941-2.418-.483 0-.933.125-1.335.331l1.335 1.669zm5 2h-5l1.335 1.669c-.402.206-.852.331-1.335.331-1.455 0-2.67-1.042-2.941-2.418l-1.96.398c.456 2.291 2.475 4.02 4.901 4.02.957 0 1.845-.278 2.604-.745l1.396 1.745 1-5z" />
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Room Updation</strong>
                    </p>
                    <p class="text-admin-dash">
                      Manage and update the room assignments and information for
                      hostel students.
                    </p>
                  </div>
                </a>

                <a
                  href="./hosteladmindashboard/downloadcsv/"
                  class="btn-admin-dash"
                >
                  <div class="box-admin-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      class="icon-admin-dash icon-admin-dash-searchfile"
                    >
                      <path d="M17.825 24h-15.825v-24h10.189c3.162 0 9.811 7.223 9.811 9.614v10.071l-2-2v-7.228c0-4.107-6-2.457-6-2.457s1.517-6-2.638-6h-7.362v20h11.825l2 2zm-2.026-4.858c-.799.542-1.762.858-2.799.858-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5c0 1-.294 1.932-.801 2.714l4.801 4.872-1.414 1.414-4.787-4.858zm-2.799-7.142c1.656 0 3 1.344 3 3s-1.344 3-3 3-3-1.344-3-3 1.344-3 3-3z" />
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Absent Student General</strong>
                    </p>
                    <p class="text-admin-dash">
                      View a list of all students' absences within a selected
                      date range.
                    </p>
                  </div>
                </a>

                <a
                  href="./hosteladmindashboard/absentviewspecific"
                  class="btn-admin-dash"
                >
                  <div class="box-admin-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      class="icon-admin-dash icon-admin-dash-searchname"
                    >
                      <path d="M13 8h-8v-1h8v1zm0 2h-8v-1h8v1zm-3 2h-5v-1h5v1zm11.172 12l-7.387-7.387c-1.388.874-3.024 1.387-4.785 1.387-4.971 0-9-4.029-9-9s4.029-9 9-9 9 4.029 9 9c0 1.761-.514 3.398-1.387 4.785l7.387 7.387-2.828 2.828zm-12.172-8c3.859 0 7-3.14 7-7s-3.141-7-7-7-7 3.14-7 7 3.141 7 7 7z" />
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Absent Student Specific</strong>
                    </p>
                    <p class="text-admin-dash">
                      Retrieve the absence details of a specific student within
                      a selected date range.
                    </p>
                  </div>
                </a>
                {/* TODO */}
                <a
                  href="./hosteladmindashboard/getleaverequestlist"
                  class="btn-admin-dash"
                >
                  <div class="box-admin-dash">
                    <svg
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                      stroke-linejoin="round"
                      stroke-miterlimit="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      class="icon-admin-dash icon-admin-dash-listdeatails"
                    >
                      <path
                        d="m3.3 15.4c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.85c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6.55c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7 1.3c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75zm-2.7-6c.717 0 1.3.583 1.3 1.3s-.583 1.3-1.3 1.3-1.3-.583-1.3-1.3.583-1.3 1.3-1.3zm2.7.75c0-.414.336-.75.75-.75h14.5c.414 0 .75.336.75.75s-.336.75-.75.75h-14.5c-.414 0-.75-.336-.75-.75z"
                        fill-rule="nonzero"
                      />
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Leave Request List</strong>
                    </p>
                    <p class="text-admin-dash">
                      Access and review the details of all leave requests
                      submitted by hostel students.
                    </p>
                  </div>
                </a>
                {/* TODO */}
                <button
                  className="btn-admin-dash-pass"
                  onClick={(e) => {
                    navigate("/changepassword");
                  }}
                >
                  <div class="box-admin-dash">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      viewBox="0 0 24 24"
                      class="icon-admin-dash icon-admin-dash-lock"
                    >
                      <path d="M23.621 9.012c.247.959.379 1.964.379 3 0 6.623-5.377 11.988-12 11.988s-12-5.365-12-11.988c0-6.623 5.377-12 12-12 2.581 0 4.969.822 6.927 2.211l1.718-2.223 1.935 6.012h-6.58l1.703-2.204c-1.62-1.128-3.582-1.796-5.703-1.796-5.52 0-10 4.481-10 10 0 5.52 4.48 10 10 10 5.519 0 10-4.48 10-10 0-1.045-.161-2.053-.458-3h2.079zm-7.621 7.988h-8v-6h1v-2c0-1.656 1.344-3 3-3s3 1.344 3 3v2h1v6zm-5-8v2h2v-2c0-.552-.448-1-1-1s-1 .448-1 1z"></path>
                    </svg>
                    <p class="title-admin-dash">
                      <strong>Change Password</strong>
                    </p>
                    <p class="text-admin-dash">
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

export default HostelAdminDashboard;
