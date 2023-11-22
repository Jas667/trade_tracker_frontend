import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedIn from "./pages/TradesPages/LoggedIn";
import UploadTrades from "./pages/TradesPages/UploadTrades";
import Profile from "./pages/Profile";
import Tags from "./pages/TradesPages/Tags";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GlobalStateProvider } from "../context/GlobalStateContext";
import ForgotPassword from "./pages/ForgotPassword";
import PasswordReset from "./pages/PasswordReset";

function App() {
  return (
    <>
      <GlobalStateProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LoggedIn />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/upload" element={<UploadTrades />} />
            <Route path="/tags" element={<Tags />} />
            <Route path="/profile" element={<Profile />} />
            <Route exact path="reset-password/:token" element={<PasswordReset />} />
          </Routes>
        </Router>
      </GlobalStateProvider>
    </>
  );
}

export default App;
