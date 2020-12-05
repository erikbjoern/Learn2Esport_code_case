import React, { useState } from "react"
import Header from "./components/Header"
import Description from "./components/Description"
import SearchField from "./components/SearchField"
import Countries from "./components/Countries"
import styles from "./stylesheets/App.module.css"

const App: React.FC = (): JSX.Element => {
  const [searchString, setSearchString] = useState("")

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.background} />
      <div className={styles.container}>
        <Description />
        <SearchField searchString={searchString} setSearchString={setSearchString} />
        <Countries searchString={searchString} setSearchString={setSearchString} />
      </div>
    </div>
  )
}

export default App
