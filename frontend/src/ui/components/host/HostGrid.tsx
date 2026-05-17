import { Grid } from '@mui/material';
import HostCard from './HostCard';
import type { Host } from '../../../types/host';
import { useAuth } from '../../../hooks/useAuth';

interface HostGridProps {
  hosts: Host[];
  countryNameById?: Record<number, string>;
  onEditHost?: (host: Host) => void;
  onDeleteHost?: (host: Host) => void;
}

const HostGrid = ({ hosts, countryNameById, onEditHost, onDeleteHost }: HostGridProps) => {
  const { user } = useAuth();
  const isAdmin = Boolean(user?.roles.includes('ROLE_ADMINISTRATOR'));

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
          <HostCard
            host={host}
            countryName={countryNameById?.[host.country_id]}
            onEdit={onEditHost}
            onDelete={onDeleteHost}
            isAdmin={isAdmin}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HostGrid;
