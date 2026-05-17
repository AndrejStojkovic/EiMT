import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useEffect, useRef, useState } from 'react';
import accommodationApi from '../../../api/accommodationApi';
import hostApi from '../../../api/hostApi';
import useAccommodations from '../../../hooks/accommodation/useAccommodations';
import { useAuth } from '../../../hooks/useAuth';
import { Category } from '../../../types/enums/category';
import { Condition } from '../../../types/enums/condition';
import type { Accommodation, CreateAccommodationDto, EditAccommodationDto } from '../../../types/accommodation';
import type { Host } from '../../../types/host';
import AccommodationGrid from '../../components/accommodation/AccommodationGrid';
import DeleteAccommodationModal from '../../components/accommodation/modals/DeleteAccommodationModal';
import AddOrEditAccommodationModal from '../../components/accommodation/modals/AddOrEditAccommodationModal';

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

const mapEnumValue = <T extends Record<string, string | number>>(
  enumType: T,
  rawValue: unknown,
): number | undefined => {
  if (typeof rawValue === 'number') {
    return rawValue;
  }

  if (typeof rawValue === 'string') {
    const enumValue = enumType[rawValue];
    if (typeof enumValue === 'number') {
      return enumValue;
    }
  }

  return undefined;
};

const AccommodationsPage = () => {
  const { accommodations, loading, isRefreshing, error, fetch } = useAccommodations();
  const { user } = useAuth();
  const [hosts, setHosts] = useState<Host[]>([]);
  const [loadingHosts, setLoadingHosts] = useState(false);
  const [hostsErrorMessage, setHostsErrorMessage] = useState<string | null>(null);
  const [addOrEditOpen, setAddOrEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [accommodationToDelete, setAccommodationToDelete] = useState<Accommodation | null>(null);
  const [accommodationToEdit, setAccommodationToEdit] = useState<EditAccommodationDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingEditDetails, setLoadingEditDetails] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null);
  const editRequestIdRef = useRef(0);

  const availableCount = accommodations.filter((accommodation) => !accommodation.rented).length;
  const canManageAccommodations = Boolean(user?.roles?.includes('ROLE_ADMINISTRATOR'));

  useEffect(() => {
    const loadHosts = async () => {
      setLoadingHosts(true);
      try {
        const response = await hostApi.findAll();
        setHosts(response.data);
        setHostsErrorMessage(null);
      } catch (err) {
        setHostsErrorMessage(getApiErrorMessage(err, 'Could not load hosts for the accommodation form.'));
      } finally {
        setLoadingHosts(false);
      }
    };

    if (canManageAccommodations) {
      loadHosts();
    }
  }, [canManageAccommodations]);

  const openAddModal = () => {
    editRequestIdRef.current += 1;
    setLoadingEditDetails(false);
    setAccommodationToEdit(null);
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    setAddOrEditOpen(true);
  };

  const openEditModal = async (accommodation: Accommodation) => {
    const requestId = editRequestIdRef.current + 1;
    editRequestIdRef.current = requestId;
    setLoadingEditDetails(true);
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    try {
      const detailsResponse = await accommodationApi.findById(String(accommodation.id));
      if (requestId !== editRequestIdRef.current) {
        return;
      }
      const details = detailsResponse.data as EditAccommodationDto & {
        host_id?: number;
        category?: unknown;
        condition?: unknown;
      };
      const hostId = details.hostId ?? details.host_id;
      const category = mapEnumValue(Category, details.category);
      const condition = mapEnumValue(Condition, details.condition);
      if (hostId === undefined) {
        throw new Error('Accommodation response is missing host id.');
      }
      if (category === undefined || condition === undefined) {
        throw new Error('Accommodation response is missing category or condition.');
      }
      setAccommodationToEdit({
        ...details,
        id: accommodation.id,
        hostId,
        category,
        condition,
      });
      setAddOrEditOpen(true);
    } catch (err) {
      if (requestId !== editRequestIdRef.current) {
        return;
      }
      setActionErrorMessage(getApiErrorMessage(err, 'Could not load accommodation details for editing.'));
    } finally {
      if (requestId === editRequestIdRef.current) {
        setLoadingEditDetails(false);
      }
    }
  };

  const closeAddOrEditModal = () => {
    if (saving || loadingEditDetails) {
      return;
    }
    editRequestIdRef.current += 1;
    setAddOrEditOpen(false);
    setAccommodationToEdit(null);
    setModalErrorMessage(null);
  };

  const handleAddOrEdit = async (data: CreateAccommodationDto | EditAccommodationDto) => {
    setSaving(true);
    setModalErrorMessage(null);
    try {
      if ('id' in data) {
        await accommodationApi.edit(data);
      } else {
        await accommodationApi.create(data);
      }
      setAddOrEditOpen(false);
      setAccommodationToEdit(null);
      await fetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Accommodation could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (accommodation: Accommodation) => {
    setAccommodationToDelete(accommodation);
    setModalErrorMessage(null);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }
    setDeleteOpen(false);
    setAccommodationToDelete(null);
    setModalErrorMessage(null);
  };

  const confirmDelete = async () => {
    if (!accommodationToDelete) {
      return;
    }

    setDeleting(true);
    setModalErrorMessage(null);
    try {
      await accommodationApi.delete(String(accommodationToDelete.id));
      setDeleteOpen(false);
      setAccommodationToDelete(null);
      await fetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Accommodation could not be deleted.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='stays-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
      <Box
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          borderRadius: 2,
          border: 1,
          borderColor: 'divider',
          bgcolor: 'background.paper',
          backgroundImage:
            'linear-gradient(112deg, rgba(79, 70, 229, 0.1) 0%, rgba(6, 182, 212, 0.08) 45%, rgba(255,255,255,0) 85%)',
        }}
      >
        <Typography id='stays-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Discover your next stay
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Browse curated accommodations, compare availability, and open any listing for full details and booking info.
        </Typography>
        {canManageAccommodations && (
          <Button onClick={openAddModal} variant='contained' startIcon={<AddRoundedIcon />} sx={{ mt: 2 }}>
            Add accommodation
          </Button>
        )}
        {isRefreshing && (
          <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
            Refreshing stays...
          </Typography>
        )}
        {!loading && !error && accommodations.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {availableCount} of {accommodations.length} stays currently available
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}
      {hostsErrorMessage && canManageAccommodations && <Alert severity='warning'>{hostsErrorMessage}</Alert>}
      {actionErrorMessage && <Alert severity='error'>{actionErrorMessage}</Alert>}

      {loading && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 280,
            borderRadius: 2,
            border: 1,
            borderColor: 'divider',
            bgcolor: 'background.paper',
          }}
        >
          <CircularProgress aria-label='Loading stays' />
        </Box>
      )}

      {!loading && !error && accommodations.length === 0 && (
        <Alert severity='info'>No stays are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && accommodations.length > 0 && (
        <AccommodationGrid
          accommodations={accommodations}
          onEditAccommodation={canManageAccommodations ? openEditModal : undefined}
          onDeleteAccommodation={canManageAccommodations ? openDeleteModal : undefined}
        />
      )}

      <AddOrEditAccommodationModal
        open={addOrEditOpen}
        hosts={hosts}
        loadingHosts={loadingHosts}
        saving={saving || loadingEditDetails}
        errorMessage={modalErrorMessage}
        initialAccommodation={accommodationToEdit}
        onClose={closeAddOrEditModal}
        onSubmit={handleAddOrEdit}
      />
      <DeleteAccommodationModal
        open={deleteOpen}
        accommodationName={accommodationToDelete?.name ?? ''}
        deleting={deleting}
        errorMessage={modalErrorMessage}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

export default AccommodationsPage;
