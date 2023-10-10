"use client";

import useAddServiceModal from "@/app/hooks/useAddServiceModal";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";

enum STEPS {
  CATEGORY = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  PRICE = 3,
  CREATED = 4,
}

type GetCategory = {
  id: string;
  categoryName: string;
  created: string;
  createBy: string;
  lastModified: string;
  lastModifiedBy: null;
  isDelete: boolean;
};
// "id": "1794fb3f-3ba8-4361-9113-08647a0e53f3",
// "categoryName": "Các dịch vụ nấu ăn",
// "created": "2023-10-08T17:23:37.4447316",
// "createBy": "Thái Vĩ",
// "lastModified": "2023-10-08T17:23:37.4447306",
// "lastModifiedBy": null,
// "isDelete": false

interface AddServiceModalProps {
  getCategoryId: any;
}

const AddServicesModal: React.FC<AddServiceModalProps> = ({
  getCategoryId,
}) => {
  const addServiceModal = useAddServiceModal();
  const [step, setStep] = useState(STEPS.CATEGORY);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      serviceName: "",
      servicesDescription: "",
      quantity: "",
      imageURL: "",
      categoryId: "",
      createBy: "",
    },
  });

  const categoryId = watch("categoryId");
  //   console.log("categoryId: ", categoryId);

  const imageURL = watch("imageURL");

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = () => {
    if (step !== STEPS.CREATED) {
      return onNext();
    }

    // logic here
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.CREATED) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these category you want to add"
        subtitle="Pick a category"
        center
      />

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
            <div key={item.id} className="col-span-1">
              <CategoryInput
                onClick={(categoryId) =>
                  setCustomValue("categoryId", categoryId)
                }
                // onClick={(value) => console.log(value)}
                id={item.id}
                selected={categoryId === item.id}
                label={item.categoryName}
              />
            </div>
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
          subtitle="Show custom what your service looks like"
        />

        <ImageUpload
          value={imageURL}
          onChange={(value) => setCustomValue("imageURL", value)}
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={addServiceModal.isOpen}
      onClose={addServiceModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Add another service"
    />
  );
};

export default AddServicesModal;
