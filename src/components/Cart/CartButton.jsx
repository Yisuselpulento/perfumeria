import CartIcon from "../../icons/CartIcon";

const CartButton = ({ count = 0, onOpen }) => {

  return (
    <button
        onClick={onOpen}
      className="relative inline-flex items-center justify-center p-1 cursor-pointer 
                 transition-colors duration-200 rounded-full group mr-1 md:mr-0"
    >
      <CartIcon width={23} height={23} className=" group-hover:text-primary" />
      
      {count > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-1.5 py-0.5 shadow-md">
          {count}
        </span>
      )}
    </button>
  );
};

export default CartButton;