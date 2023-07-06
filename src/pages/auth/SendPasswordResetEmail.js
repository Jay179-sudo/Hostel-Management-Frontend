import { Grid, TextField, Button, Box, Alert, Typography } from "@mui/material";
import { useState } from "react";
import { useSendPasswordResetEmailMutation } from "../../services/userAuthApi";
import "./staticfiles/reset-password-style.css";
import image_logo from "./mediafiles/reset-email-image.jpg";
const SendPasswordResetEmail = () => {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
    };
    const res = await sendPasswordResetEmail(actualData);
    if (res.error) {
      console.log(typeof res.error.data.errors);
      console.log(res.error.data.errors);
      setServerMsg({});
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      console.log(typeof res.data);
      console.log(res.data);
      setServerError({});
      setServerMsg(res.data);
      document.getElementById("password-reset-email-form").reset();
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
            id="password-reset-email-form"
            onSubmit={handleSubmit}
          >
            <div class="reset-email-container">
              <div class="reset-email-main">
                <img
                  src={image_logo}
                  alt="lock-and-key"
                  class="reset-email-img"
                />
                <div class="reset-email-form">
                  <h2 class="reset-email-h2">Reset Password</h2>
                  <div class="reset-email-form-group">
                    <label for="email">Registered Email ID</label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      class="reset-email-form-control"
                      required
                    />
                  </div>
                  <div class="reset-email-form-group">
                    <input
                      type="submit"
                      value="Submit"
                      class="reset-email-btn"
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

export default SendPasswordResetEmail;
