"use client";
import { forwardRef, useImperativeHandle, useState, useEffect } from "react";
import { Card, CardTitle, CardContent } from "@/components/ui/card";
import React from "react";
const TopRecent = forwardRef((props, ref) => {
  const [data, setData] = useState({ balance: {}, haventPaid: {} });

  const fetchData = async () => {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbxVFhuAEwOCZn8eMDg1HanYI5Ss25yZdTCqB9xm_qqpVRzyWWyKLHAl1TqUYrVWZsvrBQ/exec"
    ); // or your Web App URL
    const result = await res.json();
    setData(result);
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
            {Object.entries(data.balance).map(([category, amount]) => (
              <React.Fragment key={category}>
                <span className="text-gray-600">{category}</span>
                <span className="text-right">
                  RM {Number(amount).toFixed(2)}
                </span>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardTitle className="p-4 text-lg">Havent Paid</CardTitle>
        <CardContent>
          <div className="grid grid-cols-2 gap-y-2 text-sm">
            {Object.entries(data.haventPaid).map(([category, amount]) => (
              <React.Fragment key={category}>
                <span className="text-gray-600">{category}</span>
                <span className="text-right">
                  RM {Number(amount).toFixed(2)}
                </span>
              </React.Fragment>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

export default BalanceCard;
