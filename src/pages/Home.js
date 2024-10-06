import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import DeleteConfirmation from '../components/DeleteConfirmation';
import Loading from '../components/Loading';
import { fetchUsers, createUser, updateUser, deleteUser } from '../utils/api';

function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const fetchedUsers = await fetchUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (userData) => {
    try {
      const newUser = await createUser(userData);
      setUsers([...users, newUser]);
      setIsFormOpen(false);
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const handleUpdateUser = async (userData) => {
    try {
      const updatedUser = await updateUser(userData);
      setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
      setIsFormOpen(false);
      setEditingUser(null);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const handleDeleteUser = async () => {
    if (!userToDelete) return;
    try {
      await deleteUser(userToDelete.id);
      setUsers(users.filter(user => user.id !== userToDelete.id));
      setIsDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded"
        />
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add User
        </button>
      </div>
      <UserList
        users={filteredUsers}
        onEdit={(user) => {
          setEditingUser(user);
          setIsFormOpen(true);
        }}
        onDelete={(user) => {
          setUserToDelete(user);
          setIsDeleteModalOpen(true);
        }}
      />
      <UserForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingUser(null);
        }}
        onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
        initialData={editingUser}
      />
      <DeleteConfirmation
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        userName={userToDelete?.name}
      />
    </div>
  );
}

export default Home;