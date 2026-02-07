import axios from "axios";
import { AppError } from "../utils/AppError";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../app/features/feedReducer";
import type { RootState } from "../app/store";
import UserCard from "./UserCard";

const { VITE_API_HOST } = import.meta.env;

const Feed = () => {
  const feed = useSelector((store: RootState) => store.feed);
  const dispatch = useDispatch();

  const [toast, setToast] = useState("");
  const [error, setError] = useState("");

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

  if (!feed) {
    return;
  }

  return (
    <>
      {error && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-error">
            <span>{error}</span>
          </div>
        </div>
      )}

      {toast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>{toast}</span>
          </div>
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-4 my-10">
        {feed &&
          feed.map((user) => {
            return (
              <UserCard
                user={user}
                key={user._id}
                onSuccess={(msg: string) => {
                  (setToast(msg), setTimeout(() => setToast(""), 3000));
                }}
                onError={(msg: string) => {
                  (setError(msg), setTimeout(() => setError(""), 3000));
                }}
              />
            );
          })}
        {!feed.length && <h2>No new user found.</h2>}
      </div>
    </>
  );
};

export default Feed;
