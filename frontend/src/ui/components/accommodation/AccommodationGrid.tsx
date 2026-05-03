import { Grid } from '@mui/material';
import AccommodationCard from './AccommodationCard';
import type { Accommodation } from '../../../types/accommodation';

interface AccommodationGridProps {
  accommodations: Accommodation[];
}

const AccommodationGrid = ({ accommodations }: AccommodationGridProps) => {
  if (accommodations.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
      component='ul'
      sx={{ listStyle: 'none', m: 0, p: 0, alignItems: 'stretch' }}
    >
      {accommodations.map((accommodation) => (
        <Grid
          key={accommodation.id}
          component='li'
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: 'flex', minWidth: 0 }}
        >
          <AccommodationCard accommodation={accommodation} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AccommodationGrid;
