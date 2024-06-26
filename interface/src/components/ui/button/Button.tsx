import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  children?: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<Props> = ({
  children = "Button",
  className,
  ...rest
}) => {
  return (
    <button
      className={twMerge("w-full p-4 bg-blue-600 text-white", className)}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
