import { LogMessageItem } from 'src/components/collapses/LogMessageItem';
import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';
import { yyyyMMdda } from 'src/utils/CDXUtils';

const defaultProps = {
  logMessage: {
    severity: 'INFO',
    name: 'Current Directory',
    timeStamp: '2022-03-22T17:28:17.574701Z',
    body: 'File uploaded succesfully',
    attributes: [
      { name: 'server.dir', strValue: '/' },
      { name: 'server.dir', strValue: '/' },
    ],
  },
};

describe('LogMessageItem Testing Unit...', () => {
  const tree = mountWithTheme(<LogMessageItem {...defaultProps}></LogMessageItem>);

  it('Should be defined', () => {
    expect(LogMessageItem).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the timestamp as date', () => {
    const text = tree.find('#log-message-item-date').text();
    expect(text).toEqual(yyyyMMdda(new Date(defaultProps.logMessage.timeStamp)));
  });

  it('Should render same amount of attributes as recieved props when showed', () => {
    tree.find('.ms-Button--icon').at(0).simulate('click');
    expect(tree.find('.label-value').length).toEqual(defaultProps.logMessage.attributes.length);
  });
  it('Test styled LogMessageItem component', () => {
    const testTemp = shallowWithTheme(<LogMessageItem {...defaultProps}></LogMessageItem>).dive();

    expect(testTemp).toMatchSnapshot();
  });
});
