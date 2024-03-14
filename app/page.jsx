"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import Input from "./Input";
import myComponent from "./receipt/page";

const myC = (props) => <myComponent {...props} />;

export default function Home() {
  const [formValues, setFormValues] = useState([
    {
      value: "",
      placeholder: 1,
    },
  ]);

  const handleChange = (e, index) => {
    const values = [...formValues];
    values[index].value = e.target.value;
    setFormValues(values);
  };

  const handleAddField = (e) => {
    e.preventDefault();
    const values = [...formValues];
    values.push({
      value: "",
      placeholder: values.length + 1,
    });

    setFormValues(values);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const newNames = formValues.map((obj) => obj.value);
    // setNames(newNames);
    var sendValues = JSON.stringify(formValues);
    sessionStorage.setItem("formValues", sendValues);
    console.log(sendValues);
    window.location.href = "/receipt";
  };

  const handleDeleteField = (e, index) => {
    const value = [...formValues];
    value.splice(index, 1);
    setFormValues(value);
  };
  useEffect(() => {
    var formValue = sessionStorage.getItem("sendBack");
    if (formValue) {
      setFormValues(JSON.parse(formValue));
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="group rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
        <form action="receipt" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <div className="flex flex-col gap-1">
            {formValues.map((obj, index) => (
              <Input
                key={index}
                objValue={obj}
                onChange={handleChange}
                index={index}
                placeholder={obj.placeholder}
                deleteField={handleDeleteField}
              />
            ))}
          </div>

          <div className="center">
            <button className="add-btn" onClick={handleAddField}>
              Add new
            </button>
          </div>

          <button type="submit" className="submit-btn">
            Submit
          </button>
        </form>
      </div>
      <ul type="1">
        {formValues.map(
          (obj, index) =>
            obj.value && (
              <li key={index}>
                {index + 1}. {obj.value}
              </li>
            )
        )}
      </ul>
    </main>
  );
}
