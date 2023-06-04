import React, { useEffect } from "react";
import "./Login.css";
import { useState } from "react";
import { db } from "../Firebase/config";
import { getDoc, doc, deleteDoc } from "firebase/firestore";
import { useAppData } from "../AppContext/AppContext";
import { spot_counters, password } from "../details";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

import FI_ADM from "./FI_ADM";

function Login() {
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
  //SIZE CALC <-

  const [id, setId] = useState("");
  const [pwd, setPwd] = useState("");

  const [ctr, setCtr] = useState(0);

  const [vis, setVis] = useState(false);

  const [{}, dispatch] = useAppData();
  const handleLogin = async () => {
    if (id == process.env.REACT_APP_ADMIN) {
      if (pwd == process.env.REACT_APP_ADMIN_PWD) {
        dispatch({
          type: "SET_E",
          e: process.env.REACT_APP_ADMIN,
        });
      }
    } else if (spot_counters.includes(id)) {
      if (size.w >= 1250) {
        if (pwd === password[id] || pwd === process.env.REACT_APP_SUPERADMIN) {
          dispatch({
            type: "SET_E",
            e: id,
          });
        } else {
          alert("Invalid password");
        }
      } else {
        alert("Login from a desktop or laptop to access Registration panels!");
      }
    } else if (id === "ONLINE_COUNTER") {
      if (size.w >= 1250) {
        if (pwd === password[id] || pwd === process.env.REACT_APP_SUPERADMIN) {
          dispatch({
            type: "SET_E",
            e: id,
          });
        } else {
          alert("Invalid password");
        }
      } else {
        alert("Login from a desktop or laptop to access Registration panels!");
      }
    } else {
      const res = await getDoc(doc(db, "admin", id));
      try {
        if (res.data().pwd == pwd || pwd == process.env.REACT_APP_SUPERADMIN) {
          const data = await getDoc(doc(db, "Events", id));

          dispatch({
            type: "SET_EVENT",
            event: data.data(),
          });

          dispatch({
            type: "SET_E",
            e: id,
          });
        } else {
          if (ctr < 5) {
            alert(
              "Incorrect password!\nForgot your password? Contact website team for password reset\n\nAntony Anson: 9526075975\nJoel K James: 9074421279\nC Jacob Thomas: 9846799156"
            );
            setCtr(ctr + 1);
          } else {
            await deleteDoc(doc(db, "admin", id));
            alert(
              "Password has been reset due to 5 invalid entries contact NK23 website team for password reset\n\nAntony Anson: 9526075975\nJoel K James: 9074421279\nC Jacob Thomas: 9846799156"
            );
          }
        }
      } catch (e) {
        alert("No user found with given ID");
      }
    }
  };

  return (
    <div className="login">
      {/* <FI_ADM /> */}
      <div className="login-box">
        <div className="logo">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/nktext.png?alt=media&token=158f9b12-913e-48a2-9d89-0ab7c8a2d9f7"
            alt=""
          />
        </div>
        <img
          className="logo-main"
          src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/logos%2Fnk23logobright.png?alt=media&token=860c6239-e98e-4f5a-ace8-bdf1d57cf274"
          alt=""
        />
        <div className="form">
          <input
            type="text"
            placeholder="User ID"
            onChange={(e) => setId(e.target.value.toUpperCase())}
          />
          <div className="pwd-in">
            <input
              type={vis ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setPwd(e.target.value)}
            />
            {vis ? (
              <AiOutlineEye
                className="vis"
                onClick={() => {
                  setVis(!vis);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="vis"
                onClick={() => {
                  setVis(!vis);
                }}
              />
            )}
          </div>
          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
