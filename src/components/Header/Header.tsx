import { Link, useLocation } from 'react-router-dom'
import styles from './header.module.css'
import { Navigation } from './Navigation'
import { AppPath } from '../../enums/app_path'
const Header = (): JSX.Element => {
  const location = useLocation()

  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Link data-test-id="header-logo" to={AppPath.HOME} className={styles.header__logo}>Travel App</Link>
        {["/sign-up", "/sign-in"].includes(location.pathname)? null:<Navigation/>}
      </div>
    </header>
  )
}

export default Header