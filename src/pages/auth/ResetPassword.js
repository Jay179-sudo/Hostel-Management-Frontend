import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useResetPasswordMutation } from "../../services/userAuthApi";
import image_paste from "./mediafiles/reset-pass-image.jpg";
import "./staticfiles/reset-pass-style.css";
const ResetPassword = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [resetPassword] = useResetPasswordMutation();
  const { id, token } = useParams();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const res = await resetPassword({ actualData, id, token });
    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-reset-form").reset();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
  };
  return (
    <>
      <Grid container justifyContent="center">
        <Grid item sm={6} xs={12}>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1 }}
            id="password-reset-form"
            onSubmit={handleSubmit}
          >
            <div class="reset-pass-container">
              <div class="reset-pass-main">
                <img
                  src={image_paste}
                  alt="lock-and-key"
                  class="reset-pass-img"
                />
                <div class="reset-pass-form">
                  <h2 class="reset-pass-h2">Reset Password</h2>
                  <div class="reset-pass-form-group">
                    <label for="password">New Password</label>
                    <input
                      type="password"
                      id="password"
                      class="reset-pass-form-control"
                      name="password"
                      placeholder="New password"
                      required
                    />
                  </div>
                  <div class="reset-pass-form-group">
                    <label for="password2">Confirm New Password</label>
                    <input
                      type="password"
                      id="password2"
                      class="reset-pass-form-control"
                      name="password2"
                      placeholder="Re-enter password"
                      required
                    />
                  </div>
                  <div class="reset-pass-form-group">
                    <input
                      type="submit"
                      value="Submit"
                      class="reset-pass-btn"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default ResetPassword;
