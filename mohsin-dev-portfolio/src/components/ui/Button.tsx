import { cn } from "@/lib/utils";
import { MagneticButton } from "@/components/effects/MagneticButton";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
  download?: boolean;
  external?: boolean;
};

const variants = {
  primary:
    "",
  secondary:
    "",
  ghost: "",
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  type = "button",
  disabled,
  ariaLabel,
  download,
  external,
}: ButtonProps) {
  return (
    <MagneticButton
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex px-6 py-3",
        variants[variant],
        variant === "ghost" ? "text-gray-300" : "",
        className,
      )}
      type={type}
      disabled={disabled}
      ariaLabel={ariaLabel}
      download={download}
      external={external}
      variant={variant}
    >
      {children}
    </MagneticButton>
  );
}
