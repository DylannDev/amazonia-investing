interface TooltipProps {
  children: React.ReactNode;
  className?: string;
}

function Tooltip({ children, className = "" }: TooltipProps) {
  return (
    <div
      className={`absolute left-full ml-2 px-3 py-1 bg-blue-300 text-white text-sm rounded-full opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-200 ${className}`}
    >
      {children}
    </div>
  );
}

export default Tooltip;
