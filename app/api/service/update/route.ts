import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const {
    serviceId,
    serviceName,
    serviceDescription,
    originalPrice,
    unit,
    discountPercent,
    categoryId,
    imageURL,
  } = body;

  console.log(body);

  try {
    const update = await axios.put(
      // "http://13.210.56.232/api/v1/packages/packages",
      "https://housevn.azurewebsites.net/api/v1/services",
      {
        serviceId: serviceId,
        serviceName: serviceName,
        serviceDescription: serviceDescription,
        originalPrice: originalPrice,
        unit: unit,
        discountPercent: discountPercent,
        categoryId: categoryId,
        imageUrl: imageURL,
      }
    );

    // console.log(update);

    if (update.status === 200) {
      const updateSuccess = update.data;

      return NextResponse.json(updateSuccess);
    }
  } catch (error: any) {
    throw new Error("Create package failed!", error);
  }
}
