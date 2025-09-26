import { Link } from "react-router-dom";
import UserIcon from "../../icons/UserIcon";

const ProfileButton = ({toggleMenu }) => {
    
  return (
    <Link
      onClick={toggleMenu}
      to="/profile"
      className="hover:text-primary cursor-pointer"
    >
      <UserIcon />
    </Link>
  );
};

export default ProfileButton;