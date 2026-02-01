const RequestCard = ({ request }) => {
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
        <button className="btn btn-primary mx-2">Reject</button>
        <button className="btn btn-secondary mx-2">Accept</button>
      </div>
    </li>
  );
};

export default RequestCard;
