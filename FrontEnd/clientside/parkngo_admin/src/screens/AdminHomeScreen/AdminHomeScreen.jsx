import {
  MdGroup,
  MdLocalParking,
  MdAttachMoney,
  MdStore,
  MdReport,
  MdApproval,
} from "react-icons/md";
import "./AdminHomeScreen.css";

import { occupancy_data } from "../../data/data";

import SimpleLineChart from "../../components/LineGraph";
import StatusItem from "../../components/StatusItem";
import MetricsItem from "../../components/MetricsItem";

export default function AdminHomeScreen() {
  const upTime = "19:00 12ip1i2";

  return (
    <>
      <div className="container-fluid" style={{ backgroundColor: "#f0f0f0" }}>
        <div
          className="row justify-content-around p-5"
          style={{ width: "90%", margin: "0 auto" }}
        >
          <h1 className="display-4 col">Dashboard</h1>
          <div
            className="border border-success rounded row justify-content-between align-items-center px-4 col-4"
            style={{ fontWeight: 700, fontSize: "1.8em" }}
          >
            <div className="text-primary col">
              <u>UP-Time</u>
            </div>
            <div className="text-success col">{upTime}</div>
          </div>
        </div>

        <div
          className="container border border-success rounded text-success"
          style={{ fontWeight: 700, fontSize: "1.5em" }}
        >
          <div className="text-primary text-center">Status</div>
          <div className="row justify-content-between">
            <StatusItem
              title="Backend"
              items={["Main Server", "Mailing Server"]}
            />
            <StatusItem title="Frontend" />
            <StatusItem title="Database" />
          </div>
        </div>
        {/* <br></br> */}
        <div
          className="container border border-success rounded text-success"
          style={{ fontWeight: 700, fontSize: "1.5em" }}
        >
          <div className="text-primary  text-center">Metrics</div>
          <div className="row justify-content-center">
            <MetricsItem
              itemIcon={<MdGroup />}
              topRowItem="b"
              bottomRowItem="Users"
            />
            <MetricsItem
              itemIcon={<MdLocalParking />}
              topRowItem="b"
              bottomRowItem="Lots"
            />
            <MetricsItem
              itemIcon={<MdStore />}
              topRowItem="b"
              bottomRowItem="Advertisers"
            />
            <MetricsItem
              itemIcon={<MdReport />}
              topRowItem="b"
              bottomRowItem="Complaints"
            />
            <MetricsItem
              itemIcon={<MdAttachMoney />}
              topRowItem="b"
              bottomRowItem="Revinue"
            />
          </div>
        </div>
        <div className="container border border-success rounded text-success">
          <div className="col  m-4 p-4 align-content-center">
            <div className="row">
              <div
                className="col-4 align-content-center"
                style={{ fontSize: "4em" }}
              >
                Approve
                <MdApproval />
              </div>
              <div className="col text-center">
                <div className="row">
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Lot&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;Manager&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                </div>
                <div className="row">
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        Advertiser
                      </button>
                    }
                    col="col"
                  />
                  <MetricsItem
                    topRowItem={
                      <button
                        className="btn btn-lg btn-warning col m-2"
                        style={{ fontSize: "2em" }}
                      >
                        &nbsp;&nbsp;&nbsp;Admin&nbsp;&nbsp;&nbsp;
                      </button>
                    }
                    col="col"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container border border-success rounded text-success">
          <div
            className="text-primary  text-center"
            style={{ fontWeight: 700, fontSize: "1.8em" }}
          >
            Peak Times
          </div>
          <SimpleLineChart data={occupancy_data} />
        </div>
      </div>
    </>
  );
}
