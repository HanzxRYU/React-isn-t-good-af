import React from "react";
import ListItem from "../Atoms/ListItem";

const UserList = ({ users }) => {
  return (
    <ul>
      {users.map((user, index) => (
        <ListItem key={index} text={user.name} />
      ))}
    </ul>
  );
};

export default UserList;
