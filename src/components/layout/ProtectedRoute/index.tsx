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
    // load dummy user
    dispatch(loadDummyUser());

    // Example of future implementation:
    // if (!isAuthenticated && !loading) {
    //   router.push('/login');
    // }
  }, [dispatch]);

  return <>{children}</>;
};

export default ProtectedRoute; 