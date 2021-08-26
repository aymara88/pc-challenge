import React from "react";

const Table = (props) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Status</th>
        </tr>
      </thead>
      <tbody>
        {props.users &&
          props.users.map((user) => {
            return (
              <tr key={user.id}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td title={user.email_length && user.email_length}>
                  {user.email}
                </td>
                <td>{user.status ? "Active" : "Inactive"}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

export default Table;
