import { NextResponse } from "next/server";
// http://3.27.132.94/api/v1/bookings

import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    startDate,
    apartmentId,
    createBy,
    paymentMethodId,

    listPackage,
  } = body;

  const formatListPackage = listPackage.map((item: any) => ({
    packageId: item.packageId,
    quantityOfPackageOrdered: item.quantityOfPackageOrdered,
  }));

  // console.log(formatListPackage);

  // console.log(body);

  try {
    const payment = await axios.post(
      "http://13.210.56.232/api/v1/bookings/bookings",
      {
        startDate: startDate,
        apartmentId: apartmentId,
        createBy: createBy,
        paymentMethodId: paymentMethodId,
        listPackage: formatListPackage,
      }
    );

    if (payment.status === 200) {
      const paymentSuccess = payment.data;

      return NextResponse.json(paymentSuccess);
    }
  } catch (error: any) {
    console.log("failed");
    throw new Error("Payment was failed!", error);
  }
}
