import React from "react";

const comment = ({ info }) => {
  const { description, user } = info;

  return (
    <div className="border-t-2 my-3">
      <h1 className=" nt-2 my-2 font-small text-yellow-200 text-sn">
        @{user.username}
      </h1>
      <p className="text-xs font-small pl-4">{description}</p>
    </div>
  );
};

export default comment;
