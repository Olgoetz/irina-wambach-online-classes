import sgMail from "@sendgrid/mail";
import { USER } from "./config";

const initSendGrid = process.env.SENDGRID_API_KEY as string;
sgMail.setApiKey(initSendGrid);

export async function sendEmail(
  htmlString: string,
  customer_email: string,
  subject: string
) {
  if (!initSendGrid) {
    console.log("[SENDEMAIL_ERROR]", "Sendgrid API Key not set");
    throw new Error("Sendgrid API Key not set");
  }

  //console.log("[FULFILLMENT] Invoice Lines:", invoice.lines.data);

  // const response = await axios.get(invoice.invoice_pdf!, {
  //   responseType: "arraybuffer",
  // });
  // if (response.status !== 200) {
  //   throw new NextResponse(
  //     `Failed to fetch PDF: ${response.status} - ${response.statusText}`
  //   );
  // }
  // const pdfBuffer = Buffer.from(response.data, "binary");

  const msg = {
    to: customer_email!,
    from: {
      email: process.env.SENDGRID_FROM_EMAIL!,
      name: USER,
    },
    bcc: process.env.SENDGRID_BCC_EMAIL!,

    subject: subject,
    html: htmlString,
    // attachments: [
    //   {
    //     content: pdfBuffer.toString("base64"),
    //     filename: `Rechnung_${invoice.number}.pdf`,
    //     type: "application/pdf",
    //     disposition: "attachment",
    //     content_id: "invoice",
    //   },
    // ],
  };
  try {
    console.log(
      "Sending email to " +
        customer_email +
        "and bcc " +
        process.env.SENDGRID_BCC_EMAIL!
    );
    console.log(msg);
    await sgMail.send(msg);
    console.log(
      "[SENDEMAIL_SUCCESS]",
      `Email sent to ${customer_email} and bcc ${process.env.SENDGRID_BCC_EMAIL}`
    );
    return true;
  } catch (err: any) {
    console.log("[SENDEMAIL_ERROR]");
    console.log(err.response.body.errors);
    return false;
  }
}
