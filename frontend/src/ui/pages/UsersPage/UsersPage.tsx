import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { AxiosError } from 'axios';
import { useRef, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import useUsers from '../../../hooks/user/useUsers';
import type { RegisterResponse } from '../../../types/user';
import userApi from '../../../api/userApi';
import UserGrid from '../../components/users/UserGrid';
import EditUserModal from '../../components/users/modals/EditUserModal';
import DeleteUserModal from '../../components/users/modals/DeleteUserModal';

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message ?? fallback;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallback;
};

const UsersPage = () => {
  const { users, loading, isRefreshing, error, fetch } = useUsers();
  const { user } = useAuth();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<RegisterResponse | null>(null);
  const [userToEdit, setUserToEdit] = useState<RegisterResponse | null>(null);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [actionErrorMessage, setActionErrorMessage] = useState<string | null>(null);
  const [modalErrorMessage, setModalErrorMessage] = useState<string | null>(null);
  const editRequestIdRef = useRef(0);

  const canManageUsers = Boolean(user?.roles?.includes('ROLE_ADMINISTRATOR'));

  const openEditModal = async (user: RegisterResponse) => {
    const requestId = editRequestIdRef.current + 1;
    editRequestIdRef.current = requestId;
    setModalErrorMessage(null);
    setActionErrorMessage(null);
    try {
      const response = await userApi.findByUsername(String(user.username));
      if (requestId !== editRequestIdRef.current) {
        return;
      }
      setUserToEdit({
        username: response.data.username,
        name: response.data.name,
        surname: response.data.surname,
        email: response.data.email,
        role: response.data.role
      });
      setEditOpen(true);
    } catch (err) {
      if (requestId !== editRequestIdRef.current) {
        return;
      }
      setActionErrorMessage(getApiErrorMessage(err, 'Could not load user details for editing.'));
    }
  };

  const closeEditModal = () => {
    if (saving) {
      return;
    }
    editRequestIdRef.current += 1;
    setEditOpen(false);
    setUserToEdit(null);
    setModalErrorMessage(null);
  };

  const handleEdit = async (data: RegisterResponse) => {
    setSaving(true);
    setModalErrorMessage(null);
    try {
      await userApi.edit(data);
      setEditOpen(false);
      setUserToEdit(null);
      await fetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'User could not be saved.'));
    } finally {
      setSaving(false);
    }
  };

  const openDeleteModal = (user: RegisterResponse) => {
    setUserToDelete(user);
    setModalErrorMessage(null);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    if (deleting) {
      return;
    }
    setDeleteOpen(false);
    setUserToDelete(null);
    setModalErrorMessage(null);
  };

  const confirmDelete = async () => {
    if (!userToDelete) {
      return;
    }

    setDeleting(true);
    setModalErrorMessage(null);
    try {
      await userApi.delete(String(userToDelete.username));
      setDeleteOpen(false);
      setUserToDelete(null);
      await fetch();
    } catch (err) {
      setModalErrorMessage(getApiErrorMessage(err, 'User could not be deleted.'));
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Stack spacing={{ xs: 3, md: 4 }} component='section' aria-labelledby='users-heading' sx={{ py: { xs: 1, md: 1.5 } }}>
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
        <Typography id='users-heading' variant='h4' component='h1' sx={{ mb: 1, textAlign: 'left' }}>
          Users
        </Typography>
        {isRefreshing && (
          <Typography variant='body2' sx={{ mt: 1, color: 'text.secondary' }}>
            Refreshing users...
          </Typography>
        )}
        {!loading && !error && users.length > 0 && (
          <Typography variant='body2' sx={{ mt: 1.5, color: 'primary.main', fontWeight: 600 }}>
            {users.length} user(s) available
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
          <CircularProgress aria-label='Loading users' />
        </Box>
      )}

      {!loading && !error && users.length === 0 && (
        <Alert severity='info'>No users are listed yet. Check back soon.</Alert>
      )}

      {!loading && !error && users.length > 0 && (
        <UserGrid
          users={users}
          onEditUser={canManageUsers ? openEditModal : undefined}
          onDeleteUser={canManageUsers ? openDeleteModal : undefined}
        />
      )}
      <EditUserModal
        open={editOpen}
        saving={saving}
        errorMessage={modalErrorMessage}
        initialUser={userToEdit}
        onClose={closeEditModal}
        onSubmit={handleEdit}
      />
      <DeleteUserModal
        open={deleteOpen}
        username={userToDelete?.username ?? ''}
        deleting={deleting}
        errorMessage={modalErrorMessage}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </Stack>
  );
};

export default UsersPage;
