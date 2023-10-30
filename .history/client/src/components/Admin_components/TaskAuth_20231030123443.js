import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { getCurrentDate, MomentDate } from "../../Utils/Functions";
import { redirect } from "react-router-dom";
import FormData from "form-data";
export default function TaskAuth({
  ID,
  Task_ID,
  Type,
  MinValue,
  MaxValue,
  ExptectedValue,
  Questions,
  Attachment,
  AttachmentPath,
  Feedback,
  Count,
}) {
  // =====================================================
  // Upload Image
  // const [image, setImage] = useState({ preview: "", data: "" });
  console.log(Count);
  const [status, setstatus] = useState("");
  const filename = MomentDate() + uuidv4() + ".png";
  const handleSubmit = (e) => {};

  const handleFileChange = (e) => {
    setstatus("loading ...");
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    // setImage(img);
    let formData = new FormData();
    formData.append("file", img.data, filename);
    fetch(
      `http://10.0.0.112:5000/image/${ID}/${Task_ID}/${filename}/${getCurrentDate()}/${localStorage.getItem(
        "First_Name"
      )}`,
      {
        method: "POST",
        body: formData,
      }
    ).then((res) => {
      setstatus("File Upload Done");
      if (Count > 1) {
        window.location.reload();
      } else {
        window.location.href = "/#/tasklist";
      }
    });
  };

  // =====================================================
  // Value
  const [Value, setValue] = useState("");
  const Value_ = (e) => {
    setValue(e.target.value);
  };

  const ValueAction = () => {
    if (Value === "") {
      alert("Please Fill a Form");
    } else {
      if (ExptectedValue !== "") {
        if (ExptectedValue !== Value) {
          alert("Your Input Not Match the Expected Value");
        } else {
          action();
        }
      } else if (MaxValue !== "" && MinValue !== "") {
        if ((Value < MinValue && Value > MaxValue) || Value === "1") {
          alert("Your Input Not Match the Min and Max Value");
        } else {
          action();
        }
      } else {
        action();
      }
    }
  };

  const action = () => {
    axios
      .post(`http://10.0.0.112:5000/AuthUpdateValue/${ID}/${Task_ID}`, {
        Value: Value,
        Date: getCurrentDate(),
        ActionedBy: localStorage.getItem("First_Name"),
      })
      .then((res) => {
        if (Count > 1) {
          window.location.reload();
        } else {
          window.location.href = "/#/tasklist";
        }
      })
      .catch((err) => {});
  };

  // =====================================================

  // =====================================================
  // YES/NO

  const Yes_ = (e) => {
    axios
      .post(`http://10.0.0.112:5000/AuthUpdateYes/${ID}/${Task_ID}`, {
        Value: e.target.value,
        Date: getCurrentDate(),
        ActionedBy: localStorage.getItem("First_Name"),
      })
      .then((res) => {
        // console.log(Count > 1);
        if (Count > 1) {
          window.location.reload();
        } else {
          window.location.href = "/#/tasklist";
        }
      })
      .catch((err) => {});
  };
  // =====================================================

  if (Type === "Attachement") {
    return (
      <div className="m-5">
        <h1 className="text-lg text-green-600">{Questions}</h1>
        {MinValue !== "" ? (
          <p className="text-xs mt-2">Min Value {MinValue}</p>
        ) : (
          <></>
        )}
        {MaxValue !== "" ? (
          <p className="text-xs mt-2">Max Value {MaxValue}</p>
        ) : (
          <></>
        )}
        {ExptectedValue !== "" ? (
          <p className="text-xs mt-2">Expected Value {ExptectedValue}</p>
        ) : (
          <></>
        )}
        {Feedback !== "" ? (
          <p className="text-xs mt-2">Feeback: {Feedback}</p>
        ) : (
          <></>
        )}
        <p>{status}</p>
        <div className="flex-col flex">
          <div>
            <input
              type="file"
              name="file"
              capture="environment"
              onChange={handleFileChange}
            ></input>
          </div>
        </div>
      </div>
    );
  } else if (Type === "Yes/NO") {
    return (
      <div className="m-5">
        <h1 className="text-lg text-green-600">{Questions}</h1>
        {MinValue !== "" ? (
          <p className="text-xs mt-2">Min Value {MinValue}</p>
        ) : (
          <></>
        )}
        {MaxValue !== "" ? (
          <p className="text-xs mt-2">Max Value {MaxValue}</p>
        ) : (
          <></>
        )}
        {ExptectedValue !== "" ? (
          <p className="text-xs mt-2">Expected Value {ExptectedValue}</p>
        ) : (
          <></>
        )}
        {Feedback !== "" ? (
          <p className="text-xs mt-2">Feeback: {Feedback}</p>
        ) : (
          <></>
        )}
        <div className="flex-col max-w-xs flex">
          <div class="flex items-center mb-4" className="mt-2">
            <input
              id="default-radio-1"
              type="radio"
              value="yes"
              onClick={Yes_}
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="mr-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Yes
            </label>
            <input
              id="default-radio-1"
              type="radio"
              onClick={Yes_}
              value="No"
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="mr-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              No
            </label>
            <input
              id="default-radio-1"
              type="radio"
              value="N/A"
              onClick={Yes_}
              name="default-radio"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="default-radio-1"
              class="mr-2 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              N/A
            </label>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="m-5">
        {MinValue !== "" ? (
          <p className="text-xs mt-2">Min Value {MinValue}</p>
        ) : (
          <></>
        )}
        {MaxValue !== "" ? (
          <p className="text-xs mt-2">Max Value {MaxValue}</p>
        ) : (
          <></>
        )}
        {ExptectedValue !== "" ? (
          <p className="text-xs mt-2">Expected Value {ExptectedValue}</p>
        ) : (
          <></>
        )}
        {Feedback !== "" ? (
          <p className="text-xs sm:text-md mt-2">Feeback: {Feedback}</p>
        ) : (
          <></>
        )}
        <div className="flex-col flex">
          <input type="text" className="mt-3 h-7 max-w-lg" onChange={Value_} />
          <button
            onClick={ValueAction}
            class="bg-blue-500 mt-2 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Action
          </button>
        </div>
      </div>
    );
  }
}
