import { ChoiceGroup, IconButton } from '@fluentui/react';
import { ButtonLink } from 'src/components/buttons';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';
import { TestFileStrategy } from 'src/data/services/graphql';
import { StyledSelectedFile } from 'src/pages/Admin/FtpTest/FtpTestPage.styles';

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
              onRenderLabel: (props) => {
                return (
                  <Spacing margin={{ left: 'double' }}>
                    {testFile ? (
                      <StyledSelectedFile>
                        <Text variant="normal">{testFile.name}</Text>
                        <IconButton iconProps={{ iconName: 'Cancel' }} onClick={() => setTestFile(undefined)} />
                      </StyledSelectedFile>
                    ) : (
                      <ButtonLink
                        id="__Upload_File"
                        underline
                        target="_new"
                        onClick={() => {
                          inputFileRef.current.value = '';
                          inputFileRef.current.click();
                        }}
                        disabled={!props?.checked}
                        title="Upload File"
                        style={{ cursor: 'pointer' }}
                      >
                        Upload File...
                      </ButtonLink>
                    )}
                  </Spacing>
                );
              },
              // eslint-disable-next-line react/no-unstable-nested-components
              onRenderField: (props, render) => {
                return (
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
                );
              },
            },
            {
              key: TestFileStrategy.Generate,
              text: 'Generate a File',
              styles: { choiceFieldWrapper: { marginTop: '10px', width: '100%' } },
              // eslint-disable-next-line react/no-unstable-nested-components
              onRenderField: (props, render) => {
                return (
                  <>
                    {render!(props)}
                    {props?.checked && (
                      <>
                        {genTestFileForm?.fileName?.visible && (
                          <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
                            <UIInputText
                              id="fileName"
                              uiField={genTestFileForm?.fileName}
                              value={vendorFileName}
                              onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
                            />
                          </Spacing>
                        )}
                        {genTestFileForm?.fileBody?.visible && (
                          <Spacing margin={{ bottom: 'normal' }}>
                            <UIInputTextArea
                              id="textFileContent"
                              uiField={genTestFileForm?.fileBody}
                              value={textFileContent}
                              multiline={true}
                              onChange={(event, newValue: any) => setTextFileContent(newValue ?? '')}
                              placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
                              resizable={false}
                              rows={10}
                            />
                          </Spacing>
                        )}
                      </>
                    )}
                  </>
                );
              },
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
