import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables");
}

export const sendMail = async (to: string, subject: string, html: string) => {
  console.log("Sending email to:", to);
  const { data, error } = await resend.emails.send({
    from: `Irina Wambach <${process.env.RESEND_FROM_EMAIL}>`,
    to: [to],
    bcc: [process.env.RESEND_BCC_EMAIL!],
    replyTo: process.env.RESEND_BCC_EMAIL!,
    subject,
    html,
    tags: [
      { name: "customer", value: "Irina-Wambach" },
      { name: "product", value: "Online-Classes" },
      { name: "purpose", value: "Fulfillment-Email" },
    ],
  });
  console.log("Message sent:", data);
  if (error) {
    console.error("Error sending email:", error);
  }
};
