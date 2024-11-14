import styles from './navigation.module.css'
import briefcase from "../../assets/briefcase.svg"
import user from "../../assets/user.svg"
import { Link, useNavigate } from 'react-router-dom'
import { AppPath } from '../../enums/app_path'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'

export const Navigation = () => {
  const navigate = useNavigate()
  const userInfo = useSelector((state: RootState) => state.auth.user)

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in")
  }

  return (
    <nav data-test-id="header-nav" className={styles.header__nav}>
          <ul className={styles.nav__header__list}>
            <li className={styles.nav__header__item} title="Bookings">
              <Link data-test-id="header-bookings-link" to={AppPath.BOOKING}className={styles.nav__header__inner}>
                <span className={styles.visually__hidden}>Bookings</span>
                <img src={briefcase} alt="bookings" />
              </Link>
            </li>
            <li className={styles.nav__header__item} title="Profile">
              <div
                data-test-id="header-profile-nav"
                className={`${styles.nav__header__inner} ${styles.profile__nav}`}
                tabIndex={0}
              >
                <span className={styles.visually__hidden}>Profile</span>
                <img src={user} alt="profile" />
                <ul
                  data-test-id="header-profile-nav-list"
                  className={styles.profile__nav__list}
                >
                  <li
                    data-test-id="header-profile-nav-username"
                    className={styles.profile__nav__item}
                  >
                    {userInfo?.fullName}
                  </li>
                  <li className={styles.profile__nav__item}>
                    <Link data-test-id="header-profile-nav-sign-out" to={AppPath.SIGNIN} className={`${styles.profile__nav__sign_out} ${styles.button}`} onClick={handleLogout}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
  )
}