import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Row } from '.';

const defaultProps = {
  id: '__Row',
  variant: 'normal',
  children: <></>,
  center: true,
  right: false,
  top: true,
  bottom: false,
  between: 'center',
  evenly: 'center',
  around: false,
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Row {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Row Component', () => {
  it('Should renders Row Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Row {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Row with Props', () => {
    const wrapper = shallow(<Row {...defaultProps} />);
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
      <Row {...defaultProps}>
        <div className="children" />
      </Row>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
