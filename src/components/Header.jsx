import React from "react"
import logo from "../images/logo.png"
import styles from "../stylesheets/Header.module.css"

const Header = () => {
  return (
    <div className={styles.header}>
      <img
        src={logo}
        alt="Learn2Esport logo"
        height="30 px"
        style={{ margin: "15px 0 10px 300px" }}
      />
    </div>
  )
}

export default Header
