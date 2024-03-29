"use client";
import { React, useState, useEffect } from "react";
export default function Select() {
  const [receipt, setReceipt] = useState({
    tax: 0,
    sst: 0,
    total: 0,
    item: [],
  });

  const [borderColor, setBorderColor] = useState("border-black");

  const handleColor = () => {
    if (borderColor === "border-black") {
      setBorderColor("border-blue-500");
    }
    if (borderColor === "border-blue-500") {
      setBorderColor("border-black");
    }
  };

  const [person, setPerson] = useState([
    {
      id: 0,
      name: "",
      total: 0,
      items: [],
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

  const [currentPerson, setCurrentPerson] = useState(null);

  useEffect(() => {
    var personVal = sessionStorage.getItem("sendPerson");
    var parsedPersonVal = personVal ? JSON.parse(personVal) : null;

    if (JSON.stringify(personVal) !== JSON.stringify(parsedPersonVal)) {
      setPerson(parsedPersonVal);
    }

    var receiptItem = sessionStorage.getItem("sendReceipt");
    var parsedReceiptItem = receiptItem ? JSON.parse(receiptItem) : null;

    if (JSON.stringify(receiptItem) !== JSON.stringify(parsedReceiptItem)) {
      setReceipt(parsedReceiptItem);
    }

    // ni untuk edit balik nama form
    // sessionStorage.setItem("sendBack", formValue);
  }, []);

  const setCurrentPersontoArr = () => {
    let newPerson = [...person];
    let curr = currentPerson;
    newPerson[curr.id] = currentPerson;
    setPerson(newPerson);
    for (let x in curr.items) {
      receipt.item[curr.items[x].id].sharedby++;
      console.log(receipt.item[curr.items[x].id].sharedby);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24">
      <div className="rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
        <h2>List name:</h2>

        <div className="grid grid-cols-3 gap-3">
          {person.map((obj) => (
            <button
              key={obj.id}
              onClick={() => (setCurrentPerson(obj), handleColor())}
            >
              <p className="border-2 border-black rounded-md">{obj.name}</p>
            </button>
          ))}
        </div>
      </div>
      <div
        className="rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30
        "
      >
        <div className="flex flex-col">
          {receipt.item.map((ite) => (
            <button
              className="m-1 flex flex-row gap-3"
              style={{
                border: `1px solid ${
                  receipt && receipt.item.id === ite.id ? "blue" : "black"
                }`,
              }}
              key={ite.id}
              onClick={() =>
                setCurrentPerson({
                  ...currentPerson,
                  items: [
                    ...currentPerson.items,
                    {
                      id: ite.id,
                      name: ite.name,
                      qty: ite.qty,
                      price: ite.price,
                    },
                  ],
                })
              }
            >
              <div className="w-3">{Number(ite.id) + 1}.</div>
              <div>{ite.name}</div>
              <div>x{ite.qty}</div>
              <div>RM{ite.price}</div>
              <div className="flex flex-row">
                <svg
                  style={{ width: "20px", height: "20px" }}
                  viewBox="0 0 20 20"
                >
                  <path d="M12.075,10.812c1.358-0.853,2.242-2.507,2.242-4.037c0-2.181-1.795-4.618-4.198-4.618S5.921,4.594,5.921,6.775c0,1.53,0.884,3.185,2.242,4.037c-3.222,0.865-5.6,3.807-5.6,7.298c0,0.23,0.189,0.42,0.42,0.42h14.273c0.23,0,0.42-0.189,0.42-0.42C17.676,14.619,15.297,11.677,12.075,10.812 M6.761,6.775c0-2.162,1.773-3.778,3.358-3.778s3.359,1.616,3.359,3.778c0,2.162-1.774,3.778-3.359,3.778S6.761,8.937,6.761,6.775 M3.415,17.69c0.218-3.51,3.142-6.297,6.704-6.297c3.562,0,6.486,2.787,6.705,6.297H3.415z"></path>
                </svg>
                {ite.sharedby}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        {person.map((obj) => (
          <div key={obj.id}>
            <h3>
              {Number(obj.id) + 1}. {obj.name}
            </h3>
            <ul>
              {obj.items.map((ite) => (
                <li key={ite.id}>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ite.name}{" "}
                  {ite.price / receipt.item[ite.id].sharedby}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={setCurrentPersontoArr}>Submit</button>
      <button onClick={() => console.log(person)}>tengok</button>
    </div>
  );
}
