import { useDispatch, useSelector } from "react-redux";
import UserCard from "./UserCard";
import type { RootState } from "../app/store";
import { useEffect, useState } from "react";
import axios from "axios";
import { AppError } from "../utils/AppError";
import { addUser } from "../app/features/userReducer";

const { VITE_API_HOST } = import.meta.env;

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: RootState) => store.user);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  const handleUpdateProfile = async () => {
    setError("");
    setToast("");
    try {
      const response = await axios.patch(
        `${VITE_API_HOST}/profile/edit`,
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        { withCredentials: true },
      );

      if (!response.data.result) {
        throw new AppError(response.data.message, response.data.status);
      }

      dispatch(addUser(response.data.data));
      setToast(response.data.message);
      setTimeout(() => setToast(""), 3000);
    } catch (error: any) {
      setError(error.message);
      setTimeout(() => setError(""), 3000);
    }
  };

  useEffect(() => {
    if (!user) {
      return;
    }

    setFirstName(user.firstName);
    setLastName(user.lastName);
    setAge(user.age);
    setGender(user.gender);
    setAbout(user.about);
    setPhotoUrl(user.photoUrl);
  }, [user]);

  return (
    user && (
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
        <div className="flex justify-center my-10 gap-4">
          <div className="card lg:card-side bg-sky-500/50 shadow-sm">
            <div className="card-body w-lg">
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">First Name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">Last Name</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">Age</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">Gender</legend>
                <select
                  defaultValue="Pick a browser"
                  className="select w-full"
                  value={gender}
                  onChange={(e) => setGender(e.target.value.to)}
                >
                  <option disabled={true}>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </select>
              </fieldset>
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">About</legend>
                <textarea
                  className="textarea h-24 w-full"
                  placeholder="Bio"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                ></textarea>
              </fieldset>
              <fieldset className="fieldset justify-center">
                <legend className="fieldset-legend">Photo</legend>
                <input
                  type="text"
                  className="input w-full"
                  placeholder="Type here"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </fieldset>
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
          <div>
            <UserCard
              user={{ firstName, lastName, age, gender, about, photoUrl }}
            />
          </div>
        </div>
      </>
    )
  );
};

export default Profile;
