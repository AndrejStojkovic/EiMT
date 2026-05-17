import BedRoundedIcon from '@mui/icons-material/BedRounded';
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
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import type { Host } from '../../../../types/host';
import type { CreateAccommodationDto, EditAccommodationDto } from '../../../../types/accommodation';
import { Category } from '../../../../types/enums/category';
import { Condition } from '../../../../types/enums/condition';

type AccommodationFormData = {
  name: string;
  category: Category;
  host_id: number;
  condition: Condition;
  numRooms: number;
  rented: boolean;
};

interface AddOrEditAccommodationModalProps {
  open: boolean;
  hosts: Host[];
  loadingHosts: boolean;
  saving: boolean;
  errorMessage: string | null;
  initialAccommodation?: EditAccommodationDto | null;
  onClose: () => void;
  onSubmit: (data: CreateAccommodationDto | EditAccommodationDto) => Promise<void>;
}

const getCategoryLabel = (value: number) =>
  Category[value]
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/^./, (char) => char.toUpperCase());

const getConditionLabel = (value: number) =>
  Condition[value]
    .toLowerCase()
    .replaceAll('_', ' ')
    .replace(/^./, (char) => char.toUpperCase());

const AddOrEditAccommodationModal = ({
  open,
  hosts,
  loadingHosts,
  saving,
  errorMessage,
  initialAccommodation,
  onClose,
  onSubmit,
}: AddOrEditAccommodationModalProps) => {
  const isEditMode = Boolean(initialAccommodation);
  const [formData, setFormData] = useState<AccommodationFormData>({
    name: '',
    category: Category.ROOM,
    host_id: 0,
    condition: Condition.GOOD,
    numRooms: 1,
    rented: false,
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    const timer = window.setTimeout(() => {
      if (initialAccommodation) {
        setFormData({
          name: initialAccommodation.name,
          category: initialAccommodation.category,
          host_id: initialAccommodation.hostId,
          condition: initialAccommodation.condition,
          numRooms: initialAccommodation.numRooms,
          rented: initialAccommodation.rented,
        });
        return;
      }

      setFormData((prev) => ({
        ...prev,
        name: '',
        category: Category.ROOM,
        host_id: hosts[0]?.id ?? 0,
        condition: Condition.GOOD,
        numRooms: 1,
        rented: false,
      }));
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [hosts, initialAccommodation, open]);

  const canSubmit = useMemo(
    () => formData.name.trim().length > 1 && formData.numRooms > 0 && formData.host_id > 0,
    [formData],
  );

  const handleSubmit = async () => {
    if (!canSubmit || saving) {
      return;
    }

    const payload = {
      ...formData,
      name: formData.name.trim(),
      numRooms: Number(formData.numRooms),
      hostId: Number(formData.host_id),
    };

    if (isEditMode && initialAccommodation) {
      await onSubmit({ ...payload, id: initialAccommodation.id });
      return;
    }

    await onSubmit(payload);
  };

  return (
    <Dialog open={open} onClose={saving ? undefined : onClose} fullWidth maxWidth='sm'>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <BedRoundedIcon color='primary' />
          <Typography variant='h6'>{isEditMode ? 'Edit accommodation' : 'Add new accommodation'}</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <TextField
            label='Accommodation name'
            value={formData.name}
            onChange={(event) => setFormData((prev) => ({ ...prev, name: event.target.value }))}
            fullWidth
            required
            disabled={saving}
          />

          <Grid container spacing={1.5}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='accommodation-category-label'>Category</InputLabel>
                <Select
                  labelId='accommodation-category-label'
                  label='Category'
                  value={formData.category}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, category: Number(event.target.value) as Category }))
                  }
                  disabled={saving}
                >
                  {Object.values(Category)
                    .filter((value) => typeof value === 'number')
                    .map((value) => (
                      <MenuItem key={value} value={value}>
                        {getCategoryLabel(value as number)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth>
                <InputLabel id='accommodation-condition-label'>Condition</InputLabel>
                <Select
                  labelId='accommodation-condition-label'
                  label='Condition'
                  value={formData.condition}
                  onChange={(event) =>
                    setFormData((prev) => ({ ...prev, condition: Number(event.target.value) as Condition }))
                  }
                  disabled={saving}
                >
                  {Object.values(Condition)
                    .filter((value) => typeof value === 'number')
                    .map((value) => (
                      <MenuItem key={value} value={value}>
                        {getConditionLabel(value as number)}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <TextField
                label='Number of rooms'
                type='number'
                value={formData.numRooms}
                onChange={(event) => setFormData((prev) => ({ ...prev, numRooms: Number(event.target.value) }))}
                slotProps={{ htmlInput: { min: 1 } }}
                fullWidth
                required
                disabled={saving}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 6 }}>
              <FormControl fullWidth disabled={saving || loadingHosts || hosts.length === 0}>
                <InputLabel id='accommodation-host-label'>Host</InputLabel>
                <Select
                  labelId='accommodation-host-label'
                  label='Host'
                  value={formData.host_id}
                  onChange={(event) => setFormData((prev) => ({ ...prev, host_id: Number(event.target.value) }))}
                >
                  {hosts.map((host) => (
                    <MenuItem key={host.id} value={host.id}>
                      {`${host.name} ${host.surname}`.trim()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
            <Switch
              checked={formData.rented}
              onChange={(event) => setFormData((prev) => ({ ...prev, rented: event.target.checked }))}
              disabled={saving}
            />
            <Typography variant='body2' color='text.secondary'>
              Is currently rented?
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={saving} variant='text'>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit || saving || hosts.length === 0}
          variant='contained'
          startIcon={saving ? <CircularProgress size={16} color='inherit' /> : <SaveRoundedIcon />}
        >
          {saving ? 'Saving...' : isEditMode ? 'Save changes' : 'Create accommodation'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrEditAccommodationModal;
