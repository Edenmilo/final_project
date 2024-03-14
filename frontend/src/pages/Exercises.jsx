import React from "react";

function Exercises() {
  const WorkoutStat = ({ iconSrc, altText, label }) => (
    <div className="flex bg-gray-50 rounded-[50px] ">
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
        <div className="exercise-card w-[40%] h-[90%] bg-black-50 overflow-y-auto">
          <div className="exercise-box flex flex-col h-full w-full relative">
            <section className="exercise-section flex overflow-hidden relative justify-center items-start pt-[100%] w-full aspect-[1.11]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/54c329e1e4f8b1f607423485b193ead5257a40cc933eb5d6ab88df62d3a44b11?apiKey=965fd9b505a64ba491bd6169c5185d54&"
                alt="Workout background"
                className="object-cover absolute inset-0 size-full"
              />
            </section>
            {/* the content */}
            <div className="exercise-content flex flex-col p-[1vw] items-center mt-[2vh] w-full h-full">
              <h2 className="exercise-header self-start text-[1.2rem] font-semibold text-white m-auto whitespace-nowrap">
                Day 01 - Warm Up
              </h2>
              <p className="exercise-sub-header self-start m-auto text-[0.7rem] text-neon-50 whitespace-nowrap">
                04 Workouts for Beginner
              </p>
              {/* workout cal and min */}
              <div className="exercise-labels flex gap-[1vw] mt-2.5 justify-center text-[0.5rem] text-white">
                <WorkoutStat
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/a22e98772e0bb0e92c5fbe5cdfcee454868f7817567ff4c03f5ec93a60496281?apiKey=965fd9b505a64ba491bd6169c5185d54&"
                  altText="Duration icon"
                  label="60 min"
                />
                <WorkoutStat
                  iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/be67ffc49182f7121d794cd60f54bec512f6978a804a22ccc9a442151ff610cc?apiKey=965fd9b505a64ba491bd6169c5185d54&"
                  altText="Calories icon"
                  label="350 Cal"
                />
              </div>
              {/* sets , rest and reapet */}
              <div className="exercise-details flex justify-center w-full mt-5 text-center rounded-2xl bg-gray-50">
                <div className="flex gap-[3vw] justify-evenly whitespace-nowrap">
                  <WorkoutDetails number="6" description="Sets" />
                  <Divider />
                  <WorkoutDetails number="46" description="Repeats" />
                  <Divider />
                  <WorkoutDetails number="125 sec" description="Rest" />
                </div>
              </div>
              <p className="mt-10 text-base leading-5 text-white">
                Want your body to be healthy. Join our program with directions
                according to body’s goals. Increasing physical strength is the
                goal of strenght training. Maintain body fitness by doing
                physical exercise at least 2-3 times a week.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Exercises;
