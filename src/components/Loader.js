// src/components/Loader.js
import React from 'react';
import { CircularProgress, Box } from '@mui/material';

function Loader() {
  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress color="primary" />
    </Box>
  );
}

export default Loader;
