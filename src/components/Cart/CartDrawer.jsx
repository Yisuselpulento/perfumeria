import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import CartButton from "./CartButton";

const CartDrawer = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
     <CartButton count={0} onOpen={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
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
             className="fixed top-0 left-0 h-screen bg-white z-50 w-full sm:w-[400px] md:w-[500px] lg:w-[35%] shadow-xl p-4 flex flex-col"
            >

              <div className="flex justify-between items-center border-b pb-2 ">
                <h2 className="text-lg font-semibold">Tu Carrito</h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-500 hover:text-black"
                >
                  ✕
                </button>
              </div>

              <div className="flex-1 overflow-y-auto mt-4">
                <p className="text-gray-500">Tu carrito está vacío 😢</p>
              </div>
              <div className="border-t pt-2 flex justify-between items-center">
                <span className="font-bold">Total: $0</span>
                <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/80">
                  Ir a pagar
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
