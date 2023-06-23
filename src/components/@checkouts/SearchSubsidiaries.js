import React, { useRef } from 'react'
import { Autocomplete, TextField } from '@mui/material';

import { SubsidiaryContext } from '../../contexts/SubsidiaryContext.js';

export const SearchSubsidiaries = () => {
  const {
    subsidiary,
    setSubsidiary,
    setSubsidiaryId
  } = React.useContext(SubsidiaryContext)

  const previousController = useRef();

  const [options, setOptions] = React.useState([]);

  const getDataAutocomplete = (searchTerm) => {
    if (previousController.current) {
      previousController.current.abort();
    }

    const controller = new AbortController();
    const signal = controller.signal;
    previousController.current = controller;

    fetch(`${process.env.REACT_APP_API_URL}/ms-buscador/sucursales?nombre=${searchTerm}`, { signal })
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
      id="subsidiaries-search"
      value={subsidiary}
      disablePortal={false}
      options={options}
      onChange={(event, newValue) => {
        setSubsidiary(newValue?.label || '');
        setSubsidiaryId(newValue?.value || '');
      }}
      onInputChange={(event, newInputValue) => {
        if (newInputValue !== '') setSubsidiary(newInputValue);
        if (event) {
          setSubsidiaryId('');
          if (event?.target?.value?.length > 2) {
            getDataAutocomplete(event.target.value);
          }
          else {
            setOptions([]);
          }
        }

      }}
      noOptionsText="No subsidiaries found"
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
          label="Search Subsidiary"
          InputLabelProps={{
            shrink: true,
          }}
          placeholder="Enter Subsidiary Name"
        />
      )}
    />
  )
}
