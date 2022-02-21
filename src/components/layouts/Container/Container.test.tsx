import ReactDOM from 'react-dom';
import toJSON from 'enzyme-to-json';
import { shallow } from 'enzyme';
import { Container } from '.';

const defaultProps = {
  id: '__ContainerBox_ID',
  children: <></>,
  direction: 'rigth',
  left: true,
  right: false,
  top: true,
  bottom: 'normal',
};

test('Matches Snapshot', () => {
  const wrapper = shallow(<Container {...defaultProps} />);

  expect(toJSON(wrapper)).toMatchSnapshot();
});

describe('Layout Container Component', () => {
  it('Should renders Container Component', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Container {...defaultProps} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('Should renders Container with Props', () => {
    const wrapper = shallow(<Container {...defaultProps} />);
    expect(wrapper.prop('children')).toEqual(defaultProps.children);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallow(
      <Container {...defaultProps}>
        <div className="children" />
      </Container>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });
});
