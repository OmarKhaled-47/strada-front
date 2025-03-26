// "use server";

// import { Resend } from "resend";
// import { MeetingRequestEmail } from "@/app/_components/emails/meeting-request-email";
// import { renderAsync } from "@react-email/components";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export type MeetingRequestData = {
//   name: string;
//   phone: string;
//   preferredDate: Date;
//   meetingType: "in-person" | "virtual";
//   message?: string;
// };

// export async function submitMeetingRequest(formData: MeetingRequestData) {
//   try {
//     // Format the date for display
//     const formattedDate = new Date(formData.preferredDate).toLocaleString(
//       "en-US",
//       {
//         weekday: "long",
//         year: "numeric",
//         month: "long",
//         day: "numeric",
//         hour: "numeric",
//         minute: "numeric",
//       }
//     );

//     // Render the React email template to HTML
//     const html = await renderAsync(
//       MeetingRequestEmail({
//         name: formData.name,
//         phone: formData.phone,
//         preferredDate: formattedDate,
//         meetingType: formData.meetingType,
//         message: formData.message || "",
//       })
//     );

//     // Send the email using Resend
//     const { data, error } = await resend.emails.send({
//       from: "Real Estate Website <onboarding@resend.dev>",
//       to: ["mido94926@gmail.com"], // Replace with your admin email
//       subject: `New Property Visit Request from ${formData.name}`,
//       html,
//       reply_to: formData.phone,
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       return { success: false, error: "Failed to send email" };
//     }

//     return { success: true, data };
//   } catch (error) {
//     console.error("Error in submitMeetingRequest:", error);
//     return { success: false, error: "An unexpected error occurred" };
//   }
// }

"use server";

import { Resend } from "resend";
import { MeetingRequestEmail } from "@/app/_components/emails/meeting-request-email";

const resend = new Resend(process.env.RESEND_API_KEY);

// Update the MeetingRequestData type to remove location
export type MeetingRequestData = {
  name: string;
  phone: string;
  preferredDate: Date;
  meetingType: "in-person" | "virtual";
  message?: string;
};

// Update the submitMeetingRequest function to remove location
export async function submitMeetingRequest(formData: MeetingRequestData) {
  try {
    // Format the date for display
    const formattedDate = new Date(formData.preferredDate).toLocaleString(
      "en-US",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }
    );

    // Generate the HTML email using our template
    const html = MeetingRequestEmail({
      name: formData.name,
      phone: formData.phone,
      preferredDate: formattedDate,
      meetingType: formData.meetingType,
      message: formData.message || "",
    });

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Strada Properties <onboarding@resend.dev>",
      to: ["mido94926@gmail.com"], // Replace with your admin email
      subject: `New Property Visit Request from ${formData.name}`,
      html,
      // replyTo: formData.name,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in submitMeetingRequest:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
