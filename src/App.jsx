import SignUp from "./components/login/signup";
import Home from "./components/home";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Layout from "./Layout";
import AddEvent from "./components/events/addevent";
import Dashboard from "./components/userdashboard/dashboard";
import About from "./components/footer/about";
import "./index.css";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
