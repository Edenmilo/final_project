import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Workouts() {
  const { workoutData, setWorkoutData, workoutCategory, exerciseId, setExerciseId } =
    useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    const correctExercises = workoutData
      .filter((workout) => workout.workoutType === workoutCategory)
    setWorkoutData(correctExercises);

  }, [workoutCategory]);
  console.log(workoutData)
  console.log(exerciseId)

  const handelExercise = (id) => {
    setExerciseId(id)
    navigate("/social/workouts/exercises")
  }





  ////////////////////////////////////////////////////////////////////////////////////////
  const ExerciseCard = ({ workoutImg
    , workoutName, id }) => (
    <div className="exercise-card bg-gray-50 flex items-center justify-evenly gap-[1rem] w-[95%] p-[3px] mt-[3vh] rounded-[10px] phone:w-[90%]">
      <div className="exercise-content w-[100%] flex flex-row items-center justify-center">
        <div className="exercise-image">
          <img
            loading="lazy"
            src={workoutImg
            }
            className="w-[5rem] h-auto p-[5px] rounded-full aspect-square "
          />
        </div>
        <div className="exercise-content-box w-[100%] flex justify-between items-start shrink phone:h-full">
          <div className=" exercise-main-content w-[100%] flex flex-col self-start">
            <div className="flex items-center justify-center gap-[1vw] phone:gap-[3vw]">
              <div className="exercise-name whitespace-nowrap font-semibold text-white text-[0.8rem] phone:text-[2rem]">
                {workoutName}
              </div>
              <div className="flex flex-col justify-center my-auto  font-bold leading-3 text-center text-black">

              </div>
            </div>

          </div>
          <button className="arrow-button self-center" onClick={() => handelExercise(id)} >

            <ArrowForwardIcon sx={{ fontSize: 15 }} />
          </button>
        </div>
      </div>
    </div>
  );
  return (
    <>
      <div className="workout-container w-screen h-screen flex items-center justify-center ">
        <div className="workout-card w-[30vw] h-[90vh] overflow-y-auto bg-black-50 phone:w-screen phone:h-screen ">
          <div className="workout-box flex flex-col h-full  w-full">
            <header className="flex justify-between items-center text-[1.2em] p-[5px] ml-[5px] text-center text-white phone:text-[2.5rem]">
              <button
                onClick={() => {
                  navigate("/social");
                }}
              >
                <ArrowBackIosIcon
                  sx={{ fontSize: 15 }}
                  className="phone:w-[2vw] h-[3vh]"
                />
              </button>
              <h2 className="flex-auto self-start text-neon-50">
                category name
              </h2>
            </header>
            <section className="workout-section  flex flex-col items-center justify-center phone:w-screen phone:h-full phone:justify-start  ">
              {workoutData.map((exercise, index) => (
                <ExerciseCard key={index} workoutImg={exercise.workoutImg} workoutName={exercise.workoutName} id={exercise.id} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workouts;
