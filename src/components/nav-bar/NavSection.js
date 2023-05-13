import { Box, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { NavLink as RouterLink } from 'react-router-dom'
import React from 'react'

import Iconify from '../iconify/Iconify'
import styled from '@emotion/styled'

export default function NavSection({
    data = [],
    ...other
}) {
    return (
        <Box {...other}>
            <List disablePadding sx={{ pt: 1 }}>
                {data.map((item, index) => (
                    <NavItem key={index} item={item} />
                ))}
            </List>
        </Box>
    )
}

function NavItem({ item }) {
    const { title, path, icon, info } = item;

    return (
        <StyledNavItem
            disableGutters
            component={RouterLink}
            to={path}
            sx={{
                '&.active': {
                    color: 'primary.main',
                    fontWeight: 'fontWeightBold',
                    bgcolor: 'action.selected',
                },
            }}
        >
                <StyledNavItemIcon>
                    {icon && icon}
                </StyledNavItemIcon>
                <ListItemText disableTypography primary={title} />

                {info && info}
        </StyledNavItem>
    )
}

const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
    ...theme.typography.body2,
    height: 48,
    position: 'relative',
    textTransform: 'capitalize',
    color: theme.palette.text.secondary,
    borderRadius: theme.shape.borderRadius,
  }));


const StyledNavItemIcon = styled(ListItemIcon)({
    width: 22,
    height: 22,
    color: 'inherit',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  });