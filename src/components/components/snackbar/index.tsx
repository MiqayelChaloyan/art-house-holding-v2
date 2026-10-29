'use client'

import * as React from 'react';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { MMArmenU } from '@/src/constants/font';


export default function Snackbars({ open, handleChange, info }: any) {
  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    };

    handleChange();
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={info.status}
          variant='filled'
          sx={{ width: '100%' }}
        >
          <span className={MMArmenU.className}>{info.content}</span>
        </Alert>
      </Snackbar>
    </div>
  );
};