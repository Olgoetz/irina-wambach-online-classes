import nodemailer from "nodemailer";
import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const sesClient = new SESv2Client({ region: "eu-central-1" });
const transporter = nodemailer.createTransport({
  SES: { sesClient, SendEmailCommand },
});

export const sendMail = async (to: string, subject: string, html: string) => {
  try {
    console.log("Sending email to:", to);
    const info = await transporter.sendMail({
      from: "Irina Wambach <noreply@mail.goetzhq.com>",
      to,
      cc: process.env.SES_BCC_EMAIL,
      subject,
      html,

      ses: {
        EmailTags: [
          { Name: "customer", Value: "Irina-Wambach" },
          { Name: "product", Value: "Online-Classes" },
          { Name: "purpose", Value: "Fulfillment-Email" },
        ],
      },
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Envelope: %s", info.envelope);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
