import { capitalize } from "../helpers/capitalize"

test("Capitalizes each word in a string", () => {
  expect(capitalize("capitalize me please")).toMatch(/Capitalize Me Please/)
})