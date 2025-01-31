import useAuth from "../hooks/useAuth"

const Home = () => {
   const { auth } = useAuth()

   console.log(auth)
  return (
    <div>
        <p>Template FullStack</p>
    </div>
  )
}

export default Home