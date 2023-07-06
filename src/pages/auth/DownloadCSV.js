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
import { useGetAbsentCSVMutation } from "../../services/userAuthApi";
import { v4 as uuidv4 } from "uuid";
import "../auth/staticfiles/absent-specific-style.css";
import general_image from "../auth/mediafiles/absent-specific-image.jpg";
const DownloadCSV = () => {
  const [server_error, setServerError] = useState({});
  const [server_data, setServerData] = useState("");
  const navigate = useNavigate();
  const [getAbsentCSV, { isLoading }] = useGetAbsentCSVMutation();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      start_date: data.get("start_date"),
      end_date: data.get("end_date"),
    };
    // const ans = getToken();
    const res = await getAbsentCSV({ actualData, access_token });
    console.log(res);

    if (res.error) {
      setServerData([]);
      setServerError(res.error.data);
    } else if (res.data.length !== 0) {
      setServerError({});
      setServerData("You will receive an email soon!");
    } else {
      setServerError({});
      setServerData("");
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
                <h2 class="absent-specific-h2">Attedance List</h2>
                <p class="absent-specific-instruction">
                  Please fill out the following details to retrieve Attedance
                  List
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
        <div>
          
          <div className="absent-general-response-container">
          <button
            className="dashboard-back-button-third-floor"
            onClick={(e) => {
              navigate("/hosteladmindashboard");
            }}
          >
            Dashboard
          </button>
          <div className="absent-general-div">
          <h2 className="absent-general-response-h2">Absent Student General</h2>
          <p className="absent-general-para">{server_data}</p>
          </div></div>
          
        </div>
      )}
    </>
  );
};

export default DownloadCSV;
