import axios from "axios";
import { AppError } from "../utils/AppError";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../app/features/feedReducer";
import type { RootState } from "../app/store";
import UserCard from "./UserCard";

const { VITE_API_HOST } = import.meta.env;

const Feed = () => {
  const feed = useSelector((store: RootState) => store.feed);
  const dispatch = useDispatch();

  const fetchFeed = async () => {
    try {
      const response = await axios.get(`${VITE_API_HOST}/user/feed`, {
        withCredentials: true,
      });

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(addFeed(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {feed &&
        feed.map((user) => {
          return <UserCard user={user} key={user._id} />;
        })}
    </div>
  );
};

export default Feed;
