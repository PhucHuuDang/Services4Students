import { NextResponse } from "next/server";
// http://3.27.132.94/api/v1/bookings

import axios from "axios";

export async function POST(request: Request) {
  const body = await request.json();

  //   function isValidISODate(dateString: any) {
  //     const ISODatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
  //     return ISODatePattern.test(dateString);
  //   }

  const {
    startDate,
    apartmentId,
    createBy,
    paymentMethodId,
    //   listPackage: [
    //     {
    //       packageId: "",
    //       quantityOfPackageOrdered: 1,
    //     },
    //   ],
    listPackage,
  } = body;

  //   if (!isValidISODate(startDate)) {
  //     throw new Error("Invalid startDate format. Use ISO 8601 format.");
  //   }

  //   // Ensure that listPackage is an array of objects
  //   if (!Array.isArray(listPackage)) {
  //     throw new Error("listPackage should be an array of objects.");
  //   }

  // Validate the format of startDate (should be ISO 8601)
  //   if (!isValidISODate(startDate)) {
  //     throw new Error("Invalid startDate format. Use ISO 8601 format.");
  //   }

  //   // Ensure that listPackage is an array of objects
  //   if (!Array.isArray(listPackage)) {
  //     throw new Error("listPackage should be an array of objects.");
  //   }

  //   console.log(listPackage.packageId);
  //   listPackage.forEach((item: any) => {
  //     console.log("Package ID:", item.packageId);
  //   });

  const formatListPackage = listPackage.map((item: any) => ({
    packageId: item.packageId,
    quantityOfPackageOrdered: item.quantityOfPackageOrdered,
  }));

  // console.log(formatListPackage);

  // console.log(body);

  try {
    const payment = await axios.post(
      "http://3.27.132.94/api/v1/bookings/bookings",
      {
        startDate: startDate,
        apartmentId: apartmentId,
        createBy: createBy,
        paymentMethodId: paymentMethodId,
        listPackage: formatListPackage,
        // listPackage: [
        //   {
        //     packageId: formatListPackage.packageId,
        //     quantityOfPackageOrdered:
        //       formatListPackage.quantityOfPackageOrdered,
        //   },
        // ],
        //   listPackage: {
        //     packageId: formatListPackage.packageId,
        //     quantityOfPackageOrdered: formatListPackage.quantityOfPackageOrdered,
        //   },
      }
    );

    // const requestData = {
    //   startDate,
    //   apartmentId,
    //   createBy,
    //   paymentMethodId,
    //   listPackage,
    // };

    // const payment = await axios.post(
    //   "http://3.27.132.94/api/v1/bookings",
    //   requestData
    // );

    // console.log("first");

    // console.log(payment);

    if (payment.status === 200) {
      const paymentSuccess = payment.data;

      return NextResponse.json(paymentSuccess);
    }
  } catch (error: any) {
    console.log("failed");
    throw new Error("Payment was failed!", error);
  }
}

// function isValidISODate(dateString: any) {
//   const ISODatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/;
//   return ISODatePattern.test(dateString);
// }
