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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Daftar Pengguna</h1>
      <FilteredUserLists users={users} />
    </div>
  );
};

export default UserPage;
