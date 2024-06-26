import { AnchorHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = {
  href: string;
  children?: ReactNode;
  className?: string;
}& AnchorHTMLAttributes<HTMLAnchorElement>

const Link: React.FC<Props> = ({
  href,
  children = "Link",
  className,
  ...rest
}) => {
  return (
    <a
      href={href}
      className={twMerge("flex p-4 items-center text-blue-500", className)}
      {...rest}
    >
      {children}
    </a>
  );
};

export default Link;
