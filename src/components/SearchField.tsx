import React, { ChangeEvent } from "react"
import { DebounceInput } from "react-debounce-input"
import styles from "../stylesheets/SearchField.module.css"

interface Props {
  setFilter: React.Dispatch<React.SetStateAction<string>>
}

const SearchField: React.FC<Props> = ({ setFilter }): JSX.Element => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value.toLowerCase())
  }

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const elementPosition = e.target.getBoundingClientRect().top
    const offset = window.innerWidth * 0.1 + 70

    if (elementPosition > 200) {
      window.scrollTo({ top: offset, behavior: "smooth" })
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.inputBackground}>
        <span className={styles.symbolWrapper}>
          <i className="fas fa-search"></i>
        </span>
        <DebounceInput
          minLength={1}
          debounceTimeout={200}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          className={styles.input}
          placeholder="Search for a country"
          type="text"
        />
      </div>
    </div>
  )
}

export default SearchField
