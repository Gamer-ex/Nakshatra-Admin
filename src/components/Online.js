import { collection, getDocs, setDoc, doc, getDoc } from "firebase/firestore";
import React, { useRef, useState } from "react";
import { db } from "../Firebase/config";
import { GoVerified } from "react-icons/go";
import "./Online.css";
import { event_banner_path } from "../details";

function Online() {
  const [id, setID] = useState("");
  const [regArr, setRegArr] = useState([]);
  const [list, setList] = useState(false);
  const [vis, setVis] = useState(true);
  const [userID, setuserID] = useState("");
  const search = useRef("");

  const fetchData = async () => {
    try {
      const uid = await getDoc(doc(db, "IDMap", `NK-${id}`));
      const check = await getDoc(doc(db, "Verification", uid.data().uid));
      if (check.data()) {
        search.current.value = "";
        alert("Ticket already verified!");
        setVis(false);
      } else {
        const res = await getDocs(collection(db, "Registrations"));
        const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const req = regs.filter((reg) => {
          return reg.id.includes(uid.data().uid);
        });

        setuserID(uid.data().uid);
        setRegArr(req);
        setList(true);
        setVis(true);
      }
    } catch (e) {
      search.current.value = "";
      alert("User not Found!");
    }
  };

  const verify = async () => {
    await setDoc(doc(db, "Verification", userID), {
      verified: true,
    });
    setVis(false);
    search.current.value = "";
    alert("verified");
  };

  return (
    <div className="online">
      <div className="search">
        <p style={{ color: "white" }}>
          NK-
          <input
            type="text"
            ref={search}
            onChange={(e) => setID(e.target.value.toUpperCase())}
          />
        </p>
        <button onClick={fetchData}>View Registrations</button>
        {userID ? <button onClick={verify}>Verify Ticket</button> : <></>}
      </div>
      {list && vis && (
        <div className="reg-events-list">
          {regArr.length > 0 ? (
            regArr.map((r, i) => (
              <div className="event-card">
                <div className="ecard-top">
                  <img src={event_banner_path[r.eventid]} />
                  <p className="amt">
                    Paid <span>₹{r.amount}</span>
                    <GoVerified color="#1DA1F2" fontSize="20px" />
                  </p>
                </div>
                <div className="ecard-bottom">
                  <p className="eid">{r.eventid}</p>
                  <p>
                    Payment ID: <span>{r.payment_id}</span>
                  </p>
                  <p>
                    Payment method: <span>{r.method}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1
              style={{
                color: "white",
                backgroundColor: "#8c2725",
                padding: "20px",
              }}
            >
              0 Events registered
            </h1>
          )}
        </div>
      )}
      <div className="black"></div>
    </div>
  );
}

export default Online;
