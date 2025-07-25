import { createContext, useEffect } from "react";
import axios from "axios";
import {toast} from "react-toastify";
import { useState } from "react";


export const AppContext = createContext()

const AppContextProvider = (props) => {

    const currencySymbol = '$'
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');
    const [userData,setUserData] = useState(false);

    const loadUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/getuserdata', {headers:{token}});
            if (data.success) {
                setUserData(data.user);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'Something went wrong while fetching user data');
        }
    }
    const getDoctorsData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/doctor/list');
            if (data.success) {
                setDoctors(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message || 'Something went wrong while fetching doctors data');
        }
    }
    const value = {
        doctors,
        currencySymbol,setDoctors,getDoctorsData,
        token,setToken,
        backendUrl,
        userData,setUserData,
        loadUserData
    }

    
    useEffect(() => {
        getDoctorsData();
    }, [])

    useEffect(() => {
        if (token) {
            loadUserData();
        }else{
            setUserData(false);
        }
    }, [token])

    

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}


export default AppContextProvider