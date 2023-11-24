"use client";

import { memo, useState } from "react";
import { IconType } from "react-icons";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CategoryInputProps {
  onClick?: (value: string) => void;
  handleSetService?: (value: string, newValue: number) => void;
  selected: boolean;
  label: string;
  id: string;
  icon?: IconType;
  manageCategories?: boolean;
  openDeleteUserModal?: (id: string, serviceName: string) => void;
  quantity?: number;
  combo?: boolean;
}

const CategoryInput: React.FC<CategoryInputProps> = ({
  onClick,
  selected,
  label,
  id,
  icon: Icon,
  manageCategories,
  openDeleteUserModal,
  quantity: initialQuantity,
  handleSetService,
  combo,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity || 0);
  // console.log(quantity);

  // const handleMinusItem = () => {
  //   setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0));
  // };
  const handleMinusItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setQuantity((prevQuantity) => {
      const newQuantity = Math.max(prevQuantity - 1, 0);
      handleSetService?.(id, newQuantity); // Call onClick with the updated quantity
      return newQuantity;
    });
  };

  // const handlePlusItem = () => {
  //   setQuantity((prevQuantity) => prevQuantity + 1);
  // };

  const handlePlusItem = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      handleSetService?.(id, newQuantity); // Call onClick with the updated quantity
      return newQuantity;
    });
  };

  return (
    <div
      //   onClick={() => console.log(id)}
      onClick={() => onClick?.(id)}
      className={`
            rounded-xl
            border-2
            p-4
            gap-3
            hover:border-black
            transition
            cursor-pointer
            min-h-[84px]
            ${selected ? "border-black" : "border-neutral-200"}
            ${manageCategories ? "relative gap-6 cursor-default " : ""}
            ${combo ? "flex flex-row justify-between" : "flex flex-col"}
      
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
      {combo && (
        <div className="flex items-center gap-3">
          <div
            onClick={(e) => handleMinusItem(e)}
            className="
                      bg-neutral-300
                      p-2
                      rounded-lg
                      hover:bg-neutral-400
                      hover:shadow-lg
                      transition
                      duration-200"
          >
            <AiOutlineMinus />
          </div>
          {quantity}
          <div
            onClick={(e) => handlePlusItem(e)}
            className="
                  bg-neutral-300
                  p-2
                  rounded-lg
                  hover:bg-neutral-400
                  hover:shadow-lg
                  transition
                  duration-200"
          >
            <AiOutlinePlus />
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(CategoryInput);
