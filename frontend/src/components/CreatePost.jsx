import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
function CreatePost() {
  const {
    vidUrl,
    setVidUrl,
    postName,
    setPostName,
    postCategory,
    setPostCategory,
    postDuration,
    setPostDuration,
    postCalorie,
    setPostCalorie,
    postSets,
    setPostSets,
    postRepeat,
    setPostRepeat,
    postRest,
    setPostRest,
    postContent,
    setPostContent,
  } = useContext(AppContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };
  return (
    <>
      <div className="create-post-container w-full flex flex-col justify-center items-center bg-black-50 p-[1rem]">
        <div className="create-post-card w-[80%] bg-gray-50 rounded-[1rem]">
          <form
            className="create-post-form flex flex-col justify-center items-center gap-[2vh] p-[1rem] "
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              className="create-post-input w-[70%] border-b bg-gray-50 border-neon-50 focus:outline-none"
              placeholder="video"
              type="text"
              {...register("url")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Exercise Name"
              type="text"
              {...register("exerciseName")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder=" Category"
              type="string"
              {...register("category")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Duration"
              type="string"
              {...register("duration")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Calories"
              type="number"
              {...register("calories")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Sets"
              type="number"
              {...register("sets")}
            />
            <input
              className="create-post-input w-[70%] border-b  border-b-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Repeat"
              type="number"
              {...register("repeat")}
            />
            <input
              className="create-post-input w-[70%] border-b border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Rest"
              type="number"
              {...register("rest")}
            />
            <input
              className="create-post-input w-[70%] border-b border-neon-50 text-white-50 bg-gray-50 focus:outline-none"
              placeholder="Content"
              type="text"
              {...register("content")}
            />
            <button
              className="create-post-button p-[10px] text-black-50 bg-neon-50 rounded-[1rem]"
              type="submit"
            >
              Create Post
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default CreatePost;
