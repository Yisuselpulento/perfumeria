import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { signUpFetching } from "../../services/AuthFetching";
import { Alert } from "../../components/Alert";
import Spinner from "../../components/Spinner/Spinner";
import EyeIcon from "../../icons/EyeIcon";
import EyeLeashIcon from "../../icons/EyeLeashIcon";

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    birthDate: "",
    sexo: "",
    username: ""
  });
  const [ alert, setAlert] = useState({
    msg: "",
    error: false
})
const [loading, setLoading] = useState(false);
const [showPassword, setShowPassword] = useState(false); 
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const navigate = useNavigate();


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e)=> {
    e.preventDefault();

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        setAlert({
          msg: "Por favor, ingresa un correo electrónico válido.",
          error: true,
        });
        return; 
      }
    

      if (formData.password !== formData.confirmPassword) {
        setAlert({
          msg: "Las contraseñas no coinciden.",
          error: true,
        });
        return; 
      }

       setLoading(true);

      try {
        const response = await signUpFetching(formData );
        if (response.success) {
         navigate("/verification-email") 
         setAlert({error: false, msg: "" })
          toast.success(<div className="text-green-600">{response.message}, Te hemos mandado un Codigo al Email para verificar tu cuenta</div>);
        } else {
          setAlert({error: true, msg: response.message })
        }
      } catch (error) {
        toast.error("Hubo un error. Por favor, intenta de nuevo.");
        console.error("Error:", error);
      } finally {
        setLoading(false); 
      }   

   }


  return (
    <div>
       <p>Sign Up</p>
      <Link
        className="hover:text-primary"
        to="/"
        >Atras</Link>
        <div className="md:w-[500px] mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            
          <div>
              <label htmlFor="username" >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="email" >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primary"
              >
                {showPassword ? <EyeIcon /> : <EyeLeashIcon />}
              </button>
            </div>
          </div>

            <div>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primary"
              >
                {showConfirmPassword ? <EyeIcon /> : <EyeLeashIcon />}
              </button>
            </div>
          </div>

            <div>
              <label htmlFor="birthDate" >
                Birth Date
              </label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label htmlFor="sexo" >
                Gender
              </label>
              <select
                id="sexo"
                name="sexo"
                value={formData.sexo}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              >
               <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="Femenino">Mujer</option>
              <option value="Masculino">Hombre</option>
              </select>
            </div>

            <div>
              <button
              aria-label="registrarte"
                type="submit"
                disabled={loading}
                className={`w-full mt-3 rounded-lg py-2 h-[40px] flex items-center justify-center text-white transition-colors 
                  ${loading ? "bg-primary opacity-80" : "bg-primary hover:bg-indigo-700 cursor-pointer"}`}
              >
                {loading ?
                <div className="max-h-full">
                     <Spinner/>
                </div>
                : "Sign Up"}
              </button>
              {alert.msg && <Alert alert={alert} />}
            </div>
      </form>
      <p>Ya tienes una cuenta? 
      <Link 
      className="text-primary hover:text-indigo-900"
      to="/login"> inicia sesion</Link></p>
        </div>
    </div>
  )
}

export default SignUp