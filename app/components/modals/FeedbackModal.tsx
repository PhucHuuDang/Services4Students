"use client";

import useFeedbackModal from "@/app/hooks/useFeedbackModal";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import DaySelect from "../inputs/DaySelect";
import Input from "../inputs/Input";
import { Rate } from "antd";
import { useEffect, useMemo, useState } from "react";
import Modal from "./Modal";
import ImageUpload from "../inputs/ImageUpload";
import axios from "axios";
import { toast } from "react-hot-toast";

enum STEPS {
  IMAGE = 0,
  DESCRIPTION = 1,
}

interface FeedbackModalProps {
  feedbackId: string;
  setFeedbackID: (value: string) => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  feedbackId,
  setFeedbackID,
}) => {
  const [rateValue, setRateValue] = useState(5);
  const [step, setStep] = useState(STEPS.IMAGE);
  const [isLoading, setIsLoading] = useState(false);

  const feedbackModal = useFeedbackModal();
  const router = useRouter();

  let rateValueConvert = rateValue.toString();

  //   console.log(rateValue);
  //   console.log("rateValueConvert: ", rateValueConvert);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      feedBackId: "",
      feedBackName: "",
      feedBackDescription: "",
      feedBackImageUrl: "",
      feedBackRating: rateValueConvert,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    setValue("feedBackRating", rateValueConvert);
  }, [rateValueConvert, setValue]);

  //   useEffect(() => {}, []);

  const feedBackImageUrl = watch("feedBackImageUrl");

  //   console.log("feedBackImageUrl: ", feedBackImageUrl);
  //   console.log()

  const feedbackID = watch("feedBackId");
  //   console.log(feedbackID);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.DESCRIPTION) {
      return onNext();
    }
    data.feedBackId = feedbackId;
    setIsLoading(true);
    // console.log(data);

    axios
      .put("/api/feedback", data)
      .then(() => {
        toast.success("Thanks for your feedback, Have a good day!");
        router.refresh();
        reset();
        setStep(STEPS.IMAGE);
        feedbackModal.onClose();
      })
      .catch(() => {
        toast.error("Please input all field to send your feedback, thank you!");
      })

      .finally(() => {
        // setFeedbackID("");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setValue("feedBackId", feedbackId);
  }, [feedbackId, setValue]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.DESCRIPTION) {
      return "Send";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.IMAGE) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo for your feedback"
        subtitle="You can response for us about the quantity of serve"
        center
      />

      <ImageUpload
        value={feedBackImageUrl}
        onChange={(value) => setCustomValue("feedBackImageUrl", value)}
      />
    </div>
  );

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-5">
        <Heading
          title="Feedback"
          subtitle="Let us know your feedback, from that we can improve the quality of serve for you"
          center
        />

        <DaySelect
          onChange={(value) => setCustomValue("feedBackName", value)}
        />

        <Input
          id="feedBackDescription"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Rate
          allowHalf
          value={rateValue}
          onChange={(value) => setRateValue(value)}
          defaultValue={rateValue}
          className="
                border-2
                border-neutral-300
                text-center
                p-4
                text-2xl
                rounded-md
                cursor-pointer
                hover:border-black
                duration-200
                "
        />
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={feedbackModal.isOpen}
      title="Feedback"
      body={bodyContent}
      secondaryAction={step === STEPS.IMAGE ? undefined : onBack}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      onClose={feedbackModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default FeedbackModal;
