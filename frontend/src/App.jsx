import "./App.css";
import Social from "./pages/Social";
import Workouts from "./pages/Workouts";
import { ContextProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import AdminHomePage from "./pages/AdminHomePage";
import UsersList from "./pages/UsersList";
import Exercises from "./pages/Exercises";
import HomePage from "./pages/HomePage";
import UserInfo from "./pages/userInfo";

function App() {
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AdminHomePage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/social" element={<Social />} />
            <Route path="/social/workouts" element={<Workouts />} />
            <Route path="/social/workouts/exercises" element={<Exercises />} />
            <Route path="/usersList" element={<UsersList />} />
            <Route path="/user/info/:userId" element={<UserInfo />} />         
             </Routes>
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
