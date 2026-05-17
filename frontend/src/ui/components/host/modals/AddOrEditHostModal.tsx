import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { Country } from '../../../../types/country';
import type { CreateHostDto, EditHostDto } from '../../../../types/host';

type HostFormData = {
  name: string;
  surname: string;
  country_id: number;
};

interface AddOrEditHostModalProps {
  open: boolean;
  countries: Country[];
  loadingCountries: boolean;
  saving: boolean;
  errorMessage: string | null;
  initialHost?: EditHostDto | null;
  onClose: () => void;
  onSubmit: (data: CreateHostDto | EditHostDto) => Promise<void>;
}

const AddOrEditHostModal = ({
  open,
  countries,
  loadingCountries,
  saving,
  errorMessage,
  initialHost,
  onClose,
  onSubmit,
}: AddOrEditHostModalProps) => {
  const isEditMode = Boolean(initialHost);
  const [formData, setFormData] = useState<HostFormData>({ name: '', surname: '', country_id: 0 });

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (initialHost) {
        setFormData({
          name: initialHost.name,
          surname: initialHost.surname,
          country_id: initialHost.countryId,
        });
        return;
      }

      setFormData({
        name: '',
        surname: '',
        country_id: countries[0]?.id ?? 0,
      });
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [countries, initialHost, open]);

  const canSubmit = useMemo(
    () => formData.name.trim().length > 1 && formData.surname.trim().length > 1 && formData.country_id > 0,
    [formData.country_id, formData.name, formData.surname],
  );

  const handleSubmit = async () => {
    if (!canSubmit || saving) {
      return;
    }

    const payload = {
      name: formData.name.trim(),
      surname: formData.surname.trim(),
      countryId: Number(formData.country_id),
    };

    if (isEditMode && initialHost) {
      await onSubmit({ ...payload, id: initialHost.id });
      return;
    }

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <PersonAddRoundedIcon color='primary' />
          <Typography variant='h6'>{isEditMode ? 'Edit host' : 'Add new host'}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <TextField
            label='First name'
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <TextField
            label='Last name'
            value={formData.surname}
            onChange={(event) => setFormData((prev) => ({ ...prev, surname: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />
          <FormControl fullWidth disabled={saving || loadingCountries || countries.length === 0}>
            <InputLabel id='host-country-label'>Country</InputLabel>
            <Select
              labelId='host-country-label'
              label='Country'
              value={formData.country_id}
              onChange={(event) => setFormData((prev) => ({ ...prev, country_id: Number(event.target.value) }))}
            >
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.id}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={saving} variant='text'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || saving || countries.length === 0}
          variant='contained'
          startIcon={saving ? <CircularProgress size={16} color='inherit' /> : <SaveRoundedIcon />}
        >
          {saving ? 'Saving...' : isEditMode ? 'Save changes' : 'Create host'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditHostModal;
