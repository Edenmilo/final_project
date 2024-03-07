import React from "react";
import { useForm } from "react-hook-form";

function Login() {
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
  /// api call from the backed to check is this user exist

  return (
    <>
      <div className="login-container bg-black text-white min-h-screen flex items-center">
        <div className="login-card flex flex-col justify-end   mx-auto h-[90vh] w-[30vw] bg-black-50 rounded-[20px] bg-[url('https://img.freepik.com/premium-photo/gorgeous-brunette-female-with-long-braids-doing-squats-using-barbell-side-view_944525-4104.jpg')] bg-cover bg-center phone:w-[100vw] phone:h-[100vh]">
          <div className="login-header-box w-full h-full flex items-center justify-center ">
            <h2 className=" login-header font-bold mt-[10vh] absolute  ">
              WELCOME BACK
            </h2>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="login-box flex flex-col items-center bg-black-50 h-[80vh] rounded-b-[20px]"
          >
            <div className="login-inputs flex flex-col items-center justify-center mb-[2vh] w-[90%] h-full relative phone:w-[90%] phone:h-full phone:gap-[2vh]  ">
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 w-full border-b  bg-black-50 text-white-50 text-[0.9rem]"
                placeholder="Email"
                {...register("email", { minLength: 5, required: true })}
              />
              {errors.email && (
                <span className="error-massage text-red-50 text-[0.5rem] phone:text-[1rem]">
                  email is require
                </span>
              )}

              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
                placeholder="Password"
                {...register("password", {
                  minLength: 8,
                  maxLength: 14,
                  required: true,
                })}
              />
              {errors.password && (
                <span className="error-massage text-red-50 text-[0.5rem] phone:text-[1rem]">
                  password is require
                </span>
              )}
              <button
                type="submit"
                className="bg-neon-50 mt-[4vh] p-[0.5rem] py-2 rounded-xl text-black-50 text-[0.8rem] phone:p-[1rem] phone:text-[1rem]"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
