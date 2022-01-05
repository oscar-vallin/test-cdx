import { ReactElement, useEffect, useState } from 'react';
import FormLabel, { UIFormLabel } from 'src/components/labels/FormLabel';
import { Column } from 'src/components/layouts';

import { Maybe, UiOption, UserAccountForm } from 'src/data/services/graphql';
import { CheckboxItem } from 'src/data/Types';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { FontIcon } from '@fluentui/react';
import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { FieldValue } from 'src/components/inputs/InputText/InputText.styles';
import { WizardBody } from './CreateUsersPanel.styles';
import CreateUsersFooter from './CreateUsersFooter';

type SectionSummaryPropsType = {
  form: UserAccountForm;
  onPrev: () => null;
  onSubmit: () => any;
  isProcessing?: boolean;
};

const SectionSummary = ({ form, onPrev, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
  const [groupOptions, setGroupOptions] = useState<CheckboxItem[]>([]);

  const handlePrev = () => {
    onPrev();

    return null;
  };

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
              <UIInputTextReadOnly uiField={form.person?.firstNm} />
            </Column>
          )}
          {form.person?.lastNm?.visible && (
            <Column lg={form.person?.firstNm?.visible ? '6' : '12'}>
              <UIInputTextReadOnly uiField={form.person?.lastNm} />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {form.email?.visible && (
            <Column lg="12">
              <UIInputTextReadOnly uiField={form.email} />
            </Column>
          )}
        </FormRow>

        <FormRow>
          <Column lg="12">
            <UIInputTextReadOnly uiField={form.organization} />
          </Column>
        </FormRow>

        <FormRow>
          <Column lg="12">
            <FormLabel label="Access Granted To" />
            <FieldValue>{renderSelectedGroups()}</FieldValue>
          </Column>
        </FormRow>

        {form.sendActivationEmail?.value == true && (
          <FormRow>
            <Column lg="12">
              <UIFormLabel uiField={form.sendActivationEmail} />
              <FieldValue>
                <FontIcon iconName="CheckMark" />
              </FieldValue>
            </Column>
          </FormRow>
        )}
      </WizardBody>
      {isProcessing && <>Processing</>}
      {!isProcessing && <CreateUsersFooter onPrev={handlePrev} onSubmit={handleSubmit} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
