export const scrollIntoView = () => {
  if (window.innerHeight < 600) {
    window.scrollTo({ top: 100, behavior: "smooth" })
  }
}