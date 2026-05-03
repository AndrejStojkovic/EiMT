import { Grid } from '@mui/material';
import CountryCard from './CountryCard';
import type { Country } from '../../../types/country';

interface CountryGridProps {
  countries: Country[];
}

const CountryGrid = ({ countries }: CountryGridProps) => {
  if (countries.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
      component='ul'
      sx={{ listStyle: 'none', m: 0, p: 0, alignItems: 'stretch' }}
    >
      {countries.map((country) => (
        <Grid
          key={country.id}
          component='li'
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: 'flex', minWidth: 0 }}
        >
          <CountryCard country={country} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryGrid;
