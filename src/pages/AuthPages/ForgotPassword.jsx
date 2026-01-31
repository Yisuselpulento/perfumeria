import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { toast } from "sonner";
import { forgotPasswordFetching } from "../../services/AuthFetching";
import LoadingButton from "../../components/LoadingButton";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    setAlert({
      msg: "Por favor, ingresa un correo electrónico válido.",
      error: true,
    });
    return;
  }

  setLoading(true);
  setAlert({ msg: "", error: false });

  const response = await forgotPasswordFetching({ email });

  if (response.success) {
    toast.success(<div className="text-green-600">{response.message}</div>);
    setEmail("");
  } else {
    setAlert({
      error: true,
      msg: response.message,
    });
  }

  setLoading(false);
};


    const styleInput = "bg-stone-800 mt-1 p-2 w-full border border-gray-300 rounded-md"

  return (
    <div className="md:w-[500px] mx-auto">
      <p className="text-xl font-bold mb-4">Recuperar Contraseña</p>
      
      <Link className="hover:text-primary" to="/">Inicio</Link>

      <form onSubmit={handleSubmit}  className="backdrop-blur-md  border border-white/20 shadow-md  p-5 rounded-lg clas
      flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styleInput}
          />
        </div>

        <LoadingButton
            type="submit"
            loading={loading}
            aria-label="recuperar contraseña"
          >
            Enviar Instrucciones
          </LoadingButton>

        {alert.msg && <Alert alert={alert} />}
      </form>
    </div>
  );
};

export default ForgotPassword;
