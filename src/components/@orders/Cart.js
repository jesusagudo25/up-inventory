import React from 'react'

import { TableBody, TableRow, TableCell, Typography, FormControl, TextField, IconButton, Box, } from '@mui/material'
import Iconify from '../iconify/Iconify.js'

import { CartContext } from '../../hooks/CartContext.js'

export const Cart = () => {

    const { listProducts, setListProducts, quantity, setQuantity, setProduct, setProductId } = React.useContext(CartContext)
    return (
        <TableBody>
            {
                listProducts.length > 0 ? listProducts.map((row) => {
                    const { id, name, price } = row;
                    return (
                        <TableRow key={id}>
                            <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {name}
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <FormControl sx={{ width: '50%' }}>
                                    <TextField
                                        id="quantity"
                                        label="Quantity"
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            e.target.value > 1000 ? setQuantity(1000) : e.target.value < 1 ? setQuantity(1) : setQuantity(e.target.value)

                                        }}
                                    />
                                </FormControl>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {price}
                                </Typography>
                            </TableCell>
                            <TableCell align="left">
                                <Typography variant="subtitle2" noWrap>
                                    {(price * quantity).toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell align="right" width="5%">
                                <IconButton size="large" color="inherit" onClick={() => {
                                    setListProducts([...listProducts.filter(product => product.id !== id)])
                                    setQuantity(1)
                                    setProduct('')
                                    setProductId('')
                                }} >
                                    <Iconify icon={'eva:trash-2-outline'} color="#2065D1" width={23} />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )
                }
                ) :
                    <TableRow>
                        <TableCell colSpan={5} align="center">

                            <Box sx={{
                                my: 1,
                            }}>
                                <Iconify icon="mdi:cart-off" color="#2065D1" width={25}
                                    sx={{ fontSize: '3rem' }}
                                />
                            </Box>
                            <Typography variant="subtitle1" sx={{ my: 1 }}>
                                No products added
                            </Typography>
                        </TableCell>
                    </TableRow>
            }
        </TableBody>
    )
}
