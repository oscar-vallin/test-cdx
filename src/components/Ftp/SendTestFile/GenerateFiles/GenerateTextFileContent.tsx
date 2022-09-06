import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputTextArea } from 'src/components/inputs/InputTextArea';

const GenerateTextFileContent = ({ fileBody, textFileContent, setTextFileContent }) => (
  <Spacing margin={{ bottom: 'normal' }}>
    <UIInputTextArea
      id="textFileContent"
      uiField={fileBody}
      value={textFileContent}
      multiline={true}
      onChange={(event, newValue: any) => setTextFileContent(newValue ?? '')}
      placeholder="Put the text you want in the file here, if you leave blank the text 'Connection Test' will be used for the file's contents."
      resizable={false}
      rows={10}
    />
  </Spacing>
);

export { GenerateTextFileContent };
