import React, { useState, useEffect } from 'react'
import {
  Grid, Container, Typography, Card, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, TablePagination,
  FormControl, TextField, Stack, Button, DialogContent, DialogActions, DialogTitle, Dialog, styled,
} from '@mui/material'
// components
import { Widget } from '../components/@dashboard/Widget';
import { ListHead } from '../components/table/ListHead';
import Iconify from '../components/iconify/Iconify';
import CloseIcon from '@mui/icons-material/Close';


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'stock', label: 'Stock', alignRight: false },
  { id: '' },
];

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export const Dashboard = () => {

  const [id, setId] = useState('');

  const [name, setName] = useState('');

  const [code, setCode] = useState('');

  const [price, setPrice] = useState(null);

  const [stock, setStock] = useState('');

  const [open, setOpen] = useState(null);

  const [inventory, setInventory] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inventory.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getInventory = () => {
    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        setInventory(data);
      }
      );
  };

  const handleCreateDialog = (event) => {
    setOpen(true);
    setId('');
    setName('');
    setPrice('');
    setStock('');
    setCode('');
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setId('');
    setName('');
    setPrice('');
    setStock('');
    setCode('');
  };

  const handleSubmitDialog = async () => {
    if(id){
      const data = {
        nombre: name,
        precio: price,
        cantidad: stock,
        codigo: code
      };
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/productos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setOpen(false);
          getInventory();
        }
        );
    }else{
      const data = {
        nombre: name,
        precio: price,
        cantidad: stock,
        codigo: code
      };
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/productos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setOpen(false);
          getInventory();
        }
        );
    }
  };

  useEffect(() => {
    getInventory();
  }, []);

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

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mt: 5, mb: 2 }}
        >
          <Typography variant="h4" sx={{ my: 5 }}>
          Inventory
        </Typography>

        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateDialog}>
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
                {inventory.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                  const { id, nombre, precio, cantidad, codigo } = row;

                  return (
                    <TableRow hover key={id} tabIndex={-1}>

                      <TableCell component="th" scope="row" padding="1">
                        <Typography variant="subtitle2">
                          {nombre}
                        </Typography>
                      </TableCell>

                      <TableCell align="left">{precio}</TableCell>

                      <TableCell align="left">{cantidad}</TableCell>

                      <TableCell align="right">
                        <IconButton size="large" color="primary" onClick={() => {
                          setId(codigo);
                          setName(nombre);
                          setPrice(precio);
                          setStock(cantidad);
                          setCode(codigo);
                          setOpen(true);
                        }}>
                          <Iconify icon="bx:bxs-pencil" />
                        </IconButton>

                        <IconButton size="large" color="error" onClick={() => {
                          fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/productos/${codigo}`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          })
                            .then(data => {
                              getInventory();
                            }
                            );
                        }}>
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
            count={inventory.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

      </Container>

      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='sm'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Product
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Stack spacing={4} sx={{ minWidth: 550 }}>

            <FormControl sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                variant="outlined"
                size="small"
              />
            </FormControl>
            
            <FormControl sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Code"
                name="code"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl sx={{ width: '100%' }}>
              <TextField  
                fullWidth
                label="Stock"
                name="stock"
                onChange={(e) => setStock(e.target.value)}
                value={stock}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button size="large" onClick={handleCloseDialog}  >
            Cancel
          </Button>
          <Button size="large" autoFocus onClick={handleSubmitDialog} >
            Save
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  )
}
