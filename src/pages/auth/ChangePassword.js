import { Box, TextField, Button, Alert, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useChangeUserPasswordMutation } from "../../services/userAuthApi";
import { getToken, removeToken } from "../../services/LocalStorageService";
import "../auth/staticfiles/change-password-style.css";
import lock_key from "../auth/mediafiles/change-password-image.jpg";
import { unSetUserToken } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { unsetUserInfo } from "../../features/userSlice";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const dispatch = useDispatch();
  const [server_reply_msg, setServerReplyMsg] = useState("");
  const [changeUserPassword] = useChangeUserPasswordMutation();
  const { access_token } = getToken();

  const handleSubmit = async (event) => {
    console.log("Hey ho");
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      email: myData.email,
      password: data.get("password"),
      password2: data.get("password2"),
    };
    const res = await changeUserPassword({ actualData, access_token });
    console.log(res);
    if (res.error) {
      if (res.error !== undefined && res.error.status === 401) {
        removeToken();
        navigate("/");
      } else {
        setServerMsg({});
        setServerError(res.error.data.errors);
        setServerReplyMsg("Invalid Parameters! Please Try Again");
      }
    } else if (res.data) {
      setServerError({});
      setServerReplyMsg("");
      setServerMsg(res.data);
      document.getElementById("password-change-form").reset();
      dispatch(unsetUserInfo({ name: "", email: "" }));
      dispatch(unSetUserToken({ access_token: null }));
      removeToken();
      navigate("/");
    }
  };
  // Getting User Data from Redux Store
  const myData = useSelector((state) => state.user);
  // console.log("Change Password", myData)

  return (
    <>
      {
        <Box
          component="form"
          onSubmit={(e) => handleSubmit(e)}
          noValidate
          sx={{ mt: 1 }}
          id="password-change-form"
        >
          <div className="change-pass-container">
            <header className="change-pass-header">
              <div className="dashboard-button-change-pass">
                <button
                  className="dashboard-back-button-third-floor"
                  onClick={(e) => {
                    navigate("/dashboard");
                  }}
                  type="button"
                >
                  Dashboard
                </button>
              </div>
            </header>
            <div className="change-pass-main">
              <img
                src={lock_key}
                alt="lock-and-key"
                className="change-pass-img"
              />
              <div className="change-pass-form">
                <h2 className="change-pass-h2">Change Password</h2>
                <div className="change-pass-form-group">
                  <label for="password">Old Password</label>
                  <input
                    type="password"
                    id="password"
                    className="change-pass-form-control"
                    name="password"
                    placeholder=""
                    required
                  />
                </div>
                <div className="change-pass-form-group">
                  <label for="password2">New Password</label>
                  <input
                    type="password"
                    id="password2"
                    className="change-pass-form-control"
                    name="password2"
                    placeholder=""
                    required
                  />
                </div>
                <div className="change-pass-form-group">
                  <input
                    type="submit"
                    value="Submit"
                    class="submit-btn leave-request-btn"
                  />
                </div>
                {server_reply_msg !== "" ? (
                  <p id="message">{server_reply_msg}</p>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </Box>
      }
    </>
  );
};

export default ChangePassword;
