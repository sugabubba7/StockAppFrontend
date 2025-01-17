import React from 'react';

function UserChatBox({ message }) {
  return (
    <div className="flex justify-end items-center gap-3 m-6"> 
      <div className="w-2/5 p-5 bg-gray-500 text-white border rounded-lg">
        <p className="break-words text-[15px]">{message}</p>
      </div>
      <img src="./User.png" alt="User Image" width={50} className="rounded-full" />
    </div>
  );
}

export default UserChatBox;
