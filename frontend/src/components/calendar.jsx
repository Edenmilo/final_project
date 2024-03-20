import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { AppContext } from "../context/AppContext";
import "./calender.css";

function Calendar() {
  const { loginData } = useContext(AppContext);
  const adminId = loginData.id;  
  // fetchEvents(adminId)
  
  
  const fetchEvents = (adminId) => {
    axios.post(`http://localhost:3306/event/${adminId}`).then((response) => {
      setEvents(response);
    

    });
  };
  console.log(adminId);
  const {
    title,
    setTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    studentsLimit,
    setStudentsLimit,
    summary,
    setSummary,
    events,
    setEvents,
  } = useContext(AppContext);

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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
    setStartDate(newEvent.start);
    setEndDate(newEvent.end);
    setStudentsLimit(newEvent.maxStudents);
    setSummary(newEvent.textBox);
    reset();
  };

  const today = new Date();
  const todayFormat = today.toLocaleDateString();

  function renderEventContent(eventInfo) {
    console.log();
    return (
      <>
        <div className="event-container w-full h-full relative ">
          <div className="event-container w-full h-full relative ">
            <Popover.Root>
              <Popover.Trigger asChild>
                <button
                  className="w-full h-full flex items-center justify-center text-violet11 bg-white text-[0.7rem] shadow-blackA4 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-black-50 cursor-default outline-none"
                  aria-label="Update dimensions"
                >
                  {eventInfo.event.title}
                </button>
              </Popover.Trigger>
              <Popover.Portal>
                <Popover.Content
                  className="rounded p-5 z-50 w-[30vw] bg-gray-50 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                  sideOffset={7}
                  align="center"
                  avoidCollisions
                >
                  <form>
                    <div className="flex flex-col gap-2.5">
                      <p className="text-mauve12 text-[15px] leading-[19px] font-medium mb-2.5">
                        Event Details
                      </p>

                      <fieldset className="flex gap-5 items-center">
                        Title
                        <div className="w-full">
                          <input
                            className="w-full inline-flex items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                            id="title"
                            defaultValue={eventInfo.event.title}
                            readOnly
                          />
                        </div>
                      </fieldset>
                      <fieldset className="flex gap-5 items-center">
                        Start
                        <div className="w-full">
                          <input
                            className="w-full inline-flex items-center justify-center rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                            id="start"
                            defaultValue={eventInfo.event.start.toLocaleString()}
                            readOnly
                            // {...register("start")}
                          />
                        </div>
                      </fieldset>
                      <fieldset className="flex gap-5 items-center">
                        End
                        <div className="w-full">
                          <input
                            className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                            id="end"
                            defaultValue={eventInfo.event.end.toLocaleString()}
                            readOnly
                          />
                        </div>
                      </fieldset>
                      <fieldset className="flex gap-5 items-center">
                        Max Students
                        <div className="w-full">
                          <input
                            className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                            id="maxStudents"
                            defaultValue={studentsLimit}
                            readOnly
                            {...register("maxStudents")}
                          />
                        </div>
                      </fieldset>
                      <fieldset className="flex gap-5 items-center">
                        Summary
                        <div className="w-full">
                          <input
                            className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[4vh] focus:outline-none"
                            id="textBox"
                            defaultValue={summary}
                            readOnly
                            {...register("textBox")}
                          />
                        </div>
                      </fieldset>
                      {/* <Popover.Close type="submit">Save Changes</Popover.Close> */}
                    </div>

                    <Popover.Close
                      className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 cursor-default"
                      aria-label="Close"
                    >
                      <Cross2Icon />
                    </Popover.Close>
                    <Popover.Arrow className="fill-white" />
                  </form>
                  <button onClick={() => deleteEvent(event.id)}>
                    Delete Event
                  </button>
                </Popover.Content>
              </Popover.Portal>
            </Popover.Root>
          </div>
        </div>
      </>
    );
  }
  // const handleEventDelete = (eventId) => {
  //   setEvents(events.filter(event => event.id !== eventId));
  // };
  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  /////// the calender and the add event
  return (
    <>
      {/* calender container */}
      <div className="calendar-container w-full flex flex-col items-center mt-[3%]">
        <h2 className="admin-home-page-header p-[5%] text-[2.2rem] text-neon-50">
          Admin Home page
        </h2>
        <div className="FullCalender-section w-[90%] h-auto bg-gray-50 rounded-[5%]">
          <div className="calender-box mb-[5vh]">
            <FullCalendar
              events={events}
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

        {/* add event */}
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
            <Dialog.Content className="data-[state=open]:animate-contentShow z-50 bg-gray-50  h-[80vh] w-[40vw] text-white-50 fixed flex flex-col items-center justify-center top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] rounded-[20px] p-[5%] focus:outline-none phone:w-[85%] phone:p-[1rem]">
              <form
                onSubmit={() => {
                  handleSubmit(onSubmit);
                }}
                id="add-event-form"
                className="radix-add-event-form p-[5%] fixed flex flex-col justify-center items-center h-full w-full gap-[1rem]"
              >
                <Dialog.Title className="text-mauve12 m-0 text-[1.5rem] font-[700]">
                  Add Event
                </Dialog.Title>

                <Dialog.Description className="text-mauve11 mt-[10px] mb-5 text-[1rem]">
                  Add to your schedule another workout!
                </Dialog.Description>
                <div className="add-event-inputs-box w-full h-full flex flex-col items-center justify-center gap-[1rem]  phone:h-[90%]">
                  <input
                    className="text-white-50 shadow-black-50 flex h-[5vh] w-[80%] items-center justify-center text-[0.7rem] border-b bg-gray-50 border-neon-50 focus:outline-none"
                    id="title"
                    placeholder="  Title"
                    {...register("title", { min: 3, max: 12 })}
                  />
                  {/* {errors.title && <span>title require</span>} */}

                  <div className="start-end-event-inputs w-full flex items-center justify-evenly">
                    <div className="start-input-box">
                      <label
                        htmlFor="start"
                        className="text-[0.8rem] font-medium flex flex-col items center"
                      >
                        Starts At:
                        <input
                          className="text-white-50 shadow-black-50 flex w-[12vw] h-[5vh] items-center justify-center text-[0.6rem] border-b bg-gray-50 border-neon-50 focus:outline-none "
                          id="start"
                          placeholder="  Workout Starts At:"
                          type="datetime-local"
                          {...register("start", { min: todayFormat, max: 12 })}
                        />
                      </label>
                    </div>
                    <div className="end-input-box">
                      <label
                        htmlFor="end"
                        className="text-[0.8rem] font-medium flex flex-col items center"
                      >
                        End At:
                        <input
                          className="text-white-50 shadow-black-50 flex w-[12vw] h-[5vh] items-center justify-center text-[0.6rem] border-b bg-gray-50 border-neon-50 focus:outline-none "
                          id="end"
                          placeholder="Workout Ends At:"
                          type="datetime-local"
                          {...register("end", { min: todayFormat, max: 12 })}
                        />
                      </label>
                    </div>
                  </div>
                  <input
                    className="text-white-50 shadow-black-50 flex h-[5vh] w-[80%] items-center justify-center text-[0.7rem] border-b bg-gray-50 border-neon-50 focus:outline-none"
                    id="maxStudents"
                    placeholder="  Maximum number of students"
                    type="text"
                    {...register("maxStudents", { required: true })}
                  />

                  <input
                    className="text-white-50 shadow-black-50 flex h-[5vh] w-[80%] items-center justify-center text-[0.7rem] border-b bg-gray-50 border-neon-50 focus:outline-none"
                    id="textBox"
                    placeholder="  Give us some words about the workout..."
                    {...register("textBox")}
                  />
                </div>
                <div className="mt-[4vh] flex justify-end">
                  <Dialog.Close asChild>
                    <button
                      type="submit"
                      className="bg-neon-50 text-black-50 flex h-[5vh] items-center justify-center rounded-[1rem] px-[0.7rem] font-medium"
                    >
                      Save changes
                    </button>
                  </Dialog.Close>
                </div>
                <Dialog.Close asChild>
                  <button
                    className="text-black-50 hover:bg-violet4 focus:shadow-black-50 absolute top-[10px] right-[10px] flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full"
                    aria-label="Close"
                  >
                    <Cross2Icon />
                  </button>
                </Dialog.Close>
              </form>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </>
  );
}

export default Calendar;
