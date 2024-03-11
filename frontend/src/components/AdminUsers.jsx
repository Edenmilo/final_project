import React from "react";

function AdminUsers({ user }) {
  const { fullName, phoneNumber, email } = user;

  return (
    <>
      <div className="flex flex-col font-semibold text-white-50 p-[0.7rem] rounded-2xl bg-gray-50">
        <ul className="user-list-element w-full ">
          <li className="p-[5px]">
            <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
              Full Name:
            </span>{" "}
            {fullName}
          </li>
          <li>
            <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
              Phone Number:
            </span>{" "}
            {phoneNumber}
          </li>
          <li className="p-[5px]">
            <span className="border-neon-50 border-b-[1px] self-center text-[1.1rem]">
              Email:
            </span>{" "}
            {email}
          </li>
        </ul>
      </div>
    </>
  );
}

export default AdminUsers;
