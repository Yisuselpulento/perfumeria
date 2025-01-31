import { useState } from "react";
import { toast } from "sonner";
import useAuth from "../hooks/useAuth";
import { resendTokenFetching } from "../services/AuthFetching";
import { Alert } from "./Alert";
import Spinner from "./Spinner/Spinner";

const ButtonTokenResend = () => {
    const { auth  } = useAuth();
    const [loading, setLoading] = useState(false);
    const [alert ,setAlert] = useState({
        msg: "",
        error: false
      })
    
    const handleResendToken = async (e) => {
        e.preventDefault();
  
        setLoading(true);
        try {
          const response = await resendTokenFetching();
          if (response.success) {
            setAlert({error: false, msg: "" })
            toast.success(<div className="text-green-600">{response.message}</div>);
          ;
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

    if (auth?.user?.isVerified || !auth?.success) {
      return null;
  }

  return (
    <div className="text-sm flex flex-col gap-2">
        <p> Si tu token ya expiró y necesitas uno nuevo, haz clic aquí.</p>
        <button
                onClick={handleResendToken}
                className="px-2 py-2 bg-primary text-white rounded hover:opacity-90 flex items-center justify-center cursor-pointer"
                disabled={loading} 
            >
                {loading ? (
                    <Spinner /> 
                ) : (
                    "Reenviar"
                )}
            </button>
            {alert.msg &&  <Alert alert={alert} /> }
   </div>
  )
}

export default ButtonTokenResend