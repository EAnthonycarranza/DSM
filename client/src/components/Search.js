// client/src/components/Search.js

import React, { useState, useEffect } from 'react';
import { TextField, Autocomplete, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

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

  const handleSearchChange = (event, value) => {
    setSearchTerm(value);
  };

  const handleSearchClick = (event, value) => {
    const selectedUser = users.find(user => `${user?.personalInfo?.firstName} ${user?.personalInfo?.lastName}` === value);
    if (selectedUser) {
      navigate(`/admindashboard/${selectedUser._id}`);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
      <Autocomplete
        options={users.map(user => {
          const firstName = user?.personalInfo?.firstName || '';
          const lastName = user?.personalInfo?.lastName || '';
          return `${firstName} ${lastName}`;
        })}
        onInputChange={handleSearchChange}
        onChange={handleSearchClick}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="Search Users"
            size="small"
            style={{ marginRight: 8, backgroundColor: 'white', width: '100%' }}
          />
        )}
        style={{ flexGrow: 1 }}
      />
      <IconButton color="inherit" onClick={() => handleSearchClick(null, searchTerm)}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default Search;
