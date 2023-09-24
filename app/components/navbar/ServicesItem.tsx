"use client";

import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import { MdCleaningServices } from "react-icons/md";
import { FaBottleWater } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { GiWashingMachine } from "react-icons/gi";
import { FaMattressPillow } from "react-icons/fa6";
import { GiTheaterCurtains } from "react-icons/gi";
import { LuSofa } from "react-icons/lu";
import { PiFireExtinguisherFill } from "react-icons/pi";
import { FaCouch } from "react-icons/fa";
import { MdOutlineDeliveryDining } from "react-icons/md";
import { useRouter } from "next/navigation";

interface ServicesItemProps {
  onClick: () => void;
  label: string;
  isOpen?: boolean;
  onClose?: () => void;
  serviceLabel?: string;
  isOpenComboServices?: boolean;
}

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

  const router = useRouter();

  useEffect(() => {
    // isOpen will be change and every time isOpen change is call setShowMenuServices
    setShowMenuServices(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setShowMenuComboServices(isOpenComboServices);
  }, [isOpenComboServices]);

  const handleClick = useCallback(() => {
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
            cursor-pointer
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

            <MenuItem onClick={() => {}} label="Cleaning sofa" icon={LuSofa} />
          </>
        )}

        {isOpenComboServices && (
          <>
            {/* <div className=""> */}

            <MenuItem
              onClick={() => router.push("")}
              label="Cleaning furniture combo"
              icon={FaCouch}
            />

            <div className="flex flex-row relative z-10 right-10">
              <span className="flex h-3 w-3 pointer-events-none absolute right-20 top-2 items-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ff6347] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#ff6347]"></span>
              </span>
            </div>
            <MenuItem
              onClick={() => console.log("third")}
              label="Delivery food and water bottle"
              icon={MdOutlineDeliveryDining}
            />
            <MenuItem
              onClick={() => console.log("first")}
              label="Fire detection and apartment maintenance combo"
              icon={PiFireExtinguisherFill}
            />
            {/* </div> */}
          </>
        )}
      </div>
    </>
  );
};

export default ServicesItem;
