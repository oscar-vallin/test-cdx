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
      data: {},
    },
  ],
  useFtpTestMMutation: () => [
    jest.fn(async () => {}),
    {
      data: {
        ftpTestM: {
          status: 'COMPLETE',
          csvLog: {},
          // allMessages: [{
          //   severity: 'INFO',
          //   name: 'Current Directory',
          //   timeStamp: '2022-03-22T17:28:17.574701Z',
          //   body: 'File uploaded succesfully',
          //   attributes: [
          //     { name: 'server.dir', strValue: '/' },
          //     { name: 'server.dir', strValue: '/' },
          //   ],
          // }],
        },
      },
    },
  ],
}));

describe('Test File Transmission we can do Test', () => {
  it('make test', () => {
    const onOpen = jest.fn();
    const wrapper = mountWithTheme(
      <StoreProvider store={store}>
        <TestFileTransmissionModal isOpen={onOpen} open={true} />
      </StoreProvider>
    );

    expect(wrapper.find('span[id="__Status_result"]').text()).toEqual('COMPLETE');
    //Download logs
    expect(wrapper.find('button[id="__download_logs"]')).toHaveLength(1);
    expect(wrapper.find("i[data-icon-name='DownloadDocument']")).toHaveLength(1);
    wrapper.find('button[id="__download_logs"]').simulate('click');
    wrapper.find("i[data-icon-name='DownloadDocument']").simulate('click');


    
    // Close the dialog
    expect(wrapper.find('button[id="__FtpTest_ok"]')).toHaveLength(1);
    wrapper.find('button[id="__FtpTest_ok"]').simulate('click');
  });
});
