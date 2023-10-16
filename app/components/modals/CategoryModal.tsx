"use client";

import axios from "axios";
import { toast } from "react-hot-toast";
import { IoReturnDownBack } from "react-icons/io5";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

import Modal from "./Modal";
import useCategoryModal from "@/app/hooks/useCategoryModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import useAddServiceModal from "@/app/hooks/useAddServiceModal";

const CategoryModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const categoryModal = useCategoryModal();
  const addServiceModal = useAddServiceModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      categoryName: "",
      imageUrl: "",
      createBy: "",
    },
  });

  const toggle = useCallback(() => {
    categoryModal.onClose();
    addServiceModal.onOpen();
  }, [categoryModal, addServiceModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);

    axios
      .post("/api/category/create", data)

      .then(() => {
        toast.success("Create category successfully!");
        router.refresh();
        categoryModal.onClose();
        addServiceModal.onOpen();
      })
      .catch(() => {
        toast.error("Please check all the field you inputted");
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="What category's name you wanna create?"
        subtitle="More category make our services more diverse"
        center
      />

      <Input
        id="categoryName"
        label="Category Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="imageUrl"
        label="Icon"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <Input
        id="createBy"
        label="Created By"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="text-center text-neutral-600 mt-4 font-light">
        <div
          className="
                flex 
                flex-row 
                justify-center 
                items-center gap-2 
                hover:scale-x-105
                transition
                duration-200

            "
        >
          {/* <BiArrowBack className="" /> */}
          <IoReturnDownBack size={20} />
          <div onClick={toggle} className="cursor-pointer hover:underline">
            Back to Add Service
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={categoryModal.isOpen}
      body={bodyContent}
      onClose={categoryModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      title="Create Category"
      actionLabel="Create"
    />
  );
};

export default CategoryModal;
