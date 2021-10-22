import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Row as Component } from './Row';

const defaultProps = {
  id: '__Row',
  variant: 'normal',
  children: null,
  center: 'center',
  right: 'center',
  top: 'center',
  bottom: 'center',
  between: 'center',
  evenly: 'center',
  around: 'center',
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Row Component', () => {
  it('Should renders Row Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Row with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('children')).toEqual(defaultProps.children);
    expect(wrapper.prop('variant')).toEqual(defaultProps.variant);
    expect(wrapper.prop('center')).toEqual(defaultProps.center);
    expect(wrapper.prop('right')).toEqual(defaultProps.right);
    expect(wrapper.prop('top')).toEqual(defaultProps.top);
    expect(wrapper.prop('bottom')).toEqual(defaultProps.bottom);
    expect(wrapper.prop('between')).toEqual(defaultProps.between);
    expect(wrapper.prop('evenly')).toEqual(defaultProps.evenly);
    expect(wrapper.prop('around')).toEqual(defaultProps.around);
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
