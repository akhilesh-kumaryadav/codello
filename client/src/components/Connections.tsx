import axios from "axios";
import { useEffect } from "react";
import { AppError } from "../utils/AppError";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../app/features/connectionsReducer";
import ConnectionsCard from "./ConnectionCard";
import type { RootState } from "../app/store";

const { VITE_API_HOST } = import.meta.env;

const Connections = () => {
  const connections = useSelector((store: RootState) => store.connections);
  const dispatch = useDispatch();
  const getConnections = async () => {
    try {
      const response = await axios.get(`${VITE_API_HOST}/user/connections`, {
        withCredentials: true,
      });

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(addConnections(response.data.data));
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) {
    return;
  }

  return connections.length ? (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-3xl tracking-wide text-center">
          Your Connections
        </li>
        {connections.map((connection) => {
          return (
            <ConnectionsCard connection={connection} key={connection._id} />
          );
        })}
      </ul>
    </div>
  ) : (
    <div className="flex justify-center">
      <ul className="list bg-base-100 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl tracking-wide text-center">
          No Connections Found.
        </li>
      </ul>
    </div>
  );
};

export default Connections;
