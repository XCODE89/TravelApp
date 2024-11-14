import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { ISignInForm, ISignUPForm } from "../interfaces/ISignForm";
import { IBookingForm } from "../interfaces/IBookingForm";

type FormValues = ISignUPForm | ISignInForm | IBookingForm ;

export const handleInputChange = <T extends FormValues>(e: ChangeEvent<HTMLInputElement>, inputInfo: T, setInputInfo: Dispatch<SetStateAction<T>>, price?:number) => {
    const isIBookingForm = 'totalPrice' in inputInfo
    const { name, value } = e.target;
    setInputInfo({
      ...inputInfo,
      [name]: value,
      ...(isIBookingForm && name === 'guests' && price ? { totalPrice: parseInt(value) * price } : {}),
    })
  }