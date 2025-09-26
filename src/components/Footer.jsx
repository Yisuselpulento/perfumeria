import { useState } from "react";
import { Link } from "react-router-dom";
import ArrowDown from "../icons/ArrowDown";
import InstagramIcon from "../icons/InstagramIcon";

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="footer flex flex-col items-center gap-5 pt-10 pb-2 bg-black/70">
      <div className="w-full px-3 flex flex-col gap-4 md:flex-row md:justify-between md:w-[50%] md:gap-20">
        <div className="flex flex-col items-start gap-3 w-full md:w-auto">
          <div
            className="flex justify-between items-center w-full cursor-pointer md:cursor-default md:block"
            onClick={() => setShowTerms(!showTerms)}
          >
            <p className="text-white">Servicio al cliente</p>
            <div className="md:hidden">
              <ArrowDown />
            </div>
          </div>
          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out transform text-xs md:overflow-visible md:opacity-100 md:translate-y-0 md:max-h-none ${
              showTerms
                ? "max-h-20 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <Link
              to="/terminosycondiciones"
              className="text-primary hover:text-primary/80"
            >
              Términos y condiciones
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 w-full md:w-auto">
          <div
            className="flex justify-between items-center w-full cursor-pointer md:cursor-default md:block"
            onClick={() => setShowContact(!showContact)}
          >
            <p className="text-white">Contacta con nosotros</p>
            <div className="md:hidden">
              <ArrowDown />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-200 ease-in-out transform md:overflow-visible md:opacity-100 md:translate-y-0 md:max-h-none ${
              showContact
                ? "max-h-20 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-4"
            }`}
          >
            <a
              href="https://www.instagram.com/moriakuma.d"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-2 text-primary hover:text-primary/80"
            >
              <InstagramIcon width={17} height={17} />
            </a>
          </div>
        </div>
      </div>
      <p className="text-white text-center mt-10">Made by Monsster</p>
    </div>
  );
};

export default Footer;