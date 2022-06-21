import { UserAccountForm } from 'src/data/services/graphql';

export type SectionAccessManagementProps = {
  form?: UserAccountForm;
  onPrev: () => void;
  onNext: () => void;
  saveOptions: (sids: string[]) => void;
};

export type SectionSummaryPropsType = {
  form: UserAccountForm;
  onPrev: () => void;
  onSubmit: () => void;
  isProcessing?: boolean;
};