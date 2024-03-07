import { AppContext } from "../AppContext";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Social() {
  // use Effect for all the posts !!!
  //
  // const handelCategory = ({workoutName}) => {

  // }
  // in every clicked category its send to the Workouts.jsx page the admin workouts
  const { useData, setUserData } = useContext(AppContext);
  const navigate = useNavigate();
  const workoutData = [
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aaea3dc98b7f88ca0b9725311bcbca41b66ada986ca25a898b87751f412dd57e?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Chest workout",
      workoutType: "Chest",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/aa13837c4954df6adbb7bab7a21ed3aee394735aedd2ada40de03745b37af35e?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Lats workout",
      workoutType: "Lats",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/2cbd6a1db85cb7fa70ef07e5017b8028a26e77760bbda7f86f5e1ab19af556c9?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Abs workout",
      workoutType: "Abs workout",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/766cb171de991b261822884f96e9af709299995027bfffccf8594b08bc35065f?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Legs workout",
      workoutType: "Legs",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/1a386e93af564812e3b14e6a76c067f250f948f83256a10110ad80e33385e17c?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Deltoid workout",
      workoutType: "Deltoid workout",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e339635bbfc33f57298c33c65251887171d09a49972c78d6781c431997450f8c?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Biceps workout",
      workoutType: "Biceps workout",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6db863dd39e702e849289d4a2028d99b5d1f50f33a3fcfe4c55d049c380fc7f0?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Triceps workout",
      workoutType: "Triceps workout",
    },
    {
      workoutImg:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/af3d831c0c397f837f08ffa30af665ab2bc7151f144cdcfa075569e5839f2f05?apiKey=965fd9b505a64ba491bd6169c5185d54&",
      workoutName: "Full Body workout",
      workoutType: "Full Body workout",
    },
  ];
  const handleWorkoutClick = ({ workoutType }) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      workoutType: workoutType,
    }));

    navigate("/social/workouts");
  };

  const WorkoutCard = ({ workoutImg, workoutName, workoutType }) => (
    <div
      className="social-img justify-center items-center"
      onClick={() => handleWorkoutClick({ workoutType })}
    >
      <div className="flex relative flex-col pt-12 pr-12 pb-4 pl-4 w-40 aspect-square ">
        <img
          loading="lazy"
          src={workoutImg}
          alt={workoutType}
          className="object-cover absolute inset-0 w-full h-full"
        />
        <div className="flex relative gap-[5px] justify-between mt-20">
          <div className="my-auto w-0.5 h-3 bg-neon-50"></div>
          <div className="grow">{workoutName}</div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className="social-container h-screen w-screen flex items-center justify-center phone:bg-black-50 ">
        <div className="social-card w-[40vw] max-h-[90vh] overflow-y-auto phone:w-screen phone:h-screen phone:w-screen  ">
          <div className="social-box flex flex-col  text-sm text-neon-50 whitespace-nowrap bg-black-50 phone:w-screen phone:h-screen  ">
            <div className="self-center text-[2rem] mt-[2vh] font-semibold text-neon-50">
              Social
            </div>
            <div className="flex flex-wrap gap-2.5 justify-center mt-[4vh]  ">
              {/* for navbar workouts  */}
              {workoutData.map((workout, index) => (
                <button key={index}>
                  <WorkoutCard
                    workoutImg={workout.workoutImg}
                    workoutName={workout.workoutName}
                    workoutType={workout.workoutType}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Social;
