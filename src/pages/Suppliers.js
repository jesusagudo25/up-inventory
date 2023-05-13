import React, { useEffect, useState } from 'react'

// material
import { Card, Container, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, Button, IconButton, DialogActions, Box, Dialog, DialogContent, Slide } from '@mui/material';

import Iconify from '../components/iconify/Iconify';
import { ListHead } from '../components/table/ListHead';
// mock
import { Stack } from '@mui/material';
import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: '' },
];

export const Suppliers = () => {

  const [suppliers, setSuppliers] = useState([])

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - suppliers.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getSuppliers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mock/suppliers.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setSuppliers(data));
  };

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Suppliers
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Supplier
        </Button>
      </Stack>

      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              headLabel={TABLE_HEAD}
            />
            <TableBody>
              {suppliers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, address, phone, email } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>

                    <TableCell component="th" scope="row" padding="normal">
                      <Typography variant="subtitle2">
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">{address}</TableCell>

                    <TableCell align="left">{phone}</TableCell>

                    <TableCell align="left">{email}</TableCell>

                    <TableCell align="right">
                      <Link
                        to={`./${id}/products`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <IconButton size="large" color="inherit">
                          <Iconify icon="bx:bxs-box" />
                        </IconButton>
                      </Link>

                      <IconButton size="large" color="primary">
                        <Iconify icon="bx:bxs-pencil" />
                      </IconButton>

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
          count={suppliers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

    </Container >
  )
}
