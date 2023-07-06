import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import CreateLeaveRequest from "./pages/auth/createLeaveRequests";
import UpdateHostelRoomComp from "./pages/auth/updateRoomAllocation";
import MarkAbsent from "./pages/auth/markAbsent";
import UploadCSV from "./pages/auth/UploadCSV";
import AbsentViewSpecific from "./pages/auth/AbsentViewSpecific";
import AbsentViewTotal from "./pages/auth/AbsentViewTotal";
import Contact from "./pages/Contact";
import HostelAdminDashboard from "./pages/auth/HostelAdminDashboard";
import LandingPage from "./pages/auth/LandingPage";
import Dashboard from "./pages/Dashboard";

// Mess Manager
import MessManagerDashboard from "./pages/auth/MessManagerDashboard";
import AbsentViewTotalMess from "./pages/auth/AbsentViewTotalMess.js";
import AbsentViewSpecificMess from "./pages/auth/AbsentViewSpecificMess.js";
import PresentYesterday from "./pages/auth/presentYesterday.js";
// Student
import StudentDashboard from "./pages/auth/StudentDashboard";
import GetLeaveRequestList from "./pages/auth/LeaveRequestList";

// super admin
import SuperAdminDashboard from "./pages/auth/SuperAdminDashboard";

// hostel admin
import HostelAdminLogin from "./pages/auth/LoginHostelAdmin";
import HostelThirdFloor from "./pages/auth/HostelThirdFloor.js";
import HostelSecondFloor from "./pages/auth/HostelSecondFloor.js";
import HostelFirstFloor from "./pages/auth/HostelFirstFloor.js";
import HostelGroundFloor from "./pages/auth/HostelGroundFloor";
import DownloadCSV from "./pages/auth/DownloadCSV";
// Change password
import ChangePassword from "./pages/auth/ChangePassword";

import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
function App() {
  const { access_token } = useSelector((state) => state.auth);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* <Route index element={<Home />} /> */}
            <Route path="contact" element={<Contact />} />
            <Route
              path="login"
              element={
                !access_token ? <LoginReg /> : <Navigate to="/dashboard" />
              }
            />
            <Route
              path="sendpasswordresetemail"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="api/user/reset/:id/:token"
              element={<ResetPassword />}
            />
            {/* Hostel Admin */}
            <Route
              path="hosteladmindashboard/login/"
              element={<HostelAdminLogin></HostelAdminLogin>}
            />
            <Route
              path="hosteladmindashboard/getleaverequestlist/"
              element={<GetLeaveRequestList></GetLeaveRequestList>}
            />
            <Route
              path="hosteladmindashboard/updateroomalloc/"
              element={<UpdateHostelRoomComp></UpdateHostelRoomComp>}
            />

            <Route
              path="hosteladmindashboard/markabsent/"
              element={<MarkAbsent></MarkAbsent>}
            />
            <Route
              path="hosteladmindashboard/absentviewspecific/"
              element={<AbsentViewSpecific></AbsentViewSpecific>}
            />

            <Route
              path="hosteladmindashboard/thirdfloor/"
              element={<HostelThirdFloor></HostelThirdFloor>}
            />
            <Route
              path="hosteladmindashboard/secondfloor/"
              element={<HostelSecondFloor></HostelSecondFloor>}
            />
            <Route
              path="hosteladmindashboard/firstfloor/"
              element={<HostelFirstFloor></HostelFirstFloor>}
            />
            <Route
              path="hosteladmindashboard/ground/"
              element={<HostelGroundFloor></HostelGroundFloor>}
            />

            <Route
              path="hosteladmindashboard/absentviewtotal/"
              element={<AbsentViewTotal></AbsentViewTotal>}
            />

            <Route index path="/" element={<LandingPage></LandingPage>} />
            <Route
              index
              path="/hosteladmindashboard"
              element={<HostelAdminDashboard></HostelAdminDashboard>}
            />
          </Route>
          {/* MessManagerDashboard */}
          <Route
            index
            path="/messmanagerdashboard"
            element={<MessManagerDashboard></MessManagerDashboard>}
          />
          <Route
            path="messmanagerdashboard/absentviewtotal/"
            element={<AbsentViewTotalMess></AbsentViewTotalMess>}
          />
          <Route
            path="messmanagerdashboard/absentviewspecific/"
            element={<AbsentViewSpecificMess></AbsentViewSpecificMess>}
          />
          {/* presentYesterday */}
          <Route
            path="messmanagerdashboard/currentstrength/"
            element={<PresentYesterday></PresentYesterday>}
          />
          {/* current student strength */}
          {/* student dashboard */}
          <Route
            index
            path="/studentdashboard"
            element={<StudentDashboard></StudentDashboard>}
          />

          <Route
            path="studentdashboard/studentleavereq/"
            element={<CreateLeaveRequest></CreateLeaveRequest>}
          />
          {/* super admin */}
          <Route
            path="superadmindashboard/"
            element={<SuperAdminDashboard></SuperAdminDashboard>}
          />
          <Route
            path="superadmindashboard/uploadcsv/"
            element={<UploadCSV></UploadCSV>}
          />

          <Route
            path="hosteladmindashboard/downloadcsv/"
            element={<DownloadCSV></DownloadCSV>}
          />
          <Route
            path="/dashboard"
            element={access_token ? <Dashboard /> : <Navigate to="/login" />}
          />
          {/* change password */}
          <Route
            path="changepassword/"
            element={<ChangePassword></ChangePassword>}
          />
          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
