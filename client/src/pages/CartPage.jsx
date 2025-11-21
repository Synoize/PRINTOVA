import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import MainLoader from "../components/MainLoader";

const CartPage = () => {
  const { navigate, backendUrl, axios, toast, token, cart, loading, setLoading, setCart, fetchCartItems, deliveryCharge, taxRate, } =
    useContext(AppContext);

  // UPDATE QUANTITY
  const updateQuantity = async (cartId, newQuantity) => {
    setLoading(true);
    try {
      if (newQuantity < 1) return;

      const { data } = await axios.patch(
        `${backendUrl}/api/cart/update/${cartId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setCart(data.cart);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  // REMOVE FROM CART
  const removeFromCart = async (cartId) => {
    setLoading(true);
    try {
      const { data } = await axios.delete(
        `${backendUrl}/api/cart/remove/${cartId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setCart(data.cart);
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error removing product");
    } finally {
      setLoading(false);
    }
  };

  // TOTAL PRICE CALCULATION
  const subtotal = cart?.reduce((total, item) => total + (item.productId.offerPrice * item.quantity), 0);
  const taxAmount = cart?.reduce((total, item) => total + (item.productId.offerPrice * item.quantity * taxRate), 0);
  const totalPrice = cart?.reduce((total, item) => total + (item.productId.offerPrice * item.quantity) + (item.productId.offerPrice * item.quantity * taxRate) + deliveryCharge + item.price.otherCharges, 0);
  console.log(taxAmount);
  
  useEffect(() => {
    scrollTo(0, 0);
    fetchCartItems();
  }, [cart?.length]);

  return (
    <div className="p-4 md:px-20">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 flex justify-start items-center gap-6">
        <span
          className="cursor-pointer text-[#013e70] p-1"
          onClick={() => {
            navigate(-1);
            scrollTo(0, 0);
          }}
        >
          <ArrowLeft />
        </span>
        Your Cart
      </h2>

      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        {loading ? (
          <MainLoader />
        ) : !cart?.length ? (
          <p className="text-gray-500 flex gap-3">
            <ShoppingCart /> Your cart is empty
          </p>
        ) : (
          <>
            {/* CART LIST */}
            <div className="h-[56vh] overflow-y-scroll w-full">
              <div className="space-y-4 h-full">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 md:px-12 border border-gray-300 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.productId.image}
                        alt={item.productId.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {item.productId.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          <span>₹{item.productId.offerPrice}</span> {" "}
                          <span className="text-red-600">
                            X {item.quantity}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="hidden md:flex justify-center items-center">
                      <p className="text-sm px-6 p-2 text-[#013e70] border border-[#013e70] rounded-full hover:bg-[#013e70]/5">
                        {item.productId.category}
                      </p>
                    </div>

                    <div className="flex items-center md:space-x-28">
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity - 1)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() =>
                            updateQuantity(item._id, item.quantity + 1)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-red-500 hover:underline md:block hidden cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-between items-center gap-4 mt-8 p-4 border-t">
              <div>
                <p className="text-nowrap">Delivery: ₹{deliveryCharge.toFixed(2)}</p>
                <h3 className="text-lg font-semibold text-nowrap">
                  Total: ₹{totalPrice.toFixed(2)} <br className="md:hidden" />
                  <span className="font-normal text-sm text-red-500">₹{taxAmount.toFixed(2)} Tax (5%) Added</span>
                </h3>
              </div>
              <button className="bg-[#013e70] text-white px-6 py-2 rounded-lg hover:bg-[#025499]">
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
