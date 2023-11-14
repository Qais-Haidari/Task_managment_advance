import React, { useState } from "react";
import Layout from "../App_1";
import Converter from "react-json-to-csv";
import axios from "axios";
import ImageZoom from "react-image-zooom";
import * as XLSX from "xlsx";

export default function Report() {
  const [Date, setDate] = useState("");
  const [IsLoaded, setISLoaded] = useState(false);
  const [from, setFrom] = useState("");
  const [To, setTo] = useState("");
  const click = (e) => {
    if (!from) {
      alert("PLEASE SELECT DATE");
    } else {
      axios
        .get(`http://10.0.0.112:5000/RDATA/${from} ${To}`)
        .then((res) => {
          setDate(res.data);
          setISLoaded(true);
        })
        .catch((err) => alert("ERROR"));
    }
  };
  console.log(Date);
  const downloadExcel = (data) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, `${from}.xlsx`);
  };
  return (
    <div>
      <Layout />
      <div className="flex justify-center">
        <div className="text-center mr-2">
          <p className="my-3 text-lg">Pick Date</p>
          <input
            type="date"
            className="rounded max-w-xl"
            onChange={(e) => setFrom(e.target.value)}
          />
        </div>
        <div className="text-center">
          <p className="my-3 text-lg">Pick Date</p>
          <input
            type="date"
            className="rounded max-w-xl"
            onChange={(e) => {
              setTo(e.target.value);
            }}
          />
        </div>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => click()}
      >
        click
      </button>
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        onClick={() => downloadExcel(Date)}
      >
        Download As Excel
      </button> */}
      {IsLoaded === true ? (
        Date.map((r) => (
          <div className="items-center p-4 border max-w-3xl mt-2 ml-6 rounded-md">
            <p>
              {" "}
              <span className=" text-green-600">Short </span>description:{" "}
              {r[0].Short_description}
            </p>
            <p>
              {" "}
              <span className=" text-green-600">Summary:</span> {r[0].Summary}
            </p>
            <p>
              {" "}
              <span className=" text-green-600">Priority:</span> {r[0].Priority}
            </p>
            <p className="text-center"> Task Auth</p>
            {r[1].data.map((r) => (
              <div className="flex mt-2 border rounded-md p-2">
                <div>
                  <p> Type: {r.Type}</p>
                  <p> Question: {r.Questions}</p>
                  <p> Response: {r.Value}</p>
                  <p> ActionedBy: {r.ActionedBy}</p>
                  <p> SubmitDate: {r.SubmitDate}</p>
                </div>
                <div>
                  {r.Attachment === "Yes" ? (
                    <div className="image">
                      <ImageZoom
                        src={require(`../Image/${r.AttachmentPath}`)}
                        alt="Zoom-images"
                        className="image"
                        zoom="300"
                      />
                    </div>
                  ) : (
                    <p>Value: {r.Value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
}
