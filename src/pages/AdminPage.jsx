import CreateProductSection from "../Admin/components/CreateProductSection";
import OrdersSection from "../Admin/components/OrdersSection";
import ProductsSection from "../Admin/components/ProductsSection";
import AdminLayout from "../Layout/AdminLayout";


const AdminPage = () => {
  return (
    <AdminLayout
      ProductsSection={ProductsSection}
      CreateProductSection={CreateProductSection}
      OrdersSection={OrdersSection}
    />
  );
};

export default AdminPage;