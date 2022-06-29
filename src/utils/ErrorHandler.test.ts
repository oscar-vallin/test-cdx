// noinspection JSUnusedGlobalSymbols

import { renderHook } from '@testing-library/react-hooks';
import { mockUseActiveDomainStore } from 'src/utils/mockActiveDomainStore';
import { ErrorHandler } from 'src/utils/ErrorHandler';

jest.mock('src/store/ActiveDomainStore', () => ({
  useActiveDomainStore: mockUseActiveDomainStore,
}));
const mockSetGlobalError = jest.fn();
jest.mock('src/store/SessionStore', () => ({
  useSessionStore: () => ({
    setGlobalError: mockSetGlobalError,
  }),
}));
const mockSetOffline = jest.fn();
jest.mock('src/store/ApplicationStore', () => ({
  useApplicationStore: () => ({
    setIsOffline: mockSetOffline,
  }),
}));
const mockToast = jest.fn();
jest.mock('src/hooks/useNotification', () => ({
  useNotification: () => ({
    error: mockToast,
  }),
}));
const mockDoLogout = jest.fn();
jest.mock('src/use-cases/Authentication', () => ({
  useLogoutUseCase: () => ({
    performUserLogout: mockDoLogout,
  }),
}));
const mockPush = jest.fn();
jest.mock('react-router', () => ({
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe('Global Error Handling', () => {
  it('Simulate Session Timeout', () => {
    const error = {
      networkError: {
        statusCode: 403,
      },
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockDoLogout).toHaveBeenCalled();
    mockDoLogout.mockReset();
  });

  it('Simulate Unauthenticated', () => {
    const error = {
      message: 'Not logged in',
      graphQLErrors: [
        {
          message: 'Uh oh',
          extensions: {
            errorSubType: 'NEED_AUTH',
          },
        },
      ],
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockDoLogout).toHaveBeenCalled();
    expect(mockSetGlobalError).toHaveBeenCalledWith('Not logged in');
    mockDoLogout.mockReset();
    mockSetGlobalError.mockReset();
  });

  it('Simulate Insufficient Privileges', () => {
    const error = {
      message: 'Not Allowed',
      graphQLErrors: [
        {
          message: 'Uh oh',
          extensions: {
            errorSubType: 'INSUFFICIENT_PRIVILEGES',
          },
        },
      ],
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockPush).toHaveBeenCalled();
    mockPush.mockReset();
  });

  it('Simulate Unknown Error', () => {
    const error = {
      message: 'Not Allowed',
      graphQLErrors: [
        {
          message: 'Uh oh',
          extensions: {
            errorSubType: 'Unrecognized Error',
          },
        },
      ],
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockToast).toHaveBeenCalled();
    mockToast.mockReset();
  });

  it('Simulate Another Variety of Unknown Error', () => {
    const error = {
      message: 'Internal error',
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockToast).toHaveBeenCalled();
    mockToast.mockReset();
  });

  it('Simulate Offline', () => {
    const error = {
      message: 'Failed to fetch',
    };

    const view = renderHook(() => ErrorHandler());
    view.result.current(error);

    expect(mockSetOffline).toHaveBeenCalled();
    mockSetOffline.mockReset();
  });
});
