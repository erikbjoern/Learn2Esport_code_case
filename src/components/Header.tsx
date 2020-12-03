import React from "react"
import logo from "../assets/images/logo.png"
import styles from "../stylesheets/Header.module.css"

const Header: React.FC = (): JSX.Element => {
  return (
    <div className={styles.header} data-cy="header">
      <img
        src={logo}
        data-src={logo}
        alt="Learn2Esport logo"
        className={styles.logo}
      />
    </div>
  )
}

export default Header
