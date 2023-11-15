"use client";

import { useRouter } from "next/navigation";
import ServicesItem from "./ServicesItem";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useCallback, useState, memo } from "react";
import useServicesModal from "@/app/hooks/useServicesModal";
import MenuItem from "./MenuItem";
import SearchModal from "../modals/SearchModal";
import { ServiceProp } from "@/app/types";

interface SearchProps {
  services?: any;
}

const Search: React.FC<SearchProps> = ({ services }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComboServices, setIsOpenComboServices] = useState(false);

  const useServices = useServicesModal();

  const toggleServices = useCallback(() => {
    setIsOpen((value) => !value);

    // console.log("isOpen", isOpen);
  }, []);

  const toggleComboServices = useCallback(() => {
    setIsOpenComboServices((value) => !value);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      search: "",
    },
  });

  return (
    <div className="flex flex-row gap-12 transition duration-300 md:w-3/5  ">
      <div className="flex flex-col items-center transition ">
        <ServicesItem
          onClick={toggleServices}
          isOpen={isOpen}
          label="Services"
          services={services}
          // serviceLabel="Cleaning the house"
        />
      </div>
      <div className="flex flex-col items-center">
        <ServicesItem
          // onClick={toggleComboServices}
          label="Combo services"
          onClick={() => router.push("/combo")}

          // isOpenComboServices={isOpenComboServices}
        />
      </div>
      <ServicesItem
        onClick={() => router.push("/contact")}
        label="Contact us"
      />
      {/* <div className="w-[100px] h-auto">
        <Input id="search" label="Search" register={register} errors={errors} />
      </div> */}
    </div>
  );
};

export default memo(Search);
