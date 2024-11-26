import React from "react";
import FilteredUserLists from "../Organisms/FilteredUsers";

export const users = [
  { id: 1, name: "Alex", age: 30 },
  { id: 2, name: "Belva", age: 22 },
  { id: 3, name: "Chris", age: 27 },
  { id: 4, name: "Diana", age: 24 },
  { id: 5, name: "Evelyn", age: 29 },
];

const UserPage = () => {
  return (
    <div>
      <h1>Daftar Pengguna</h1>
      <FilteredUserLists users={users} />
    </div>
  );
};

export default UserPage;
