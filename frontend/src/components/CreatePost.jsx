import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from "@radix-ui/react-icons"
import axios from "axios";
function CreatePost() {
  const {
    loginData,
    vidUrl,
    setVidUrl,
    imageUrl,
    setImageUrl,
    setPostName,
    setPostCategory,
    setPostDuration,
    setPostCalorie,
    setPostSets,
    setPostRepeat,
    setPostRest,
    setPostContent
  } = useContext(AppContext);

  const admin = 1 // fake admin till the git push 
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const uploadFile = async (file, preset, type) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', preset);
    data.append('cloud_name', "djkxocefx");

    const response = await fetch(`https://api.cloudinary.com/v1_1/djkxocefx/${type}/upload`, {
      method: 'POST',
      body: data
    });

    const result = await response.json();
    return result.url;
  };


  const onSubmit = async (data) => {
    const uploadedImageUrl = await uploadFile(data.image[0], 'a4ydrfkx', 'image');
    const uploadedVideoUrl = await uploadFile(data.video[0], 'a4ydrfkx', 'video');


    setImageUrl(uploadedImageUrl);
    setVidUrl(uploadedVideoUrl);
    setPostName(data.exerciseName);
    setPostCategory(data.category)
    setPostDuration(data.category)
    setPostCategory(data.category)
    setPostDuration(data.duration);
    setPostCalorie(data.calories);
    setPostSets(data.sets);
    setPostRepeat(data.repeat);
    setPostRest(data.rest);
    setPostContent(data.content);


    console.log("Image URL:", uploadedImageUrl);
    console.log("Video URL:", uploadedVideoUrl);
    console.log(data)



    const postData = {
      workoutImg: uploadedImageUrl,
      workoutName: data.exerciseName,
      workoutType: data.category,
      exercises: [{
        vidUrl: uploadedVideoUrl,
        duration: data.duration,
        calories: data.calories,
        sets: data.sets,
        repeat: data.repeat,
        rest: data.rest,
        content: data.content
      }],
      createdBy: admin
    };

    try {

      const response = await axios.post("http://localhost:3306/social/post", postData);
      console.log("Post created:", response.data);
      reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <div className="add-post-radix-button h-[15vh] w-[90%] m-auto mt-[2vh]">
            <button className="shadow-white-50 text-black-50  m-auto text-[0.8rem] w-[40%] h-[50%] p-[1rem] flex items-center justify-center mb-[1vh] rounded-[4px] text-nowrap bg-neon-50 font-medium leading-none  focus:outline-none">
              Add Post
            </button>
          </div>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="bg-black-50 opacity-[0.5] data-[state=open]:animate-overlayShow fixed inset-0 z-40" />
          <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] z-50 left-[50%] w-[60vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none">

            <div className="create-post-container h-[90vh] flex flex-col justify-center items-center p-[1rem]">

              <div className="create-post-card w-[80%] bg-gray-50 rounded-[1rem] overflow-y-auto no-scrollbar">
                <form
                  className="create-post-form flex flex-col justify-center items-center gap-[2vh] p-[1rem] "
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Dialog.Close asChild className="self-start">
                    <Cross2Icon />
                  </Dialog.Close>
                  <input
                    className="create-post-input w-[70%] border-b bg-gray-50 border-neon-50 focus:outline-none"
                    placeholder="Upload Image"
                    type="file"
                    {...register("image")}
                  />
                  {imageUrl && <img src={imageUrl} alt="Uploaded Image" style={{ maxWidth: '100%', maxHeight: '200px' }} />}
                  <input
                    className="create-post-input w-[70%] border-b bg-gray-50 border-neon-50 focus:outline-none"
                    placeholder="Upload Video"
                    type="file"
                    {...register("video")}
                  />
                  {vidUrl && (
                    <video width="320" height="240" controls>
                      <source src={vidUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}

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
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

export default CreatePost;
