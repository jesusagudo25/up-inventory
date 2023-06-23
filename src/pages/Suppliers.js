import React, { useEffect, useState } from 'react'

// material
import {
  Container, Typography, Card, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, TablePagination,
  FormControl, TextField, Stack, Button, DialogContent, DialogActions, DialogTitle, Dialog, styled,
} from '@mui/material'

import Iconify from '../components/iconify/Iconify';
import { ListHead } from '../components/table/ListHead';
import CloseIcon from '@mui/icons-material/Close';
// mock

import { Link } from 'react-router-dom';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
  { id: 'phone', label: 'Phone', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
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

export const Suppliers = () => {

  const [open, setOpen] = useState(false);

  const [id, setId] = useState('');

  const [name, setName] = useState('');

  const [address, setAddress] = useState('');

  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');

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
    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores`, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    })
      .then(response => response.json())
      .then(data => {
        setSuppliers(data)
      }
      );
  };
  
  const handleCreateDialog = (event) => {
    setOpen(true);
    setId('');
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setId('');
    setName('');
    setAddress('');
    setPhone('');
    setEmail('');
  };

  const handleSubmitDialog = async () => {
    if(id){
      const data = {
        nombre: name,
        telefono: phone,
        direccion: address,
        correo: email
      };
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setOpen(false);
          getSuppliers();
        }
        );
    }else{
      const data = {
        nombre: name,
        telefono: phone,
        direccion: address,
        correo: email
      };
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores`, {
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
          getSuppliers();
        }
        );
    }
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
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateDialog}>
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
                const { id, nombre, direccion, telefono, correo } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>

                    <TableCell component="th" scope="row" padding="normal">
                      <Typography variant="subtitle2">
                        {nombre}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">{direccion}</TableCell>

                    <TableCell align="left">{telefono}</TableCell>

                    <TableCell align="left">{correo}</TableCell>

                    <TableCell align="right">
                      <Link
                        to={`./${id}/products`}
                        style={{ textDecoration: 'none', color: 'inherit' }}
                      >
                        <IconButton size="large" color="inherit">
                          <Iconify icon="bx:bxs-box" />
                        </IconButton>
                      </Link>

                      <IconButton size="large" color="primary" onClick={
                        () => {
                          setOpen(true);
                          setId(id);
                          setName(nombre);
                          setAddress(direccion);
                          setPhone(telefono);
                          setEmail(correo);
                        }
                      }>
                        <Iconify icon="bx:bxs-pencil" />
                      </IconButton>

                      <IconButton size="large" color="error" onClick={
                        () => {
                          fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores/${id}`, {
                            method: 'DELETE',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                          })
                            .then(data => {
                              getSuppliers();
                            }
                            );
                        }
                      }>
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

      <BootstrapDialog
        onClose={handleCloseDialog}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth='sm'
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
          Supplier
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
                label="Address"
                name="address"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl sx={{ width: '100%' }}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                variant="outlined"
                size="small"
              />
            </FormControl>

            <FormControl sx={{ width: '100%' }}>
              <TextField  
                fullWidth
                label="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
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

    </Container >
  )
}
