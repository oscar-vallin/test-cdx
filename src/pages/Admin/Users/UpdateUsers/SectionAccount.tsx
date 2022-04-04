import { UIInputText } from 'src/components/inputs/InputText';
import { Column } from 'src/components/layouts';
import { useFormInputValue } from 'src/hooks/useInputValue';
import { useHistory } from 'react-router-dom';

import { FormRow } from 'src/components/layouts/Row/Row.styles';
import { CdxWebCommandType, UserAccount, UserAccountForm } from 'src/data/services/graphql';
import { UIInputTextReadOnly } from 'src/components/inputs/InputText/InputText';
import { WizardBody } from 'src/layouts/Panels/Panels.styles';
import UpdateUserFooter from './UpdateUserFooter';
import { CommandButton } from '@fluentui/react';
import { useOrgSid } from 'src/hooks/useOrgSid';

type SectionAccountProps = {
  form: UserAccountForm;
  onSave: (userAccount: UserAccount) => any;
  onFormChange: () => any;
};

const SectionAccount = ({ form, onSave, onFormChange }: SectionAccountProps) => {
  const formFirstName = useFormInputValue(form.person?.firstNm?.value ?? '');
  const formLastName = useFormInputValue(form.person?.lastNm?.value ?? '');
  const formEmail = useFormInputValue(form.email?.value ?? '');
  const history = useHistory();
  const { orgSid } = useOrgSid();
  const auditCommand = form.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Audit)
  const historyCommand = form.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.History)
  const handleSave = () => {
    const user: UserAccount = {
      sid: '',
      email: formEmail.value,
      person: {
        sid: '',
        firstNm: formFirstName.value,
        lastNm: formLastName.value,
      },
    };
    onSave(user);
  };

  const handleUserAuditLogsClick =()=>{
    history.push(`/user-audit-logs?orgSid=${orgSid}&changedByUserSid=${form.person?.sid}`)
  }
  const handleUserChangeHistoryLogsClick =()=>{
    history.push(`/user-audit-logs?orgSid=${orgSid}&userSid=${form.person?.sid}`)
  }

  return (
    <>
      <WizardBody>
        <FormRow>
          {form.person?.firstNm?.visible && (
            <Column lg={form.person?.lastNm?.visible ? '6' : '12'}>
              <UIInputText
                id="__userFirstNm"
                uiField={form.person?.firstNm}
                value={formFirstName.value}
                onChange={(e) => {
                  onFormChange();
                  formFirstName.onChange(e);
                }}
              />
            </Column>
          )}
          {form.person?.lastNm?.visible && (
            <Column lg={form.person?.firstNm?.visible ? '6' : '12'}>
              <UIInputText
                id="__userLastNm"
                uiField={form.person?.lastNm}
                value={formLastName.value}
                onChange={(e) => {
                  onFormChange();
                  formLastName.onChange(e);
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          {form.email?.visible && (
            <Column lg="12">
              <UIInputText
                id="__userEmail"
                uiField={form.email ?? undefined}
                value={formEmail.value}
                onChange={(e) => {
                  onFormChange();
                  formEmail.onChange(e);
                }}
              />
            </Column>
          )}
        </FormRow>
        <FormRow>
          <Column lg="12">
            <UIInputTextReadOnly id="__userOrg" uiField={form.organization} />
          </Column>
        </FormRow>
        {form.lastLogin ? (
          <FormRow>
            <Column lg="12">
              <UIInputTextReadOnly id="__userLastLogin" uiField={form.lastLogin} />
            </Column>
          </FormRow>
        ) : (
          ''
        )}
        {auditCommand && (
          <FormRow>
            <Column lg="12">
              <CommandButton
                id="__UserAuditLogs-Button"
                iconProps={{ iconName: 'ComplianceAudit' }}
                text={auditCommand.label ?? ''}
                onClick={handleUserAuditLogsClick}
              />
            </Column>
          </FormRow>
        )}
        {historyCommand && (   
          <FormRow>
            <Column lg="12">             
              <CommandButton
                id="__UserChangeHistory-Button"
                iconProps={{ iconName: 'FullHistory' }}
                text={historyCommand.label ?? ''}
                onClick={handleUserChangeHistoryLogsClick}
              />
            </Column>
          </FormRow>
        )}
      </WizardBody>
      {form.commands?.find((cmd) => cmd?.commandType === CdxWebCommandType.Update) && (
        <UpdateUserFooter onSave={handleSave} />
      )}
    </>
  );
};

export { SectionAccount };
export default SectionAccount;
