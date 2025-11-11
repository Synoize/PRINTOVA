import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { ArrowLeft, CircleX, ShoppingCart } from "lucide-react";
import MainLoader from "../components/MainLoader";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const { backendUrl, axios, token, cart, loading, setCart } = useContext(AppContext);
  const navigate = useNavigate();

  const updateQuantity = async (productId, newQuantity) => {
    try {
      if (newQuantity < 1) return;

      const response = await axios.patch(
        `${backendUrl}/api/user/update-cart`,
        { productId, quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.cart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Remove product from cart
  const removeFromCart = async (productId) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/user/remove-cart/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCart(response.data.cart);
    } catch (error) {
      console.error("Error removing product:", error);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product?.offerPrice * item.quantity, 0
  );

  return (
    <div className="p-4 md:px-20">
      <h2 className="text-xl md:text-2xl font-semibold mb-6 flex justify-start items-center gap-6"><span className="cursor-pointer text-[#013e70] p-1" onClick={() => { navigate(-1); scrollTo(0, 0); }}><ArrowLeft /></span>Your Cart</h2>

      <div className="flex flex-col justify-center items-center min-h-[70vh]">
        {loading ? (
          <MainLoader />
        ) : !cart.length ? (
          <p className="text-gray-500 flex gap-3"><ShoppingCart /> Your cart is empty</p>
        ) : (
          <>
            <div className="h-[56vh] overflow-y-scroll w-full">
              <div className="space-y-4 h-full">
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center justify-between p-4 md:px-12 border border-gray-300 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.productId.name}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-medium line-clamp-1">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          ₹{item.product.offerPrice.toFixed(2)} x {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className=" justify-center items-center hidden md:flex text-center">
                      <p className=" text-sm px-6 p-2 text-[#013e70] border border-[#013e70] rounded-full hover:bg-[#013e70]/5 transition-all duration-300 ease-in-out">
                        {item.product.category}
                      </p>
                    </div>

                    <div className="flex items-center md:space-x-28">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                          disabled={item.quantity <= 1}
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="px-3 py-1 border rounded hover:bg-gray-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.productId)}
                        className="text-red-500 hover:underline md:block hidden cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-full flex justify-between items-center mt-8 p-4 border-t">
              <h3 className="text-lg font-semibold">
                Total: ₹{total.toFixed(2)}
              </h3>
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
