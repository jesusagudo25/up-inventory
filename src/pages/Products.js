import React, { useState } from 'react'
import { useParams } from "react-router-dom";

// material
import { Card, Container, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography, Button, IconButton} from '@mui/material';

import Iconify from '../components/iconify/Iconify';
import { ListHead } from '../components/table/ListHead';
// mock
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: '' },
];

export const Products = () => {
  
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - products.length) : 0;


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mock/suppliers.json`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.find(supplier => supplier.id === id).products));
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Products
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Product
        </Button>
      </Stack>

      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <ListHead
              headLabel={TABLE_HEAD}
            />
            <TableBody>
              {products.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, name, price } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>

                    <TableCell component="th" scope="row" padding="1">
                      <Typography variant="subtitle2">
                        {name}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">{price}</TableCell>

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
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

    </Container >
  )
}
