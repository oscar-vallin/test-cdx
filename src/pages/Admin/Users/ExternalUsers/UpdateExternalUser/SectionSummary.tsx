import { ReactElement } from 'react';
import FormLabel from 'src/components/labels/FormLabel';
import { Column } from 'src/components/layouts';

import { UserAccountForm } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import { renderSelectedGroupsReadOnly } from 'src/pages/Admin/Users/UserAccountFormUtil';
import UpdateExternalUserFooter from './UpdateExternalUserFooter';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onSubmit: () => any;
  isProcessing?: boolean;
};

const SectionSummary = ({ form, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
  const handleSubmit = () => {
    onSubmit();
    return null;
  };

  return (
    <>
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
      </WizardBody>
      {isProcessing && <>Processing...</>}
      {!isProcessing && <UpdateExternalUserFooter onSave={handleSubmit} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
