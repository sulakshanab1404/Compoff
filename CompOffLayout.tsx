import React from 'react';
import {
  Box,
  Typography,
  IconButton,
  Link,
} from '@mui/material';
import {
  Description,
  AccessTime,
} from '@mui/icons-material';
import Header from './Header';

interface CompOffLayoutProps {
  children: React.ReactNode;
  title: string;
  showBackButton?: boolean;
  onBackClick?: () => void;
}

// CompOffLayout Component
export const CompOffLayout: React.FC<CompOffLayoutProps> = ({ 
  children, 
  title, 
  showBackButton = false, 
  onBackClick 
}) => {
  const employeeData = {
    name: 'Manoj Kandan M',
    genId: '25504878',
    email: 'Manoj.kandan@partner.samsung.com',
    designation: 'Outsourcing',
    division: 'Tech Strategy Team\\Smart Infra Group\\Information System & AI Tools',
    manager: 'Ravindra S R (06786669)'
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', bgcolor: '#F9FAFB' }}>
      {/* Header */}
      <Header />
      
      {/* Main Content */}
      <Box sx={{ flex: 1, bgcolor: '#F9FAFB', p: { xs: 1, md: 3 } }}>
        {/* Breadcrumb */}
        <Typography sx={{ color: '#6B7280', fontSize: 13, mb: 1 }}>
          My Workspace {'>'} Comp off Pre Approval
        </Typography>
        
        {/* Title and Employee Info */}
        <Box sx={{ bgcolor: 'white', borderRadius: 2, p: 3, mb: 3, boxShadow: '0 1px 2px rgba(16,30,115,0.04)' }}>
          {/* Title Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            {showBackButton && (
              <IconButton onClick={onBackClick} sx={{ mr: 1, color: '#666' }}>
                ←
              </IconButton>
            )}
            <Typography sx={{ fontWeight: 700, fontSize: 20, color: '#111827', mr: 1 }}>
              {title}
            </Typography>
            <IconButton size="small" sx={{ color: '#00b0ff' }}>
              <AccessTime fontSize="small" />
            </IconButton>
          </Box>

          {/* Employee Details Section - Horizontal Layout */}
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 4, 
            alignItems: 'flex-start',
            borderTop: '1px solid #E5E7EB',
            pt: 3
          }}>
            {/* Employee Profile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, minWidth: 280 }}>
              <Box sx={{ position: 'relative' }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: '50%', 
                  overflow: 'hidden', 
                  border: '1px solid #E5E7EB',
                  bgcolor: '#4CAF50'
                }}>
                  <Box 
                    component="img"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=48&h=48&fit=crop&crop=face"
                    alt="Manoj Kandan M"
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover'
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 2,
                    right: 2,
                    width: 12,
                    height: 12,
                    backgroundColor: '#4CAF50',
                    borderRadius: '50%',
                    border: '2px solid white',
                  }}
                />
              </Box>
              <Box>
                <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>
                  {employeeData.name} • Gen ID: {employeeData.genId}
                </Typography>
                <Typography sx={{ fontSize: 14, color: '#6B7280' }}>{employeeData.email}</Typography>
              </Box>
            </Box>

            {/* Designation */}
            <Box sx={{ minWidth: 120 }}>
              <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 0.5 }}>Designation</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{employeeData.designation}</Typography>
            </Box>

            {/* Division */}
            <Box sx={{ minWidth: 300, flex: 1 }}>
              <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 0.5 }}>Division</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{employeeData.division}</Typography>
            </Box>

            {/* Manager */}
            <Box sx={{ minWidth: 200 }}>
              <Typography sx={{ fontSize: 14, color: '#6B7280', mb: 0.5 }}>Manager</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827' }}>{employeeData.manager}</Typography>
            </Box>
          </Box>
        </Box>

        {/* Content */}
        {children}
        
        {/* View Policies Link - Reusable component */}
        <Box sx={{ mt: 2 }}>
          <Link href="#" underline="hover" sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#6B7280' }}>
            <Description fontSize="small" />
            View Policies
          </Link>
        </Box>
      </Box>
    </Box>
  );
}; 