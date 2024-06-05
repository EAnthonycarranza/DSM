// client/src/components/Form.js

import React from 'react';
import { Typography, Box } from '@mui/material';

const Form = ({ userId }) => {
  return (
    <Box>
      <Typography variant="h6">Forms for User ID: {userId}</Typography>
      {/* Add form content here */}
    </Box>
  );
};

export default Form;
