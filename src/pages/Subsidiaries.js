import React, {useState} from 'react'

// material
import { Card, Container, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, Button, IconButton } from '@mui/material';

import Iconify from '../components/iconify/Iconify';
import {ListHead} from '../components/table/ListHead';
// mock
import SUBSIDIARIES from '../_mock/subsidiaries';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: '' },
];

export const Subsidiaries = () => {

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SUBSIDIARIES.length) : 0;
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Subsidiaries
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Subsidiary
        </Button>
        </Stack>

        <Card>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                  {SUBSIDIARIES.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, name} = row;

                    return (
                      <TableRow hover key={id} tabIndex={-1}>

                        <TableCell component="th" scope="row" padding="1">
                            <Typography variant="subtitle2">
                              {name}
                            </Typography>
                        </TableCell>

                        <TableCell align="right">
                            <a
                              style={{ textDecoration: 'none', color: 'inherit' }}
                              target="_blank"
                              rel="noreferrer"
                            >
                              <IconButton size="large" color="inherit">
                                <Iconify icon="bx:bxs-pencil" />
                              </IconButton>
                            </a>

                            <IconButton size="large" color="error">
                              <Iconify icon="bx:bxs-trash" />
                            </IconButton>
                          </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={SUBSIDIARIES.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
    </Container>
  )
}
