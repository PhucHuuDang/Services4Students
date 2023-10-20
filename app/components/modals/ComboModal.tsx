"use client";

import { ServiceProp } from "@/app/types";
import { useMemo, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Modal from "./Modal";
import useComboModal from "@/app/hooks/useComboModal";
import Heading from "../Heading";
import CategoryInput from "../inputs/CategoryInput";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ComboModalProps {
  getService: ServiceProp[];
}

enum STEPS {
  SERVICE_ID = 0,
  IMAGES = 1,
  DESCRIPTION = 2,
  INFO_CREATED = 3,
}

const ComboModal: React.FC<ComboModalProps> = ({ getService }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(STEPS.SERVICE_ID);
  const comboModal = useComboModal();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listServiceId: [],
      packageDescription: "",
      packageName: "",
      weekNumberBooking: 1,
      numberOfPerWeekDoPackage: 1,
      dayDoServiceInWeek: "",
      imageUrl: "",
      createBy: "",
    },
  });

  const listServiceId = watch("listServiceId");
  const imageUrl = watch("imageUrl");

  //   console.log(listServiceId);

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

  // toggle function is here

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.INFO_CREATED) {
      return onNext();
    }

    axios
      .post("/api/combo", data)
      .then(() => {
        toast.success("Combo Created");
        router.refresh();
        reset();
        setStep(STEPS.SERVICE_ID);
        comboModal.onClose();
      })

      .catch(() => {
        toast.error("Please double-check all field your inputted!");
      })

      .finally(() => {
        setIsLoading(false);
      });
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO_CREATED) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.SERVICE_ID) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these services you want to add?"
        subtitle="You can choose many services"
        center
      />

      <div
        className="
            grid
            grid-cols-1
            md:grid-cols-2
            gap-3
            max-h-[50vh]
            overflow-auto
            mt-4
        "
      >
        {getService.map((item) => {
          return (
            !item.isDelete && (
              <div key={item.id} className="col-span-1">
                <CategoryInput
                  onClick={(listServiceValue) => {
                    if (listServiceId.includes(listServiceValue)) {
                      const removeId = listServiceId.filter(
                        (id: string) => id !== listServiceValue
                      );

                      setCustomValue("listServiceId", [...removeId]);
                    } else {
                      setCustomValue("listServiceId", [
                        listServiceValue,
                        ...listServiceId,
                      ]);
                    }
                  }}
                  id={item.id}
                  selected={listServiceId.includes(item.id)}
                  label={item.serviceName}
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
          title="Add a photo of your package(combo)"
          subtitle="Show customers what your package(combo) looks like!"
          center
        />

        <ImageUpload
          value={imageUrl}
          onChange={(value) => setCustomValue("imageUrl", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your combo"
          subtitle="Shot and sweet works best!"
          center
        />

        <Input
          id="packageName"
          label="Combo Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="packageDescription"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="weekNumberBooking"
          label="Weeks Booking"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  if (step === STEPS.INFO_CREATED) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set amount, day do for Combo and author"
          subtitle=""
          center
        />

        <Input
          id="numberOfPerWeekDoPackage"
          label="Number of working turns per week"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="dayDoServiceInWeek"
          label="Day work in week"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="createBy"
          label="Created BY"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  return (
    <Modal
      isOpen={comboModal.isOpen}
      onClose={comboModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryAction={step === STEPS.SERVICE_ID ? undefined : onBack}
      secondaryActionLabel={secondaryActionLabel}
      title="Add another package(combo)"
    />
  );
};

export default ComboModal;
