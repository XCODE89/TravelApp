import { IBookingForm } from "../interfaces/IBookingForm";
import { ISignInForm, ISignUPForm } from "../interfaces/ISignForm";

type FormValues = ISignInForm | ISignUPForm | IBookingForm ;

function isISign(userData: FormValues): userData is ISignInForm | ISignUPForm {
    return 'email' in userData && 'password' in userData;
  }

export const validation = (userData: FormValues) => {

    const error: string[] = []

    if (isISign(userData)) {
        if ('fullName' in userData && !userData.fullName) {
            if (!userData.email || !userData.password) {
                error.push("Complete all the fields")
            }
        } else if (!userData.email || !userData.password) {
            error.push("Complete all the fields")
        } else if (!/^[\s\S]{3,20}$/.test(userData.password)) {
            error.push("Password must be 3-20 characters")
        }
    }else if(!userData.date || !userData.guests || !userData.totalPrice) {
        error.push("Complete all the fields")
    }
    return error
};