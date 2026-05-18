import { Grid } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import UserCard from './UserCard';
import type { RegisterResponse } from '../../../types/user';

interface UserGridProps {
  users: RegisterResponse[];
  onEditUser?: (user: RegisterResponse) => void;
  onDeleteUser?: (user: RegisterResponse) => void;
}

const UserGrid = ({ users, onEditUser, onDeleteUser }: UserGridProps) => {
  const { user } = useAuth();
  const isAdmin = Boolean(user?.roles?.includes('ROLE_ADMINISTRATOR'));

  if (users.length === 0) {
    return null;
  }

  return (
    <Grid
      container
      spacing={{ xs: 2, sm: 2.25, md: 2.5 }}
      component='ul'
      sx={{ listStyle: 'none', m: 0, p: 0, alignItems: 'stretch' }}
    >
      {users.map((registeredUser, idx) => (
        <Grid
          key={idx}
          component='li'
          size={{ xs: 12, sm: 6, md: 4 }}
          sx={{ display: 'flex', minWidth: 0 }}
        >
          <UserCard user={registeredUser} onEdit={onEditUser} onDelete={onDeleteUser} isAdmin={isAdmin} />
        </Grid>
      ))}
    </Grid>
  );
};

export default UserGrid;
