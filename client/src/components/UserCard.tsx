import axios from "axios";
import { AppError } from "../utils/AppError";
import { useDispatch } from "react-redux";
import { removeFeed } from "../app/features/feedReducer";
import type { User } from "../app/features/userReducer";

const { VITE_API_HOST } = import.meta.env;

const UserCard = ({
  user,
  onSuccess,
  onError,
  preview = false,
}: {
  user: User;
  onSuccess: (msg: string) => void;
  onError: (msg: string) => void;
  preview?: boolean;
}) => {
  const { firstName, lastName, age, gender, about, photoUrl } = user;
  const dispatch = useDispatch();

  const handleFeedReview = async (status: String) => {
    try {
      const response = await axios.post(
        `${VITE_API_HOST}/request/send/${status}/${user._id}`,
        {},
        { withCredentials: true },
      );

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      onSuccess(response.data.message);
      dispatch(removeFeed(user._id));
    } catch (error: any) {
      onError(error.message);
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10 bg-blue">
        <img src={photoUrl} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        <p>Age: {age}</p>
        <p className="capitalize">Gender: {gender}</p>
        <p>{about}</p>
        {!preview && (
          <div className="card-actions">
            <button
              className="btn btn-primary"
              onClick={() => handleFeedReview("ignored")}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleFeedReview("interested")}
            >
              Interested
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
