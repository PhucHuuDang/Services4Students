"use client";

import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({ src }) => {
  return (
    <Image
      alt="Avatar"
      width="30"
      height="30"
      className="rounded-full"
      src={src || "/images/avatarPlaceHolder.jpg"}
    />
  );
};

export default Avatar;
