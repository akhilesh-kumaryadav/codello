import axios from "axios";
import { AppError } from "../utils/AppError";
import { useDispatch } from "react-redux";
import { removeRequest, type Request } from "../app/features/requestsReducer";

const { VITE_API_HOST } = import.meta.env;

const RequestCard = ({
  request,
  requestId,
}: {
  request: Request;
  requestId: string;
}) => {
  const dispatch = useDispatch();

  const handleReviewRequest = async (status: string) => {
    try {
      const response = await axios.post(
        `${VITE_API_HOST}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true },
      );

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(removeRequest(requestId));
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <li className="flex justify-between item-center list-row bg-base-200">
      <div>
        <img className="size-10 rounded-box" src={request.photoUrl} />
      </div>
      <div>
        <div className="text-lg">
          {request.firstName + " " + request.lastName}
        </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Age: {request.age} | Gender: {request.gender}
        </div>
        <p className="list-col-wrap text-xs">{request.about}</p>
      </div>
      <div>
        <button
          className="btn btn-primary mx-2"
          onClick={() => handleReviewRequest("rejected")}
        >
          Reject
        </button>
        <button
          className="btn btn-secondary mx-2"
          onClick={() => handleReviewRequest("accepted")}
        >
          Accept
        </button>
      </div>
    </li>
  );
};

export default RequestCard;
