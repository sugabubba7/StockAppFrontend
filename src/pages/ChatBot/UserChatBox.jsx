import React from 'react';

function UserChatBox({ message }) {
  return (
    <div className="flex justify-end items-center gap-4 m-6">
      <div className="max-w-[60%] p-3 bg-[#F4F4F6] text-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all">
        <p className="break-words text-[14px] leading-5 font-bold">{message}</p>
      </div>
      <img src="./User.png" alt="User Image" width={45} className="rounded-full shadow-sm hover:scale-105 transition-transform" />
    </div>
  );
}

export default UserChatBox;




