import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  const { email, name, password } = body;

  //   const hashedPassword = await bcrypt.hash(password, 12)

  console.log(body);

  try {
    console.log("Route register");
    const apiResponse = await axios.post(
      "http://3.27.132.94/api/v1/students/getStudentByEmailPassword?Email=Staff%40gmail.com&Password=MANAGER",
      {
        email,
        name,
        password,
        // pass: hashedPassword
      }
    );

    console.log("Route register 2");

    console.log(apiResponse);
    if (apiResponse.status === 200) {
      const user = apiResponse.data;

      return NextResponse.json(user);
    } else {
      throw new Error("Have something went wrong");
    }
  } catch (error: any) {
    throw new Error("Have something went wrong", error);
  }
}
