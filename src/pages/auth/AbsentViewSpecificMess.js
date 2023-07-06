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
import { useAbsentviewspecificMutation } from "../../services/userAuthApi";
import { v4 as uuidv4 } from "uuid";
import "../auth/staticfiles/absent-specific-style.css";
import general_image from "../auth/mediafiles/absent-specific-image.jpg";
const AbsentViewSpecificMess = () => {
  const [server_error, setServerError] = useState({});
  const [server_data, setServerData] = useState([]);
  const navigate = useNavigate();
  const [absentviewspecific, { isLoading }] = useAbsentviewspecificMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email: data.get("email"),
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
    };
    // const ans = getToken();
    const res = await absentviewspecific({ actualData, access_token });
    if (res.error) {
      setServerData([]);
      setServerError(res.error.data);
    }

    if (res.data.length !== 0) {
      // console.log(typeof (res.data))
      // console.log(res.data)
      // TODO Change this
      setServerError({});
      setServerData(res.data);
    } else {
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
          <div class="absent-specific-container">
            <header class="absent-specific-header">
              <div class="dashboard-button-absent-specific">
                <button
                  className="dashboard-back-button-third-floor"
                  onClick={(e) => {
                    navigate("/messmanagerdashboard");
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
                <h2 class="absent-specific-h2">Absent Student Specific</h2>
                <p class="absent-specific-instruction">
                  Please fill out the following details to retrieve particular
                  student details.
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
                <div class="absent-specific-form-group absent-specific-email">
                  <label for="email">Email</label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    class="absent-specific-form-control"
                    placeholder="Enter Student email"
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
        <div>
          
          <div className="absent-specific-response-container">
          <button
            className="dashboard-back-button-third-floor"
            onClick={(e) => {
              navigate("/messmanagerdashboard");
            }}
          >
            Dashboard
          </button>
            <h2 className="absent-specific-h2">Absent Specific Student</h2>
            <div className="absent-specific-response-main">
              <div className="absent-specific-response-head">
                <p>Date Absent</p>
              </div>

              {server_data.map((item) => (
                <div key={uuidv4()} className="absent-specific-grid">
                  <div className="absent-specific-response-date">
                    {item.dateAbsent}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AbsentViewSpecificMess;
