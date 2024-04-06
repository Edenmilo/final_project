import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import axios from "axios";
import { AppContext } from "../context/AppContext";

function Exercises() {
  const { exerciseId } = useContext(AppContext)
  const navigate = useNavigate()
  const [exerciseData, setExerciseData] = useState([])
  const [exerciseDetails, setExerciseDetails] = useState([])

  useEffect(() => {
    console.log(exerciseId)
    const receiveExerciseById = async () => {
      try {
        const res = await axios.get(`http://localhost:3306/social/${exerciseId}`)
        const postData = res.data
        const exerciseData = postData.exercises[0]
        console.log(postData)
        setExerciseData(postData)
        console.log(exerciseData)
        setExerciseDetails(exerciseData)
      } catch (error) {
        console.error("Error receiving post:", error)
      }
    }
    receiveExerciseById()
  }, [])
  console.log(exerciseData)
  console.log(exerciseDetails)

  const { workoutName, workoutType } = exerciseData
  const { calories, content, duration, repeat, rest, sets, vidUrl } = exerciseDetails;
  const url = vidUrl
  console.log(vidUrl)

  const WorkoutStat = ({ iconSrc, altText, label }) => (
    <div className="flex bg-gray-50 rounded-[50px] p-[3px]">
      <img
        loading="lazy"
        src={iconSrc}
        alt={altText}
        className="shrink-0 aspect-square w-[30%] p-[1%]"
      />
      <div className="label self-center">{label}</div>
    </div>
  );

  const Divider = () => (
    <img
      loading="lazy"
      alt="Divider"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/90bc4e99207f1debaa8836c2432a2fbd2e630245e7cc74f85389cbc46af6401f?apiKey=965fd9b505a64ba491bd6169c5185d54&"
      className="shrink-0 w-px h-[85%] self-center border border-solid aspect-[0.02] border-neutral-700 stroke-[1px] stroke-neutral-700"
    />
  );

  const WorkoutDetails = ({ number, description }) => (
    <div className="flex flex-col my-auto">
      <div className="font-semibold text-white">{number}</div>
      <div className="text-white">{description}</div>
    </div>
  );

  return (
    <>
      <div className="exercise-container w-screen h-screen flex flex-col items-center justify-center">
        <div className="exercise-card w-[40%] h-[90%] bg-black-50 overflow-y-auto no-scrollbar">
          <div className="exercise-box flex flex-col h-full w-full relative">

            <section className="exercise-section flex overflow-hidden relative justify-center items-start pt-[100%] w-full aspect-[1.11]">
              <video
                width={500}
                height={500}
                className="object-cover absolute inset-0 size-full"
                controls
                src={vidUrl}
              >
                This browser not support this video
              </video>
            </section>
            {/* the content */}
            <div className="exercise-content flex flex-col p-[1vw] items-center w-full h-full">
              <button className="return-workouts-button w-[30px] h-[30px] relative self-start"
                onClick={() => { navigate("/social/workouts") }}>
                <ArrowBackIosIcon
                  sx={{ fontSize: 15 }} />
              </button>
              <h2 className="exercise-header self-start text-[1.2rem] font-semibold text-white m-auto">
                Exercise Name - {workoutName}
              </h2>
              <p className="exercise-sub-header self-start m-auto text-[0.7rem] text-neon-50 whitespace-nowrap">
                Workouts for {workoutType}
              </p>
              {/* workout cal and min */}
              <div className="exercise-labels flex gap-[1vw] mt-2.5 justify-center text-[0.7rem] text-white">
                <WorkoutStat
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a22e98772e0bb0e92c5fbe5cdfcee454868f7817567ff4c03f5ec93a60496281?apiKey=965fd9b505a64ba491bd6169c5185d54&"
                  altText="Duration icon"
                  label={`${duration} min`}
                />
                <WorkoutStat
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/be67ffc49182f7121d794cd60f54bec512f6978a804a22ccc9a442151ff610cc?apiKey=965fd9b505a64ba491bd6169c5185d54&"
                  altText="Calories icon"
                  label={`${calories} cal`}
                />
              </div>
              {/* sets , rest and reapet */}
              <div className="exercise-details flex justify-center w-full mt-5 text-center rounded-2xl bg-gray-50">
                <div className="flex gap-[3vw] justify-evenly whitespace-nowrap">
                  <WorkoutDetails number={sets} description="Sets" />
                  <Divider />
                  <WorkoutDetails number={repeat} description="Repeats" />
                  <Divider />
                  <WorkoutDetails number={`${rest} sec`} description="Rest" />
                </div>
              </div>
              <p className="mt-10 text-base leading-5 text-white">
                {content}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;
