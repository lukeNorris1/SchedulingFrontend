import logo from "../../../assets/ExampleLogo.png";

export default function DesktopHeader() {
  return (
    <header className="inline-block flex max-w-[90%] h-20 relative mx-auto items-center justify-between text-white p-4 ">
      <div className="flex items-center">
        <div className="logo absolute left-[-5px] top-5 md:left-0 top-2 md:top-1">
          <a href="/">
            <img src={logo} alt="Logo" className="h-12 w-12 md:h-20 md:w-20 " />
          </a>
        </div>
      </div>
      <div className="flex items-center text-sm md:text-xl flex-grow justify-center">
        <div className="flex space-x-4">
          <div
            className={
              window.location.pathname === "/schedule"
                ? "underline underline-offset-8 font-bold"
                : ""
            }
          >
            <a href="/schedule">Schedule</a>
          </div>
          <div
            className={
              window.location.pathname === "/shifts"
                ? "underline underline-offset-8 font-bold"
                : ""
            }
          >
            <a href="/shifts">Past Shifts</a>
          </div>
          <div
            className={
              window.location.pathname === "/profile"
                ? "underline underline-offset-8 font-bold"
                : ""
            }
          >
            <a href="/profile">Profile</a>
          </div>
        </div>
      </div>
    </header>
  );
}
