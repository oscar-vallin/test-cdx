import { ReactElement, useEffect, useState } from 'react';
import FormLabel from 'src/components/labels/FormLabel';
import { Row, Column } from 'src/components/layouts';
import { Spacing } from 'src/components/spacings/Spacing';
import { Text } from 'src/components/typography';

import CreateUsersFooter from './CreateUsersFooter';
import { FormUserType } from './CreateUsersPanel.service';

type SectionSummaryPropsType = {
  form: FormUserType | undefined;
  onPrev: () => null;
  onSubmit: () => null;
};

type SummaryItemType = {
  label: string;
  value: string | undefined;
  row: boolean;
  check?: boolean;
};

const SectionSummary = ({ form, onPrev, onSubmit }: SectionSummaryPropsType): ReactElement => {
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
      const accessOptions: string | undefined = form?.access?.options?.map((item) => item.label).join(', ');
      const authOption = form?.auth?.options ?? [];

      const summary: SummaryItemType[] = [
        { label: firstNm?.label ?? 'First Name', value: firstNm?.value, row: false },
        { label: lastNm?.label ?? 'Last Name', value: lastNm?.value, row: false },
        { label: email?.label ?? 'Username and email Address', value: email?.value, row: true },
        { label: organization?.label ?? 'Primary Organization', value: organization?.description, row: true },
        { label: 'Access Granted to', value: accessOptions, row: true },
        {
          label: 'Activation Email will be sent',
          value: `${authOption[0].checked ?? (false && '1')}`,
          row: true,
          check: true,
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
      {summary?.map((item, index) => (
        <Row key={`itemSummary${index}`} bottom>
          <Column lg="6">
            <FormLabel label={item.label} />
            <Text>{item.value}</Text>
          </Column>
        </Row>
      ))}
      <CreateUsersFooter onPrev={handlePrev} onSubmit={handleSubmit} errorMessage={errorMessage} />
    </>
  );
};

export { SectionSummary };
export default SectionSummary;
