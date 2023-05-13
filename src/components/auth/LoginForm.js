import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, InputAdornment, IconButton, Link, Button } from '@mui/material';
// iconify
import Iconify from '../iconify/Iconify.js';

//custom hooks
import { useLocalStorage } from '../../hooks/useLocalStorage.js';

export const LoginForm = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useLocalStorage('token', '')
  const [emailLS, setEmailLS] = useLocalStorage('email', '')
  const [passwordLS, setPasswordLS] = useLocalStorage('password', '')

  const [showPassword, setShowPassword] = useState(false);

  const handleClick = () => {
    if (email !== '' && password !== '') {
      setToken('0987654321')
      setEmailLS(email)
      setPasswordLS(password)
      navigate('/dashboard/app', { replace: true })
    }
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Email address" type="email" onChange={(e) => setEmail(e.target.value)} />

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <Button fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </Button>
    </>
  )
}
