import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    serviceName,
    serviceDescription,
    originalPrice,
    unit,
    discountPercent,
    imageURL,
    categoryId,
  } = body;

  // console.log(body);

  try {
    const createService = await axios.post(
      // "http://13.210.56.232/api/v1/services/services",
      "https://housevn.azurewebsites.net/api/v1/services",
      {
        serviceName: serviceName,
        serviceDescription: serviceDescription,
        originalPrice: originalPrice,
        unit: unit,
        discountPercent: discountPercent,
        imageURL: imageURL,
        categoryId: categoryId,
      }
    );

    // console.log(createService);

    if (createService.status === 200) {
      const newService = createService.data;

      console.log(newService);

      return NextResponse.json(newService);
    }
  } catch (error: any) {
    throw new Error("Create service failed!", error);
  }
}
