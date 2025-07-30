import { Link } from "react-router-dom";
import UserIcon from "../icons/UserIcon";

const ButtonAdmin = () => {
  return (
    <div className="relative">
      <Link
        to="admin-dashboard"
        className="dark:bg-black backdrop-blur bg-white fixed bottom-7 right-7 z-20 rounded-full p-3 border dark:border-stone-600 border-gray-400 dark:bg-opacity-40 bg-opacity-75 overflow-hidden group hover:scale-105"
      >
        <UserIcon
          color="currentColor" 
          className=" group-hover:text-purple-700 dark:group-hover:text-yellow-400 transition-colors duration-200"
        />
        <div className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r dark:from-white dark:via-gray-100 dark:to-gray-400 from-purple-500 via-purple-700 to-purple-900 opacity-0 group-hover:opacity-70 group-hover:translate-x-12 group-hover:translate-y-12 transition-all duration-300 z-10"></div>
      </Link>
    </div>
  );
};

export default ButtonAdmin;