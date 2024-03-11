import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    height: "",
    weight: "",
    age: "",
    goalWeight: "",
    bodyFat: "",
    menu: "",
  });

  const { userId } = useParams();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:3306/user/info/${userId}`);
        setUserInfo(response.data); // Set user info fetched from the server
        // Update updatedUser state with user info
        setUpdatedUser({
          username: response.data.username,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          height: response.data.height,
          weight:response.data.weight,
          age: response.data.age,
          goalWeight: response.data.goalWeight,
          bodyFat: response.data.bodyFat,
          menu: response.data.menu,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
  
    fetchUserInfo();
  }, [userId]);
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdateUser = async () => {
    try {
      await axios.post(`/user/info/${userId}`, updatedUser);
      // Refresh user info after update
      const response = await axios.get(`http://localhost:3306/user/info/${userId}`);
      setUserInfo(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await axios.post(`/user/delete/${userId}`);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (!userInfo) return <div>Loading...</div>;

  return (
    <div className="user-info-container">
      <h2>User Information</h2>
      {isEditing ? (
           <form>
           <input
             type="text"
             id="username"
             name="username"
             value={updatedUser.username}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Username"
           />
           <br />
           <input
             type="email"
             id="email"
             name="email"
             value={updatedUser.email}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Email"
           />
           <br />
           <input
             type="tel"
             id="phoneNumber"
             name="phoneNumber"
             value={updatedUser.phoneNumber}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Phone Number"
           />  
           <br />
           <input
             type="text"
             id="height"
             name="height"
             value={updatedUser.height}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Height"
           />
           <br />
           <input
             type="text"
             id="weight"
             name="weight"
             value={updatedUser.weight}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Weight"
           />
           <br />
           <input
             type="number"
             id="age"
             name="age"
             value={updatedUser.age}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Age"
           />
           <br />
           <input
             type="number"
             id="goalWeight"
             name="goalWeight"
             value={updatedUser.goalWeight}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Goal Weight"
           />
           <br />
           <input
             type="number"
             id="bodyFat"
             name="bodyFat"
             value={updatedUser.bodyFat}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Body Fat"
           />
           <br />
           <input
             type="text"
             id="menu"
             name="menu"
             value={updatedUser.menu}
             onChange={handleInputChange}
             className="mt-1 w-full border-b bg-black-50 text-white-50 text-[0.9rem]"
             placeholder="Menu"
           />
         </form>
      ) : (
        <div>
          <p>Username: {userInfo.username}</p>
          <p>Email: {userInfo.email}</p>
          <p>Phone Number: {userInfo.phoneNumber}</p>
          <p>Height: {userInfo.height}</p>
          <p>Weight: {userInfo.weight}</p>
          <p>Age: {userInfo.age}</p>
          <p>Goal Weight: {userInfo.goalWeight}</p>
          <p>Body Fat: {userInfo.bodyFat}</p>
          <p>Menu: {userInfo.menu}</p>
        </div>
      )}
      <div className="user-info-actions">
        <button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button onClick={handleUpdateUser}>Save</button>
        )}
        <button onClick={handleDeleteUser}>Delete</button>
      </div>
    </div>
  );
}

export default UserInfo;
