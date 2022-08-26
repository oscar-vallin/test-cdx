import { FtpTestAllMessages } from './FtpTestAllMessages';
import { shallow } from 'enzyme';

const messagesMock = [{
    severity: 'INFO',
    name: 'Current Directory',
    timeStamp: '2022-03-22T17:28:17.574701Z',
    body: 'File uploaded succesfully',
    attributes: [
      { name: 'server.dir', strValue: '/' },
      { name: 'server.dir', strValue: '/' },
    ],
  }];

const messagesMockEmpty = [];

describe('show all messages', () => {
    it('messages', () => {
        const wrapper = shallow(<FtpTestAllMessages allMessages={messagesMock}/>);

        expect(wrapper.find(messagesMock[0].body)).toBeTruthy();
    });

    it('handle when messages list is empty', () => {
        const wrapper = shallow(<FtpTestAllMessages allMessages={messagesMockEmpty}/>);
       
        expect(wrapper.isEmptyRender()).toBe(false);
    });
});

