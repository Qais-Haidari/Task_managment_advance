import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function Admin() {
  const [ID, setID] = useState("");
  const [Type, setType] = useState("");
  const [Min, setMin] = useState("");
  const [Max, setMax] = useState("");
  const [Expected, setExpected] = useState("");
  const [Question, setQuestion] = useState("");

  const Type_ = (e) => setType(e.target.value);
  const Min_ = (e) => setMin(e.target.value);
  const Max_ = (e) => setMax(e.target.value);
  const Expected_ = (e) => setExpected(e.target.value);
  const Question_ = (e) => setQuestion(e.target.value);

  let { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://10.0.0.146:5000/PrimaryTasks/Auth/one/${id}`)
      .then((res) => {
        setID(res.data.ID);
        setType(res.data.Type);
        setMin(res.data.MinValue);
        setMax(res.data.MaxValue);
        setExpected(res.data.ExptectedValue);
        setQuestion(res.data.Questions);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  const Update = () => {
    axios
      .post(`http://10.0.0.146:5000/PrimaryTaskAuth/update/${ID}`, {
        ID: ID,
        Type: Type,
        Min: Min,
        Max: Max,
        Expected: Expected,
        Question: Question,
      })
      .then((res) => {
        alert("Update");
        window.location.reload();
      })
      .catch((err) => {});
  };

  return (
    <>
      <Layout />
      <div>
        <div className="mx-8">
          <div class="py-5">
            <div className="w-full flex flex-wrap px-5 mt-2 shadow-xl rounded pb-2">
              <div className="mr-2">
                <p className="mb-2">Type</p>
                <div className="text-xs ">
                  <select
                    className="rounded-lg border-blue-600"
                    id="Type"
                    value={Type}
                    onChange={Type_}
                  >
                    <option></option>
                    <option>Attachement</option>
                    <option>Value</option>
                    <option>Yes/NO</option>
                  </select>
                </div>
              </div>
              <div className="mr-2">
                <p className="mb-2">Min Value</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Min"
                  type="text"
                  value={Min}
                  onChange={Min_}
                  placeholder="Min Value"
                />
              </div>
              <div className="mr-2">
                <p className="mb-2">Max Value</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Max"
                  type="text"
                  value={Max}
                  onChange={Max_}
                  placeholder="Max Value"
                />
              </div>
              <div className="mr-2">
                <p className="mb-2">Expected Value</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  focus:outline-none focus:shadow-outline"
                  id="Expected"
                  type="text"
                  value={Expected}
                  onChange={Expected_}
                  placeholder="Expected Value"
                />
              </div>
              <div className="mr-2">
                <p className="mb-2">Questions</p>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 4 focus:outline-none focus:shadow-outline"
                  id="Question"
                  type="text"
                  value={Question}
                  onChange={Question_}
                  placeholder="Questions"
                />
              </div>
              <div className="mr-2">
                <button
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-8 "
                  onClick={Update}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
