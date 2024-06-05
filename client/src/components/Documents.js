// client/src/components/Documents.js

import React from 'react';
import { Typography, Box } from '@mui/material';

const Documents = ({ userId }) => {
  return (
    <Box>
      <Typography variant="h6">Documents for User ID: {userId}</Typography>
      {/* Add documents content here */}
    </Box>
  );
};

export default Documents;
