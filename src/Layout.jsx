import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
