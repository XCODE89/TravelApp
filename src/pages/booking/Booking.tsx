import { BookingCard } from "./components/BookingCard"
import styles from "./booking.module.css"
import Header from "../../components/Header/Header"
import { Footer } from "../../components/Footer/Footer"
import { useEffect, useState } from "react"
import { IBooking } from "../../interfaces/IBooking"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import { deleteBooking, fetchBookings } from "../../redux/features/bookings/bookingSlice"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader/Loader"

export const Booking = (): JSX.Element => {
  const allBookings:IBooking[]  = useSelector((state :RootState)=> state.bookings.bookings)
  const dispatch = useDispatch<AppDispatch>();


  const [loading, setLoading] = useState<boolean>(true);

  const [bookings, setBookings] = useState<IBooking[]>(allBookings);
  useEffect(()=> {
    const token = localStorage.getItem("token")
    if (token) {
      dispatch(fetchBookings(token));
    }
    setTimeout(() => {
      setLoading(false)
    }, 500);
  }, [dispatch]);

  useEffect(() => {
    const sortedBookings = [...allBookings].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setBookings(sortedBookings);
  }, [allBookings]);

  const handleDelete = (id: string) => {
    const token = localStorage.getItem("token");
      if (token) {
        toast.success("Booking deleted.")
        dispatch(deleteBooking({ token, bookingId: id }));
      }
  };


  return (
    <>
      <Header/>
      <main className={styles.bookings_page}>
        <h1 className={styles.visually_hidden}>Travel App</h1>
        <ul className={styles.bookings__list}>
          {
            bookings.map((booking)=> (
              <BookingCard 
                key={booking.id}
                title={booking.trip.title}
                guests={booking.guests}
                date={booking.date.split("T")[0]}
                totalPrice={booking.totalPrice}
                onDelete={() => handleDelete(booking.id)}
              />
            ))
          }
          
        </ul>
      </main>
      {loading?<Loader/>:null}
      <ToastContainer/>
      <Footer/>
    </>
  )
}
