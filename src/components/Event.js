import React, { useEffect, useState } from "react";
import { useAppData } from "../AppContext/AppContext";
import { event_banner_path, nameMap } from "../details";
import { GrRefresh } from "react-icons/gr";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { db } from "../Firebase/config";
import { useForm } from "react-hook-form";
import "./Event.css";

function Event() {
  const [{ event: e }, dispatch] = useAppData();
  const [refresh, setRefresh] = useState(false);
  const [count, setCount] = useState(0);
  const [list, setList] = useState(false);

  const [regArr, setRegArr] = useState({
    reg: [],
    college: [],
    NKID: [],
    spotregs: [],
    email: [],
  });

  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight,
  });

  const sizeUpdate = () => {
    setSize({
      w: window.innerWidth,
      h: window.innerHeight,
    });
  };

  useEffect(() => {
    window.addEventListener("resize", sizeUpdate);
    return () => {
      window.removeEventListener("resize", sizeUpdate);
    };
  }, [size]);

  const defaults = {
    headName: e.headName,
    headPhno: e.headPhno,
    sh1n: e.sub1Name,
    sh1p: e.sub1Phno,
    sh2n: e.sub2Name,
    sh2p: e.sub2Phno,
    descr: e.description,
    rules: e.rules,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: defaults,
  });

  const getRegs = async () => {
    const res = await getDoc(doc(db, "EventRegs", e.eventid));
    setCount(res.data().registrations.length);
  };

  const getRegInfo = async () => {
    const res = await getDocs(collection(db, "Registrations"));
    const spot = await getDocs(collection(db, "SpotData"));

    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    const Spotregs = spot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

    const Spotreq = Spotregs.filter((reg) => {
      return reg.id.includes(e.eventid);
    });

    const req = regs.filter((reg) => {
      return reg.id.includes(e.eventid);
    });

    let temp = [];
    let tempID = [];
    let tempmail = [];

    for (let i = 0; i < req.length; i++) {
      const _more = await getDoc(doc(db, "users", req[i].userid));
      temp.push(_more.data().college);
      tempID.push(_more.data().NKID);
      tempmail.push(_more.data().email);
    }
    setRegArr({
      reg: req,
      college: temp,
      NKID: tempID,
      spotregs: Spotreq,
      email: tempmail,
    });
  };

  const update = async (data) => {
    await updateDoc(doc(db, "Events", e.eventid), {
      headName: data.headName,
      headPhno: data.headPhno,
      sub1Name: data.sh1n,
      sub1Phno: data.sh1p,
      sub2Name: data.sh2n,
      sub2Phno: data.sh2p,
      description: data.descr,
      rules: data.rules,
    });
    alert("Event details updated");
  };

  useEffect(() => {
    getRegs();
    getRegInfo();
  }, [refresh]);
  return (
    <div className="event">
      <button
        className="logout"
        onClick={() => {
          dispatch({
            type: "SET_E",
            e: null,
          });
        }}
      >
        Logout
      </button>
      <div className="left">
        <img src={event_banner_path[e.eventid]} alt="" />
      </div>
      <div className="right">
        <div className="details">
          <div className="sub">
            <h1>{e.name}</h1>
            <p className="id">
              Event ID <strong>{e.eventid}</strong>
            </p>
            <p className="cat-tags">
              {e.category} | {e.subcategory}
            </p>
            <p className="count">
              Total registrations : <strong>{count}</strong>/{e.spots + count}{" "}
              {count > 0 ? (
                <button
                  className="view"
                  onClick={() => {
                    if (size.w > 720) {
                      setList(true);
                    } else {
                      alert(
                        "To view detailed registration info you must be on a Desktop or Laptop device"
                      );
                    }
                  }}
                >
                  View Registrations
                </button>
              ) : (
                <></>
              )}
            </p>
          </div>
          <form className="data-form" onSubmit={handleSubmit(update)}>
            <label>Head name</label>
            <input
              type="text"
              placeholder="Head name"
              {...register("headName")}
            />
            <label>Head Phone</label>
            <input
              type="text"
              placeholder="Head name"
              {...register("headPhno")}
            />

            <label>Subhead name</label>
            <input
              type="text"
              placeholder="Subhead name"
              {...register("sh1n")}
            />
            <label>Subhead Phone</label>
            <input
              type="text"
              placeholder="Subhead phno"
              {...register("sh1p")}
            />

            <label>Subhead name</label>
            <input
              type="text"
              placeholder="Subhead name"
              {...register("sh2n")}
            />
            <label>Subhead Phone</label>
            <input
              type="text"
              placeholder="Subhead phno"
              {...register("sh2p")}
            />

            <label>Description</label>
            <textarea placeholder="Description" {...register("descr")} />

            <label>Rules</label>
            <textarea placeholder="Rules" {...register("rules")} />

            <input type="submit" className="button" />
          </form>
        </div>
      </div>

      {list && (
        <div className="list">
          <button onClick={() => setRefresh(!refresh)} className="refresh">
            <GrRefresh />
          </button>
          <button onClick={() => setList(false)} className="close">
            X
          </button>
          <p className="head">Registrations</p>
          <ReactHTMLTableToExcel
            buttonText="Download &#8681;"
            filename={`${e.name}-${e.eventid}`}
            sheet={e.name}
            table="export-event-table"
            className="export-button"
          />
          <table className="reg-list" id="export-event-table">
            <thead>
              <tr className="tr-head">
                <th>Slno</th>
                <th>Name</th>
                <th>Email</th>
                <th>NKID</th>
                <th>College</th>
                <th>Whatsapp</th>
                <th>Payment ID</th>
                <th>Payment Method</th>
                <th>Amount</th>
                <th>Team status</th>
              </tr>
            </thead>

            <tbody>
              {regArr.reg.map((r, i) => (
                <tr
                  style={
                    r.amount < e.regfee && r.amount != 0
                      ? { backgroundColor: "#ff9494", opacity: "60%" }
                      : {}
                  }
                >
                  <td>{i + 1 >= 10 ? i + 1 : `0${i + 1}`}</td>
                  <td>{r.username}</td>
                  <td>{regArr.email[i]}</td>
                  <td>{regArr.NKID[i]}</td>
                  <td>{regArr.college[i]}</td>
                  <td>{r.whatsapp}</td>
                  <td>{r.payment_id}</td>
                  <td>{r.method}</td>
                  <td style={{ color: "green", fontWeight: "bold" }}>
                    {r.amount}
                  </td>
                  <td>{r.team}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {regArr.spotregs.length > 0 ? (
            <>
              <h1 className="head">Spot Registrations</h1>
              <table className="reg-list">
                <thead>
                  <tr className="tr-head">
                    <th>Slno</th>
                    <th>Name</th>
                    <th>College</th>
                    <th>Whatsapp</th>
                    <th>Amount</th>
                    <th>Receipt Number</th>
                  </tr>
                </thead>

                <tbody>
                  {regArr.spotregs.map((r, i) => (
                    <tr
                      style={{
                        backgroundColor: "rgb(37 211 102)",
                        borderBottom: "1px solid black",
                        color: "black",
                        fontWeight: "600",
                      }}
                    >
                      <td>{i + 1 >= 10 ? i + 1 : `0${i + 1}`}</td>
                      <td>{r.username}</td>
                      <td>{r.college}</td>
                      <td>{r.whatsapp}</td>
                      <td>{r.amount}</td>
                      <td>{r.receiptno}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          ) : (
            <></>
          )}
        </div>
      )}
      {list && <div className="list-mobile">vbydsyvdivbdbvbi</div>}
    </div>
  );
}

export default Event;
