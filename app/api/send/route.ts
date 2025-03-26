// import { type NextRequest, NextResponse } from "next/server";
// import { submitContactForm } from "@/app/actions/contact-form";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const result = await submitContactForm(body);

//     if (!result.success) {
//       return NextResponse.json(
//         { error: result.error || "Failed to send email" },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ success: true });
//   } catch (error) {
//     console.error("Error in /api/send:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

import { type NextRequest, NextResponse } from "next/server";
import { submitContactForm } from "@/app/actions/contact-form";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await submitContactForm(body);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "Failed to send email" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in /api/send:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
