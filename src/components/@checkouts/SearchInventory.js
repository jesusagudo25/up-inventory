import React from 'react'
import { Autocomplete, TextField } from '@mui/material';

import PRODUCTS from '../../_mock/products';

import { ProductContext } from '../../hooks/ProductContext.js';

export const SearchInventory = () => {
    const { inventory
        ,setInventory,
        setInventoryId,
        setListProducts,
      } = React.useContext(ProductContext)
    
      return (
        <Autocomplete
          id="inventories-search"
          value={inventory}
          disablePortal={false}
          options={PRODUCTS.map((option) => {
            return {
              value: option.id,
              label: option.name,
            };
          } )}
           onChange={(event, newValue) => {
            setInventory(newValue);
            setInventoryId(newValue.value)
            setListProducts([...PRODUCTS.filter(product => product.id === newValue.value)])
          }}
          noOptionsText="No suppliers found"
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          clearOnEscape
          blurOnSelect
          freeSolo
          loading
          loadingText="Loading..."
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search Supplier"
              InputLabelProps={{
                shrink: true,
              }}
              placeholder="Enter Supplier Name"
            />
          )}
        />
      )
}
