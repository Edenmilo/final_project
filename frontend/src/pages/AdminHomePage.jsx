import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/calendar";
import CreatePost from "../components/CreatePost";
import { AppContext } from "../context/AppContext";
import Cookies from "js-cookie";
import axios from "axios"

function AdminHomePage() {

  const navigate = useNavigate();

  const { events, setLoginData, setEvents, loginData, editEvent, isOpen } = useContext(AppContext);

  const userId = Cookies.get("userId");

  const receiveEvents = async () => {
    if (events || events.length > 0) {
      try {
        // console.log(loginData)
        const res = await axios.get(`http://localhost:3306/event/${userId}`)
        // console.log(res.data)
        setEvents(res.data)
      } catch (error) {
        console.error("Error receiving events:", error)
      }
    } else {
      console.log("The user not have events")
    }
  }

  useEffect(() => {
    setLoginData(userId);
    receiveEvents()
  }, []);

  return (
    <>
      <div className="admin-home-container h-screen flex items-center justify-center">
        <div className="admin-card w-[60vw] h-[90vh] overflow-y-auto no-scrollbar bg-black-50 mt-[2vh] phone:w-full phone:h-full phone:mt-0">
          <Calendar />
          <button className="shadow-white-50 text-black-50  m-auto text-[0.8rem] w-[35%] p-[1rem] flex items-center justify-center mb-[1vh] rounded-[4px] text-nowrap bg-neon-50 font-medium leading-none  focus:outline-none"
            onClick={() => navigate("/usersList")}>
            users list page
          </button>
          <button className="shadow-white-50 text-black-50  m-auto text-[0.8rem] w-[35%] p-[1rem] flex items-center justify-center mb-[1vh] rounded-[4px] text-nowrap bg-neon-50 font-medium leading-none  focus:outline-none"
            onClick={() => navigate("/social")}>
            Social
          </button>
          <CreatePost />
        </div>
      </div>
    </>
  );
}

export default AdminHomePage;
