import { FontIcon } from '@fluentui/react';
import { UserAccountForm } from 'src/data/services/graphql';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { Column } from 'src/components/layouts';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { renderSelectedGroupsReadOnly } from 'src/pages/Admin/Users/UserAccountFormUtil';

type SummaryWizardBodyType = {
  form: UserAccountForm;
};

export const SummaryWizardBody = ({ form }: SummaryWizardBodyType) => {
  return (
    <WizardBody>
      <FormRow>
        {form.person?.firstNm?.visible && (
          <Column lg={form.person?.lastNm?.visible ? '6' : '12'}>
            <UIInputTextReadOnly id="__userFirstNm_summary" uiField={form.person?.firstNm} />
          </Column>
        )}
        {form.person?.lastNm?.visible && (
          <Column lg={form.person?.firstNm?.visible ? '6' : '12'}>
            <UIInputTextReadOnly id="__userLastNm_summary" uiField={form.person?.lastNm} />
          </Column>
        )}
      </FormRow>
      <FormRow>
        {form.email?.visible && (
          <Column lg="12">
            <UIInputTextReadOnly id="__userEmail_summary" uiField={form.email} />
          </Column>
        )}
      </FormRow>

      <FormRow>
        <Column lg="12">
          <UIInputTextReadOnly id="__userOrg_summary" uiField={form.organization} />
        </Column>
      </FormRow>

      <FormRow>
        <Column lg="12">
          <FormLabel label="Access Granted To" />
          <FieldValue id="__accessGroupsList_summary">{renderSelectedGroupsReadOnly(form)}</FieldValue>
        </Column>
      </FormRow>

      {form.sendActivationEmail?.value === true && (
        <FormRow>
          <Column lg="12">
            <UIFormLabel id="__sendActivation_summary" uiField={form.sendActivationEmail} />
            <FieldValue>
              <FontIcon iconName="CheckMark" />
            </FieldValue>
          </Column>
        </FormRow>
      )}
    </WizardBody>
  );
};
