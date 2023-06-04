import React from "react";
import "./SuperAdmin.css";
import { event_banner_path, nameMap } from "../details";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import { useState, useEffect } from "react";
import { useAppData } from "../AppContext/AppContext";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

function SuperAdmin() {
  const [{}, dispatch] = useAppData();
  const [count, setCount] = useState(0);
  const [regCount, setRegC] = useState(0);
  const [regCA, setCA] = useState(0);

  const [bill, setBill] = useState(0);

  const getTotal = async () => {
    let total = 0;
    const res = await getDocs(collection(db, "Registrations"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    regs.map((r) => {
      total += Number(r.amount);
    });
    setBill(total);
  };

  const [regArr, setRegArr] = useState({
    reg: [],
    college: [],
  });
  const [e, setE] = useState({});

  const [list, setList] = useState(false);

  const [events, setEvents] = useState([]);

  const getRegInfo = async (_id) => {
    const data = await getDoc(doc(db, "Events", _id));
    const res = await getDocs(collection(db, "Registrations"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const req = regs.filter((reg) => {
      return reg.id.includes(_id);
    });

    let temp = [];

    for (let i = 0; i < req.length; i++) {
      const _more = await getDoc(doc(db, "users", req[i].userid));
      temp.push(_more.data().college);
    }

    setRegArr({
      reg: req,
      college: temp,
    });
    setE(data.data());
  };

  const getUsers = async () => {
    const userData = await getDocs(collection(db, "users"));
    const res = userData.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    res.sort((a, b) => {
      return b.refcount - a.refcount;
    });

    for (let i = 1; i <= 5; i++) {
      await updateDoc(doc(db, "CALeaderboard", `0${i}`), {
        name: res[i - 1].name,
        score: res[i - 1].refcount,
      });
    }
    alert("Updated");
  };

  const getCount = async () => {
    const res = await getDocs(collection(db, "users"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCount(regs.length);
  };

  const getRegCount = async () => {
    const res = await getDocs(collection(db, "Registrations"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setRegC(regs.length);
  };

  const getCACount = async () => {
    const res = await getDocs(collection(db, "CAMap"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setCA(regs.length);
  };

  const getEvents = async () => {
    const res = await getDocs(collection(db, "EventRegs"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setEvents(regs);
  };

  useEffect(() => {
    getCount();
    getRegCount();
    getCACount();
    getEvents();
  }, []);

  const get = (id) => {
    getRegInfo(id);
    setList(true);
  };

  return (
    <div className="super">
      <div className="panel">
        <div className="regs">
          <p>
            Users <strong>{count}</strong>
          </p>
          <p>
            Registrations <strong>{regCount}</strong>
          </p>
          <p>
            Ambassadors <strong>{regCA}</strong>
          </p>
          <p>
            Total <strong>{bill}</strong>
          </p>
        </div>
        <button style={{ width: "150px", height: "40px" }} onClick={getTotal}>
          Total fee
        </button>
        <div className="info">
          <table className="reg-list" style={{ maxWidth: "500px" }}>
            <thead>
              <tr className="tr-head">
                <th>Event ID</th>
                <th>Event Name</th>
                <th>Registrations</th>
              </tr>
            </thead>
            <tbody>
              {events.map((e, i) => (
                <tr>
                  <td
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      get(i + 1 >= 10 ? `NK0${i + 1}` : `NK00${i + 1}`)
                    }
                  >
                    {i + 1 >= 10 ? `NK0${i + 1}` : `NK00${i + 1}`}
                  </td>
                  <td>
                    {nameMap[i + 1 >= 10 ? `NK0${i + 1}` : `NK00${i + 1}`]}
                  </td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {e.registrations.length}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button onClick={getUsers}>Refresh leaderboard</button>
      </div>

      {list && (
        <div className="list">
          <button
            onClick={() => {
              setList(false);
            }}
            className="close"
          >
            X
          </button>
          <p className="head">Registrations</p>
          <ReactHTMLTableToExcel
            buttonText="Download &#8681;"
            filename={`${e.name}-${e.eventid}`}
            sheet={e.name}
            table="export-table"
            className="export-button"
          />
          <table className="reg-list" id="export-table">
            <thead>
              <tr className="tr-head">
                <th>Slno</th>
                <th>Name</th>
                <th>College</th>
                <th>Whatsapp</th>
                <th>Payment ID</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Refferal Code</th>
                <th>Team status</th>
              </tr>
            </thead>

            <tbody>
              {regArr.reg.map((r, i) => (
                <tr
                  style={
                    r.amount < e.regfee
                      ? { backgroundColor: "#ff9494", opacity: "60%" }
                      : {}
                  }
                >
                  <td>{i + 1 < 10 ? `0${i + 1}` : i}</td>
                  <td>{r.username}</td>
                  <td>{regArr.college[i]}</td>
                  <td>{r.whatsapp}</td>
                  <td>{r.payment_id}</td>
                  <td>{r.method}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {r.amount}
                  </td>
                  <td>{r.refcode == "" ? "Nil" : r.refcode}</td>
                  <td>{r.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default SuperAdmin;
