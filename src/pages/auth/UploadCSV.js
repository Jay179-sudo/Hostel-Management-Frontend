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
import { removeToken } from "../../services/LocalStorageService";
import { useUploadcsvMutation } from "../../services/userAuthApi";
import "../auth/staticfiles/upload-csv-style.css";
import csv_allocation from "../auth/mediafiles/upload-csv-image.jpg";
const UploadCSV = () => {
  const [server_error, setServerError] = useState({});
  const navigate = useNavigate();
  const [uploadcsv, { isLoading }] = useUploadcsvMutation();
  const [server_reply_msg, setServerReplyMsg] = useState("");
  const [server_msg, setServerMsg] = useState("");
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      csv: data.get("link"),
    };
    const res = await uploadcsv({ actualData, access_token });
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
      // console.log(typeof (res.data))
      // console.log(res.data)
      setServerError({});
      setServerMsg("");
      navigate("/superadmindashboard");
    }
  };

  return (
    <>
      <Box
        component="form"
        noValidate
        sx={{ mt: 1 }}
        id="login-form"
        onSubmit={handleSubmit}
      >
        <div class="upload-csv-container">
          <header class="upload-csv-header">
            <div class="dashboard-button-upload-csv">
              <button
                className="dashboard-back-button-third-floor"
                onClick={(e) => {
                  navigate("/superadmindashboard");
                }}
              >
                Dashboard
              </button>
            </div>
          </header>
          <div class="upload-csv-main">
            <img
              src={csv_allocation}
              alt="lock-and-key"
              class="upload-csv-img"
            />
            <div class="upload-csv-form">
              <h2 class="upload-csv-h2">Room Allocation</h2>
              <div class="upload-csv-form-group">
                <label for="link">Spreadsheet Link</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  class="upload-csv-form-control"
                  required
                />
              </div>
              <div class="upload-csv-form-group">
                <input type="submit" value="Submit" class="upload-csv-btn" />
              </div>
            </div>
            {server_msg !== "" ? <div>{server_msg}</div> : <div></div>}
          </div>
        </div>
      </Box>
    </>
  );
};

export default UploadCSV;
