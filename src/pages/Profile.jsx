import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Profile = () => {

  const { auth } = useAuth()

  const { user } = auth 
  console.log("User:", user)

  return (
    <div>
      <Link className="text-primary hover:text-primary/80" to="/">
       ir a Inicio
      </Link>
      <p>Perfil</p>
      <div className="mt-6">
       <p>{user?.fullName}</p>
       <div className="flex flex-row gap-2">
        <p>Sellos:</p>
       <p>{user.stamps}</p>
       </div>
      </div>
    </div>
  )
}

export default Profile