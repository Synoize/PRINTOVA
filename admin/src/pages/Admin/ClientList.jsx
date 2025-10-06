import React, { useContext, useEffect } from "react";
import { MaterialReactTable } from "material-react-table";
import { Link } from "react-router-dom";
import { AdminContext } from "../../context/AdminContext";

const columns = [
  { accessorKey: "_id", header: "Client ID" },
  {
    accessorKey: "image",
    header: "Image",
    Cell: ({ row }) => (
      <img src={row.original.image} alt="client" className="w-16 h-16 rounded object-cover" />
    ),
  },
  { accessorKey: "name", header: "Name" },
  { accessorKey: "phone", header: "Phone" },
  { accessorKey: "email", header: "Email" },
  { accessorKey: "gender", header: "Gender" },
  { accessorKey: "dob", header: "dob" },
  {
    accessorKey: "address",
    header: "Address",
    Cell: ({ row }) => (
      <p>{row.original.address.street}, {row.original.address.city}, {row.original.address.state}, {row.original.address.pinCode}</p>
    ),
  },
  { accessorKey: "aadharNumber", header: "Aadhar Number" },
  { accessorKey: "accountNumber", header: "Account Number" },
  { accessorKey: "ifscCode", header: "IFSC Code" },
  { accessorKey: "panNumber", header: "PAN Number" },
  { accessorKey: "createdAt", header: "created At" },
  { accessorKey: "updatedAt", header: "Updated At" },
  {
    accessorKey: "clientVerificationStatus",
    header: "Status",
    Cell: ({ row }) => (
      <span
        className={`px-2 py-2 rounded text-xs ${row.original.isClient && row.original.clientVerificationStatus === "confirmed"
          ? "bg-green-100 text-green-600 "
          : "bg-red-100 text-red-600 "
          }`}
      >
        {row.original.clientVerificationStatus}
      </span>
    ),
  },
];
const ClientList = () => {

  const { aToken, clients, getAllClients } = useContext(AdminContext);

  useEffect(() => {
    if (aToken) {
      getAllClients();
    }
  }, [aToken]);

  return (
    <div className="overflow-y-scroll h-[calc(100vh-80px)] w-full p-6">
      <div className="flex items-center justify-between bg-white p-3 rounded-lg shadow mb-4">
        <h2 className="text-lg font-bold text-[#3C6637]">Client List</h2>
        <Link to={"/clients/add"} className="bg-blue text-white px-3 py-2 rounded-lg">
          Add New
        </Link>
      </div>
      <MaterialReactTable columns={columns} data={clients} />
    </div>
  );
}

export default ClientList;
