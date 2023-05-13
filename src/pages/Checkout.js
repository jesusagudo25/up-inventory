import React from 'react'

import { Container, Stack, Typography, Card, FormControl, TableContainer, Table, Button, Box, Dialog, DialogContent, DialogActions, Slide } from '@mui/material'
import Iconify from '../components/iconify/Iconify.js'
import { ListHead } from '../components/table/ListHead.js'

import { SearchSubsidiaries } from '../components/@checkouts/SearchSubsidiaries.js'
import { SearchInventory } from '../components/@checkouts/SearchInventory.js'

import { Cart } from '../components/@checkouts/Cart.js'
import { CartContext } from '../contexts/CartContext.js'
import { SubsidiaryContext } from '../contexts/SubsidiaryContext.js'
import { ProductContext } from '../contexts/ProductContext.js';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const TABLE_HEAD = [
  { id: 'description', label: 'Description', alignRight: false },
  { id: 'quantity', label: 'Quantity', alignRight: false },
  { id: 'actions', label: '', alignRight: true },
];

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export const Checkout = () => {

  const [open, setOpen] = React.useState(false);
  const [subsidiary, setSubsidiary] = React.useState('')
  const [subsidiaryId, setSubsidiaryId] = React.useState('')
  const [listProducts, setListProducts] = React.useState([])
  const [inventoryId, setInventoryId] = React.useState('')
  const [inventory, setInventory] = React.useState('')
  const [quantity, setQuantity] = React.useState(1)
  const [date, setDate] = React.useState(new Date())
  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          Checkout
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
              <SubsidiaryContext.Provider value={{
                subsidiary
                , setSubsidiary,
                setSubsidiaryId
              }}>
                <SearchSubsidiaries />
              </SubsidiaryContext.Provider>
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
                inventory
                , setInventory,
                setInventoryId,
                setListProducts,
              }}>
                <SearchInventory />
              </ProductContext.Provider>
            </FormControl>
            <Card sx={{ width: '100%' }}>
              <TableContainer sx={{ minWidth: 800 }}>
                <Table>
                  <ListHead
                    headLabel={TABLE_HEAD}
                  />
                  <CartContext.Provider value={{
                    listProducts, setListProducts, quantity, setQuantity, setInventoryId, setInventory
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
              <Button variant="contained" color="primary" onClick={() => {
                setOpen(true);
                /* Reset  */
                setSubsidiary('')
                setSubsidiaryId('')
                setListProducts([])
                setInventoryId('')
                setInventory('')
                setQuantity(1)
                setDate(new Date())
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
            }}> Checkout completed</Typography>

            <Typography variant="h6" sx={{
              marginY: 2,
              fontWeight: '400'
            }}>You can download the PDF file with the details</Typography>


            <Button variant="contained"
              size='large'
              sx={{
                width: '25%',
              }}
              color="error"
              startIcon={<Iconify icon="mdi:file-pdf" />}
            >
              Download
            </Button>

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
