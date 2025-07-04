import { USER } from "./config";
import stripe from "./get-stripe";
import { sendEmail } from "./sendEmail";
import {
  containsSubstringCaseInsensitive,
  findKeyInMetaData,
  validateObjectKeysContainSubstring,
} from "./utils";
export async function updateCustomer(customer_id: string) {
  console.log("[UPDATECUSTOMER] Customer ID:", customer_id);
  try {
    const customer = await stripe.customers.update(customer_id, {
      preferred_locales: ["de"],
    });
    return customer;
  } catch (err) {
    console.log("[UPDATECUSTOMER_ERROR]", err);

    return false;
  }
}

export async function fulFillOrder(invoice_id: string) {
  console.log("[FULFILLORDER] Invoice ID:", invoice_id);
  try {
    // Create invoice

    const invoice = await stripe.invoices.retrieve(invoice_id);
    console.log("[FULFILLORDER] Invoice:", invoice);
    // Check if invoice was successfully paid
    const isPaid: boolean = invoice.paid;
    console.log("[FULFILLORDER] isPaid:", isPaid);
    if (!isPaid) {
      throw new Error("Payment failed");
    }

    // Get product information
    const productId = invoice.lines.data[0].price?.product as string;
    const product = await stripe.products.retrieve(productId);

    const name = product.name;
    const date = product.metadata.Datum;
    const time = product.metadata.Uhrzeit;
    const zoom = product.metadata.Zoom;

    // Check if product is a recording
    const isRecording = containsSubstringCaseInsensitive(name, "Aufzeichnung");

    let result;
    let subject;
    let htmlString;

    if (isRecording) {
      const key_kenncode = validateObjectKeysContainSubstring(
        product.metadata,
        "kenncode"
      );

      const kenncode = key_kenncode
        ? product.metadata[key_kenncode]
        : "Kein Kenncode";
      console.log(
        "[FULFILLORDER] Product is a recording",
        name,
        date,
        time,
        kenncode
      );

      htmlString = `
      <h1 style="font-size:16px">Liebe(r) ${invoice.customer_name!},</h1>
  
      <br>
      <p>Vielen Dank für deine Buchung von <strong>${name} vom ${date} um ${time}.</strong></p>
  
  
      <p>Hier ist der Link zur Aufzeichnung:</p>
  
      <a href="${zoom}">${zoom}</a>

      <p>Kenncode: ${kenncode}</p>
  
      <br>
      <p>Deine Rechnung und deinen Zahlungsnachweis kannst Du hier herunterladen: <br>
      <a href="${invoice.hosted_invoice_url}">Rechnung</a>
      </p>
  
      <br>
      <p>Ich freue mich auf Dich!</p>
  
      <br>
      <p>Ganz liebe Grüße,</p>
      <p>${USER.split(" ")[0]}</p>
      `;

      subject = `Aufzeichnung: Online-Fitness-Kurs mit ${
        USER.split(" ")[0]
      } - Rechnung und Zugangsdaten`;
      result = await sendEmail(htmlString, invoice.customer_email!, subject);

      return result;
    } else {
      const key_password = validateObjectKeysContainSubstring(
        product.metadata,
        "kennwort"
      );

      const password = key_password
        ? product.metadata[key_password]
        : "Kein Kennwort";
      const key_meetingId = validateObjectKeysContainSubstring(
        product.metadata,
        "meeting"
      );
      const meetingId = key_meetingId
        ? product.metadata[key_meetingId]
        : "Keine Meeting ID";
      console.log("[FULFILLORDER] Product is a live stream", name, date, time);

      const hasModification =
        `: ${product.metadata.Modifikation}` ||
        ` <strong>am ${date} um ${time}</strong>`;

      htmlString = `
      <h1 style="font-size:16px">Liebe(r) ${invoice.customer_name!},</h1>
  
      <br>
      <p>Vielen Dank für deine Buchung von <strong>${name}</strong>${hasModification}.</p>
  
  
      <p>Hier sind die Login-Daten:</p>
  
      <a href="${zoom}">${zoom}</a>
      <p>Meeting ID: ${meetingId}</p>
      <p>Kennwort: ${password}</p>
  
      <br>
      <p>Deine Rechnung und deinen Zahlungsnachweis kannst Du hier herunterladen: <br>
      <a href="${invoice.hosted_invoice_url}">Rechnung</a>
      </p>
  
      <br>
      <p>Ich freue mich auf Dich!</p>
  
      <br>
      <p>Ganz liebe Grüße,</p>
      <p>${USER.split(" ")[0]}</p>
      `;

      subject = `Live: Online-Yoga-Kurs mit ${
        USER.split(" ")[0]
      } - Rechnung und Zugangsdaten`;
      result = await sendEmail(htmlString, invoice.customer_email!, subject);
      return result;
    }
  } catch (err) {
    console.log("[FULFILLORDER_ERROR]", err);

    return false;
  }
}
