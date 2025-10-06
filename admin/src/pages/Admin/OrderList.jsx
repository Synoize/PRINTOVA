import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const columns = [
  { accessorKey: "_id", header: "Order ID" },
  { accessorKey: "product", header: "Product Name" },
  { accessorKey: "createdAt", header: "created At" },
  { accessorKey: "orderedBy", header: "Ordered By" },
  { accessorKey: "updatedAt", header: "Updated At" },
  {
    accessorKey: "orderStatus",
    header: "Status",
    Cell: ({ row }) => (
      <span
        className={`px-2 py-2 rounded text-xs ${row.original.orderStatus === "Accepted"
            ? "bg-green-100 text-green-600 "
            : "bg-red-100 text-red-600 "
          }`}
      >
        {row.original.orderStatus}
      </span>
    ),
  },
];
const OrderList = () => {

  const { backendUrl, axios, aToken, orderList, setOrderList } = useContext(AdminContext);

  const getAllOrderList = async () => {
    try {
      const URL = `${backendUrl}/api/order/list`;

      const response = await axios.get(URL, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${aToken}`,
        }
      });

      setOrderList(response.data.orders);

    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  useEffect(() => {
    if (aToken) {
      getAllOrderList();
    }
  }, [aToken]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-6">
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-[#3C6637]">Order List</h2>
        <Link to={"/add-order"} className="bg-blue text-white px-3 py-2 rounded-lg">
          Add New
        </Link>
      </div>
      <MaterialReactTable columns={columns} data={orderList} />
    </div>
  );
}

export default OrderList;
