export const capitalize = (string: string) => {
  string = string.toLowerCase()

  return string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}
