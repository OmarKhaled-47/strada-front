// import { type NextRequest, NextResponse } from "next/server";
// import { submitMeetingRequest } from "@/app/actions/meeting-request";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();

//     // Convert the string date to a Date object
//     if (typeof body.preferredDate === "string") {
//       body.preferredDate = new Date(body.preferredDate);
//     }

//     const result = await submitMeetingRequest(body);

//     if (!result.success) {
//       return NextResponse.json(
//         { error: result.error || "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error in /api/meeting-request:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { submitMeetingRequest } from "@/app/actions/meeting-request";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Convert the string date to a Date object
    if (typeof body.preferredDate === "string") {
      body.preferredDate = new Date(body.preferredDate);
    }

    const result = await submitMeetingRequest(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/meeting-request:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
