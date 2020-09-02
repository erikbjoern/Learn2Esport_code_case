import React, { useState } from "react"
import Header from "./components/Header"
import Description from "./components/Description"
import SearchField from "./components/SearchField"
import Countries from "./components/Countries"

const App = () => {
  const [filter, setFilter] = useState("")

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
        <SearchField setFilter={setFilter} />
        <Countries filter={filter} />
      </div>
    </>
  )
}

export default App
