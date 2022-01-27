import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InputDateRange as Component } from './InputDateRange';

const defaultProps = {
  startDate: { value: new Date() },
  endDate: { value: new Date() },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

// describe('Basic InputDate Component', () => {
//   it('Should renders InputDate Component', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Component {...defaultProps} />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });
