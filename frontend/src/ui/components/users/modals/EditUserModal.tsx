import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { RegisterResponse, Role } from '../../../../types/user';

type UserFormData = {
  username: string;
  name: string;
  surname: string;
  email: string;
  role: Role;
};

interface EditUserModalProps {
  open: boolean;
  saving: boolean;
  errorMessage: string | null;
  initialUser?: RegisterResponse | null;
  onClose: () => void;
  onSubmit: (data: RegisterResponse) => Promise<void>;
}

const EditUserModal = ({
  open,
  saving,
  errorMessage,
  initialUser,
  onClose,
  onSubmit,
}: EditUserModalProps) => {
  const [formData, setFormData] = useState<UserFormData>({
    username: '',
    name: '',
    surname: '',
    email: '',
    role: 'ROLE_USER',
  });

  useEffect(() => {
    if (!open || !initialUser) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFormData({
      username: initialUser.username,
      name: initialUser.name,
      surname: initialUser.surname,
      email: initialUser.email,
      role: initialUser.role,
    });
  }, [initialUser, open]);

  const canSubmit = useMemo(
    () =>
      formData.username.trim().length > 0 &&
      formData.name.trim().length > 1 &&
      formData.surname.trim().length > 1 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()),
    [formData.email, formData.name, formData.surname, formData.username],
  );

  const handleSubmit = async () => {
    if (!canSubmit || saving) {
      return;
    }

    await onSubmit({
      username: initialUser?.username ?? formData.username.trim(),
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      email: formData.email.trim(),
      role: formData.role,
    });
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <EditRoundedIcon color='primary' />
          <Typography variant='h6'>Edit user</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <TextField
            label='Username'
            value={formData.username}
            fullWidth
            required
            disabled
          />
          <TextField
            label='Name'
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <TextField
            label='Surname'
            value={formData.surname}
            onChange={(event) => setFormData((prev) => ({ ...prev, surname: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <TextField
            label='Email'
            type='email'
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({ ...prev, email: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <TextField
            select
            label='Role'
            value={formData.role}
            onChange={(event) => setFormData((prev) => ({ ...prev, role: event.target.value as Role }))}
            fullWidth
            required
            disabled={saving}
          >
            <MenuItem value='ROLE_USER'>User</MenuItem>
            <MenuItem value='ROLE_ADMINISTRATOR'>Administrator</MenuItem>
          </TextField>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={saving} variant='text'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || saving}
          variant='contained'
          startIcon={saving ? <CircularProgress size={16} color='inherit' /> : <SaveRoundedIcon />}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserModal;
