import React from "react"
import Header from "./components/Header"
import Description from "./components/Description"
import SearchField from "./components/SearchField"
import Countries from "./components/Countries"

const App = () => {
  return (
    <>
      <Header />
      <div
        style={{
          backgroundColor: "#293042",
          display: "flex",
          flexDirection: "column",
          margin: "60px 0 0 70px",
          padding: "60px 90px",
          width: "80vw",
        }}
      >
        <Description />
        <SearchField />
        <Countries />
      </div>
    </>
  )
}

export default App
