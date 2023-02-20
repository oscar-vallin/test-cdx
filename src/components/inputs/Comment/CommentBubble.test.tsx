import { CommentBubble } from './CommentBubble';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiStringField } from 'src/data/services/graphql';

jest.mock('src/store/ThemeStore/useThemeStore', () => ({
  useThemeStore: () => {
    return {
      userTheme: {
        colors: {
          yellow: '#f2c94c',
          neutralPrimary: '#323130',
          neutralTertiaryAlt: '#c8c6c4',
        },
        radius: {
          large: '16px',
        },
      },
    };
  },
}));

describe('Comment Bubble', () => {

  it('Add new Comment', () => {
    const field: UiStringField = {
      label: 'Comments',
      max: 2000,
      min: 0,
      required: false,
      visible: true,
    };
    const onChange = jest.fn();
    const wrapper = mountWithTheme(
      <CommentBubble
        id="__Comments"
        title="Click here to add a comment"
        uiField={field}
        onChange={onChange}
      />
    );

    expect(wrapper.find('Comment20Filled[id="__Comments_Icon"]')).toHaveLength(1);
    expect(wrapper.find('Callout[id="__Comments_Callout"]')).toHaveLength(0);
    expect(wrapper.find('textarea[id="__Comments_TextField"]')).toHaveLength(0);

    expect(wrapper.find('Comment20Filled[id="__Comments_Icon"]').prop('title')).toEqual('Click here to add a comment');
    wrapper.find('Comment20Filled[id="__Comments_Icon"]').simulate('click');
    wrapper.update();

    expect(wrapper.find('Callout[id="__Comments_Callout"]')).toHaveLength(1);
    expect(wrapper.find('textarea[id="__Comments_TextField"]')).toHaveLength(1);
    wrapper.find('textarea[id="__Comments_TextField"]').simulate('change', { target: { value: 'I added comments' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('Not Visible', () => {
    const field: UiStringField = {
      label: 'Comments',
      max: 2000,
      min: 0,
      required: false,
      visible: false,
    };
    const wrapper = mountWithTheme(
      <CommentBubble
        id="__Comments"
        title="Click here to add a comment"
        uiField={field}
        onChange={jest.fn()}
      />
    );

    console.log(wrapper.debug());

    expect(wrapper.find('Comment20Filled[id="__Comments_Icon"]')).toHaveLength(0);
    expect(wrapper.find('Callout[id="__Comments_Callout"]')).toHaveLength(0);
    expect(wrapper.find('textarea[id="__Comments_TextField"]')).toHaveLength(0);
  });

});
