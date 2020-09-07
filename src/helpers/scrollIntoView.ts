export const scrollIntoView = (reason: string) => {
  if (
    (reason === "small viewport" && window.innerHeight < 700) ||
    reason === "search by continent"
  ) {
    window.scrollTo({ top: 100, behavior: "smooth" })
  }
}
