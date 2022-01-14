import React from 'react';
import { Text } from 'src/components/typography';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { AppErrorLayout } from 'src/pages/ErrorHandling/AppErrorLayout';

const AccessDenied = () => {
  return (
    <AppErrorLayout id="__AccessDenied">
      <FormRow>
        <Column>
          <Text>You do not have access to the given feature/function</Text>
        </Column>
      </FormRow>
      <FormRow>
        <Column>
          <Text>Please contact your administrator to request access.</Text>
        </Column>
      </FormRow>
    </AppErrorLayout>
  );
};

export { AccessDenied };
