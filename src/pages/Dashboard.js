import React, { useState } from 'react'
import { Grid, Container, Typography, Card, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, TablePagination } from '@mui/material'
// components
import { Widget } from '../components/@dashboard/Widget';
import { ListHead } from '../components/table/ListHead';
import Iconify from '../components/iconify/Iconify';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'stock', label: 'Stock', alignRight: false },
  { id: '' },
];

export const Dashboard = () => {
  
  const [open, setOpen] = useState(true);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - PRODUCTS.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Suppliers" total="100" icon="mdi:user-group" color="primary" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Subsidaries" total="5" icon="ic:sharp-business" color="primary" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Total Orders" total="830" icon="mdi:package-down" color="primary" />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Widget title="Total Checkout" total="500" icon="mdi:package-up" color="primary" />
          </Grid>
        </Grid>

        <Typography variant="h4" sx={{ my: 5 }}>
          Inventory
        </Typography>

        <Card>
          <TableContainer sx={{ minWidth: 800 }}>
            <Table>
              <ListHead
                headLabel={TABLE_HEAD}
              />
              <TableBody>
                {PRODUCTS.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, name, price, stock } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1}>

                      <TableCell component="th" scope="row" padding="1">
                        <Typography variant="subtitle2">
                          {name}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">{price}</TableCell>

                      <TableCell align="left">{stock}</TableCell>

                      <TableCell align="right">
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
            count={PRODUCTS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

      </Container>
    </div>
  )
}
