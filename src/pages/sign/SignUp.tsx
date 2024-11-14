import { Link, useNavigate } from "react-router-dom";
import styles from "./sign.module.css";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { useState } from "react";
import { ISignUPForm } from "../../interfaces/ISignForm";
import { handleInputChange } from "../../utils/handleInputChange";
import { AppPath } from "../../enums/app_path";
import { validation } from "../../utils/validationData";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/features/register/registerSlice";
import { AppDispatch } from "../../redux/store/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "../../components/Loader/Loader";

export const SignUp = (): JSX.Element => {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>();

  const [loading, setLoading] = useState<boolean>(false);
  const [signUpInfo, setSignUpInfo] = useState<ISignUPForm>({
    fullName: "",
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (validation(signUpInfo).length === 0) {
      try {
        const response = await dispatch(registerUser(signUpInfo)).unwrap();
        if (response.token) {
          localStorage.setItem('token', response.token);
        }
        setSignUpInfo({
          fullName: "",
          email: "",
          password: ""
        });
        navigate("/");
      } catch (error) {
        setLoading(false)
        toast.error(String(error));
      }
    } else {
      setLoading(false)
      validation(signUpInfo).forEach(error => {
        toast.error(error)
      })
    }
  };

  return (
    <>
      <Header/>
      <main className={styles.page}>
        <h1 className={styles.visually__hidden}>Travel App</h1>
        <form className={styles.form} autoComplete="off" onSubmit={handleSubmit}>
          <h2 className={styles.title}>Sign Up</h2>
          <label className={styles.input}>
            <span className={styles.input__heading}>Full name</span>
            <input
              data-test-id="auth-full-name"
              name="fullName"
              type="text"
              onChange={(e) => handleInputChange(e, signUpInfo, setSignUpInfo)}
              value={signUpInfo.fullName} 
            />
          </label>
          <label className={styles.input}>
            <span className={styles.input__heading}>Email</span>
            <input 
              data-test-id="auth-email" 
              name="email" 
              type="email"
              onChange={(e) => handleInputChange(e, signUpInfo, setSignUpInfo)}
              value={signUpInfo.email}  
            />
          </label>
          <label className={styles.input}>
            <span className={styles.input__heading}>Password</span>
            <input
              data-test-id="auth-password"
              name="password"
              type="password"
              autoComplete="new-password"
              onChange={(e) => handleInputChange(e, signUpInfo, setSignUpInfo)}
              value={signUpInfo.password} 
            />
          </label>
          <button data-test-id="auth-submit" className={styles.button} type="submit">
            Sign Up
          </button>
        </form>
        <span>
          Already have an account?
          <Link data-test-id="auth-sign-in-link" to={AppPath.SIGNIN} className={styles.link}>
            Sign In
          </Link>
        </span>
      </main>
      {loading?<Loader/>:null}
      <ToastContainer/>
      <Footer/>
    </>
  )
}