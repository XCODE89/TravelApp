
import styles from "./bookingCard.module.css"

type Props = {
    onDelete: ()=> void,
    title: string,
    guests: number,
    date: string,
    totalPrice: number,
}

export const BookingCard = ({onDelete, title, guests, date, totalPrice}: Props) => {

    return (
        <li data-test-id="booking" className={styles.booking}>
            <h3 data-test-id="booking-title" className={styles.booking__title}>{title}</h3>
            <span data-test-id="booking-guests" className="booking__guests">
            {guests} guests
            </span>
            <span data-test-id="booking-date" className="booking__date">
            {date}
            </span>
            <span data-test-id="booking-total" className="booking__total">
            {totalPrice}
            </span>
            <button
            data-test-id="booking-cancel"
            className={styles.booking__cancel}
            title="Cancel booking"
            onClick={onDelete}
            >
            <span className={styles.visually_hidden}>Cancel booking</span>
            ×
            </button>
        </li>
    )
}