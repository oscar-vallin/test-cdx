import { DialogYesNo } from './DialogYesNo';
import { mountWithTheme } from 'src/utils/testUtils';

describe('Dialog Yes/No Container Testing Unit...', () => {
  it('Default Settings', () => {
    const wrapper = mountWithTheme(
      <DialogYesNo id="__TestDlg" open={true} title="Are you sure?" message="Are you sure you want to continue?" />
    );
    expect(wrapper.find('div[id="__TestDlg_title"]').text()).toEqual('Are you sure?');
    expect(wrapper.find('p[id="__TestDlg_subtitle"]').text()).toEqual('Are you sure you want to continue?');
    expect(wrapper.find('button[id="__TestDlg_Yes"]').text()).toEqual('Yes');
    expect(wrapper.find('button[id="__TestDlg_No"]').text()).toEqual('No');

    // Neither button should be highlighted
    expect(wrapper.find('PrimaryButton')).toHaveLength(0);

    // clicking the buttons should not blow up
    wrapper.find('button[id="__TestDlg_Yes"]').simulate('click');
    wrapper.find('button[id="__TestDlg_No"]').simulate('click');
  });

  it('Highlight Yes No, customized labels', () => {
    const onClose = jest.fn();
    const onYes = jest.fn();
    const onNo = jest.fn();

    const wrapper = mountWithTheme(
      <DialogYesNo
        id="__TestDlg"
        open={true}
        title="Are you sure?"
        message="Are you sure you want to continue?"
        onYes={onYes}
        onNo={onNo}
        onClose={onClose}
        highlightNo={true}
        highlightYes={true}
        labelYes="Yup"
        labelNo="Nope"
      />
    );
    expect(wrapper.find('PrimaryButton[id="__TestDlg_Yes"]').text()).toEqual('Yup');
    expect(wrapper.find('PrimaryButton[id="__TestDlg_No"]').text()).toEqual('Nope');

    wrapper.find('PrimaryButton[id="__TestDlg_Yes"]').simulate('click');
    expect(onYes).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();

    wrapper.find('PrimaryButton[id="__TestDlg_No"]').simulate('click');
    expect(onNo).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalledTimes(2);

    wrapper.find('button.ms-Dialog-button--close').simulate('click');
    expect(onClose).toHaveBeenCalledTimes(3);
  });
});
