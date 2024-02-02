import React, { useEffect, useState } from "react";
import Layout from "../App_1";
import axios from "axios";
import ImageZoom from "react-image-zooom";

export default function MonitorDashboardAuth({ ID, User }) {
    const [unAction, setunAction] = useState([]);
    const [Feedback, setFeedback] = useState("");
    const [IC, setIC] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:5000/User/2ic/${User}`)
      .then((res) => {
        setIC(res.data.IC);
      })
      .catch((err) => (document.body.innerHTML = err));
    
      axios
      .get(`http://localhost:5000/Auth/MD/${ID}`)
      .then((res) => {
        setunAction(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  const Feedback_ = (e) => setFeedback(e.target.value);
  const Accpet = (a, b) => {
    axios
      .post(`http://localhost:5000/AuthUpdateApprove/${b}/${a}`, {})
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  const Reject = (a, b) => {
    axios
      .post(`http://localhost:5000/AuthUpdateFeedback/${a}/${b}`, {
        feeback: Feedback,
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});
  };
  console.log(unAction)
  return (
    <div>
        {unAction.map((r) => (
                <div className="flex mt-3" >
                    <div className="flex border p-2 " >
                    {r.Attachment === "Yes" ? (
                      <div className="image">
                        <ImageZoom
                          src={`http://localhost:5000/${r.AttachmentPath}`}
                          alt="Zoom-images"
                          className="image"
                          zoom="300"
                        />
                      </div>
                    ) : (
                      <></>
                    )}
                    <p className="text-white text-xl ml-2 " >Submit Date<span className='text-black' >: {r.SubmitDate}</span></p>
                    { r.SubmitDate ? <><p className="text-white text-xl ml-2 " >Submitted<span className='text-black' >: Yes</span></p></> : <><p className="text-white text-xl ml-2 " >Submitted<span className='text-black' >: No</span></p></> }
                    <p className="text-white text-xl ml-2 " >Approve By<span className='text-black' >: {r.Approve_By}</span></p>
                    <p className="text-white text-xl ml-2 " >2IC<span className='text-black' >: {IC}</span></p>
                    <p className="text-white text-xl ml-2 " >Validation: <span className='text-black' >{r.Questions}</span></p>
                    <p className="text-white text-xl ml-2 " >AdminApproved: <span className='text-black' >{r.isAdminApproved}</span></p>
                    <p className="text-white text-xl ml-2 " >UserSubmit: <span className='text-black' >{r.isUserSubmit}</span></p>
                    {r.isUserSubmit === "NO" ? (
                      <></>
                    ) : (
                      <div>
                        <input
                        type="text"
                      placeholder="Feedback..."
                      className=" h-9"
                      onChange={Feedback_}
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9"
                      value={r.ID}
                      id="HIdden"
                    />
                    <input
                      type="hidden"
                      placeholder="Feedback..."
                      className=" h-9 mt-2"
                      value={r.Task_ID}
                      id="HIdden_Task_ID"
                    />
                    <div>
                      <button
                        onClick={() => Accpet(r.Task_ID, r.ID)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => Reject(r.ID)}
                        className="bg-red-500 ml-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Reject
                      </button>
                      </div>
                      </div>
                    )}
                    </div>
                    </div>
                ))}
    </div>
  )
}