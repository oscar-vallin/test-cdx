import { useContext } from 'react';
import { UserDomainContext } from '../UserDomainContext';

export const useUserDomain = () => useContext(UserDomainContext);
