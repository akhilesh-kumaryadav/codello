const ConnectionsCard = ({ connection }) => {
  return (
    <li className="list-row bg-base-200">
      <div>
        <img className="size-10 rounded-box" src={connection.photoUrl} />
      </div>
      <div>
        <div className="text-lg">
          {connection.firstName + " " + connection.lastName}
        </div>
        <div className="text-xs uppercase font-semibold opacity-60">
          Age: {connection.age} | Gender: {connection.gender}
        </div>
      </div>
      <p className="list-col-wrap text-xs">{connection.about}</p>
    </li>
  );
};

export default ConnectionsCard;
