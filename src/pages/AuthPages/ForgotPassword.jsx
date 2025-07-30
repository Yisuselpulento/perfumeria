import { useState } from "react";
import { Link } from "react-router-dom";
import { Alert } from "../../components/Alert";
import Spinner from "../../components/Spinner/Spinner";
import { toast } from "sonner";
import { forgotPasswordFetching } from "../../services/AuthFetching";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({ msg: "", error: false });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setAlert({ msg: "Por favor, ingresa un correo electrónico válido.", error: true });
      return;
    }

    setLoading(true);
    setAlert({ msg: "", error: false });

    try {
      const response = await forgotPasswordFetching({email});
      if (response.success) {
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
    <div className="md:w-[500px] mx-auto">
      <p className="text-xl font-bold mb-4">Recuperar Contraseña</p>
      
      <Link className="hover:text-primary" to="/">Atrás</Link>

      <form onSubmit={handleSubmit}  className="bg-gray-50 dark:bg-stone-800 p-5 rounded-lg clas
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

        <button
          type="submit"
          aria-label="recuperar contraseña"
          disabled={loading}
          className={`w-full mt-3 rounded-lg py-2 h-[40px] flex items-center justify-center text-white transition-colors 
            ${loading ? "bg-primary opacity-90" : "bg-primary hover:bg-indigo-700 cursor-pointer"}`}
        >
          {loading ? <Spinner size="1.2em" /> : "Enviar Instrucciones"}
        </button>

        {alert.msg && <Alert alert={alert} />}
      </form>
    </div>
  );
};

export default ForgotPassword;
