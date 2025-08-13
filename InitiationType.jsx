import React from 'react';
import {
  Box,
  Typography,
} from '@mui/material';

// InitiationType Component
export const InitiationType = ({ selectedType = 'forMe', onChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Typography sx={{ fontWeight: 700, fontSize: 15, color: '#111827' }}>Initiation Type</Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
        <input 
          type="radio" 
          id="forMe" 
          name="initiationType" 
          checked={selectedType === 'forMe'}
          onChange={() => onChange && onChange('forMe')}
          style={{ accentColor: '#2563EB', width: 18, height: 18, marginRight: 6 }} 
        />
        <label htmlFor="forMe" style={{ fontWeight: 500, fontSize: 15, color: selectedType === 'forMe' ? '#111827' : '#6B7280', marginRight: 18 }}>
          For Me
        </label>
        <input 
          type="radio" 
          id="forMyReportee" 
          name="initiationType" 
          checked={selectedType === 'forMyReportee'}
          onChange={() => onChange && onChange('forMyReportee')}
          style={{ accentColor: '#2563EB', width: 18, height: 18, marginRight: 6 }} 
        />
        <label htmlFor="forMyReportee" style={{ fontWeight: 500, fontSize: 15, color: selectedType === 'forMyReportee' ? '#111827' : '#6B7280' }}>
          For My Reportee
        </label>
      </Box>
    </Box>
  );
}; 