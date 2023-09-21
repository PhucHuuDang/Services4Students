"use client";

import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import useServicesModal from "@/app/hooks/useServicesModal";
import { MdCleaningServices } from "react-icons/md";
import { FaBottleWater } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { FaMattressPillow } from "react-icons/fa6";
import { GiTheaterCurtains } from "react-icons/gi";
import { GiSofa } from "react-icons/gi";

interface ServicesItemProps {
  onClick: () => void;
  label: string;
  isOpen?: boolean;
  onClose?: () => void;
  serviceLabel?: string;
  isOpenComboServices?: boolean;
}

const services = [
  {
    id: 1,
    label: "Cleaning the apartment",
    icon: "GiWashingMachine",
  },
];

const ServicesItem: React.FC<ServicesItemProps> = ({
  onClick,
  label,
  isOpen,
  onClose,
  serviceLabel,
  isOpenComboServices,
}) => {
  const [showMenuServices, setShowMenuServices] = useState(isOpen);
  const [showMenuComboServices, setShowMenuComboServices] =
    useState(isOpenComboServices);
  // const []

  const useServices = useServicesModal();

  useEffect(() => {
    // isOpen will be change and every time isOpen change is call setShowMenuServices
    setShowMenuServices(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setShowMenuComboServices(isOpenComboServices);
  }, [isOpenComboServices]);

  //   console.log("sbowMenu", showMenuServices);
  const toggle = useCallback(() => {
    setTimeout(() => {
      setShowMenuServices((value) => !value);
    }, 200);
  }, []);

  const handleClick = useCallback(() => {
    // setShowMenuServices((value) => !value);
    // console.log(isOpen);

    onClick();
  }, [onClick]);

  return (
    <>
      <div className="relative">
        <div
          onClick={handleClick}
          className="
            font-semibold
            text-md 
            hover:text-[#ff6347]
            focus:text-[#ff6347]
            cursor-pointer 
            transition
            duration-300
        "
        >
          {label}
        </div>
      </div>
      <div
        className={`
            absolute 
            rounded-xl 
            shadow-md
            w-[40vw]
            md:w-auto
            bg-white 
            overflow-hidden 
            top-12 
            text-sm
            translate
            duration-300
            
            ${
              showMenuServices || showMenuComboServices
                ? "translate-y-0"
                : "translate-y-full"
            }    
            ${
              showMenuServices || showMenuComboServices
                ? "opacity-100"
                : "opacity-0"
            }    

        `}
      >
        {isOpen && (
          <>
            {/* <div className="flex flex-row items-center"> */}
            {/* <MdCleaningServices size={24} /> */}
            <MenuItem
              onClick={() => {}}
              label="Cleaning the apartment "
              icon={MdCleaningServices}
            />
            {/* </div> */}

            <MenuItem
              onClick={() => {}}
              label="Delivery water bottle "
              icon={FaBottleWater}
            />

            <MenuItem
              onClick={() => {}}
              label="Food booking"
              icon={IoFastFoodOutline}
            />

            <MenuItem
              onClick={() => {}}
              label="Washing clothes"
              icon={GiWashingMachine}
            />

            <MenuItem
              onClick={() => {}}
              label="Cleaning door curtain"
              icon={FaMattressPillow}
            />

            <MenuItem
              onClick={() => {}}
              label="Washing clothes"
              icon={GiTheaterCurtains}
            />

            <MenuItem onClick={() => {}} label="Cleaning sofa" icon={GiSofa} />
          </>
        )}

        {isOpenComboServices && (
          <>
            <div className="">
              <MenuItem
                onClick={() => {}}
                label="Cleaning the apartment "
                icon={MdCleaningServices}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ServicesItem;
