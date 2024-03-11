import React from "react";
import AdminUsers from "../components/AdminUsers";
import SearchBar from "../components/SearchBar";
// import CreateUser from "../components/CreateUser";

function UsersList() {
  //gets admin id and fetches its users in useEffect()!!!

  let users = [
    {
      fullName: "omerbenezra",
      phoneNumber: "0503220132",
      email: "bene@gmail",
    },
    {
      fullName: "edemilo",
      phoneNumber: "0504705602",
      email: "edenmilo@gmail",
    },
  ];

  return (
    <>
      <div className="users-list-container w-screen h-screen flex flex-col items-center justify-center">
        <div className="users-list-card w-[40vw] h-[90vh] bg-black-50 rounded-[2rem]">
          <div className="users-list-box w-full h-full">
            <header className="users-list-header h-[25%]">
              <h2 className="users-list-main-header text-[2rem] p-[1vh] text-neon-50">
                Your Students List{" "}
              </h2>
              <SearchBar users={users} />
            </header>
            <hr className="hr-costume text-neon-50" />
            <div className="users-list-content h-[75%]">
              <ul className="list-element-UserList p-[0.4rem]">
                {users.map((user, index) => (
                  <li className="list-item-element p-[5px]" key={index}>
                    <AdminUsers user={user} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
{
  /* <CreateUser users={users} /> */
}

export default UsersList;
