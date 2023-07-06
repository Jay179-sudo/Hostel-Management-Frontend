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
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginStudentMutation } from "../../services/userAuthApi";
import "../auth/staticfiles/start-page-style.css";
import hostel_room from "../auth/mediafiles/hostel-room.jpg";
import hostel_outer from "../auth/mediafiles/hostel-outer.jpg";
const LandingPage = () => {
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
      setServerError(res.error.data.errors);
    }
    if (res.data) {
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
              <TextField margin='normal' required fullWidth id='password' name='password' label='Password' type='password' />
              {server_error.password ? <Typography style={{ fontSize: 12, color: 'red', paddingLeft: 10 }}>{server_error.password[0]}</Typography> : ""}
              <Box textAlign='center'>
                  {isLoading ? <CircularProgress /> : <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }}>Login</Button>}
              </Box>
              <NavLink to='/sendpasswordresetemail' >Forgot Password ?</NavLink>
              {server_error.non_field_errors ? <Alert severity='error'>{server_error.non_field_errors[0]}</Alert> : ''} */}

        {
          <div class="start-container">
            <header class="start-header">
              <div class="start-header-box">
                <h1 class="start-h1">
                  Effortlessly Manage Hostel Operations with HostelMate
                </h1>
                <p>
                  Simplify hostel management with HostelMate. Effortlessly
                  allocate rooms, track attendance, and manage leave requests.
                  Experience streamlined operations and enhanced student
                  experiences. HostelMate revolutionizes hostel management for
                  you.
                </p>

                <a class="start-btn start-btn--big" href="/login">
                  Get started
                </a>
              </div>
              <img
                src={hostel_outer}
                alt="Hostel common area"
                class="header-image"
              />
            </header>
            <section class="start-section">
              <img
                src={hostel_room}
                class="get-started-img"
                alt="hostel room"
              />
              <div class="get-started">
                <p class="get-started-title">
                  <strong>Experience the Power of HostelMate</strong>
                </p>
                <p class="get-started-text">
                  Revolutionize hostel management with HostelMate's
                  comprehensive suite of features. Simplify operations, enhance
                  student experiences, and ensure efficient hostel management
                  like never before.
                </p>
              </div>
            </section>
            <section>
              <h2 class="start-h2">What makes HostelMate special</h2>
              <div class="grid-2-cols">
                <div class="start-feature-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 256 256"
                    class="start-feature-icon"
                  >
                    <path d="M208,72H24V48A8,8,0,0,0,8,48V208a8,8,0,0,0,16,0V176H232v32a8,8,0,0,0,16,0V112A40,40,0,0,0,208,72ZM24,88H96v72H24Zm88,72V88h96a24,24,0,0,1,24,24v48Z"></path>
                  </svg>
                  <p class="start-feature-title">
                    <strong>Effortless Room Allocation</strong>
                  </p>
                  <p class="start-feature-text">
                    Seamlessly assign rooms to students with HostelMate's
                    intuitive interface. Optimize hostel resources and ensure a
                    smooth and efficient allocation process.
                  </p>
                </div>

                <div class="start-feature-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 256 256"
                    class="start-feature-icon"
                  >
                    <path d="M168,152a8,8,0,0,1-8,8H96a8,8,0,0,1,0-16h64A8,8,0,0,1,168,152Zm-8-40H96a8,8,0,0,0,0,16h64a8,8,0,0,0,0-16Zm56-64V216a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V48A16,16,0,0,1,56,32H92.26a47.92,47.92,0,0,1,71.48,0H200A16,16,0,0,1,216,48ZM96,64h64a32,32,0,0,0-64,0ZM200,48H173.25A47.93,47.93,0,0,1,176,64v8a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V64a47.93,47.93,0,0,1,2.75-16H56V216H200Z"></path>
                  </svg>
                  <p class="start-feature-title">
                    <strong>Track Attendance with Ease</strong>
                  </p>
                  <p class="start-feature-text">
                    Keep track of student attendance effortlessly. HostelMate
                    simplifies the task of recording attendance, providing
                    accurate and up-to-date information to administrators.
                  </p>
                </div>

                <div class="start-feature-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 256 256"
                    class="start-feature-icon"
                  >
                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                  </svg>
                  <p class="start-feature-title">
                    <strong>Identify Absences</strong>
                  </p>
                  <p class="start-feature-text">
                    Stay informed about student absences on specific dates.
                    HostelMate enables easy tracking of absenteeism, helping
                    administrators address attendance concerns promptly.
                  </p>
                </div>

                <div class="start-feature-box">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 256 256"
                    class="start-feature-icon"
                  >
                    <path d="M224,48H32a8,8,0,0,0-8,8V192a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A8,8,0,0,0,224,48ZM203.43,64,128,133.15,52.57,64ZM216,192H40V74.19l82.59,75.71a8,8,0,0,0,10.82,0L216,74.19V192Z"></path>
                  </svg>
                  <p class="start-feature-title">
                    <strong>Streamlined Leave Management</strong>
                  </p>
                  <p class="start-feature-text">
                    Streamline the leave application process. Students can
                    submit leave requests through HostelMate, allowing
                    administrators to efficiently review and respond. Enhance
                    communication and manage student leaves effectively.
                  </p>
                </div>
              </div>
            </section>
            <footer class="start-footer">
              Copyright &copy; 2023 by Jay Prasad, Shebin Varghese. Part of
              "Summer Project".
            </footer>
          </div>
        }
      </Box>
    </>
  );
};

export default LandingPage;
