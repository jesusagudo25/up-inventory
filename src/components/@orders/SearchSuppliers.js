import React from 'react';
// material
import { Autocomplete, TextField } from '@mui/material';

import { SupplierContext } from '../../contexts/SupplierContext';

export const SearchSuppliers = () => {

  const { supplier
    , setSupplier,
    setSupplierId
  } = React.useContext(SupplierContext)

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
      id="suppliers-search"
      value={supplier}
      disablePortal={false}
      options={suppliers.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      } )}
       onChange={(event, newValue) => {
        if(newValue === null) return ''
        setSupplier(newValue);
        setSupplierId(newValue.value)
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
