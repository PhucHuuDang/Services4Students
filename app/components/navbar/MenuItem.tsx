"use client";

import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void;
  label: string;
  serviceLabel?: string;
  icon?: IconType;
}

const MenuItem: React.FC<MenuItemProps> = ({
  onClick,
  label,
  serviceLabel,
  icon: Icon,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
          px-4
          py-3
          hover:bg-neutral-100
          font-semibold
          transition
          ${
            Icon
              ? "flex flex-row items-center justify-items-center relative gap-3 "
              : ""
          }
      `}
    >
      <div>{Icon && <Icon size={24} className="flex flex-row" />}</div>
      {label || serviceLabel}
    </div>
  );
};

export default MenuItem;
