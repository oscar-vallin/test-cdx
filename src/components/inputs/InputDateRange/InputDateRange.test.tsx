import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { InputDateRange } from '.';

const defaultProps = {
  startDate: { value: new Date(), setValue: jest.fn(), onChange: jest.fn() },
  endDate: { value: new Date(), setValue: jest.fn(), onChange: jest.fn() },
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<InputDateRange {...defaultProps} />);
  expect(toJSON(wrapper)).toMatchSnapshot();
});

// describe('Basic InputDate Component', () => {
//   it('Should renders InputDate Component', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<Component {...defaultProps} />, div);
//     ReactDOM.unmountComponentAtNode(div);
//   });
// });
