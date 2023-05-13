import { useState, useEffect } from 'react';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Avatar, IconButton, Popover } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// custom hooks
import { useLocalStorage } from '../../../hooks/useLocalStorage.js';

// ----------------------------------------------------------------------

export default function AccountPopover() {

    const navigate = useNavigate();

    const [open, setOpen] = useState(null);

    const [token, setToken] = useLocalStorage('token', '')
    const [emailLS, setEmailLS] = useLocalStorage('email', '')
    const [passwordLS, setPasswordLS] = useLocalStorage('password', '')

    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };

    useEffect(() => {
        if (token === '') {
            navigate('/login', { replace: true })
        }
    }, [])

    return (
        <>
            <IconButton
                onClick={handleOpen}
                sx={{
                    p: 0,
                    ...(open && {
                        '&:before': {
                            zIndex: 1,
                            content: "''",
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            position: 'absolute',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                        },
                    }),
                }}
            >
                <Avatar src={`https://i.pravatar.cc/300`} alt="photoURL" />
            </IconButton>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 0,
                        mt: 1.5,
                        ml: 0.75,
                        width: 180,
                        '& .MuiMenuItem-root': {
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
                        {emailLS}
                    </Typography>
                </Box>

                <Divider sx={{ borderStyle: 'dashed' }} />

                <MenuItem sx={{ m: 1 }} onClick={() => {
                    setToken('')
                    setEmailLS('')
                    setPasswordLS('')
                    handleClose()
                    navigate('/login', { replace: true })
                }}>
                    Logout
                </MenuItem>
            </Popover>
        </>
    );
}
