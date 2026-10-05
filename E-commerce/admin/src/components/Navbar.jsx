
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-5 sm:px-8 lg:px-[4%] py-3">

        {/* Logo */}
        <div className="flex items-center">
          <img
            src={assets.logo}
            alt="Logo"
            className="w-32 sm:w-36 md:w-40 h-auto object-contain"
          />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">

          {/* Admin Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-gray-50 border border-gray-200">
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-semibold">
              A
            </div>

            <span className="text-sm font-medium text-gray-700">
              Admin
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="
              flex items-center gap-2
              bg-gray-900 hover:bg-red-600
              text-white
              px-4 sm:px-6
              py-2
              rounded-full
              text-xs sm:text-sm
              font-medium
              transition-all duration-200
              shadow-sm hover:shadow-md
              active:scale-95
            "
          >
            {/* Logout Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 12h9m0 0l-3-3m3 3l-3 3"
              />
            </svg>

            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
