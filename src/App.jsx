import Login from "./pages/Login";
import Register from "./pages/Register";
import LoggedIn from "./pages/LoggedIn";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorSchemesExample from "./components/NavBar";

function App() {
  return (
    <>

      <Router>
        <Routes>
          <Route path="/" element={<LoggedIn />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
