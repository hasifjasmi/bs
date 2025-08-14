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
      <div className="p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          Recent Spending
        </h2>
        <p className="text-gray-600">No spending data available.</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      {/* Header with toggle */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Recent Spending</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowCount(5)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              showCount === 5
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Top 5
          </button>
          <button
            onClick={() => setShowCount(10)}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              showCount === 10
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Top 10
          </button>
        </div>
      </div>

      {/* Table View */}
      <div>
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
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <div className="flex justify-between items-center">
          <span className="text-blue-800 font-medium">
            Total for latest {showCount} transactions:
          </span>
          <span className="text-xl font-bold text-blue-900">
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
