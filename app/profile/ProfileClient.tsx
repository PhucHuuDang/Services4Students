"use client";

import { useSession } from "next-auth/react";

interface ProfileClientProps {
  getInfo: any | null;
}

const ProfileClient: React.FC<ProfileClientProps> = ({ getInfo }) => {
  const { data: session } = useSession();

  //   console.log(session);
  console.log(getInfo);

  return <div>Profile Page</div>;
};

export default ProfileClient;
