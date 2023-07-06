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
import { useUpdateHostelRoomMutation } from "../../services/userAuthApi";
import "./staticfiles/room-update-style.css";
import nice_logo from "./mediafiles/room-update-image.jpg";
const UpdateHostelRoomComp = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [updateHostelRoom, { isLoading }] = useUpdateHostelRoomMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log(data.get("email"));
    const actualData = {
      email: data.get("email"),
      room: data.get("room"),
    };
    const res = await updateHostelRoom({ actualData, access_token });
    if (res.error) {
      // console.log(typeof (res.error.data.errors))
      // console.log(res.error.data.errors)
      setServerError(res.error.data.errors);
    }
    // if (res.data) {
    //     // console.log(typeof (res.data))
    //     // console.log(res.data)
    //     storeToken(res.data.token)
    //     let { access_token } = getToken()
    //     dispatch(setUserToken({ access_token: access_token }))
    //     navigate('/dashboard')
    // }
    // navigate("/dashboard");
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
        <div class="room-update-container">
          <header class="room-update-header">
            <div class="dashboard-button-room-update">
              <button
                className="dashboard-back-button-third-floor"
                onClick={(e) => {
                  navigate("/hosteladmindashboard");
                }}
              >
                Dashboard
              </button>
            </div>
          </header>
          <div class="room-update-main">
            <img
              src={nice_logo}
              alt="Hostel Gate and People"
              class="room-update-img"
            />
            <div class="room-update-form">
              <h2 class="room-update-h2">Room Updation</h2>
              <p class="room-update-instruction">
                Please fill out the following details to update rooms.
              </p>
              <div class="room-update-form-group room-update-email">
                <label for="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  class="room-update-form-control"
                  placeholder="Enter student email"
                  required
                />
              </div>
              <div class="room-update-form-group room-update-room-number">
                <label for="room">Room No.</label>
                <input
                  type="text"
                  id="room"
                  name="room"
                  class="room-update-form-control"
                  placeholder="Enter room number"
                  required
                />
              </div>

              <div class="room-update-form-group">
                <input
                  type="submit"
                  value="Submit"
                  class="submit-btn room-update-btn"
                />
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default UpdateHostelRoomComp;
