import { Outlet } from "react-router";
import Navbar from "./NavBar";
import Footer from "./Footer";

const Body = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
