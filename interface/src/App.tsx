import { Routes, Route } from "react-router-dom";
import Inbox from "./components/Inbox";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route index path="home/view" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
      </Routes>
  );
}

export default App;
