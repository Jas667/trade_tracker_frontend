import Login from "./pages/Login";
import Register from "./pages/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ColorSchemesExample from "./components/NavBar";

function App() {
  return (
    <>

      <Router>
        <ColorSchemesExample />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
