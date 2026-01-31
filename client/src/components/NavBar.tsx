import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Link } from "react-router";

const Navbar = () => {
  const user = useSelector((store: RootState) => store.user);
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/profile" className="btn btn-ghost text-xl">
          Codello
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-2">
          <div>Welcome, {`${user.firstName} ${user.lastName}`} </div>
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 bg-base-600 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl}
                  className="object-contain"
                />
              </div>
            </div>
            <ul
              tabIndex={-1}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
