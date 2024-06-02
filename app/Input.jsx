"use client";
import { React, useState } from "react";
export default function Input({
  objValue,
  onChange,
  index,
  placeholder,
  deleteField,
}) {
  const { label, type, value } = objValue;

  return (
    <div className="input-group">
      <div className="flex flex-row gap-2">
        <label className="w-3">{index + 1}. </label>
        <input
          className="border border-black p-1"
          placeholder={" Person " + placeholder}
          type={"text"}
          id={label}
          value={value}
          onChange={(e) => onChange(e, index)}
          autoFocus
        />
        <div onClick={(e) => deleteField(e, index)}>X</div>
      </div>
    </div>
  );
}
