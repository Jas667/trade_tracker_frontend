import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedIn from "./pages/LoggedIn";
import UploadTrades from "./pages/UploadTrades";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<LoggedIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<UploadTrades />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
