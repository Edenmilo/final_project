import * as Dialog from "@radix-ui/react-dialog";
import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons"
import { AppContext } from "../context/AppContext";
import axios from "axios";

function AddEvent() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const { setEvents, loginData } = useContext(AppContext);

    useEffect(() => {
        const receiveEvents = async () => {
            try {
                const res = await axios.get(`http://localhost:3306/event/${loginData}`)
                console.log(res.data)
            } catch (error) {
                console.error("Error receiving events:", error)
            }
        }
        receiveEvents()
    }, [])


    const onSubmit = async (data) => {
        const newEvent = {
            title: data.title,
            start: data.start,
            end: data.end,
            studentsLimit: data.studentsLimit,
            summary: data.summary,
            createdBy: loginData
        };
        try {
            const res = await axios.post("http://localhost:3306/event/create", newEvent);
            const responseData = res.data;
            console.log(responseData)
            setEvents((prevEvents) => [...prevEvents, newEvent]);
            console.log(newEvent);

        } catch (error) {
            console.error("Error creating event:", error)
        }
        reset();
    };

    const today = new Date();
    const todayFormat = today.toLocaleDateString();

    return (
        <>
            <div>
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
                                    {errors.title && <span>title require</span>}

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
                                        id="studentsLimit"
                                        placeholder="  Maximum number of students"
                                        type="number"
                                        {...register("studentsLimit", { required: true })}
                                    />

                                    <input
                                        className="text-white-50 shadow-black-50 flex h-[5vh] w-[80%] items-center justify-center text-[0.7rem] border-b bg-gray-50 border-neon-50 focus:outline-none"
                                        id="summary"
                                        placeholder="  Give us some words about the workout..."
                                        {...register("summary")}
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
    )
}

export default AddEvent