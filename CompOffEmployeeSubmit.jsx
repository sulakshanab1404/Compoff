import api from './ApiClient';

import React, { useState, useEffect } from 'react'; // <-- added useEffect
import {
  Box,
  Typography,
  Button,
  Alert,
  Snackbar,
  InputBase,
  IconButton,
} from '@mui/material';
import { RequiredInformationHeader } from './RequiredInformationHeader';
import { CompOffLayout } from './CompOffLayout.tsx';
import CompOffManagerApprove from './CompOffManagerApprove';
import {
  Description,
  Add,
  Delete,
} from '@mui/icons-material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';

const employeeId = 12345; // Replace with actual employee ID as needed

const CompOffEmployeeSubmit = () => {
  const [initiationType, setInitiationType] = useState('forMe');
  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState('');
  const [requests, setRequests] = useState([
    {
      id: 1,
      requestDate: '15-Jun-2025',
      reason: 'Work on Saturdays due to product deadline',
      reportee: 'Karandeep Sahni'
    }
  ]);
  const [selectedReportee, setSelectedReportee] = useState('');
  const [showManagerApprove, setShowManagerApprove] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Added state for reportees
  const [reportees, setReportees] = useState([]);

  // Fetch reportees from API when component mounts or employeeId changes
  useEffect(() => {
  const fetchReportees = async () => {
    try {
      const response = await api.get('/api/PreCompOffRequest/GetReportees', {
        params: { eid: employeeId }
      });
      setReportees(Array.isArray(response.data) ? response.data : response.data.data || []);
    } catch (error) {
      console.error('Error fetching reportees:', error);
      setSnackbar({
        open: true,
        message: 'Failed to fetch reportees',
        severity: 'error'
      });
    }
  };
  fetchReportees();
}, []);


  const handleAddRequest = () => {
    if (!selectedDate || !reason.trim()) {
      setSnackbar({
        open: true,
        message: 'Please fill in both date and reason',
        severity: 'warning'
      });
      return;
    }

    if (initiationType === 'forMyReportee' && !selectedReportee) {
      setSnackbar({
        open: true,
        message: 'Please select a reportee',
        severity: 'warning'
      });
      return;
    }

    const newRequest = {
      id: Date.now(),
      reportee: initiationType === 'forMyReportee' ? selectedReportee : '',
      requestDate: selectedDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
      }),
      reason: reason,
      initiationType: initiationType,
    };

    setRequests([...requests, newRequest]);
    setSelectedDate(null);
    setReason('');
  };

  const handleDeleteRequest = (id) => {
    setRequests(requests.filter(req => req.id !== id));
  };

  const handleSubmit = async () => {
    if (requests.length === 0) {
      setSnackbar({
        open: true,
        message: 'Please add at least one request',
        severity: 'warning'
      });
      return;
    }

    const payload = {
  preApprovalID: 0,
  initiationType: initiationType === 'forMe' ? 1 : 2, // if backend accepts 1/2 for types
  mEmpID: employeeId,
  selfReportee: 0,
  initiationByMEmpID: employeeId,
  requestedDatesModels: requests.map(req => ({
    preApprovalID: 0,
    compRefDate: new Date(req.requestDate).toISOString(),
    reason: req.reason,
  }))
};


    try {
      const response = await api.post('/api/PreCompOffRequest/SubmitPreCompOffRequest', payload);
      setSnackbar({
        open: true,
        message: 'Submission successful',
        severity: 'success'
      });
      setShowManagerApprove(true);
    } catch (error) {
      console.error('Submission error:', error);
      setSnackbar({
        open: true,
        message: 'Submission failed',
        severity: 'error'
      });
    }
  };

  const handleBackToSubmit = () => {
    setShowManagerApprove(false);
  };

  return (
    <>
      {showManagerApprove ? (
        <CompOffManagerApprove onBack={handleBackToSubmit} submittedRequests={requests.map(request => ({
          ...request,
          initiationType: initiationType,
          reportee: initiationType === 'forMyReportee' ? selectedReportee : ''
        }))} />
      ) : (
        <CompOffLayout title="Comp off Pre Approval - (Employee Submit)">

        {/* Required Information Section */}
        <Box sx={{ bgcolor: '#F9FAFB', borderRadius: 2, p: 3, mb: 3, boxShadow: '0 1px 2px rgba(16,30,115,0.04)' }}>
          <RequiredInformationHeader />
         
          {/* Initiation Type and Note */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'flex-start', justifyContent: 'space-between', mb: 3 }}>
            {/* Initiation Type */}
            <Box sx={{ flex: 1, minWidth: 220 }}>
              <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 1 }}>Initiation Type</Typography>
              <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
                <input
                  type="radio"
                  id="forMe"
                  name="initiationType"
                  checked={initiationType === 'forMe'}
                  onChange={() => setInitiationType('forMe')}
                  style={{ accentColor: '#2563EB', width: 18, height: 18, marginRight: 6 }}
                />
                <label htmlFor="forMe" style={{ fontWeight: 500, fontSize: 15, color: initiationType === 'forMe' ? '#111827' : '#6B7280', marginRight: 18 }}>For Me</label>
                <input
                  type="radio"
                  id="forMyReportee"
                  name="initiationType"
                  checked={initiationType === 'forMyReportee'}
                  onChange={() => setInitiationType('forMyReportee')}
                  style={{ accentColor: '#2563EB', width: 18, height: 18, marginRight: 6 }}
                />
                <label htmlFor="forMyReportee" style={{ fontWeight: 500, fontSize: 15, color: initiationType === 'forMyReportee' ? '#111827' : '#6B7280' }}>For My Reportee</label>
              </Box>
            </Box>
            {/* Note Box */}
            <Box sx={{ flex: 1.5, minWidth: 260, ml: { md: 4, xs: 0 }, display: 'flex', justifyContent: 'flex-end' }}>
              <Box sx={{ bgcolor: '#FFFFFF', borderRadius: 2, p: 2, border: '1px solid #E5E7EB', minWidth: 340, maxWidth: 500, boxShadow: '0 2px 8px rgba(16,30,115,0.06)' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, color: '#111827', mb: 0.5 }}>Note:</Typography>
                <Typography sx={{ fontSize: 13, color: '#374151' }}>1. Pre-approval to be raised within 5 working days from working on a non-working day</Typography>
              </Box>
            </Box>
          </Box>

          {/* Employee Details */}
          <Box sx={{ mt: 2, mb: 2 }}>
            <Typography sx={{ fontWeight: 700, fontSize: 15, mb: 0.5 }}>Employee Details</Typography>
            {/* Add vertical space here */}
            <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'flex-start', mb: 0 }}>
          {initiationType === 'forMyReportee' && (
                <Box sx={{ flex: 1, minWidth: 220 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Select Reportee</Typography>
                  <Box sx={{ position: 'relative', mb: 1 }}>
                    <InputBase
                      fullWidth
                      sx={{
                        bgcolor: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        px: 2,
                        py: 1.2,
                        fontSize: 15,
                        pr: 5
                      }}
                      placeholder="Select"
                      value={selectedReportee}
                      onChange={e => setSelectedReportee(e.target.value)}
                      list="reportees-list"
                    />
                    {/* Datalist for reportees */}
                    <datalist id="reportees-list">
                      {reportees.map((r,idx) => (
                        <option key={r.id || r.ID ||idx} value={r.name || r.Name} />
                      ))}
                    </datalist>
                    <Box sx={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', color: '#6B7280' }}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 8L10 12L14 8" stroke="#6B7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </Box>
                  </Box>
            </Box>
          )}
              <Box sx={{ flex: 1, minWidth: 220 }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Request Date(Weekend/Holiday)</Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    value={selectedDate}
                    onChange={setSelectedDate}
                      slotProps={{
                        textField: {
                          size: "small",
                          fullWidth: true,
                          placeholder: "Select Date",
                          sx: {
                            bgcolor: '#FFFFFF',
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px',
                            '& .MuiOutlinedInput-root': {
                              '& fieldset': {
                                border: 'none',
                              },
                              '& input': {
                                px: 2,
                                py: 1.2,
                                fontSize: 15,
                              },
                            },
                          }
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              {/* Reason For Request - positioned inline when "For Me" is selected */}
              {initiationType === 'forMe' && (
                <Box sx={{ flex: 2, minWidth: 220 }}>
                  <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Reason For Request</Typography>
                  <InputBase
                    fullWidth
                    sx={{
                      bgcolor: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '12px',
                      px: 2,
                      py: 1.2,
                      fontSize: 15,
                      mb: 0
                    }}
                    placeholder="Enter your reason here..."
                    value={reason}
                    onChange={e => setReason(e.target.value)}
                  />
                </Box>
              )}
            </Box>
            {/* Reason For Request - positioned below the above fields when "For My Reportee" is selected */}
            {initiationType === 'forMyReportee' && (
              <Box sx={{ mt: 2, width: '100%' }}>
                <Typography sx={{ fontWeight: 700, fontSize: 14, mb: 1 }}>Reason For Request</Typography>
                <InputBase
                  fullWidth
                  sx={{
                    bgcolor: '#FFFFFF',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    px: 2,
                    py: 1.2,
                    fontSize: 15,
                    mb: 0
                  }}
                  placeholder="Enter you reason here..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                />
              </Box>
            )}
            {/* Add button below Reason For Request */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button
                variant="outlined"
                  sx={{
                  minWidth: 75,
                  height: 38,
                  borderRadius: '8px',
                  gap: 1,
                    px: 2,
                  py: 0,
                  padding: '0 16px',
                  color: '#003049',
                  fontWeight: 700,
                  fontSize: 16,
                  borderColor: '#3B82F6',
                  bgcolor: '#FFFFFF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': { bgcolor: '#FFFFFF', borderColor: '#2563EB' }
                }}
                onClick={handleAddRequest}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ marginRight: 8 }}>
                  <circle cx="10" cy="10" r="8.5" stroke="#3B82F6" strokeWidth="1.5" fill="none"/>
                  <path d="M10 7V13" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M7 10H13" stroke="#3B82F6" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                  Add
                </Button>
            </Box>
          </Box>

                      {/* Table */}
          <Box sx={{ mt: 2, mb: 2 }}>
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
                {initiationType === 'forMyReportee' && <Box sx={{ flex: 1 }}>Reportee</Box>}
                <Box sx={{ flex: 1 }}>Request Date</Box>
                <Box sx={{ flex: 3 }}>Reason</Box>
                <Box sx={{ width: 80, textAlign: 'center' }}>Delete</Box>
              </Box>
              {/* Table Rows */}
              {requests.map((req, idx) => (
                <Box key={req.id} sx={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #E5E7EB', p: 1 }}>
                  {initiationType === 'forMyReportee' && <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.reportee || 'Karandeep Sahni'}</Box>}
                  <Box sx={{ flex: 1, fontSize: 14, color: '#111827' }}>{req.requestDate}</Box>
                  <Box sx={{ flex: 3, fontSize: 14, color: '#111827' }}>{req.reason}</Box>
                  <Box sx={{ width: 80, textAlign: 'center' }}>
                    <IconButton size="medium" sx={{ p: 0.5 }} onClick={() => handleDeleteRequest(req.id)}>
                      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="8" y="10" width="12" height="12" rx="2" stroke="#F43F5E" strokeWidth="2" fill="none"/>
                        <rect x="11" y="6" width="6" height="2" rx="1" fill="#F43F5E"/>
                        <line x1="12" y1="14" x2="12" y2="19" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round"/>
                        <line x1="16" y1="14" x2="16" y2="19" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </IconButton>
                  </Box>
                </Box>
              ))}
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

          {/* Footer: Submit */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mt: 3 }}>
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
              onClick={handleSubmit}
            >
              Submit
            </Button>
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

export default CompOffEmployeeSubmit;