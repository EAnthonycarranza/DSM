// client/src/components/Photos.js

import React from 'react';
import { Typography, Box } from '@mui/material';

const Photos = ({ userId }) => {
  return (
    <Box>
      <Typography variant="h6">Photos for User ID: {userId}</Typography>
      {/* Add photos content here */}
    </Box>
  );
};

export default Photos;
