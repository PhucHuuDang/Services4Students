"use client";

import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { KeyboardEvent, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

import Modal from "./Modal";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Heading from "../Heading";
import { toast } from "react-hot-toast";

const LoginModal = () => {
  const router = useRouter();

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const toggle = useCallback(() => {
    loginModal.onClose();
    registerModal.onOpen();
  }, [loginModal, registerModal]);

  // the input body of form register

  const onSubmit: SubmitHandler<FieldValues> = (data: any) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        setIsLoading(true);

        // console.log(callback);

        if (callback?.ok) {
          // console.log(callback.status);
          // console.log(callback.url);
          toast.success("Log in successfully!");
          router.refresh();
          // router.push("/authorize");
          loginModal.onClose();
        }

        if (callback?.error) {
          console.log(callback.error);
          toast.error("Please double check user name or password again");
        }
      })
      // .catch(() => {
      //   toast.error("Please double check user name or password again");
      // })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" center />

      <Input
        id="email"
        label="Email"
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
  // the footer body of form register
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
      <div
        className="
        text-neutral-500
        text-center
        mt-4
        font-light
      "
      >
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Are you have account?</div>
          <div
            onClick={toggle}
            className="text-neutral-500 cursor-pointer hover:underline"
          >
            Create an account
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      // get open = true when onClick in the UserMenu file
      isOpen={loginModal.isOpen}
      title="Login"
      actionLabel="Continue"
      body={bodyContent}
      footer={footerContent}
      onClose={loginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
    />
  );
};

export default LoginModal;
