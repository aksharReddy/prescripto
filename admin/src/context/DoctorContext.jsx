import {createContext} from 'react';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken,setdToken]= useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments,setAppointments] = useState([]);
    const value = {
        dToken,
        setdToken,
        backendUrl
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )
}
export default DoctorContextProvider;