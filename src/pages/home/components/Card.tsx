import styles from './card.module.css'
import { Link } from 'react-router-dom'

type Props = {
    id: string,
    image: string,
    title: string,
    duration: number,
    level: string,
    price: number
}

export const Card = ({id, image, title, duration, level, price}: Props) => {
  return (
    <li data-test-id="trip-card" className={styles.trip__card}>
        <img
            data-test-id="trip-card-image"
            src={image}
            alt="trip photo"
        />
        <div className={styles.trip_card__content}>
            <div className={styles.trip_info}>
            <h3 data-test-id="trip-card-title" className={styles.trip_info__title}>
                {title}
            </h3>
            <div className={styles.trip_info__content}>
                <span
                data-test-id="trip-card-duration"
                className={styles.trip_info__duration}
                >
                <strong>{duration}</strong> days
                </span>
                <span data-test-id="trip-card-level" className={styles.trip_info__level}>
                {level}
                </span>
            </div>
            </div>
            <div className="trip-price">
            <span>Price</span>
            <strong
                data-test-id="trip-card-price-value"
                className={styles.trip_price__value}
            >
                ${price}
            </strong>
            </div>
        </div>
        <Link data-test-id="trip-card-link" to={`/trip/${id}`} className={styles.button}>Discover a trip</Link>
    </li>
  )
}