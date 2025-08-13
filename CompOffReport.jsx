import React, { useState } from 'react';
import {
  Box,
  Typography,
  InputBase,
} from '@mui/material';
import { RequiredInformationHeader } from './RequiredInformationHeader';
import { InitiationType } from './InitiationType';
import { CompOffLayout } from './CompOffLayout.tsx';

const CompOffReport = ({ onBack, approvedRequests = [], initiationType = 'forMe' }) => {
  const [selectedInitiationType, setSelectedInitiationType] = useState(initiationType);

  // Filter requests based on initiation type
  const forMeRequests = approvedRequests.filter(request => request.initiationType === 'forMe');
  const forMyReporteeRequests = approvedRequests.filter(request => request.initiationType === 'forMyReportee');

  // Get status text for approval list - different for "For Me" vs "For My Reportee"
  const getStatusText = (status, rmRemarks, isForMyReportee = false) => {
    if (isForMyReportee) {
      // For "For My Reportee" - show detailed remarks
      return rmRemarks || 'Enter remarks.....';
    } else {
      // For "For Me" - show only status
      if (status === 'approved') {
        return 'Approved';
      } else if (status === 'rejected') {
        return 'Rejected';
      }
      return 'Pending';
    }
  };

  // Get status color for display
  const getStatusColor = (status) => {
    if (status === 'approved') {
      return { color: '#059669', bgcolor: '#D1FAE5' };
    } else if (status === 'rejected') {
      return { color: '#DC2626', bgcolor: '#FEE2E2' };
    }
    return { color: '#6B7280', bgcolor: '#F3F4F6' };
  };

  // Use appropriate data based on selected initiation type
  const getDisplayData = () => {
    if (selectedInitiationType === 'forMyReportee') {
      return forMyReporteeRequests;
    } else {
      return forMeRequests;
    }
  };

  const displayData = getDisplayData();

  const handleInitiationTypeChange = (type) => {
    setSelectedInitiationType(type);
  };

  return (
    <>
      <CompOffLayout 
        title="Comp off Pre Approval - (Report)" 
        showBackButton={true} 
        onBackClick={onBack}
      >
        {/* Required Information */}
        <Box sx={{ bgcolor: '#F9FAFB', borderRadius: 2, p: 3, mb: 3, boxShadow: '0 1px 2px rgba(16,30,115,0.04)' }}>
          <RequiredInformationHeader />

          {/* Initiation Type */}
          <InitiationType selectedType={selectedInitiationType} onChange={handleInitiationTypeChange} />

          {/* Approval List Table */}
          <Box sx={{ mb: 4 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 16, color: '#111827', mb: 2 }}>
              Approval List
            </Typography>
            <Box sx={{
              border: '1px solid #E5E7EB',
              borderRadius: '16px',
              overflow: 'hidden',
                  bgcolor: '#FFFFFF',
              boxShadow: '0 1px 2px rgba(16,30,115,0.04)'
            }}>
              <Box sx={{
                display: 'flex',
                bgcolor: '#F1F6FB',
                p: 1,
                borderTopLeftRadius: '16px',
                borderTopRightRadius: '16px',
                fontWeight: 700,
                  fontSize: 15,
                color: '#111827'
              }}>
                <Box sx={{ flex: 1 }}>Employee ID</Box>
                {selectedInitiationType === 'forMyReportee' && <Box sx={{ flex: 1 }}>Reportee</Box>}
                <Box sx={{ flex: 1 }}>Employee Name</Box>
                <Box sx={{ flex: 1 }}>Request Date (Worked on)</Box>
                <Box sx={{ flex: 2 }}>Reason</Box>
                <Box sx={{ flex: 1 }}>RM Remarks</Box>
              </Box>
              {/* Table Rows */}
              {displayData.length > 0 ? (
                displayData.map((request) => {
                  const statusColors = getStatusColor(request.status);
                  return (
                    <Box key={request.id} sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #E5E7EB', p: 1 }}>
                      <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{request.employeeId}</Box>
                      {selectedInitiationType === 'forMyReportee' && (
                        <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{request.reportee || 'xxx-xx-x-xx'}</Box>
                      )}
                      <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{request.employeeName}</Box>
                      <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{request.requestDate}</Box>
                      <Box sx={{ flex: 2, fontSize: 14, color: '#111827' }}>{request.reason}</Box>
                      <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>
                        {selectedInitiationType === 'forMe' ? (
                          <Typography sx={{ fontSize: 14, color: '#111827' }}>
                            {request.status === 'approved' ? 'Approved' : request.status === 'rejected' ? 'Rejected' : 'Pending'}
                          </Typography>
                        ) : (
                          <Typography sx={{ fontSize: 14, color: '#111827' }}>
                            {request.rmRemarks || 'No remarks provided'}
                          </Typography>
                        )}
                      </Box>
                    </Box>
                  );
                })
                  ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #E5E7EB', p: 1 }}>
                  <Box sx={{ flex: 1, fontSize: 14, color: '#111827', textAlign: 'center' }} colSpan={6}>
                    No {selectedInitiationType === 'forMyReportee' ? 'reportee' : 'personal'} requests to display
                  </Box>
                </Box>
              )}
            </Box>
          </Box>

          {/* Comment Section */}
          <Box sx={{ mt: 3, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Comment (Max 500 Chars)</Typography>
            <InputBase
              fullWidth
              multiline
              minRows={2}
              maxRows={4}
              sx={{
                bgcolor: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: 1,
                px: 2,
                py: 1.2,
                fontSize: 15
              }}
              placeholder="XXX-XXX-XX-XXX-X"
            />
          </Box>
        </Box>
      </CompOffLayout>
    </>
  );
};

export default CompOffReport;