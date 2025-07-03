import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { parse, format, compareAsc } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function containsSubstringCaseInsensitive(
  mainString: string,
  subString: string
) {
  const lowerMainString = mainString.toLowerCase();
  const lowerSubString = subString.toLowerCase();
  return lowerMainString.includes(lowerSubString);
}

export function checkHasProperties(obj: any, properties: string[]) {
  let missingProperties: string[] = [];
  properties.forEach((property) => {
    if (!obj.hasOwnProperty(property)) {
      missingProperties.push(property);
    }
  });
  return missingProperties;
}

export function checkObjectKeysContainsSubstring(obj: any, keyToCheck: string) {
  const keyExists = Object.keys(obj).some((key) =>
    key.toLowerCase().trim().includes(keyToCheck.toLowerCase())
  );
  if (keyExists) {
    return keyExists;
  } else {
    return keyToCheck;
  }
}

export function validateObjectKeysContainSubstring(
  obj: any,
  keyToCheck: string
) {
  for (const key in obj) {
    console.log("value:", key);
    if (key.toLowerCase().trim().includes(keyToCheck.toLowerCase())) {
      return key;
    }
  }
  return false;
}

export function convertToDateTime(
  dateString: string,
  timeString: string
): Date {
  const [day, month, year] = dateString.split(".").map(Number);
  const [startTime] = timeString.split(" - ");

  // Check if the year is in YY format and convert to YYYY format
  const fullYear = year < 100 ? year + 2000 : year;

  const [hours, minutes] = startTime.split(":").map(Number);

  return new Date(Date.UTC(fullYear, month - 1, day, hours, minutes));
}
export function isDateOlder(
  productName: string,
  dateString: string,
  timeString: string
) {
  // If date is none return true
  if (dateString === "none") {
    console.log(
      `[UTILS.isDateOlder] '${productName}' has no date, setting default date to 01.01.2100`
    );
    dateString = "01.01.2100"; // Default date
  }

  // Split the date string into an array [day, month, year]
  const dateArray = dateString.split(".");
  const day = parseInt(dateArray[0]);
  const month = parseInt(dateArray[1]) - 1;
  let year = parseInt(dateArray[2]);

  const [hours, minutes] = timeString.split(":");

  if (year < 2000) {
    year = year + 2000;
  }

  // Ensure that hours and minutes are two digits each
  const formattedHours = hours.padStart(2, "0");
  const formattedMinutes = minutes.padStart(2, "0");

  // Create a Date object from the date and time
  const startDate = new Date(
    year,
    month,
    day,
    parseInt(formattedHours),
    parseInt(formattedMinutes)
  );

  const today = new Date();

  // Compare the two dates
  if (startDate < today) {
    console.log(
      `[UTILS.isDateOlder] '${productName}' is the past -> "${startDate}" < today: "${today}"`
    );

    return false;
  } else {
    console.log(
      `[UTILS.isDateOlder] '${productName}' is the future -> "${startDate}" < today: "${today}"`
    );

    return true;
  }
}

export function findKeyInMetaData(
  metadataObject: any,
  possibleKeys: string[],
  fallBack: string
) {
  for (const key of possibleKeys) {
    if (metadataObject[key]) {
      return metadataObject[key];
    }
  }
  return fallBack;
}

// Helper function to parse the `Datum` and `Uhrzeit`
const parseDateTime = (metadata: any) => {
  let [day, month, year] = [0, 0, 0];
  console.log("metadata", metadata.Datum.split("."));
  if (metadata.Datum.split(".").length !== 3) {
    const parsedDate = metadata.Datum.match(/\d{2}\.\d{2}/)[0];
    year = new Date().getFullYear();
    [day, month] = parsedDate.split(".");
    console.log("parsedDate", parsedDate);
  } else {
    [day, month, year] = metadata.Datum.split(".");
  }

  console.log("day month year", day, month, year);

  let startTime = metadata.Uhrzeit.split("-")[0].trim(); // Extract start time

  if (startTime.split(" ").length > 1) {
    startTime = startTime.split(" ")[1];
  }
  console.log("startTime", startTime);
  // console.log("day", day);
  // console.log("month", month);
  // console.log("year", year);
  // Build a valid date-time string using the date and time components
  const formattedDate = `${year}-${month}-${day}T${startTime}:00`;
  console.log("formattedDate", formattedDate);
  // Parse the formatted date
  return parse(formattedDate, "yyyy-MM-dd'T'HH:mm:ss", new Date());
};

export const sortedProducts = (products: any) => {
  const sortedData = products.sort((a: any, b: any) => {
    console.log("a", a);
    console.log("b", b);
    const dateA = parseDateTime(a.product.metadata);
    const dateB = parseDateTime(b.product.metadata);

    console.log("dateA", dateA);
    console.log("dateB", dateB);
    console.log("-----------------");
    return compareAsc(dateA, dateB);
  });

  return sortedData;
};
