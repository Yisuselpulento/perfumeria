import useAuth from "../hooks/useAuth"

const Home = () => {
   const { auth } = useAuth()

   console.log(auth)
  return (
    <div>
        <p>Inicio</p>
    </div>
  )
}

export default Home