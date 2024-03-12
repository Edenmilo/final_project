import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import Calendar from "../components/Calendar";
import CreatePost from "../components/CreatePost";

function AdminHomePage() {
  const navigate = useNavigate();
  const { loginData, setLoginData } = useContext(AppContext);
  useEffect(() => {
    setLoginData(localStorage.getItem("loginData"));
    console.log(loginData);
  });

  return (
    <>
      <div className="admin-home-container h-screen flex items-center justify-center">
        <div className="admin-card w-[60vw] h-[90vh] overflow-y-auto no-scrollbar bg-black-50 mt-[2vh]">
          <Calendar />
          <CreatePost />
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
