import api from './ApiClient';

import React, { useState,useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  TextField,
  Button,
  Alert,
  Snackbar,
  InputBase,
} from '@mui/material';
import {
  Description,
  Refresh,
} from '@mui/icons-material';
import { RequiredInformationHeader } from './RequiredInformationHeader';
import { CompOffLayout } from './CompOffLayout.tsx';
import CompOffReport from './CompOffReport';

const CompOffManagerApprove = ({ onBack, submittedRequests = [] }) => {
  const [showReport, setShowReport] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  const [rmRemarks, setRmRemarks] = useState({});
  const [approvalStatus, setApprovalStatus] = useState({});
  const manager_user_id=22454221;
 useEffect(() => {
  const masterid = 123; // ⬅️ Replace with actual master ID (can be passed via props or context)
  api.get('/api/PreCompOffRequest/GetCompoffRequestDetails', {
    params: { masterid: masterid }
  })
    .then((res) => {
      console.log('Request Details:', res.data);
      // Optionally set to state
    })
    .catch((err) => {
      console.error('Error fetching details:', err);
    });
}, []);


  // Convert submitted requests to approval format using the data from state 1
  const approvalRequests = submittedRequests.map((request) => ({
  id: request.id,
  employeeId: request.employeeId || '22454221',       // ✅ use actual request data
  employeeName: request.employeeName || 'Karandeep Sahni', // ✅ fallback only if missing
  requestDate: request.requestDate,
  reason: request.reason,
  initiationType: request.initiationType || 'forMe',
  reportee: request.reportee || ''
}));

  // Check if any requests are "For My Reportee" to show Reportee column
  const hasReporteeRequests = approvalRequests.some(request => request.initiationType === 'forMyReportee');

  const handleRmRemarksChange = (id, value) => {
    setRmRemarks(prev => ({
      ...prev,
      [id]: value
    }));
  };

 const handleApproveRequest = (requestId) => {
  if (!rmRemarks[requestId] || rmRemarks[requestId].trim() === '') {
    setSnackbar({
      open: true,
      message: 'Please add remarks before approving',
      severity: 'warning'
    });
    return;
  }
const payload = {
  preApprovalID: 1,
  employeeID: "22454221",
  employeename: "Karandeep Sahni",
  compRefDate: "2025-08-08T09:14:21.873Z",
  reason: "Test reason",
  rmRemarks: "Test remarks",
  approvedBy: 22454221
};
console.log("Submitting payload:", payload);
  api.post('/api/PreCompOffRequest/UpdateManagerApproval', payload, {
    headers: { 'Content-Type': 'application/json' }
  })
    .then(() => {
      setApprovalStatus(prev => ({
        ...prev,
        [requestId]: 'approved'
      }));
      setSnackbar({
        open: true,
        message: 'Request approved successfully',
        severity: 'success'
      });
    })
    .catch((err) => {
      console.error('Approval failed:', err);
      setSnackbar({
        open: true,
        message: 'Approval failed. Please try again.',
        severity: 'error'
      });
    });
};


 const handleRejectRequest = (requestId) => {
  if (!rmRemarks[requestId] || rmRemarks[requestId].trim() === '') {
    setSnackbar({
      open: true,
      message: 'Please add remarks before rejecting',
      severity: 'warning'
    });
    return;
  }

  const request = approvalRequests.find(req => req.id === requestId);

  api.post('api/PreCompOffRequest/UpdateManagerApproval', {
     preApprovalID: 1,
  employeeID: "22454221",
  employeename: "Karandeep Sahni",
  compRefDate: "2025-08-08T09:14:21.873Z",
  reason: "Test reason",
  rmRemarks: "Test remarks",
  approvedBy: 22454221
  }).then(() => {
    setApprovalStatus(prev => ({
      ...prev,
      [requestId]: 'rejected'
    }));
    setSnackbar({
      open: true,
      message: 'Request rejected',
      severity: 'error'
    });
  }).catch((err) => {
    console.error('Rejection failed:', err);
    setSnackbar({
      open: true,
      message: 'Rejection failed. Please try again.',
      severity: 'error'
    });
  });
};


  const handleTransferWorkflow = () => {
    // Check if all requests have been processed
    const unprocessedRequests = approvalRequests.filter(req => !approvalStatus[req.id]);
    if (unprocessedRequests.length > 0) {
      setSnackbar({
        open: true,
        message: 'Please approve or reject all requests before viewing report',
        severity: 'warning'
      });
      return;
    }

    setShowReport(true);
  };

  const handleBackFromReport = () => {
    setShowReport(false);
  };

  // Prepare data for report - only approved/rejected requests with remarks
  const getReportData = () => {
    return approvalRequests
      .filter(request => approvalStatus[request.id] === 'approved' || approvalStatus[request.id] === 'rejected')
      .map(request => ({
        ...request,
        rmRemarks: rmRemarks[request.id] || '',
        status: approvalStatus[request.id]
      }));
  };

  return (
    <>
      {showReport ? (
        <CompOffReport
          onBack={handleBackFromReport}
          approvedRequests={getReportData()}
          initiationType={submittedRequests[0]?.initiationType || 'forMe'}
        />
      ) : (
        <CompOffLayout
          title="Comp off Pre Approval - (Manager Approve)"
          showBackButton={true}
          onBackClick={onBack}
        >

        {/* Required Information */}
        <Box sx={{ bgcolor: '#F9FAFB', borderRadius: 2, p: 3, mb: 3, boxShadow: '0 1px 2px rgba(16,30,115,0.04)' }}>
          <RequiredInformationHeader />

          {/* Approval List Table */}
          <Box sx={{ mt: 2, mb: 2 }}>
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
                {hasReporteeRequests && <Box sx={{ flex: 1 }}>Reportee</Box>}
                <Box sx={{ flex: 1 }}>Employee Name</Box>
                <Box sx={{ flex: 1 }}>Request Date</Box>
                <Box sx={{ flex: 2 }}>Reason</Box>
                <Box sx={{ flex: 1 }}>RM Remarks</Box>
              </Box>
              {/* Table Rows */}
                {approvalRequests.length > 0 ? (
                approvalRequests.map((req) => (
                  <Box key={req.id} sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #E5E7EB', p: 1 }}>
                    <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.employeeId}</Box>
                    {hasReporteeRequests && (
                      <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.reportee || 'xxx-xx-x-xx'}</Box>
                    )}
                    <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.employeeName}</Box>
                    <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.requestDate}</Box>
                    <Box sx={{ flex: 2, fontSize: 14, color: '#111827' }}>{req.reason}</Box>
                    <Box sx={{ flex: 1, px: 1 }}>
                      <TextField
                        fullWidth
                        multiline
                        minRows={2}
                        maxRows={4}
                        size="small"
                        sx={{
                          '& .MuiOutlinedInput-root': {
                            '& fieldset': {
                              borderColor: '#E5E7EB',
                              borderWidth: '1px',
                            },
                            '&:hover fieldset': {
                              borderColor: '#D1D5DB',
                            },
                            '&.Mui-focused fieldset': {
                              borderColor: '#6B7280',
                            },
                          },
                          '& .MuiInputBase-input': {
                            fontSize: 15,
                            color: '#111827',
                          },
                        }}
                        value={rmRemarks[req.id] || ''}
                        onChange={(e) => handleRmRemarksChange(req.id, e.target.value)}
                        placeholder="Enter your remarks here..."
                      />
                    </Box>
                  </Box>
                  ))
                ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #E5E7EB', p: 1 }}>
                  <Box sx={{ flex: 1, fontSize: 14, color: '#111827', textAlign: 'center' }} colSpan={6}>
                      No requests submitted yet
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

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              sx={{
                bgcolor: '#FFFFFF',
                color: '#2563EB',
                borderRadius: 2,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'none',
                boxShadow: 'none',
                borderColor: '#3B82F6',
                '&:hover': { bgcolor: '#F3F4F6' }
              }}
              onClick={() => {
                // Handle reject all requests
                approvalRequests.forEach(req => {
                  if (!approvalStatus[req.id]) {
                    handleRejectRequest(req.id);
                  }
                });
              }}
            >
              Reject
            </Button>
            <Button
              variant="contained"
              sx={{
                bgcolor: '#2563EB',
                color: '#FFFFFF',
                borderRadius: 2,
                px: 5,
                py: 1.5,
                fontWeight: 700,
                fontSize: 16,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#1D4ED8' }
              }}
              onClick={() => {
                // Handle approve all requests
                approvalRequests.forEach(req => {
                  if (!approvalStatus[req.id]) {
                    handleApproveRequest(req.id);
                  }
                });
              }}
            >
              Approve
            </Button>
          </Box>

        </Box>

        {/* Transfer Workflow */}
        <Box sx={{ mt: 2, mb: 2 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              bgcolor: '#F8FAFC',
              borderRadius: '8px',
              px: 3,
              py: 2,
              cursor: 'pointer',
              '&:hover': {
                bgcolor: '#F1F5F9'
              }
            }}
            onClick={handleTransferWorkflow}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ color: '#8B5CF6' }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 4V16M4 10H16" stroke="#8B5CF6" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </Box>
              <Typography sx={{
                fontWeight: 500,
                fontSize: 15,
                color: '#374151',
                textTransform: 'none'
              }}>
            Transfer Workflow
              </Typography>
            </Box>
            <Box sx={{ color: '#374151' }}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 12L10 8L6 4" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Box>
          </Box>
        </Box>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
        </CompOffLayout>
      )}
    </>
  );
};

export default CompOffManagerApprove; 