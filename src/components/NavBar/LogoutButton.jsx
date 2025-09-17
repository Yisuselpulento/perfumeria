import { toast } from "sonner";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Spinner from "../Spinner/Spinner";
import LogoutIcon from "../../icons/template/LogoutIcon";
import { logoutFetching } from "../../services/AuthFetching";


const LogoutButton = ({toggleMenu}) => {
   const {setAuth } = useAuth()
   const [ loading, setLoading] = useState(false)

    const handleLogout  = async () => {
        setLoading(true);
        try {
          const response = await logoutFetching();
          if (response.success) {
            setAuth({});
          } else {
            toast.error(<div className="text-red-800">{response.message}</div>);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setLoading(false); 
        }
      };

  return (
    <button
  aria-label="cerrar sesión"
  onClick={() => {
    toggleMenu();
    handleLogout();
  }}
  disabled={loading}
  className={`flex items-center gap-2 p-2 rounded-md w-[100px] justify-center
    ${loading ? "bg-primary/80" : " hover:bg-primary cursor-pointer hover:text-white"}`}
>
  {loading ? 
      <Spinner size="1.3em" />
    : (
    <>
      <LogoutIcon />
      LogOut
    </>
  )}
</button>
  )
}

export default LogoutButton