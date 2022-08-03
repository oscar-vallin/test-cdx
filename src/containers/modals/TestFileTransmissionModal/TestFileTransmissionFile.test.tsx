import { StoreProvider } from 'easy-peasy';
import { mountWithTheme } from 'src/utils/testUtils';
import store from 'src/store/index';
import { TestFileTransmissionModal } from './TestFileTransmissionModal';

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
            data: {
                xpsftpTest: {
                    includeFileUpload: true,
                    sendTestFile:{visible:true}
                }
            },
            loading: false,
        }
    ],
    useFtpTestMMutation: () => [
        jest.fn(async () => {}),
        {
            data: {}
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

    wrapper.find('button[id="__TestFileTransmission_test_button"]').simulate('click')
    // Close the dialog
    wrapper.find('button[id="__TestFileTransmission_cancel_button"]').simulate('click')
    });
});