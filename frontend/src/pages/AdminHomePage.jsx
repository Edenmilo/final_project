import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Calendar from "../components/calendar";
import CreatePost from "../components/CreatePost";
import { AppContext } from "../context/AppContext";
import axios from "axios"

function AdminHomePage() {
  const navigate = useNavigate();
  const { loginData, setLoginData, setEvents } = useContext(AppContext);
  useEffect(() => {
    const userId = Cookies.get("userId");
    if (userId) {
      console.log(userId);
      setLoginData(userId);
      console.log(typeof (loginData))
      const receiveEvents = async () => {
        try {
          console.log(loginData)
          console.log(typeof (loginData));

          const res = await axios.get(`http://localhost:3306/event/${userId}`)
          console.log(res.data)
          setEvents(res.data)
        } catch (error) {
          console.error("Error receiving events:", error)
        }
      }
      receiveEvents()
    } else {
      console.log("User id not found")
    }

  }, []);

  const handleUsersListClick = () => {
    navigate("/usersList");
  };
  return (
    <>
      <div className="admin-home-container h-screen flex items-center justify-center">
        <div className="admin-card w-[60vw] h-[90vh] overflow-y-auto no-scrollbar bg-black-50 mt-[2vh] phone:w-full phone:h-full phone:mt-0">
          <Calendar />
          <button className="shadow-white-50 text-black-50  m-auto text-[0.8rem] w-[35%] p-[1rem] flex items-center justify-center mb-[1vh] rounded-[4px] text-nowrap bg-neon-50 font-medium leading-none  focus:outline-none" onClick={handleUsersListClick}>users list page</button>
          <CreatePost />
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
