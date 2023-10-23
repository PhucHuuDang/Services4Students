import jwt, { JwtPayload } from "jsonwebtoken";
export function verifyJWT(token: string) {
  try {
    const decoded: any = jwt.decode(token);

    if (!decoded) {
      return "Token invalid or missing";
    }

    // console.log(decoded.role);
    return decoded as JwtPayload;

    // const secretKey = process.env.SECRET_KEY;
    // if (!secretKey) {
    //   console.log("SECRET_KEY is missing in environment variables");
    //   return null;
    // }

    // console.log(token);
    // console.log(secretKey);
    // const decoded: any = jwt.verify(token, secretKey);
  } catch (error) {
    console.log(error);
    return null;
  }
}
