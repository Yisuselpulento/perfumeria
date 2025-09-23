import { Link } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const Profile = () => {

  const { auth } = useAuth()

  const { user } = auth 

  return (
    <div>
      <Link className="text-primary hover:text-primary/80" to="/">
       ir a Inicio
      </Link>
      <div className="mt-6 flex flex-col gap-2 items-center">
        <p className="text-lg font-bold">{user?.fullName}</p>
        <div className="w-full px-5 pb-4 md:w-[400px]">
        <img 
        className="rounded-lg"
        src={`./images/sellos/${user?.stamps}-sellos.jpg`} />
        </div>
      </div >
      <div className="md:w-[600px] mx-auto">
        <p className="border border-yellow-300 p-2 text-xs">NOTA: Las estampas se irán agregando por cada producto que compres. Puedes obtener un producto gratis al tener 10.</p>
      </div>
    </div>
  )
}

export default Profile