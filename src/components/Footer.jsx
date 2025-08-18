import { useState } from "react"
import { Link } from "react-router-dom"
import ArrowDown from "../icons/ArrowDown"
import InstagramIcon from "../icons/InstagramIcon"

const Footer = () => {
  const [showTerms, setShowTerms] = useState(false)
  const [showContact, setShowContact] = useState(false)

  return (
    <div className="footer flex flex-col items-center gap-6 pt-10 pb-2 bg-black/70">
      <div className="flex flex-col items-start gap-3 w-full px-3">

        <div
          className="flex justify-between items-center w-full cursor-pointer"
          onClick={() => setShowTerms(!showTerms)}
        >
          <p className="text-white">Servicio al cliente</p>
          <ArrowDown />
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out transform text-xs ${
            showTerms ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
          }`}
        >
          <Link
            to="/terminosycondiciones"
            className="text-primary hover:text-primary/80"
          >
            Términos y condiciones
          </Link>
        </div>

        <div
          className="flex justify-between items-center w-full cursor-pointer"
          onClick={() => setShowContact(!showContact)}
        >
          <p className="text-white">Contacta con nosotros</p>
          <ArrowDown />
        </div>

        <div
          className={`overflow-hidden transition-all duration-200 ease-in-out transform ${
            showContact ? "max-h-20 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-4"
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

      <p className="text-white">Made by Monsster</p>
    </div>
  )
}

export default Footer