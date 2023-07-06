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
import { useAbsentviewtotalMutation } from "../../services/userAuthApi";
import "../auth/staticfiles/absent-general-style.css";
import general_image from "../auth/mediafiles/absent-general-image.jpg";
import { v4 as uuidv4 } from "uuid";
const AbsentViewTotalMess = () => {
  const [server_error, setServerError] = useState({});
  const [server_data, setServerData] = useState([]);
  const navigate = useNavigate();
  const [absentviewtotal, { isLoading }] = useAbsentviewtotalMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
    };
    const res = await absentviewtotal({ actualData, access_token });
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
          <div class="absent-general-container">
            <header class="absent-general-header">
              <div class="dashboard-button-absent-general">
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
            <div class="absent-general-main">
              <img
                src={general_image}
                alt="Searching in file"
                class="absent-general-img"
              />
              <div class="absent-general-form">
                <h2 class="absent-general-h2">Absent Students General</h2>
                <p class="absent-general-instruction">
                  Please fill out the following details to retrieve absent
                  student details.
                </p>
                <div class="absent-general-form-group absent-general-start-date">
                  <label for="start_date">Start Date</label>
                  <input
                    type="date"
                    id="start_date"
                    name="start_date"
                    class="absent-general-form-control"
                    required
                  />
                </div>
                <div class="absent-general-form-group absent-general-end-date">
                  <label for="end_date">End Date</label>
                  <input
                    type="date"
                    id="end_date"
                    name="end_date"
                    class="absent-general-form-control"
                    required
                  />
                </div>

                <div class="absent-general-form-group">
                  <input
                    type="submit"
                    value="Submit"
                    class="absent-general-btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </Box>
      ) : (
        <div>
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
          <div className="absent-general-response-container">
            <div className="absent-general-response-main">
              <h2 className="absent-general-h2">Absent Student General</h2>
              <div className="absent-general-head-grid">
                <div className="absent-student-response-head">
                  <p>Email</p>
                </div>
                <div className="absent-student-response-tail">
                  <p>Days Absent</p>
                </div>
              </div>
              {server_data.map((item) => (
                <div key={uuidv4()} className="absent-general-grid">
                  <div className="absent-general-response-email">
                    {item.studentId__email}
                  </div>
                  <div className="absent-general-response-days">
                    {item.num_days}
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

export default AbsentViewTotalMess;
