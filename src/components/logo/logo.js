import { forwardRef } from 'react';
// @mui
import { Box } from '@mui/material';

const Logo = forwardRef(() => {

  return (
    <Box
        component="img"
        src="/assets/images/logo/UPI_App.svg"
        sx={{ width: '60%', cursor: 'pointer'}}
    />
    );

});

export default Logo;