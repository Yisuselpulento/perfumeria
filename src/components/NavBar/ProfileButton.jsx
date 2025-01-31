import { Link } from "react-router-dom";

const ProfileButton = ({toggleMenu }) => {
    
  return (
    <Link
      onClick={toggleMenu}
      to="/profile"
      className="hover:text-primary cursor-pointer"
    >
      Profile
    </Link>
  );
};

export default ProfileButton;