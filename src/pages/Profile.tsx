import { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ConfirmationModal";
import getUser from "../mock_data/getUser";

export default function Profile() {
  const [loggedUser] = useState(getUser);
  const [signOutPopup, setSignOutPopup] = useState(false);
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/login", { replace: true });
  };

  function AdminLink() {
    //if (user?.roles.includes(5150)) {
      return (
        <div className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded hover:text-gray-400">
          <a href="/admin">Admin</a>
        </div>
      );
    //}

    //return null;
  }

  return (
    <div className="">
      {loggedUser && (
        <div className="flex justify-center items-center">
          <div className=" w-1/3 py-2 space-y-4">
            <div className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded">{`${loggedUser.fullName}`}</div>
            <AdminLink />
            <button
              className="bg-gray-800 text-white font-bold p-2 block w-full text-center rounded hover:text-gray-400"
              onClick={() => setSignOutPopup(true)}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
      {signOutPopup && (
        <ConfirmationModal
          prompt="Do you want to sign out?"
          onDelete={signOut}
          onCancel={() => setSignOutPopup(false)}
        />
      )}
    </div>
  );
}
