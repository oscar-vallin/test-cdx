import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Column } from '.';

const defaultProps = {
  id: '__Column',
  variant: 'normal',
  direction: 'column',
  children: <></>,
  center: true,
  right: false,
  top: true,
  bottom: false,
  centerV: 'center',
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Column {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Column Component', () => {
  it('Should renders Column Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Column {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Column with Props', () => {
    const wrapper = shallow(<Column {...defaultProps} />);
    expect(wrapper.prop('id')).toEqual(defaultProps.id);
    expect(wrapper.prop('variant')).toEqual(defaultProps.variant);
    expect(wrapper.prop('direction')).toEqual(defaultProps.direction);
    expect(wrapper.prop('center')).toEqual(defaultProps.center);
    expect(wrapper.prop('right')).toEqual(defaultProps.right);
    expect(wrapper.prop('top')).toEqual(defaultProps.top);
    expect(wrapper.prop('bottom')).toEqual(defaultProps.bottom);
    expect(wrapper.prop('centerV')).toEqual(defaultProps.centerV);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Column {...defaultProps}>
        <div className="children" />
      </Column>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
