import { useState } from 'react';
import {  Link, useLocation } from 'react-router-dom';
import TokenVerificationCard from './TokenVerificationCard';
import ButtonTheme from './ButtonTheme';
import ProfileButton from './ProfileButton';
import LogoutButton from './LogoutButton';
import useAuth from '../../hooks/useAuth';
import CloseIcon from '../../icons/template/CloseIcon';
import BurgerIcon from '../../icons/template/BurgerIcon';

const NavBar = ({setIsCardVisible}) => {
  const {auth } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

 /*  const {pathname} = useLocation() */

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isLoggedIn = auth?.success;

  return (
    <div className="fixed top-0 mx-auto z-30 w-full dark:bg-opacity-45 bg-opacity-45 backdrop-blur-sm rounded flex flex-col border-b-0 items-end  md:justify-between md:flex-row md:items-center">
      <Link
            to="/"
             className="hidden md:flex ml-4 my-2 items-center"
            onClick={() => setIsMenuOpen(false)}
            >
        <img
           src="/images/iconoIsitipo.png"
           alt="Logo"
           className="w-10 h-10 object-contain"
              />
      </Link>

      <button
      aria-label="abrir nav"
        className="menu-button md:hidden flex items-end bg-primary  bg-opacity-80 shadow rounded-full p-2 m-3 hover:bg-indigo-700 cursor-pointer"
        onClick={toggleMenu}
      >
        {isMenuOpen ? <CloseIcon /> : <BurgerIcon />}
      </button>

      <nav 
        className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:justify-end md:flex-row flex-col md:items-center px-3 py-3 h-full md:h-[60px] gap-6 md:gap-0 items-end  w-full rounded dark:bg-opacity-45 bg-opacity-45 md:dark:bg-opacity-0 md:bg-opacity-0 backdrop-blur-sm`}
      >
       
        <div className="flex md:justify-between md:items-center gap-3 md:flex-row flex-col items-end pb-4 md:pb-0 ">
          <Link
          onClick={toggleMenu}
          to="/storage">Tienda</Link>
        {!isLoggedIn && (
            <div className='flex gap-5 md:items-center items-end flex-col md:flex-row '>
              <Link 
              onClick={toggleMenu}
              className="hover:text-primary" to="/login">Login</Link>
              <Link 
               onClick={toggleMenu}
              className="hover:text-primary" to="/signup">Sign Up</Link>
            </div>
          )}
        {isLoggedIn && (
            <div className='flex gap-5 md:items-center items-end flex-col md:flex-row '>
              <ProfileButton toggleMenu={toggleMenu}  />
              <LogoutButton toggleMenu={toggleMenu}  />
            </div>
          )}
        {/*   <ButtonTheme /> */}
         <Link
            to="/"
             className="flex md:hidden ml-4 my-2 items-center"
            onClick={() => setIsMenuOpen(false)}
            >
        <img
           src="/images/iconoIsitipo.png"
           alt="Logo"
           className="w-10 h-10 object-contain"
              />
      </Link>
        </div>
      </nav>
      <TokenVerificationCard setIsCardVisible={setIsCardVisible} />
    </div>
  );
};

export default NavBar;