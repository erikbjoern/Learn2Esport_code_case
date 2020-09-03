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
        className={styles.logo}
      />
    </div>
  )
}

export default Header
