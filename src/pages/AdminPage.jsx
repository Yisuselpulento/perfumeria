import OrdersSection from "../Admin/components/OrdersSection";
import ProductsSection from "../Admin/components/ProductsSection";
import NotificationsSection from "../Admin/components/NotificationsSection";
import ReviewSection from "../Admin/components/ReviewSection";
import StockRequestsSection from "../Admin/components/StockRequestsSection";
import AdminLayout from "../Layout/AdminLayout";

const AdminPage = () => {
  return (
    <AdminLayout
      ProductsSection={ProductsSection}
      OrdersSection={OrdersSection}
      NotificationsSection={NotificationsSection}
      ReviewSection={ReviewSection}
      StockRequestsSection={StockRequestsSection}
    />
  );
};

export default AdminPage;
