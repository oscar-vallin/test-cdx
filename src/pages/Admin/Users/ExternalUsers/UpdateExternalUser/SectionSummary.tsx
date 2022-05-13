import { ReactElement, useEffect, useState } from 'react';
import FormLabel from 'src/components/labels/FormLabel';
import { Column } from 'src/components/layouts';

import { Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { CheckboxItem } from 'src/data/Types';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import UpdateExternalUserFooter from './UpdateExternalUserFooter';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onSubmit: () => any;
  isProcessing?: boolean;
};

const SectionSummary = ({ form, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
  const [groupOptions, setGroupOptions] = useState<CheckboxItem[]>([]);

  const handleSubmit = () => {
    onSubmit();
    return null;
  };

  useEffect(() => {
    if (form) {
      const formOpts: Maybe<UiOption>[] =
        form?.options?.find((itm) => {
          return itm?.key == form?.accessPolicyGroups?.options;
        })?.values ?? [];
      const groupSids = form?.accessPolicyGroups?.value?.map((nvp) => nvp?.value) ?? [];

      const groupOptions: CheckboxItem[] = [];
      formOpts.forEach((opt) => {
        if (opt) {
          if (groupSids.includes(opt.value)) {
            groupOptions.push({
              ...opt,
              checked: true,
            });
          }
        }
      });

      setGroupOptions(groupOptions);
    }

    return () => {
      setGroupOptions([]);
    };
  }, [form]);

  const renderSelectedGroups = () => {
    if (groupOptions.length > 0) {
      return groupOptions.map((opt) => opt.label).join(', ');
    }
    return 'No Access Groups Assigned';
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
            <FieldValue id="__accessGroupsList_summary">{renderSelectedGroups()}</FieldValue>
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