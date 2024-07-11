import { Routes, Route } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
