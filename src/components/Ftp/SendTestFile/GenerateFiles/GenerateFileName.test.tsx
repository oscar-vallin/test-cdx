import { shallow } from 'enzyme';
import { GenerateFileName } from './GenerateFileName';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiStringField } from 'src/data/services/graphql';

const fileNameProps: UiStringField = {
    errCode: null,
    errMsg: null,
    errSeverity: null,
    info: "If not supplied the file will be generated with a name of k2u-test-file.txt",
    inheritedBy: null,
    inheritedFrom: null,
    label: "Test File Name",
    max: 255,
    min: 0,
    readOnly: false,
    required: false,
    value: null,
    visible: true,
};

const defaultProps = {
    fileName: fileNameProps,
    vendorFileName: '',
    setVendorFileName: (data: string) => {},
};

describe('file name input', () => {
    it('Should renders generate file name input', () => {
      const wrapper = mountWithTheme(<GenerateFileName {...defaultProps}/>);

      expect(wrapper.find('input[id="fileName"]')).toHaveLength(1);
      wrapper.find('input[id="fileName"]').simulate('change', { target: { value: 'test-file.txt' } });
    });
});
