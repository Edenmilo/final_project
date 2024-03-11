import React, { useState } from "react";

function SearchBar({ users }) {
  // i send from users list an array of all the users
  const [searchedUser, setSearchedUser] = useState("");
  let filteredList = [];
  if (searchedUser) {
    filteredList = users.filter((user) => {
      return (
        user.fullName.toLowerCase().includes(searchedUser.toLowerCase()) ||
        user.phoneNumber.includes(searchedUser)
      );
    });
  }
  return (
    <>
      <input
        type="text"
        value={searchedUser}
        onChange={(e) => setSearchedUser(e.target.value)}
        placeholder="Search for students..."
        className="searched-users-input w-[90%] h-[8vh] rounded-[10px] indent-[10px]"
      />

      <div className="searched-users">
        {filteredList.map((item, index) => (
          <li key={index}>
            {
              <ul>
                <li>{item.fullName}</li>
                <li>{item.phoneNumber}</li>
              </ul>
            }
          </li>
        ))}
      </div>
    </>
  );
}

export default SearchBar;
