import jwt, { JsonWebTokenError } from "jsonwebtoken";
import useTokenStore from "./useTokenStore";
import { useCallback, useMemo } from "react";

interface useVerifyTokenProps {
  token: string | null | undefined;
}

const useVerifyToken = () => {
  const useToken = useTokenStore();
  const token = useToken.token;

  const setToken = useMemo(() => {
    if (!token) {
      // console.log("Token is missing or invalid.");
      return null;
    }
    try {
      // console.log("Verifying token...");
      const decodedToken = jwt.decode(token);
      console.log("tinh toan lai lan 2");

      // console.log("Token verified:", decodedToken);

      return decodedToken;
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        console.error("Invalid token:", error.message);
      } else {
        console.error("Token verification failed:", error);
      }
      return null;
    }
  }, [token]);

  return setToken;

  // if (!token) {
  //   console.log("Token is missing or invalid.");
  //   return null;
  // }

  // //   let deCodeToken = {};

  // console.log(token);

  // console.log('tinh toan lai')

  // //   const testToken = jwt.sign(token, secret);
  // //   console.log(testToken);
  // try {
  //   // console.log("Verifying token...");

  //   const decodedToken = jwt.decode(token);
  //   console.log('tinh toan lai lan 2')

  //   console.log("Token verified:", decodedToken);

  //   return decodedToken;
  // } catch (error) {
  //   if (error instanceof JsonWebTokenError) {
  //     console.error("Invalid token:", error.message);
  //   } else {
  //     console.error("Token verification failed:", error);
  //   }
  //   return null;
  // }
};

export default useVerifyToken;
