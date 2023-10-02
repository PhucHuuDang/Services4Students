import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getEmailUser } from "./getEmailUser";
import axios from "axios";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
  try {
    const session = await getSession();

    console.log(session);

    if (!session?.user?.email) {
      return null;
    }

    // const currentUser = await getEmailUser(session.user.email as string);
    const email = session.user.email;

    console.log(email);

    const convertEmailJson = JSON.stringify(email);

    console.log(convertEmailJson);

    const currentUser = await axios.post(`http://3.27.132.94/api/Auth/login`, {
      email: email,
    });

    console.log(currentUser);

    if (currentUser.status === 200) {
      const getUser = currentUser.data;
      console.log(getUser);
      // return {
      //   ...getUser,
      // };
      return getUser;
    } else {
      console.log("Error status:", currentUser.status);
      console.log("Error data:", currentUser.data);
      return null;
    }

    // if (!currentUser) {
    //   return null;
    // }

    // console.log(currentUser);

    // return {
    //   ...currentUser,
    // };
  } catch (error: any) {
    console.log("Error: ", error);
    return null;
  }
}
