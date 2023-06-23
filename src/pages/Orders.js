import React from 'react'
import { Container, Stack, Typography, Card, FormControl, TableContainer, Table, Button, Box, Dialog, DialogContent, DialogActions, Slide } from '@mui/material'
import Iconify from '../components/iconify/Iconify.js'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import { SearchSuppliers } from '../components/@orders/SearchSuppliers.js'
import { SearchProducts } from '../components/@orders/SearchProducts.js'
import { Cart } from '../components/@orders/Cart.js';
import { ListHead } from '../components/table/ListHead.js'

import { CartContext } from '../contexts/CartContext.js'
import { ProductContext } from '../contexts/ProductContext.js';
import { SupplierContext } from '../contexts/SupplierContext.js';

const TABLE_HEAD = [
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'price', label: 'Price', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
  { id: 'actions', label: '', alignRight: true },
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const Orders = () => {

  const [open, setOpen] = React.useState(false);
  const [supplier, setSupplier] = React.useState('')
  const [supplierId, setSupplierId] = React.useState('')
  const [listProducts, setListProducts] = React.useState([])
  const [productId, setProductId] = React.useState('')
  const [product, setProduct] = React.useState('')
  const [quantity, setQuantity] = React.useState('')
  const [total, setTotal] = React.useState('')
  const [date, setDate] = React.useState(new Date())

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Orders
        </Typography>
      </Stack>

      <Card>
        <Container sx={
          {
            padding: '20px',
          }
        }>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" gutterBottom>
              General information
            </Typography>
          </Stack>
          <Stack direction="row" sx={{
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            minWidth: 550,
            gap: 3
          }}
          >
            <FormControl sx={{ width: '48%' }}>
              <SupplierContext.Provider value={{
                supplier
                , setSupplier,
                setSupplierId
              }}>
                <SearchSuppliers />
              </SupplierContext.Provider>
            </FormControl>
            <FormControl sx={{ width: '48%' }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Date"
                  value={date}
                  onChange={(newValue) => {
                    setDate(newValue);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl sx={{ width: '100%' }}>
              <ProductContext.Provider value={{
                supplierId,
                product,
                setProduct,
                setProductId,
                setListProducts,
              }}>
                <SearchProducts />
              </ProductContext.Provider>
            </FormControl>
            <Card sx={{ width: '100%' }}>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    headLabel={TABLE_HEAD}
                  />
                  <CartContext.Provider value={{
                    listProducts, setListProducts, quantity, setQuantity, setProduct, setProductId, setTotal
                  }}>
                    <Cart />
                  </CartContext.Provider>
                </Table>
              </TableContainer>
            </Card>
          </Stack>
          {
            listProducts.length > 0 &&
            <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mt: '30px', }}>
              <Button variant="contained" color="primary" onClick={async () => {
                const data = {
                  proveedorId: supplierId,
                  productoProveedorId: productId,
                  cantidad: quantity,
                  fecha: date.toISOString(),
                  total,
                }
                if(quantity > 0){

                  await fetch(`${process.env.REACT_APP_API_URL}/ms-operador/ordenes`, {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                  })
                    .then(response => response.json())
                    .then(data => {
                      setOpen(true);
                      /* Reset  */
                      setSupplier('')
                      setSupplierId('')
                      setListProducts([])
                      setProductId('')
                      setProduct('')
                      setTotal('')
                      setQuantity('')
                      setDate(new Date())
                    });
                  }else{
                    alert('The quantity must be greater than 0')
                  }
              }}>
                Save
              </Button>
            </Stack>
          }
        </Container>
      </Card>

      {/* Dialog - result */}
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

            </Stack>

            <Typography variant="h4" sx={{
              fontWeight: '600',
              marginTop: 2,
            }}> Order created successfully</Typography>

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
          >Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
