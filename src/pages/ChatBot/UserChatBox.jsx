import React from 'react';

function UserChatBox() {
  return (
    <div className="flex justify-end items-center gap-3 m-4">
      <div className="w-3/5 p-5 bg-gray-500 text-white border rounded-lg ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat optio at quo similique nam qui, consequuntur delectus cum laborum aliquam cumque tempora perferendis soluta suscipit architecto minus dolorum consectetur nulla!
      </div>
      <img src="./User.png" alt="User Image" width={50} className="rounded-full" />
    </div>
  );
}

export default UserChatBox;
