import { Footer } from "../../components/Footer/Footer"
import Header from "../../components/Header/Header"
import { Search } from "../../components/search/Search"
import { Card } from "./components/Card"
import styles from "./home.module.css"
import { ITrip } from "../../interfaces/ITrip"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../redux/store/store"
import { fetchTrips } from "../../redux/features/trips/tripSlice"
import { fetchAuthenticatedUser } from "../../redux/features/auth/authSlice"
import Loader from "../../components/Loader/Loader"


export const Home = (): JSX.Element => {
  const allTrips:ITrip[]  = useSelector((state :RootState)=> state.trips.trips)
  const dispatch = useDispatch<AppDispatch>();

  const [filteredTrips, setFilteredTrips] = useState<ITrip[]>(allTrips);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(()=> {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(fetchTrips(token));
      dispatch(fetchAuthenticatedUser(token))
      setTimeout(() => {
        setLoading(false)
      }, 500);
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredTrips(allTrips);
  }, [allTrips]);

  const handleSearch = (searchData: { search: string; duration: string; level: string }) => {
    const filtered = allTrips.filter(trip => {
      const matchesSearch = trip.title.search(new RegExp(searchData.search, 'i')) !== -1;

      const matchesDuration = (() => {
        if (!searchData.duration) return true;
  
        const [min, max] = searchData.duration.split('_x_').map(Number);
        if (max) {
          return trip.duration > min && trip.duration <= max;
        }
        return trip.duration >= min;
      })();
      
      const matchesLevel = searchData.level ? trip.level === searchData.level : true;

      return matchesSearch && matchesDuration && matchesLevel;
    });

    setFilteredTrips(filtered);
  };

  return (
    <>
      <Header/>
      <main>
      <h1 className={styles.visually__hidden}>Travel App</h1>
      <Search onSearch={handleSearch}/>
      <section className={styles.trips}>
        <h2 className={styles.visually__hidden}>Trips List</h2>
        <ul className={styles.trip_list}>
          {
            filteredTrips.map(trip => (
              <Card
                key={trip.id}
                id={trip.id}
                image={trip.image}
                title={trip.title}
                duration={trip.duration}
                level={trip.level}
                price={trip.price}
              />
            ))
          }
        </ul>
      </section>
    </main>
      {loading?<Loader/>:null}
      <Footer/>
    </>
  )
}