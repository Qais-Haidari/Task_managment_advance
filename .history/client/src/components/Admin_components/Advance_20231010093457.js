import React, { useEffect, Fragment, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";

// import widget/custom components
import { StatRightTopIcon } from "widgets";

// import sub components
import { ActiveProjects, Teams, TasksPerformance } from "sub-components";

// import required data files
import ProjectsStatsData from "data/dashboard/ProjectsStatsData";

import { MomentDate, getCurrentTimeDashboard } from "../../Utils/Functions";

export default function Tasklist() {
  const [unAction, setunAction] = useState([]);
  // const [Complete, setComplete] = useState([]);
  const [TaskAuth, setTaskAuth] = useState([]);
  const [Department, setDepartment] = useState([]);
  const [Escalated, setEscalated] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:5000/task/dashboard/get/new/${MomentDate()}`)
      .then((res) => {
        setunAction(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    // axios
    //   .get(`http://localhost:5000/task/dashboard/complete/new/${MomentDate()}`)
    //   .then((res) => {
    //     setComplete(res.data);
    //   })
    //   .catch((err) => (document.body.innerHTML = err));
    axios
      .get(`http://localhost:5000/task/dashboard/AuthTask/new/${MomentDate()}`)
      .then((res) => {
        console.log(res.data);
        setTaskAuth(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios(
      `http://localhost:5000/task/dashboard/Department/${MomentDate()}/${getCurrentTimeDashboard()}`
    )
      .then((res) => {
        setDepartment(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
    axios
      .get(
        `http://localhost:5000/task/dashboard/Escalated/${MomentDate()}/${getCurrentTimeDashboard()}`
      )
      .then((res) => {
        setEscalated(res.data);
      })
      .catch((err) => (document.body.innerHTML = err));
  }, []);
  return (
    <>
      <Layout />
      <Fragment>
        <div className="bg-primary pt-10 pb-21"></div>
        <Container fluid className="mt-n22 px-6">
          <Row>
            <Col lg={12} md={12} xs={12}>
              {/* Page header */}
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="mb-2 mb-lg-0">
                    <h3 className="mb-0  text-white">Projects</h3>
                  </div>
                  <div>
                    <Link href="#" className="btn btn-white">
                      Create New Project
                    </Link>
                  </div>
                </div>
              </div>
            </Col>
            {ProjectsStatsData.map((item, index) => {
              return (
                <Col xl={3} lg={6} md={12} xs={12} className="mt-6" key={index}>
                  <StatRightTopIcon info={item} />
                </Col>
              );
            })}
          </Row>

          {/* Active Projects  */}
          <ActiveProjects />

          <Row className="my-6">
            <Col xl={4} lg={12} md={12} xs={12} className="mb-6 mb-xl-0">
              {/* Tasks Performance  */}
              <TasksPerformance />
            </Col>
            {/* card  */}
            <Col xl={8} lg={12} md={12} xs={12}>
              {/* Teams  */}
              <Teams />
            </Col>
          </Row>
        </Container>
      </Fragment>
    </>
  );
}
