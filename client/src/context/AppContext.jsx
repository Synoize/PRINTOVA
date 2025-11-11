import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const localStorageToken = localStorage.getItem('token')
    const [token, setToken] = useState(localStorageToken ? localStorageToken : false)
    const [loading, setLoading] = useState(true);
    const [loadingCart, setLoadingCart] = useState(false);
    const [userData, setUserData] = useState(false);
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);

    const [keyword, setKeyword] = useState('');

    // Get Products Data
    const getProductsData = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/product/list`)

            if (data?.success) {
                setProducts(data.products);
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    // Get User Profile Data
    const getUserProfileData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`${backendUrl}/api/user/get-profile`, { headers: { Authorization: `Bearer ${token}` } })

            if (data.success) {
                setUserData(data.userData);
                setCart(data.userData.cart);
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally{
            setLoading(false);
        }
    }

    // Add To Cart
    const addToCart = async (productId, quantity) => {
        setLoadingCart(true);
        try {
            const { data } = await axios.patch(
                `${backendUrl}/api/user/add-cart`,
                { productId, quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(data.cart);
            toast.success("Product added to cart!");
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to add to cart");
        } finally {
            setLoadingCart(false);
        }
    };

    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token, cart?.length])

    const value = {
        axios, currencySymbol, backendUrl,
        token, setToken,
        userData, setUserData, loading, setLoading,
        products, setProducts, getProductsData,
        keyword, setKeyword, getUserProfileData,
        cart, setCart, addToCart, loadingCart, setLoadingCart
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
