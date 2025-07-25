import {createContext,useState} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';



export const AdminContext = createContext();

const AdminContextProvider = (props) => {
    const [aToken,setaToken]= useState(localStorage.getItem('aToken')?localStorage.getItem('aToken'):'');
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors,setdoctors] = useState([]);
    const [appointments,setAppointments] = useState([]);
    const [dashData,setDashData] = useState(null)

    const getAllDoctors =  async() => {
        try {
            const {data} = await axios.post(backendUrl + 'api/admin/all-doctors', {}, { headers: { aToken } });
            if (data.success) {
                setdoctors(data.doctors);
                console.log(data.doctors);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const changeAvailability = async(docId)=>{
        try {
            const {data} = await axios.post(backendUrl + 'api/admin/change-availability', {docId}, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllDoctors();
            }
            else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    const getAllAppointments = async () => {
        try {
            const {data} = await axios.get(backendUrl + 'api/admin/appointments-list', { headers: { aToken } });
            if (data.success) {
               setAppointments(data.appointments);
            } else {
                toast.error(data.message);
                
            }
        } catch (error) {
            toast.error(error.message);
            
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const {data} = await axios.post(backendUrl + 'api/admin/cancel-appointment', {appointmentId}, { headers: { aToken } });
            if (data.success) {
                toast.success(data.message);
                getAllAppointments();
                getdashData();
            } else {
                
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const getdashData = async () => {
        try {
          console.log("Calling dashboard API...");
          const res = await axios.get(backendUrl + 'api/admin/dashboard', {
            headers: { aToken }
          });
          console.log("Dashboard API response:", res.data);
      
          if (res.data.success) {
            setDashData(res.data.dashdata || res.data.data); // fallback if name differs
          } else {
            toast.error(res.data.message);
          }
        } catch (error) {
          console.error("Error loading dashboard:", error);
          toast.error(error.message);
        }
      };
      
    const value = {
        aToken,
        setaToken,
        backendUrl,
        getAllDoctors,
        doctors,
        setdoctors,
        changeAvailability,
        appointments,
        setAppointments,
        getAllAppointments,
        cancelAppointment,
        getdashData,
        dashData,
        setDashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}
export default AdminContextProvider;