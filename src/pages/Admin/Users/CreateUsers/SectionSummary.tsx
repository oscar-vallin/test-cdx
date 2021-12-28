import { Icon } from '@fluentui/react/lib-commonjs/Icon';
import { ReactElement, useEffect, useState } from 'react';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';
import { StyledText } from './CreateUsersPanel.styles';

type SectionSummaryPropsType = {
  form: FormUserType | undefined;
  onPrev: () => null;
  onSubmit: () => any;
  isProcessing?: boolean;
};

type SummaryItemType = {
  id: string;
  label: string;
  value: string | undefined;
  row: boolean;
  check?: boolean;
};

const SectionSummary = ({ form, onPrev, onSubmit, isProcessing }: SectionSummaryPropsType): ReactElement => {
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [summary, setSummary] = useState<SummaryItemType[] | undefined>([]);

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
      const firstNm = form?.account?.fields.find(({ id }) => id === 'firstNm');
      const lastNm = form?.account?.fields.find(({ id }) => id === 'lastNm');
      const email = form?.account?.fields.find(({ id }) => id === 'email');
      const organization = form?.account?.title;
      const accessOptions: string | undefined = form?.access?.options
        ?.filter(({ checked }) => checked)
        .map((item) => item.label)
        .join(', ');

      const authOption = form?.auth?.options ?? [];

      const summary: SummaryItemType[] = [
        { id: 'firstNm', label: firstNm?.label ?? 'First Name', value: firstNm?.value, row: false },
        { id: 'lastNm', label: lastNm?.label ?? 'Last Name', value: lastNm?.value, row: false },
        { id: 'email', label: email?.label ?? 'Username and email Address', value: email?.value, row: true },
        {
          id: 'organization',
          label: organization?.label ?? 'Primary Organization',
          value: organization?.description,
          row: true,
        },
        { id: 'access', label: 'Access Granted to', value: accessOptions ?? 'No Access Granted.', row: true },
        {
          id: 'auth',
          label: 'Activation Email will be sent upon creation of this User.',
          value: `${authOption[0].checked ?? (false && '1')}`,
          row: true,
          check: authOption[0].checked ?? false,
        },
      ];
      setSummary(summary);
    }

    return () => {
      setSummary([]);
    };
  }, [form]);

  return (
    <>
      <Spacing margin={{ top: 'normal' }} />

      {summary?.map((item) => (
        <Column>
          <Row key={`itemSummary${item.label}`}>
            {item.id === 'auth' && item.check && (
              <>
                <Icon iconName="CheckMark" className="icon-check" color="green" />
                <StyledText>{item.label}</StyledText>
              </>
            )}
            {item.id !== 'auth' && (
              <>
                <FormLabel label={item.label} />
                <StyledText>{item.value}</StyledText>
              </>
            )}
          </Row>
        </Column>
      ))}
      {isProcessing && <>Processing</>}
      {!isProcessing && <CreateUsersFooter onPrev={handlePrev} onSubmit={handleSubmit} errorMessage={errorMessage} />}
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
