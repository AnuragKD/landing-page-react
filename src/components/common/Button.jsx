const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 cursor-pointer select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber focus-visible:ring-offset-2";

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-4 text-base",
  };

  const variants = {
    // Amber-filled — main CTA
    primary:
      "bg-amber text-white hover:bg-amber-light active:scale-95 shadow-md shadow-amber/20",
    // Navy-filled — secondary CTA
    navy:
      "bg-navy text-white hover:bg-deep-blue active:scale-95",
    // Outlined / ghost
    secondary:
      "border border-navy/20 bg-white text-navy hover:bg-navy hover:text-white active:scale-95",
    ghost:
      "bg-transparent text-navy hover:bg-navy/5 active:scale-95",
  };

  return (
    <button
      className={`${base} ${sizes[size] ?? sizes.md} ${variants[variant] ?? variants.primary} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;