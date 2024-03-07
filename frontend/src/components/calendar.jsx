import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import "./calendar.css";

function Calendar() { // dont forget to get event by id from the DB
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentsLimit, setStudentsLimit] = useState("");
  const [summary, setSummary] = useState("");
  const [events, setEvents] = useState([]);

  function renderEventContent(eventInfo) {
    return (
      <>
      <div>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
        <p>{eventInfo.event.extendedProps.summary}</p>
        <button on onClick={() => deleteEvent(eventInfo.event.title)}>delete</button>
        </div>
      </>
    ); 

  }
  const deleteEvent = (eventTitle) =>{
    const updatedEvents = events.filter((event) => event.id !== eventTitle);
    setEvents(updatedEvents);
  }
  const handleSubmit = (e) => {
    e.preventDefault();

    const newEvent = {
      title: title,
      start: startDate,
      end: endDate,
      studentsLimit: studentsLimit,
      summary: summary,
    };
    //post request for new event
    //get request for all events
    setEvents([...events, newEvent]); //wont be used after database connected becaise i will get the evenst from the DB.

    setTitle("");
    setStartDate("");
    setEndDate("");
    setStudentsLimit("");
    setSummary("");
  };

  return (
    <>
      <div id="container">
        <div className="calendar-container">
          <FullCalendar
            events={events}
            plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
            initialView="timeGridWeek"
            slotDuration="01:00:00"
            slotMinTime="05:00:00"
            headerToolbar={{
              start: "prev,next today",
              center:
                "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listMonth,listDay",
              end: "title",
            }}
            eventContent={renderEventContent}
          />
        </div>

        <div>
          <h2>Add Workout</h2>
          <form onSubmit={handleSubmit}>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <hr />
            <label>Workout Starts At:</label>
            <input
              type="datetime-local"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <hr />
            <label>Workout Ends At:</label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <hr />
            <label>Maximum students:</label>
            <input
              type="number"
              value={studentsLimit}
              onChange={(e) => setStudentsLimit(e.target.value)}
            />
            <hr />
            <label>Give us some words about the workout...</label>
            <input
              type="text"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
            />
            <hr />
            <button type="submit">Add Book</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Calendar;
