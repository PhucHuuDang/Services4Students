import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  const { fullName, email, userName, password } = body;
  const phone = "";
  const address = "";

  //   const hashedPassword = await bcrypt.hash(password, 12)

  // console.log(body);

  try {
    console.log("Route register");
    const apiResponse = await axios.post(
      // "http://13.210.56.232/api/v1/students/register-student",
      "https://housevn.azurewebsites.net/api/v1/students/register-student",
      {
        userName: userName,
        fullName: fullName,
        password: password,
        email: email,
        phone: phone,
        address: address,
      }
    );

    console.log("Route register 2");

    // console.log(apiResponse);
    if (apiResponse.status === 201) {
      const user = apiResponse.data;
      console.log(user);
      return NextResponse.json(user);
    } else {
      throw new Error("Have something went wrong");
    }
  } catch (error: any) {
    throw new Error("Have something went wrong", error);
  }
}
