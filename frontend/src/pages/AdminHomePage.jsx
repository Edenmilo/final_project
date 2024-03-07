import React from "react";
import { useNavigate } from "react-router-dom";
import Calendar from "../components/calendar";
import UsersList from "./UsersList";

function AdminHomePage() {
  const navigate = useNavigate();

  const handelMyusersNavigation = () => {
    navigate('/userslist'); //////my users page!!!!!!///dont forget to send the logged admin!!!!!!
  };

  return (
    <>
      <Calendar /> //send loged in admin!!!!
      <hr />
      <div onClick={handelMyusersNavigation}>my students</div>// add hover and
      design elements!!!
    </>
  );
}

export default AdminHomePage;
