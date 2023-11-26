"use client";

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
import useReportWorkModal from "@/app/hooks/useReportWorkModal";
import { useSession } from "next-auth/react";

enum STEPS {
  IMAGE = 0,
  DESCRIPTION = 1,
}

interface ReportWorkModalProps {
  // attendReportId?: string;
  setDisabledReportId?: (value: string) => void;
  attendReportId: string;
}

const ReportWorkModal: React.FC<ReportWorkModalProps> = ({
  // feedbackId,
  setDisabledReportId,
  attendReportId,
}) => {
  const [rateValue, setRateValue] = useState(5);
  const [step, setStep] = useState(STEPS.IMAGE);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  // console.log(session);

  const staffId = session ? session.user.userIdInTableDb : "";

  // console.log(staffId);

  const reportWorkModal = useReportWorkModal();
  const router = useRouter();

  // const rateValueConvert = rateValue.toString();

  const currentDate = new Date();

  const formattedDate = currentDate.toISOString();

  //   console.log(session)

  // console.log(attendReportId);

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
      staffId: staffId,
      attendReportId: attendReportId,
      descriptionProcess: "",
      imageURL: "",
      workingDayReport: formattedDate,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  //   useEffect(() => {}, []);

  const imageURL = watch("imageURL");

  // console.log("imageURL: ", imageURL);

  const feedbackID = watch("attendReportId");
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
    // data.attendReportId = attendReportId;
    // data.staffId = staffId;
    setIsLoading(true);
    console.log(data);

    axios
      .put("/api/reportWork", data)
      .then(() => {
        toast.success("Thanks for your feedback, Have a good day!");
        // setDisabledReportId?.(data.attendReportId);
        router.refresh();
        reset();
        setStep(STEPS.IMAGE);
        reportWorkModal.onClose();
      })
      .catch(() => {
        toast.error("Please input all field to send your feedback, thank you!");
      })

      .finally(() => {
        // setattendReportId("");
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setValue("attendReportId", attendReportId);
  }, [attendReportId, setValue]);

  useEffect(() => {
    setValue("staffId", staffId);
  }, [setValue, staffId]);

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
        title="Add a photo you report work to day"
        subtitle="Let send a photo to report work today!"
        center
      />

      <ImageUpload
        value={imageURL}
        onChange={(value) => setCustomValue("imageURL", value)}
      />
    </div>
  );

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-5">
        <Heading
          title="Report work"
          subtitle="Report your work daily to keep attendance work"
          center
        />

        {/* <DaySelect
          onChange={(value) => setCustomValue("feedBackName", value)}
        /> */}

        <Input
          id="descriptionProcess"
          label="Description"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        {/* <Rate
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
        /> */}
      </div>
    );
  }

  return (
    <Modal
      disabled={isLoading}
      isOpen={reportWorkModal.isOpen}
      title="Report work"
      body={bodyContent}
      secondaryAction={step === STEPS.IMAGE ? undefined : onBack}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      onClose={reportWorkModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ReportWorkModal;
