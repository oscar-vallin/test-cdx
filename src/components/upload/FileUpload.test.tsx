import { FileUpload } from 'src/components/upload/FileUpload';
import { mountWithTheme } from 'src/utils/testUtils';

describe('File Upload Component', () => {
  it('File Upload', () => {
    const onUpload = jest.fn();
    const wrapper = mountWithTheme(<FileUpload id="__FUP" onUpload={onUpload} />);
    expect(wrapper.find('button[id="__FUP_Link"]')).toHaveLength(1);
    expect(wrapper.find('input[id="__FUP_input"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="_SelectedFile"]')).toHaveLength(0);

    // Upload a File
    wrapper.find('input[id="__FUP_input"]').simulate('change', {
      target: {
        validity: {
          valid: true,
        },
        files: [{ name: 'newFile.xml' }],
      },
    });

    expect(onUpload).toHaveBeenCalled();
    expect(wrapper.find('button[id="__FUP_Link"]')).toHaveLength(0);
    expect(wrapper.find('Text[id="__FUP_SelectedFile"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="__FUP_SelectedFile"]').text()).toEqual('newFile.xml');
    expect(wrapper.find('button[id="__FUP_ResetBtn"]')).toHaveLength(1);

    // Reset the file upload
    wrapper.find('button[id="__FUP_ResetBtn"]').simulate('click');
    expect(wrapper.find('button[id="__FUP_Link"]')).toHaveLength(1);
    expect(wrapper.find('Text[id="__FUP_SelectedFile"]')).toHaveLength(0);
  });
});
