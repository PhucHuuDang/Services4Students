import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const {
    staffId,
    attendReportId,
    descriptionProcess,
    imageURL,
    workingDayReport,
  } = body;

  console.log(body);

  try {
    const reportApi = await axios.put(
      // "http://13.210.56.232/api/v1/reportworks",
      "https://housevn.azurewebsites.net/api/v1/reportworks",
      {
        staffId: staffId,
        attendReportId: attendReportId,
        descriptionProcess: descriptionProcess,
        imageURL: imageURL,
        workingDayReport: workingDayReport,
      }
    );

    // console.log(reportApi);

    if (reportApi.status === 200) {
      const reportSuccess = reportApi.data;

      return NextResponse.json(reportSuccess);
    } else {
      throw new Error("Error when send data Feedback");
    }
  } catch (error) {
    console.log("Failed to send data feedback: ", error);
  }
}
