const BadgeCounter = ({ count, children }) => {
  return (
    <div className="relative inline-block">
      {children}
      {count > 0 && (
        <span className="absolute -top-1 -right-2 bg-red-600 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
          {count}
        </span>
      )}
    </div>
  );
};

export default BadgeCounter;