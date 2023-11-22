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
    // const useAuth = GetCurrentPass()
    let password: string | undefined = "";

    // console.log(session);

    if (!session?.user?.email) {
      return null;
    }

    // const currentUser = await getEmailUser(session.user.email as string);
    const email = session.user.email as string;

    // console.log(email);

    // if (email === "vi@gmail.com") {
    //   password = process.env.PASSWORD_ADMIN;
    // }

    if (email) {
      password = process.env.PASSWORD_ADMIN;
    }

    const currentUser = await axios.post(
      // `http://13.210.56.232/api/Auth/login`,
      `https://housevn.azurewebsites.net/api/Auth/login`,
      {
        email: session.user.email as string,
        password: password,
      }
    );

    // console.log(currentUser);

    if (currentUser.status === 200) {
      const getUser = currentUser.data;
      // console.log(getUser);

      return {
        ...getUser,
      };
    } else {
      console.log("Error status:", currentUser.status);
      console.log("Error data:", currentUser.data);
      return null;
    }
  } catch (error: any) {
    console.log("Error: ", error);
    return null;
  }
}
