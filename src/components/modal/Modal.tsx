import { Dispatch, FC, SetStateAction, useState } from "react";
import styles from "./modal.module.css"
import { handleInputChange } from "../../utils/handleInputChange";
import { IBookingForm } from "../../interfaces/IBookingForm";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { addBooking } from "../../redux/features/bookings/bookingSlice";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../Loader/Loader";

interface ModalProps {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  title: string;
  duration: number;
  level: string;
  price: number;
  id: string;
}


export const Modal: FC<ModalProps> = ({ setOpenModal, title, duration, level, price, id }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<IBookingForm>({
    date: '',
    guests: 1,
    totalPrice: price,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    const newBooking = {
      tripId: id,
      guests: formValues.guests,
      date: formValues.date,
    };
    const token = localStorage.getItem("token");
    if (token) {
      const resultAction = await dispatch(addBooking({ token, booking: newBooking }));
      if (addBooking.fulfilled.match(resultAction)) {
        toast.success("Booking successful.")
        setFormValues({
          date: '',
          guests: 1,
          totalPrice: price,
        });
        setTimeout(() => {
          setLoading(false)
          navigate("/bookings", { state: newBooking });
          setOpenModal(false);
        }, 2000);
      } else {
        console.error("Failed to add booking");
      }
    }
  };

  return (
    <div className={styles.modal}>
        <div data-test-id="book-trip-popup" className={styles.book_trip_popup}>
          <button
            data-test-id="book-trip-popup-close"
            className={styles.book_trip_popup__close}
            onClick={() => setOpenModal(false)}
          >
            ×
          </button>
          <form className={`${styles.book_trip_popup__form}`} autoComplete="off" onSubmit={handleSubmit}>
            <div className={styles.trip_info}>
              <h3 data-test-id="book-trip-popup-title" className={styles.trip_info__title}>
                {title}
              </h3>
              <div className={styles.trip_info__content}>
                <span
                  data-test-id="book-trip-popup-duration"
                  className={styles.trip_info__duration}
                >
                  <strong>{duration}</strong> days
                </span>
                <span
                  data-test-id="book-trip-popup-level"
                  className={styles.trip_info__level}
                >
                  {level}
                </span>
              </div>
            </div>
            <label className={styles.input}>
              <span className={styles.input__heading}>Date</span>
              <input
                data-test-id="book-trip-popup-date"
                name="date"
                type="date"
                required
                value={formValues.date}
                onChange={(e) => handleInputChange(e, formValues, setFormValues, price)}
              />
            </label>
            <label className={styles.input}>
              <span className={styles.input__heading}>Number of guests</span>
              <input
                data-test-id="book-trip-popup-guests"
                name="guests"
                type="number"
                min="1"
                max="10"
                required
                value={formValues.guests}
                onChange={(e) => handleInputChange(e, formValues, setFormValues, price)}
              />
            </label>
            <span className={styles.book_trip_popup__total}>
              Total:
              <output
                data-test-id="book-trip-popup-total-value"
                className={styles.book_trip_popup__total_value}
              >
                ${formValues.totalPrice}
              </output>
            </span>
            <button
              data-test-id="book-trip-popup-submit"
              className={styles.button}
              type="submit"
            >
              Book a trip
            </button>
          </form>
        </div>
        {loading?<Loader/>:null}
        <ToastContainer/>
        </div>
  )
}