import OrdersSection from "../Admin/components/OrdersSection";
import ProductsSection from "../Admin/components/ProductsSection";
import NotificationsSection from "../Admin/components/NotificationsSection";
import AdminLayout from "../Layout/AdminLayout";
import ReviewSection from "../Admin/components/ReviewSection";


const AdminPage = () => {
  return (
    <>
    <AdminLayout
      ProductsSection={ProductsSection}
      OrdersSection={OrdersSection}
      NotificationsSection={NotificationsSection}
      ReviewSection={ReviewSection}
    />
    </>
  );
};

export default AdminPage;