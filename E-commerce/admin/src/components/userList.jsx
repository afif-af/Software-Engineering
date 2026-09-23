import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        backendUrl + '/api/user/list',
        {
          headers: {
            token: token
          }
        }
      );

      if (response.data.success) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-5">
        Customer List
      </h2>

      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-[50px_1fr_1.5fr_150px] gap-4 px-5 py-3 bg-gray-100 font-semibold text-sm">
          <p>#</p>
          <p>Name</p>
          <p>Email</p>
          <p>Phone</p>
        </div>

        {/* Users */}
        {users.length > 0 ? (
          users.map((user, index) => (
            <div
              key={user._id || index}
              className="grid grid-cols-[50px_1fr_1.5fr_150px] gap-4 px-5 py-4 border-t text-sm items-center"
            >
              <p>{index + 1}</p>
              <p>{user.name}</p>
              <p>{user.email}</p>
              <p>{user.phone || 'N/A'}</p>
            </div>
          ))
        ) : (
          <div className="py-10 text-center text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;