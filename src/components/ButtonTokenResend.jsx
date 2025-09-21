import { useState } from "react";
import { toast } from "sonner";
import { resendTokenFetching } from "../services/AuthFetching";
import { Alert } from "./Alert";
import LoadingButton from "./LoadingButton";

const ButtonTokenResend = () => {
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

  return (
    <div className="text-sm flex flex-col gap-2">
        <p> Si tu token ya expiró y necesitas uno nuevo, haz clic aquí.</p>
        <LoadingButton
        onClick={handleResendToken}
        loading={loading}
        className="w-auto px-4"
      >
        Reenviar
      </LoadingButton>
            {alert.msg &&  <Alert alert={alert} /> }
   </div>
  )
}

export default ButtonTokenResend