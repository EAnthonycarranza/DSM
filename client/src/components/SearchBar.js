import React from 'react';
import { TextField } from '@mui/material';

const SearchBar = ({ filterText, onFilterTextChange }) => (
  <TextField
    fullWidth
    label="Search"
    variant="outlined"
    value={filterText}
    onChange={e => onFilterTextChange(e.target.value)}
    style={{ marginBottom: '20px' }}
  />
);

export default SearchBar;
