import React from "react";

function SmallUser({user}) {
 

  const {fullName, phoneNumber, email} = user;

  return (
    <>
      <div >
        <ul>
          <li>{fullName}</li>
          <li>{phoneNumber}</li>
          <li>{email}</li>
        </ul>
      </div>
    </>
  );
}

export default SmallUser;
