import React, { useRef } from 'react';
import { Autocomplete, TextField } from '@mui/material';

import { ProductContext } from '../../contexts/ProductContext.js';

export const SearchInventory = () => {
  const {
    inventory,
    setInventory,
    setInventoryId,
    setListProducts,
  } = React.useContext(ProductContext)

  const previousController = useRef();

  const [options, setOptions] = React.useState([]);

  const getDataAutocomplete = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/productos?nombre=${searchTerm}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        const results = data.map((item) => ({
          value: item.codigo,
          label: item.nombre,
          stock: item.cantidad
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
      id="inventories-search"
      value={inventory}
      disablePortal={false}
      options={options}
      onChange={(event, newValue) => {
        setInventory(newValue?.label || '');
        setInventoryId(newValue?.value || '')
        if (newValue?.value) setListProducts([
          {
            id: newValue?.value,
            name: newValue?.label,
            stock: newValue?.stock
          }
        ])
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') setInventory(newInputValue);
        if (event) {
          setInventoryId('');
          if (event?.target?.value?.length > 2) {
            getDataAutocomplete(event.target.value);
          }
          else {
            setOptions([]);
          }
        }

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
