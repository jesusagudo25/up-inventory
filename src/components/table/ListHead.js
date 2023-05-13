import React from 'react'
// @mui
import { TableRow, TableCell, TableHead } from '@mui/material';

export const ListHead = (
    {
        headLabel,
    }
) => {
    return (
        <TableHead>
            <TableRow>
                {headLabel.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.alignRight ? 'right' : 'left'}
                    >{headCell.label}</TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
