"use client";

import { CgPlayListAdd } from "react-icons/cg";
import { GiWashingMachine } from "react-icons/gi";

import useAddServiceModal from "@/app/hooks/useAddServiceModal";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useCategoryModal from "@/app/hooks/useCategoryModal";
import { IconType } from "react-icons";
import { ServiceProp } from "@/app/types";
import useUpdateServiceModal from "@/app/hooks/useUpdateServiceModal";

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  PRICE = 3,
  // CREATED = 4,
}

type GetCategory = {
  id: string;
  categoryName: string;
  created: string;
  createBy: string;
  lastModified: string;
  lastModifiedBy: null;
  isDelete: boolean;
  image: IconType;
};
// "id": "1794fb3f-3ba8-4361-9113-08647a0e53f3",
// "categoryName": "Các dịch vụ nấu ăn",
// "created": "2023-10-08T17:23:37.4447316",
// "createBy": "Thái Vĩ",
// "lastModified": "2023-10-08T17:23:37.4447306",
// "lastModifiedBy": null,
// "isDelete": false

interface UpdateServiceModalProps {
  getCategoryId: any;
  dataUpdate: ServiceProp | null;
}

const UpdateServiceModal: React.FC<UpdateServiceModalProps> = ({
  getCategoryId,
  dataUpdate,
}) => {
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const categoryModal = useCategoryModal();

  const updateServiceModal = useUpdateServiceModal();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      serviceId: dataUpdate?.id,
      serviceName: dataUpdate?.serviceName,
      serviceDescription: dataUpdate?.serviceDescription,
      originalPrice: dataUpdate?.originalPrice,
      unit: dataUpdate?.unit,
      discountPercent: dataUpdate?.discountPercent,
      imageURL: "",
      categoryId: "",
    },
  });

  const categoryId = watch("categoryId");
  //   console.log("categoryId: ", categoryId);

  const imageURL = watch("imageURL");

  //   console.log(imageURL);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    if (dataUpdate !== null) {
      setValue("serviceId", dataUpdate?.id);
      setValue("serviceName", dataUpdate?.serviceName);
      setValue("serviceDescription", dataUpdate?.serviceDescription);
      setValue("originalPrice", dataUpdate?.originalPrice);
      setValue("unit", dataUpdate?.unit);
      // setValue('discountPercent', dataUpdate.
      setValue("imageURL", dataUpdate?.image);
    }

    // setValue('categoryId', dataUpdate.id)
  }, [dataUpdate, setValue]);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const toggle = useCallback(() => {
    updateServiceModal.onClose();
    categoryModal.onOpen();
  }, [updateServiceModal, categoryModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    // logic here

    axios
      .put("/api/service/update", data)
      .then(() => {
        toast.success("Service Created!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        updateServiceModal.onClose();
      })
      .catch(() => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "UPDATE";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  //   console.log(dataUpdate);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these category you want to add"
        subtitle="Create or pick a category"
        center
      />

      <div
        className="
            flex 
            flex-row
            justify-center 
            items-center 
        "
      >
        <div
          onClick={toggle}
          className="
            flex 
            flex-row 
            justify-center 
            items-center 
            gap-1
            shadow-sm
            bg-neutral-50
            cursor-pointer
            hover:bg-neutral-200
            hover:shadow-lg
            hover:scale-105
            py-3
            px-8
            rounded-lg
            transition
            duration-200
            
            "
        >
          <CgPlayListAdd size={24} />

          <div className="text-md">Create category</div>
        </div>
      </div>

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        gap-3
        max-h-[50vh]
        overflow-y-auto
        mt-4
      
      "
      >
        {getCategoryId.map((item: GetCategory) => {
          return (
            !item.isDelete && (
              <div key={item.id} className="col-span-1">
                <CategoryInput
                  onClick={(categoryId) =>
                    setCustomValue("categoryId", categoryId)
                  }
                  // icon={GiWashingMachine}
                  icon={GiWashingMachine || item.image}
                  // onClick={(value) => console.log(value)}
                  id={item.id}
                  selected={categoryId === item.id}
                  label={item.categoryName}
                />
              </div>
            )
          );
        })}
      </div>
    </div>
  );

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your service"
          subtitle="Show customers what your service looks like"
          center
        />

        <ImageUpload
          value={imageURL}
          onChange={(value) => setCustomValue("imageURL", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your service?"
          subtitle="Shot and sweet works best!"
          center
        />

        <Input
          id="serviceName"
          label="Title"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="serviceDescription"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set the service's price"
          subtitle="How much do you charge for the service?"
          center
        />
        <Input
          id="originalPrice"
          label="Original Price"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="discountPercent"
          label="Discount Percent"
          formatPrice
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="unit"
          label="Unit for service"
          formatPrice
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // if (step === STEPS.CREATED) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Set unit for the serivce"
  //         subtitle="Thanks for provide more service"
  //         center
  //       />

  //       <Input
  //         id="unit"
  //         label="Unit for service"
  //         formatPrice
  //         disabled={isLoading}
  //         register={register}
  //         errors={errors}
  //         required
  //       />
  //     </div>
  //   );
  // }

  return (
    <Modal
      disabled={isLoading}
      isOpen={updateServiceModal.isOpen}
      onClose={updateServiceModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Update information for service"
    />
  );
};

export default UpdateServiceModal;
