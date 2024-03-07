import React from "react";
import SmallUser from "../components/SmallUser";
import SearchBar from "../components/SearchBar";
import CreatUser from "../components/CreateUser";

function UsersList() {//gets admin id and fetches its users in useEffect()!!!
 
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
    <SearchBar users={users}/>
    <ul>
        {users.map((user, index) => (
          <li key={index}>
            <SmallUser user={user} />
            <hr />
          </li>
            
        ))}
      </ul>
      <CreatUser users={users}/>
    </>
  );
}

export default UsersList;
