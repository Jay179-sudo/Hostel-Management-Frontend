import { Button, CssBaseline, Grid, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { unSetUserToken } from "../features/authSlice";
import { getToken, removeToken } from "../services/LocalStorageService";
import ChangePassword from "./auth/ChangePassword";
import { useGetLoggedUserQuery } from "../services/userAuthApi";
import { useGetuserTypeMutation } from "../services/userAuthApi";
import { useEffect, useState } from "react";
import { setUserInfo, unsetUserInfo } from "../features/userSlice";
import "./auth/staticfiles/dash-link-style.css";
import dashboard_image from "./auth/mediafiles/nav-link-image.jpg";
const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { access_token } = getToken();
  const { data, isSuccess } = useGetLoggedUserQuery(access_token);
  const [userType, { isLoading }] = useGetuserTypeMutation();
  const [userData, setUserData] = useState({
    email: "",
    name: "",
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        email: data.email,
        name: data.name,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const handleClick = async (e) => {
    e.preventDefault();
    const res = await userType({ access_token });
    // console.log("HUWA", res.error.status);
    if (res.error !== undefined && res.error.status === 401) {
      dispatch(unsetUserInfo({ name: "", email: "" }));
      dispatch(unSetUserToken({ access_token: null }));
      removeToken();
      navigate("/");
    } else {
      let userType1 = res.data["msg"];
      if (userType1 !== e.target.textContent.toUpperCase()) {
        navigate("/dashboard");
      } else {
        if (userType1 === "STUDENT") {
          navigate("/studentdashboard");
        } else if (userType1 === "MESS MANAGER") {
          navigate("/messmanagerdashboard");
        } else if (userType1 === "SUPER ADMIN") {
          navigate("/superadmindashboard");
        } else if (userType1 === "HOSTEL ADMIN") {
          navigate("/hosteladmindashboard");
        }
      }
    }
  };
  return (
    <>
      {
        <div class="nav-link-container">
          <div class="nav-link-main">
            <img src={dashboard_image} alt="Loading" class="nav-link-img" />
            <div class="nav-link-form">
              <h2 class="nav-link-h2">Navigation Links</h2>
              <form id="navigationLinkForm">
                <div class="nav-link-form-group">
                  <button
                    className="attendance-nav-button-link hosteladmin "
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Hostel Admin
                  </button>
                </div>
                <div class="nav-link-form-group">
                  <button
                    className="attendance-nav-button-link superadmin "
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Super Admin
                  </button>
                </div>
                <div class="nav-link-form-group">
                  <button
                    className="attendance-nav-button-link messmanager "
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Mess Manager
                  </button>
                </div>
                <div class="nav-link-form-group">
                  <button
                    className="attendance-nav-button-link student "
                    onClick={(e) => {
                      handleClick(e);
                    }}
                  >
                    Student
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    </>
  );
};

export default Dashboard;
