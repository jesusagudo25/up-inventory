import React from 'react'
import { Autocomplete, TextField } from '@mui/material';

import { ProductContext } from '../../contexts/ProductContext.js';

export const SearchInventory = () => {
  const { inventory
    , setInventory,
    setInventoryId,
    setListProducts,
  } = React.useContext(ProductContext)

  const [products, setProducts] = React.useState([])

  const getProducts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mock/products.json`)
      .then(response => response.json())
      .then(data => {
        setProducts(data)
      })
  }

  React.useEffect(() => {
    getProducts()
  }, [])

  return (
    <Autocomplete
      id="inventories-search"
      value={inventory}
      disablePortal={false}
      options={products.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      })}
      onChange={(event, newValue) => {
        if (newValue === null) return ''
        setInventory(newValue);
        setInventoryId(newValue.value)
        setListProducts([...products.filter(product => product.id === newValue.value)])
      }}
      noOptionsText="No products found"
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
          label="Search Product"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter product name"
        />
      )}
    />
  )
}
