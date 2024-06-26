import { Routes, Route } from "react-router-dom";
import Inbox from "./components/Inbox";
import Signup from "./pages/signup/Signup";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route index path="/view" element={<Inbox />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
  );
}

export default App;
