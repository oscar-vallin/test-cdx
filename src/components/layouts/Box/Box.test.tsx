import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { StyleConstants } from '../../../data/constants/StyleConstants';
import { Box as Component } from './Box';

const defaultProps = {
  id: 'Box',
  children: <></>,
  direction: StyleConstants.DIRECTION_COLUMN,
  left: false,
  right: false,
  top: false,
  bottom: 'center',
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Component {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Box Component', () => {
  it('Should renders Box Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Component {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Box with Props', () => {
    const wrapper = shallow(<Component {...defaultProps} />);
    expect(wrapper.prop('id')).toEqual(defaultProps.id);
    expect(wrapper.prop('direction')).toEqual(defaultProps.direction);
    expect(wrapper.prop('left')).toEqual(defaultProps.left);
    expect(wrapper.prop('right')).toEqual(defaultProps.right);
    expect(wrapper.prop('top')).toEqual(defaultProps.top);
    expect(wrapper.prop('bottom')).toEqual(defaultProps.bottom);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(<Component {...defaultProps} children={<div className="children" />}></Component>);
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
