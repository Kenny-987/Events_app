import SignUp from "./components/login/signup";
import Home from "./components/home";
import { HashRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login/login";
import Layout from "./Layout";
import AddEvent from "./components/events/addevent";
import Dashboard from "./components/userdashboard/dashboard";
import About from "./components/footer/about";
import Policy from "./components/login/Policy";
import Emailform from "./components/login/fogortpassword/Emailform";
import "./index.css";
import EventDetails from "./components/events/eventdetails";
function App() {
  return (
    <HashRouter>
      <Routes>
        <Route  element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/policy" element={<Policy />} />
          <Route path="/forgotpassword" element={<Emailform />} />
          <Route path="/addevent" element={<AddEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="/eventdetails" element={<EventDetails />} />
        </Route>
      </Routes>
      </HashRouter>
  );
}

export default App;
