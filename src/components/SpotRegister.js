import React, { useEffect, useState } from "react";
import { useAppData } from "../AppContext/AppContext";
import "./Spot.css";
import { counters, event_banner_path, nameMap } from "../details";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  getDoc,
  doc,
  updateDoc,
  setDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function SpotRegister() {
  const [{ spotE, e }, dispatch] = useAppData();
  console.log(e);
  const [pVis, setpVis] = useState(false);
  const [ctr, setCtr] = useState(1);
  const [event, setEvent] = useState({});

  const openPortal = async (e) => {
    const res = await getDoc(doc(db, "SpotEventRegs", e));

    const event = await getDoc(doc(db, "Events", e));
    setCtr(res.data().registrations.length);
    setEvent(event.data());

    dispatch({
      type: "SET_SPOT",
      spot: e,
    });
    setpVis(true);
  };
  const schema = yup.object().shape({
    name: yup.string().required(),
    clg: yup.string().required(),
    branch: yup.string().required(),
    sem: yup
      .number("Sem should be between 1 and 8")
      .min(1)
      .max(8)
      .required("Sem should be between 1 and 8"),
    wtsp: yup.string().required(),
    rcpn: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const FormSubmit = async (data) => {
    reset();
    await setDoc(doc(db, "SpotData", `${spotE}-0${ctr + 1}`), {
      username: data.name,
      college: data.clg,
      sem: data.sem,
      branch: data.branch,
      whatsapp: data.wtsp,
      receiptno: data.rcpn,
      amount: data.amount,
    });
    await updateDoc(doc(db, "SpotEventRegs", spotE), {
      registrations: arrayUnion(`SPOT-${data.rcpn}/${spotE}-0${ctr + 1}`),
    });
    await updateDoc(doc(db, "Events", spotE), {
      spots: increment(-1),
    });

    setpVis(false);
    alert("Registered Succesfully!");
  };
  return (
    <div className="spot">
      <img
        className="branding"
        src="https://firebasestorage.googleapis.com/v0/b/nk23-a5689.appspot.com/o/nktext.png?alt=media&token=158f9b12-913e-48a2-9d89-0ab7c8a2d9f7"
        alt=""
      />
      <button
        className="back"
        onClick={() => {
          dispatch({
            type: "SET_E",
            e: null,
          });
        }}
      >
        <IoMdArrowRoundBack />
      </button>
      <div className="events-grid">
        {counters[e].map((e, i) => {
          return (
            <img src={event_banner_path[e]} onClick={() => openPortal(e)} />
          );
        })}
      </div>

      {pVis && (
        <div className="portal">
          <button className="close-1" onClick={() => setpVis(false)}>
            X
          </button>
          <div className="deet-box">
            <p className="ename">{nameMap[spotE]}</p>
            <p className="eid">{spotE}</p>
            {event.regfee > 0 ? (
              <p className="regfee">₹{event.regfee}/-</p>
            ) : (
              <p className="regfee">Free</p>
            )}
            <p>Spots Left: {event.spots}</p>
          </div>
          <form onSubmit={handleSubmit(FormSubmit)} className="reg-form">
            <p className="id-in">
              Registration ID: <span>{`${spotE}-0${ctr + 1}`}</span>
            </p>
            <input type="text" value={event.regfee} {...register("amount")} />
            <input type="text" placeholder="Name" {...register("name")} />
            {errors.name ? <p>{errors.name.message}</p> : <></>}

            <input type="text" placeholder="College" {...register("clg")} />
            {errors.clg ? <p>{errors.clg.message}</p> : <></>}

            <input type="text" placeholder="Branch" {...register("branch")} />
            {errors.branch ? <p>{errors.branch.message}</p> : <></>}

            <input type="number" placeholder="Sem" {...register("sem")} />
            {errors.sem ? <p>{errors.sem.message}</p> : <></>}

            <input
              type="text"
              placeholder="Whatsapp number"
              {...register("wtsp")}
            />
            {errors.wtsp ? <p>{errors.wtsp.message}</p> : <></>}

            <input
              type="text"
              placeholder="Receipt number"
              {...register("rcpn")}
            />
            {errors.rcpn ? <p>{errors.rcpn.message}</p> : <></>}

            <button className="submit" type="submit">
              Register
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default SpotRegister;
