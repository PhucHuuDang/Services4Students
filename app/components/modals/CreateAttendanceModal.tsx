"use client";

import { toast } from "react-hot-toast";
import { GiWashingMachine } from "react-icons/gi";
import { IoReturnDownBack } from "react-icons/io5";

import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

import { memo, useCallback, useEffect, useMemo, useState } from "react";
import useRegisterStaffModal from "@/app/hooks/useRegisterStaffModal";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { useRouter } from "next/navigation";
import { GetCategory, ServiceOfBookingDetails } from "@/app/types";
import CategoryInput from "../inputs/CategoryInput";
import useCreateAttendanceModal from "@/app/hooks/useCreateAttendanceModal";
import FormAttendance from "./FormAttendance";
import useFormAttendance from "@/app/hooks/useFormAttendance";

enum STEPS {
  CATEGORY = 0,
  REGISTER = 1,
}

interface RegisterStaffModalProps {
  servicesOfBookingDetails: ServiceOfBookingDetails[];
}

const RegisterStaffModal: React.FC<RegisterStaffModalProps> = ({
  servicesOfBookingDetails,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const createAttendance = useCreateAttendanceModal();
  const formAttendance = useFormAttendance();

  const [selectedId, setSelectedId] = useState("");

  const toggle = useCallback(() => {
    createAttendance.onClose();
    router.refresh();
  }, [createAttendance, router]);

  const onSubmit = () => {
    createAttendance.onClose();
  };

  // const secondaryActionLabel = useMemo(() => {
  //   if (step === STEPS.CATEGORY) {
  //     return undefined;
  //   }

  //   return "Back";
  // }, [step]);

  const handleClick = (id: string) => {
    // console.log("click");
    setSelectedId(id);
    formAttendance.onOpen();
  };

  let bodyContent = (
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
      {servicesOfBookingDetails.map((item) => {
        // console.log(item);
        return (
          //   !item.isDelete && (
          <div key={item.serviceId} className="col-span-1">
            <CategoryInput
              onClick={(item) => handleClick(item)}
              // onClick={(listCategoryIdValue) => {
              //   if (listCategoryId.includes(listCategoryIdValue)) {
              //     const removeId = listCategoryId.filter(
              //       (id: string) => listCategoryIdValue !== id
              //     );

              //     setCustomValue("listCategoryId", [...removeId]);
              //   } else {
              //     setCustomValue("listCategoryId", [
              //       listCategoryIdValue,
              //       ...listCategoryId,
              //     ]);
              //   }
              // }}
              // onClick={() => setCustomValue(item.id)}
              id={item.serviceId}
              selected={item.serviceId === selectedId}
              // selected={listCategoryId.includes(item.id)}
              label={item.serviceName}
            />
          </div>
          //   )
        );
      })}
    </div>
  );

  return (
    <>
      <Modal
        disabled={isLoading}
        isOpen={createAttendance.isOpen}
        title="Create Attendance"
        body={bodyContent}
        actionLabel="Done"
        onClose={createAttendance.onClose}
        //   onSubmit={handleSubmit(onSubmit)}
        onSubmit={onSubmit}
      />
      <FormAttendance
        servicesOfBookingDetails={servicesOfBookingDetails}
        serviceId={selectedId}
        isOpen={formAttendance.isOpen}
        onClose={formAttendance.onClose}
      />
    </>
  );
};

export default memo(RegisterStaffModal);
