import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list"
import interactionPlugin from '@fullcalendar/interaction'
import React, { useContext, useEffect, useState, useRef } from "react";
import * as Popover from "@radix-ui/react-popover";
import { AppContext } from "../context/AppContext";
import "./calender.css";
import { useForm } from "react-hook-form";
import AddEvent from "./AddEvent";
import EditEvent from "./EditEvent";
import axios from "axios"
import { Dialog } from "@radix-ui/react-dialog";



function Calendar() {
  const { events, setIsOpen, setEditEvent, editEvent, loginData, setEvents, setLoginData } = useContext(AppContext);

  const renderEventContent = (eventInfo) => {
    return (
      <>
        {eventInfo.event._def.title}
      </>
    )
  }
  const initialDateFormat = (initialDateStr) => {
    if (initialDateStr) {
      const formattedDate = initialDateStr.slice(0, -6);
      console.log(formattedDate)
      return (formattedDate)
    } else {
      console.log("Invalid date format")
    }


  }

  const handelEventClick = async (eventClickInfo) => {
    console.log(eventClickInfo)
    setIsOpen(true)
    setEditEvent(
      {
        id: eventClickInfo.event._def.publicId,
        title: eventClickInfo.event.title,
        start: initialDateFormat(eventClickInfo.event.startStr),
        end: initialDateFormat(eventClickInfo.event.endStr),
        studentsLimit: eventClickInfo.event._def.extendedProps.studentsLimit,
        summary: eventClickInfo.event._def.extendedProps.summary

      }
    )
    const eventId = eventClickInfo.event._def.publicId
    // console.log(eventId)
    try {
      const res = await axios.get(`http://localhost:3306/event/getEvent/${eventId}`)
      // setEditEvent(res.data.event)
      console.log(res.data.event)

    } catch (error) {
      console.error("Error fetch event", error)
    }
  }

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
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              slotDuration="01:00:00"
              slotMinTime="05:00:00"
              headerToolbar={{
                start: "prev title next",
                center: "",
                end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listMonth,listDay",
              }}

              eventContent={renderEventContent}
              eventClick={handelEventClick}
              editable={true}
              selectable={true}
              // eventDidMount={eventPopOver}
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
          <EditEvent />
          <AddEvent />

          {/* <EditEvent /> */}

        </div>

      </div>
    </>
  );
}

export default Calendar;
