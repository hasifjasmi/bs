"use client";

import { useState, useRef } from "react";
import BalanceCard from "../BalanceCard/page";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

const categories = ["Savings", "Food", "Commitments", "Kahwin", "Misc"];

export default function Form() {
  const [data, setData] = useState({ category: "", amount: "", remarks: "" });
  const [showSuccess, setShowSuccess] = useState(false);
  const balanceRef = useRef(null);

  const handleChange = (name, value) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000); // Hide success message after 3 seconds
    e.preventDefault();

    await fetch(
      "https://script.google.com/macros/s/AKfycbxVFhuAEwOCZn8eMDg1HanYI5Ss25yZdTCqB9xm_qqpVRzyWWyKLHAl1TqUYrVWZsvrBQ/exec",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    setData({ category: "", amount: "", remarks: "" });
    if (balanceRef.current) {
      balanceRef.current.fetchData(); // <- Call the internal function
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen px-4">
      <BalanceCard ref={balanceRef} />
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-6 bg-white p-6 rounded-xl shadow-md"
        >
          {/* Category */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={data.category}
              onValueChange={(val) => handleChange("category", val)}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Amount */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="amount">Amount (RM)</Label>
            <Input
              id="amount"
              type="number"
              step="1"
              placeholder="Enter amount"
              value={data.amount}
              onChange={(e) => handleChange("amount", e.target.value)}
              required
            />
          </div>

          {/* Remarks */}
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="remarks">Remarks</Label>
            <Input
              id="remarks"
              type="text"
              placeholder="Optional remarks"
              value={data.remarks}
              onChange={(e) => handleChange("remarks", e.target.value)}
              autoComplete="off"
            />
          </div>

          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              className="absolute left-[7%] md:left-[39%] z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="bg-green-100 border-green-300">
                <CheckCircle2Icon className="h-5 w-5 text-green-600" />
                <div>
                  <AlertTitle>Success! Input has been added</AlertTitle>
                  <AlertDescription>
                    Your transaction was saved successfully.
                  </AlertDescription>
                </div>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
