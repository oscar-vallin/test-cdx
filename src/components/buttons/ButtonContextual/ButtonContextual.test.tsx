import { mountWithTheme, shallowWithTheme } from 'src/utils/testUtils';
import { ButtonContextual } from './ButtonContextual';
import { IContextualMenuItem } from '@fluentui/react';

const itemsData: IContextualMenuItem[] = [
  {
    id: '1',
    key: 'ProfileMenu_UserSettings',
    text: 'Settings',
    onClick: jest.fn(),
  },
  { id: '2', key: 'ProfileMenu_Logout', text: 'Logout', onClick: jest.fn() },
];

describe('ButtonContextual', () => {
  const tree = shallowWithTheme(
    <ButtonContextual id="__ButtonContextual" items={itemsData}>
      Button Contextual
    </ButtonContextual>
  );

  it('Should be defined', () => {
    expect(ButtonContextual).toBeDefined();
  });

  it('Should render correctly', () => {
    expect(tree).toMatchSnapshot();
  });

  it('Should have items', () => {
    expect(tree.children().props().items).toEqual(itemsData);
  });

  it('Should renders children', () => {
    expect(tree.children().contains('Button Contextual')).toEqual(true);
  });

  it('Should renders children when passed in', () => {
    const wrapper = shallowWithTheme(
      <ButtonContextual id="" items={[]}>
        <div className="children" />
      </ButtonContextual>
    );
    expect(wrapper.contains(<div className="children" />)).toEqual(true);
  });

  it('Test styled ButtonContextual component', () => {
    const wrapper = shallowWithTheme(
      <ButtonContextual id="" items={[]}>
        <div className="children" />
      </ButtonContextual>
    ).dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('Default props values, Should have a props', () => {
    const defaultTree = shallowWithTheme(<ButtonContextual id={'__ButtonContextual'} items={itemsData} />);
    const mountTree = mountWithTheme(<ButtonContextual id={'__ButtonContextual'} items={itemsData} />);
    expect(defaultTree).toMatchSnapshot();

    expect(defaultTree.children().props().id).toEqual('__ButtonContextual');
    defaultTree.children().simulate('click');
    mountTree.children().simulate('click');
  });
});
