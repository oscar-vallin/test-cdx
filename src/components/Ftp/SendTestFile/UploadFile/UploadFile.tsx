import React from 'react';
import { ButtonLink } from 'src/components/buttons';

export const UploadFile = ({ props, inputFileRef }) => {
  return (
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
      style={{
        cursor: 'pointer',
      }}
    >
      Upload File...
    </ButtonLink>
  );
};
