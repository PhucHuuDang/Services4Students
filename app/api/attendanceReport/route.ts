import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const {
    serviceId,
    frequencyDaysPerOccurrence,
    dateDoService,
    workingCycle,
    bookingDetailId,
    bookingDetailType,
    quantityDoService,
    note,
  } = body;

  // console.log(body);

  try {
    const pushData = await axios.post(
      // "http://13.210.56.232/api/v1/bookingdetailstaff",
      "https://housevn.azurewebsites.net/api/v1/attendreport",
      {
        serviceId: serviceId,
        frequencyDaysPerOccurrence: frequencyDaysPerOccurrence,
        dateDoService: dateDoService,
        workingCycle: workingCycle,
        bookingDetailId: bookingDetailId,
        bookingDetailType: bookingDetailType,
        quantityDoService: quantityDoService,
        note: note,
      }
    );

    // console.log(pushData);

    if (pushData.status === 200) {
      const assignSuccess = pushData.data;

      // console.log(assignSuccess);

      return NextResponse.json(assignSuccess);
    }
  } catch (error: any) {
    throw new Error("Create service failed!", error);
  }
}
