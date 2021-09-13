import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InputDateRange as Component } from './InputDateRange.js';

const defaultProps = {
  startDate: new Date(),
  endDate: new Date(),
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component startDate={new Date()} endDate={new Date()} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Basic InputDate Component', () => {
  it('Should renders InputDate Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
