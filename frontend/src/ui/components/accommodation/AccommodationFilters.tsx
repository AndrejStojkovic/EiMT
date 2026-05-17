import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import { Box, Button, Collapse, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import { Category } from '../../../types/enums/category';
import type { AccommodationFilterDto } from '../../../types/accommodation';
import type { Country } from '../../../types/country';
import type { Host } from '../../../types/host';

interface AccommodationFiltersProps {
  filter: AccommodationFilterDto;
  hosts: Host[];
  countries: Country[];
  disabled?: boolean;
  onChange: (value: AccommodationFilterDto) => void;
  onApply: () => void;
  onReset: () => void;
}

const getCategoryLabel = (value: number) =>
  Category[value]
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());

const AccommodationFilters = ({
  filter,
  hosts,
  countries,
  disabled = false,
  onChange,
  onApply,
  onReset,
}: AccommodationFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 1 }}>
        <Button
          size='small'
          variant='text'
          onClick={() => setIsExpanded((prev) => !prev)}
          startIcon={isExpanded ? <KeyboardArrowUpRoundedIcon /> : <KeyboardArrowDownRoundedIcon />}
        >
          {isExpanded ? 'Hide filters' : 'Show filters'}
        </Button>
      </Box>

      <Collapse in={isExpanded}>
        <Paper
          sx={{
            p: { xs: 1.5, sm: 2 },
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            '& .MuiInputBase-root': { fontSize: '0.9rem' },
            '& .MuiInputLabel-root': { fontSize: '0.85rem' },
          }}
        >
          <Grid container spacing={1.25}>
          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='accommodation-category-filter-label'>Category</InputLabel>
              <Select
                labelId='accommodation-category-filter-label'
                label='Category'
                value={filter.category === undefined ? 'all' : filter.category}
                size='small'
                disabled={disabled}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange({
                    ...filter,
                    category: value === 'all' ? undefined : (Number(value) as Category),
                  });
                }}
              >
                <MenuItem value='all'>All categories</MenuItem>
                {Object.values(Category)
                  .filter((value) => typeof value === 'number')
                  .map((value) => (
                    <MenuItem key={value} value={value}>
                      {getCategoryLabel(value as number)}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='accommodation-host-filter-label'>Host</InputLabel>
              <Select
                labelId='accommodation-host-filter-label'
                label='Host'
                value={filter.hostId === undefined ? 'all' : filter.hostId}
                size='small'
                disabled={disabled}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange({
                    ...filter,
                    hostId: value === 'all' ? undefined : Number(value),
                  });
                }}
              >
                <MenuItem value='all'>All hosts</MenuItem>
                {hosts.map((host) => (
                  <MenuItem key={host.id} value={host.id}>
                    {`${host.name} ${host.surname}`.trim()}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='accommodation-country-filter-label'>Host country</InputLabel>
              <Select
                labelId='accommodation-country-filter-label'
                label='Host country'
                value={filter.hostCountryId === undefined ? 'all' : filter.hostCountryId}
                size='small'
                disabled={disabled}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange({
                    ...filter,
                    hostCountryId: value === 'all' ? undefined : Number(value),
                  });
                }}
              >
                <MenuItem value='all'>All countries</MenuItem>
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <TextField
              fullWidth
              label='Number of rooms'
              type='number'
              size='small'
              value={filter.numRooms ?? ''}
              disabled={disabled}
              slotProps={{ htmlInput: { min: 1 } }}
              onChange={(event) => {
                const value = event.target.value;
                onChange({
                  ...filter,
                  numRooms: value === '' ? undefined : Number(value),
                });
              }}
            />
          </Grid>

          <Grid size={{ xs: 12, sm: 6, md: 4 }}>
            <FormControl fullWidth size='small'>
              <InputLabel id='accommodation-availability-filter-label'>Availability</InputLabel>
              <Select
                labelId='accommodation-availability-filter-label'
                label='Availability'
                value={filter.available === undefined ? 'all' : filter.available ? 'available' : 'unavailable'}
                size='small'
                disabled={disabled}
                onChange={(event) => {
                  const value = event.target.value;
                  onChange({
                    ...filter,
                    available: value === 'all' ? undefined : value === 'available',
                  });
                }}
              >
                <MenuItem value='all'>All stays</MenuItem>
                <MenuItem value='available'>Available</MenuItem>
                <MenuItem value='unavailable'>Unavailable</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction='row' spacing={1} sx={{ height: '100%', alignItems: 'center', justifyContent: { xs: 'flex-end', md: 'flex-end' } }}>
              <Button
                size='small'
                variant='text'
                disabled={disabled}
                startIcon={<RestartAltRoundedIcon />}
                onClick={onReset}
              >
                Clear filters
              </Button>
              <Button
                size='small'
                variant='contained'
                disabled={disabled}
                startIcon={<FilterAltRoundedIcon />}
                onClick={onApply}
              >
                Apply filters
              </Button>
            </Stack>
          </Grid>
          </Grid>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default AccommodationFilters;
