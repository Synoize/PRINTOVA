import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext()

const AppContextProvider = (props) => {
    const currencySymbol = '₹'
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const navigate = useNavigate();

    const localStorageToken = localStorage.getItem('token')
    const [token, setToken] = useState(localStorageToken ? localStorageToken : false)
    const [loading, setLoading] = useState(true);
    const [loadingCart, setLoadingCart] = useState(false);
    const [userData, setUserData] = useState(false);
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([]);

    const [keyword, setKeyword] = useState('');

    const deliveryCharge = 50;
    const taxRate = 0.05;

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
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        } finally {
            setLoading(false);
        }
    }

    // Add To Cart
    const addToCart = async (productId, quantity, price) => {
        try {
            setLoadingCart(true);

            const { data } = await axios.post(
                `${backendUrl}/api/cart/add`,
                { productId, quantity, price },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (data.success) {
                toast.success("Added to cart");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Error adding to cart");
        } finally {
            setLoadingCart(false);
        }
    };

    const fetchCartItems = async () => {
        try {
            const { data } = await axios.get(`${backendUrl}/api/cart`, { headers: { Authorization: `Bearer ${token}` } });

            if (data.success) {
                setCart(data.cart)
            }

        } catch (error) {
            console.error("Fetch Cart Error:", error);
        }
    };


    useEffect(() => {
        if (token) {
            getUserProfileData()
        } else {
            setUserData(false)
        }
    }, [token])

    const value = {
        toast, navigate, axios, currencySymbol, backendUrl,
        token, setToken,
        userData, setUserData, loading, setLoading,
        products, setProducts, getProductsData,
        keyword, setKeyword, getUserProfileData,
        cart, setCart, addToCart, loadingCart, setLoadingCart, fetchCartItems,
        deliveryCharge, taxRate,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}

export default AppContextProvider
