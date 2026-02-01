import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { AppError } from "../utils/AppError";
import type { RootState } from "../app/store";
import { addRequests } from "../app/features/requestsReducer";
import RequestCard from "./RequestCard";

const { VITE_API_HOST } = import.meta.env;

const Requests = () => {
  const requests = useSelector((store: RootState) => store.requests);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const response = await axios.get(
        `${VITE_API_HOST}/user/request/received`,
        {
          withCredentials: true,
        },
      );

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(addRequests(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) {
    return;
  }

  return requests.length ? (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-3xl tracking-wide text-center">
          Your Requests
        </li>
        {requests.map((request) => {
          return (
            <RequestCard
              request={request.fromUserId}
              requestId={request._id}
              key={requests._id}
            />
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl tracking-wide text-center">
          No Request Found.
        </li>
      </ul>
    </div>
  );
};

export default Requests;
