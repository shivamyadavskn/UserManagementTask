import React from 'react';
import { Link } from 'react-router-dom';

function UserList({ users, onEdit, onDelete }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
            
            <th className="py-3 px-6 text-left">UserName</th>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Email</th>
            <th className="py-3 px-6 text-left">Phone</th>
            <th className="py-3 px-6 text-left">Company</th>
            <th className="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {users.map((user, index) => (
            <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
              <td className="py-3 px-6 text-left whitespace-nowrap">
                <Link to={`/user/${user.id}`} className="font-medium text-blue-600 hover:text-blue-900">
                  {user.username}
                </Link>
              </td>
              <td className="py-3 px-6 text-left">{user.name}</td>
              <td className="py-3 px-6 text-left">{user.email}</td>
              <td className="py-3 px-6 text-left">{user.phone}</td>
              <td className="py-3 px-6 text-left">{user.company.name}</td>
              <td className="py-3 px-6 text-center">
                <button
                  onClick={() => onEdit(user)}
                  className="text-blue-500 hover:text-blue-700 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(user)}
                  className="text-red-500 hover:text-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;