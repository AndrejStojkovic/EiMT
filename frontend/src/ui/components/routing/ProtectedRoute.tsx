import { Navigate, Outlet } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import type { Role } from '../../../types/user';

const ProtectedRoute = ({ role }: { role?: Role | null }) => {
    const { user } = useAuth();

    if(user === null) {
        return <Navigate to='/login' replace/>;
    }

    if(role && !user.roles?.includes(role)) {
        return <Navigate to='/login' replace/>;
    }

    return <Outlet />
};

export default ProtectedRoute;
