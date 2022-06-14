import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../utils/firbaseUtils';

export const useGetUser = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u);
    });
  }, [auth.onAuthStateChanged]);
  return user;
};
