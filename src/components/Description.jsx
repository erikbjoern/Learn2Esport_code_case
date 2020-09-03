import React from "react"
import styles from "../stylesheets/Description.module.css"

const Description = () => {
  return (
    <div className={styles.container}>
      <div style={{ marginLeft: "50px" }}>
        <h1 className={styles.heading}>Lorem Ipsum</h1>
        <p className={styles.body}>Sit dolor</p>
      </div>
    </div>
  )
}

export default Description
