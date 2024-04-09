import "./App.css";
import Social from "./pages/Social";
import Workouts from "./pages/Workouts";
import { ContextProvider } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Remove useNavigate import
import Login from "./pages/Login";
import AdminHomePage from "./pages/AdminHomePage";
import UsersList from "./pages/UsersList";
import Exercises from "./pages/Exercises";
import HomePage from "./pages/HomePage";
import UserInfo from "./pages/userInfo";
import { useEffect, useState } from "react";
import { clearCookie, getCookie, setCookie } from "./cookieHelper";

function App() {
  const [authId, setAuthId] = useState(getCookie('userId') || null);

  useEffect(() => {
    if (authId) {
      setCookie('userId', authId);
    }
  }, [authId]);

  function handleLogOut() {
    clearCookie('authToken');
    clearCookie('userId');
    window.location.href = '/'; // Redirect to the home page
  }

  return (
    <>
      <ContextProvider>
        <BrowserRouter> {/* Wrap the App component inside BrowserRouter */}
          <button onClick={handleLogOut}>log out</button>
          <Routes>
            <Route path="/adminHomePage" element={<AdminHomePage />} />
            <Route path="/homePage" element={<HomePage />} />
            <Route path="/" element={<Login />} />
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
