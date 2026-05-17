import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Box, Button, CircularProgress, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useState } from 'react';
import countryApi from '../../../api/countryApi';
import useCountries from '../../../hooks/country/useCountries';
import { useAuth } from '../../../hooks/useAuth';
import type { Country, CreateCountryDto, EditCountryDto } from '../../../types/country';
import CountryGrid from '../../components/country/CountryGrid';
import AddOrEditCountryModal from '../../components/country/modals/AddOrEditCountryModal';
import DeleteCountryModal from '../../components/country/modals/DeleteCountryModal';

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

const CountriesPage = () => {
  const { countries, loading, error, refetch } = useCountries();
  const { user } = useAuth();
  const [addOrEditOpen, setAddOrEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [countryToDelete, setCountryToDelete] = useState<Country | null>(null);
  const [countryToEdit, setCountryToEdit] = useState<EditCountryDto | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null);

  const canManageCountries = Boolean(user?.roles.includes('ROLE_ADMINISTRATOR'));

  const openAddModal = () => {
    setCountryToEdit(null);
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    setAddOrEditOpen(true);
  };

  const openEditModal = async (country: Country) => {
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    try {
      const response = await countryApi.findById(String(country.id));
      setCountryToEdit({
        id: country.id,
        name: response.data.name,
        continent: response.data.continent,
      });
      setAddOrEditOpen(true);
    } catch (err) {
      setActionErrorMessage(getApiErrorMessage(err, 'Could not load country details for editing.'));
    }
  };

  const closeAddOrEditModal = () => {
    if (saving) {
      return;
    }
    setAddOrEditOpen(false);
    setCountryToEdit(null);
    setModalErrorMessage(null);
  };

  const handleAddOrEdit = async (data: CreateCountryDto | EditCountryDto) => {
    setSaving(true);
    setModalErrorMessage(null);
    try {
      if ('id' in data) {
        await countryApi.edit(data);
      } else {
        await countryApi.create(data);
      }
      setAddOrEditOpen(false);
      setCountryToEdit(null);
      await refetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Country could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (country: Country) => {
    setCountryToDelete(country);
    setModalErrorMessage(null);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }
    setDeleteOpen(false);
    setCountryToDelete(null);
    setModalErrorMessage(null);
  };

  const confirmDelete = async () => {
    if (!countryToDelete) {
      return;
    }

    setDeleting(true);
    setModalErrorMessage(null);
    try {
      await countryApi.delete(String(countryToDelete.id));
      setDeleteOpen(false);
      setCountryToDelete(null);
      await refetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'Country could not be deleted.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='countries-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='countries-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Countries & regions
        </Typography>
        <Typography variant='body1' color='text.secondary' sx={{ textAlign: 'left', maxWidth: 560 }}>
          Explore where stays are rooted. Each card opens a country profile with continent context.
        </Typography>
        {canManageCountries && (
          <Button onClick={openAddModal} variant='contained' startIcon={<AddRoundedIcon />} sx={{ mt: 2 }}>
            Add country
          </Button>
        )}
        {!loading && !error && countries.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {countries.length} countr{countries.length === 1 ? 'y' : 'ies'} available
          </Typography>
        )}
      </Box>

      {error && (
        <Alert severity='error' role='alert'>
          {error.message}
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
          <CircularProgress aria-label='Loading countries' />
        </Box>
      )}

      {!loading && !error && countries.length === 0 && (
        <Alert severity='info'>No countries are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && countries.length > 0 && (
        <CountryGrid
          countries={countries}
          onEditCountry={canManageCountries ? openEditModal : undefined}
          onDeleteCountry={canManageCountries ? openDeleteModal : undefined}
        />
      )}
      <AddOrEditCountryModal
        open={addOrEditOpen}
        saving={saving}
        errorMessage={modalErrorMessage}
        initialCountry={countryToEdit}
        onClose={closeAddOrEditModal}
        onSubmit={handleAddOrEdit}
      />
      <DeleteCountryModal
        open={deleteOpen}
        countryName={countryToDelete?.name ?? ''}
        deleting={deleting}
        errorMessage={modalErrorMessage}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

export default CountriesPage;
