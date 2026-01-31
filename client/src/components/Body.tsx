import { Outlet, useNavigate } from "react-router";
import Navbar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../app/features/userReducer";
import { AppError } from "../utils/AppError";

const { VITE_API_HOST } = import.meta.env;

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await axios(`${VITE_API_HOST}/profile/view`, {
        withCredentials: true,
      });

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(addUser(response.data.data.user));
    } catch (error: any) {
      if (error.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
