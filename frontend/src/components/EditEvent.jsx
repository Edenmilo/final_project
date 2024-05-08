import { useForm } from "react-hook-form";
import React, { useContext, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Cross2Icon } from "@radix-ui/react-icons";
import { AppContext } from "../context/AppContext";
import Cookies from 'js-cookie';
import axios from 'axios';

function EditEvent() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const {
        isOpen,
        setIsOpen,
        editEvent,
        setEditEvent
    } = useContext(AppContext);

    // useEffect(() => {
    //     console.log("render form")
    // }, [editEvent])

    const dateFormat = (dateStr) => {
        if (editEvent.start !== undefined) {
            return (dateStr.replace(/:\d{2}\.\d{3}Z$/, ''))
        } else {
            console.log("not find")
        }
    }
    console.log(editEvent)

    const onSubmit = async (data) => {

        console.log(data)
        const eventId = editEvent.id
        console.log(eventId)

        const updatedEvent = {
            id: eventId,
            title: data.title,
            start: dateFormat(data.start),
            end: dateFormat(data.end),
            studentsLimit: data.studentsLimit,
            summary: data.summary,

        };

        try {
            const res = await axios.put(`http://localhost:3306/event/update/${eventId}`, updatedEvent)
            const responseData = res.data;
            console.log(responseData)
            setEditEvent(updatedEvent);
            console.log(updatedEvent)
            console.log(eventId)
        } catch (error) {
            console.error("Error deleting event", error)
        }
        reset()
        setIsOpen(false)
    }
    console.log(editEvent)

    const deleteEvent = async () => {
        console.log(editEvent)
        const eventId = editEvent.id;
        console.log(eventId)
        try {
            const res = await axios.delete(`http://localhost:3306/event/delete/${eventId}`)
            console.log(res.data)

        } catch (error) {
            console.error("Error deleting event", error)
        }
        setIsOpen(false)
    };
    const today = new Date();
    const todayFormat = today.toLocaleDateString();

    return (
        <>
            <div className="event-container w-full h-full relative ">
                <div className=" event-container w-full h-full relative ">
                    <Popover.Root open={isOpen} onOpenChange={() => handleSubmit(onSubmit)}>
                        <Popover.Trigger asChild>
                            <button
                                className="w-full h-full flex items-center justify-center text-[0.7rem]  cursor-pointer outline-none"
                                aria-label="Update dimensions">


                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content
                                className="rounded p-5 z-50 w-[30vw] bg-gray-50 shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)]  will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                                sideOffset={7}
                                align="center"
                                avoidCollisions
                            >
                                <form onSubmit={handleSubmit(onSubmit)} >
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
                                                    type="text"
                                                    defaultValue={editEvent ? editEvent.title : " "}
                                                    {...register("title", { min: 2, max: 30, required: true })}
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset className="flex gap-5 items-center">
                                            Start
                                            <div className="w-full">
                                                <input
                                                    className="text-white-50 shadow-black-50 flex w-[12vw] h-[5vh] items-center justify-center text-[0.6rem] border-b bg-gray-50 border-neon-50 focus:outline-none "
                                                    id="start"
                                                    type="datetime-local"
                                                    defaultValue={editEvent ? dateFormat(editEvent.start) : " "}
                                                    {...register("start", { min: todayFormat, max: 12, required: true })}
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset className="flex gap-5 items-center">
                                            End
                                            <div className="w-full">
                                                <input
                                                    className="text-white-50 shadow-black-50 flex w-[12vw] h-[5vh] items-center justify-center text-[0.6rem] border-b bg-gray-50 border-neon-50 focus:outline-none "
                                                    id="end"
                                                    defaultValue={editEvent ? dateFormat(editEvent.end) : " "}
                                                    type="datetime-local"
                                                    {...register("end")}
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset className="flex gap-5 items-center">
                                            Students Limit
                                            <div className="w-full">
                                                <input
                                                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[25px] focus:shadow-[0_0_0_2px] focus:shadow-violet8 outline-none"
                                                    id="studentsLimit"
                                                    type="number"
                                                    defaultValue={editEvent ? editEvent.studentsLimit : ""}
                                                    {...register("studentsLimit", { min: 1, max: 100 })}
                                                />
                                            </div>
                                        </fieldset>
                                        <fieldset className="flex gap-5 items-center">
                                            Summary
                                            <div className="w-full">
                                                <input
                                                    className="w-full inline-flex items-center justify-center flex-1 rounded px-2.5 text-[13px] leading-none text-violet11 shadow-[0_0_0_1px] shadow-violet7 h-[4vh] focus:outline-none"
                                                    id="summary"
                                                    defaultValue={editEvent ? editEvent.summary : ""}
                                                    {...register("summary", { min: 2, max: 50 })}
                                                />
                                            </div>
                                        </fieldset>
                                        <button type="submit">Save Changes</button>
                                    </div>


                                </form>
                                <Popover.Close
                                    className="rounded-full h-[25px] w-[25px] inline-flex items-center justify-center text-violet11 absolute top-[5px] right-[5px] hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 cursor-default"
                                    aria-label="Close"
                                    onClick={() => { setIsOpen(false) }}
                                >
                                    <Cross2Icon />
                                </Popover.Close>
                                <Popover.Arrow className="fill-white" />
                                <button className="delete-event-button" onClick={() => deleteEvent()}>
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