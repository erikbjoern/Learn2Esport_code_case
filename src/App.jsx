import React, { useState } from "react"
import Header from "./components/Header"
import Description from "./components/Description"
import SearchField from "./components/SearchField"
import Countries from "./components/Countries"
import styles from "./stylesheets/App.module.css"

const App = () => {
  const [filter, setFilter] = useState("")

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Description />
        <SearchField setFilter={setFilter} />
        <Countries filter={filter} />
      </div>
    </>
  )
}

export default App
