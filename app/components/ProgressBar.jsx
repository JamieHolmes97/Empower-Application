import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


const ProgressBar = ({ progressAmount, progressTotal }) => {
    const calculatePercentage = () => {
      if (progressTotal === 0) {
        return 0;
      }
      return Math.round((progressAmount / progressTotal) * 100);
    };
  
    return (
      <Box sx={{ position: 'relative', display: 'inline-flex' }}>
        <CircularProgress size={50} variant="determinate" value={calculatePercentage()}/>
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography variant="caption" component="div" color="text.secondary">
            {calculatePercentage()}%
          </Typography>
        </Box>
      </Box>
    );
  }

      


  

export default ProgressBar