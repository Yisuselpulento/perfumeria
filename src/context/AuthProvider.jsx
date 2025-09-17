import { useState, useEffect, createContext } from 'react'
import axiosInstance from '../helpers/axiosConfig.js'

const AuthContext = createContext({})

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    success: false,
    user: null,  
  })
  const [loading, setLoading] = useState(true)
  const [hideVerificationCard, setHideVerificationCard] = useState(
    sessionStorage.getItem("hideVerificationCard") === "true"
  );

/*   const [ codeEmail, setCodeEmail ] = useState("") */

  const updateAuth = (updatedUser, replace = false) => {
  if (replace) {
    setAuth({
      success: true,
      user: updatedUser,
    });
  } else {
    setAuth((prevAuth) => ({
      ...prevAuth,
      success: true,
      user: {
        ...prevAuth.user,
        ...updatedUser,
      },
    }));
  }
};


  const hideVerificationMessage = () => {
    setHideVerificationCard(true);
    sessionStorage.setItem("hideVerificationCard", "true");
  };

  const clearVerificationCardOnLogin = () => {
    sessionStorage.removeItem("hideVerificationCard"); 
    setHideVerificationCard(false);
  };
 
  useEffect(() => {
    const userAuth = async () => {

      try {
        const { data } = await axiosInstance("/api/auth/check-auth")
        setAuth(data)
      } catch (error) {
        console.log(error)
        setAuth({})
      }
      finally {
        setLoading(false);  
      }
    }
    userAuth()
  }, [])

   

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
      /*   codeEmail,
        setCodeEmail,*/
        updateAuth,
        hideVerificationMessage,
        hideVerificationCard,
        clearVerificationCardOnLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export {
    AuthProvider
}

export default AuthContext
