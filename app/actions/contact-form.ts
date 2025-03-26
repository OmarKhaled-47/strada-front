// "use server";

// import { Resend } from "resend";
// import { ContactFormEmail } from "@/app/_components/emails/contact-form-email";
// import { renderAsync } from "@react-email/components";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export type ContactFormData = {
//   name: string;
//   phone: string;
//   message: string;
// };

// export async function submitContactForm(formData: ContactFormData) {
//   try {
//     // Render the React email template to HTML
//     const html = await renderAsync(
//       ContactFormEmail({
//         name: formData.name,
//         phone: formData.phone,
//         message: formData.message,
//       })
//     );

//     // Send the email using Resend
//     const { data, error } = await resend.emails.send({
//       from: "Real Estate Website <onboarding@resend.dev>",
//       to: ["mido94926@gmail.com"], // Replace with your admin email
//       subject: `New Contact Form Submission from ${formData.name}`,
//       html,
//       reply_to: formData.phone,
//     });

//     if (error) {
//       console.error("Error sending email:", error);
//       return { success: false, error: "Failed to send email" };
//     }

//     return { success: true, data };
//   } catch (error) {
//     console.error("Error in submitContactForm:", error);
//     return { success: false, error: "An unexpected error occurred" };
//   }
// }

"use server";

import { Resend } from "resend";
import { ContactFormEmail } from "@/app/_components/emails/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormData = {
  name: string;
  phone: string;
  location: string;
  message: string;
};

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Generate the HTML email using our template
    const html = ContactFormEmail({
      name: formData.name,
      phone: formData.phone,
      location: formData.location,
      message: formData.message,
    });

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Strada Properties <onboarding@resend.dev>",
      to: ["mido94926@gmail.com"], // Replace with your admin email
      subject: `New Contact Form Submission from ${formData.name}`,
      html,
      // reply_to: formData.phone,
    });

    if (error) {
      console.error("Error sending email:", error);
      return { success: false, error: "Failed to send email" };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in submitContactForm:", error);
    return { success: false, error: "An unexpected error occurred" };
  }
}
