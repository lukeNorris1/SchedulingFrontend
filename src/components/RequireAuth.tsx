import { Outlet } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";

interface RequireAuthProps {
  allowedRoles: number[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { user } = useContext(UserContext);
  console.log(user?.roles?.find((role) => allowedRoles?.includes(role)));
  //const location = useLocation();

  return <Outlet />;

  // return user?.roles?.find((role) => allowedRoles?.includes(role)) ? (
  //   <Outlet />
  // ) : user?._id ? (
  //   <Navigate to="/unauthorized" state={{ from: location }} replace />
  // ) : (
  //   <Navigate to="/" state={{ from: location }} replace /> //Navigate to /login
  // );
};

export default RequireAuth;
