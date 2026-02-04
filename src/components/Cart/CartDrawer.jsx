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
  const { cartItems, cartTotal, refreshCart, cartChanged } = useCart();
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
      {/* BOTÓN CARRITO */}
      <CartButton
        count={cartItems.length}
        onOpen={() => {
          setOpen(true);
          refreshCart(); // 🔥 sin bloquear apertura
        }}
      />

      <AnimatePresence>
        {open && (
          <>
            {/* OVERLAY */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* DRAWER */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.15 }}
              className="fixed top-0 left-0 h-screen bg-neutral-950 z-60 
                         w-full sm:w-[400px] md:w-[500px] lg:w-[35%]
                         shadow-xl flex flex-col"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center border-b p-4">
                <h2 className="text-lg text-gray-200">Tu Carrito</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-200 hover:text-primary"
                >
                  ✕
                </button>
              </div>

              {/* LISTA (ÚNICO SCROLL) */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <p className="text-gray-300 mb-4">
                      Aún no tienes productos 😢 <br />
                      Ve a nuestra tienda y escoge.
                    </p>
                    <button
                      onClick={() => {
                        setOpen(false);
                        navigate("/storage");
                      }}
                      className="bg-primary text-white px-5 py-3 rounded-lg hover:bg-primary/80"
                    >
                      Ir a la tienda
                    </button>
                  </div>
                ) : (
                  cartItems.map((item, i) => (
                    <CartItem key={i} item={item} />
                  ))
                )}
              </div>

              {/* AVISO DE CAMBIOS */}
              {cartChanged && (
                <div className="mx-4 mb-2 rounded bg-yellow-500/10 border border-yellow-500/30 p-2">
                  <p className="text-yellow-400 text-sm">
                    ⚠️ Algunos precios o disponibilidad se actualizaron
                  </p>
                </div>
              )}

              {/* FOOTER FIJO */}
              {cartItems.length > 0 && (
                <div className="sticky bottom-0 bg-neutral-950 border-t p-4 flex justify-between items-center">
                  <span className="text-gray-300">
                    Total: {toCLP(cartTotal || 0)}
                  </span>
                  <button
                    onClick={handleCheckout}
                    className="bg-primary text-white px-7 py-3 rounded-lg hover:bg-primary/80 cursor-pointer"
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
