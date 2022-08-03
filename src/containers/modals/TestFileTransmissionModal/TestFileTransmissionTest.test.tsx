import { StoreProvider } from 'easy-peasy';
import { mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store/index';
import { TestFileTransmissionModal } from './TestFileTransmissionModal';
import { WorkStatus } from 'src/data/services/graphql';

jest.mock('src/hooks/useOrgSid', () => ({
    useOrgSid: () => ({
      orgSid: 8,
    }),
}));

jest.mock('src/utils/ErrorHandler', () => ({
    ErrorHandler: () => jest.fn(),
}));

jest.mock('src/data/services/graphql', () => ({
    useXpsftpTestLazyQuery: () => [
        jest.fn(async () => {}),
        {
            data: {}
                
        }
    ],
    useFtpTestMMutation: () => [
        jest.fn(async () => {}),
        {
            data: {
                ftpTestM: {
                    logMessage: {severity: "INFO"}
                }
            }
        }
    ]
}));

describe('Test File Transmission we can do Test', () => {
  it('make test', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <TestFileTransmissionModal  isOpen={onOpen} open={true}/>
      </StoreProvider>
    );

    // Close the dialog
    wrapper.find('button[id="__FtpTest_ok"]').simulate('click');
    
    })
})