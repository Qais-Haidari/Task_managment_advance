import React, { useEffect, useState } from "react";
import Layout from "../../App_1";
import axios from "axios";

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
      <>
        <Head>
          <title>{getPageTitle("Dashboard")}</title>
        </Head>
        <SectionMain>
          <SectionTitleLineWithButton
            icon={mdiChartTimelineVariant}
            title="Overview"
            main
          >
            <Button
              href="https://github.com/justboil/admin-one-react-tailwind"
              target="_blank"
              icon={mdiGithub}
              label="Star on GitHub"
              color="contrast"
              roundedFull
              small
            />
          </SectionTitleLineWithButton>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 mb-6">
            <CardBoxWidget
              trendLabel="12%"
              trendType="up"
              trendColor="success"
              icon={mdiAccountMultiple}
              iconColor="success"
              number={512}
              label="Clients"
            />
            <CardBoxWidget
              trendLabel="16%"
              trendType="down"
              trendColor="danger"
              icon={mdiCartOutline}
              iconColor="info"
              number={7770}
              numberPrefix="$"
              label="Sales"
            />
            <CardBoxWidget
              trendLabel="Overflow"
              trendType="warning"
              trendColor="warning"
              icon={mdiChartTimelineVariant}
              iconColor="danger"
              number={256}
              numberSuffix="%"
              label="Performance"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="flex flex-col justify-between">
              {transactions.map((transaction: Transaction) => (
                <CardBoxTransaction
                  key={transaction.id}
                  transaction={transaction}
                />
              ))}
            </div>
            <div className="flex flex-col justify-between">
              {clientsListed.map((client: Client) => (
                <CardBoxClient key={client.id} client={client} />
              ))}
            </div>
          </div>

          <div className="my-6">
            <SectionBannerStarOnGitHub />
          </div>

          <SectionTitleLineWithButton
            icon={mdiChartPie}
            title="Trends overview"
          >
            <Button
              icon={mdiReload}
              color="whiteDark"
              onClick={fillChartData}
            />
          </SectionTitleLineWithButton>

          <CardBox className="mb-6">
            {chartData && <ChartLineSample data={chartData} />}
          </CardBox>

          <SectionTitleLineWithButton
            icon={mdiAccountMultiple}
            title="Clients"
          />

          <NotificationBar color="info" icon={mdiMonitorCellphone}>
            <b>Responsive table.</b> Collapses on mobile
          </NotificationBar>

          <CardBox hasTable>
            <TableSampleClients />
          </CardBox>
        </SectionMain>
      </>
      ) }
    </>
  );
}
