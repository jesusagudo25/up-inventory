import React, { useState } from 'react'

// material
import { Card, Container, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, Button, IconButton, DialogActions, Box, Dialog, DialogContent, Slide } from '@mui/material';

import Iconify from '../components/iconify/Iconify';
import { ListHead } from '../components/table/ListHead';
// mock
import SUPPLIERSLIST from '../_mock/suppliers';
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

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const Suppliers = () => {

  const [open, setOpen] = useState(true);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - SUPPLIERSLIST.length) : 0;

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
              {SUPPLIERSLIST.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, address, phone, email } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>

                    <TableCell component="th" scope="row" padding="1">
                      <Typography variant="subtitle2">
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">{address}</TableCell>

                    <TableCell align="left">{phone}</TableCell>

                    <TableCell align="left">{email}</TableCell>

                    <TableCell align="right">
                      <Link
                        to={`/suppliers/${id}/products`}
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
          count={SUPPLIERSLIST.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      {/* Dialog - report result */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        fullWidth
        maxWidth='sm'
      >
        <DialogContent dividers>

          <Stack
            direction="column"
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Box sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <Iconify icon="mdi:check-circle" color="#4caf50" width="130px" height="130px" />
            </Box>

            <Stack
              direction="row"
              sx={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                gap: 1,
                marginTop: 1,
              }}
            >
              {/* Details */}
              <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>Selected month:</Typography>

              <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>111</Typography>

            </Stack>

            <Typography variant="h4" sx={{
              fontWeight: '600',
              marginTop: 2,
            }}>Payroll generated successfully</Typography>

            <Typography variant="h6" sx={{
              marginY: 2,
              fontWeight: '400'
            }}>You can download the payroll in PDF format</Typography>

            <a
              target="_blank"
              rel="noopener noreferrer"
              download
              style={{ textDecoration: 'none' }}
            >
              <Button variant="contained"
                size='large'
                sx={{
                  width: '100%',
                }}
                color="error"
                startIcon={<Iconify icon="mdi:file-pdf" />}
              >
                Descargar
              </Button>
            </a>

          </Stack>

      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Button
          variant="contained"
          size='large'
          sx={{
            margin: 2,
          }}
          onClick={() => {
            setOpen(false);
          }}
        >Cerrar</Button>
      </DialogActions>
    </Dialog>
    </Container >
  )
}
