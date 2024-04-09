import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import "./calender.css";
import AddEvent from "./AddEvent";
// import EditEvent from "./EditEvent";

function Calendar() {
  const { events, loginData, setEvents } = useContext(AppContext);

  // useEffect(() => {

  //   receiveEvents()
  // }, [])


  // // function renderEventContent(eventInfo) {

  // //   return (
  // //     <EditEvent eventInfo={eventInfo} />
  // //   );
  // // }

  return (
    <>
      <div className="calendar-container w-full flex flex-col items-center mt-[3%]">
        <h2 className="admin-home-page-header p-[5%] text-[2.2rem] text-neon-50">
          Admin Home page
        </h2>
        <div className="FullCalender-section w-[90%] h-auto bg-gray-50 rounded-[5%]">
          <div className="calender-box mb-[5vh]">
            <FullCalendar
              events={events}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="dayGridMonth"
              slotDuration="01:00:00"
              slotMinTime="05:00:00"
              headerToolbar={{
                start: "prev title next",
                center: "",
                end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listMonth,listDay",
              }}
              // eventContent={renderEventContent}
              businessHours={[
                {
                  daysOfWeek: [0, 1, 2, 3, 4, 5],
                  startTime: "10:00",
                  endTime: "20:00",
                },
                {
                  daysOfWeek: [7],
                  startTime: "10:00",
                  endTime: "14:00",
                },
              ]}
            />
          </div>
          <AddEvent />
        </div>

      </div>
    </>
  );
}

export default Calendar;
