"use client";

import Image from "next/image";
import { memo } from "react";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="cursor-pointer"
      alt="Logo"
      height="100"
      width="100"
      src="/images/logo.svg"
    />
  );
};

export default memo(Logo);
