import { shallow } from 'enzyme';
import { GenerateTextFileContent } from './GenerateTextFileContent';
import { mountWithTheme } from 'src/utils/testUtils';
import { UiStringField } from 'src/data/services/graphql';

const fileBodyProps: UiStringField = {
    errCode: null,
    errMsg: null,
    errSeverity: null,
    info: "If not supplied the file will be generated with a body of Connection Test",
    inheritedBy: null,
    inheritedFrom: null,
    label: "Body of the test file",
    max: 1000,
    min: 0,
    readOnly: false,
    required: false,
    value: null,
    visible: true,
};

const defaultProps = {
    fileBody: fileBodyProps,
    textFileContent: '',
    setTextFileContent: (data: string) => {},
};

describe('text file content input', () => {
    it('Should renders generate text file content input', () => {
      const wrapper = mountWithTheme(<GenerateTextFileContent {...defaultProps}/>);

      expect(wrapper.find('input[id="textFileContent"]')).toHaveLength(1);
      wrapper.find('input[id="textFileContent"]').simulate('change', { target: { value: 'test-file.txt' } });
    });
});
