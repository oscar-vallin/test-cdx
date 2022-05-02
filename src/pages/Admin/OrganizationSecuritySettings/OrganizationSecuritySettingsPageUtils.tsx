import { UpdateOrgSecurityInput } from 'src/data/services/graphql';

export const DEFAULT_FORM: UpdateOrgSecurityInput = {
  orgSid: '',
  forgotPasswordEnabled: false,
  allowedEmailDomains: '',
  forgotPasswordMsg: '',
};

export const extractFormValues = (defaultValues, form) => {
  const values: any = {};

  Object.keys(defaultValues).forEach((key) => {
    if (typeof form[key] === 'string') {
      values[key] = form[key];
    } else {
      values[key] = form[key]?.value ? form[key]?.value : typeof defaultValues[key] === 'string' ? '' : false;
    }
  });
  return values;
};
