import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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

export function isDateOlder(
  productName: string,
  dateString: string,
  timeString: string
) {
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
