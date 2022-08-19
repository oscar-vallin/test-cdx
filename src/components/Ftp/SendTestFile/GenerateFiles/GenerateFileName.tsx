import { Spacing } from 'src/components/spacings/Spacing';
import { UIInputText } from 'src/components/inputs/InputText';

const GenerateFileName = ({ fileName, vendorFileName, setVendorFileName }) => {
  return (
    <Spacing margin={{ bottom: 'normal', top: 'normal' }}>
      <UIInputText
        id="fileName"
        uiField={fileName}
        value={vendorFileName}
        onChange={(event, newValue) => setVendorFileName(newValue ?? '')}
      />
    </Spacing>
  );
};

export { GenerateFileName };
