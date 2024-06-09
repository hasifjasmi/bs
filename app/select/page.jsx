"use client";
import { React, useState, useEffect, useRef } from "react";
import Copy from "./copy";

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

  const [crossCheck, setCrossCheck] = useState(0);

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

  const ulRef = useRef(null);
  const copyListToClipboard = () => {
    const ulContent = ulRef.current.innerText;
    console.log(ulContent);
    navigator.clipboard.writeText(ulContent).then(
      () => {
        showSuccess();

        // reset to default state
        setTimeout(() => {
          resetToDefault();
        }, 2000);
      },
      (err) => {
        console.error("Failed to copy: ", err);
      }
    );
  };

  const [displaySuccess, setDisplaySuccess] = useState("hidden");
  const [displayDefault, setdisplayDefault] = useState("");

  const showSuccess = () => {
    setdisplayDefault("hidden");
    setDisplaySuccess("");
  };

  const resetToDefault = () => {
    setdisplayDefault("");
    setDisplaySuccess("hidden");
  };
  const calculateTotalPrice = () => {
    persons.forEach((persons) => {
      var totalPrice = 0.0;
      persons.items.forEach((item) => {
        totalPrice =
          totalPrice +
          Number(item.total) / Number(receipt.item[item.id].sharedby);
      });
      // console.log("Total Price: " + persons.name + " " + totalPrice);
      persons.total = Number(totalPrice);
    });
    // console.log(persons.total);
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

        // setReceipt({
        //   ...receipt,
        //   item: receipt.item.map((item) =>
        //     Number(item.id) == Number(curr.items[x].id)
        //       ? { ...item, sharedby: item.sharedby + 1 }
        //       : item
        //   ),
        // });
        console.log(Number(curr.items[x].id));
      }
    } catch (error) {}
    setDisplaySelected([]);
  };
  useEffect(() => {
    calculateTotalPrice();
  }, [persons]);

  const handleTotal = () => {
    const newTotal = persons.map((p) => p.total);
    setTotal(newTotal);
  };

  const numPersons = persons.length;
  const taxPerPerons = receipt.tax / numPersons;
  const sstPerPerson = receipt.sst / numPersons;

  const [total, setTotal] = useState([]);

  return (
    <div className="flex min-h-screen flex-col items-center gap-y-4 p-24 bg-[#FFFFFF]">
      <div className="flex flex-col rounded-lg w-96 justify-end p-2">
        <h2>Choose person:</h2>

        <div className="grid grid-cols-3 gap-6 justify-stretch pl-2 pr-2">
          {persons.map((obj) => (
            <button
              className=""
              key={obj.id}
              onClick={() => (setCurrentPerson(obj), handleColor())}
            >
              <p className={`bg-[#aa0671] text-white rounded-md`}>{obj.name}</p>
            </button>
          ))}
        </div>
        <div className="p-5 text-center px-24">
          <div>Selected:</div>
          <div className="bg-[#F8ECF5] rounded-lg">
            {currentPerson ? currentPerson.name : "None selected"}
          </div>
        </div>
      </div>

      <div
        className="
        "
      >
        Selected Items:
        <div className="bg-[#F8ECF5] rounded-lg ">
          <div className="text-center">
            {displaySelected && displaySelected.length ? (
              displaySelected.map((str) => (
                <div
                  key={str.id}
                  className="flex flex-row justify-center items-center"
                >
                  <p className="flex">{str} </p>
                  <button
                    onClick={() => {
                      console.log(currentPerson.items);
                      setCurrentPerson((prevState) => ({
                        ...prevState,
                        items: prevState.items.filter(
                          (item) => item.name !== str
                        ),
                      }));
                      setDisplaySelected((prevState) =>
                        prevState.filter((item) => item !== str)
                      );
                    }}
                    className="flex relative left-14"
                  >
                    <svg
                      class="h-4 w-4 text-slate-900"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <path d="M21 4H8l-7 8 7 8h13a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z" />{" "}
                      <line x1="18" y1="9" x2="12" y2="15" />{" "}
                      <line x1="12" y1="9" x2="18" y2="15" />
                    </svg>
                  </button>
                </div>
              ))
            ) : (
              <p>None selected</p>
            )}
          </div>
        </div>
        <div className="flex flex-col">
          {receipt.item.map((ite) => (
            <button
              className="m-1 flex flex-row gap-3 bg-[#E2BED5] rounded-lg p-2"
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
      <button
        className="bg-[#AA0671] text-white rounded-lg px-7"
        onClick={setCurrentPersontoArr}
      >
        Enter
      </button>
      <div className="bg-[#F9E1F2] p-9 w-72 rounded-lg">
        <div className="flex flex-row gap-28">
          <b>Receipt</b>
          <button className="copy-button" onClick={copyListToClipboard}>
            <span
              id="default-message"
              class={`inline-flex items-center ${displayDefault}`}
            >
              <svg
                class="w-3 h-3 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
              <span class="text-xs font-semibold">Copy</span>
            </span>
            <span
              id="success-message"
              class={`${displaySuccess} inline-flex items-center`}
            >
              <svg
                class="w-3 h-3 text-blue-700 dark:text-blue-500 me-1.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span class="text-xs font-semibold text-blue-700 dark:text-blue-500">
                Copied
              </span>
            </span>
          </button>
        </div>

        <div ref={ulRef}>
          {persons.map((persons) => (
            <div className="content-center" key={persons.id}>
              <h3>
                {Number(persons.id) + 1}.{persons.name}
              </h3>
              <ul>
                {persons.items.map((ite) => (
                  <li key={ite.id}>
                    <div className="flex flex-row">
                      &nbsp;&nbsp;&nbsp;&nbsp;{ite.name}{" "}
                      {parseFloat(
                        ite.total / receipt.item[ite.id].sharedby
                      ).toFixed(2)}
                      {/* {console.log(ite)} */}
                    </div>
                  </li>
                ))}
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;Tax: RM {taxPerPerons.toFixed(2)}
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;SST: RM {sstPerPerson.toFixed(2)}
                </li>
                <li>
                  &nbsp;&nbsp;&nbsp;&nbsp;Total: RM
                  {parseFloat(
                    total[persons.id] + taxPerPerons + sstPerPerson
                  ).toFixed(2) || 0}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
