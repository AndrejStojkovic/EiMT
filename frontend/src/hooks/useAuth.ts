import { useContext } from 'react';
import AuthContext, { type AuthContextType } from '../contexts/authContext';

export const useAuth = () => useContext<AuthContextType>(AuthContext);