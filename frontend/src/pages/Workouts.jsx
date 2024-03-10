import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

function Workouts() {
  const exercise = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxvIyTfcNu0WxiTaIIKwSR0RC77L3HQdR-g&usqp=CAU",
      alt: "Profile picture of Richard Will",
      name: "Butterfly",
      level: "4",
      expertise: "High Intensity Training",
      experience: "5 years",
      type: "Chest",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxvIyTfcNu0WxiTaIIKwSR0RC77L3HQdR-g&usqp=CAU",
      alt: "Profile picture of Jennifer James",
      name: "lunches",
      level: "5",
      expertise: "Functional Strength",
      experience: "4 years",
      type: "Legs",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxvIyTfcNu0WxiTaIIKwSR0RC77L3HQdR-g&usqp=CAU",
      alt: "Profile picture of Jennifer James",
      name: "Functional Str",
      level: "5",
      expertise: "Functional Strength h",
      experience: "4 years",
      type: "Lats",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxvIyTfcNu0WxiTaIIKwSR0RC77L3HQdR-g&usqp=CAU",
      alt: "Profile picture of Jennifer James",
      name: "Bench press",
      level: "5",
      expertise: "Functional",
      experience: "4 years",
      type: "Chest",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZxvIyTfcNu0WxiTaIIKwSR0RC77L3HQdR-g&usqp=CAU",
      alt: "Profile picture of Jennifer James",
      name: "Bench press",
      level: "5",
      expertise: "Functional",
      experience: "4 years",
      type: "Chest",
    },
  ];

  const { loginData, setLoginData } = useContext(AppContext);
  useEffect(() => {
    setLoginData(localStorage.getItem("loginData"));
    console.log(loginData);
  }); /// instead of loginData will be a state in the context

  const navigate = useNavigate();
  const selectedWorkoutType = loginData.workoutType || "";

  const filteredExercises = exercise.filter(
    (ex) => ex.type === selectedWorkoutType
  );

  ////////////////////////////////////////////////////////////////////////////////////////
  const ExerciseCard = ({ src, name, level, expertise, experience, alt }) => (
    <div className="exercise-card bg-gray-50 flex items-center justify-evenly gap-[1rem] w-[95%] p-[3px] mt-[3vh] rounded-[10px] phone:w-[80%]">
      <div className="exercise-content w-[100%] flex flex-row items-center justify-center">
        <div className="exercise-image">
          <img
            loading="lazy"
            src={src}
            alt={alt}
            className="w-[3rem] rounded-full aspect-square "
          />
        </div>
        <div className="exercise-content-box w-[100%] flex justify-between items-start shrink phone:h-full">
          <div className=" exercise-main-content w-[100%] flex flex-col self-start">
            <div className="flex items-center justify-center gap-[1vw] phone:gap-[3vw]">
              <div className="exercise-name whitespace-nowrap font-semibold text-white text-[0.8rem] phone:text-[2rem]">
                {name}
              </div>
              <div className="flex flex-col justify-center my-auto  font-bold leading-3 text-center text-black">
                <div className="justify-center bg-neon-50 px-2 text-black-50 rounded text-[0.4rem] self-end">
                  {" "}
                  {level}{" "}
                </div>
              </div>
            </div>
            <div className="mt-[1vh] text-[0.5rem] text-neon-50 phone:text-[1rem]">
              {" "}
              {expertise}{" "}
            </div>
            <div className="text-[0.5rem] leading-3 text-neon-50 phone:text-[1rem] mb-[1vh]">
              {" "}
              {experience} experience{" "}
            </div>
          </div>
          <button className="arrow-button self-center">
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
                <ArrowBackIosIcon sx={{ fontSize: 15 }} />
              </button>
              <h2 className="flex-auto self-start text-neon-50">
                category name
              </h2>
            </header>
            <section className="workout-section  flex flex-col items-center justify-center phone:w-screen phone:h-full phone:justify-start  ">
              {/* {exercise.map((exercise, index) => (
                <ExerciseCard key={index} {...exercise} />
              ))} */}
              {filteredExercises.map((exercise, index) => (
                <ExerciseCard key={index} {...exercise} />
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Workouts;
