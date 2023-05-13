import React from 'react'
import { Autocomplete, TextField } from '@mui/material';

import { SubsidiaryContext } from '../../contexts/SubsidiaryContext.js';

export const SearchSubsidiaries = () => {
  const { subsidiary
    , setSubsidiary,
    setSubsidiaryId
  } = React.useContext(SubsidiaryContext)

  const [subsidiaries, setSubsidiaries] = React.useState([])

  const getSubsidiaries = () => {
    fetch(`${process.env.REACT_APP_API_URL}/mock/subsidiaries.json`)
      .then(response => response.json())
      .then(data => {
        setSubsidiaries(data)
      })
  }

  React.useEffect(() => {
    getSubsidiaries()
  }, [])

  return (
    <Autocomplete
      id="subsidiaries-search"
      value={subsidiary}
      disablePortal={false}
      options={subsidiaries.map((option) => {
        return {
          value: option.id,
          label: option.name,
        };
      } )}
       onChange={(event, newValue) => {
        if(newValue === null) return ''
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
