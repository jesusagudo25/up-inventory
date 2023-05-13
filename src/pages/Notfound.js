import { Stack } from '@mui/material'
import React from 'react'

export const Notfound = () => {
  return (
    <Stack
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#f5f5f5',
      }}
    >
      <h1>404 Not Found</h1>
    </Stack>
  )
}
