import React from 'react';
import { QBadge } from './QualifierBadge.styles';

type QualifierType = {
  filenameQualifier?: string | null;
  coreFilename?: string | null;
  absolute?: boolean;
};

export const QualifierBadge = ({
  filenameQualifier = '',
  coreFilename = '',
  absolute,
}: QualifierType) => {
  let qualifier = filenameQualifier?.replace(`${coreFilename}-`, '') ?? '';
  if (qualifier === '' || qualifier === '${Env}') {
    qualifier = 'ALL'
  }
  let color = 'blue'
  if (qualifier.indexOf('TEST') > -1) {
    color = 'orange';
  }

  return (
    <QBadge color={color} absolute={absolute}>
      {qualifier}
    </QBadge>
  );
};
