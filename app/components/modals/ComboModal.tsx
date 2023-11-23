"use client";

import { ServiceProp } from "@/app/types";
import { use, useCallback, useEffect, useMemo, useState } from "react";
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
  QUANTITY = 1,
  IMAGES = 2,
  DESCRIPTION = 3,
  // INFO_CREATED = 3,
  // DAYS = 3,
}

const options = [
  { value: "2", label: "Monday" },
  { value: "3", label: "TuesDay" },
  { value: "4", label: "Wednesday" },
  { value: "5", label: "Thursday" },
  { value: "6", label: "Friday" },
  { value: "7", label: "Saturday" },
  { value: "1", label: "Sunday" },
];

type OptionsProps = {
  value: string;
  label: string;
};

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
      quantity: 1,
      packageDescription: "",
      packageName: "",
      discountPercent: "",
      imageUrl: "",
    },
  });

  const listServiceId = watch("listServiceId");
  const imageUrl = watch("imageUrl");
  const dayDoServiceInWeek = watch("dayDoServiceInWeek");

  const [quantityCount, setQuantityCount] = useState(1);

  const listServiceWithQuantity = watch("listServiceWithQuantity");

  // console.log(listServiceId);
  // console.log(dayDoServiceInWeek);

  const setCustomValue = useCallback(
    (id: string, value: any) => {
      // if (id === "listServiceWithQuantity") {
      //   const updateListService = value.map((item: any) => ({
      //     serviceId: listServiceId,
      //     quantity: item.quantity,
      //   }));

      //   setValue(id, updateListService, {
      //     shouldValidate: true,
      //     shouldDirty: true,
      //     shouldTouch: true,
      //   });
      // } else {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
      // }
    },
    [setValue]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  // toggle function is here

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
    setIsLoading(true);
    // console.log(data);

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
    if (step === STEPS.DESCRIPTION) {
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

  const updateGetService = getService.map((item) => {
    return {
      ...item,
      quantity: 1,
    };
  });

  const handleQuantityChange = (serviceId: string, quantityCount: number) => {
    // Find the service in the list and update its quantity
    const updatedServices = getService.map((service) =>
      service.id === serviceId
        ? { ...service, quantity: quantityCount }
        : service
    );

    // Update the state or form value with the updated services
    setCustomValue("listServiceWithQuantity", updatedServices);
  };

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

  if (step === STEPS.QUANTITY) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Set amount, day do for Combo and author"
          subtitle=""
          center
        />

        <Input
          id="quantity"
          label="Quantity"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

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
          id="discountPercent"
          label="Discount Percent"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  // if (step === STEPS.DAYS) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading title="Choose days to work in week" center />
  //       <div
  //         className="
  //              grid
  //              grid-cols-1
  //              md:grid-cols-2
  //              gap-3
  //              max-h-[50vh]
  //              overflow-auto
  //              mt-4

  //       "
  //       >
  //         {options.map((item: OptionsProps) => {
  //           return (
  //             <div key={item.value} className="col-span-1">
  //               <CategoryInput
  //                 onClick={(dayDoServiceInWeekValue) => {
  //                   if (dayDoServiceInWeek.includes(dayDoServiceInWeekValue)) {
  //                     const updatedString = dayDoServiceInWeek.replace(
  //                       dayDoServiceInWeekValue,
  //                       ""
  //                     );
  //                     setCustomValue("dayDoServiceInWeek", updatedString);
  //                   } else {
  //                     setCustomValue(
  //                       "dayDoServiceInWeek",
  //                       // dayDoServiceInWeek + dayDoServiceInWeekValue
  //                       dayDoServiceInWeek.concat(dayDoServiceInWeekValue)
  //                     );
  //                   }
  //                 }}
  //                 id={item.value}
  //                 // selected={listServiceId.includes(item.value)}
  //                 selected={dayDoServiceInWeek.includes(item.value)}
  //                 label={item.label}
  //               />
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //   );
  // }

  // if (step === STEPS.INFO_CREATED) {
  //   bodyContent = (
  //     <div className="flex flex-col gap-8">
  //       <Heading
  //         title="Set amount, day do for Combo and author"
  //         subtitle=""
  //         center
  //       />

  //       <Input
  //         id="quantity"
  //         label="Quantity"
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
