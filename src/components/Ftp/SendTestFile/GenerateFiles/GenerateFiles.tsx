import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputText } from 'src/components/inputs/InputText';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';

export const GenerateFiles = ({
  genTestFileForm,
  vendorFileName,
  setVendorFileName,
  textFileContent,
  setTextFileContent,
}) => {
  return (
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
  );
};
