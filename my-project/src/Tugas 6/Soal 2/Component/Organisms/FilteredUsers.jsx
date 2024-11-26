import React from "react";
import UserList from "../Molecules/UserList";

const FilteredUserLists = ({ users }) => {
  // Semua pengguna
  const allUsers = users.map((user) => ({ name: user.name }));

  // Pengguna dengan usia > 25
  const usersAbove25 = users
    .filter((user) => user.age > 25)
    .map((user) => ({ name: user.name }));

  // Pengguna dengan nama mengandung huruf 'e'
  const usersWithE = users
    .filter((user) => user.name.includes("e"))
    .map((user) => ({ name: user.name }));

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-blue-600 mb-2">Semua Pengguna</h2>
      <UserList users={allUsers} />

      <h2 className="text-xl font-bold text-blue-600 mb-2">
        Pengguna Usia di Atas 25
      </h2>
      <UserList users={usersAbove25} />

      <h2 className="text-xl font-bold text-blue-600 mb-2">
        Pengguna dengan Huruf 'e'
      </h2>
      <UserList users={usersWithE} />
    </div>
  );
};

export default FilteredUserLists;
