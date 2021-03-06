import React from "react";
import { DebounceInput } from "react-debounce-input";
import styles from "../stylesheets/SearchField.module.css";
import { ReactComponent as SearchIcon } from "../assets/icons/search-solid.svg"
import { ReactComponent as CloseIcon } from "../assets/icons/times-solid.svg"

interface Props {
  searchString: string;
  setSearchString: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField: React.FC<Props> = ({ searchString, setSearchString }): JSX.Element => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value);
  };

  const onFocusHandler = (e: React.FocusEvent<HTMLInputElement>) => {
    const elementPosition = e.target.getBoundingClientRect().top;
    const offset = window.innerWidth * 0.1 + 70;

    if (elementPosition > 200) {
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  const clearField = () => {
    setSearchString("");
  };

  return (
    <div className={styles.container} data-cy="search-field">
      <div className={styles.inputBackground}>
        <span data-cy="search" className={styles.searchGlass}>
          <SearchIcon />
        </span>
        <DebounceInput
          minLength={1}
          debounceTimeout={200}
          onChange={onChangeHandler}
          onFocus={onFocusHandler}
          className={styles.input}
          placeholder="Search for a country"
          type="text"
          value={searchString}
        />
        {searchString !== "" && (
          <span data-cy="close" className={styles.close} onClick={clearField}>
            <CloseIcon />
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchField;
