"use client";

import { useRouter } from "next/navigation";
import ServicesItem from "./ServicesItem";
import Input from "../inputs/Input";
import { FieldValues, useForm } from "react-hook-form";
import { useCallback, useState } from "react";
import useServicesModal from "@/app/hooks/useServicesModal";

const Search = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenComboServices, setIsOpenComboServices] = useState(false);

  const useServices = useServicesModal();

  const toggleServices = useCallback(() => {
    setIsOpen((value) => !value);
    console.log("isOpen", isOpen);
  }, [isOpen]);

  const toggleComboServices = useCallback(() => {
    setIsOpenComboServices((value) => !value);
  }, [isOpenComboServices]);

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
    <div className="flex flex-row gap-12">
      <ServicesItem
        onClick={toggleServices}
        isOpen={isOpen}
        label="Services"
        // serviceLabel="Cleaning the house"
      />
      <ServicesItem
        onClick={toggleComboServices}
        label="Combo services"
        isOpenComboServices={isOpenComboServices}
      />
      <ServicesItem onClick={() => {}} label="Contact us" />
      {/* <div className="w-[100px] h-auto">
        <Input id="search" label="Search" register={register} errors={errors} />
      </div> */}
    </div>
  );
};

export default Search;
