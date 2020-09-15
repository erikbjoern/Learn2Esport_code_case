export const capitalize = (string: string) => {

  return string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}
