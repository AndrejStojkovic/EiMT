import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { Alert, Button, CircularProgress, Grid, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import useRegister from '../../../hooks/user/useRegister';
import type { RegisterRequest } from '../../../types/user';
import AuthPageShell from '../../components/auth/AuthPageShell';

const initialFormState: RegisterRequest = {
  username: '',
  password: '',
  name: '',
  surname: '',
  email: '',
};

const RegisterPage = () => {
  const { isLoggedIn } = useAuth();
  const { register, loading, error } = useRegister();
  const [formData, setFormData] = useState<RegisterRequest>(initialFormState);

  const handleChange = (key: keyof RegisterRequest, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await register(formData);
  };

  if (isLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <AuthPageShell
      title='Create your account'
      subtitle='Join Staybook to track listings, availability, and accommodation updates.'
      footerText='Already have an account?'
      footerLinkLabel='Sign in'
      footerLinkTo='/login'
    >
      <Stack component='form' spacing={2} onSubmit={handleSubmit}>
        {error && <Alert severity='error'>{error.message}</Alert>}

        <Grid container spacing={1.5}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label='First name'
              value={formData.name}
              onChange={(event) => handleChange('name', event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete='given-name'
            />
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <TextField
              label='Last name'
              value={formData.surname}
              onChange={(event) => handleChange('surname', event.target.value)}
              required
              fullWidth
              disabled={loading}
              autoComplete='family-name'
            />
          </Grid>
        </Grid>

        <TextField
          label='Email'
          type='email'
          value={formData.email}
          onChange={(event) => handleChange('email', event.target.value)}
          required
          disabled={loading}
          autoComplete='email'
        />
        <TextField
          label='Username'
          value={formData.username}
          onChange={(event) => handleChange('username', event.target.value)}
          required
          disabled={loading}
          autoComplete='username'
        />
        <TextField
          label='Password'
          type='password'
          value={formData.password}
          onChange={(event) => handleChange('password', event.target.value)}
          required
          disabled={loading}
          autoComplete='new-password'
        />

        <Button
          type='submit'
          variant='contained'
          size='large'
          startIcon={loading ? <CircularProgress size={16} color='inherit' /> : <PersonAddRoundedIcon />}
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
      </Stack>
    </AuthPageShell>
  );
};

export default RegisterPage;
