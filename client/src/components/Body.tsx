import { Outlet } from "react-router";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
