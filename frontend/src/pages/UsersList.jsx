import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function UsersList() {
  const [users, setUsers] = useState([]);
  const [searchedUser, setSearchedUser] = useState("");

  useEffect(() => {
    const fetchUsersForAdmin = async () => {
      try {
        const response = await axios.post("http://localhost:3306/user/adminusers");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users for admin:", error);
      }
    };

    fetchUsersForAdmin();
  }, []);

  const filteredList = users.filter((user) => {
    return (
      user.fullName.toLowerCase().includes(searchedUser.toLowerCase()) ||
      user.phoneNumber.includes(searchedUser)
    );
  });

  return (
    <>
      <div className="users-list-container w-full h-full flex flex-col items-center justify-center">
        <div className="users-list-card w-[40vw] h-[90vh] bg-black-50 rounded-[2rem]">
          <div className="users-list-box w-full h-full">
            <header className="users-list-header h-[25%]">
              <h2 className="users-list-main-header text-[2rem] p-[1vh] text-neon-50">
                Your Students List{" "}
              </h2>
              <input
                type="text"
                value={searchedUser}
                onChange={(e) => setSearchedUser(e.target.value)}
                placeholder="Search for students..."
                className="searched-users-input w-[90%] h-[8vh] rounded-[10px] indent-[10px]"
              />
            </header>
            <hr className="hr-costume text-neon-50" />
            <div className="users-list-content h-[75%]">
              <ul className="list-element-UserList p-[0.4rem]">
                {searchedUser === "" ? (
                  // Render all users if search input is empty
                  users.map((user, index) => (
                    <li className="list-item-element p-[5px]" key={index}>
                      <Link to={`/user/info/${user.id}`}>
                        <div className="flex flex-col font-semibold text-white-50 p-[0.7rem] rounded-2xl bg-gray-50">
                          <ul className="user-list-element w-full ">
                            <li className="p-[5px]">
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Full Name:
                              </span>{" "}
                              {user.fullName}
                            </li>
                            <li>
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Phone Number:
                              </span>{" "}
                              {user.phoneNumber}
                            </li>
                            <li className="p-[5px]">
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Email:
                              </span>{" "}
                              {user.email}
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                  ))
                ) : (
                  // Render filtered users if search input is not empty
                  filteredList.map((user, index) => (
                    <li className="list-item-element p-[5px]" key={index}>
                      <Link to={`/user/info/${user.id}`}>
                        <div className="flex flex-col font-semibold text-white-50 p-[0.7rem] rounded-2xl bg-gray-50">
                          <ul className="user-list-element w-full ">
                            <li className="p-[5px]">
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Full Name:
                              </span>{" "}
                              {user.fullName}
                            </li>
                            <li>
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Phone Number:
                              </span>{" "}
                              {user.phoneNumber}
                            </li>
                            <li className="p-[5px]">
                              <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
                                Email:
                              </span>{" "}
                              {user.email}
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UsersList;
