import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { signUpFetching } from "../../services/AuthFetching";
import { Alert } from "../../components/Alert";
import EyeIcon from "../../icons/template/EyeIcon";
import EyeLeashIcon from "../../icons/template/EyeLeashIcon";
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../components/LoadingButton";

const SignUp = () => {
  const { updateAuth } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    gender: "",
    fullName: ""
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
          toast.success(<div className="text-green-600">{response.message}, Te hemos mandado un Codigo al Email para verificar tu cuenta</div>);
          console.log(response.user);
          updateAuth(response.user, true);
         navigate("/verification-email") 
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

   const styleInput = "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md"

  return (
    <div className="md:w-[500px] mx-auto">
        <p className="text-xl font-bold mb-4">Registrate</p>
        
        <Link className="hover:text-primary" to="/">
          Inicio
        </Link>
        <form onSubmit={handleSubmit}  className="backdrop-blur-md  border border-white/20 shadow-md  p-5 rounded-lg clas
      flex flex-col gap-4">
            
          <div>
              <label htmlFor="fullName" >
                Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={styleInput}
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
                className={styleInput}
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
                className={styleInput}
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
                className={styleInput}
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
              <label htmlFor="gender" >
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={styleInput}
              >
               <option value="" disabled hidden>
                Select Gender
              </option>
              <option value="female">Mujer</option>
              <option value="male">Hombre</option>
              </select>
            </div>

            <div>
              <LoadingButton
            type="submit"
            loading={loading}
            aria-label="resgistrate"
          >
            Regístrate
          </LoadingButton>
              {alert.msg && <Alert alert={alert} />}
            </div>
            <div className="items-center justify-center flex flex-col mt-4">
            <p>Ya tienes una cuenta? 
            <Link 
           className="text-primary hover:text-primary/60"
            to="/login"> inicia sesion</Link></p>
            </div>
      </form>

    </div>
  )
}

export default SignUp