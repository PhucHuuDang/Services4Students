"use client";

import { memo } from "react";
import { IconType } from "react-icons";

interface CategoryInputProps {
  onClick: (value: string) => void;
  selected: boolean;
  label: string;
  id: string;
  icon?: IconType;
  manageCategories?: boolean;
  openDeleteUserModal?: (id: string, serviceName: string) => void;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  id,
  icon: Icon,
  manageCategories,
  openDeleteUserModal,
}) => {
  return (
    <div
      //   onClick={() => console.log(id)}
      onClick={() => onClick(id)}
      className={`
            rounded-xl
            border-2
            p-4
            flex
            flex-col
            gap-3
            hover:border-black
            transition
            cursor-pointer
            ${selected ? "border-black" : "border-neutral-200"}
            ${manageCategories ? "relative gap-6 cursor-default " : ""}
      
      `}
      style={{ position: "relative" }}
    >
      {Icon && (
        <Icon
          onClick={() => openDeleteUserModal?.(id, label)}
          size={30}
          className={`
            ${
              manageCategories
                ? "absolute right-[-3px] z-10 top-[-5px] mt-[-5px] hover:cursor-pointer hover:text-red-500  bg-white rounded-full"
                : ""
            }
          `}
        />
      )}
      <div className="font-semibold">{label}</div>
    </div>
  );
};

export default memo(CategoryInput);
