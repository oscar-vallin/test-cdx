import { useEffect, useState } from 'react';
import { ComboBox, Dialog, DialogFooter, DialogType, IComboBoxOption } from '@fluentui/react';
import { GqOperationResponse, useXchangeFileUploadMutation } from 'src/data/services/graphql';
import { Button } from 'src/components/buttons';
import { ErrorHandler } from 'src/utils/ErrorHandler';
import { useNotification } from 'src/hooks/useNotification';
import { Column } from 'src/components/layouts';
import { FileUpload } from 'src/components/upload';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Spacing } from 'src/components/spacings/Spacing';

type FileUploadDialogType = {
  xchangeConfigSid: string;
  open: boolean;
  onDismiss: () => void;
};

export const FileUploadDialog = ({ xchangeConfigSid, open, onDismiss }: FileUploadDialogType) => {
  const [callUseFileUpload, { data, loading, error }] = useXchangeFileUploadMutation();
  const handleError = ErrorHandler();
  const Toast = useNotification();
  const [qualifier, setQualifier] = useState<string>('TEST');
  const [file, setFile] = useState<File>();

  useEffect(() => {
    handleError(error);
  }, [error]);

  const upload = () => {
    callUseFileUpload({
      variables: {
        xchangeConfigSid,
        qualifier,
        file,
      },
    }).then();
  };

  const hideDialog = () => {
    onDismiss();
  };

  useEffect(() => {
    if (!loading && data) {
      const response = data.xchangeFileUpload?.response;
      if (response === GqOperationResponse.Success) {
        hideDialog();
        Toast.success({ text: 'File Uploaded' });
      } else {
        Toast.error({ text: data.xchangeFileUpload?.errMsg });
      }
    }
  }, [data, loading]);

  const options: IComboBoxOption[] = [
    { key: 'PROD', text: 'PROD' },
    { key: 'PROD-OE', text: 'PROD-OE' },
    { key: 'TEST', text: 'TEST' },
    { key: 'UAT', text: 'UAT' },
  ];

  return (
    <Dialog
      hidden={!open}
      onDismiss={hideDialog}
      dialogContentProps={{
        type: DialogType.normal,
        title: 'Upload a file',
      }}
      modalProps={{ isBlocking: true }}
      minWidth="500px"
    >
      <FormRow>
        <Column lg="12">
          <ComboBox
            id="__FileUploadQualifier"
            label="Qualifier"
            options={options}
            allowFreeform={true}
            defaultValue={qualifier}
            required={true}
            onChange={(evt, newValue) => {
              if (newValue?.text) {
                setQualifier(newValue.text);
              }
            }}
          />
        </Column>
      </FormRow>
      <FormRow>
        <Column lg="12">
          <FileUpload id="__FileUpload" onUpload={setFile} />
        </Column>
      </FormRow>
      <Spacing margin={{ bottom: 'double' }} />
      <DialogFooter>
        <Button
          id="__FileUploadButton"
          onClick={upload}
          text="Upload"
          variant="primary"
          disabled={file === undefined}
        />
        <Button id="__FileUploadCancel" onClick={hideDialog} text="Cancel" />
      </DialogFooter>
    </Dialog>
  );
};
