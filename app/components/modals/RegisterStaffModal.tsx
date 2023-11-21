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
import { GetCategory } from "@/app/types";
import CategoryInput from "../inputs/CategoryInput";

enum STEPS {
  CATEGORY = 0,
  REGISTER = 1,
}

interface RegisterStaffModalProps {
  getCatagories: GetCategory[];
}

const RegisterStaffModal: React.FC<RegisterStaffModalProps> = ({
  getCatagories,
}) => {
  const registerStaffModal = useRegisterStaffModal();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [step, setStep] = useState(STEPS.CATEGORY);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      listCategoryId: [],
      fullName: "",
      email: "",
      userName: "",
      password: "",
    },
  });

  const listCategoryId = watch("listCategoryId");

  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);

  // useEffect(() => {
  //   setId((value: any) => [...value, id]);
  // }, []);

  // console.log(listCategoryId);

  const setCustomValue = (id: string, value: any) => {
    // const setCustomValue = (id: string) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    // setValue("listCategoryId", (prevList: any) => {
    //   if (prevList.includes(value)) {
    //     return prevList.filter((categoryId: any) => categoryId !== value);
    //   } else {
    //     return [...prevList, value];
    //   }
    // });
  };

  const toggle = useCallback(() => {
    registerStaffModal.onClose();
    router.refresh();
  }, [registerStaffModal, router]);

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    if (step !== STEPS.REGISTER) {
      return onNext();
    }
    setIsLoading(true);
    // console.log(data);
    // const test = JSON.stringify(data)
    // console.log(test);
    axios
      .post("/api/registerStaff", data)
      .then(() => {
        toast.success("Register Successfully!");
        router.refresh();
        reset();
        setStep(STEPS.CATEGORY);
        registerStaffModal.onClose();
      })
      .catch(() => {
        toast.error("Please check username or password again!");
        // toast.error("Register failed, please check it again");
      })
      .finally(() => {
        setIsLoading(false);
      });

    // console.log(JSON.stringify(data));
    // const { name, email, password } = data;
    // console.log(name, email, password);
    // console.log(data);
  };

  const actionLabel = useMemo(() => {
    if (step === STEPS.REGISTER) {
      return "Continue";
    }

    return "Next";
  }, [step]);

  // const secondaryActionLabel = useMemo(() => {
  //   if (step === STEPS.CATEGORY) {
  //     return undefined;
  //   }

  //   return "Back";
  // }, [step]);

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
      {getCatagories.map((item) => {
        return (
          !item.isDelete && (
            <div key={item.id} className="col-span-1">
              <CategoryInput
                onClick={(listCategoryIdValue) => {
                  if (listCategoryId.includes(listCategoryIdValue)) {
                    const removeId = listCategoryId.filter(
                      (id: string) => listCategoryIdValue !== id
                    );

                    setCustomValue("listCategoryId", [...removeId]);
                  } else {
                    setCustomValue("listCategoryId", [
                      listCategoryIdValue,
                      ...listCategoryId,
                    ]);
                  }
                }}
                // onClick={() => setCustomValue(item.id)}
                icon={GiWashingMachine || item.image}
                id={item.id}
                // selected={listCategoryId}
                selected={listCategoryId.includes(item.id)}
                label={item.categoryName}
              />
            </div>
          )
        );
      })}
    </div>
  );

  if (step === STEPS.REGISTER) {
    bodyContent = (
      <div className="flex flex-col gap-4">
        <Heading
          title="Welcome to SpaceT"
          subtitle="Create an account!"
          center
        />
        {/* <Input
        id="firstName"
        label="First Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}
        <div
          className="
                text-center 
                flex 
                flex-row 
                items-center 
                justify-center 
                mb-4
              "
        >
          <div
            onClick={onBack}
            className="
            flex 
            flex-row 
            justify-center 
            items-center 
            gap-1
            shadow-sm
            bg-neutral-50
            w-[250px]
            
            cursor-pointer
            hover:bg-neutral-200
            hover:shadow-lg
            hover:scale-105
            py-2
            rounded-lg
            transition
            duration-200
            
            "
          >
            <IoReturnDownBack size={24} />

            <div className="text-md">Back to choose categories</div>
          </div>
        </div>

        <Input
          id="fullName"
          label="Full Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="email"
          label="Email"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="userName"
          label="Name"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <Input
          id="password"
          label="Password"
          type="password"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>
    );
  }

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />

      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      {/* <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have accounts</div>
          <div
            onClick={toggle}
            className="text-neutral-500 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div> */}
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerStaffModal.isOpen}
      title="Register"
      body={bodyContent}
      footer={step === STEPS.REGISTER ? footerContent : ""}
      actionLabel={actionLabel}
      onClose={registerStaffModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default memo(RegisterStaffModal);
