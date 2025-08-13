import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

// RequiredInformationHeader Component
export const RequiredInformationHeader = ({ title = "Required Information" }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
      <Box sx={{ color: '#059669', mr: 1 }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V8L14 2Z" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 2V8H20" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 13H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 17H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M10 9H8" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </Box>
      <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>
        {title}
      </Typography>
    </Box>
  );
}; 