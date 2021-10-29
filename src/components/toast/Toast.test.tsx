import { mount } from 'enzyme';
import { MessageBarType } from '@fluentui/react';
import { Toast } from './Toast';

const defaultProps = {
  text: 'content',
  type: 'info',
  visible: false,
};

describe('Toast Testing Unit...', () => {
  const tree = mount(<Toast {...defaultProps} />);

  it('Should be defined', () => {
    expect(Toast).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should render the text property', () => {
    expect(tree.props().text).toEqual(defaultProps.text);
  });

  it('Should match the type property', () => {
    expect(tree.props().type).toEqual(defaultProps.type);
  });

  it('Should be hidden by default', () => {
    expect(tree.props().visible).toEqual(false);
  });
});
