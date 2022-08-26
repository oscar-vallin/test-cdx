import { FtpTestConvertCSV, ConvertToCSVBinding, quoteFieldBinding, needsQuoteBinding } from './FtpTestConvertCSV';
import { shallow } from 'enzyme';

const messagesMock = [
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

describe('convert to csv', () => {
  it('adds quotes in string', () => {
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
    const wrapper = shallow(<FtpTestConvertCSV allMessages={messagesMock}/>)

    expect(wrapper.isEmptyRender()).toBe(false);
  })
});
