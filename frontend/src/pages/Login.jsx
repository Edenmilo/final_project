import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function Login() {
  const { loginData, setLoginData } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    const { email, password } = data;

    axios.post("http://localhost:3306/admin/login", { email, password })

      .then((response) => {
        if (response.data["admin"]) {
          navigate("/");
        }
        if (response.data["user"]) {
          navigate("/homePage");
        } else {
          console.log("Invalid email or password");
        }
        setLoginData(response.data);
      });

    reset();
  };
  console.log(loginData);
  return (
    <>
      <div className="login-container bg-black text-white min-h-screen flex items-center">
        <div className="login-card flex flex-col justify-end   mx-auto h-[90vh] w-[30vw] bg-black-50 rounded-[20px] bg-[url('https://img.freepik.com/premium-photo/gorgeous-brunette-female-with-long-braids-doing-squats-using-barbell-side-view_944525-4104.jpg')] bg-cover bg-center phone:w-[100vw] phone:h-[100vh]">
          <div className="login-header-box w-full h-full flex items-center justify-center ">
            <h2 className=" login-header font-bold mt-[10vh] absolute">
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
                  minLength: 3,
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

// const adminSchema = {
//   admin1: {
//     id: 1,
//     useName: "artiom",
//     email: "artiom@artiom",
//     password: "asasasas",
//     phoneNumber: "055855346",
//     users: {
//       user1: {
//         id: 3,
//         useName: "adi",
//         email: "qqq@qqq",
//         password: "qqqqqqqq",
//         phoneNumber: "0558599999",
//       },
//       user2: {
//         id: 4,
//         useName: "DUDU",
//         email: "qq@qq",
//         password: "11111111",
//         phoneNumber: "0666666666",
//       },
//     },
//     adminId: 12,
//   },
//   // Admin2
//   admin2: {
//     id: 2,
//     useName: "Moti",
//     email: "artiom1@1artiom",
//     password: "qwqwqwqw",
//     phoneNumber: "0555555555",
//     adminId: 33,
//     users: {
//       user1: {
//         id: 3,
//         useName: "adi",
//         email: "bb@bb",
//         password: "qqqqqqqq",
//         phoneNumber: "0558599999",
//       },
//       user2: {
//         id: 4,
//         useName: "DUDU",
//         email: "bbb@bbb",
//         password: "11111111",
//         phoneNumber: "0666666666",
//       },
//     },
//   },
// };
