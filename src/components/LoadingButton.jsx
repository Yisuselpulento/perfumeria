import Spinner from "./Spinner/Spinner";

const LoadingButton = ({
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  children,
  ...rest
}) => {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      aria-label="loading button"
      className={`w-full mt-3 rounded-lg py-2 h-[40px] flex items-center justify-center text-[#F9EDC5] transition-colors 
        ${loading ? "bg-gray-400" : "bg-primary hover:bg-primary/60 cursor-pointer"} ${className}`}
      {...rest}
    >
      {loading ? <Spinner size="1.2em" /> : children}
    </button>
  );
};

export default LoadingButton;