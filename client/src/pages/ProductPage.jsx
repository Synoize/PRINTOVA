import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useParams } from "react-router-dom";
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import MainLoader from '../components/MainLoader';
import RecommendedProduct from '../components/RecommendedProduct';
import { Star } from 'lucide-react';

const ProductPage = () => {
  const { productId } = useParams();
  const { backendUrl, axios, products, getProductsData } = useContext(AppContext);

  const productInfo = useMemo(() => products.find(product => product._id === productId), [products, productId]);
  const [productData, setProductData] = useState({});
  const [loading, setLoading] = useState(true);

  const getSingleProductData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/product/${productId}`);

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
      getProductsData();
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
          <div className="rounded-lg overflow-hidden  bg-gray-500/10 mb-4 p-4 flex justify-center items-center">
            <img
              src={productData.image}
              alt={productData.name || "Product"}
              className="w-full h-auto object-cover mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>


        <div className="flex flex-col">
          <h1 className="text-3xl text-gray-800/90 mb-4">
            {productData.name}
          </h1>

          <p className="text-gray-600 mt-3">
            {Array.isArray(productData.description)
              ? productData.description.join(", ")
              : productData.description}
          </p>

          <div className="flex items-center mt-5">
            <span className="space-x-1 flex ">
              {
                Array.from({ length: productData.rating === "" || productData.rating }, (_, index) => (
                  <Star key={index} className='inline-block h-5 w-5 mb-0.5 text-yellow-400' />
                ))
              }
            </span>
            <span className="ml-2 text-gray-600">{productData.rating || 0}</span>
          </div>

          <p className="text-3xl mt-6">
            ₹{productData.offerPrice} <strike className="text-lg text-gray-400 font-normal ml-1">{productData.price}</strike>
          </p>

          <hr className="bg-gray-600 my-6" />

          <div className="overflow-x-auto">
            <table className="table-auto border-collapse w-full max-w-72">
              <tbody>

                <tr>
                  <td className="text-gray-600">Category</td>
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

      <RecommendedProduct productId={productId} category={productInfo?.category} />
    </div>
  );
};

export default ProductPage;
