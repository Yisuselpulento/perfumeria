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
    const {  cartItems, cartTotal  } = useCart()
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
     <CartButton count={0} onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-55"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} 
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.1 }}
             className="fixed top-0 left-0 h-screen bg-white z-60 w-full sm:w-[400px] md:w-[500px] lg:w-[35%] shadow-xl p-4 flex flex-col"
            >

              <div className="flex justify-between items-center border-b pb-2 ">
                <h2 className="text-lg font-semibold text-gray-700">Tu Carrito</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

               <div className="flex-1 overflow-y-auto mt-4 space-y-3">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500">Tu carrito está vacío 😢</p>
                ) : (
                  cartItems.map((item, i) => <CartItem key={i} item={item} />)
                )}
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold text-gray-800">Total: {toCLP(cartTotal)}</span>
                <button 
                onClick={handleCheckout}
                className="bg-primary text-white px-7 py-3 rounded-lg hover:bg-primary/80 border-2 border-gray-200">
                  IR A PAGAR
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default CartDrawer;