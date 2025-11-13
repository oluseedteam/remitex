import React from "react";

const Transactions = () => {
  const data = [
    {
      id: 1,
      label: "Total Transactions",
      value: "89,178",
    },
    {
      id: 2,
      label: "In Progress Transactions",
      value: "7,345",
    },
    {
      id: 3,
      label: "Completed Transactions",
      value: "50",
    },
  ];

  return (
    <div className="px-4 py-8 flex justify-center">
      <div className="w-full max-w-5xl">
        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item) => (
            <div
              key={item.id}
              style={{ fontFamily: "Outfit" }}
              className="bg-[#FAFAFA] p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 text-center"
            >
              <h3 className="text-gray-600 text-sm sm:text-base font-medium">
                {item.label}
              </h3>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
