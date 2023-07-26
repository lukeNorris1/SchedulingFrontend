import { useContext, } from "react";
import UserContext from "../context/UserContext";
import DesktopHeader from "./Header/DesktopHeader";
import MobileHeader from "./Header/MobileHeader";

function Header() {
  const { user } = useContext(UserContext);

  //! if no user go back to home page, if current page is homepage do nothing

  if (user) {
    return (
    <div>
      <div className="hidden sm:block">
        {/* Rendered for large screens */}
        <DesktopHeader />
      </div>
      <div className="sm:hidden">
        {/* Rendered for small screens */}
        <MobileHeader />
      </div>
    </div>

    );
  } else return null;
}

export default Header;
