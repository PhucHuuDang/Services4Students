import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { bookingDetailId, staffId, assignBy } = body;

  // console.log(body);

  try {
    const assignTaskForStaff = await axios.post(
      "http://3.27.132.94/api/v1/bookingdetailstaff",
      {
        bookingDetailId: bookingDetailId,
        staffId: staffId,
        assignBy: assignBy,
      }
    );

    // console.log(assignTaskForStaff);

    if (assignTaskForStaff.status === 200) {
      const assignSuccess = assignTaskForStaff.data;

      // console.log(assignSuccess);

      return NextResponse.json(assignSuccess);
    }
  } catch (error: any) {
    throw new Error("Create service failed!", error);
  }
}
