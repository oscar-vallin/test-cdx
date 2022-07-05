import { IconButton, Link } from '@fluentui/react';
import React, { useState } from 'react';
import { StyledSelectedFile } from 'src/pages/Admin/FtpTest/FtpTestPage.styles';
import { Text } from 'src/components/typography';

export type FileUploadType = {
  id: string;
  disabled?: boolean;
  onUpload: (file?: File) => void;
};

export const FileUpload = ({ id, disabled, onUpload }: FileUploadType) => {
  const [fileName, setFileName] = useState<string>();
  const inputFileRef = React.useRef() as React.MutableRefObject<HTMLInputElement>;

  const handleChooseFile = (e) => {
    const {
      target: {
        validity,
        files: [file],
      },
    } = e;
    if (validity.valid) {
      setFileName(file.name);
      onUpload(file);
    }
  };

  const resetFile = () => {
    setFileName(undefined);
    onUpload(undefined);
  };

  const renderLink = () => {
    if (fileName) {
      return (
        <StyledSelectedFile>
          <Text id={`${id}_SelectedFile`} variant="normal">
            {fileName}
          </Text>
          <IconButton id={`${id}_ResetBtn`} iconProps={{ iconName: 'Cancel' }} onClick={resetFile} />
        </StyledSelectedFile>
      );
    }

    return (
      <Link
        id={`${id}_Link`}
        underline
        target="_new"
        onClick={() => {
          inputFileRef.current.value = '';
          inputFileRef.current.click();
        }}
        disabled={disabled}
        title="Upload File"
        style={{ cursor: 'pointer' }}
      >
        Upload File...
      </Link>
    );
  };

  return (
    <>
      {renderLink()}
      <input
        id={`${id}_input`}
        style={{ display: 'none' }}
        type="file"
        ref={inputFileRef}
        onChange={handleChooseFile}
      />
    </>
  );
};
