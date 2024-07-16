import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
  arialLabel?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  children = "Button",
  className,
  arialLabel,
  ...rest
}) => {
  return (
    <button
      className={twMerge(
        "w-full  px-4 py-2 bg-blue-600 text-white text-nowrap",
        className
      )}
      {...rest}
      aria-label={arialLabel}
    >
      {children}
    </button>
  );
};

export default Button;
