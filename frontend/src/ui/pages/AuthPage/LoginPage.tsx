import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import { Alert, Button, CircularProgress, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import useLogin from '../../../hooks/user/useLogin';
import type { LoginRequest } from '../../../types/user';
import AuthPageShell from '../../components/auth/AuthPageShell';

const LoginPage = () => {
  const { isLoggedIn } = useAuth();
  const { login, loading, error } = useLogin();
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const handleChange = (key: keyof LoginRequest, value: string) => {
    setCredentials((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(credentials);
  };

  if (isLoggedIn) {
    return <Navigate to='/' replace />;
  }

  return (
    <AuthPageShell
      title='Welcome back'
      subtitle='Sign in to manage your accommodation listings and account settings.'
      footerText='Do not have an account yet?'
      footerLinkLabel='Create one'
      footerLinkTo='/register'
    >
      <Stack component='form' spacing={2} onSubmit={handleSubmit}>
        {error && <Alert severity='error'>{error.message}</Alert>}

        <TextField
          label='Username'
          value={credentials.username}
          onChange={(event) => handleChange('username', event.target.value)}
          required
          autoComplete='username'
          disabled={loading}
        />
        <TextField
          label='Password'
          type='password'
          value={credentials.password}
          onChange={(event) => handleChange('password', event.target.value)}
          required
          autoComplete='current-password'
          disabled={loading}
        />

        <Button type='submit' variant='contained' size='large' startIcon={loading ? <CircularProgress size={16} color='inherit' /> : <LoginRoundedIcon />} disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </Stack>
    </AuthPageShell>
  );
};

export default LoginPage;
