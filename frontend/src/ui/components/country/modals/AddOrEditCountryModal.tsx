import FlagRoundedIcon from '@mui/icons-material/FlagRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { CreateCountryDto, EditCountryDto } from '../../../../types/country';

type CountryFormData = {
  name: string;
  continent: string;
};

interface AddOrEditCountryModalProps {
  open: boolean;
  saving: boolean;
  errorMessage: string | null;
  initialCountry?: EditCountryDto | null;
  onClose: () => void;
  onSubmit: (data: CreateCountryDto | EditCountryDto) => Promise<void>;
}

const AddOrEditCountryModal = ({
  open,
  saving,
  errorMessage,
  initialCountry,
  onClose,
  onSubmit,
}: AddOrEditCountryModalProps) => {
  const isEditMode = Boolean(initialCountry);
  const [formData, setFormData] = useState<CountryFormData>({ name: '', continent: '' });

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (initialCountry) {
        setFormData({
          name: initialCountry.name,
          continent: initialCountry.continent,
        });
        return;
      }

      setFormData({ name: '', continent: '' });
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [initialCountry, open]);

  const canSubmit = useMemo(
    () => formData.name.trim().length > 1 && formData.continent.trim().length > 1,
    [formData.continent, formData.name],
  );

  const handleSubmit = async () => {
    if (!canSubmit || saving) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      continent: formData.continent.trim(),
    };

    if (isEditMode && initialCountry) {
      await onSubmit({ ...payload, id: initialCountry.id });
      return;
    }

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <FlagRoundedIcon color='primary' />
          <Typography variant='h6'>{isEditMode ? 'Edit country' : 'Add new country'}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <TextField
            label='Country name'
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <TextField
            label='Continent'
            value={formData.continent}
            onChange={(event) => setFormData((prev) => ({ ...prev, continent: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
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
          {saving ? 'Saving...' : isEditMode ? 'Save changes' : 'Create country'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditCountryModal;
