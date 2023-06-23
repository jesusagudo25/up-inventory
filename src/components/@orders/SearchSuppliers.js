import React, { useRef } from 'react';
// material
import { Autocomplete, TextField } from '@mui/material';

import { SupplierContext } from '../../contexts/SupplierContext';

export const SearchSuppliers = () => {

  const { 
    supplier,
    setSupplier,
    setSupplierId
  } = React.useContext(SupplierContext)

  const previousController = useRef();

  const [options, setOptions] = React.useState([]);

  const getDataAutocomplete = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores?nombre=${searchTerm}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        const results = data.map((item) => ({
          value: item.id,
          label: item.nombre,
        }));
        setOptions(results);
      }
      ).catch((err) => {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          console.error(err);
        }
      }
      );
  };

  return (
    <Autocomplete
      id="suppliers-search"
      value={supplier}
      disablePortal={false}
      options={options}
       onChange={(event, newValue) => {
        setSupplier(newValue?.label || '');
        setSupplierId(newValue?.value || '');
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') setSupplier(newInputValue);
        if (event) {
          setSupplierId('');
          if (event?.target?.value?.length > 2) {
            getDataAutocomplete(event.target.value);
          }
          else {
            setOptions([]);
          }
        }

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
