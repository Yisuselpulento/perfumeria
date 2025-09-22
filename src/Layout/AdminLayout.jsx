import { useState } from "react";

const AdminLayout = ({ ProductsSection, CreateProductSection, OrdersSection, NotificationsSection, ReviewSection  }) => {
  const [activeSection, setActiveSection] = useState("products");

  return (
    <div className="flex flex-col h-screen">
      <div className="flex justify-around items-center h-16 backdrop-blur-lg border border-white/20 shadow-md  mb-4">
        <button
          onClick={() => setActiveSection("products")}
          className={`flex-1 text-center py-2 ${activeSection === "products" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}
        >
          Productos
        </button>
        <button
          onClick={() => setActiveSection("create")}
          className={`flex-1 text-center py-2 ${activeSection === "create" ? "font-semibold text-blue-600" : "text-gray-300  cursor-pointer"}`}
        >
          Crear
        </button>
        <button
          onClick={() => setActiveSection("orders")}
          className={`flex-1 text-center py-2 ${activeSection === "orders" ? "font-semibold text-blue-600" : "text-gray-300  cursor-pointer"}`}
        >
          Órdenes
        </button>
          <button
          onClick={() => setActiveSection("notifications")}
          className={`flex-1 text-center py-2 ${activeSection === "notifications" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}
        >
          Notificaciones
        </button>
         <button onClick={() => setActiveSection("reviews")} className={`flex-1 text-center py-2 ${activeSection === "reviews" ? "font-semibold text-blue-600" : "text-gray-300 cursor-pointer"}`}>
          Reseñas
          </button>
      </div>

      <div className="flex-1 overflow-auto">
        {activeSection === "products" && <ProductsSection />}
        {activeSection === "create" && <CreateProductSection />}
        {activeSection === "orders" && <OrdersSection />}
        {activeSection === "notifications" && <NotificationsSection />}
        {activeSection === "reviews" && <ReviewSection />}
      </div>
    </div>
  );
};

export default AdminLayout;