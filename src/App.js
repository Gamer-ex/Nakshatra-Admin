import { useAppData } from "./AppContext/AppContext";
import { spot_counters } from "./details";
import Login from "./components/Login";
import Event from "./components/Event";
import SpotRegister from "./components/SpotRegister";
import SuperAdmin from "./components/SuperAdmin";
import Online from "./components/Online";
import { useEffect } from "react";

function App() {
  const [{ e }] = useAppData();

  return (
    <div className="App">
      {e ? (
        e == process.env.REACT_APP_ADMIN ? (
          <SuperAdmin />
        ) : spot_counters.includes(e) ? (
          <SpotRegister />
        ) : e === "ONLINE_COUNTER" ? (
          <Online />
        ) : (
          <Event />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
