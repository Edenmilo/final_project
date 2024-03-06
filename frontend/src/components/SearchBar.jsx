import React, { useState } from "react";

function SearchBar({ users }) {
  // i send from users list an array of all the users
  const [searchedUser, setSearchedUesr] = useState("");
  let fillteredList = [];
  if (searchedUser) {
    fillteredList = users.filter((user) => {
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
        onChange={(e) => setSearchedUesr(e.target.value)}
        placeholder="Search for students..."
      />
      <hr />

      <ul>
        {fillteredList.map((item, index) => (
          <li key={index}>
            {
              <ul>
                <li>{item.fullName}</li>
                <li>{item.phoneNumber}</li>
              </ul>
            }
            <hr />
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}

export default SearchBar;
