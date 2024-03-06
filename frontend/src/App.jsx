// import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import AdminHomePage from "./pages/AdminHomePage";
import UsersList from "./pages/UsersList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminHomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userslist" element={<UsersList/>} /> //send to it admin id!!! to get his users

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
