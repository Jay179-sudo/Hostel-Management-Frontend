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
import { useGetleaverequestlistMutation } from "../../services/userAuthApi";
import { v4 as uuidv4 } from "uuid";
import "../auth/staticfiles/absent-specific-style.css";
import general_image from "../auth/mediafiles/absent-specific-image.jpg";
const GetLeaveRequestList = () => {
  const [server_error, setServerError] = useState({});
  const [server_data, setServerData] = useState([]);
  const navigate = useNavigate();
  const [getleaverequestlist, { isLoading }] = useGetleaverequestlistMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
    };
    // const ans = getToken();
    const res = await getleaverequestlist({ actualData, access_token });
    console.log(res);

    if (res.error) {
      setServerData([]);
      setServerError(res.error.data);
    } else if (res.data.length !== 0) {
      setServerError({});
      setServerData(res.data);

      //   navigate("/hosteladmindashboard");
    } else {
      setServerError({});
      setServerData([""]);
    }
  };
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <>
      {server_data.length === 0 ? (
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          id="login-form"
          onSubmit={handleSubmit}
        >
          {/* <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              name="email"
              label="Email"
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="start_date"
              name="start_date"
              label="Start Date"
            />
  
            <TextField
              margin="normal"
              required
              fullWidth
              id="end_date"
              name="end_date"
              label="End Date"
            />
  
            <Box textAlign="center">
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ mt: 3, mb: 2, px: 5 }}
                >
                  Submit
                </Button>
              )} */}

          {/* {server_error.error ? (
                <Typography
                  style={{ fontSize: 12, color: "red", paddingLeft: 10 }}
                >
                  {<div>You have an error!</div>}
                </Typography>
              ) : (
                ""
              )}
            </Box> */}
          <div class="absent-specific-container">
            <header class="absent-specific-header">
              <div class="dashboard-button-absent-specific">
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
            <div class="absent-specific-main">
              <img
                src={general_image}
                alt="Searching in file"
                class="absent-specific-img"
              />
              <div class="absent-specific-form">
                <h2 class="absent-specific-h2">Leave Request List</h2>
                <p class="absent-specific-instruction">
                  Please fill out the following details to retrieve leave
                  request list
                </p>
                <div class="absent-specific-form-group absent-specific-start-date">
                  <label for="start_date">Start Date</label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    class="absent-specific-form-control"
                    required
                  />
                </div>
                <div class="absent-specific-form-group absent-specific-end-date">
                  <label for="end_date">End Date</label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    class="absent-specific-form-control"
                    required
                  />
                </div>

                <div class="absent-specific-form-group">
                  <input
                    type="submit"
                    value="Submit"
                    class="absent-specific-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        <div className="leave-list-response-container">
          <button
            className="dashboard-back-button-third-floor"
            onClick={(e) => {
              navigate("/hosteladmindashboard");
            }}
          >
            Dashboard
          </button>
          <h2 className="leave-list-h2">Leave Records</h2>
          <div className="leave-list-head-grid">
            <div className="leave-list-response-head">
              <p>Start Date</p>
            </div>
            <div className="leave-list-response-head">
              <p>End Date</p>
            </div>
            <div className="leave-list-response-head">
              <p>Email</p>
            </div>
            <div className="leave-list-response-head">
              <p>Hostel Name</p>
            </div>
          </div>
          <div className="leave-list-response-main">
            {server_data.map((item) => (
              <div key={uuidv4()} className="leave-list-grid">
                <div className="leave-list-response-start">
                  {item.start_date}
                </div>
                <div className="leave-list-response-end">{item.end_date}</div>
                <div className="leave-list-response-email">
                  {item.student__email}
                </div>
                <div className="leave-list-response-hostel">
                  {item.hostel__name}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default GetLeaveRequestList;
