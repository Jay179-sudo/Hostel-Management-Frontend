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
import { useGetemailfromroomMutation } from "../../services/userAuthApi";
import { useMarkAbsentMutation } from "../../services/userAuthApi";
import { useAbsentlistTodayMutation } from "../../services/userAuthApi";
import { useGetoccupiedroomsMutation } from "../../services/userAuthApi";
import { useCheckAbsentRecordMutation } from "../../services/userAuthApi";
import { useDeleteAbsentRecordMutation } from "../../services/userAuthApi";
import "./staticfiles/attendance-ground-style.css";
const HostelGroundFloor = () => {
  const navigate = useNavigate();
  const [getemailfromroom, { isLoading }] = useGetemailfromroomMutation();
  const [getoccupiedrooms] = useGetoccupiedroomsMutation();
  const [markAbsent] = useMarkAbsentMutation();
  const [absentlistToday] = useAbsentlistTodayMutation();
  const [checkAbsent] = useCheckAbsentRecordMutation();
  const [deleteAbsentRecord] = useDeleteAbsentRecordMutation();
  const [shouldRefresh, setShouldRefresh] = useState(false);
  const dispatch = useDispatch();

  const handleClick = async (roomNumber) => {
    console.log(roomNumber);

    const res = await getemailfromroom({
      roomNumber: roomNumber,
      access_token,
    });

    const absentPresent = await checkAbsent({
      email: res.data["email"],
      access_token,
    });
    console.log(absentPresent.data["msg"]);
    if (absentPresent.data["msg"] === "Absent") {
      const deleteAbsent = await deleteAbsentRecord({
        email: res.data["email"],
        access_token,
      });
    } else {
      const absentCall = await markAbsent({
        email: res.data["email"],
        access_token,
      });
    }

    setShouldRefresh(true);
  };
  const [buttons, setButtons] = useState([]);

  useEffect(() => {
    const generateButtons = async () => {
      const functionCall = await absentlistToday({ access_token });
      const getOccupiedRooms = await getoccupiedrooms({ access_token });
      let occupiedRooms = [];
      let absentTodayStudents = [];

      for (let i = 0; i < functionCall.data.length; i++) {
        absentTodayStudents.push(functionCall.data[i]["hostel_room"]);
      }

      for (let i = 0; i < getOccupiedRooms.data.length; i++) {
        occupiedRooms.push(getOccupiedRooms.data[i]["hostel_room"]);
      }
      // console.log(typeof occupiedRooms[0]);
      console.log(absentTodayStudents);
      const generatedButtons = [];
      console.log(occupiedRooms);
      for (let roomNumber = 1; roomNumber <= 61; roomNumber++) {
        if (occupiedRooms.includes(roomNumber)) {
          if (absentTodayStudents.includes(roomNumber)) {
            absentTodayStudents.shift();
            generatedButtons.push(
              <input
                type="submit"
                value={roomNumber}
                id={roomNumber}
                className={`submit-btn third-floor-btn ${roomNumber} occupied absent`}
                onClick={(e) => handleClick(e.target.value)}
                key={roomNumber}
              />
            );
          } else {
            generatedButtons.push(
              <input
                type="submit"
                value={roomNumber}
                id={roomNumber}
                className={`submit-btn third-floor-btn ${roomNumber} occupied present`}
                onClick={(e) => handleClick(e.target.value)}
                key={roomNumber}
              />
            );
          }
        } else {
          generatedButtons.push(
            <input
              type="submit"
              value={roomNumber}
              id={roomNumber}
              className={`submit-btn third-floor-btn ${roomNumber} unoccupied`}
              onClick={(e) => handleClick(e.target.value)}
              key={roomNumber}
            />
          );
        }
      }
      setButtons(generatedButtons);
      setShouldRefresh(false);
    };

    generateButtons();
  }, [shouldRefresh]); // Empty dependency array ensures the effect runs only once

  let { access_token } = getToken();
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }));
  }, [access_token, dispatch]);

  return (
    <>
      <div class="ground-floor-container">
        <header class="ground-floor-header">
          <div class="dashboard-button-ground-floor">
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
        <div class="attendance-nav">
          <div class="attendance-nav-button">
            <button
              className="attendance-nav-button-link"
              onClick={(e) => {
                navigate("/hosteladmindashboard/firstfloor");
              }}
            >
              First floor
            </button>
          </div>
          <div class="attendance-nav-button">
            <button
              className="attendance-nav-button-link"
              onClick={(e) => {
                navigate("/hosteladmindashboard/secondfloor");
              }}
            >
              Second floor
            </button>
          </div>
          <div class="attendance-nav-button">
            <button
              className="attendance-nav-button-link"
              onClick={(e) => {
                navigate("/hosteladmindashboard/thirdfloor");
              }}
            >
              Third floor
            </button>
          </div>
        </div>

        <div className="third-floor-main">{buttons}</div>
      </div>
    </>
  );
};

export default HostelGroundFloor;
