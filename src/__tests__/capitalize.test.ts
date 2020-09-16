import { capitalize } from "../helpers/capitalize"

it("Capitalizes each word in a string", () => {
  expect(capitalize("capitalize me please")).toMatch(/Capitalize Me Please/)
})

it("Turns uppercase into lowercase before capitalizing", () => {
  expect(capitalize("ALL CAPS STRING")).toMatch(/All Caps String/)
})