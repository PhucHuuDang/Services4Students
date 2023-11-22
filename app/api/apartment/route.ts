import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { studentId, regionId, addressOfApartment } = body;

  // console.log(body);
  try {
    const apiResponse = await axios.post(
      "https://housevn.azurewebsites.net/api/v1/apartment/register-apartment",
      // "https://housevn.azurewebsites.net/api/v1/apartment/get-all-apartment",
      {
        studentId: studentId,
        regionId: regionId,
        addressOfApartment: addressOfApartment,
      }
    );

    // console.log(apiResponse);

    if (apiResponse.status === 201) {
      const createApartmentSuccess = apiResponse.data;

      return NextResponse.json(createApartmentSuccess);
    } else {
      throw new Error("Have something wrong to register apartment");
    }
  } catch (error: any) {
    throw new Error("Failed to register apartment", error);
  }
}
