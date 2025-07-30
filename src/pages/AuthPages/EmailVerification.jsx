import { useState, useRef } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { emailVerificationFetching } from "../../services/AuthFetching";
import { Alert } from "../../components/Alert";
import Spinner from "../../components/Spinner/Spinner";
import ButtonTokenResend from "../../components/ButtonTokenResend";


const EmailVerificationCode = () => {
  const {  updateAuth } = useAuth()
  const [codeToken, setCodeToken] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    msg: "",
    error: false,
  });

  const inputsRef = useRef([]);
  const navigate = useNavigate()

  const handleChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newCodeToken = [...codeToken];
    newCodeToken[index] = value;
    setCodeToken(newCodeToken);

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !codeToken[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCodeToken = pastedData.split("");
    setCodeToken(newCodeToken);

    const lastIndex = Math.min(newCodeToken.length - 1, 5);
    inputsRef.current[lastIndex]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const code = codeToken.join("");
    setLoading(true);
    try {
      const response = await emailVerificationFetching({ code });
      if (response.success) {
        setAlert({ error: false, msg: "" });
        toast.success(<div className="text-green-600">{response.message}</div>);
        navigate("/profile")
        updateAuth(response.user);
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

  const isFormValid = codeToken.every((char) => char !== "");

  return (
    <div className="md:p-20 flex flex-col items-center min-h-screen justify-center p-2">
      <div className=" dark:bg-opacity-20 backdrop-blur border-[1px] dark:border-stone-900 rounded-lg flex flex-col items-center p-4 md:p-6">
        <h2 className="text-2xl font-bold mb-4">Código de Verificación</h2>
        <p className="opacity-70 mb-8">
          Introduce el código que hemos enviado a tu correo electrónico.
        </p>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-6 ">
          {codeToken.map((num, index) => (
            <input
              key={index}
              type="tel"
               inputMode="numeric"
              maxLength="1"
              value={num}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              ref={(el) => (inputsRef.current[index] = el)}
              className="md:w-12 md:h-12 w-10 h-10 text-center text-lg font-bold border border-gray-300 rounded-md focus:ring-2 focus:ring-primary outline-none dark:bg-stone-900"
            />
          ))}
        </form>
        {alert.msg && <Alert alert={alert} />}
        <button
        aria-label="Enviar formulario"
          type="submit"
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
          className={`${
            isFormValid ? "bg-primary hover:opacity-90 cursor-pointer" : "bg-blue-700 opacity-70"
          } text-white w-full py-2 rounded-lg mt-4 transition-colors flex items-center justify-center h-[40px] mb-5 `}
        >
          {loading ? (
              <Spinner />
          ) : (
            "Verificar"
          )}
        </button>
      <ButtonTokenResend />
      </div>
    </div>
  );
};

export default EmailVerificationCode;