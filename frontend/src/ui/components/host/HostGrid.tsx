import { Grid } from '@mui/material';
import HostCard from './HostCard';
import type { Host } from '../../../types/host';

interface HostGridProps {
  hosts: Host[];
  countryNameById?: Record<number, string>;
}

const HostGrid = ({ hosts, countryNameById }: HostGridProps) => {
  if (hosts.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
      component='ul'
      sx={{ listStyle: 'none', m: 0, p: 0, alignItems: 'stretch' }}
    >
      {hosts.map((host) => (
        <Grid
          key={host.id}
          component='li'
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: 'flex', minWidth: 0 }}
        >
          <HostCard host={host} countryName={countryNameById?.[host.country_id]} />
        </Grid>
      ))}
    </Grid>
  );
};

export default HostGrid;
