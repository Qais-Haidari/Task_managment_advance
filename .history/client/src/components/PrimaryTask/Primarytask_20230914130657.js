import React, { useState, useEffect } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Admin() {
  const [state, setstate] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/PrimaryTasks`)
      .then((res) => {
        setstate(res.data);
        console.log(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);

  
  return (
    // <>
    //   <Layout />
    <div>
      
    </div>
  </>
  );
}

