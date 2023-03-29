import { useEffect } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useUserStore } from '../../stores/useUserStore';

type Props = {};

const PrivateRoutes = (props: Props) => {
    const user = useUserStore((state) => state.user);

    useEffect(() => {
        if (!user) {
            toast.error('You must be logged in first to access this page.');
        }
    }, [user]);

    return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
