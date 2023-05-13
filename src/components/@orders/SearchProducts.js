import React, { useRef } from 'react';
// material
import { Autocomplete, TextField } from '@mui/material';

import { ProductContext } from '../../contexts/ProductContext';

export const SearchProducts = () => {

  const { 
    supplierId,
    product,
    setProduct,
    setProductId,
    setListProducts,
  } = React.useContext(ProductContext)

  const [suppliers, setSuppliers] = React.useState([])

  const getSuppliers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mock/suppliers.json`)
      .then(response => response.json())  
      .then(data => {
        setSuppliers(data)
      })
  }

  React.useEffect(() => {
    getSuppliers()
  }, [])

  return (
    <Autocomplete
      id="products-search"
      value={product}
      disablePortal={false}
        options={
            supplierId ? suppliers.find(supplier => supplier.id === supplierId).products.map((option) => {
                return {
                    value: option.id,
                    label: option.name,
                };
            }) : []
        }
     onChange={(event, newValue) => {
        if(newValue === null) return ''
        setProduct(newValue);
        setProductId(newValue.value)
        setListProducts([...suppliers.find(supplier => supplier.id === supplierId).products.filter(product => product.id === newValue.value)])
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
          label="Search Products"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter Product Name"
        />
      )}
    />
  )
}
