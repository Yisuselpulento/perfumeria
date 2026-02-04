import { useState, useEffect } from "react";
import { getAllOrdersFetching } from "../services/OrderFetching";
import BadgeCounter from "../components/BadgeCounter";
import { getAllNotificationsFetching } from "../services/NotificationFetching";

const AdminLayout = ({ ProductsSection, OrdersSection, NotificationsSection, ReviewSection, StockRequestsSection  }) => {
  const [activeSection, setActiveSection] = useState("products");
  const [ordersCount, setOrdersCount] = useState(0);
  const [notificationsCount, setNotificationsCount] = useState(0);

    useEffect(() => {
    const fetchNotificationsCount = async () => {
      try {
        const res = await getAllNotificationsFetching();
        if (res.success) {
          // Contamos solo las no leídas
          const unread = res.data.filter((n) => !n.read).length;
          setNotificationsCount(unread);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchNotificationsCount();
    const intervalNotifications = setInterval(fetchNotificationsCount, 30000);
    return () => clearInterval(intervalNotifications);
  }, []);

  useEffect(() => {
  const fetchOrdersCount = async () => {
    try {
      const res = await getAllOrdersFetching();
      if (res.success) {
        // Por ejemplo, solo contamos las órdenes que no estén "delivered" ni "cancelled"
        const pendingOrders = res.data.filter(
          (o) => o.status !== "delivered" && o.status !== "cancelled"
        ).length;
        setOrdersCount(pendingOrders);
      }
    } catch (err) {
      console.error(err);
    }
  };

  fetchOrdersCount();

  // Opcional: refrescar cada cierto tiempo
  const interval = setInterval(fetchOrdersCount, 30000);
  return () => clearInterval(interval);
}, []);

  return (
    <div className="flex flex-col h-screen text-sm">
      <div className="flex justify-around items-center h-16 backdrop-blur-lg border border-white/20 shadow-md  mb-1">
        <button
          onClick={() => setActiveSection("products")}
          className={`flex-1 text-center py-2 ${activeSection === "products" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}
        >
          Productos
        </button>
        <button
            onClick={() => setActiveSection("orders")}
            className={`flex-1 text-center py-2 ${
              activeSection === "orders" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"
            }`}
          >
            <BadgeCounter count={ordersCount}>
              Órdenes
            </BadgeCounter>
          </button>
         <button
          onClick={() => setActiveSection("notifications")}
          className={`flex-1 text-center py-2 ${activeSection === "notifications" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}
        >Notificaciones
        {/*   <BadgeCounter count={notificationsCount}>Notificaciones</BadgeCounter> */}
        </button>
         <button onClick={() => setActiveSection("reviews")} className={`flex-1 text-center py-2 ${activeSection === "reviews" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}>
          Reseñas
          </button>
          <button
            onClick={() => setActiveSection("stock-requests")}
            className={`flex-1 text-center py-2 ${
              activeSection === "stock-requests"
                ? "font-semibold text-blue-600"
                : "text-gray-300 cursor-pointer"
            }`}
          >
            Soli-Stock
          </button>
      </div>

      <div className="flex-1 overflow-auto">
            {activeSection === "products" && <ProductsSection />}
            {activeSection === "orders" && <OrdersSection />}
            {activeSection === "stock-requests" && StockRequestsSection && (
              <StockRequestsSection />
            )}
            {activeSection === "notifications" && <NotificationsSection />}
            {activeSection === "reviews" && <ReviewSection />}
          </div>
    </div>
  );
};

export default AdminLayout;