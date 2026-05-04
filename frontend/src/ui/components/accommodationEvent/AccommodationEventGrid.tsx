import { Grid } from '@mui/material';
import AccommodationEventCard from './AccommodationEventCard';
import type { AccommodationEvent } from '../../../types/accommodation';

interface AccommodationEventGridProps {
  accommodationEvents: AccommodationEvent[];
}

const AccommodationEventGrid = ({ accommodationEvents }: AccommodationEventGridProps) => {
  if (accommodationEvents.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
      component='ul'
      sx={{ listStyle: 'none', m: 0, p: 0, alignItems: 'stretch' }}
    >
      {accommodationEvents.map((accommodationEvent, index) => (
        <Grid
          key={index}
          component='li'
          size={{ xs: 12, sm: 6, md: 3 }}
          sx={{ display: 'flex', minWidth: 0 }}
        >
          <AccommodationEventCard accommodationEvent={accommodationEvent} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AccommodationEventGrid;
