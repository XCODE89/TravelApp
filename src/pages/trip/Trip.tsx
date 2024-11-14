import { Footer } from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import styles from "./trip.module.css"
import { useEffect, useState } from "react"
import { Modal } from "../../components/modal/Modal"
import { useLocation } from "react-router-dom"
import { ITrip } from "../../interfaces/ITrip"

export const Trip = (): JSX.Element => {
  const path = useLocation()
  const idTrip= path.pathname.split("/").pop()

  const [trip, setTrip] = useState<ITrip>()

  useEffect(()=> {
    const getTrip = async () => {
      const token = localStorage.getItem("token")
      const viaje = await fetch(`https://travel-app-api.up.railway.app/api/v1/trips/${idTrip}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ITrip = await viaje.json();
      setTrip(data)
    }
    getTrip()
  },[idTrip])

  const [openmodal, setOpenModal] = useState<boolean>(false)

  const handleModal = () => {
    if(trip){
      setOpenModal(true)
    }
  }

  return (
    <>
      <Header/>
      <main className={styles.trip_page}>
        <h1 className={styles.visually_hidden}>Travel App</h1>
        <div className={styles.trip}>
          <img
            data-test-id="trip-details-image"
            src={trip?.image}
            className={styles.trip__img}
            alt="trip photo"
          />
          <div className={styles.trip__content}>
            <div className={styles.trip_info}>
              <h3 data-test-id="trip-details-title" className={styles.trip_info__title}>
                {trip?.title}
              </h3>
              <div className={styles.trip_info__content}>
                <span
                  data-test-id="trip-details-duration"
                  className={styles.trip_info__duration}
                >
                  <strong>{trip?.duration}</strong> days
                </span>
                <span data-test-id="trip-details-level" className={styles.trip_info__level}>
                  {trip?.level}
                </span>
              </div>
            </div>
            <div
              data-test-id="trip-details-description"
              className={styles.trip__description}
            >
              {trip?.description}
            </div>
            <div className="trip-price">
              <span>Price</span>
              <strong
                data-test-id="trip-details-price-value"
                className={styles.trip_price__value}
              >
                ${trip?.price}
              </strong>
            </div>
            <button
              data-test-id="trip-details-button"
              className={`${styles.trip__button} ${styles.button}`}
              onClick={handleModal}
            >
              Book a trip
            </button>
          </div>
        </div>
      </main>
      {openmodal?
        <Modal
          setOpenModal={setOpenModal}
          title={trip!.title}
          duration={trip!.duration}
          level={trip!.level}
          price={trip!.price}
          id={trip!.id}

        />
      :
        null
      }
      <Footer/>
    </>
  )
}