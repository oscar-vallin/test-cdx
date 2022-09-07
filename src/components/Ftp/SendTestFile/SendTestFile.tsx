import { ChoiceGroup } from '@fluentui/react';
import { UIInputText } from 'src/components/inputs/InputText';
import { Spacing } from 'src/components/spacings/Spacing';

import { TestFileStrategy } from 'src/data/services/graphql';
import { UploadFile } from './UploadFile/UploadFile';
import { CancelTestFile } from './CancelTestFile/CancelTestFile';
import { GenerateTextFileContent, GenerateFileName } from './GenerateFiles';

const SendTestFile = ({
  genTestFileForm,
  testFile,
  setTestFile,
  inputFileRef,
  vendorFileName,
  setVendorFileName,
  textFileContent,
  setTextFileContent,
}) => {
  const handleChooseFile = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;
    if (validity.valid) {
      setTestFile(file);
      setVendorFileName(file.name);
    }
  };
  return (
    <Spacing margin={{ bottom: 'normal' }} padding={{ left: 'normal' }}>
      <Spacing margin={{ bottom: 'normal' }}>
        <ChoiceGroup
          defaultSelectedKey={genTestFileForm?.testFileStrategy?.value?.value}
          options={[
            {
              key: TestFileStrategy.Upload,
              text: '',
              styles: { choiceFieldWrapper: { marginTop: '10px', width: '100%' } },
              // eslint-disable-next-line react/no-unstable-nested-components
              onRenderLabel: (props) => (
                <Spacing margin={{ left: 'double' }}>
                  {testFile ? (
                    <CancelTestFile setTestFile={setTestFile} testFile={testFile} />
                  ) : (
                    <UploadFile props={props} inputFileRef={inputFileRef} />
                  )}
                </Spacing>
              ),
              // eslint-disable-next-line react/no-unstable-nested-components
              onRenderField: (props, render) => (
                <>
                  {render!(props)}
                  <input style={{ display: 'none' }} type="file" ref={inputFileRef} onChange={handleChooseFile} />
                  {props?.checked && genTestFileForm?.fileName?.visible && (
                  <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                    <UIInputText
                      id="fileName"
                      uiField={genTestFileForm?.fileName}
                      value={vendorFileName}
                      onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
                    />
                  </Spacing>
                  )}
                </>
              ),
            },
            {
              key: TestFileStrategy.Generate,
              text: 'Generate a File',
              styles: { choiceFieldWrapper: { marginTop: '10px', width: '100%' } },
              // eslint-disable-next-line react/no-unstable-nested-components
              onRenderField: (props, render) => (
                <>
                  {render!(props)}
                  {props?.checked && (
                  <>
                    {genTestFileForm?.fileName.visible && (
                    <GenerateFileName
                      fileName={genTestFileForm?.fileName}
                      vendorFileName={vendorFileName}
                      setVendorFileName={setVendorFileName}
                    />
                    )}
                    {genTestFileForm?.fileBody?.visible && (
                    <GenerateTextFileContent
                      fileBody={genTestFileForm?.fileBody}
                      textFileContent={textFileContent}
                      setTextFileContent={setTextFileContent}
                    />
                    )}
                  </>
                  )}
                </>
              ),
            },
          ]}
          onChange={() => {
            setVendorFileName('');
            setTestFile(undefined);
          }}
        />
      </Spacing>
    </Spacing>
  );
};

export { SendTestFile };
