"use client";
import { React, useState, useEffect } from "react";

export default function Select() {
  const useForceUpdate = () => {
    const [state, setState] = useState(0);
    return () => setState((state) => state + 1);
  };

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

  const [persons, setPersons] = useState([
    {
      id: 0,
      name: "",
      total: 0.0,
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
      setPersons(parsedPersonVal);
    }

    var receiptItem = sessionStorage.getItem("sendReceipt");
    var parsedReceiptItem = receiptItem ? JSON.parse(receiptItem) : null;

    if (JSON.stringify(receiptItem) !== JSON.stringify(parsedReceiptItem)) {
      setReceipt(parsedReceiptItem);
    }

    // ni untuk edit balik nama form
    // sessionStorage.setItem("sendBack", formValue);
  }, []);

  const [displaySelected, setDisplaySelected] = useState([]);

  const calculateTotalPrice = () => {
    persons.forEach((persons) => {
      var totalPrice = 0.0;
      persons.items.forEach((item) => {
        totalPrice =
          totalPrice +
          Number(item.total) / Number(receipt.item[item.id].sharedby);
      });
      console.log("Total Price: " + persons.name + " " + totalPrice);
      persons.total = Number(totalPrice);
    });
    console.log(persons.total);
    handleTotal();
  };
  const setCurrentPersontoArr = () => {
    try {
      const newPerson = [...persons]; // array untuk semua person
      const curr = currentPerson; // new object untuk masukkan dalam array
      newPerson[curr.id] = currentPerson; // masukkan ke array
      setPersons(newPerson); // set array
      for (let x in curr.items) {
        receipt.item[curr.items[x].id].sharedby++; // update sharedby for receipt array
        // console.log(receipt.item[curr.items[x].id].sharedby);
      }
    } catch (error) {}
    setDisplaySelected([]);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [persons]);

  // useEffect(() => {
  //   setCurrentPersontoArr();
  // }, [currentPerson]);

  const handleTotal = () => {
    const newTotal = persons.map((p) => p.total);
    setTotal(newTotal);
  };

  const [total, setTotal] = useState([]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24">
      <div className="rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30">
        <h2>List name:</h2>

        <div className="grid grid-cols-3 gap-3">
          {persons.map((obj) => (
            <button
              key={obj.id}
              onClick={() => (setCurrentPerson(obj), handleColor())}
            >
              <p className={`border-2 ${borderColor} rounded-md`}>{obj.name}</p>
            </button>
          ))}
        </div>
        <div>Selected: {currentPerson && currentPerson.name}</div>
      </div>

      <div
        className="rounded-lg border border-transparent px-5 py-4 transition-colors border-gray-300 bg-gray-100 dark:border-neutral-700 dark:bg-neutral-800/30
        "
      >
        <div>
          Selected Items:
          {displaySelected.map((str) => (
            <div key={str.id}>{str}</div>
          ))}
        </div>
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
              onClick={() => {
                setCurrentPerson({
                  ...currentPerson,
                  items: [
                    ...currentPerson.items,
                    {
                      id: ite.id,
                      name: ite.name,
                      qty: ite.qty,
                      price: ite.price,
                      total: ite.total,
                    },
                  ],
                });
                setDisplaySelected([...displaySelected, ite.name]);
              }}
            >
              <div className="w-3">{Number(ite.id) + 1}.</div>
              <div>{ite.name}</div>
              <div>x{ite.qty}</div>
              <div>RM{parseFloat(ite.total).toFixed(2)}</div>
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
        {persons.map((persons) => (
          <div key={persons.id}>
            <h3>
              {Number(persons.id) + 1}. {persons.name}
            </h3>
            <ul>
              {persons.items.map((ite) => (
                <li key={ite.id}>
                  &nbsp;&nbsp;&nbsp;&nbsp;{ite.name}{" "}
                  {parseFloat(
                    ite.total / receipt.item[ite.id].sharedby
                  ).toFixed(2)}
                  {console.log(ite)}
                </li>
              ))}
              <li>
                &nbsp;&nbsp;&nbsp;&nbsp;Total: RM
                {parseFloat(total[persons.id]).toFixed(2) || 0}
              </li>
            </ul>
          </div>
        ))}
      </div>
      <button onClick={setCurrentPersontoArr}>Submit</button>
    </div>
  );
}
