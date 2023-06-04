import React, { useEffect, useState } from "react";
import {
  getDoc,
  doc,
  collection,
  getDocs,
  updateDoc,
  setDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { db } from "../Firebase/config";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

const nameMap = {
  NK001: "Lab Hunt",
  NK002: "Circuit Manic",
  NK003: "Chemcar",
  NK004: "Chembrane",
  NK005: "Mad Chemistry",
  NK006: "Speed Typing",
  NK007: "Smash the Bug!",
  NK008: "Robo Soccer",
  NK009: "All terrain vehicle race",
  NK010: "Break The Circuit",
  NK011: "Electrohunt",
  NK012: "Tangy Tongues",
  NK013: "Food Fraud",
  NK024: "Line Follower Maze",
  NK015: "RC Racing",
  NK016: "Kickering",
  NK017: "Mechmaniac",
  NK018: "BLUEPRINT",
  NK019: "Cad Clash",
  NK031: "Xperia",
  NK061: "Ganitha Netra",
  NK020: "Gromatici",
  NK021: "LIMIT BREAKERS-MATHS QUIZ",
  NK023: "BlockChain Workshop",
  NK014: "Dart",

  NK025: "MR and MS Nakshatra",
  NK026: "Man of Steel",
  NK027: "Scene de crime",
  NK028: "Titan actor",
  NK029: "Treasure Pursuit",
  NK030: "JAM (Mal and Eng.)",
  NK032: "The Laughter Cruise",
  NK033: "Haute Couture",

  NK034: "Sync step",
  NK035: "Duo dance",
  NK036: "Double trouble",

  NK037: "Voice of Nakshatra",
  NK038: "Nirvana Nation",
  NK039: "Strings Unplugged",

  NK040: "5x5 basketball",
  NK041: "County cricket",
  NK042: "Racquettes Slip Men",
  NK043: "soccer /3x3 football",

  NK044: "Strike’em down",
  NK045: "Queens Gambit - Chess",

  NK046: "Kaptured'23",
  NK047: "Reelistic Delights",
  NK048: "Panoramic",
  NK049: "Reelagram",
  NK050: "Pixelate",

  NK051: "FIFA'23",
  NK052: "Valorant",
  NK053: "E Football’23(PES)",
  NK054: "VR Gaming",
  NK055: "CALL OF DUTY",

  NK056: "Pencil Mania",
  NK057: "Neo Grafitti",
  NK058: "Art A Holic",
  NK059: "ARTLE",

  NK060: "Quizadry",
  NK062: "IPL Auction",

  NK063: "Gourmet Battle",
  NK064: "Blind taste test",

  NK065: "Cinephilia",
  NK066: "Dumb Charades",
  NK067: "Film Trifles",
  NK068: "Make the cut",
  NK069: "Animezing",
  NK070: "Raquettes Slip Women",
};

const amtMap = {
  NK001: "50",
  NK002: "80",
  NK003: "100",
  NK004: "40",
  NK005: "30",
  NK006: "35",
  NK007: "50",
  NK008: "100",
  NK009: "100",
  NK010: "30",
  NK011: "50",
  NK012: "100",
  NK013: "60",
  NK014: "100",
  NK015: "50",
  NK016: "100",
  NK017: "30",
  NK018: "50",
  NK019: "50",
  NK020: "50",
  NK021: "0",
  NK023: "100",
  NK024: "80",
  NK025: "200",
  NK026: "150",
  NK027: "100",
  NK028: "100",
  NK029: "100",
  NK030: "30",
  NK031: "100",
  NK032: "100",
  NK033: "2000",
  NK034: "600",
  NK035: "100",
  NK036: "100",
  NK037: "150",
  NK038: "300",
  NK039: "500",
  NK040: "400",
  NK041: "500",
  NK042: "100",
  NK043: "300",
  NK044: "40",
  NK045: "70",
  NK046: "30",
  NK047: "30",
  NK048: "30",
  NK049: "30",
  NK050: "0",
  NK051: "75",
  NK052: "100",
  NK053: "50",
  NK054: "60",
  NK055: "100",
  NK056: "30",
  NK057: "50",
  NK058: "50",
  NK059: "30",
  NK060: "80",
  NK061: "0",
  NK062: "30",
  NK063: "100",
  NK064: "50",
  NK065: "40",
  NK066: "30",
  NK067: "80",
  NK068: "100",
  NK069: "40",
  NK070: "100",
};

function FI_ADM() {
  const [spot, setSpot] = useState([]);
  // const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  const getSpot = async () => {
    const res = await getDocs(collection(db, "SpotData"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    setSpot(regs);
  };

  useEffect(() => {
    getSpot();
  }, []);

  // const refreshamt = async () => {
  //   const res = await getDocs(collection(db, "SpotData"));
  //   const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  //   regs.map((r, i) => {
  //     if (r.amount !== amtMap[r.id.substring(0, 5)]) {
  //       console.log(r.receiptno + ":" + "false");
  //     } else {
  //       console.log(r.receiptno + ":" + "true");
  //     }
  //   });

  //   regs.map(async (r, i) => {
  //     if (r.amount !== amtMap[r.id.substring(0, 5)]) {
  //       let actual = amtMap[r.id.substring(0, 5)];
  //       await updateDoc(doc(db, "SpotData", r.id), {
  //         amount: actual,
  //       });
  //     }
  //   });
  // };

  const manip = async () => {
    // const res = await getDocs(collection(db, "IDMap"));
    // const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // console.log(regs.length);

    // const res = await getDocs(collection(db, "users"));
    // const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    // regs.map(async (r) => {
    //   await setDoc(doc(db, "IDMap", r.NKID), {
    //     uid: r.uid,
    //   });
    // });
    const res = await getDocs(collection(db, "SpotData"));
    const regs = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(regs.length);
  };

  return (
    <div
      className="admin-controls"
      style={{ position: "absolute", top: "20px", left: "20px" }}
    >
      <button onClick={getSpot}>PROCESS</button>
      <ReactHTMLTableToExcel
        buttonText="Download &#8681;"
        filename="Registrations List"
        sheet="regs"
        table="list-exp"
        className="export-button"
      />
      <table id="list-exp">
        <thead>
          <tr>
            <th>Name</th>
            <th>College</th>
            <th>Branch</th>
            <th>Sem</th>
            <th>Event</th>
            <th>Whatsapp</th>
            <th>Amount</th>
            <th>Receiptno</th>
          </tr>
        </thead>
        <tbody>
          {spot ? (
            spot.map((s) => (
              <tr>
                <td>{s.username}</td>
                <td>{s.college}</td>
                <td>{s.branch}</td>
                <td>{s.sem}</td>
                <td>{nameMap[s.id.substring(0, 5)]}</td>
                <td>{s.whatsapp}</td>
                <td>{s.amount}</td>
                <td>{s.receiptno}</td>
              </tr>
            ))
          ) : (
            <></>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default FI_ADM;
