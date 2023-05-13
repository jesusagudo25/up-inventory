import React, { useRef } from 'react';
// material
import { Autocomplete, TextField } from '@mui/material';

import SUPPLIERSLIST from '../../_mock/suppliers';
import { ProductContext } from '../../hooks/ProductContext';

export const SearchProducts = () => {

  const { 
    supplierId,
    product,
    setProduct,
    setProductId,
    setListProducts,
  } = React.useContext(ProductContext)

  return (
    <Autocomplete
      id="products-search"
      value={product}
      disablePortal={false}
        options={
            supplierId ? SUPPLIERSLIST.find(supplier => supplier.id === supplierId).products.map((option) => {
                return {
                    value: option.id,
                    label: option.name,
                };
            }) : []
        }
     onChange={(event, newValue) => {
        setProduct(newValue);
        setProductId(newValue.value)
        setListProducts([...SUPPLIERSLIST.find(supplier => supplier.id === supplierId).products.filter(product => product.id === newValue.value)])
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
