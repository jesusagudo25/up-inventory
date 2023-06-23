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

  const previousController = useRef();

  const [options, setOptions] = React.useState([]);

  const getDataAutocomplete = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    if(!supplierId) return setOptions([]);

    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/proveedores/${supplierId}/productos?nombre=${searchTerm}`, { signal })
      .then((res) => res.json())
      .then((data) => {
        const results = data.map((item) => ({
          value: item.codigo,
          label: item.nombre,
          stock: item.cantidad,
          price: item.precio
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
      id="products-search"
      value={product}
      disablePortal={false}
      options={options}
      onChange={(event, newValue) => {
        setProduct(newValue?.label || '');
        setProductId(newValue?.value || '')
        if (newValue?.value) setListProducts([
          {
            id: newValue?.value,
            name: newValue?.label,
            stock: newValue?.stock,
            price: newValue?.price
          }
        ])
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') setProduct(newInputValue);
        if (event) {
          setProductId('');
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
