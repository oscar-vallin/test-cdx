import React from 'react';
import { Text } from 'src/components/typography';
import { Column } from 'src/components/layouts';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { AppErrorLayout } from 'src/pages/ErrorHandling/AppErrorLayout';

const PageNotFound = () => (
  <AppErrorLayout id="__PageNotFound">
    <FormRow>
      <Column>
        <Text>The Page you are looking for cannot be found.</Text>
      </Column>
    </FormRow>
    <FormRow>
      <Column>
        <Text>Please contact your administrator of this issue persists.</Text>
      </Column>
    </FormRow>
  </AppErrorLayout>
);

export { PageNotFound };
