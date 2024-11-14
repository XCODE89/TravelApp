import { Link, useNavigate } from "react-router-dom"
import Header from "../../components/Header/Header"
import styles from "./sign.module.css"
import { Footer } from "../../components/Footer/Footer"
import { useState } from "react"
import { handleInputChange } from "../../utils/handleInputChange"
import { ISignInForm } from "../../interfaces/ISignForm"
import { AppPath } from "../../enums/app_path"
import { validation } from "../../utils/validationData"
import { loginUser } from "../../redux/features/auth/authSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../redux/store/store"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader/Loader"

export const SignIn = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);
  const [signInInfo, setSignInInfo] = useState<ISignInForm>({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if(validation(signInInfo).length === 0) {
        const response = await dispatch(loginUser(signInInfo))
        if(loginUser.fulfilled.match(response)){
          if (response.payload.token) {
            localStorage.setItem('token', response.payload.token);
          }
          setSignInInfo({
            email: "",
            password: ""
          })
          setLoading(false)
          navigate("/")
        } else if (loginUser.rejected.match(response)) {
          setLoading(false)
          toast.error(response.payload)
        }
    } else {
      setLoading(false)
      validation(signInInfo).forEach(error => {
        toast.error(error)
      })
    }
  }

  return (
    <>
      <Header/>
      <main className={styles.page}>
        <h1 className={styles.visually__hidden}>Travel App</h1>
        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2 className={styles.title}>Sign In</h2>
          <label className={styles.input}>
            <span className={styles.input__heading}>Email</span>
            <input 
              data-test-id="auth-email" 
              name="email" 
              type="email"
              onChange={(e) => handleInputChange(e, signInInfo, setSignInInfo)}
              value={signInInfo.email} 
              />
          </label>
          <label className={styles.input}>
            <span className={styles.input__heading}>Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => handleInputChange(e, signInInfo, setSignInInfo)}
              value={signInInfo.password} 
            />
          </label>
          <button data-test-id="auth-submit" className={styles.button} type="submit">
            Sign In
          </button>
        </form>
        <span>
          Don't have an account?
          <Link data-test-id="auth-sign-up-link" to={AppPath.SIGNUP} className={styles.link}>Sign Up</Link>
        </span>
      </main>
      {loading?<Loader/>:null}
      <ToastContainer />
      <Footer/>
    </>
  )
}