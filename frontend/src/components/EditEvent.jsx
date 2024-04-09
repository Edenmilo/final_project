import { useForm } from "react-hook-form";
import React, { useContext, useEffect, useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MixerHorizontalIcon, Cross2Icon } from "@radix-ui/react-icons";
import { AppContext } from "../context/AppContext";

function EditEvent(eventInfo) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
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

    const deleteEvent = (eventId) => {
        const updatedEvents = events.filter((event) => event.id !== eventId);
        setEvents(updatedEvents);
    };
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
    )
}

export default EditEvent