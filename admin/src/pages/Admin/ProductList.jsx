import React, { useContext, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const columns = [
  { accessorKey: "_id", header: "Product ID" },
  {
    accessorKey: "image",
    header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.image} alt="client" className="w-16 h-16 rounded object-cover" />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "category", header: "Category" },
  {
    accessorKey: "description", header: "Description", Cell: ({ row }) => (
      <p className=" line-clamp-2">{row.original.description}</p>
    ),
  },
  { accessorKey: "rating", header: "Rating" },
  { accessorKey: "price", header: "Price" },
  { accessorKey: "offerPrice", header: "Offer Price" },
  { accessorKey: "date", header: "Date" },
  {
    accessorKey: "available",
    header: "Status",
    Cell: ({ row }) => (
      <span
        className={`px-2 py-2 rounded text-xs ${row.original.available
          ? "bg-green-100 text-green-600 "
          : "bg-red-100 text-red-600 "
          }`}
      >
        {row.original.available ? "available" : "unavailable"}
      </span>
    ),
  },
];
const ProductList = () => {

  const { backendUrl, axios, aToken, products, getAllProducts } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllProducts();
    }
  }, [aToken]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-6">
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-[#3C6637]">Product List</h2>
        <Link to={"/products/add"} className="bg-blue text-white px-3 py-2 rounded-lg">
          Add New
        </Link>
      </div>
      <MaterialReactTable columns={columns} data={products} />
    </div>
  );
}

export default ProductList;
