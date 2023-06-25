import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginReg from "./pages/auth/LoginReg";
import ResetPassword from "./pages/auth/ResetPassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import CreateLeaveRequest from "./pages/auth/createLeaveRequests";
import UpdateHostelRoomComp from './pages/auth/updateRoomAllocation';
import MarkAbsent from "./pages/auth/markAbsent";
import UploadCSV from "./pages/auth/UploadCSV";
import AbsentViewSpecific from "./pages/auth/AbsentViewSpecific";
import AbsentViewTotal from "./pages/auth/AbsentViewTotal";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import { useSelector } from "react-redux";
function App() {
  const { access_token } = useSelector(state => state.auth)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={!access_token ? <LoginReg /> : <Navigate to="/dashboard" />} />
            <Route path="sendpasswordresetemail" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />
            <Route path="studentleavereq/" element={<CreateLeaveRequest></CreateLeaveRequest>} />
            <Route path="updateroomalloc/" element={<UpdateHostelRoomComp></UpdateHostelRoomComp>} />
            <Route path="uploadcsv/" element={<UploadCSV></UploadCSV>} />
            <Route path="markabsent/" element={<MarkAbsent></MarkAbsent>} />
            <Route path="absentviewspecific/" element={<AbsentViewSpecific></AbsentViewSpecific>} />
            <Route path="absentviewtotal/" element={<AbsentViewTotal></AbsentViewTotal>} />
          </Route>
          <Route path="/dashboard" element={access_token ? <Dashboard /> : <Navigate to="/login" />} />

          <Route path="*" element={<h1>Error 404 Page not found !!</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
