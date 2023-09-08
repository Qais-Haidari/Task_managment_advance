import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentDate } from "../../Utils/Functions";
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
}) {
  // =====================================================
  // Upload Image
  const [image, setImage] = useState({ preview: "", data: "" });
  const [status, setStatus] = useState("");
  const filename = Math.floor(Math.random() * 10000000) + ".png";
  const handleSubmit = (e) => {
    let formData = new FormData();
    formData.append("file", image.data, filename);
    axios
      .post(
        `http://localhost:5000/image/${ID}/${Task_ID}/${filename}/${getCurrentDate()}/${localStorage.getItem(
          "First_Name"
        )}`,
        formData,
        {
          onUploadProgress: (ProgressEvent) => {
            console.log(ProgressEvent.progress * 100);
          },
          headers: {
            "Custom-header": "value",
          },
        }
      )
      .then((res) => {
        return redirect("/tasklist");
      })
      .then((data) => {});
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
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
      .post(`http://localhost:5000/AuthUpdateValue/${ID}/${Task_ID}`, {
        Value: Value,
        Date: getCurrentDate(),
        ActionedBy: localStorage.getItem("First_Name"),
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };

  // =====================================================

  // =====================================================
  // YES/NO

  const [Yes, setYes] = useState("");
  const Yes_ = (e) => {
    setYes(e.target.value);
  };
  const YesNoAction = () => {
    if (Yes === "") {
      alert("Please select Yes Or No");
    } else {
      axios
        .post(`http://localhost:5000/AuthUpdateYes/${ID}/${Task_ID}`, {
          Value: Yes,
          Date: getCurrentDate(),
          ActionedBy: localStorage.getItem("First_Name"),
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {});
    }
  };
  // =====================================================

  if (Type === "Attachement") {
    return (
      <div className="m-5">
        <details class="group border p-3 sm:w-64 lg:w-full">
          <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="text-green-600 text-md">{Questions}</span>
            <span class="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
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
          <div className="flex-col flex">
            <form onSubmit={handleSubmit}>
              <input
                type="file"
                name="file"
                onChange={handleFileChange}
              ></input>
              <button
                type="submit"
                className="bg-blue-500 sm:mt-2 lg:mt-0 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit
              </button>
            </form>
            {process.started && <progress max='100' value={progress.pc}></progress>}
            {process.started && <span>{msg}</span>}
          </div>
        </details>
      </div>
    );
  } else if (Type === "Yes/NO") {
    return (
      <div className="m-5">
        <details class="group border p-3 sm:w-64 lg:w-full">
          <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="text-green-600 text-md">{Questions}</span>
            <span class="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
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
            <select onClick={Yes_}>
              <option>Yes</option>
              <option>No</option>
            </select>
            <button
              onClick={YesNoAction}
              class="bg-blue-500 mt-2 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Action
            </button>
          </div>
        </details>
      </div>
    );
  } else {
    return (
      <div className="m-5">
        <details class="group border p-3 sm:w-64 lg:w-full">
          <summary class="flex justify-between items-center font-medium cursor-pointer list-none">
            <span className="text-green-600 text-md">{Questions}</span>
            <span class="transition group-open:rotate-180">
              <svg
                fill="none"
                height="24"
                shape-rendering="geometricPrecision"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M6 9l6 6 6-6"></path>
              </svg>
            </span>
          </summary>
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
          <div className="flex-col flex">
            <input
              type="text"
              className="mt-3 h-7 max-w-lg"
              onChange={Value_}
            />
            <button
              onClick={ValueAction}
              class="bg-blue-500 mt-2 w-32 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Action
            </button>
          </div>
        </details>
      </div>
    );
  }
}
