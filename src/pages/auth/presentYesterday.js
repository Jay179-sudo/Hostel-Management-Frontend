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
import { useAbsentYesterdayMutation } from "../../services/userAuthApi";
import { v4 as uuidv4 } from "uuid";
import "../auth/staticfiles/absent-specific-style.css";
import general_image from "../auth/mediafiles/absent-specific-image.jpg";
const PresentYesterday = () => {
  const [server_error, setServerError] = useState({});
  const [number, setnumber] = useState();
  const [total_occupied, settotal_occupied] = useState();
  const navigate = useNavigate();
  const [absentYesterday, { isLoading }] = useAbsentYesterdayMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    const getData = async () => {
      const res = await absentYesterday({ access_token });
      console.log(res);

      if (res.error) {
        setServerError(res.error.data);
      } else if (res.data) {
        setServerError({});
        setnumber(res.data["number"]);
        settotal_occupied(res.data["total_occupied"]);

        //   navigate("/hosteladmindashboard");
      }
    };

    getData();
  }, []);
  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <>
      {
        <div className="strength-big-container">
          <button
            className="dashboard-back-button-third-floor"
            onClick={(e) => {
              navigate("/messmanagerdashboard");
            }}
          >
            Dashboard
          </button>
          <div className="student-strength-cointainer">
            <h2 className="strength-h2">Current Strength Hostel</h2>
            <div className="yesterday-total">
              <p className="yesterday-total-para">Total Strength: {total_occupied}</p>

              <p className="yesterday-total-para">Students Absent Yesterday: {number}</p>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default PresentYesterday;
