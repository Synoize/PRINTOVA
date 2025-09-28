import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AdminContext = createContext()

const AdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const localStorageToken = localStorage.getItem('aToken')

    const [aToken, setAToken] = useState(localStorageToken ? localStorageToken : '')
    const [clients, setClients] = useState([])
    const [orders, setOrders] = useState([])
    const [dashData, setDashData] = useState(false)

    // Get All Clients
    const getAllClients = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/admin/all-clients`, {}, { headers: { token } })

            if (data.success) {
                setClients(data.clients)
                console.log(data.clients);

            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // Get Dashboard Data
    const getDashData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/admin/dashboard`, { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
        aToken, setAToken, backendUrl,
        clients, getAllClients,
        dashData, setDashData, getDashData,
        orders, setOrders,
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider