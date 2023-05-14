import React from 'react'

// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Link, Divider } from '@mui/material';

// components
import { LoginForm } from '../components/auth/LoginForm';

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
}));

export const Login = () => {
    return (
        <Container maxWidth="sm">
            <StyledContent>
                <Typography variant="h4" gutterBottom>
                    UP Inventory
                </Typography>

                <Typography variant="body2">
                    You don’t have an account?&nbsp;
                    <Link v variant="subtitle2" underline="hover"
                    > Get started   </Link>
                </Typography>

                <Divider sx={{ my: 3 }} />

                <LoginForm />
            </StyledContent>
        </Container>
    )
}
