import styles from "./search.module.css"
import { useState } from "react";

type SearchProps = {
  onSearch: (searchData: { search: string; duration: string; level: string }) => void;
}

type Search = {
  search: string;
  duration: string;
  level: string;
}

export const Search = ({onSearch}: SearchProps) => {

  const [searchData, setSearchData] = useState<Search>({
    search:"",
    duration: "",
    level:"",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSearchData(prevState => ({
      ...prevState,
      [name]: value,
    }));
    onSearch({ ...searchData, [name]: value });
  };

  return (
    <section className={styles.trips__filter}>
        <h2 className={styles.visually__hidden}>Trips filter</h2>
        <form className={styles.trips_filter__form} autoComplete="off">
          <label className={`${styles.trips_filter__search} ${styles.input}`}>
            <span className={styles.visually__hidden}>Search by name</span>
            <input
              data-test-id="filter-search"
              name="search"
              type="search"
              placeholder="search by title"
              value={searchData.search}
            onChange={handleChange}
            />
          </label>
          <label className={styles.select}>
            <span className={styles.visually__hidden}>Search by duration</span>
            <select data-test-id="filter-duration" name="duration" value={searchData.duration} onChange={handleChange}>
              <option value="">duration</option>
              <option value="0_x_5">&lt; 5 days</option>
              <option value="5_x_10">&lt; 10 days</option>
              <option value="10">&ge; 10 days</option>
            </select>
          </label>
          <label className={styles.select}>
            <span className={styles.visually__hidden}>Search by level</span>
            <select data-test-id="filter-level" name="level" value={searchData.level} onChange={handleChange}>
              <option value="">level</option>
              <option value="easy">easy</option>
              <option value="moderate">moderate</option>
              <option value="difficult">difficult</option>
            </select>
          </label>
        </form>
      </section>
  )
}