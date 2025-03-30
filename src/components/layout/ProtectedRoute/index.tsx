import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppSelector } from '../../../store';
import { loadDummyUser } from '../../../store/slices/authSlice';
import { useAppDispatch } from '../../../store';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, loading } = useAppSelector(state => state.auth);

  useEffect(() => {
    // For development, load dummy user
    // In production, this would check for a valid token or redirect to login
    dispatch(loadDummyUser());

    // Example of future implementation:
    // if (!isAuthenticated && !loading) {
    //   router.push('/login');
    // }
  }, [dispatch]);

  // For now, we'll always render children since we're using dummy data
  // In the future, this would show a loading state or redirect
  return <>{children}</>;
};

export default ProtectedRoute; 