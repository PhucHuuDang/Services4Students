import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { listCategoryId, fullName, email, userName, password } = body;

  const phone = "";
  const address = "";
  const birthday = null;

  // console.log(body);

  try {
    const apiResponse = await axios.post(
      // "http://13.210.56.232/api/v1/staffs/staffs",
      "https://housevn.azurewebsites.net/api/v1/staffs/staffs",
      {
        listCategoryId: listCategoryId,
        userName: userName,
        fullName: fullName,
        password: password,
        email: email,
        phone: phone,
        address: address,
        birthday: birthday,
      }
    );

    // console.log("Route register staff");

    // console.log(apiResponse);

    if (apiResponse.status === 200) {
      const user = apiResponse.data;

      // console.log(user);

      return NextResponse.json(user);
    } else {
      throw new Error("Have some thing went wrong");
    }
  } catch (error: any) {
    throw new Error("Failed to register staff", error);
  }
}
