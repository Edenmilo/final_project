import "./App.css";
// import Login from "./pages/Login";
// import Social from "./pages/Social";
import Workouts from "./pages/Workouts";
import { ContextProvider } from "./AppContext";

function App() {
  return (
    <>
      <ContextProvider>
        {/* <Social /> */}
        {/* <Login /> */}
        <Workouts />
      </ContextProvider>
    </>
  );
}

export default App;
