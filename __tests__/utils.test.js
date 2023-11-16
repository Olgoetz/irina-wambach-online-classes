import {
  containsSubstringCaseInsensitive,
  checkHasProperties,
  isDateOlder,
  findKeyInMetaData,
  checkObjectKeysContainsSubstring,
  validateObjectKeysContainSubstring,
} from "@/lib/utils";

test("returns TRUE if 'MorningYoga - AUFZEICHNUNG' contains 'aufzeichnung'", () => {
  const mainString = "MorningYoga - AUFZEICHNUNG";
  const subString = "aufzeichnung";
  expect(containsSubstringCaseInsensitive(mainString, subString)).toBe(true);
});
test("returns TRUE if 'MorningYoga- AUFZEICHNUNG' contains 'Aufzeichnung'", () => {
  const mainString = "MorningYoga- AUFZEICHNUNG";
  const subString = "aufzeichnung";
  expect(containsSubstringCaseInsensitive(mainString, subString)).toBe(true);
});

test("returns TRUE if 'MorningYoga - AUFZEICHNUNG' contains 'AUFZEICHNUNG'", () => {
  const mainString = "MorningYoga - AUFZEICHNUNG";
  const subString = "aufzeichnung";
  expect(containsSubstringCaseInsensitive(mainString, subString)).toBe(true);
});
test("returns FALSE if 'MorningYoga - aufz' contains 'aufzeichnung'", () => {
  const mainString = "MorningYoga - aufz";
  const subString = "aufzeichnung";
  expect(containsSubstringCaseInsensitive(mainString, subString)).toBe(false);
});

test("returns missingproperties array of length 0", () => {
  const obj = { a: 1, b: 2 };
  const props = ["a", "b"];
  expect(checkHasProperties(obj, props).length).toBe(0);
});

test("returns FALSE as the 22.01.2022 17:00-18:00 Uhr is in the past", () => {
  const dateString = "22.01.2022";
  const timeString = "17:00-18:00 Uhr";
  expect(isDateOlder("yoga", dateString, timeString)).toBe(false);
});

test("returns TRUE as the 22.01.2030 17:00-18:00 Uhr is in the future", () => {
  const dateString = "22.01.2030";
  const timeString = "17:00-18:00 Uhr";
  expect(isDateOlder("yoga", dateString, timeString)).toBe(true);
});

test("returns TRUE as the 11.11.2023 17:35-19:30 Uhr is in the future", () => {
  const dateString = "11.11.2023";
  const timeString = "17:35-19:30 Uhr";
  expect(isDateOlder("yoga", dateString, timeString)).toBe(false);
});

test("returns 12345", () => {
  const obj = { Metadata: { id: "12345" } };
  const possibleKeys = ["MeetingID", "MeetingId", "Id", "ID", "id"];
  expect(findKeyInMetaData(obj.Metadata, possibleKeys, "not found")).toBe(
    "12345"
  );
});

test("returns not found", () => {
  const obj = { Metadata: { idd: "12345" } };
  const possibleKeys = ["MeetingID", "MeetingId", "Id", "ID", "id"];
  expect(findKeyInMetaData(obj.Metadata, possibleKeys, "not found")).toBe(
    "not found"
  );
});

test("returns TRUE as key exists on object", () => {
  const obj = { Metadata: { Id: "12345" } };
  const subString = "id";
  expect(checkObjectKeysContainsSubstring(obj.Metadata, subString)).toBe(true);
});

test("returns Meeting as key does not exist on object", () => {
  const obj = { Metadata: { Id: "12345" } };
  const subString = "Meeting";
  expect(checkObjectKeysContainsSubstring(obj.Metadata, subString)).toBe(
    subString
  );
});

test("returns FALSE as key does not exist on object", () => {
  const obj = { Metadata: { Id: "12345" } };
  const subString = "Meeting";
  expect(validateObjectKeysContainSubstring(obj.Metadata, subString)).toBe(
    false
  );
});

test("returns 'Meeting' as key does not exist on object", () => {
  const obj = { Metadata: { Meeting: "12345" } };
  const subString = "Meet";
  expect(validateObjectKeysContainSubstring(obj.Metadata, subString)).toBe(
    "Meeting"
  );
});
