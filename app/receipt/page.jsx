"use client";
import { React, useState, useEffect } from "react";
import InputItems from "../InputItems";

export default function receipt() {
  const [receipt, setReceipt] = useState({
    tax: 0,
    sst: 0,
    total: 0,
    item: [],
  });
  const [person, setPerson] = useState([
    {
      id: 0,
      name: "",
      total: 0,
      items: [],
    },
  ]);
  const [formValues, setFormValues] = useState([
    {
      value: "",
      placeholder: 1,
    },
  ]);

  const [items, setItems] = useState([
    {
      id: 0,
      name: "",
      qty: 1,
      price: 0,
      total: 0,
      sharedby: 0,
    },
  ]);

  const handleChange = (e, index) => {
    e.preventDefault();
    const values = [...items];
    var targeted = e.target.name;
    values[index][targeted] = e.target.value;
    values[index]["total"] =
      Number(values[index]["price"]) * Number(values[index]["qty"]);
    // console.log("ni val tagett " + values[index]["total"]);
    setItems(values);
    setReceipt({
      ...receipt,
      item: values,
      total: Number(
        items.reduce((totals, item) => totals + Number(item.total), 0)
      ),
    });
    console.log(receipt);
  };

  useEffect(() => {
    setReceipt(receipt);
    console.log(receipt);
  }, [receipt]);

  const handleDeleteField = (e, index) => {
    const value = [...items];
    value.splice(index, 1);
    setItems(value);
    setReceipt({
      ...receipt,
      item: value,
      total: items.reduce((total, item) => total + Number(item.total), 0),
    });
  };

  useEffect(() => {
    var formValue = sessionStorage.getItem("formValues");
    var parsedFormValue = formValue ? JSON.parse(formValue) : null;

    if (JSON.stringify(formValues) !== JSON.stringify(parsedFormValue)) {
      setFormValues(parsedFormValue);
    }
    sessionStorage.setItem("sendBack", formValue);
  }, []);
  const transferData = async () => {
    let newPerson = [...person];
    for (let x in formValues) {
      newPerson[x] = {
        ...newPerson[x],
        id: x,
        name: formValues[x].value,
        total: 0,
        items: [],
      };
    }
    setPerson(newPerson);
    // console.log(person);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...items];
    values.push({
      id: values[values.length - 1].id + 1,
      name: "",
      qty: 1,
      price: 0,
      total: 0,
      sharedby: 0,
    });

    setItems(values);
  };
  useEffect(() => {
    transferData();
    // console.log(person);
  }, [formValues]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    var sendValues = JSON.stringify(receipt);
    var sendPerson = JSON.stringify(person);
    sessionStorage.setItem("sendReceipt", sendValues);
    sessionStorage.setItem("sendPerson", sendPerson);
    // console.log(sendPerson);
    window.location.href = "/select";
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24 bg-white">
      <div className="rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-[#F8ECF5]">
        <h2>List name:</h2>
        <ol>
          {person.map((obj) => (
            <li key={obj.id}>{obj.name}</li>
          ))}
        </ol>
      </div>
      <button onClick={() => (window.location.href = "/")}>Edit</button>

      <div className="rounded-lg border border-transparent px-5 transition-colors border-gray-300 bg-[#F9E1F2]">
        <h2>
          <b>Receipt:</b>
        </h2>
        <div className="flex flex-row right-3 gap-2 pb-1">
          <label className="pl-8"> Name:</label>
          <label className="pl-[66px]">price:</label>
          <label className="pl-6"> qty:</label>
          <label className="pl-6"> total:</label>
        </div>
        {items.map((obj, index) => (
          <InputItems
            key={index}
            objValue={obj}
            onChange={handleChange}
            index={index}
            placeholder={obj.id + 1}
            deleteField={handleDeleteField}
          />
        ))}
        <div className="flex flex-col">
          <div className="pl-8">
            <button className="" onClick={handleAddField}>
              + Add new item
            </button>
          </div>
          <div className="flex flex-row gap-1 justify-end pr-[19px]">
            <div className="flex flex-col justify-end gap-1">
              <label htmlFor="">Subtotal :</label>
              <label htmlFor="">Charges:</label>
              <label htmlFor="">SST :</label>
              <label htmlFor="">Total :</label>
            </div>
            <div className="flex flex-col gap-1">
              <input
                type="number"
                name="total"
                id=""
                className="w-[80px] border border-black px-1"
                placeholder="Total"
                value={receipt.total.toFixed(2)}
                onChange={(e) =>
                  setReceipt({ ...receipt, total: Number(e.target.value) })
                }
              />
              <input
                type="number"
                name="charges"
                className="w-[80px] border border-black px-[4px]"
                placeholder="Charge"
                onChange={(e) => {
                  setReceipt({
                    ...receipt,
                    tax: Number(e.target.value),
                  });
                }}
              />
              <input
                type="number"
                name="SST"
                id=""
                className="w-[80px] border border-black px-1"
                placeholder="SST"
                onChange={(e) => {
                  const sst = Number(e.target.value);
                  setReceipt({
                    ...receipt,
                    sst: sst,
                  });
                }}
              />
              <input
                type="number"
                className="w-[80px] border border-black px-1"
                placeholder="Total"
                value={parseFloat(
                  receipt.total + receipt.tax + receipt.sst
                ).toFixed(2)}
                readOnly
              />
            </div>
          </div>
        </div>
        <div className="ml-5 pb-4">
          <button
            className="bg-[#aa0671] hover:bg-[#eb49b3] text-white font-bold py-1 px-4 rounded-full w-[120px]"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
