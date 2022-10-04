/* eslint-disable react-hooks/exhaustive-deps */
import {
  ReactElement, useEffect, createContext, ReactNode,
} from 'react';
import { useHistory } from 'react-router';

import { URL_ROUTES } from 'src/data/constants/RouteConstants';
import { useActiveDomainStore } from '../store/ActiveDomainStore';
import { useSessionStore } from '../store/SessionStore';

export const ActiveDomainContext = createContext(() => null);

const defaultProps = {
  // children: '',
};

type ActiveDomainContextProviderProps = {
  children?: ReactNode | ReactElement | string | any;
} & typeof defaultProps;

export const ActiveDomainContextProvider = (
  { children }: ActiveDomainContextProviderProps,
): ReactElement => {
  const history = useHistory();
  const SessionStore = useSessionStore();
  const ActiveDomainStore = useActiveDomainStore();

  useEffect(() => {
    const { destination } = ActiveDomainStore.domainOrg.current;
    if (SessionStore.redirectUrl) {
      history.push(SessionStore.redirectUrl);
      SessionStore.setRedirectUrl(null);
    } else if (destination) {
      ActiveDomainStore.setCurrentOrg({ destination: null });
      history.push(`${URL_ROUTES[destination]}?orgSid=${ActiveDomainStore.domainOrg.current.orgSid}`);
    }
  }, [ActiveDomainStore.domainOrg.current.destination]);

  return <ActiveDomainContext.Provider value={children}>{children}</ActiveDomainContext.Provider>;
};

ActiveDomainContextProvider.defaultProps = defaultProps;
