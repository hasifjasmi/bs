import React, { useState, useEffect } from "react";

const TopRecent = ({ data }) => {
  const [showCount, setShowCount] = useState(5);
  const [recentSpends, setRecentSpends] = useState([]);

  //   console.log("TopRecent received data:", data);

  // Process and sort spending data
  useEffect(() => {
    if (data && data.spends && Array.isArray(data.spends)) {
      // Sort by entryDateTime in descending order (most recent first)
      const sortedSpends = [...data.spends]
        .sort((a, b) => new Date(b.entryDateTime) - new Date(a.entryDateTime))
        .slice(0, showCount)
        .map((spend) => ({
          ...spend,
          amount: parseFloat(spend.amount) || 0, // Convert to number, default to 0 if NaN
        }));

      console.log("Processed spends:", sortedSpends);
      setRecentSpends(sortedSpends);
    }
  }, [data, showCount]);

  // Format date for display

  if (
    !data ||
    !data.spends ||
    !Array.isArray(data.spends) ||
    data.spends.length === 0
  ) {
    return (
      <div className="p-4 md:p-6 bg-gray-50 rounded-lg">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
          Recent Spending
        </h2>
        <p className="text-gray-600">No spending data available.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 bg-white rounded-lg shadow-lg">
      {/* Header with toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Recent Spending
        </h2>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            onClick={() => setShowCount(5)}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-sm md:text-base ${
              showCount === 5
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Top 5
          </button>
          <button
            onClick={() => setShowCount(10)}
            className={`flex-1 sm:flex-none px-3 md:px-4 py-2 rounded-md font-medium transition-colors text-sm md:text-base ${
              showCount === 10
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Top 10
          </button>
        </div>
      </div>

      {/* Mobile Card View - visible on small screens */}
      <div className="block md:hidden">
        <h3 className="text-base font-semibold text-gray-700 mb-3">
          Latest {showCount} Transactions
        </h3>
        <div className="space-y-3">
          {recentSpends.map((spend, index) => (
            <div key={spend.id} className="bg-gray-50 p-4 rounded-lg border">
              <div className="flex justify-between items-start mb-2">
                <span className="text-sm font-medium text-gray-500">
                  #{index + 1}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  RM{spend.amount.toFixed(2)}
                </span>
              </div>

              <div className="mb-2">
                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                  {spend.category}
                </span>
              </div>

              <div className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Date:</span> {spend.entryDateTime}
              </div>

              {spend.remarks && (
                <div className="text-sm text-gray-600">
                  <span className="font-medium">Remarks:</span> {spend.remarks}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Table View - hidden on small screens */}
      <div className="hidden md:block">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Latest {showCount} Transactions
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                  #
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Date & Time
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Category
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Amount
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left text-sm font-medium text-gray-900">
                  Remarks
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {recentSpends.map((spend, index) => (
                <tr key={spend.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                    {index + 1}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-900">
                    {spend.entryDateTime}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {spend.category}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-900">
                    RM{spend.amount.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">
                    {spend.remarks || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-4 md:mt-6 p-3 md:p-4 bg-blue-50 rounded-lg">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <span className="text-blue-800 font-medium text-sm md:text-base">
            Total for latest {showCount} transactions:
          </span>
          <span className="text-lg md:text-xl font-bold text-blue-900">
            RM
            {recentSpends
              .reduce((sum, spend) => sum + spend.amount, 0)
              .toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TopRecent;
