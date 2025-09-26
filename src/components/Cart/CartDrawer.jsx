import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CartButton from "./CartButton";
import useCart from "../../hooks/useCart";
import CartItem from "./CartItem";
import { toCLP } from "../../helpers/toClp";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);
  const { cartItems, cartTotal } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) return;

    if (!auth?.success) {
      setOpen(false);
      navigate("/login");
      return;
    }

    setOpen(false);
    navigate("/checkout");
  };

  return (
    <>
      {/* Botón flotante del carrito */}
      <CartButton count={cartItems.length} onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.15 }}
              className="fixed top-0 left-0 h-screen bg-neutral-950  z-60 w-full sm:w-[400px] md:w-[500px] lg:w-[35%] shadow-xl p-4 flex flex-col"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center border-b pb-2">
                <h2 className="text-lg text-gray-200">
                  Tu Carrito
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-200 cursor-pointer hover:text-primary"
                >
                  ✕
                </button>
              </div>

              {/* LISTA DE ITEMS */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-3">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-300 mb-4">
                      Aún no tienes productos 😢 <br /> Ve a nuestra tienda y
                      escoge.
                    </p>
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/storage");
                      }}
                      className="bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/80 cursor-pointer"
                    >
                      Ir a la tienda
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, i) => <CartItem key={i} item={item} />)
                )}
              </div>

              {/* FOOTER */}
              {cartItems.length > 0 && (
                <div className="border-t pt-2 flex justify-between items-center">
                  <span className="text-gray-300">
                    Total: {toCLP(cartTotal || 0)}
                  </span>
                  <button
                    onClick={handleCheckout}
                    className="bg-primary text-white px-7 py-3 rounded-lg hover:bg-primary/80  cursor-pointer"
                  >
                    IR A PAGAR
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;