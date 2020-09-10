import React from "react"
import styles from "../stylesheets/Description.module.css"

const Description: React.FC = (): JSX.Element => {
  return (
    <div className={styles.container} data-cy="description">
      <div className={styles.textContainer}>
        <h1 className={styles.heading}>Lorem Ipsum</h1>
        <p className={styles.body}>Sit dolor</p>
      </div>
    </div>
  )
}

export default Description
