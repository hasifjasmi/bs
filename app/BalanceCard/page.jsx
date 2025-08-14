"use client";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";

const BalanceCard = forwardRef((props, ref) => {
  // Initialize with complete data structure
  const [data, setData] = useState({
    balance: {},
    haventPaid: {},
    budget: {},
    spends: [],
  });

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxVFhuAEwOCZn8eMDg1HanYI5Ss25yZdTCqB9xm_qqpVRzyWWyKLHAl1TqUYrVWZsvrBQ/exec"
      );
      const result = await res.json();
      console.log("BalanceCard fetched data:", result); // Debug log
      setData(result);
    } catch (error) {
      console.error("Error fetching data in BalanceCard:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    fetchData,
  }));

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardTitle className="p-4 text-lg">Balance</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            {Object.entries(data.balance || {}).map(([category, amount]) => {
              const budget = data.budget?.[category] || 0;
              const percentageLeft = budget > 0 ? (amount / budget) * 100 : 0;

              let textColor = "text-green-600";
              if (percentageLeft <= 20) {
                textColor = "text-red-600";
              } else if (percentageLeft <= 50) {
                textColor = "text-yellow-600";
              }

              return (
                <React.Fragment key={category}>
                  <span className="text-gray-600">{category}</span>
                  <span className={`text-right font-semibold ${textColor}`}>
                    RM {Number(amount).toFixed(2)}
                  </span>
                </React.Fragment>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardTitle className="p-4 text-lg">Havent Paid</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            {Object.entries(data.haventPaid || {}).map(([category, amount]) => (
              <React.Fragment key={category}>
                <span className="text-gray-600">{category}</span>
                <span className="text-right">
                  {Number(amount) === 0 ? (
                    <span className="text-green-600 font-semibold">
                      All paid.
                    </span>
                  ) : (
                    `RM ${Number(amount).toFixed(2)}`
                  )}
                </span>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

BalanceCard.displayName = "BalanceCard";

export default BalanceCard;
