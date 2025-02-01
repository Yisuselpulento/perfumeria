import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Spinner from "../../components/Spinner/Spinner";
import { updatePasswordFetching } from "../../services/AuthFetching";
import { Alert } from "../../components/Alert";
import EyeIcon from "../../icons/EyeIcon";
import EyeLeashIcon from "../../icons/EyeLeashIcon";

const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ error: true, msg: "Las contraseñas no coinciden" });
      return;
    }

    setLoading(true);
    try {
      const response = await updatePasswordFetching({ password }, token);
      if (response.success) {
        toast.success(<div className="text-green-600">{response.message}</div>);
        navigate("/");
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

  const isFormValid = password && confirmPassword;

  return (
    <div className="md:w-[500px] mx-auto">
      <form onSubmit={handleSubmit}>
        <p className="text-md mb-5">
          Introduce tu nueva contraseña para actualizarla.
        </p>

        <label htmlFor="password" className="block mb-2">Password</label>
        <div className="relative">
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="dark:bg-stone-900 p-2 w-full rounded-lg border border-stone-600 focus:ring-purple-500 focus:border-primary outline-none transition-colors"
            placeholder="password"
            id="password"
            type={showPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primary"
          >
            {showPassword ? <EyeIcon /> : <EyeLeashIcon />}
          </button>
        </div>

        <label htmlFor="confirmPassword" className="block mb-2 mt-4">Repeat password</label>
        <div className="relative">
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="dark:bg-stone-900 p-2 w-full rounded-lg border border-stone-600 focus:ring-purple-500 focus:border-primary outline-none transition-colors"
            placeholder="confirm password"
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer hover:text-primary"
          >
            {showConfirmPassword ? <EyeIcon /> : <EyeLeashIcon />}
          </button>
        </div>

        {alert.msg && <Alert alert={alert} />}
        <button
          aria-label="Enviar formulario"
          disabled={!isFormValid || loading}
          type="submit"
          className={`${isFormValid ? "bg-primary hover:bg-indigo-700 cursor-pointer" : "bg-primary opacity-90"} text-white w-full py-2 rounded-lg mt-4 transition-colors flex items-center justify-center h-[40px] `}
        >
          {loading ? <Spinner size="1.2em" /> : "Actualizar contraseña"}
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
