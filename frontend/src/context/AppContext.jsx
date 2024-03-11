import { createContext, useState } from "react";

export const AppContext = createContext({
  //login
  loginData: {},
  setLoginData: () => {},
  //calender
  title: "",
  setTitle: () => {},
  startDate: "",
  setStartDate: () => {},
  endDate: "",
  setEndDate: () => {},
  studentsLimit: "",
  setStudentsLimit: () => {},
  summary: "",
  setSummary: () => {},
  events: [],
  setEvents: () => {},
  //create users
  fullName: "",
  setFullName: () => {},
  userName: "",
  setUserName: () => {},
  email: "",
  setEmail: () => {},
  password: "",
  setPassword: () => {},
  phoneNumber: "",
  setPhoneNumber: () => {},
  height: "",
  setHeight: () => {},
  weight: [],
  setWeight: () => {},
  age: "",
  setAge: () => {},
  goalWeight: "",
  setGoalWeight: () => {},
  fatPercent: "",
  setFatPercent: () => {},
  //social
  workoutData: {},
  setWorkoutData: () => {},
  workoutCategory: "",
  setWorkoutCategory: () => {},
});

export const ContextProvider = ({ children }) => {
  //logIn
  const [loginData, setLoginData] = useState({});
  //Calender
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [studentsLimit, setStudentsLimit] = useState("");
  const [summary, setSummary] = useState("");
  const [events, setEvents] = useState([]);
  //create users
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState([]);
  const [age, setAge] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [fatPercent, setFatPercent] = useState("");
  // social
  const [workoutData, setWorkoutData] = useState([]);
  const [workoutCategory, setWorkoutCategory] = useState("");

  const contextValue = {
    //login
    loginData,
    setLoginData,
    //calender
    title,
    setTitle,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    studentsLimit,
    setStudentsLimit,
    summary,
    setSummary,
    events,
    setEvents,
    //create users
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
    //social
    workoutData,
    setWorkoutData,
    workoutCategory,
    setWorkoutCategory,
  };
  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};
