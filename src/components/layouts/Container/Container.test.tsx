import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Container as Component } from './Container.js';

const defaultProps = {
  children: null,
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Container Component', () => {
  it('Should renders Container Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Container with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('children')).toEqual(defaultProps.children);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Component {...defaultProps}>
        <div className="children" />
      </Component>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
