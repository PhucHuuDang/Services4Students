"use client";

import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";

import { useCallback, useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";

import Modal from "./Modal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const router = useRouter();
  const loginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      fullName: "",
      email: "",
      userName: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [registerModal, loginModal]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    // console.log(data);
    // const test = JSON.stringify(data)
    // console.log(test);
    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Register Successfully!");
        registerModal.onClose();
        router.refresh();
        loginModal.onOpen();
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

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to SpaceT" subtitle="Create an account!" center />
      {/* <Input
        id="firstName"
        label="First Name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      /> */}

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

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />

      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />

      <Button
        outline
        label="Continue with GitHub"
        icon={AiFillGithub}
        onClick={() => signIn("github")}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have accounts</div>
          <div
            onClick={toggle}
            className="text-neutral-500 cursor-pointer hover:underline"
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      title="Register"
      body={bodyContent}
      footer={footerContent}
      actionLabel="Continue"
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default RegisterModal;
