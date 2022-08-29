import { FtpTestConvertCSV, ConvertToCSVBinding, quoteFieldBinding, needsQuoteBinding } from './FtpTestConvertCSV';
import { shallow } from 'enzyme';
import { mountWithTheme } from '../../../utils/testUtils';

const messagesMock: any = [
  {
    severity: 'INFO',
    name: 'Current Directory',
    timeStamp: '2022-03-22T17:28:17.574701Z',
    body: 'File uploaded succesfully',
    attributes: [
      { name: 'server.dir', strValue: '/' },
      { name: 'server.dir', strValue: '/' },
    ],
  },
];

const quoteField = quoteFieldBinding();
const needsQuote = needsQuoteBinding();
const ConvertToCSV = ConvertToCSVBinding(needsQuote, quoteField);

describe('Convert to csv', () => {
  global.URL.createObjectURL = jest.fn();
  it('Handle createObjectUrl', () => {
    global.URL.createObjectURL = jest.fn(() => 'details');
    FtpTestConvertCSV(messagesMock);
  });

  it('Download csv', () => {
    const wrapper = mountWithTheme(<FtpTestConvertCSV allMessages={messagesMock} />);

    expect(wrapper.find('button[id="__download_logs"]')).toHaveLength(1);
    expect(wrapper.find("i[data-icon-name='DownloadDocument']")).toHaveLength(1);
    wrapper.find('button[id="__download_logs"]').simulate('click');
    wrapper.find("i[data-icon-name='DownloadDocument']").simulate('click');
  });

  it('Adds quotes in string', () => {
    const input = 'test';
    const expected = '"test"';

    let result = quoteField(input);
    expect(result).toEqual(expected);
  });

  it('Checks if string needs quotes', () => {
    const input = 'test\n';

    let result = needsQuote(input);
    expect(result).toBeTruthy();
  });

  it('Convert to CSV', () => {
    const result = ConvertToCSV(messagesMock[0]);

    expect(result).toMatch(/Timestamp/);
  });

  it('Renders component', () => {
    const wrapper = shallow(<FtpTestConvertCSV allMessages={messagesMock} />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });
});
