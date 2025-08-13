import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  InputBase,
  Avatar,
  Badge
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  CalendarToday as CalendarTodayIcon,
  CreateOutlined as CreateOutlinedIcon,
  KeyOutlined as KeyOutlinedIcon,
  FolderOutlined as FolderOutlinedIcon,
  AppsOutlined as AppsOutlinedIcon,
  NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
  Description
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const Header = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
  };

  return (
    <Box sx={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 16px',
      background: 'white',
      borderBottom: '1px solid #e5e7eb',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      {/* Left Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <IconButton sx={{ color: '#6b7280' }}>
          <MenuIcon />
        </IconButton>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Box sx={{
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: '#0ea5e9',
            color: 'white',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer'
          }}>
            My Workspace
          </Box>
          <Box sx={{
            padding: '8px 16px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: '#f3f4f6'
            }
          }}>
            Manager Hub
          </Box>
        </Box>
      </Box>

      {/* Right Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        {/* Search Box */}
        <Box sx={{ position: 'relative' }}>
          <SearchIcon sx={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280',
            fontSize: '20px'
          }} />
          <InputBase
            placeholder="search"
            sx={{
              padding: '8px 12px 8px 40px',
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              width: '240px',
              fontSize: '14px',
              '& .MuiInputBase-input': {
                fontSize: '14px'
              }
            }}
          />
        </Box>

        {/* Icon Group */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Calendar Icon with Green Dot */}
          <Box sx={{ position: 'relative' }}>
            <IconButton 
              sx={{ 
                color: '#6b7280',
                padding: '8px',
                '&:hover': { backgroundColor: '#f3f4f6' }
              }}
              onClick={() => setShowDatePicker(!showDatePicker)}
            >
              <CalendarTodayIcon />
              <Box sx={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                backgroundColor: '#10b981',
                border: '2px solid white',
                borderRadius: '50%'
              }} />
            </IconButton>
            {selectedDate && (
              <Typography sx={{
                marginLeft: '6px',
                fontSize: '12px',
                color: '#6b7280'
              }}>
                {dayjs(selectedDate).format('DD-MMM-YYYY')}
              </Typography>
            )}
            {showDatePicker && (
              <Box sx={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1000,
                marginTop: '8px',
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
              }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={selectedDate}
                    onChange={handleDateChange}
                    slotProps={{
                      textField: {
                        size: "small",
                        style: { display: 'none' }
                      },
                    }}
                    open={true}
                    onClose={() => setShowDatePicker(false)}
                  />
                </LocalizationProvider>
              </Box>
            )}
          </Box>

          {/* Create Icon */}
          <IconButton sx={{ 
            color: '#6b7280',
            padding: '8px',
            '&:hover': { backgroundColor: '#f3f4f6' }
          }}>
            <CreateOutlinedIcon />
          </IconButton>

          {/* Key Icon */}
          <IconButton sx={{ 
            color: '#6b7280',
            padding: '8px',
            '&:hover': { backgroundColor: '#f3f4f6' }
          }}>
            <KeyOutlinedIcon />
          </IconButton>

          {/* Folder Icon */}
          <IconButton sx={{ 
            color: '#6b7280',
            padding: '8px',
            '&:hover': { backgroundColor: '#f3f4f6' }
          }}>
            <FolderOutlinedIcon />
          </IconButton>

          {/* Apps Icon */}
          <IconButton sx={{ 
            color: '#6b7280',
            padding: '8px',
            '&:hover': { backgroundColor: '#f3f4f6' }
          }}>
            <AppsOutlinedIcon />
          </IconButton>

          {/* Notifications Icon with Badge */}
          <Box sx={{ position: 'relative' }}>
            <IconButton sx={{ 
              color: '#6b7280',
              padding: '8px',
              '&:hover': { backgroundColor: '#f3f4f6' }
            }}>
              <NotificationsNoneOutlinedIcon />
            </IconButton>
            <Badge
              badgeContent="2"
              sx={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                '& .MuiBadge-badge': {
                  backgroundColor: '#ef4444',
                  color: 'white',
                  fontSize: '11px',
                  padding: '1px 4px',
                  borderRadius: '9999px',
                  border: '2px solid white',
                  minWidth: '16px',
                  height: '16px'
                }
              }}
            />
          </Box>
        </Box>

        {/* Profile Section */}
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          paddingLeft: 2,
          borderLeft: '1px solid #e5e7eb'
        }}>
          <Avatar
            sx={{
              width: '32px',
              height: '32px',
              backgroundColor: '#f3f4f6'
            }}
            src="https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face"
            alt="Isha Kumar"
          >
            IK
          </Avatar>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{
              fontSize: '14px',
              color: '#111827',
              fontWeight: 500
            }}>
              Isha Kumar
            </Typography>
            <Typography sx={{
              fontSize: '12px',
              color: '#6b7280'
            }}>
              Sr. Developer
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header; 