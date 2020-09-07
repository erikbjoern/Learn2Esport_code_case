export const scrollIntoView = () => {
  if (window.innerHeight < 700) {
    window.scrollTo({ top: 100, behavior: "smooth" })
  }
}