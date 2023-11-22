import axios from "axios";
import { NextResponse } from "next/server";

export async function PUT(request: Request) {
  const body = await request.json();

  const {
    feedBackId,
    feedBackName,
    feedBackDescription,
    feedBackImageUrl,
    feedBackRating,
  } = body;

  // console.log(body);

  try {
    const feedbackApi = await axios.put(
      // "http://13.210.56.232/api/v1/feedbacks",
      "https://housevn.azurewebsites.net/api/v1/feedbacks",
      {
        feedBackId: feedBackId,
        feedBackName: feedBackName,
        feedBackDescription: feedBackDescription,
        feedBackImageUrl: feedBackImageUrl,
        feedBackRating: feedBackRating,
      }
    );

    // console.log(feedbackApi);

    if (feedbackApi.status === 200) {
      const feedbackSuccess = feedbackApi.data;

      return NextResponse.json(feedbackSuccess);
    } else {
      throw new Error("Error when send data Feedback");
    }
  } catch (error) {
    console.log("Failed to send data feedback: ", error);
  }
}
