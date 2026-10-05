
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {

  const menuItems = [
    {
      path: "/add",
      icon: assets.add_icon,
      label: "Add Items",
    },
    {
      path: "/list",
      icon: assets.order_icon,
      label: "List Items",
    },
    {
      path: "/order",
      icon: assets.order_icon,
      label: "Orders",
    },
    {
      path: "/allusers",
      icon: assets.userIcon,
      label: "All Users",
    },
  ];

  return (
    <aside className="w-[220px] min-h-[calc(100vh-65px)] bg-white border-r border-gray-200">

      
      <div className="flex flex-col gap-2 p-4">

        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium
              transition-all duration-200
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            {({ isActive }) => (
              <>
              
                <span
                  className={`w-1 h-6 rounded-full transition-all duration-200 ${
                    isActive ? "bg-blue-600" : "bg-transparent"
                  }`}
                />

                <img
                  src={item.icon}
                  alt={item.label}
                  className={`w-5 h-5 transition-all ${
                    isActive ? "opacity-100" : "opacity-70 group-hover:opacity-100"
                  }`}
                />

                <span>{item.label}</span>
              </>
            )}
          </NavLink>
        ))}

      </div>

    </aside>
  );
};

export default Sidebar;

