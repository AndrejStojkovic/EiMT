import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useMemo } from 'react';
import { useState } from 'react';
import hostApi from '../../../api/hostApi';
import useHosts from '../../../hooks/host/useHosts';
import useCountries from '../../../hooks/country/useCountries';
import { useAuth } from '../../../hooks/useAuth';
import type { CreateHostDto, EditHostDto, Host } from '../../../types/host';
import HostGrid from '../../components/host/HostGrid';
import AddOrEditHostModal from '../../components/host/modals/AddOrEditHostModal';
import DeleteHostModal from '../../components/host/modals/DeleteHostModal';

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

const HostsPage = () => {
  const { hosts, loading, error, refetch } = useHosts();
  const { countries, loading: countriesLoading, error: countriesError } = useCountries();
  const { user } = useAuth();
  const [addOrEditOpen, setAddOrEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [hostToDelete, setHostToDelete] = useState<Host | null>(null);
  const [hostToEdit, setHostToEdit] = useState<EditHostDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null);

  const canManageHosts = Boolean(user?.roles.includes('ROLE_ADMINISTRATOR'));

  const countryNameById = useMemo(() => {
    const m: Record<number, string> = {};
    for (const c of countries) {
      m[c.id] = c.name;
    }
    return m;
  }, [countries]);

  const openAddModal = () => {
    setHostToEdit(null);
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    setAddOrEditOpen(true);
  };

  const openEditModal = async (host: Host) => {
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    try {
      const response = await hostApi.findById(String(host.id));
      const details = response.data as Host & { countryId?: number };
      const countryId = details.country_id ?? details.countryId;
      if (countryId === undefined) {
        throw new Error('Host response is missing country id.');
      }
      setHostToEdit({
        id: host.id,
        name: details.name,
        surname: details.surname,
        countryId,
      });
      setAddOrEditOpen(true);
    } catch (err) {
      setActionErrorMessage(getApiErrorMessage(err, 'Could not load host details for editing.'));
    }
  };

  const closeAddOrEditModal = () => {
    if (saving) {
      return;
    }
    setAddOrEditOpen(false);
    setHostToEdit(null);
    setModalErrorMessage(null);
  };

  const handleAddOrEdit = async (data: CreateHostDto | EditHostDto) => {
    setSaving(true);
    setModalErrorMessage(null);
    try {
      if ('id' in data) {
        await hostApi.edit(data);
      } else {
        await hostApi.create(data);
      }
      setAddOrEditOpen(false);
      setHostToEdit(null);
      await refetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Host could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (host: Host) => {
    setHostToDelete(host);
    setModalErrorMessage(null);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }
    setDeleteOpen(false);
    setHostToDelete(null);
    setModalErrorMessage(null);
  };

  const confirmDelete = async () => {
    if (!hostToDelete) {
      return;
    }

    setDeleting(true);
    setModalErrorMessage(null);
    try {
      await hostApi.delete(String(hostToDelete.id));
      setDeleteOpen(false);
      setHostToDelete(null);
      await refetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Host could not be deleted.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='hosts-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='hosts-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Host directory
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Meet the people behind the listings. Open a profile to see where they are based and link through to their country.
        </Typography>
        {canManageHosts && (
          <Button onClick={openAddModal} variant='contained' startIcon={<AddRoundedIcon />} sx={{ mt: 2 }}>
            Add host
          </Button>
        )}
        {!loading && !error && hosts.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {hosts.length} host{hosts.length === 1 ? '' : 's'} in the directory
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
        </Alert>
      )}

      {countriesError && (
        <Alert severity='warning' role='status'>
          {countriesError.message} Country names on cards may be incomplete.
        </Alert>
      )}
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
          <CircularProgress aria-label='Loading hosts' />
        </Box>
      )}

      {!loading && !error && hosts.length === 0 && (
        <Alert severity='info'>No hosts are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && hosts.length > 0 && (
        <HostGrid
          hosts={hosts}
          countryNameById={countriesLoading ? undefined : countryNameById}
          onEditHost={canManageHosts ? openEditModal : undefined}
          onDeleteHost={canManageHosts ? openDeleteModal : undefined}
        />
      )}
      <AddOrEditHostModal
        open={addOrEditOpen}
        countries={countries}
        loadingCountries={countriesLoading}
        saving={saving}
        errorMessage={modalErrorMessage}
        initialHost={hostToEdit}
        onClose={closeAddOrEditModal}
        onSubmit={handleAddOrEdit}
      />
      <DeleteHostModal
        open={deleteOpen}
        hostName={hostToDelete ? `${hostToDelete.name} ${hostToDelete.surname}`.trim() : ''}
        deleting={deleting}
        errorMessage={modalErrorMessage}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

export default HostsPage;
