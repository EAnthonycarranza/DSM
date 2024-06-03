import React from 'react';
import TextField from '@mui/material/TextField';

const SearchFilter = ({ filterText, setFilterText }) => {
  return (
    <TextField
      fullWidth
      label="Search"
      variant="outlined"
      value={filterText}
      onChange={e => setFilterText(e.target.value)}
      style={{ marginBottom: '20px' }}
    />
  );
};

export default SearchFilter;

