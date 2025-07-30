import { Link } from "react-router-dom"
import ProductForm from "../Admin/ProductForm"

const AdminPage = () => {
  return (
    <div>
      <Link className="hover:text-primary" to="/">
        Home
      </Link>
        <p className="text-2xl font-bold mb-4">Panel de Administración</p>
        <ProductForm />
      
    </div>
  )
}

export default AdminPage