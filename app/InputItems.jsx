"use client";
import { React, useState } from "react";
export default function InputItems({
  objValue,
  onChange,
  index,
  placeholder,
  deleteField,
}) {
  const { item, name, qty, price } = objValue;

  return (
    <div className="input-group">
      <div className="flex flex-row gap-2 pb-2">
        <label className="w-3">{index + 1}. </label>
        <input
          className="border border-black p-1"
          placeholder={" Item " + placeholder}
          type={"text"}
          id={item}
          name="name"
          value={name}
          onChange={(e) => onChange(e, index)}
        />
        <input
          className="border border-black p-1 w-12"
          placeholder={" qty"}
          type={"number"}
          id={item}
          name="qty"
          value={qty}
          onChange={(e) => onChange(e, index)}
        />
        <input
          className="border border-black p-1 w-16 text-left"
          placeholder={" price"}
          type="number"
          id={item}
          name="price"
          value={price}
          onChange={(e) => onChange(e, index)}
        />
        <input
          className="border border-black p-1 w-16 text-left"
          placeholder={" Subtotal"}
          type="number"
          id={item}
          name="total"
          value={price * qty}
          onChange={(e) => onChange(e, index)}
        />
        <button onClick={(e) => deleteField(e, index)}>X</button>
      </div>
    </div>
  );
}
