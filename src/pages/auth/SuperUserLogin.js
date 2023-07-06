import {
  // TextField,
  // Button,
  Box,
  // Alert,
  // Typography,
  // CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { setUserToken } from "../../features/authSlice";
import { getToken, storeToken } from "../../services/LocalStorageService";
import { useLoginSuperUserMutation } from "../../services/userAuthApi";
import "./staticfiles/style-login.css";
import womanlogo from "../auth/mediafiles/office-image.png";
import { ForkLeft } from "@mui/icons-material";
const UserLogin = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [loginSuperUser, { isLoading }] = useLoginSuperUserMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      password: data.get("password"),
    };
    const res = await loginSuperUser(actualData);
    if (res.error) {
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      // console.log(typeof (res.data))
      // console.log(res.data)
      console.log(res.data.token);
      storeToken(res.data.token);
      let { access_token } = getToken();
      dispatch(setUserToken({ access_token: access_token }));
      navigate("/superuserdashboard");
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
        <div
          class="container-douchebag"
          // style={{
          //   display: "flex",
          //   // justifyContent: "space-between",
          //   gap: "80px",
          //   width: "95vw",
          // }}
        >
          <img src={womanlogo} alt="woman in office" class="login-image" />
          <div class="login-box">
            <div class="sign-in">
              <h2>Sign In</h2>
              <p class="signin-instruction">
                Enter your credentials to access your account.
              </p>
            </div>
            <div class="form-group first">
              <label for="email">Username</label>
              <input
                type="text"
                class="form-control"
                id="email"
                name="email"
                required
              />
            </div>
            <div class="form-group last">
              <label for="password">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                name="password"
                required
              />
            </div>

            <div class="forgot-password">
              <NavLink to="/sendpasswordresetemail" className="forgot-password-login-form">Forgot Password</NavLink>
            </div>
            <div class="submit-button">
              <input
                type="submit"
                value="Log In"
                class="btn btn-block btn-primary"
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UserLogin;
