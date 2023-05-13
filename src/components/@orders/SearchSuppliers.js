import React from 'react';
// material
import { Autocomplete, TextField } from '@mui/material';

import SUPPLIERSLIST from '../../_mock/suppliers';
import { SupplierContext } from '../../hooks/SupplierContext';

export const SearchSuppliers = () => {

  const { supplier
    , setSupplier,
    setSupplierId
  } = React.useContext(SupplierContext)

  return (
    <Autocomplete
      id="suppliers-search"
      value={supplier}
      disablePortal={false}
      options={SUPPLIERSLIST.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      } )}
       onChange={(event, newValue) => {
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
