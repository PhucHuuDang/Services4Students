import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

import axios from "axios";
import { verifyJWT } from "@/app/lib/jwt";

export async function getSession() {
  return await getServerSession(authOptions);
}

export default async function getRoleUser() {
  try {
    const session = await getSession();

    if (!session?.user?.email) {
      return null;
    }

    if (!session || !session.user || !session.user.token) {
      // console.log("Session or token is missing:", session);
      return null;
    }
    const token = session.user.token as string;
    // console.log(token);

    const decodedToken = verifyJWT(token);

    if (!decodedToken) {
      return null;
    }

    // console.log(decodedToken);

    return decodedToken;
  } catch (error: any) {
    console.log("Error: ", error);
    return null;
  }
}
