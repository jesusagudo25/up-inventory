import React from 'react'
import { Autocomplete, TextField } from '@mui/material';

import SUBSIDIARIES from '../../_mock/subsidiaries';

import { SubsidiaryContext } from '../../hooks/SubsidiaryContext.js';

export const SearchSubsidiaries = () => {
  const { subsidiary
    , setSubsidiary,
    setSubsidiaryId
  } = React.useContext(SubsidiaryContext)

  return (
    <Autocomplete
      id="subsidiaries-search"
      value={subsidiary}
      disablePortal={false}
      options={SUBSIDIARIES.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      } )}
       onChange={(event, newValue) => {
        setSubsidiary(newValue);
        setSubsidiaryId(newValue.value)
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
