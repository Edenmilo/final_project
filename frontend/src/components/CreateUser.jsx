import React from "react";
import { useState } from "react";
import PhoneInput, {
  formatPhoneNumber,
  formatPhoneNumberIntl,
} from "react-phone-number-input";
import "./CreateUser.css";
function CreatUser({ users }) {
  //in userslist we gets the users array and we send it into here, updating it, asendimg update request to the server. in users list we doing fetch to the users list in use effect.

  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState([]);
  const [age, setAge] = useState("");
  const [goalWeight, setGoalWeight] = useState("");
  const [fatPrecent, setsetFatPrecent] = useState("");

  return (
    <>
      <div>
        <form>
          <label>Full Name:</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          ></input>
          <hr />
          <label>E- Mail:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <hr />
          <label>User Name:</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
          <hr />
          <label>Password::</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <hr />
          <PhoneInput
            placeholder="Enter phone number"
            value={phoneNumber}
            onChange={setPhoneNumber}
          />
          <p>Phone Number: {phoneNumber && formatPhoneNumber(phoneNumber)}</p>{" "}
          //dont forget the function for the front!!!
          <hr />
          <hr />
          <label>Height, cm:</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          ></input>
          <hr />
          <label>Weight, kg:</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          ></input>
          <hr />
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
          <hr />
          <label>Goal Weight, kg:</label>
          <input
            type="number"
            value={goalWeight}
            onChange={(e) => setGoalWeight(e.target.value)}
          ></input>
          <hr />
          <label>Fat % For Body</label>
          <input
            type="number"
            value={fatPrecent}
            onChange={(e) => setsetFatPrecent(e.target.value)}
            min={0}
            max={100}
          ></input>
          <hr />
          <hr />
          {/* <button onClick={handelSubmit}>Add Student!</button> */}
        </form>
      </div>
    </>
  );
}

export default CreatUser;
