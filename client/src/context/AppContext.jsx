import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const localStorageToken = localStorage.getItem('token')
    const [token, setToken] = useState(localStorageToken ? localStorageToken : false)

    const [userData, setUserData] = useState(false);
    const [products, setProducts] = useState([])

    const [keyword, setKeyword] = useState('');

    // Get Products Data
    const getProductsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`)

            if (data.success) {
                setProducts(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserProfileData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        axios, currencySymbol, backendUrl,
        token, setToken,
        userData, setUserData,
        products, setProducts, getProductsData,
        keyword, setKeyword, getUserProfileData
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
