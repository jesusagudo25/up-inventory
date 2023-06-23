import React, { useState } from 'react'

// material
import {
  Container, Typography, Card, TableContainer, Table, TableBody, TableRow, TableCell, IconButton, TablePagination,
  FormControl, TextField, Stack, Button, DialogContent, DialogActions, DialogTitle, Dialog, styled,
} from '@mui/material'

import Iconify from '../components/iconify/Iconify';
import { ListHead } from '../components/table/ListHead';
import CloseIcon from '@mui/icons-material/Close';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'address', label: 'Address', alignRight: false },
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

export const Subsidiaries = () => {
  
  const [open, setOpen] = useState(false);

  const [id, setId] = useState('');

  const [name, setName] = useState('');

  const [address, setAddress] = useState('');

  const [phone, setPhone] = useState('');

  const [email, setEmail] = useState('');

  const [subsidiaries, setSubsidiaries] = useState([]);

  const [page, setPage] = useState(0);

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - subsidiaries.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const getSubsidiaries = () => {
    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/sucursales`,{
      headers : {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => setSubsidiaries(data));
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
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/sucursales/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(data => {
          setOpen(false);
          getSubsidiaries();
        }
        );
    }else{
      const data = {
        nombre: name,
        telefono: phone,
        direccion: address,
        correo: email
      };
      await fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/sucursales`, {
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
          getSubsidiaries();
        }
        );
    }
  };

  React.useEffect(() => {
    getSubsidiaries();
  }, []);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Subsidiaries
        </Typography>
        <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleCreateDialog}>
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
              {subsidiaries.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                const { id, nombre, telefono, direccion, correo } = row;

                return (
                  <TableRow hover key={id} tabIndex={-1}>

                    <TableCell component="th" scope="row" padding="1">
                      <Typography variant="subtitle2">
                        {nombre}
                      </Typography>
                    </TableCell>

                    <TableCell align="left">
                      {direccion}
                    </TableCell>

                    <TableCell align="right">
                      <IconButton size="large" color="inherit" onClick={() => {
                        setOpen(true);
                        setId(id);
                        setName(nombre);
                        setAddress(direccion);
                        setPhone(telefono);
                        setEmail(correo);
                      }}>
                        <Iconify icon="bx:bxs-pencil" />
                      </IconButton>

                      <IconButton size="large" color="error" onClick={() => {
                        fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/sucursales/${id}`, {
                          method: 'DELETE',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                        })
                          .then(data => {
                            getSubsidiaries();
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
          count={subsidiaries.length}
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
    </Container>
  )
}
