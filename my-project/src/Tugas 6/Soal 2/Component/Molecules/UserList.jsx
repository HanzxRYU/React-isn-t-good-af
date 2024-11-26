import React from "react";
import ListItem from "../Atoms/ListItem";

const UserList = ({ users }) => {
  return (
    <ul className="list-disc list-inside space-y-2">
      {users.map((user, index) => (
        <ListItem key={index} text={user.name} />
      ))}
    </ul>
  );
};

export default UserList;
