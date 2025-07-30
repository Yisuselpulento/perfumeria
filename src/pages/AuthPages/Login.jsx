import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginFetching } from "../../services/AuthFetching";
import { Alert } from "../../components/Alert";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";
import EyeIcon from "../../icons/template/EyeIcon";
import EyeLeashIcon from "../../icons/template/EyeLeashIcon";

const Login = () => {
  const { updateAuth, clearVerificationCardOnLogin } = useAuth()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [alert, setAlert] = useState({
    msg: "",
    error: false
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setAlert({
        msg: "Por favor, ingresa un correo electrónico válido.",
        error: true,
      });
      return;
    }

    if (!formData.password.trim()) {
      setAlert({
        msg: "La contraseña es obligatoria.",
        error: true,
      });
      return;
    }

    setLoading(true);

    try {
      const response = await loginFetching(formData);
      if (response.success) {
        updateAuth(response.user);
        clearVerificationCardOnLogin();
        navigate("/profile"); 
        toast.success(<div className="text-green-600">{response.message}</div>);
      } else {
        setAlert({ error: true, msg: response.message });
      }
    } catch (error) {
      toast.error("Hubo un error. Por favor, intenta de nuevo.");
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const styleInput = "bg-white dark:bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md"

  return (
    <div className="md:w-[500px] mx-auto "> 
             <p className="text-2xl font-bold mb-4 ">Login</p>
      <Link className="hover:text-primary" to="/">
        Atras
      </Link>

      <form onSubmit={handleSubmit} className="bg-gray-50 dark:bg-stone-800 p-5 rounded-lg clas
      flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email</label>
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

        <button
          type="submit"
          aria-label="iniciar sesión"
          disabled={loading}
          className={`w-full mt-3 rounded-lg py-2 h-[40px] flex items-center justify-center text-white transition-colors 
            ${loading ? "bg-primary opacity-90" : "bg-primary hover:bg-indigo-700 cursor-pointer"}`}
        >
          {loading ? <Spinner size="1.2em" /> : "Login"}
        </button>

        {alert.msg && <Alert alert={alert} />}
        <div className="items-center justify-center flex flex-col mt-4">
          <div>
          <p>No tienes una cuenta? Registrate 
        <Link 
        className="text-primary hover:text-indigo-900"
        to="/signup"> aqui</Link></p>
          </div>
              <Link 
              className="text-primary hover:text-indigo-900"
              to="/forgot-password">Olvide mi password</Link>
      
        </div>
      </form>
    </div>
  );
};

export default Login;