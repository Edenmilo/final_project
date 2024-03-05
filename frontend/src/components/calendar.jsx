import React, { useEffect, useRef } from 'react';
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import './calendar.css'

function Calendar() {

   
  return (
    <div className="calendar-container">
      <h1>My Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
        initialView="timeGridWeek" 
        slotDuration="01:00:00"
        slotMinTime="05:00:00"
        headerToolbar={{
          start: "prev,next today",
          center:
            "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listDay,listMonth", 
          end: "title",
        }}
        events={[
            { title: "Event 1", start: "2024-03-05", end: "2024-03-05" },
            { title: "Event 2", start: "2024-03-08", end: "2024-03-08" },
          ]}

      />
    </div>
  );
}

export default Calendar;
