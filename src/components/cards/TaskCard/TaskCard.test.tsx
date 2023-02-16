import { FontIcon, IconButton } from '@fluentui/react';
import { mountWithTheme } from 'src/utils/testUtils';
import { TaskCard } from './TaskCard';


jest.mock('src/store/ThemeStore/useThemeStore', () => ({
  useThemeStore: () => {
    return {
      userTheme: {
        colors: {
          neutralPrimary: '#323130',
        },
      },
    };
  },
}));

describe('Task Card', () => {
  it('Title Only', () => {
    const wrapper = mountWithTheme(
      <TaskCard id="__foo" title="Foo"/>
    );
    // console.log(wrapper.debug());

    expect(wrapper.find('Text[id="__foo_Title"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="__foo_Title"]').text()).toEqual('Foo');
    expect(wrapper.find('IconButton[id="__foo_Toggle"]')).toHaveLength(1);
  });

  it('Title with a Link', () => {
    const clickIt = jest.fn();
    const wrapper = mountWithTheme(
      <TaskCard id="__foo" title="Foo" onClickTitle={clickIt}/>
    );
    // console.log(wrapper.debug());

    expect(wrapper.find('ButtonLink[id="__foo_Title"]')).toHaveLength(1);
    expect(wrapper.find('ButtonLink[id="__foo_Title"]').text()).toEqual('Foo');
    wrapper.find('ButtonLink[id="__foo_Title"]').simulate('click');
    expect(clickIt).toHaveBeenCalled();
    expect(wrapper.find('IconButton[id="__foo_Toggle"]')).toHaveLength(1);
  });

  it('Icon and Commands', () => {
    const wrapper = mountWithTheme(
      <TaskCard
        id="__foo"
        title="Foo"
        icon={
          <FontIcon id="__Cal" iconName="Calendar" />
        }
        commands={
          <IconButton id="__Edit" iconProps={{ iconName: "Edit" }}/>
        }
      />
    );
    // console.log(wrapper.debug());

    expect(wrapper.find('Text[id="__foo_Title"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="__foo_Title"]').text()).toEqual('Foo');
    expect(wrapper.find('IconButton[id="__foo_Toggle"]')).toHaveLength(1);
    expect(wrapper.find('FontIcon[id="__Cal"]')).toHaveLength(1);
    expect(wrapper.find('IconButton[id="__Edit"]')).toHaveLength(1);
  });

  it('Expand and Collapse', () => {
    const wrapper = mountWithTheme(
      <TaskCard id="__foo" title="Foo">
        <div id="__TestBody">This is the body of the card</div>
      </TaskCard>
    );
    console.log(wrapper.debug());

    expect(wrapper.find('Text[id="__foo_Title"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="__foo_Title"]').text()).toEqual('Foo');
    expect(wrapper.find('IconButton[id="__foo_Toggle"]')).toHaveLength(1);
    expect(wrapper.find('#__TestBody')).toHaveLength(1);
    expect(wrapper.find('#__TestBody').text()).toEqual('This is the body of the card');
    wrapper.find('IconButton[id="__foo_Toggle"]').simulate('click');
    wrapper.update();
    expect(wrapper.find('#__TestBody')).toHaveLength(0);
  });
});