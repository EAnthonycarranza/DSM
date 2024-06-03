import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import UserTable from './UserTable';
import UserEditModal from './UserEditModal';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [filterText, setFilterText] = useState('');
  const [editingUser, setEditingUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(users.filter(user => user._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
      }
    }
  };

  const handleUpdate = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleSave = () => {
    setShowModal(false);
    setEditingUser(null);
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error.response ? error.response.data : error.message);
      }
    };

    fetchUsers();
  };

  return (
    <div className="admin-dashboard">
      <NavBar />
      <h2>Admin Dashboard</h2>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <UserTable users={users} filterText={filterText} onEdit={handleUpdate} onDelete={handleDelete} />
      <UserEditModal show={showModal} onClose={() => setShowModal(false)} user={editingUser} onSave={handleSave} />
    </div>
  );
};

export default AdminDashboard;
