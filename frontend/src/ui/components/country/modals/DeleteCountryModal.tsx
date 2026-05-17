import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';
import {
  Alert,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Typography,
} from '@mui/material';

interface DeleteCountryModalProps {
  open: boolean;
  countryName: string;
  deleting: boolean;
  errorMessage: string | null;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteCountryModal = ({
  open,
  countryName,
  deleting,
  errorMessage,
  onClose,
  onConfirm,
}: DeleteCountryModalProps) => {
  return (
    <Dialog open={open} onClose={deleting ? undefined : onClose} fullWidth maxWidth='xs'>
      <DialogTitle sx={{ pb: 1 }}>
        <Stack direction='row' spacing={1} sx={{ alignItems: 'center' }}>
          <DeleteForeverRoundedIcon color='error' />
          <Typography variant='h6'>Delete country</Typography>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={1.5}>
          {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
          <Typography variant='body1'>
            Are you sure you want to permanently remove <strong>{countryName}</strong>?
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            This action cannot be undone.
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={deleting}>
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
          color='error'
          variant='contained'
          disabled={deleting}
          startIcon={deleting ? <CircularProgress size={16} color='inherit' /> : <DeleteForeverRoundedIcon />}
        >
          {deleting ? 'Deleting...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteCountryModal;
