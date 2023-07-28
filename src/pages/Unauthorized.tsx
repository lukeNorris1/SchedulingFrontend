import { useContext } from "react";
import UserContext from "../context/UserContext";

export default function Unauthorized() {
  const { logout } = useContext(UserContext);

  // const parseJwt = (token: string) => {
  //   try {
  //     return JSON.parse(atob(token.split(".")[1]));
  //   } catch (e) {
  //     return null;
  //   }
  // };

  function tokenCheck() {
    // if (user) {
    //   const decodedJwt = parseJwt(user.token);

    //   if (decodedJwt.exp * 1000 < Date.now()) {
    //    return false
    //   }
    //   else return true
    // }
    return false;
  }

  return (
    <>
      <div>Unauthorized</div>
      {!tokenCheck() ? (
        <button onClick={() => logout()}>Log out </button>
      ) : (
        <></>
      )}
    </>
  );
}
