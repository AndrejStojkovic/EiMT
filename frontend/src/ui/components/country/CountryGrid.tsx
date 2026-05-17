import { Grid } from '@mui/material';
import CountryCard from './CountryCard';
import type { Country } from '../../../types/country';
import { useAuth } from '../../../hooks/useAuth';

interface CountryGridProps {
  countries: Country[];
  onEditCountry?: (country: Country) => void;
  onDeleteCountry?: (country: Country) => void;
}

const CountryGrid = ({ countries, onEditCountry, onDeleteCountry }: CountryGridProps) => {
  const { user } = useAuth();
  const isAdmin = Boolean(user?.roles.includes('ROLE_ADMINISTRATOR'));

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
          <CountryCard country={country} onEdit={onEditCountry} onDelete={onDeleteCountry} isAdmin={isAdmin} />
        </Grid>
      ))}
    </Grid>
  );
};

export default CountryGrid;
