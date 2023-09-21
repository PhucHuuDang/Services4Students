"use client";

import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  disabled,
  label,
  onClick,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled:cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? "bg-white" : "bg-[#ff6347]"}
        ${outline ? "border-black" : "border-[#ff6347]"}
        ${outline ? "text-black" : "text-white"}
        ${small ? "py-1" : "py-2"}
        ${small ? "text-sm" : "py-2"}
        ${small ? "font-light" : "font-semibold"}
        ${small ? "border-[1px]" : "border-2"}
  `}
    >
      {Icon && <Icon size={30} className="absolute left-4 top-1" />}
      {label}
    </button>
  );
};

export default Button;
