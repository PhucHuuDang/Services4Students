"use client";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Heading from "../Heading";
import Input from "../inputs/Input";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Modal from "./Modal";
import useApartmentModal from "@/app/hooks/useApartmentModal";
import { RegionsProps } from "@/app/types";
import ApartmentSelect from "../inputs/ApartmentSelect";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface ApartmentProps {
  regions: RegionsProps[];
  getStudentId: any;
}

const ApartmentModal: React.FC<ApartmentProps> = ({
  regions,
  getStudentId,
}) => {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const useApartment = useApartmentModal();

  // if session is null loginModal will be turn on => set it later
  // const studentId = session ? session.user.userIdInTableDb : "";

  // console.log("studentId: ", studentId);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      studentId: getStudentId ? getStudentId.userIdInTableDb : "",
      regionId: "",
      addressOfApartment: "",
    },
  });

  // const regionId = watch("regionId");

  // console.log("studentId: ", studentId);

  // console.log("regionId: ", regionId);

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    // console.log(data);

    axios
      .post("/api/apartment", data)

      .then(() => {
        toast.success("Register Apartment Successfully");
        useApartment.onClose();
        router.refresh();
      })

      .catch(() => {
        toast.error("Please check all field your inputted");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        title="Register Apartment"
        subtitle="Let us know your housing, our will make your're housing happy"
        center
      />

      <Input
        id="addressOfApartment"
        label="Apartment address"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <ApartmentSelect
        regions={regions}
        onChange={(value) => setCustomValue("regionId", value)}
      />

      {/* <Input /> */}
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={useApartment.isOpen}
      title="Register Apartment"
      body={bodyContent}
      onClose={useApartment.onClose}
      actionLabel="Continue"
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default ApartmentModal;
