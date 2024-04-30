# Material UI

	yarn add @mui/material @emotion/react @emotion/styled

## Components

### Autocomplete

    <Autocomplete
      value={selectedOption}
      inputValue={searchTerm !== '' ? searchTerm : selectedOption?.name}
      options={listOptions}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option?.name ?? '(none)'}
      renderInput={(params) => (
        <TextField {...params} label={'Search...'} />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.id}>{option.name}</li>
      )}
      onChange={(event, newSelectedOption) => {
        setSelectedOption(newSelectedOption)
      }}
      onInputChange={(event, newInputValue) => {
        setSearchTerm(newInputValue)
      }}
      sx={{ minWidth: '20em' }}
    />
