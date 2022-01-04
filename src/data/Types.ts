import { UiOption } from './services/graphql';

export type CheckboxItem = UiOption & {
  checked: boolean;
};
