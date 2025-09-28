import { createContext, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const ClientContext = createContext()

const ClientContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const localStorageToken = localStorage.getItem('cToken')

    const [cToken, setCToken] = useState(localStorageToken ? localStorageToken : '');
    const [orders, setOrders] = useState([]);
    const [dashData, setDashData] = useState(false);
    const [profileData, setProfileData] = useState(false)

    // get Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/client/dashboard`, { headers: { clientToken } });

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    // get profile data
    const getProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/client/profile`, { headers: { cToken } });

            if (data.success) {
                setProfileData(data.profileData)
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.error(error);
            toast.error(error.message);
        }
    }

    const value = {
        backendUrl,
        cToken, setCToken,
        dashData, setDashData, getDashData,
        profileData, setProfileData, getProfileData,
    }

    return (
        <ClientContext.Provider value={value}>
            {props.children}
        </ClientContext.Provider>
    )
}

export default ClientContextProvider