import { useContext } from "react";
import UserContext from "../../context/UserContext";
import { HomeSvg, ScheduleSvg, PastShiftsSvg, ProfileSvg } from "./icons/index";

export default function MobileHeader() {
  const { user } = useContext(UserContext);

  //! if no user go back to home page, if current page is homepage do nothing

  if (user) {
    return (
      <div className="fixed bottom-0 z-10 w-full bg-white text-black text-2xl text-center border-t-2 border-gray-600">
        <div className="flex justify-around items-center h-12 [&>*]:px-4 [&>*]:py-2">
          <a
            href="/"
            className={window.location.pathname === "/" ? "text-blue-500" : ""}
          >
            <HomeSvg />
          </a>
          <a
            href="/schedule"
            className={
              window.location.pathname === "/schedule" ? "text-blue-500" : ""
            }
          >
            <ScheduleSvg />
          </a>
          <a
            href="/shifts"
            className={
              window.location.pathname === "/shifts" ? "text-blue-500" : ""
            }
          >
            <PastShiftsSvg />
          </a>
          <a
            href="/profile"
            className={
              window.location.pathname === "/profile" ? "text-blue-500" : ""
            }
          >
            <ProfileSvg />
          </a>
        </div>
      </div>
    );
  } else return null;
}
