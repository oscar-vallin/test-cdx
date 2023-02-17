import { mountWithTheme } from 'src/utils/testUtils';
import { CommentCard } from './CommentCard';

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

describe('Comment Card', () => {
  const textField = 'textarea[id="__Comments_TextField"]';
  const editIcon = 'button[id="__Comments_Edit"]';
  const saveIcon = 'button[id="__Comments_SaveIcon"]';
  const cancelIcon = 'button[id="__Comments_CancelIcon"]';

  it('Editable Comment Card', () => {
    const onSave = jest.fn();
    const wrapper = mountWithTheme(
      <CommentCard id="__Comments" readOnly={false} onSave={onSave} value="Hey Ya"/>
    );

    expect(wrapper.find('TaskCard[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find(textField)).toHaveLength(1);
    expect(wrapper.find(textField).prop('value')).toEqual('Hey Ya');
    expect(wrapper.find(textField).prop('readOnly')).toEqual(true);
    expect(wrapper.find(editIcon)).toHaveLength(1);
    expect(wrapper.find(saveIcon)).toHaveLength(0);
    expect(wrapper.find(cancelIcon)).toHaveLength(0);

    // Edit the comments
    wrapper.find(editIcon).simulate('click');
    wrapper.update();
    expect(wrapper.find(textField).prop('readOnly')).toEqual(false)
    expect(wrapper.find(editIcon)).toHaveLength(0);
    expect(wrapper.find(saveIcon)).toHaveLength(1);
    expect(wrapper.find(cancelIcon)).toHaveLength(1);

    // Update and Cancel
    wrapper.find(textField).simulate('change', { target: { value: 'Sorry Miss Jackson' } });
    wrapper.find(cancelIcon).simulate('click');
    wrapper.update();
    expect(wrapper.find(textField).prop('value')).toEqual('Hey Ya');
    expect(wrapper.find(textField).prop('readOnly')).toEqual(true);
    expect(wrapper.find(editIcon)).toHaveLength(1);
    expect(wrapper.find(saveIcon)).toHaveLength(0);
    expect(wrapper.find(cancelIcon)).toHaveLength(0);

    // Update and Save
    wrapper.find(editIcon).simulate('click');
    wrapper.update();
    expect(wrapper.find(textField).prop('readOnly')).toEqual(false)
    expect(wrapper.find(editIcon)).toHaveLength(0);
    expect(wrapper.find(saveIcon)).toHaveLength(1);
    expect(wrapper.find(cancelIcon)).toHaveLength(1);
    wrapper.find(textField).simulate('change', { target: { value: 'Sorry Miss Jackson' } });
    wrapper.find(saveIcon).simulate('click');
    wrapper.update();
    expect(wrapper.find(textField).prop('value')).toEqual('Sorry Miss Jackson');
    expect(wrapper.find(textField).prop('readOnly')).toEqual(true);
    expect(wrapper.find(editIcon)).toHaveLength(1);
    expect(wrapper.find(saveIcon)).toHaveLength(0);
    expect(wrapper.find(cancelIcon)).toHaveLength(0);

    expect(onSave).toHaveBeenCalled();
  });

  it('Read Only Comment Card', () => {
    const onSave = jest.fn();
    const wrapper = mountWithTheme(
      <CommentCard id="__Comments" readOnly={true} onSave={onSave} value="Players Ball"/>
    );

    console.log(wrapper.debug());
    expect(wrapper.find('TaskCard[id="__Comments"]')).toHaveLength(1);
    expect(wrapper.find(textField)).toHaveLength(1);
    expect(wrapper.find(textField).prop('value')).toEqual('Players Ball');
    expect(wrapper.find(textField).prop('readOnly')).toEqual(true);
    expect(wrapper.find(editIcon)).toHaveLength(0);
    expect(wrapper.find(saveIcon)).toHaveLength(0);
    expect(wrapper.find(cancelIcon)).toHaveLength(0);
  });

});

