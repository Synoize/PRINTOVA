import React, { useContext, useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import MainLoader from '../components/MainLoader';

const ProductPage = () => {
  const { productId } = useParams();
  const { backendUrl, axios } = useContext(AppContext);

  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(false);

  console.log("id:" , productId);

  const getSingleProductData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/${productId}`);

      console.log(data);
      
      if (data?.success) {
        setProductData(data.product);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (productId) {
      getSingleProductData();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <MainLoader />
      </div>
    );
  }

  if (!productData || !productData._id) {
    return (
      <div className="text-center text-red-600 mt-10 h-[80vh] flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="px-5 lg:px-16 xl:px-20">
          <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4 p-4">
            <img
              src={productData.image}
              alt={productData.name}
              className="w-full h-auto object-cover mix-blend-multiply"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
            {productData.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {Array.isArray(productData.description)
              ? productData.description.join(", ")
              : productData.description}
          </p>

          <p className="text-3xl font-medium mt-6">
            ₹{productData.price}
          </p>

          <hr className="bg-gray-600 my-6" />

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>
               
                <tr>
                  <td className="text-gray-600 font-medium">Category</td>
                  <td className="text-gray-800/50">
                    {productData.category}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex items-center mt-10 gap-4">
            <button className="w-full py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition cursor-pointer">
              Add to Cart
            </button>
            <button className="w-full py-3.5 bg-[#013e70]/90 text-white hover:bg-[#013e70] transition cursor-pointer">
              Buy Now
            </button>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center mb-4 mt-16">
          <p className="text-3xl font-medium">
            Featured <span className="text-blue">Products</span>
          </p>
          <div className="w-28 h-0.5 bg-blue mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
