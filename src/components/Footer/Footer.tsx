import styles from "./footer.module.css"
import { Link } from 'react-router-dom'
import heart from "../../assets/heart.svg"

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <span className={styles.footer__text}>
        © 2024, from
        <Link to="" target="_blank" className={styles.footer__link}>
            mapche studio
        </Link>
        with
        <img className={styles.footer__icon} src={heart} alt="heart" />
      </span>
    </footer>
  )
}