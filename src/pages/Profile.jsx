import { Link } from "react-router-dom"

const Profile = () => {
  return (
    <div>
      <p>Profile</p>
      <Link className="hover:text-primary" to="/">
        Home
      </Link>
    </div>
  )
}

export default Profile