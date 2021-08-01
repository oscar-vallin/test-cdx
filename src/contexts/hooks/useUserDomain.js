import { useContext, useEffect } from 'react';
import { UserDomainContext } from '../UserDomainContext';
import { useAuthContext } from '../AuthContext';

export const useUserDomain = () => useContext(UserDomainContext);