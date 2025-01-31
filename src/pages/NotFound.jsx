import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="p-2 flex flex-col md:flex-row items-center justify-center h-screen">
      <h1 className="text-primary text-3xl font-bold m-2">Error 404</h1>
      <p>La página que buscas no existe.</p>
      <Link 
      className="text-primary hover:text-purple-400 p-2"
      to="/">Volver al inicio</Link>
    </div>
  );
}