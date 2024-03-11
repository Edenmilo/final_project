import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "../context/AppContext";
import "./createUser.css";

function CreateUser({ users }) {
  //in userslist we gets the users array and we send it into here, updating it, asendimg update request to the server. in users list we doing fetch to the users list in use effect.

  const {
    fullName,
    setFullName,
    userName,
    setUserName,
    email,
    setEmail,
    password,
    setPassword,
    phoneNumber,
    setPhoneNumber,
    height,
    setHeight,
    weight,
    setWeight,
    age,
    setAge,
    goalWeight,
    setGoalWeight,
    fatPercent,
    setFatPercent,
  } = useContext(AppContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [currentPage, setCurrentPage] = useState(1);
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <div className="add-user-container w-full flex flex-col justify-center items-center">
        <div className="card-container m-auto bg-gray-50 rounded-[1rem] mb-[5vh]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="add-user-form flex flex-col items-center justify-center p-[1rem] w-[30vw]"
          >
            {/* Page 1 */}
            {currentPage === 1 && (
              <>
                <label>Full Name:</label>
                <input
                  type="text"
                  {...register("fullName", { minLength: 3, maxLength: 20 })}
                />
                <hr />
                <label>Email:</label>
                <input
                  type="email"
                  {...register("email", { minLength: 3, maxLength: 20 })}
                />
                <label>User Name:</label>
                <input
                  type="text"
                  {...register("userName", { minLength: 3, maxLength: 20 })}
                />
                <hr />
                <label>Password:</label>
                <input
                  type="password"
                  {...register("password", { minLength: 8, maxLength: 16 })}
                />
                <hr />
                <label>Phone Number: </label>
                <input
                  type="phone"
                  {...register("phone", { minLength: 9, maxLength: 11 })}
                />
                <hr />
                {/* Add other fields for the first page */}
                <div className="flex justify-end mt-4 w-[30vw]">
                  <button
                    type="button"
                    onClick={nextPage}
                    className="btn-next p-[10px] pr-[15px] "
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Page 2 */}
            {currentPage === 2 && (
              <>
                <label>Height:</label>
                <input type="number" {...register("height")} placeholder="Cm" />

                <label>Weight:</label>
                <input type="number" {...register("weight")} placeholder="Kg" />
                <hr />
                <label>Age:</label>
                <input type="number" {...register("age", { required: true })} />
                <hr />
                <label>Goal Weight:</label>
                <input
                  type="number"
                  {...register("goalWeight", { required: true })}
                  placeholder="Kg"
                />
                <hr />
                <label>Fat Percentage</label>
                <input
                  type="number"
                  {...register("fatPercent")}
                  min={0}
                  max={100}
                  placeholder="%"
                />
                <hr />
                <div className="flex flex-col w-[90%] justify-between mt-4">
                  <button
                    type="submit"
                    className="btn-submit text-black-50 bg-neon-50 w-[60%] m-auto"
                  >
                    Create User
                  </button>
                  <button
                    type="button"
                    onClick={prevPage}
                    className="btn-prev self-start p-[10px]"
                  >
                    Back
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default CreateUser;
