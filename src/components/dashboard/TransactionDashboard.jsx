import React from "react";
import { FiSearch, FiFilter, FiDownload } from "react-icons/fi";
import image from "../../assets/Avatar.png";

const TransactionDashboard = () => {
  const data = [
    {
      id: 1,
      image: image,
      label: "Naira - Dollar",
      status: "Completed",
      amountFrom: "$500",
      amountTo: "₦450,000",
    },
    {
      id: 2,
      image: image,
      label: "Euro - Naira",
      status: "In Progress",
      amountFrom: "€300",
      amountTo: "₦240,000",
    },
    {
      id: 3,
      image: image,
      label: "USD - Euro",
      status: "Failed",
      amountFrom: "$200",
      amountTo: "€180",
    },
  ];

  // function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";
      case "In Progress":
        return "bg-yellow-100 text-yellow-700";
      case "Failed":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div style={{fontFamily: 'Outfit'}} className="p-4 shadow border border-gray-50">
      {/* Nav */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <h1 className="text-2xl font-semibold">
          Transactions
        </h1>

        {/* Search / Filter / Download */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex items-center border rounded-lg px-3 py-1 gap-2 w-full sm:w-auto">
            <FiSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search transactions"
              className="outline-none w-full bg-transparent text-sm"
            />
          </div>
          <button className="flex items-center gap-1 px-3 cursor-pointer py-1 border rounded-lg text-sm hover:bg-gray-100 transition">
            <FiFilter />
            Filter
          </button>
          <button className="flex items-center gap-1 px-3 cursor-pointer py-1 border rounded-lg text-sm hover:bg-gray-100 transition">
            <FiDownload />
            Download
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-3">Transaction</th>
              <th className="text-left px-4 py-3">Status</th>
              <th className="text-left px-4 py-3">Amount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr
                key={item.id}
                className="border-b last:border-b-0 hover:bg-gray-50 transition"
              >
                {/* Transaction Column */}
                <td className="px-4 py-3 flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="grid">
                    <span className="font-semibold">{item.label}</span>
                    <span className="text-sm text-gray-500">{item.status}</span>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-4 py-3">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Amount Column */}
                <td className="px-4 py-3">
                  <div className="grid text-sm">
                    <span className="font-medium">{item.amountFrom}</span>
                    <span className="text-gray-500">{item.amountTo}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionDashboard;
