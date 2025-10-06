import React, { useContext, useEffect, useState } from "react";
import { MaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const columns = [
  { accessorKey: "_id", header: "User ID" },
  {
    accessorKey: "image",
    header: "Image",
    Cell: ({ row }) => (
        <img src={row.original.image} alt="user" className="w-16 h-16 rounded object-cover" />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "dob", header: "dob" },
  { accessorKey: "createdAt", header: "created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
];
const UserList = () => {

  const { aToken, users, getAllUsers } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllUsers();
    }
  }, [aToken]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-6">
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-[#3C6637]">User List</h2>
        <Link to={"/users/add"} className="bg-[#3C6637] text-white px-3 py-2 rounded-lg">
          Add New
        </Link>
      </div>
      <MaterialReactTable columns={columns} data={users} />
    </div>
  );
}

export default UserList;
