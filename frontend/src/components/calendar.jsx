import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import "./calender.css";

function Calendar() {
  // dont forget to get event by id from the DB
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentsLimit, setStudentsLimit] = useState("");
  const [summary, setSummary] = useState("");
  const [events, setEvents] = useState([]);

  function renderEventContent(eventInfo) {
    return (
      <>
        <div className="event-container w-full h-full relative p-1">
          <h5 className="font-bold truncate text-[0.5rem]">
            {eventInfo.event.title}
          </h5>
          {/* <span className=" text-[5px]">{eventInfo.start}</span>
          <span className=" text-[5px]">{eventInfo.end}</span>
          <span className="text-[5px]">{eventInfo.maxStudents}</span>
          <span className="text-[5px]">{eventInfo.textBox}</span> */}
          <button
            onClick={() => deleteEvent(event.title)}
            className="top-0 right-0 p-1 text-[5px]"
          >
            delete
          </button>
        </div>
      </>
    );
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const deleteEvent = (eventTitle) => {
    const updatedEvents = events.filter((event) => event.id !== eventTitle);
    setEvents(updatedEvents);
  };
  const onSubmit = (data) => {
    const newEvent = {
      title: data.title,
      start: data.start,
      end: data.end,
      maxStudents: data.maxStudents,
      textBox: data.textBox,
    };

    setEvents((prevEvents) => [...prevEvents, newEvent]);

    console.log(newEvent);
    setTitle(newEvent.title);

    setStartDate("");
    setEndDate("");
    setStudentsLimit(newEvent.maxStudents);
    setSummary("");
  };
  console.log(events);
  console.log(title);
  // console.log(title);
  // console.log(startDate);

  const today = new Date();
  const todayFormat = today.toLocaleDateString();
  // console.log(todayFormat);
  // const handleSubmitApi = (e) => {
  //   e.preventDefault();

  //   const newEvent = {
  //     title: title,
  //     start: startDate,
  //     end: endDate,
  //     maxStudents: studentsLimit,
  //     summary: summary,
  //   };
  //   //post request for new event
  //   //get request for all events
  //   setEvents([...events, newEvent]); //wont be used after database connected becaise i will get the evenst from the DB.

  //   setTitle("");
  //   setStartDate("");
  //   setEndDate("");
  //   setStudentsLimit("");
  //   setSummary("");
  // };

  return (
    <>
      <div className="calendar-container w-full h-full flex flex-col items-center mt-[3%]">
        <h2 className="admin-home-page-header p-[5%] text-[1.6rem]">
          Admin Home page
        </h2>
        <div className="FullCalender-section w-[90%] h-auto bg-gray-50 rounded-[5%]">
          <div className="calender-box mb-[5vh]">
            <FullCalendar
              events={events}
              select={onSubmit}
              plugins={[dayGridPlugin, timeGridPlugin, listPlugin]}
              initialView="timeGridWeek"
              slotDuration="01:00:00"
              slotMinTime="05:00:00"
              headerToolbar={{
                start: "prev title next",
                center: "",
                end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek,listMonth,listDay",
              }}
              eventContent={renderEventContent}
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
        </div>
        <Dialog.Root onOpenChange={handleSubmit(onSubmit)}>
          <Dialog.Trigger asChild>
            <div className="add-event-radix-button h-[15vh] w-[90%] m-auto mt-[2vh]">
              <button className="shadow-white-50 text-black-50  m-auto text-[0.8rem] w-[40%] h-[50%] p-[1rem] flex items-center justify-center mb-[1vh] rounded-[4px] text-nowrap bg-neon-50 font-medium leading-none  focus:outline-none">
                Add Event
              </button>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="data-[state=open]:animate-overlayShow z-40 bg-black-50 opacity-[0.5] fixed inset-0" />
            <Dialog.Content className="data-[state=open]:animate-contentShow z-50 bg-gray-50  h-[80vh] w-[40vw] text-white-50 fixed flex flex-col items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] p-[2%]  focus:outline-none">
              <form
                onSubmit={() => {
                  handleSubmit(onSubmit);
                }}
                id="add-event-form"
                className="radix-add-event-form p-[2%] fixed flex flex-col justify-center items-center h-full w-full"
              >
                <Dialog.Title className="text-mauve12 m-0 text-[1rem] font-[700]">
                  Add Event
                </Dialog.Title>

                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[0.8rem]">
                  Add to your schedule another workout!
                </Dialog.Description>
                <div className="add-event-inputs-box w-[90%] flex flex-col items-center justify-center gap-[8px]">
                  <input
                    className="text-white-50 shadow-black-50 inline-flex h-[8vh] w-[80%] flex-1 items-center justify-center rounded-[4px] text-[0.7rem] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                    id="title"
                    placeholder="  Title"
                    {...register("title", { min: 3, max: 12 })}
                  />
                  {/* {errors.title && <span>title require</span>} */}

                  <div className="start-end-event-inputs flex flex-col flex-wrap items-center justify-center">
                    <label
                      htmlFor="start"
                      className="text-[0.8rem] font-medium w-full flex flex-col items center"
                    >
                      Starts At:
                      <input
                        className="text-white-50 shadow-black-50 inline-flex h-[8vh]  flex-1 items-center justify-center rounded-[4px] text-[0.6rem] leading-none shadow-[0_0_0_1px] outline-none "
                        id="start"
                        placeholder="  Workout Starts At:"
                        type="datetime-local"
                        {...register("start", { min: todayFormat, max: 12 })}
                      />
                    </label>

                    <label
                      htmlFor="end"
                      className="text-[0.8rem] font-medium w-full flex flex-col items center"
                    >
                      End At:
                      <input
                        className="text-white-50 shadow-black-50 inline-flex h-[8vh]  flex-1 items-center justify-center rounded-[4px] text-[0.6rem] leading-none shadow-[0_0_0_1px] outline-none "
                        id="end"
                        placeholder="Workout Ends At:"
                        type="datetime-local"
                        {...register("end", { min: todayFormat, max: 12 })}
                      />
                    </label>
                  </div>
                  <input
                    className="text-white-50 shadow-black-50 inline-flex h-[8vh] w-[80%] flex-1 items-center justify-center rounded-[4px] text-[0.7rem] leading-none shadow-[0_0_0_1px] outline-none "
                    id="maxStudents"
                    placeholder="  Maximum number of students"
                    type="text"
                    {...register("maxStudents", { required: true })}
                  />

                  <input
                    className="text-white-50 shadow-black-50 inline-flex h-[8vh] w-[80%] flex-1 items-center justify-center rounded-[4px] text-[0.7rem] leading-none shadow-[0_0_0_1px]  focus:outline-none "
                    id="textBox"
                    placeholder="  Give us some words about the workout..."
                    {...register("textBox")}
                  />
                </div>
                <div className="mt-[4vh] flex justify-end">
                  <Dialog.Close asChild>
                    <button
                      type="submit"
                      className="bg-green4 text-green11 hover:bg-green5 focus:shadow-green7 inline-flex h-[8vh] items-center justify-center rounded-[4px] px-[0.7rem] font-medium leading-none  focus:outline-none"
                    >
                      Save changes
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-black-50 hover:bg-violet4 focus:shadow-black-50 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full  focus:outline-none"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>

        {/* <div className="add-workout-container w-[90%] m-auto mt-[3vh] mb-[3vh] bg-gray-50 rounded-[10px]">
          <form className="add-workout-form" onSubmit={handleSubmit}>
            <h3 className="">Add Workout</h3>
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
        </div> */}
      </div>
    </>
  );
}

export default Calendar;
