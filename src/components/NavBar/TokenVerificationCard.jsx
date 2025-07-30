import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom"; 
import useAuth from "../../hooks/useAuth";
import CloseIcon from "../../icons/template/CloseIcon";

const TokenVerificationCard = ({setIsCardVisible}) => {
  const [isVisible, setIsVisible] = useState(false); 
  const [isChecked, setIsChecked] = useState(false); 
  const { auth } = useAuth(); 
  const location = useLocation(); 

  useEffect(() => {
    const isCardClosed = sessionStorage.getItem("hideVerificationCard") === "true";
    const shouldShow = auth?.success && !auth?.user?.isVerified && location.pathname === "/" && !isCardClosed;

    setIsVisible(shouldShow);
    setIsChecked(true);
    setIsCardVisible(shouldShow); 
  }, [auth, location.pathname, setIsCardVisible]);


  const handleClose = () => {
    setIsVisible(false);
    sessionStorage.setItem("hideVerificationCard", "true");
    setIsCardVisible(false);
    
  };

  if (!isChecked || !isVisible) return null;

  return (
    <div className="fixed md:top-[62px] top-14 mx-auto -z-10 w-full dark:bg-stone-900 bg-blue-100 p-1  text-xs flex items-center text-center justify-center gap-1 border-y border-cyan-300 dark:border-stone-700">
      <p>
        Tu correo no está verificado. Haz clic{" "}
        <Link className="text-primary hover:text-purple-400" to="/verification-email">
          aquí
        </Link>{" "}
        para verificarlo.
      </p>
      <button
        onClick={handleClose}
        className="ml-4 px-2 py-1 text-sm hover:text-primary cursor-pointer"
      >
        <CloseIcon />
      </button>
    </div>
  );
};

export default TokenVerificationCard;