import { useMutation } from '@tanstack/react-query';
import { useAuth } from '../context/AuthContext';

export function useLogin() {
  const { login } = useAuth();
  
  return useMutation({
    mutationFn: ({ email, password }) => login(email, password),
  });
}
