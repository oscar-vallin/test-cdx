import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: any;
};





export type AccessPolicy = {
  __typename?: 'AccessPolicy';
  sid?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Permission>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
};

export type AccessPolicyConnection = {
  __typename?: 'AccessPolicyConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<AccessPolicy>>;
};

export type AccessPolicyForm = {
  __typename?: 'AccessPolicyForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  organization: UiReadOnlyField;
  permissions?: Maybe<UiSelectManyField>;
  tmpl?: Maybe<UiBooleanField>;
  tmplUseAsIs?: Maybe<UiBooleanField>;
  applicableOrgTypes?: Maybe<UiSelectManyField>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type AccessPolicyGroup = {
  __typename?: 'AccessPolicyGroup';
  sid?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
  policies?: Maybe<Array<AccessPolicy>>;
};

export type AccessPolicyGroupConnection = {
  __typename?: 'AccessPolicyGroupConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<AccessPolicyGroup>>;
};

export type AccessPolicyGroupForm = {
  __typename?: 'AccessPolicyGroupForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  description: UiStringField;
  organization: UiReadOnlyField;
  tmpl?: Maybe<UiBooleanField>;
  tmplUseAsIs?: Maybe<UiBooleanField>;
  applicableOrgTypes?: Maybe<UiSelectManyField>;
  policies?: Maybe<UiSelectManyField>;
  specializations?: Maybe<UiSelectManyField>;
  /** Apply policies and specializations of this group to all sub organizations to the Primary Organization */
  includeAllSubOrgs?: Maybe<UiBooleanField>;
  includeOrgSids?: Maybe<UiSelectManyField>;
  excludeOrgSids?: Maybe<UiSelectManyField>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type AccessSpecialization = {
  __typename?: 'AccessSpecialization';
  sid: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<SpecializationFilter>>;
};

export type AccessSpecializationConnection = {
  __typename?: 'AccessSpecializationConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<AccessSpecialization>>;
};

export type AccessSpecializationForm = {
  __typename?: 'AccessSpecializationForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  organization: UiReadOnlyField;
  filters?: Maybe<Array<SpecializationFilterForm>>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export enum ActiveEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  All = 'ALL'
}

export enum AlertType {
  All = 'ALL',
  AllFailures = 'ALL_FAILURES',
  AccountStructureIssue = 'ACCOUNT_STRUCTURE_ISSUE',
  CodeListIssue = 'CODE_LIST_ISSUE',
  CompanionReport = 'COMPANION_REPORT',
  DailySummaryReport = 'DAILY_SUMMARY_REPORT',
  QualityCheckFailure = 'QUALITY_CHECK_FAILURE',
  Success = 'SUCCESS',
  SystemFailure = 'SYSTEM_FAILURE',
  TechMigrationFailure = 'TECH_MIGRATION_FAILURE',
  UserReportableFailure = 'USER_REPORTABLE_FAILURE'
}

export type ArchiveFileType = {
  __typename?: 'ArchiveFileType';
  value: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export enum CdxWebAppDomain {
  Dashboard = 'DASHBOARD',
  Organization = 'ORGANIZATION'
}

export enum CdxWebCommandType {
  PageAdd = 'PAGE_ADD',
  PageUpdate = 'PAGE_UPDATE',
  Deactivate = 'DEACTIVATE',
  Activate = 'ACTIVATE',
  Add = 'ADD',
  Update = 'UPDATE',
  Delete = 'DELETE',
  Create = 'CREATE',
  Assign = 'ASSIGN',
  Reset = 'RESET',
  Audit = 'AUDIT',
  History = 'HISTORY'
}

export enum CdxWebPage {
  Dashboard = 'DASHBOARD',
  FileStatus = 'FILE_STATUS',
  Archives = 'ARCHIVES',
  Schedule = 'SCHEDULE',
  Transmissions = 'TRANSMISSIONS',
  Errors = 'ERRORS',
  OrgActivity = 'ORG_ACTIVITY',
  ActiveOrgs = 'ACTIVE_ORGS',
  ExternalOrgs = 'EXTERNAL_ORGS',
  ActiveUsers = 'ACTIVE_USERS',
  ExternalUsers = 'EXTERNAL_USERS',
  UserAuditLogs = 'USER_AUDIT_LOGS',
  DeletedUsers = 'DELETED_USERS',
  AmGroups = 'AM_GROUPS',
  AmPolicies = 'AM_POLICIES',
  AmSpecialization = 'AM_SPECIALIZATION',
  FtpTest = 'FTP_TEST',
  ImplDeploy = 'IMPL_DEPLOY',
  SecuritySettings = 'SECURITY_SETTINGS',
  PasswordRules = 'PASSWORD_RULES',
  SsoConfig = 'SSO_CONFIG',
  XchangeList = 'XCHANGE_LIST',
  XchangeAlerts = 'XCHANGE_ALERTS',
  XchangeNaming = 'XCHANGE_NAMING',
  AddOrg = 'ADD_ORG',
  AddUser = 'ADD_USER',
  ColorPalettes = 'COLOR_PALETTES',
  Theme = 'THEME'
}

export enum CdxWebPivot {
  Activity = 'ACTIVITY',
  InProgress = 'IN_PROGRESS'
}

export enum ChangeReason {
  Internal = 'INTERNAL',
  External = 'EXTERNAL'
}

export type CompositePasswordRuleSet = {
  __typename?: 'CompositePasswordRuleSet';
  enabled?: Maybe<Scalars['Boolean']>;
  minPasswordComplexity?: Maybe<PasswordComplexity>;
  requiredNumPassingRules?: Maybe<Scalars['Int']>;
  mustNotContainWhiteSpace?: Maybe<Scalars['Boolean']>;
  mustNotContainUserName?: Maybe<Scalars['Boolean']>;
  mustNotContainNumericSequence?: Maybe<Scalars['Boolean']>;
  mustFollowLengthRequirements?: Maybe<Scalars['Boolean']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  mustContainUpperCaseLetters?: Maybe<Scalars['Boolean']>;
  minUpperCaseLetters?: Maybe<Scalars['Int']>;
  mustContainLowerCaseLetters?: Maybe<Scalars['Boolean']>;
  minLowerCaseLetters?: Maybe<Scalars['Int']>;
  mustContainNumericDigits?: Maybe<Scalars['Boolean']>;
  minNumericDigits?: Maybe<Scalars['Int']>;
  mustContainSpecialCharacters?: Maybe<Scalars['Boolean']>;
  minSpecialCharacters?: Maybe<Scalars['Int']>;
  mustNotRepeatCharacters?: Maybe<Scalars['Boolean']>;
  maxAllowedRepeatedChars?: Maybe<Scalars['Int']>;
  mustNotReusePasswords?: Maybe<Scalars['Boolean']>;
  minPasswordHistoryVariations?: Maybe<Scalars['Int']>;
  mustNotMatchExactDictionaryWord?: Maybe<Scalars['Boolean']>;
  mustNotMatchPartialDictionaryWord?: Maybe<Scalars['Boolean']>;
};

export type CompositePasswordRuleSetForm = PasswordRuleSet & {
  __typename?: 'CompositePasswordRuleSetForm';
  enabled?: Maybe<UiBooleanField>;
  minPasswordComplexity?: Maybe<UiSelectOneField>;
  requiredNumPassingRules?: Maybe<UiIntField>;
  mustNotContainWhiteSpace?: Maybe<UiBooleanField>;
  mustNotContainUserName?: Maybe<UiBooleanField>;
  mustNotContainNumericSequence?: Maybe<UiBooleanField>;
  mustFollowLengthRequirements?: Maybe<UiBooleanField>;
  minLength?: Maybe<UiIntField>;
  maxLength?: Maybe<UiIntField>;
  mustContainUpperCaseLetters?: Maybe<UiBooleanField>;
  minUpperCaseLetters?: Maybe<UiIntField>;
  mustContainLowerCaseLetters?: Maybe<UiBooleanField>;
  minLowerCaseLetters?: Maybe<UiIntField>;
  mustContainNumericDigits?: Maybe<UiBooleanField>;
  minNumericDigits?: Maybe<UiIntField>;
  mustContainSpecialCharacters?: Maybe<UiBooleanField>;
  minSpecialCharacters?: Maybe<UiIntField>;
  mustNotRepeatCharacters?: Maybe<UiBooleanField>;
  maxAllowedRepeatedChars?: Maybe<UiIntField>;
  mustNotReusePasswords?: Maybe<UiBooleanField>;
  minPasswordHistoryVariations?: Maybe<UiIntField>;
  mustNotMatchExactDictionaryWord?: Maybe<UiBooleanField>;
  mustNotMatchPartialDictionaryWord?: Maybe<UiBooleanField>;
};

export type CompositePasswordRuleSetInput = {
  enabled?: Maybe<Scalars['Boolean']>;
  minPasswordComplexity?: Maybe<PasswordComplexity>;
  requiredNumPassingRules?: Maybe<Scalars['Int']>;
  mustNotContainWhiteSpace?: Maybe<Scalars['Boolean']>;
  mustNotContainUserName?: Maybe<Scalars['Boolean']>;
  mustNotContainNumericSequence?: Maybe<Scalars['Boolean']>;
  mustFollowLengthRequirements?: Maybe<Scalars['Boolean']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  mustContainUpperCaseLetters?: Maybe<Scalars['Boolean']>;
  minUpperCaseLetters?: Maybe<Scalars['Int']>;
  mustContainLowerCaseLetters?: Maybe<Scalars['Boolean']>;
  minLowerCaseLetters?: Maybe<Scalars['Int']>;
  mustContainNumericDigits?: Maybe<Scalars['Boolean']>;
  minNumericDigits?: Maybe<Scalars['Int']>;
  mustContainSpecialCharacters?: Maybe<Scalars['Boolean']>;
  minSpecialCharacters?: Maybe<Scalars['Int']>;
  mustNotRepeatCharacters?: Maybe<Scalars['Boolean']>;
  maxAllowedRepeatedChars?: Maybe<Scalars['Int']>;
  mustNotReusePasswords?: Maybe<Scalars['Boolean']>;
  minPasswordHistoryVariations?: Maybe<Scalars['Int']>;
  mustNotMatchExactDictionaryWord?: Maybe<Scalars['Boolean']>;
  mustNotMatchPartialDictionaryWord?: Maybe<Scalars['Boolean']>;
};

export type CreateAccessPolicyGroupInput = {
  orgSid: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
  policySids?: Maybe<Array<Scalars['ID']>>;
  specializationSids?: Maybe<Array<Scalars['ID']>>;
  includeAllSubOrgs?: Maybe<Scalars['Boolean']>;
  includeOrgSids?: Maybe<Array<Scalars['ID']>>;
  excludeOrgSids?: Maybe<Array<Scalars['ID']>>;
};

export type CreateAccessPolicyInput = {
  name: Scalars['String'];
  orgSid: Scalars['ID'];
  permissions?: Maybe<Array<Permission>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
};

export type CreateAccessSpecializationInput = {
  orgSid: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<CreateSpecializationFilterInput>>;
};

export type CreateDashThemeColorInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  defaultPalette?: Maybe<Scalars['Boolean']>;
  allowDark?: Maybe<Scalars['Boolean']>;
  themeColorMode?: Maybe<ThemeColorMode>;
  paletteNm?: Maybe<Scalars['String']>;
  themePrimary?: Maybe<Scalars['String']>;
  themeLighterAlt?: Maybe<Scalars['String']>;
  themeLighter?: Maybe<Scalars['String']>;
  themeLight?: Maybe<Scalars['String']>;
  themeTertiary?: Maybe<Scalars['String']>;
  themeSecondary?: Maybe<Scalars['String']>;
  themeDarkAlt?: Maybe<Scalars['String']>;
  themeDark?: Maybe<Scalars['String']>;
  themeDarker?: Maybe<Scalars['String']>;
  neutralLighterAlt?: Maybe<Scalars['String']>;
  neutralLighter?: Maybe<Scalars['String']>;
  neutralLight?: Maybe<Scalars['String']>;
  neutralQuaternaryAlt?: Maybe<Scalars['String']>;
  neutralQuaternary?: Maybe<Scalars['String']>;
  neutralTertiaryAlt?: Maybe<Scalars['String']>;
  neutralTertiary?: Maybe<Scalars['String']>;
  neutralSecondary?: Maybe<Scalars['String']>;
  neutralPrimaryAlt?: Maybe<Scalars['String']>;
  neutralPrimary?: Maybe<Scalars['String']>;
  neutralDark?: Maybe<Scalars['String']>;
  black?: Maybe<Scalars['String']>;
  white?: Maybe<Scalars['String']>;
};

export type CreateDefaultDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type CreateOrgInput = {
  orgId: Scalars['String'];
  name: Scalars['String'];
  orgType: OrgType;
  orgOwnerSid?: Maybe<Scalars['ID']>;
  whitelist?: Maybe<Array<Scalars['String']>>;
};

export type CreatePersonInput = {
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type CreateSpecializationFilterInput = {
  permission: Permission;
  orgSids?: Maybe<Array<Scalars['ID']>>;
};

export type CreateUserDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  orgSid: Scalars['ID'];
  /** Indicates that an email should be sent to the user with an activation link. */
  sendActivationEmail?: Maybe<Scalars['Boolean']>;
  accessPolicyGroupSids?: Maybe<Array<Scalars['ID']>>;
};

export type CreateXchangeStepInput = {
  xchangeFileProcessSid: Scalars['ID'];
  xml: Scalars['String'];
};

export type CurrentUserInfo = {
  __typename?: 'CurrentUserInfo';
  domain?: Maybe<WebAppDomain>;
  tokenUser?: Maybe<TokenUser>;
  loggedIn?: Maybe<Scalars['Boolean']>;
};

export type DashSite = {
  __typename?: 'DashSite';
  id?: Maybe<Scalars['ID']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DashTheme = {
  __typename?: 'DashTheme';
  id?: Maybe<Scalars['ID']>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeFontSize?: Maybe<ThemeFontSize>;
  dashThemeColor?: Maybe<DashThemeColor>;
};

export type DashThemeColor = {
  __typename?: 'DashThemeColor';
  id?: Maybe<Scalars['ID']>;
  defaultPalette?: Maybe<Scalars['Boolean']>;
  themeColorMode?: Maybe<ThemeColorMode>;
  allowDark?: Maybe<Scalars['Boolean']>;
  paletteNm?: Maybe<Scalars['String']>;
  themePrimary?: Maybe<Scalars['String']>;
  themeLighterAlt?: Maybe<Scalars['String']>;
  themeLighter?: Maybe<Scalars['String']>;
  themeLight?: Maybe<Scalars['String']>;
  themeTertiary?: Maybe<Scalars['String']>;
  themeSecondary?: Maybe<Scalars['String']>;
  themeDarkAlt?: Maybe<Scalars['String']>;
  themeDark?: Maybe<Scalars['String']>;
  themeDarker?: Maybe<Scalars['String']>;
  neutralLighterAlt?: Maybe<Scalars['String']>;
  neutralLighter?: Maybe<Scalars['String']>;
  neutralLight?: Maybe<Scalars['String']>;
  neutralQuaternaryAlt?: Maybe<Scalars['String']>;
  neutralQuaternary?: Maybe<Scalars['String']>;
  neutralTertiaryAlt?: Maybe<Scalars['String']>;
  neutralTertiary?: Maybe<Scalars['String']>;
  neutralSecondary?: Maybe<Scalars['String']>;
  neutralPrimaryAlt?: Maybe<Scalars['String']>;
  neutralPrimary?: Maybe<Scalars['String']>;
  neutralDark?: Maybe<Scalars['String']>;
  black?: Maybe<Scalars['String']>;
  white?: Maybe<Scalars['String']>;
};

export type DashThemeColorConnection = {
  __typename?: 'DashThemeColorConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<DashThemeColor>>;
};

export type DashThemeColorDefaultInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  defaultPalette: Scalars['Boolean'];
  themeColorMode?: Maybe<ThemeColorMode>;
};

export type DashThemeInput = {
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type DashboardPeriodCount = {
  __typename?: 'DashboardPeriodCount';
  name?: Maybe<Scalars['String']>;
  secondaryDescr?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type DashboardPeriodCounts = {
  __typename?: 'DashboardPeriodCounts';
  vendorTransmissions?: Maybe<Array<DashboardPeriodCount>>;
  vendorTransmissionsBySpec?: Maybe<Array<DashboardPeriodCount>>;
  planSponsorTransmissions?: Maybe<Array<DashboardPeriodCount>>;
  fileTransmissions?: Maybe<Array<DashboardPeriodCount>>;
  vendorProcessErrors?: Maybe<Array<DashboardPeriodCount>>;
  planSponsorProcessErrors?: Maybe<Array<DashboardPeriodCount>>;
  fileProcessErrors?: Maybe<Array<DashboardPeriodCount>>;
  showCountsByPlanSponsor?: Maybe<Scalars['Boolean']>;
  showCountsByFile?: Maybe<Scalars['Boolean']>;
  transmissionCount?: Maybe<Scalars['Int']>;
  billingUnitCount?: Maybe<Scalars['Int']>;
  processErrorCount?: Maybe<Scalars['Int']>;
};

export type DashboardPeriods = {
  __typename?: 'DashboardPeriods';
  dailyCounts?: Maybe<DashboardPeriodCounts>;
  yesterdayCounts?: Maybe<DashboardPeriodCounts>;
  monthlyCounts?: Maybe<DashboardPeriodCounts>;
  lastMonthlyCounts?: Maybe<DashboardPeriodCounts>;
};



export type DateTimeRangeInput = {
  rangeStart: Scalars['DateTime'];
  rangeEnd: Scalars['DateTime'];
};

export type DefaultDashThemePage = {
  __typename?: 'DefaultDashThemePage';
  themeColorModes?: Maybe<Array<ThemeColorMode>>;
  themeFontSizes?: Maybe<Array<ThemeFontSize>>;
  themeColorPalettes?: Maybe<Array<DashThemeColor>>;
};

export type DeleteAccessPoliciesInput = {
  policySids: Array<Scalars['ID']>;
};

export type DeliveredFile = {
  __typename?: 'DeliveredFile';
  filename: Scalars['String'];
  fileSizeInBytes?: Maybe<Scalars['Int']>;
  textSizeInBytes?: Maybe<Scalars['Int']>;
  timeDelivered?: Maybe<Scalars['DateTime']>;
  ftp?: Maybe<DeliveredFileFtp>;
  kcurl?: Maybe<DeliveredKcurl>;
};

export type DeliveredFileFtp = {
  __typename?: 'DeliveredFileFTP';
  protocol: Scalars['String'];
  host: Scalars['String'];
  username?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  port?: Maybe<Scalars['Int']>;
};

export type DeliveredKcurl = {
  __typename?: 'DeliveredKCURL';
  url: Scalars['String'];
};

/** Connects two Xchange components in a diagram together with a line and an arrow */
export type DiagramConnector = {
  __typename?: 'DiagramConnector';
  fromKey: Scalars['String'];
  toKey: Scalars['String'];
};

export type DiagramCoordinates = {
  __typename?: 'DiagramCoordinates';
  x: Scalars['Int'];
  y: Scalars['Int'];
};

export type DomainNavInput = {
  orgSid: Scalars['ID'];
  ownerId?: Maybe<Scalars['ID']>;
  appDomain: CdxWebAppDomain;
  selectedPage?: Maybe<CdxWebPage>;
};

export type EnrollmentStat = {
  __typename?: 'EnrollmentStat';
  insuredStat?: Maybe<InsuredStat>;
  excludedInsuredStat?: Maybe<InsuredStat>;
  excludedPlanInsuredStat?: Maybe<Array<PlanInsuredStat>>;
  planInsuredStat?: Maybe<Array<PlanInsuredStat>>;
};

export enum Environment {
  K2U = 'K2U',
  Test = 'TEST',
  Uat = 'UAT',
  Prod = 'PROD',
  All = 'ALL'
}

export enum ErrorSeverity {
  Error = 'ERROR',
  Warning = 'WARNING',
  Info = 'INFO'
}

export type ExtractParameter = {
  __typename?: 'ExtractParameter';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Scalars['String']>>;
};

export type ExtractParameters = {
  __typename?: 'ExtractParameters';
  originalParameter?: Maybe<Array<ExtractParameter>>;
  overriddenParameter?: Maybe<Array<ExtractParameter>>;
  derivedParameter?: Maybe<Array<ExtractParameter>>;
};

export type FieldCreationEvent = {
  __typename?: 'FieldCreationEvent';
  message?: Maybe<Array<Scalars['String']>>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  rawValue?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type ForgotPasswordResponse = {
  __typename?: 'ForgotPasswordResponse';
  response: GqOperationResponse;
  responseMsg: Scalars['String'];
};

export enum GqOperationResponse {
  Success = 'SUCCESS',
  Fail = 'FAIL',
  PartialSuccess = 'PARTIAL_SUCCESS'
}

export type GenericResponse = {
  __typename?: 'GenericResponse';
  response?: Maybe<GqOperationResponse>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
  allMessages?: Maybe<Array<LogMessage>>;
};

export type GrantExternalUserInput = {
  orgSid: Scalars['ID'];
  userAccountSid: Scalars['ID'];
  accessPolicyGroupSids?: Maybe<Array<Scalars['ID']>>;
};

export type ImplementationDeployResponse = {
  __typename?: 'ImplementationDeployResponse';
  response: GqOperationResponse;
  timestamp: Scalars['DateTime'];
  references?: Maybe<Array<Scalars['String']>>;
  changes?: Maybe<Array<Scalars['String']>>;
};

export type InsuredStat = {
  __typename?: 'InsuredStat';
  subscribers?: Maybe<InsuredStatCount>;
  dependents?: Maybe<InsuredStatCount>;
};

export type InsuredStatCount = {
  __typename?: 'InsuredStatCount';
  active?: Maybe<StatInt>;
  ended?: Maybe<StatInt>;
  expectedTotal?: Maybe<Scalars['Int']>;
  inTolerance?: Maybe<Scalars['Boolean']>;
  toleranceMsg?: Maybe<Scalars['String']>;
  hold?: Maybe<Scalars['Boolean']>;
};

export type ListPageInfo = {
  __typename?: 'ListPageInfo';
  pageHeaderLabel?: Maybe<Scalars['String']>;
  secondaryHeaderLabel?: Maybe<Scalars['String']>;
  pageCommands?: Maybe<Array<WebCommand>>;
  listItemCommands?: Maybe<Array<WebCommand>>;
  listItemBulkCommands?: Maybe<Array<WebCommand>>;
};

export enum LogLevel {
  Trace = 'TRACE',
  Debug = 'DEBUG',
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Fatal = 'FATAL'
}

export type LogMessage = {
  __typename?: 'LogMessage';
  timeStamp: Scalars['DateTime'];
  severity: LogLevel;
  name: Scalars['String'];
  body?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Nvp>>;
};

export type LogOutInfo = {
  __typename?: 'LogOutInfo';
  successful: Scalars['Boolean'];
};

export type LoginStep = {
  __typename?: 'LoginStep';
  userId: Scalars['String'];
  step: LoginStepType;
  redirectPath?: Maybe<Scalars['String']>;
  /** this is the domain/section of the website to continue to if the login is complete */
  loginCompleteDomain?: Maybe<WebAppDomain>;
  tokenUser?: Maybe<TokenUser>;
  forgotPasswordEnabled: Scalars['Boolean'];
  forgotPasswordMsg?: Maybe<Scalars['String']>;
};

export enum LoginStepType {
  Username = 'USERNAME',
  Password = 'PASSWORD',
  Complete = 'COMPLETE'
}

export type Mutation = {
  __typename?: 'Mutation';
  beginLogin?: Maybe<LoginStep>;
  passwordLogin?: Maybe<LoginStep>;
  logOut?: Maybe<LogOutInfo>;
  forgotPassword?: Maybe<ForgotPasswordResponse>;
  /** Update your own password.  This is based on the current session of the logged in user. */
  updateOwnPassword?: Maybe<UserSession>;
  /** Initiate a password reset for a user, by creating an account activation link for the user to reset their password with. */
  resetPassword?: Maybe<GqOperationResponse>;
  /** Update a user's password given a password reset token which was emailed to the user. */
  updatePassword?: Maybe<GenericResponse>;
  createOrg?: Maybe<OrganizationForm>;
  updateOrg?: Maybe<OrganizationForm>;
  deactivateOrg?: Maybe<GqOperationResponse>;
  updateOrgSecurity?: Maybe<OrgSecurityForm>;
  createAccessPolicy?: Maybe<AccessPolicyForm>;
  updateAccessPolicy?: Maybe<AccessPolicyForm>;
  deleteAccessPolicies?: Maybe<GqOperationResponse>;
  deleteAccessPolicy?: Maybe<GqOperationResponse>;
  createAccessSpecialization?: Maybe<AccessSpecializationForm>;
  updateAccessSpecialization?: Maybe<AccessSpecializationForm>;
  deleteAccessSpecialization?: Maybe<GqOperationResponse>;
  createAccessPolicyGroup?: Maybe<AccessPolicyGroupForm>;
  updateAccessPolicyGroup?: Maybe<AccessPolicyGroupForm>;
  deleteAccessPolicyGroup?: Maybe<GqOperationResponse>;
  createUser?: Maybe<UserAccountForm>;
  updateUser?: Maybe<UserAccountForm>;
  updateUserAccessPolicyGroups?: Maybe<UserAccountForm>;
  deactivateUser?: Maybe<GqOperationResponse>;
  deactivateUsers?: Maybe<GqOperationResponse>;
  activateUser?: Maybe<GqOperationResponse>;
  activateUsers?: Maybe<GqOperationResponse>;
  grantExternalUserAccess?: Maybe<UserAccountForm>;
  createExternalUser?: Maybe<UserAccountForm>;
  revokeExternalUserAccess?: Maybe<GenericResponse>;
  createDashThemeColor?: Maybe<DashThemeColor>;
  updateDashThemeColor?: Maybe<DashThemeColor>;
  createDefaultDashTheme?: Maybe<DashTheme>;
  updateDefaultDashTheme?: Maybe<DashTheme>;
  removeDashThemeColor?: Maybe<GqOperationResponse>;
  removeDefaultDashTheme?: Maybe<GqOperationResponse>;
  setDashThemeColorDefault?: Maybe<DashThemeColor>;
  /**
   * setDashThemeColorMode(dashThemeColorModeInput : DashThemeColorModeInput) : DashThemeColor
   * createUserDashTheme(createUserDashThemeInput : CreateUserDashThemeInput) : DashTheme
   * updateUserDashTheme(updateUserDashThemeInput : UpdateUserDashThemeInput ) : DashTheme
   *
   * updateOwnDashTheme(dashThemeInput : DashThemeInput ) : DashTheme
   */
  createOrUpdateOwnDashTheme?: Maybe<DashTheme>;
  setOwnDashThemeFontSize?: Maybe<DashTheme>;
  updatePasswordRules?: Maybe<PasswordRulesForm>;
  implementationDeploy?: Maybe<ImplementationDeployResponse>;
  ftpTestM?: Maybe<SftpConfigSubscriptionResponse>;
  workPacketRerunStep?: Maybe<GenericResponse>;
  workPacketDelete?: Maybe<GenericResponse>;
  workPacketContinue?: Maybe<GenericResponse>;
  workPacketCancel?: Maybe<GenericResponse>;
  workPacketReprocess?: Maybe<ReprocessResponse>;
  workPacketRenameAndReprocess?: Maybe<ReprocessResponse>;
  workPacketResend?: Maybe<GenericResponse>;
  /** Convert an Xchange profile from the 1.0 XML File version to being managed in the CDX Dashboard */
  convertXchangeProfile?: Maybe<XchangeProfile>;
  updateXchangeProfileComment?: Maybe<GenericResponse>;
  publishXchangeProfile?: Maybe<GenericResponse>;
  createXchangeStep?: Maybe<XchangeStepForm>;
  updateXchangeStep?: Maybe<XchangeStepForm>;
  copyXchangeStep?: Maybe<XchangeFileProcessForm>;
};


export type MutationBeginLoginArgs = {
  userId: Scalars['String'];
};


export type MutationPasswordLoginArgs = {
  userId: Scalars['String'];
  password: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  userId: Scalars['String'];
};


export type MutationUpdateOwnPasswordArgs = {
  updateOwnPasswordInput: UpdateOwnPasswordInput;
};


export type MutationResetPasswordArgs = {
  userSid: Scalars['ID'];
};


export type MutationUpdatePasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};


export type MutationCreateOrgArgs = {
  orgInfo: CreateOrgInput;
};


export type MutationUpdateOrgArgs = {
  orgInfo: UpdateOrgInput;
};


export type MutationDeactivateOrgArgs = {
  orgSid: Scalars['ID'];
};


export type MutationUpdateOrgSecurityArgs = {
  orgSecurityInfo: UpdateOrgSecurityInput;
};


export type MutationCreateAccessPolicyArgs = {
  createAccessPolicyInput: CreateAccessPolicyInput;
};


export type MutationUpdateAccessPolicyArgs = {
  updateAccessPolicyInput?: Maybe<UpdateAccessPolicyInput>;
};


export type MutationDeleteAccessPoliciesArgs = {
  deleteAccessPoliciesInput?: Maybe<DeleteAccessPoliciesInput>;
};


export type MutationDeleteAccessPolicyArgs = {
  policySid: Scalars['ID'];
};


export type MutationCreateAccessSpecializationArgs = {
  createAccessSpecializationInput: CreateAccessSpecializationInput;
};


export type MutationUpdateAccessSpecializationArgs = {
  updateAccessSpecializationInput?: Maybe<UpdateAccessSpecializationInput>;
};


export type MutationDeleteAccessSpecializationArgs = {
  specializationSid: Scalars['ID'];
};


export type MutationCreateAccessPolicyGroupArgs = {
  createAccessPolicyGroupInput: CreateAccessPolicyGroupInput;
};


export type MutationUpdateAccessPolicyGroupArgs = {
  updateAccessPolicyGroupInput?: Maybe<UpdateAccessPolicyGroupInput>;
};


export type MutationDeleteAccessPolicyGroupArgs = {
  policyGroupSid: Scalars['ID'];
};


export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
};


export type MutationUpdateUserArgs = {
  userInfo: UpdateUserInput;
};


export type MutationUpdateUserAccessPolicyGroupsArgs = {
  userAccessPolicyGroupUpdate?: Maybe<UpdateUserAccessPolicyGroupsInput>;
};


export type MutationDeactivateUserArgs = {
  sidInput: SidInput;
};


export type MutationDeactivateUsersArgs = {
  sidsInput: SidsInput;
};


export type MutationActivateUserArgs = {
  sidInput: SidInput;
};


export type MutationActivateUsersArgs = {
  sidsInput: SidsInput;
};


export type MutationGrantExternalUserAccessArgs = {
  userInfo: GrantExternalUserInput;
};


export type MutationCreateExternalUserArgs = {
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
};


export type MutationRevokeExternalUserAccessArgs = {
  orgSid: Scalars['ID'];
  userAccountSid: Scalars['ID'];
};


export type MutationCreateDashThemeColorArgs = {
  createDashThemeColorInput: CreateDashThemeColorInput;
};


export type MutationUpdateDashThemeColorArgs = {
  updateDashThemeColorInput: UpdateDashThemeColorInput;
};


export type MutationCreateDefaultDashThemeArgs = {
  createDefaultDashThemeInput?: Maybe<CreateDefaultDashThemeInput>;
};


export type MutationUpdateDefaultDashThemeArgs = {
  updateDefaultDashThemeInput?: Maybe<UpdateDefaultDashThemeInput>;
};


export type MutationRemoveDashThemeColorArgs = {
  ownedInputSid?: Maybe<OwnedInputSid>;
};


export type MutationRemoveDefaultDashThemeArgs = {
  ownedInputSid?: Maybe<OwnedInputSid>;
};


export type MutationSetDashThemeColorDefaultArgs = {
  dashThemeColorDefaultInput?: Maybe<DashThemeColorDefaultInput>;
};


export type MutationCreateOrUpdateOwnDashThemeArgs = {
  dashThemeInput?: Maybe<DashThemeInput>;
};


export type MutationSetOwnDashThemeFontSizeArgs = {
  dashThemeInput?: Maybe<DashThemeInput>;
};


export type MutationUpdatePasswordRulesArgs = {
  passwordRulesInput?: Maybe<PasswordRulesInput>;
};


export type MutationFtpTestMArgs = {
  xpsftp: XsftpInput;
  sendTestFile?: Maybe<SftpTestSendTestFile>;
  testFile?: Maybe<Scalars['Upload']>;
};


export type MutationWorkPacketRerunStepArgs = {
  workOrderId: Scalars['String'];
  stepName: Scalars['String'];
  changeReason?: Maybe<ChangeReason>;
};


export type MutationWorkPacketDeleteArgs = {
  workOrderId: Scalars['String'];
};


export type MutationWorkPacketContinueArgs = {
  workOrderId: Scalars['String'];
};


export type MutationWorkPacketCancelArgs = {
  workOrderId: Scalars['String'];
};


export type MutationWorkPacketReprocessArgs = {
  workOrderId: Scalars['String'];
  changeReason?: Maybe<ChangeReason>;
};


export type MutationWorkPacketRenameAndReprocessArgs = {
  workOrderId: Scalars['String'];
  newFileName: Scalars['String'];
};


export type MutationWorkPacketResendArgs = {
  workOrderId: Scalars['String'];
};


export type MutationConvertXchangeProfileArgs = {
  orgSid: Scalars['ID'];
};


export type MutationUpdateXchangeProfileCommentArgs = {
  orgSid: Scalars['ID'];
  comment: Scalars['String'];
};


export type MutationPublishXchangeProfileArgs = {
  orgSid: Scalars['ID'];
};


export type MutationCreateXchangeStepArgs = {
  stepInput?: Maybe<CreateXchangeStepInput>;
};


export type MutationUpdateXchangeStepArgs = {
  stepInput?: Maybe<UpdateXchangeStepInput>;
};


export type MutationCopyXchangeStepArgs = {
  xchangeFileProcessSid: Scalars['ID'];
  sid: Scalars['ID'];
};

export type Nvp = NvpStr | NvpId;

export type NvpId = {
  __typename?: 'NVPId';
  name: Scalars['String'];
  value: Scalars['ID'];
};

export type NvpStr = {
  __typename?: 'NVPStr';
  name: Scalars['String'];
  value: Scalars['String'];
};

export enum NullHandling {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export type OrgFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
  /** Search for users regardless of Organization. Only valid for CDX Users when in the context of the CDX Organization. */
  searchAllOrgs?: Maybe<Scalars['Boolean']>;
};

export type OrgSecurityForm = {
  __typename?: 'OrgSecurityForm';
  orgSid?: Maybe<Scalars['ID']>;
  forgotPasswordEnabled: UiBooleanField;
  forgotPasswordMsg: UiStringField;
  allowedEmailDomains: UiStringField;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type OrgSidInput = {
  orgSid: Scalars['ID'];
};

export enum OrgType {
  IntegrationSponsor = 'INTEGRATION_SPONSOR',
  IntegrationAdminSegregated = 'INTEGRATION_ADMIN_SEGREGATED',
  IntegrationPlatform = 'INTEGRATION_PLATFORM',
  IntegrationAdminCombined = 'INTEGRATION_ADMIN_COMBINED',
  Vendor = 'VENDOR',
  SystemIntegrator = 'SYSTEM_INTEGRATOR',
  IndependentConsultant = 'INDEPENDENT_CONSULTANT',
  Cdx = 'CDX',
  Template = 'TEMPLATE',
  OutsidePromoter = 'OUTSIDE_PROMOTER',
  SalesProspect = 'SALES_PROSPECT',
  GlobalVendor = 'GLOBAL_VENDOR'
}

export type OrgWhitelistForm = {
  __typename?: 'OrgWhitelistForm';
  pattern: UiStringField;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type Organization = {
  __typename?: 'Organization';
  sid?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orgId: Scalars['String'];
  orgType: OrgType;
  orgTypeLabel: Scalars['String'];
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<Organization>>;
};

export type OrganizationForm = {
  __typename?: 'OrganizationForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  orgId: UiStringField;
  orgType?: Maybe<UiSelectOneField>;
  active: UiBooleanField;
  whitelist?: Maybe<Array<OrgWhitelistForm>>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type OrganizationLink = {
  __typename?: 'OrganizationLink';
  id: Scalars['ID'];
  orgId: Scalars['String'];
  name: Scalars['String'];
  type?: Maybe<CdxWebPage>;
  activityTime?: Maybe<Scalars['DateTime']>;
};

export type OrganizationLinkConnection = {
  __typename?: 'OrganizationLinkConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<OrganizationLink>>;
};

export type OwnedInput = {
  orgSid: Scalars['ID'];
  ownerId?: Maybe<Scalars['ID']>;
};

export type OwnedInputName = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  name: Scalars['String'];
};

export type OwnedInputSid = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
};

export type PageableInput = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<SortOrderInput>>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  totalPages?: Maybe<Scalars['Int']>;
  totalElements?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export enum PasswordComplexity {
  Any = 'ANY',
  Weak = 'WEAK',
  Fair = 'FAIR',
  Good = 'GOOD',
  Strong = 'STRONG',
  VeryStrong = 'VERY_STRONG'
}

/**
 * input DashThemeColorModeInput{
 * orgSid: ID!
 * ownerId: ID!
 * sid: ID!
 * themeColorMode: ThemeColorMode!
 * }
 */
export type PasswordResetTokenResponse = {
  __typename?: 'PasswordResetTokenResponse';
  orgSid?: Maybe<Scalars['ID']>;
  userSid?: Maybe<Scalars['ID']>;
  response?: Maybe<GqOperationResponse>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type PasswordRuleSet = {
  mustNotContainWhiteSpace?: Maybe<UiBooleanField>;
  mustNotContainUserName?: Maybe<UiBooleanField>;
  mustNotContainNumericSequence?: Maybe<UiBooleanField>;
  mustFollowLengthRequirements?: Maybe<UiBooleanField>;
  minLength?: Maybe<UiIntField>;
  maxLength?: Maybe<UiIntField>;
  mustContainUpperCaseLetters?: Maybe<UiBooleanField>;
  minUpperCaseLetters?: Maybe<UiIntField>;
  mustContainLowerCaseLetters?: Maybe<UiBooleanField>;
  minLowerCaseLetters?: Maybe<UiIntField>;
  mustContainNumericDigits?: Maybe<UiBooleanField>;
  minNumericDigits?: Maybe<UiIntField>;
  mustContainSpecialCharacters?: Maybe<UiBooleanField>;
  minSpecialCharacters?: Maybe<UiIntField>;
  mustNotRepeatCharacters?: Maybe<UiBooleanField>;
  maxAllowedRepeatedChars?: Maybe<UiIntField>;
  mustNotReusePasswords?: Maybe<UiBooleanField>;
  minPasswordHistoryVariations?: Maybe<UiIntField>;
  mustNotMatchExactDictionaryWord?: Maybe<UiBooleanField>;
  mustNotMatchPartialDictionaryWord?: Maybe<UiBooleanField>;
};

export type PasswordRules = {
  __typename?: 'PasswordRules';
  orgSid: Scalars['ID'];
  mustAlwaysBeMet?: Maybe<RequiredPasswordRuleSet>;
  someMustBeMet?: Maybe<CompositePasswordRuleSet>;
  autoLockAccount?: Maybe<Scalars['Boolean']>;
  autoLockAfterFailedAttempts?: Maybe<Scalars['Int']>;
  autoUnlockAccount?: Maybe<Scalars['Boolean']>;
  autoUnlockAccountDelayMinutes?: Maybe<Scalars['Int']>;
};

export type PasswordRulesForm = {
  __typename?: 'PasswordRulesForm';
  organization: UiReadOnlyField;
  mustAlwaysBeMet?: Maybe<RequiredPasswordRuleSetForm>;
  someMustBeMet?: Maybe<CompositePasswordRuleSetForm>;
  autoLockAccount?: Maybe<UiBooleanField>;
  autoLockAfterFailedAttempts?: Maybe<UiIntField>;
  autoUnlockAccount?: Maybe<UiBooleanField>;
  autoUnlockAccountDelayMinutes?: Maybe<UiIntField>;
  response: GqOperationResponse;
  options?: Maybe<Array<UiOptions>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type PasswordRulesInput = {
  orgSid: Scalars['ID'];
  mustAlwaysBeMet?: Maybe<RequiredPasswordRuleSetInput>;
  someMustBeMet?: Maybe<CompositePasswordRuleSetInput>;
  autoLockAccount?: Maybe<Scalars['Boolean']>;
  autoLockAfterFailedAttempts?: Maybe<Scalars['Int']>;
  autoUnlockAccount?: Maybe<Scalars['Boolean']>;
  autoUnlockAccountDelayMinutes?: Maybe<Scalars['Int']>;
};

export type PasswordValidation = {
  __typename?: 'PasswordValidation';
  passes: Scalars['Boolean'];
  mustAlwaysBeMet?: Maybe<PasswordValidationGroup>;
  passwordStrength?: Maybe<PasswordValidationStrengthRule>;
  someMustBeMet?: Maybe<PasswordValidationGroup>;
};

export type PasswordValidationGroup = {
  __typename?: 'PasswordValidationGroup';
  enabled: Scalars['Boolean'];
  requiredNumPassingRules?: Maybe<Scalars['Int']>;
  passes: Scalars['Boolean'];
  rules: Array<PasswordValidationRule>;
};

export type PasswordValidationRule = {
  __typename?: 'PasswordValidationRule';
  passes: Scalars['Boolean'];
  label: Scalars['String'];
};

export type PasswordValidationStrengthRule = {
  __typename?: 'PasswordValidationStrengthRule';
  passes: Scalars['Boolean'];
  minPasswordComplexity: PasswordComplexity;
};

export enum Permission {
  K2UExchangeList = 'K2U_EXCHANGE_LIST',
  K2UExchangeRead = 'K2U_EXCHANGE_READ',
  K2UExchangeUpdate = 'K2U_EXCHANGE_UPDATE',
  K2UExchangeExecute = 'K2U_EXCHANGE_EXECUTE',
  K2UExchangeCancel = 'K2U_EXCHANGE_CANCEL',
  K2UExchangeArchiveRead = 'K2U_EXCHANGE_ARCHIVE_READ',
  K2UExchangeArchiveStepsRead = 'K2U_EXCHANGE_ARCHIVE_STEPS_READ',
  K2UExchangeDelete = 'K2U_EXCHANGE_DELETE',
  TestExchangeList = 'TEST_EXCHANGE_LIST',
  TestExchangeRead = 'TEST_EXCHANGE_READ',
  TestExchangeUpdate = 'TEST_EXCHANGE_UPDATE',
  TestExchangeExecute = 'TEST_EXCHANGE_EXECUTE',
  TestExchangeCancel = 'TEST_EXCHANGE_CANCEL',
  TestExchangeArchiveRead = 'TEST_EXCHANGE_ARCHIVE_READ',
  TestExchangeArchiveStepsRead = 'TEST_EXCHANGE_ARCHIVE_STEPS_READ',
  TestExchangeDelete = 'TEST_EXCHANGE_DELETE',
  UatExchangeList = 'UAT_EXCHANGE_LIST',
  UatExchangeRead = 'UAT_EXCHANGE_READ',
  UatExchangeUpdate = 'UAT_EXCHANGE_UPDATE',
  UatExchangeExecute = 'UAT_EXCHANGE_EXECUTE',
  UatExchangeCancel = 'UAT_EXCHANGE_CANCEL',
  UatExchangeArchiveRead = 'UAT_EXCHANGE_ARCHIVE_READ',
  UatExchangeArchiveStepsRead = 'UAT_EXCHANGE_ARCHIVE_STEPS_READ',
  UatExchangeDelete = 'UAT_EXCHANGE_DELETE',
  ProdExchangeList = 'PROD_EXCHANGE_LIST',
  ProdExchangeRead = 'PROD_EXCHANGE_READ',
  ProdExchangeUpdate = 'PROD_EXCHANGE_UPDATE',
  ProdExchangeExecute = 'PROD_EXCHANGE_EXECUTE',
  ProdExchangeCancel = 'PROD_EXCHANGE_CANCEL',
  ProdExchangeArchiveRead = 'PROD_EXCHANGE_ARCHIVE_READ',
  ProdExchangeArchiveStepsRead = 'PROD_EXCHANGE_ARCHIVE_STEPS_READ',
  ProdExchangeDelete = 'PROD_EXCHANGE_DELETE',
  XchangeProfileRead = 'XCHANGE_PROFILE_READ',
  XchangeProfileCreate = 'XCHANGE_PROFILE_CREATE',
  XchangeProfileUpdate = 'XCHANGE_PROFILE_UPDATE',
  XchangeProfileDelete = 'XCHANGE_PROFILE_DELETE',
  XchangeProfilePublish = 'XCHANGE_PROFILE_PUBLISH',
  UserCreate = 'USER_CREATE',
  UserRead = 'USER_READ',
  UserUpdate = 'USER_UPDATE',
  UserDelete = 'USER_DELETE',
  UserAssign = 'USER_ASSIGN',
  UserAudit = 'USER_AUDIT',
  AccessPolicyCreate = 'ACCESS_POLICY_CREATE',
  AccessPolicyRead = 'ACCESS_POLICY_READ',
  AccessPolicyUpdate = 'ACCESS_POLICY_UPDATE',
  AccessPolicyDelete = 'ACCESS_POLICY_DELETE',
  AccessSpecCreate = 'ACCESS_SPEC_CREATE',
  AccessSpecRead = 'ACCESS_SPEC_READ',
  AccessSpecUpdate = 'ACCESS_SPEC_UPDATE',
  AccessSpecDelete = 'ACCESS_SPEC_DELETE',
  AccessPolicyGroupCreate = 'ACCESS_POLICY_GROUP_CREATE',
  AccessPolicyGroupRead = 'ACCESS_POLICY_GROUP_READ',
  AccessPolicyGroupUpdate = 'ACCESS_POLICY_GROUP_UPDATE',
  AccessPolicyGroupDelete = 'ACCESS_POLICY_GROUP_DELETE',
  OrgCreate = 'ORG_CREATE',
  OrgRead = 'ORG_READ',
  OrgUpdate = 'ORG_UPDATE',
  OrgDelete = 'ORG_DELETE',
  OrgSecurityRead = 'ORG_SECURITY_READ',
  OrgSecurityUpdate = 'ORG_SECURITY_UPDATE',
  PasswordRulesUpdate = 'PASSWORD_RULES_UPDATE',
  SsoidpCreate = 'SSOIDP_CREATE',
  SsoidpRead = 'SSOIDP_READ',
  SsoidpUpdate = 'SSOIDP_UPDATE',
  SsoidpDelete = 'SSOIDP_DELETE',
  ColorpaletteCreate = 'COLORPALETTE_CREATE',
  ColorpaletteRead = 'COLORPALETTE_READ',
  ColorpaletteUpdate = 'COLORPALETTE_UPDATE',
  ColorpaletteDelete = 'COLORPALETTE_DELETE',
  ThemeCreate = 'THEME_CREATE',
  ThemeRead = 'THEME_READ',
  ThemeUpdate = 'THEME_UPDATE',
  ThemeDelete = 'THEME_DELETE',
  FtpTest = 'FTP_TEST',
  ImplementationDeploy = 'IMPLEMENTATION_DEPLOY'
}

export type Person = {
  __typename?: 'Person';
  sid: Scalars['ID'];
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type PersonForm = {
  __typename?: 'PersonForm';
  sid?: Maybe<Scalars['ID']>;
  firstNm: UiStringField;
  lastNm: UiStringField;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type PlanInsuredStat = {
  __typename?: 'PlanInsuredStat';
  planCode?: Maybe<Scalars['String']>;
  planType?: Maybe<Scalars['String']>;
  subscribers?: Maybe<InsuredStatCount>;
  dependents?: Maybe<InsuredStatCount>;
};

export type QualityChecks = {
  __typename?: 'QualityChecks';
  sequenceCreationEvent?: Maybe<Array<SequenceCreationEvent>>;
  totalRecordCount?: Maybe<Scalars['Int']>;
  fieldCreationWarningCount?: Maybe<Scalars['Int']>;
  fieldCreationErrorCount?: Maybe<Scalars['Int']>;
  fieldCreationInfoCount?: Maybe<Scalars['Int']>;
  accStructReqError?: Maybe<StatType>;
  clientSpecificReqError?: Maybe<StatType>;
  accStructTruncError?: Maybe<StatType>;
  reqError?: Maybe<StatType>;
  truncError?: Maybe<StatType>;
  codeListMappingError?: Maybe<StatType>;
  hasMoreEvents?: Maybe<Scalars['Boolean']>;
};

export type Query = {
  __typename?: 'Query';
  version?: Maybe<Scalars['String']>;
  verifyPasswordResetToken?: Maybe<PasswordResetTokenResponse>;
  exchangeActivityInProcess?: Maybe<OrganizationLinkConnection>;
  exchangeActivityTransmitted?: Maybe<OrganizationLinkConnection>;
  exchangeActivityErrored?: Maybe<OrganizationLinkConnection>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  workPacketStatus?: Maybe<WorkPacketStatus>;
  /** Check if a specific Work Packet has been updated after the given last updated date time */
  workPacketStatusPoll?: Maybe<Scalars['Int']>;
  workPacketStatuses?: Maybe<WorkPacketStatusConnection>;
  /** Get the number of Work Packet Statuses which have been updated after the given last updated date time */
  workPacketStatusesPoll?: Maybe<Scalars['Int']>;
  wpProcessErrors?: Maybe<WpProcessErrorConnection>;
  wpTransmissions?: Maybe<WpTransmissionConnection>;
  scheduleOccurrences?: Maybe<ScheduleOccurrenceConnection>;
  /** Get the dashboard period counts for a fixed set of common periods, (today, yesterday, this month, last month) */
  dashboardPeriods?: Maybe<DashboardPeriods>;
  /** Get the dashboard period counts for a specific date range */
  dashboardPeriodCounts?: Maybe<DashboardPeriodCounts>;
  usersForOrg?: Maybe<UserConnection>;
  currentUser?: Maybe<CurrentUserInfo>;
  currentOrgNav?: Maybe<WebNav>;
  userTheme?: Maybe<DashTheme>;
  findUserByEmail?: Maybe<UserAccount>;
  userAccountForm?: Maybe<UserAccountForm>;
  findUserAccount?: Maybe<UserAccountForm>;
  userAccountAuditLogs?: Maybe<UserAccountLogConnection>;
  /** Perform a quick search to find an consultant to grant access to. Returns up to 10 results. */
  findExternalUsers?: Maybe<Array<UserAccount>>;
  externalUsersForOrg?: Maybe<UserConnection>;
  /** Find an external user who has been granted access to a given organization */
  externalUserForOrg?: Maybe<UserAccountForm>;
  accessPolicy?: Maybe<AccessPolicy>;
  accessPoliciesForOrg?: Maybe<AccessPolicyConnection>;
  accessPolicyTemplates?: Maybe<Array<UiOption>>;
  accessSpecializationsForOrg?: Maybe<AccessSpecializationConnection>;
  accessPolicyGroupsForOrg?: Maybe<AccessPolicyGroupConnection>;
  accessPolicyGroupTemplates?: Maybe<Array<UiOption>>;
  accessPolicyForm?: Maybe<AccessPolicyForm>;
  findAccessPolicy?: Maybe<AccessPolicyForm>;
  accessSpecializationForm?: Maybe<AccessSpecializationForm>;
  findAccessSpecialization?: Maybe<AccessSpecializationForm>;
  accessPolicyGroupForm?: Maybe<AccessPolicyGroupForm>;
  findAccessPolicyGroup?: Maybe<AccessPolicyGroupForm>;
  topLevelOrgsByType?: Maybe<Array<Organization>>;
  orgById?: Maybe<Organization>;
  directOrganizations?: Maybe<OrganizationConnection>;
  organizationForm?: Maybe<OrganizationForm>;
  findOrganization?: Maybe<OrganizationForm>;
  searchOrganizations?: Maybe<OrganizationConnection>;
  organizationQuickSearch?: Maybe<Array<Organization>>;
  vendorQuickSearch?: Maybe<Array<Organization>>;
  orgSecurityForm?: Maybe<OrgSecurityForm>;
  /** Get a listing of external organizations the current user has been granted access to */
  externalOrgs?: Maybe<OrganizationConnection>;
  dashThemeColorForOrg?: Maybe<DashThemeColorConnection>;
  dashSiteForOrg?: Maybe<DashSite>;
  dashThemeColor?: Maybe<DashThemeColor>;
  dashThemeColorByName?: Maybe<DashThemeColor>;
  defaultDashThemeForSite?: Maybe<DashTheme>;
  defaultDashThemeForSitePage?: Maybe<DefaultDashThemePage>;
  currentUserDashThemePage?: Maybe<UserDashThemePage>;
  navigateToNewDomain?: Maybe<WebAppDomain>;
  simulateSessionExpir?: Maybe<LogOutInfo>;
  passwordRulesForm?: Maybe<PasswordRulesForm>;
  /**
   * Used to validate a given password against the configured Password Rules for the given Org Sid
   * Returns information as to which rules specifically pass and do not pass.
   */
  passwordValidation?: Maybe<PasswordValidation>;
  xpsftpTest?: Maybe<XpsftpTestPage>;
  reprocessDialog?: Maybe<ReprocessDialog>;
  xchangeProfile?: Maybe<XchangeProfile>;
  xchangeDetails?: Maybe<XchangeConfigForm>;
  previewConvertXchangeProfile?: Maybe<XchangeProfileConvertPreview>;
  xchangeStepForm?: Maybe<XchangeStepForm>;
  xchangeFileTransmissionForm?: Maybe<XchangeFileTransmissionForm>;
};


export type QueryVerifyPasswordResetTokenArgs = {
  token: Scalars['String'];
};


export type QueryExchangeActivityInProcessArgs = {
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
};


export type QueryExchangeActivityTransmittedArgs = {
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
};


export type QueryExchangeActivityErroredArgs = {
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
};


export type QueryWorkPacketStatusDetailsArgs = {
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
};


export type QueryWorkPacketStatusArgs = {
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
};


export type QueryWorkPacketStatusPollArgs = {
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
  lastUpdated: Scalars['DateTime'];
};


export type QueryWorkPacketStatusesArgs = {
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput: PageableInput;
};


export type QueryWorkPacketStatusesPollArgs = {
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  lastUpdated: Scalars['DateTime'];
};


export type QueryWpProcessErrorsArgs = {
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryWpTransmissionsArgs = {
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryScheduleOccurrencesArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryDashboardPeriodsArgs = {
  orgSid: Scalars['ID'];
};


export type QueryDashboardPeriodCountsArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
};


export type QueryUsersForOrgArgs = {
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryCurrentOrgNavArgs = {
  orgInput?: Maybe<OrgSidInput>;
};


export type QueryUserThemeArgs = {
  themeColorMode?: Maybe<ThemeColorMode>;
};


export type QueryFindUserByEmailArgs = {
  userEmail: Scalars['String'];
};


export type QueryUserAccountFormArgs = {
  orgSid: Scalars['ID'];
};


export type QueryFindUserAccountArgs = {
  userSid: Scalars['ID'];
};


export type QueryUserAccountAuditLogsArgs = {
  orgSid: Scalars['ID'];
  changedUserSid?: Maybe<Scalars['ID']>;
  changedByUserSid?: Maybe<Scalars['ID']>;
  events?: Maybe<Array<UserAccountAuditEvent>>;
  dateRange: DateTimeRangeInput;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryFindExternalUsersArgs = {
  searchText?: Maybe<Scalars['String']>;
};


export type QueryExternalUsersForOrgArgs = {
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryExternalUserForOrgArgs = {
  orgSid: Scalars['ID'];
  userSid: Scalars['ID'];
};


export type QueryAccessPolicyArgs = {
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
};


export type QueryAccessPoliciesForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};


export type QueryAccessPolicyTemplatesArgs = {
  orgSid: Scalars['ID'];
};


export type QueryAccessSpecializationsForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};


export type QueryAccessPolicyGroupsForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};


export type QueryAccessPolicyGroupTemplatesArgs = {
  orgSid: Scalars['ID'];
};


export type QueryAccessPolicyFormArgs = {
  orgSid: Scalars['ID'];
  templatePolicySid?: Maybe<Scalars['ID']>;
};


export type QueryFindAccessPolicyArgs = {
  policySid: Scalars['ID'];
};


export type QueryAccessSpecializationFormArgs = {
  orgSid: Scalars['ID'];
};


export type QueryFindAccessSpecializationArgs = {
  specializationSid: Scalars['ID'];
};


export type QueryAccessPolicyGroupFormArgs = {
  orgSid: Scalars['ID'];
  templateGroupSid?: Maybe<Scalars['ID']>;
};


export type QueryFindAccessPolicyGroupArgs = {
  policyGroupSid: Scalars['ID'];
};


export type QueryTopLevelOrgsByTypeArgs = {
  orgType: OrgType;
};


export type QueryOrgByIdArgs = {
  orgSid?: Maybe<Scalars['ID']>;
  orgId: Scalars['String'];
};


export type QueryDirectOrganizationsArgs = {
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryOrganizationFormArgs = {
  orgOwnerSid: Scalars['ID'];
};


export type QueryFindOrganizationArgs = {
  orgSid: Scalars['ID'];
};


export type QuerySearchOrganizationsArgs = {
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryOrganizationQuickSearchArgs = {
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
};


export type QueryVendorQuickSearchArgs = {
  orgOwnerSid: Scalars['ID'];
  searchText: Scalars['String'];
};


export type QueryOrgSecurityFormArgs = {
  orgSid: Scalars['ID'];
};


export type QueryExternalOrgsArgs = {
  pageableInput?: Maybe<PageableInput>;
};


export type QueryDashThemeColorForOrgArgs = {
  ownedInput?: Maybe<OwnedInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QueryDashSiteForOrgArgs = {
  orgSidInput?: Maybe<OrgSidInput>;
};


export type QueryDashThemeColorArgs = {
  ownedInputSid?: Maybe<OwnedInputSid>;
};


export type QueryDashThemeColorByNameArgs = {
  ownedInputName?: Maybe<OwnedInputName>;
};


export type QueryDefaultDashThemeForSiteArgs = {
  ownedInput?: Maybe<OwnedInput>;
};


export type QueryDefaultDashThemeForSitePageArgs = {
  ownedInput?: Maybe<OwnedInput>;
};


export type QueryNavigateToNewDomainArgs = {
  domainNavInput?: Maybe<DomainNavInput>;
};


export type QueryPasswordRulesFormArgs = {
  orgSid: Scalars['ID'];
};


export type QueryPasswordValidationArgs = {
  orgSid: Scalars['ID'];
  userSid: Scalars['ID'];
  password: Scalars['String'];
};


export type QueryXpsftpTestArgs = {
  orgSid?: Maybe<Scalars['ID']>;
};


export type QueryReprocessDialogArgs = {
  workOrderId: Scalars['String'];
};


export type QueryXchangeProfileArgs = {
  orgSid: Scalars['ID'];
};


export type QueryXchangeDetailsArgs = {
  orgSid: Scalars['ID'];
  coreFilename: Scalars['String'];
};


export type QueryPreviewConvertXchangeProfileArgs = {
  orgSid: Scalars['ID'];
};


export type QueryXchangeStepFormArgs = {
  xchangeFileProcessSid: Scalars['ID'];
  sid?: Maybe<Scalars['ID']>;
};


export type QueryXchangeFileTransmissionFormArgs = {
  xchangeFileProcessSid: Scalars['ID'];
  sid?: Maybe<Scalars['ID']>;
};

export type RecordCount = {
  __typename?: 'RecordCount';
  name: Scalars['String'];
  count: Scalars['Int'];
};

export type RecordCounts = {
  __typename?: 'RecordCounts';
  totalCount?: Maybe<Scalars['Int']>;
  showUser?: Maybe<Scalars['Boolean']>;
  recordCount?: Maybe<Array<RecordCount>>;
};

export type RecordCreationEvent = {
  __typename?: 'RecordCreationEvent';
  context?: Maybe<Scalars['String']>;
  outerContext?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['String']>;
  error?: Maybe<Array<FieldCreationEvent>>;
  warning?: Maybe<Array<FieldCreationEvent>>;
  information?: Maybe<Array<FieldCreationEvent>>;
};

export type ReprocessDialog = {
  __typename?: 'ReprocessDialog';
  captureChangeReason: Scalars['Boolean'];
  title: Scalars['String'];
  message: Scalars['String'];
};

export type ReprocessResponse = {
  __typename?: 'ReprocessResponse';
  newWorkOrderId?: Maybe<Scalars['String']>;
  orgSid?: Maybe<Scalars['ID']>;
  response?: Maybe<GqOperationResponse>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type RequiredPasswordRuleSet = {
  __typename?: 'RequiredPasswordRuleSet';
  mustNotContainWhiteSpace?: Maybe<Scalars['Boolean']>;
  mustNotContainUserName?: Maybe<Scalars['Boolean']>;
  mustNotContainNumericSequence?: Maybe<Scalars['Boolean']>;
  mustFollowLengthRequirements?: Maybe<Scalars['Boolean']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  mustContainUpperCaseLetters?: Maybe<Scalars['Boolean']>;
  minUpperCaseLetters?: Maybe<Scalars['Int']>;
  mustContainLowerCaseLetters?: Maybe<Scalars['Boolean']>;
  minLowerCaseLetters?: Maybe<Scalars['Int']>;
  mustContainNumericDigits?: Maybe<Scalars['Boolean']>;
  minNumericDigits?: Maybe<Scalars['Int']>;
  mustContainSpecialCharacters?: Maybe<Scalars['Boolean']>;
  minSpecialCharacters?: Maybe<Scalars['Int']>;
  mustNotRepeatCharacters?: Maybe<Scalars['Boolean']>;
  maxAllowedRepeatedChars?: Maybe<Scalars['Int']>;
  mustNotReusePasswords?: Maybe<Scalars['Boolean']>;
  minPasswordHistoryVariations?: Maybe<Scalars['Int']>;
  mustNotMatchExactDictionaryWord?: Maybe<Scalars['Boolean']>;
  mustNotMatchPartialDictionaryWord?: Maybe<Scalars['Boolean']>;
};

export type RequiredPasswordRuleSetForm = PasswordRuleSet & {
  __typename?: 'RequiredPasswordRuleSetForm';
  mustNotContainWhiteSpace?: Maybe<UiBooleanField>;
  mustNotContainUserName?: Maybe<UiBooleanField>;
  mustNotContainNumericSequence?: Maybe<UiBooleanField>;
  mustFollowLengthRequirements?: Maybe<UiBooleanField>;
  minLength?: Maybe<UiIntField>;
  maxLength?: Maybe<UiIntField>;
  mustContainUpperCaseLetters?: Maybe<UiBooleanField>;
  minUpperCaseLetters?: Maybe<UiIntField>;
  mustContainLowerCaseLetters?: Maybe<UiBooleanField>;
  minLowerCaseLetters?: Maybe<UiIntField>;
  mustContainNumericDigits?: Maybe<UiBooleanField>;
  minNumericDigits?: Maybe<UiIntField>;
  mustContainSpecialCharacters?: Maybe<UiBooleanField>;
  minSpecialCharacters?: Maybe<UiIntField>;
  mustNotRepeatCharacters?: Maybe<UiBooleanField>;
  maxAllowedRepeatedChars?: Maybe<UiIntField>;
  mustNotReusePasswords?: Maybe<UiBooleanField>;
  minPasswordHistoryVariations?: Maybe<UiIntField>;
  mustNotMatchExactDictionaryWord?: Maybe<UiBooleanField>;
  mustNotMatchPartialDictionaryWord?: Maybe<UiBooleanField>;
};

export type RequiredPasswordRuleSetInput = {
  mustNotContainWhiteSpace?: Maybe<Scalars['Boolean']>;
  mustNotContainUserName?: Maybe<Scalars['Boolean']>;
  mustNotContainNumericSequence?: Maybe<Scalars['Boolean']>;
  mustFollowLengthRequirements?: Maybe<Scalars['Boolean']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  mustContainUpperCaseLetters?: Maybe<Scalars['Boolean']>;
  minUpperCaseLetters?: Maybe<Scalars['Int']>;
  mustContainLowerCaseLetters?: Maybe<Scalars['Boolean']>;
  minLowerCaseLetters?: Maybe<Scalars['Int']>;
  mustContainNumericDigits?: Maybe<Scalars['Boolean']>;
  minNumericDigits?: Maybe<Scalars['Int']>;
  mustContainSpecialCharacters?: Maybe<Scalars['Boolean']>;
  minSpecialCharacters?: Maybe<Scalars['Int']>;
  mustNotRepeatCharacters?: Maybe<Scalars['Boolean']>;
  maxAllowedRepeatedChars?: Maybe<Scalars['Int']>;
  mustNotReusePasswords?: Maybe<Scalars['Boolean']>;
  minPasswordHistoryVariations?: Maybe<Scalars['Int']>;
  mustNotMatchExactDictionaryWord?: Maybe<Scalars['Boolean']>;
  mustNotMatchPartialDictionaryWord?: Maybe<Scalars['Boolean']>;
};

export enum RestartReason {
  Internal = 'INTERNAL',
  External = 'EXTERNAL'
}

export type SftpConfigSubscriptionResponse = {
  __typename?: 'SFTPConfigSubscriptionResponse';
  status: WorkStatus;
  logMessage: LogMessage;
  allMessages?: Maybe<Array<LogMessage>>;
  clientProfileSnippet?: Maybe<Scalars['String']>;
  csvLog?: Maybe<Scalars['String']>;
  xpSFTPForm?: Maybe<XpsftpForm>;
  sendTestFileForm?: Maybe<SftpTestSendTestFileForm>;
  includeFileUpload?: Maybe<Scalars['Boolean']>;
};

export type SftpTestSendTestFile = {
  sendTestFile: Scalars['Boolean'];
  testFileStrategy: TestFileStrategy;
  fileName?: Maybe<Scalars['String']>;
  fileBody?: Maybe<Scalars['String']>;
};

export type SftpTestSendTestFileForm = {
  __typename?: 'SFTPTestSendTestFileForm';
  sendTestFile?: Maybe<UiBooleanField>;
  testFileStrategy?: Maybe<UiSelectOneField>;
  fileName?: Maybe<UiStringField>;
  fileBody?: Maybe<UiStringField>;
};

export enum SchedOccurStatusEnum {
  Scheduled = 'SCHEDULED',
  InRunWindow = 'IN_RUN_WINDOW',
  Missed = 'MISSED',
  RanInWindow = 'RAN_IN_WINDOW',
  RanLate = 'RAN_LATE',
  RanEarly = 'RAN_EARLY',
  RanOffSchedule = 'RAN_OFF_SCHEDULE',
  RanCloseToSchedule = 'RAN_CLOSE_TO_SCHEDULE',
  RanNotScheduled = 'RAN_NOT_SCHEDULED',
  Errored = 'ERRORED',
  ErroredLate = 'ERRORED_LATE',
  ErroredEarly = 'ERRORED_EARLY',
  ErroredOffSchedule = 'ERRORED_OFF_SCHEDULE',
  ErroredCloseToSchedule = 'ERRORED_CLOSE_TO_SCHEDULE',
  ExchangeHeld = 'EXCHANGE_HELD',
  ExchangeHeldOffSchedule = 'EXCHANGE_HELD_OFF_SCHEDULE',
  NotScheduled = 'NOT_SCHEDULED'
}

export type ScheduleOccurrence = {
  __typename?: 'ScheduleOccurrence';
  resource: Scalars['String'];
  scheduleId?: Maybe<Scalars['ID']>;
  orgSid: Scalars['ID'];
  timeScheduled?: Maybe<Scalars['DateTime']>;
  schedOccurStatus: SchedOccurStatusEnum;
  schedOccurStatusLabel: Scalars['String'];
  runOccurrences?: Maybe<Array<ScheduleRunOccurrence>>;
};

export type ScheduleOccurrenceConnection = {
  __typename?: 'ScheduleOccurrenceConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<ScheduleOccurrence>>;
};

export type ScheduleRunOccurrence = {
  __typename?: 'ScheduleRunOccurrence';
  workOrderId: Scalars['String'];
  timeRan?: Maybe<Scalars['DateTime']>;
  status: SchedOccurStatusEnum;
  statusLabel: Scalars['String'];
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type SequenceCreationEvent = {
  __typename?: 'SequenceCreationEvent';
  context?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['String']>;
  recordCreationEvent?: Maybe<Array<RecordCreationEvent>>;
};

export type SidInput = {
  sid: Scalars['ID'];
};

export type SidsInput = {
  sids: Array<Scalars['ID']>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type SortOrderInput = {
  direction?: Maybe<SortDirection>;
  property?: Maybe<Scalars['String']>;
  ignoreCase?: Maybe<Scalars['Boolean']>;
  nullHandling?: Maybe<NullHandling>;
};

export type SpecializationFilter = {
  __typename?: 'SpecializationFilter';
  sid: Scalars['ID'];
  permission: Permission;
  orgSids?: Maybe<Array<Scalars['ID']>>;
};

export type SpecializationFilterForm = {
  __typename?: 'SpecializationFilterForm';
  permission: Permission;
  label?: Maybe<Scalars['String']>;
  orgSids?: Maybe<UiSelectManyField>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type StatCountType = {
  __typename?: 'StatCountType';
  value?: Maybe<Scalars['Int']>;
};

export type StatInt = {
  __typename?: 'StatInt';
  prior?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
};

export type StatType = {
  __typename?: 'StatType';
  count: Scalars['Int'];
  facetTotal?: Maybe<Scalars['Int']>;
  inTolerance?: Maybe<Scalars['Boolean']>;
  toleranceMsg?: Maybe<Scalars['String']>;
  hold?: Maybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  ftpTest?: Maybe<SftpConfigSubscriptionResponse>;
};


export type SubscriptionFtpTestArgs = {
  xpsftp: XsftpInput;
  sendTestFile?: Maybe<SftpTestSendTestFile>;
};

export enum TestFileStrategy {
  Upload = 'UPLOAD',
  Generate = 'GENERATE'
}

export enum ThemeColorMode {
  Light = 'LIGHT',
  Dark = 'DARK'
}

export enum ThemeFontSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE'
}

export type TokenUser = {
  __typename?: 'TokenUser';
  token?: Maybe<Scalars['String']>;
  session?: Maybe<UserSession>;
};

export enum TransmissionProtocol {
  Sftp = 'SFTP',
  Ftps = 'FTPS',
  Ftp = 'FTP',
  Archive = 'ARCHIVE'
}

export type UiBooleanField = UiField & {
  __typename?: 'UIBooleanField';
  value?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiDateField = UiField & {
  __typename?: 'UIDateField';
  value?: Maybe<Scalars['Date']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiField = {
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiIntField = UiField & {
  __typename?: 'UIIntField';
  value?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiLongField = UiField & {
  __typename?: 'UILongField';
  value?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  min?: Maybe<Scalars['Int']>;
  max?: Maybe<Scalars['Int']>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiOption = {
  __typename?: 'UIOption';
  label: Scalars['String'];
  value: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  category?: Maybe<Scalars['String']>;
};

export type UiOptions = {
  __typename?: 'UIOptions';
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<UiOption>>;
};

export type UiReadOnlyField = UiField & {
  __typename?: 'UIReadOnlyField';
  value?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiSelectManyField = UiField & {
  __typename?: 'UISelectManyField';
  value?: Maybe<Array<NvpStr>>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Name of the list of options the user can choose from to populate this value */
  options?: Maybe<Scalars['String']>;
  /** Query name to invoke to search for assignable values */
  query?: Maybe<Scalars['String']>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiSelectOneField = UiField & {
  __typename?: 'UISelectOneField';
  value?: Maybe<NvpStr>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Name of the list of options the user can choose from to populate this value */
  options?: Maybe<Scalars['String']>;
  /** Query name to invoke to search for assignable values */
  query?: Maybe<Scalars['String']>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiStringField = UiField & {
  __typename?: 'UIStringField';
  value?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  readOnly?: Maybe<Scalars['Boolean']>;
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  inheritedFrom?: Maybe<Scalars['String']>;
  inheritedBy?: Maybe<Array<Maybe<Scalars['String']>>>;
  min: Scalars['Int'];
  max: Scalars['Int'];
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UpdateAccessPolicyGroupInput = {
  sid: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
  policySids?: Maybe<Array<Scalars['ID']>>;
  specializationSids?: Maybe<Array<Scalars['ID']>>;
  includeAllSubOrgs?: Maybe<Scalars['Boolean']>;
  includeOrgSids?: Maybe<Array<Scalars['ID']>>;
  excludeOrgSids?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateAccessPolicyInput = {
  policySid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Permission>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<OrgType>>;
};

export type UpdateAccessSpecializationInput = {
  sid: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<UpdateSpecializationFilterInput>>;
};

export type UpdateDashThemeColorInput = {
  sid: Scalars['ID'];
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  defaultPalette?: Maybe<Scalars['Boolean']>;
  allowDark?: Maybe<Scalars['Boolean']>;
  themeColorMode?: Maybe<ThemeColorMode>;
  paletteNm?: Maybe<Scalars['String']>;
  themePrimary?: Maybe<Scalars['String']>;
  themeLighterAlt?: Maybe<Scalars['String']>;
  themeLighter?: Maybe<Scalars['String']>;
  themeLight?: Maybe<Scalars['String']>;
  themeTertiary?: Maybe<Scalars['String']>;
  themeSecondary?: Maybe<Scalars['String']>;
  themeDarkAlt?: Maybe<Scalars['String']>;
  themeDark?: Maybe<Scalars['String']>;
  themeDarker?: Maybe<Scalars['String']>;
  neutralLighterAlt?: Maybe<Scalars['String']>;
  neutralLighter?: Maybe<Scalars['String']>;
  neutralLight?: Maybe<Scalars['String']>;
  neutralQuaternaryAlt?: Maybe<Scalars['String']>;
  neutralQuaternary?: Maybe<Scalars['String']>;
  neutralTertiaryAlt?: Maybe<Scalars['String']>;
  neutralTertiary?: Maybe<Scalars['String']>;
  neutralSecondary?: Maybe<Scalars['String']>;
  neutralPrimaryAlt?: Maybe<Scalars['String']>;
  neutralPrimary?: Maybe<Scalars['String']>;
  neutralDark?: Maybe<Scalars['String']>;
  black?: Maybe<Scalars['String']>;
  white?: Maybe<Scalars['String']>;
};

export type UpdateDefaultDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type UpdateOrgInput = {
  orgSid: Scalars['ID'];
  name: Scalars['String'];
  orgType: OrgType;
  whitelist?: Maybe<Array<Scalars['String']>>;
};

export type UpdateOrgSecurityInput = {
  orgSid: Scalars['ID'];
  forgotPasswordEnabled: Scalars['Boolean'];
  forgotPasswordMsg?: Maybe<Scalars['String']>;
  allowedEmailDomains: Scalars['String'];
};

export type UpdateOwnPasswordInput = {
  originalPassword: Scalars['String'];
  newPassword: Scalars['String'];
  verifyPassword: Scalars['String'];
};

export type UpdatePasswordInput = {
  token: Scalars['String'];
  newPassword: Scalars['String'];
  verifyPassword: Scalars['String'];
};

export type UpdateSpecializationFilterInput = {
  sid?: Maybe<Scalars['ID']>;
  permission: Permission;
  orgSids?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateUserAccessPolicyGroupsInput = {
  userAccountSid: Scalars['ID'];
  accessPolicyGroupSids?: Maybe<Array<Scalars['ID']>>;
};

export type UpdateUserDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type UpdateUserInput = {
  sid: Scalars['ID'];
  email: Scalars['String'];
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type UpdateXchangeStepInput = {
  sid: Scalars['ID'];
  xml: Scalars['String'];
};


export type UserAccount = {
  __typename?: 'UserAccount';
  sid: Scalars['ID'];
  email: Scalars['String'];
  person?: Maybe<Person>;
  accessPolicyGroups?: Maybe<Array<AccessPolicyGroup>>;
};

export enum UserAccountAuditEvent {
  AccountCreation = 'ACCOUNT_CREATION',
  ResetPasswordRequested = 'RESET_PASSWORD_REQUESTED',
  PasswordUpdate = 'PASSWORD_UPDATE',
  GroupAssignmentUpdate = 'GROUP_ASSIGNMENT_UPDATE',
  Deactivation = 'DEACTIVATION',
  Activation = 'ACTIVATION',
  ProfileUpdate = 'PROFILE_UPDATE',
  LoginSuccess = 'LOGIN_SUCCESS',
  LoginFail = 'LOGIN_FAIL',
  InactiveLoginAttempt = 'INACTIVE_LOGIN_ATTEMPT',
  LockedLoginAttempt = 'LOCKED_LOGIN_ATTEMPT',
  Logout = 'LOGOUT',
  ArchiveAccess = 'ARCHIVE_ACCESS'
}

export type UserAccountAuditLog = {
  __typename?: 'UserAccountAuditLog';
  auditDateTime: Scalars['DateTime'];
  event: UserAccountAuditEvent;
  orgSid: Scalars['ID'];
  userAccount?: Maybe<UserAccount>;
  oldValue?: Maybe<Scalars['String']>;
  newValue?: Maybe<Scalars['String']>;
  workOrderId?: Maybe<Scalars['String']>;
  changedByUserAccount?: Maybe<UserAccount>;
};

export type UserAccountForm = {
  __typename?: 'UserAccountForm';
  sid?: Maybe<Scalars['ID']>;
  email?: Maybe<UiStringField>;
  active?: Maybe<UiBooleanField>;
  person?: Maybe<PersonForm>;
  organization: UiReadOnlyField;
  accessPolicyGroups?: Maybe<UiSelectManyField>;
  /** Indicates that an email should be sent to the user with an activation link. */
  sendActivationEmail?: Maybe<UiBooleanField>;
  lastLogin?: Maybe<UiReadOnlyField>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  options?: Maybe<Array<UiOptions>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UserAccountLogConnection = {
  __typename?: 'UserAccountLogConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<UserAccountAuditLog>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  userSearchForm?: Maybe<UserSearchForm>;
  toolTips?: Maybe<UserConnectionTooltips>;
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<UserItem>>;
};

export type UserConnectionTooltips = {
  __typename?: 'UserConnectionTooltips';
  accountLocked?: Maybe<Scalars['String']>;
  pendingActivation?: Maybe<Scalars['String']>;
  expiredActivation?: Maybe<Scalars['String']>;
  notificationOnlyUser?: Maybe<Scalars['String']>;
};

export type UserDashThemePage = {
  __typename?: 'UserDashThemePage';
  themeColorModes?: Maybe<Array<ThemeColorMode>>;
  themeFontSizes?: Maybe<Array<ThemeFontSize>>;
  themeColorPalettes?: Maybe<Array<DashThemeColor>>;
  dashTheme?: Maybe<DashTheme>;
};

export type UserFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
  searchText?: Maybe<Scalars['String']>;
  /** Show only users who have a locked account */
  lockedFilter?: Maybe<Scalars['Boolean']>;
  /** Show only users who have a pending activation link */
  pendingActivationFilter?: Maybe<Scalars['Boolean']>;
  /** Show only users who have an expired activation link */
  expiredActivationFilter?: Maybe<Scalars['Boolean']>;
  /** Search for users regardless of Organization. Only valid for CDX Users when in the context of the CDX Organization. */
  searchAllOrgs?: Maybe<Scalars['Boolean']>;
};

export type UserItem = {
  __typename?: 'UserItem';
  item: UserAccount;
  accountLocked?: Maybe<Scalars['Boolean']>;
  pendingActivation?: Maybe<Scalars['Boolean']>;
  expiredActivation?: Maybe<Scalars['Boolean']>;
  notificationOnlyUser?: Maybe<Scalars['Boolean']>;
  orgId?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  listItemCommands?: Maybe<Array<WebCommand>>;
};

export type UserSearchForm = {
  __typename?: 'UserSearchForm';
  searchText?: Maybe<UiStringField>;
  lockedFilter?: Maybe<UiBooleanField>;
  pendingActivationFilter?: Maybe<UiBooleanField>;
  expiredActivationFilter?: Maybe<UiBooleanField>;
  searchAllOrgs?: Maybe<UiBooleanField>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  orgId: Scalars['String'];
  orgSid: Scalars['ID'];
  orgName: Scalars['String'];
  userId: Scalars['String'];
  firstNm: Scalars['String'];
  pollInterval?: Maybe<Scalars['Int']>;
  defaultAuthorities?: Maybe<Array<Scalars['String']>>;
};

export type WpProcessError = {
  __typename?: 'WPProcessError';
  id: Scalars['ID'];
  workOrderId: Scalars['String'];
  startTime: Scalars['DateTime'];
  stepName?: Maybe<Scalars['String']>;
  orgSid?: Maybe<Scalars['ID']>;
  planSponsorId?: Maybe<Scalars['String']>;
  vendorSid?: Maybe<Scalars['ID']>;
  vendorId?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  inboundFilename?: Maybe<Scalars['String']>;
  clientFileArchivePath?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type WpProcessErrorConnection = {
  __typename?: 'WPProcessErrorConnection';
  listPageInfo?: Maybe<ListPageInfo>;
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<WpProcessError>>;
};

export type WpTransmission = {
  __typename?: 'WPTransmission';
  id: Scalars['ID'];
  workOrderId: Scalars['String'];
  deliveredOn: Scalars['DateTime'];
  orgSid?: Maybe<Scalars['ID']>;
  planSponsorId?: Maybe<Scalars['String']>;
  vendorSid?: Maybe<Scalars['ID']>;
  vendorId?: Maybe<Scalars['String']>;
  specId?: Maybe<Scalars['String']>;
  implementation?: Maybe<Scalars['String']>;
  inboundFilename?: Maybe<Scalars['String']>;
  outboundFilename?: Maybe<Scalars['String']>;
  outboundFilesize?: Maybe<Scalars['Int']>;
  billingCount?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
  extractType?: Maybe<Scalars['String']>;
  extractVersion?: Maybe<Scalars['String']>;
  environment?: Maybe<Environment>;
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type WpTransmissionConnection = {
  __typename?: 'WPTransmissionConnection';
  listPageInfo?: Maybe<ListPageInfo>;
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<WpTransmission>>;
};

export type WebAppDomain = {
  __typename?: 'WebAppDomain';
  type: CdxWebAppDomain;
  /** selectedPage: either the page to load - must be in teh navItems */
  selectedPage?: Maybe<CdxWebPage>;
  /** navItems: either the left nav or top nav depending on the domain */
  navItems?: Maybe<Array<WebNav>>;
};

export type WebCommand = {
  __typename?: 'WebCommand';
  endPoint?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  parameters?: Maybe<Array<NvpStr>>;
  commandType?: Maybe<CdxWebCommandType>;
};

export type WebNav = {
  __typename?: 'WebNav';
  orgId?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  /** page: WebPage to nave to, blank if this only has subnavs */
  page?: Maybe<WebPage>;
  /** appDomain: only needs to be set here if this link will change domains */
  appDomain?: Maybe<CdxWebAppDomain>;
  subNavItems?: Maybe<Array<WebNav>>;
};

export type WebPage = {
  __typename?: 'WebPage';
  type: CdxWebPage;
  /** parameters: any dynamic parameters the page end point needs to be called with */
  parameters?: Maybe<Array<Nvp>>;
  /** commands: actions on the page that may lead to another page e.g. add new */
  commands?: Maybe<Array<WebNav>>;
  /** pivots: any pivots the page might have */
  pivots?: Maybe<Array<WebPivot>>;
};

export type WebPivot = {
  __typename?: 'WebPivot';
  label?: Maybe<Scalars['String']>;
  type: CdxWebPivot;
};

export type WorkPacketCommand = {
  __typename?: 'WorkPacketCommand';
  label?: Maybe<Scalars['String']>;
  commandType?: Maybe<WorkPacketCommandType>;
};

export enum WorkPacketCommandType {
  ViewDetails = 'VIEW_DETAILS',
  DownloadFile = 'DOWNLOAD_FILE',
  RerunStep = 'RERUN_STEP',
  Continue = 'CONTINUE',
  Cancel = 'CANCEL',
  Rename = 'RENAME',
  Reprocess = 'REPROCESS',
  Resend = 'RESEND',
  Delete = 'DELETE'
}

export type WorkPacketStatus = {
  __typename?: 'WorkPacketStatus';
  workOrderId: Scalars['String'];
  timestamp: Scalars['DateTime'];
  orgId?: Maybe<Scalars['String']>;
  orgSid: Scalars['ID'];
  detailsPath?: Maybe<Scalars['String']>;
  inboundFilename: Scalars['String'];
  vendorId?: Maybe<Scalars['String']>;
  vendorSid: Scalars['ID'];
  step: WorkStep;
  stepStatus: WorkStatus;
  /** Make Enumeration @see OrigWorkPacketStatusConverter */
  packetStatus: WorkStatus;
  /** User email address */
  reprocessedBy?: Maybe<Scalars['String']>;
  reprocessedOn?: Maybe<Scalars['DateTime']>;
  restartReason?: Maybe<RestartReason>;
  recordHighlightCount?: Maybe<Scalars['Int']>;
  populationCount?: Maybe<Scalars['Int']>;
  recordHighlightType?: Maybe<ErrorSeverity>;
  /** The next three options only are returned when the user has the *_EXCHANGE_ARCHIVE_READ Permission */
  clientFileArchivePath?: Maybe<Scalars['String']>;
  vendorFileArchivePath?: Maybe<Scalars['String']>;
  vendorFilename?: Maybe<Scalars['String']>;
  feedType?: Maybe<Scalars['String']>;
  inboundDataType?: Maybe<Scalars['String']>;
  inboundDataSize?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
  supplementalFilesArchivePaths?: Maybe<Array<Scalars['String']>>;
  /** Indicates this file didn't get delivered anywhere. Is only archived and is accessible from the CDX Dashboard */
  archiveOnly?: Maybe<Scalars['Boolean']>;
  hasErrors?: Maybe<Scalars['Boolean']>;
  environment?: Maybe<Environment>;
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type WorkPacketStatusConnection = {
  __typename?: 'WorkPacketStatusConnection';
  listPageInfo?: Maybe<ListPageInfo>;
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<WorkPacketStatus>>;
};

export type WorkPacketStatusDetails = {
  __typename?: 'WorkPacketStatusDetails';
  workOrderId: Scalars['String'];
  inboundFilename: Scalars['String'];
  timestamp: Scalars['DateTime'];
  orgSid: Scalars['ID'];
  orgId?: Maybe<Scalars['String']>;
  orgName?: Maybe<Scalars['String']>;
  vendorSid: Scalars['ID'];
  vendorId?: Maybe<Scalars['String']>;
  vendorName?: Maybe<Scalars['String']>;
  specId?: Maybe<Scalars['String']>;
  specImplName?: Maybe<Scalars['String']>;
  fingerPrint?: Maybe<Scalars['String']>;
  populationCount?: Maybe<Scalars['Int']>;
  suppressBilling?: Maybe<Scalars['Boolean']>;
  deliveredFiles?: Maybe<Array<DeliveredFile>>;
  packetStatus: WorkStatus;
  workStepStatus?: Maybe<Array<WorkStepStatus>>;
  extractParameters?: Maybe<ExtractParameters>;
  qualityChecks?: Maybe<QualityChecks>;
  enrollmentStats?: Maybe<EnrollmentStat>;
  inboundEnrollmentStats?: Maybe<EnrollmentStat>;
  outboundEnrollmentStats?: Maybe<EnrollmentStat>;
  outboundRecordCounts?: Maybe<RecordCounts>;
  inboundLabel?: Maybe<Scalars['String']>;
  outboundLabel?: Maybe<Scalars['String']>;
  clientFileArchivePath?: Maybe<Scalars['String']>;
  vendorFileArchivePath?: Maybe<Scalars['String']>;
  supplementalFilesArchivePaths?: Maybe<Array<Scalars['String']>>;
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type WorkPacketStatusFilter = {
  excludedEnvs?: Maybe<Array<Scalars['String']>>;
};

export enum WorkStatus {
  Queued = 'QUEUED',
  Processing = 'PROCESSING',
  Complete = 'COMPLETE',
  Error = 'ERROR',
  Submitted = 'SUBMITTED',
  Warning = 'WARNING',
  Hold = 'HOLD',
  Canceled = 'CANCELED',
  QualityCheckFailed = 'QUALITY_CHECK_FAILED',
  NoRecords = 'NO_RECORDS',
  TechMigrationCheckFailed = 'TECH_MIGRATION_CHECK_FAILED'
}

export enum WorkStep {
  EnqueueExtract = 'ENQUEUE_EXTRACT',
  TransformExtract = 'TRANSFORM_EXTRACT',
  TransmitFile = 'TRANSMIT_FILE'
}

export type WorkStepStatus = {
  __typename?: 'WorkStepStatus';
  stepStatus?: Maybe<WorkStatus>;
  stepName?: Maybe<Scalars['String']>;
  stepType?: Maybe<Scalars['String']>;
  populationCount?: Maybe<StatCountType>;
  transformedArchiveFile?: Maybe<ArchiveFileType>;
  recordCounts?: Maybe<RecordCounts>;
  stepFile?: Maybe<Array<ArchiveFileType>>;
  nvp?: Maybe<Array<NvpStr>>;
  commands?: Maybe<Array<WorkPacketCommand>>;
};

export type XpsftpForm = {
  __typename?: 'XPSFTPForm';
  host?: Maybe<UiStringField>;
  port?: Maybe<UiIntField>;
  user?: Maybe<UiStringField>;
  password?: Maybe<UiStringField>;
  folder?: Maybe<UiStringField>;
  stepWise?: Maybe<UiBooleanField>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
  sshKeyPath?: Maybe<UiSelectOneField>;
  sshKeyPassword?: Maybe<UiStringField>;
  options?: Maybe<Array<UiOptions>>;
};

export type XpsftpTestPage = {
  __typename?: 'XPSFTPTestPage';
  xpSFTPForm: XpsftpForm;
  sendTestFileForm?: Maybe<SftpTestSendTestFileForm>;
  includeFileUpload?: Maybe<Scalars['Boolean']>;
};

export type XsftpInput = {
  host: Scalars['String'];
  port?: Maybe<Scalars['Int']>;
  user: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  folder?: Maybe<Scalars['String']>;
  stepWise?: Maybe<Scalars['Boolean']>;
  sshKeyPath?: Maybe<Scalars['String']>;
  sshKeyPassword?: Maybe<Scalars['String']>;
};

export type XchangeAlert = {
  __typename?: 'XchangeAlert';
  filenameQualifier?: Maybe<Scalars['String']>;
  alertTypes?: Maybe<Array<AlertType>>;
  subscribers?: Maybe<Array<XchangeAlertSubscriber>>;
  commands?: Maybe<Array<WebCommand>>;
};

export type XchangeAlertForm = {
  __typename?: 'XchangeAlertForm';
  filenameQualifier: UiStringField;
  alertTypes: UiSelectManyField;
  subscribers?: Maybe<Array<XchangeAlertSubscriber>>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeAlertSubscriber = {
  __typename?: 'XchangeAlertSubscriber';
  sid?: Maybe<Scalars['ID']>;
  email: Scalars['String'];
  firstNm?: Maybe<Scalars['String']>;
  lastNm?: Maybe<Scalars['String']>;
};

export type XchangeAlertSummary = {
  __typename?: 'XchangeAlertSummary';
  coreFilename?: Maybe<Scalars['String']>;
  numSubscribers: Scalars['Int'];
  hasUnpublishedChanges: Scalars['Boolean'];
};

export type XchangeConfigActivity = {
  __typename?: 'XchangeConfigActivity';
  filesProcessed: Scalars['Int'];
  lastActivity?: Maybe<Scalars['DateTime']>;
};

export type XchangeConfigForm = {
  __typename?: 'XchangeConfigForm';
  sid?: Maybe<Scalars['ID']>;
  requiresConversion: Scalars['Boolean'];
  coreFilename: UiStringField;
  coreFilenamePattern: UiStringField;
  comments: UiStringField;
  processes?: Maybe<Array<XchangeFileProcessForm>>;
  alerts?: Maybe<Array<XchangeAlert>>;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeConfigSummary = {
  __typename?: 'XchangeConfigSummary';
  vendorIds?: Maybe<Array<Scalars['String']>>;
  specIds?: Maybe<Array<Scalars['String']>>;
  coreFilename?: Maybe<Scalars['String']>;
  uatActivity: XchangeConfigActivity;
  testActivity: XchangeConfigActivity;
  prodActivity: XchangeConfigActivity;
  errorActivity?: Maybe<XchangeConfigActivity>;
  active: Scalars['Boolean'];
  hasUnpublishedChanges: Scalars['Boolean'];
  hasAlerts: Scalars['Boolean'];
  implementationPending: Scalars['Boolean'];
};

export type XchangeDiagram = {
  __typename?: 'XchangeDiagram';
  steps?: Maybe<Array<XchangeDiagramStep>>;
  stepGroups?: Maybe<Array<XchangeDiagramStepGroup>>;
  transmissions?: Maybe<Array<XchangeDiagramFileTransmission>>;
  connectors?: Maybe<Array<DiagramConnector>>;
};

export type XchangeDiagramFileTransmission = {
  __typename?: 'XchangeDiagramFileTransmission';
  sid?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  protocol: TransmissionProtocol;
  host?: Maybe<Scalars['String']>;
  qualifier?: Maybe<Scalars['String']>;
  commands?: Maybe<Array<WebCommand>>;
  position: DiagramCoordinates;
};

export type XchangeDiagramStep = {
  __typename?: 'XchangeDiagramStep';
  sid?: Maybe<Scalars['ID']>;
  key: Scalars['String'];
  icon?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  subTitle?: Maybe<Scalars['String']>;
  qualifier?: Maybe<Scalars['String']>;
  commands?: Maybe<Array<WebCommand>>;
  position: DiagramCoordinates;
};

export type XchangeDiagramStepGroup = {
  __typename?: 'XchangeDiagramStepGroup';
  start: DiagramCoordinates;
  end: DiagramCoordinates;
};

export type XchangeFileProcessForm = {
  __typename?: 'XchangeFileProcessForm';
  sid?: Maybe<Scalars['ID']>;
  vendor: UiSelectOneField;
  specId: UiStringField;
  filenameQualifiers: UiSelectManyField;
  diagram: XchangeDiagram;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeFileTransmissionForm = {
  __typename?: 'XchangeFileTransmissionForm';
  sid?: Maybe<Scalars['ID']>;
  parentId?: Maybe<Scalars['ID']>;
  filenameQualifiers: UiSelectManyField;
  protocol: UiSelectOneField;
  host: UiStringField;
  port: UiIntField;
  userName: UiStringField;
  password: UiStringField;
  authKeyName: UiSelectOneField;
  folder: UiStringField;
  filenamePattern: UiStringField;
  stepWise: UiBooleanField;
  encryptionKeyName: UiSelectOneField;
  lastUpdated?: Maybe<UiReadOnlyField>;
  comments: UiStringField;
  options?: Maybe<Array<UiOptions>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeProfile = {
  __typename?: 'XchangeProfile';
  xchanges?: Maybe<Array<XchangeConfigSummary>>;
  globalXchangeAlerts?: Maybe<XchangeAlertSummary>;
  individualXchangeAlerts?: Maybe<Array<XchangeAlertSummary>>;
  comments?: Maybe<Scalars['String']>;
  hasUnpublishedChanges: Scalars['Boolean'];
  requiresConversion: Scalars['Boolean'];
  tooltips: XchangeProfileTooltips;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeProfileConvertPreview = {
  __typename?: 'XchangeProfileConvertPreview';
  info: Scalars['String'];
  newVendors?: Maybe<Array<Organization>>;
  newUserAccounts?: Maybe<Array<Scalars['String']>>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type XchangeProfileTooltips = {
  __typename?: 'XchangeProfileTooltips';
  inactive: Scalars['String'];
  hasUnpublishedChanges: Scalars['String'];
  hasAlerts: Scalars['String'];
  implementationPending: Scalars['String'];
  requiresConversion: Scalars['String'];
};

export type XchangeStepForm = {
  __typename?: 'XchangeStepForm';
  sid?: Maybe<Scalars['ID']>;
  xml: UiStringField;
  lastUpdated?: Maybe<UiReadOnlyField>;
  commands?: Maybe<Array<WebCommand>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type FragmentStatTypeFragment = (
  { __typename?: 'StatType' }
  & Pick<StatType, 'count' | 'facetTotal' | 'inTolerance' | 'toleranceMsg' | 'hold'>
);

export type RecordCountsFragmentFragment = (
  { __typename?: 'RecordCounts' }
  & Pick<RecordCounts, 'totalCount' | 'showUser'>
  & { recordCount?: Maybe<Array<(
    { __typename?: 'RecordCount' }
    & Pick<RecordCount, 'name' | 'count'>
  )>> }
);

export type ExtractParameterFragmentFragment = (
  { __typename?: 'ExtractParameter' }
  & Pick<ExtractParameter, 'label' | 'name' | 'value'>
);

export type FieldCreationFragmentFragment = (
  { __typename?: 'FieldCreationEvent' }
  & Pick<FieldCreationEvent, 'message' | 'name' | 'id' | 'value' | 'rawValue' | 'type'>
);

export type FragmentDashboardPeriodCountsFragment = (
  { __typename?: 'DashboardPeriodCounts' }
  & Pick<DashboardPeriodCounts, 'showCountsByPlanSponsor' | 'showCountsByFile' | 'transmissionCount' | 'billingUnitCount' | 'processErrorCount'>
  & { vendorTransmissions?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, vendorTransmissionsBySpec?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, planSponsorTransmissions?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, fileTransmissions?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, vendorProcessErrors?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, planSponsorProcessErrors?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>, fileProcessErrors?: Maybe<Array<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>> }
);

export type EnrollmentStatFragmentFragment = (
  { __typename?: 'EnrollmentStat' }
  & { insuredStat?: Maybe<(
    { __typename?: 'InsuredStat' }
    & InsuredStatFragmentFragment
  )>, excludedInsuredStat?: Maybe<(
    { __typename?: 'InsuredStat' }
    & InsuredStatFragmentFragment
  )>, excludedPlanInsuredStat?: Maybe<Array<(
    { __typename?: 'PlanInsuredStat' }
    & PlanInsuredStatFragmentFragment
  )>>, planInsuredStat?: Maybe<Array<(
    { __typename?: 'PlanInsuredStat' }
    & PlanInsuredStatFragmentFragment
  )>> }
);

export type InsuredStatFragmentFragment = (
  { __typename?: 'InsuredStat' }
  & { subscribers?: Maybe<(
    { __typename?: 'InsuredStatCount' }
    & InsuredStatCountFragmentFragment
  )>, dependents?: Maybe<(
    { __typename?: 'InsuredStatCount' }
    & InsuredStatCountFragmentFragment
  )> }
);

export type PlanInsuredStatFragmentFragment = (
  { __typename?: 'PlanInsuredStat' }
  & Pick<PlanInsuredStat, 'planCode' | 'planType'>
  & { subscribers?: Maybe<(
    { __typename?: 'InsuredStatCount' }
    & InsuredStatCountFragmentFragment
  )>, dependents?: Maybe<(
    { __typename?: 'InsuredStatCount' }
    & InsuredStatCountFragmentFragment
  )> }
);

export type InsuredStatCountFragmentFragment = (
  { __typename?: 'InsuredStatCount' }
  & Pick<InsuredStatCount, 'expectedTotal' | 'inTolerance' | 'toleranceMsg' | 'hold'>
  & { active?: Maybe<(
    { __typename?: 'StatInt' }
    & StatInFragmentFragment
  )>, ended?: Maybe<(
    { __typename?: 'StatInt' }
    & StatInFragmentFragment
  )> }
);

export type StatInFragmentFragment = (
  { __typename?: 'StatInt' }
  & Pick<StatInt, 'prior' | 'value'>
);

export type FragmentWebPageFragment = (
  { __typename?: 'WebPage' }
  & Pick<WebPage, 'type'>
  & { parameters?: Maybe<Array<(
    { __typename?: 'NVPStr' }
    & UnionNvp_NvpStr_Fragment
  ) | (
    { __typename?: 'NVPId' }
    & UnionNvp_NvpId_Fragment
  )>>, commands?: Maybe<Array<(
    { __typename?: 'WebNav' }
    & Pick<WebNav, 'label' | 'appDomain'>
    & { page?: Maybe<(
      { __typename?: 'WebPage' }
      & Pick<WebPage, 'type'>
      & { parameters?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )> }
  )>>, pivots?: Maybe<Array<(
    { __typename?: 'WebPivot' }
    & Pick<WebPivot, 'label' | 'type'>
  )>> }
);

export type FragmentWebNavFragment = (
  { __typename?: 'WebNav' }
  & Pick<WebNav, 'orgId' | 'label' | 'appDomain'>
  & { page?: Maybe<(
    { __typename?: 'WebPage' }
    & FragmentWebPageFragment
  )> }
);

type UnionNvp_NvpStr_Fragment = (
  { __typename: 'NVPStr' }
  & Pick<NvpStr, 'name'>
  & { strValue: NvpStr['value'] }
);

type UnionNvp_NvpId_Fragment = (
  { __typename: 'NVPId' }
  & Pick<NvpId, 'name'>
  & { idValue: NvpId['value'] }
);

export type UnionNvpFragment = UnionNvp_NvpStr_Fragment | UnionNvp_NvpId_Fragment;

export type FragmentAccessPolicyFragment = (
  { __typename?: 'AccessPolicy' }
  & Pick<AccessPolicy, 'sid' | 'name' | 'permissions' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
);

export type FragmentListPageInfoFragment = (
  { __typename?: 'ListPageInfo' }
  & Pick<ListPageInfo, 'pageHeaderLabel' | 'secondaryHeaderLabel'>
  & { pageCommands?: Maybe<Array<(
    { __typename?: 'WebCommand' }
    & FragmentWebCommandFragment
  )>>, listItemCommands?: Maybe<Array<(
    { __typename?: 'WebCommand' }
    & FragmentWebCommandFragment
  )>>, listItemBulkCommands?: Maybe<Array<(
    { __typename?: 'WebCommand' }
    & FragmentWebCommandFragment
  )>> }
);

export type FragmentWebCommandFragment = (
  { __typename?: 'WebCommand' }
  & Pick<WebCommand, 'endPoint' | 'label' | 'commandType'>
  & { parameters?: Maybe<Array<(
    { __typename?: 'NVPStr' }
    & Pick<NvpStr, 'name' | 'value'>
  )>> }
);

export type FragmentWorkPacketCommandFragment = (
  { __typename?: 'WorkPacketCommand' }
  & Pick<WorkPacketCommand, 'label' | 'commandType'>
);

export type FragmentPaginationInfoFragment = (
  { __typename?: 'PaginationInfo' }
  & Pick<PaginationInfo, 'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'>
);

export type FragmentUiOptionsFragment = (
  { __typename?: 'UIOptions' }
  & Pick<UiOptions, 'key'>
  & { values?: Maybe<Array<(
    { __typename?: 'UIOption' }
    & FragmentUiOptionFragment
  )>> }
);

export type FragmentUiOptionFragment = (
  { __typename?: 'UIOption' }
  & Pick<UiOption, 'label' | 'value' | 'info' | 'category'>
);

export type FragmentUiStringFieldFragment = (
  { __typename?: 'UIStringField' }
  & Pick<UiStringField, 'value' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentUiBooleanFieldFragment = (
  { __typename?: 'UIBooleanField' }
  & Pick<UiBooleanField, 'value' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentUiDateFieldFragment = (
  { __typename?: 'UIDateField' }
  & Pick<UiDateField, 'value' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentUiIntFieldFragment = (
  { __typename?: 'UIIntField' }
  & Pick<UiIntField, 'value' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentUiLongFieldFragment = (
  { __typename?: 'UILongField' }
  & Pick<UiLongField, 'value' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentUiSelectOneFieldFragment = (
  { __typename?: 'UISelectOneField' }
  & Pick<UiSelectOneField, 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
  & { value?: Maybe<(
    { __typename?: 'NVPStr' }
    & Pick<NvpStr, 'name' | 'value'>
  )> }
);

export type FragmentUiSelectManyFieldFragment = (
  { __typename?: 'UISelectManyField' }
  & Pick<UiSelectManyField, 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
  & { value?: Maybe<Array<(
    { __typename?: 'NVPStr' }
    & Pick<NvpStr, 'name' | 'value'>
  )>> }
);

export type FragmentUiReadOnlyFieldFragment = (
  { __typename?: 'UIReadOnlyField' }
  & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'readOnly' | 'info' | 'required' | 'visible' | 'inheritedFrom' | 'inheritedBy' | 'errCode' | 'errMsg' | 'errSeverity'>
);

export type FragmentXchangeConfigActivityFragment = (
  { __typename?: 'XchangeConfigActivity' }
  & Pick<XchangeConfigActivity, 'filesProcessed' | 'lastActivity'>
);

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'version'>
);

export type VerifyPasswordResetTokenQueryVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyPasswordResetTokenQuery = (
  { __typename?: 'Query' }
  & { verifyPasswordResetToken?: Maybe<(
    { __typename?: 'PasswordResetTokenResponse' }
    & Pick<PasswordResetTokenResponse, 'orgSid' | 'userSid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
  )> }
);

export type ExchangeActivityInProcessQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;


export type ExchangeActivityInProcessQuery = (
  { __typename?: 'Query' }
  & { exchangeActivityInProcess?: Maybe<(
    { __typename?: 'OrganizationLinkConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>> }
  )> }
);

export type ExchangeActivityTransmittedQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;


export type ExchangeActivityTransmittedQuery = (
  { __typename?: 'Query' }
  & { exchangeActivityTransmitted?: Maybe<(
    { __typename?: 'OrganizationLinkConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>> }
  )> }
);

export type ExchangeActivityErroredQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  searchText?: Maybe<Scalars['String']>;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;


export type ExchangeActivityErroredQuery = (
  { __typename?: 'Query' }
  & { exchangeActivityErrored?: Maybe<(
    { __typename?: 'OrganizationLinkConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>> }
  )> }
);

export type WorkPacketStatusDetailsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;


export type WorkPacketStatusDetailsQuery = (
  { __typename?: 'Query' }
  & { workPacketStatusDetails?: Maybe<(
    { __typename?: 'WorkPacketStatusDetails' }
    & Pick<WorkPacketStatusDetails, 'workOrderId' | 'inboundFilename' | 'timestamp' | 'orgSid' | 'orgId' | 'orgName' | 'vendorSid' | 'vendorId' | 'vendorName' | 'specId' | 'specImplName' | 'fingerPrint' | 'populationCount' | 'suppressBilling' | 'packetStatus' | 'inboundLabel' | 'outboundLabel' | 'clientFileArchivePath' | 'vendorFileArchivePath' | 'supplementalFilesArchivePaths'>
    & { deliveredFiles?: Maybe<Array<(
      { __typename?: 'DeliveredFile' }
      & Pick<DeliveredFile, 'filename' | 'fileSizeInBytes' | 'textSizeInBytes' | 'timeDelivered'>
      & { ftp?: Maybe<(
        { __typename?: 'DeliveredFileFTP' }
        & Pick<DeliveredFileFtp, 'protocol' | 'host' | 'username' | 'folder' | 'port'>
      )>, kcurl?: Maybe<(
        { __typename?: 'DeliveredKCURL' }
        & Pick<DeliveredKcurl, 'url'>
      )> }
    )>>, workStepStatus?: Maybe<Array<(
      { __typename?: 'WorkStepStatus' }
      & Pick<WorkStepStatus, 'stepStatus' | 'stepName' | 'stepType'>
      & { populationCount?: Maybe<(
        { __typename?: 'StatCountType' }
        & Pick<StatCountType, 'value'>
      )>, transformedArchiveFile?: Maybe<(
        { __typename?: 'ArchiveFileType' }
        & Pick<ArchiveFileType, 'value' | 'label'>
      )>, recordCounts?: Maybe<(
        { __typename?: 'RecordCounts' }
        & RecordCountsFragmentFragment
      )>, stepFile?: Maybe<Array<(
        { __typename?: 'ArchiveFileType' }
        & Pick<ArchiveFileType, 'value' | 'label'>
      )>>, nvp?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & Pick<NvpStr, 'name' | 'value'>
      )>>, commands?: Maybe<Array<(
        { __typename?: 'WorkPacketCommand' }
        & FragmentWorkPacketCommandFragment
      )>> }
    )>>, extractParameters?: Maybe<(
      { __typename?: 'ExtractParameters' }
      & { originalParameter?: Maybe<Array<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>>, overriddenParameter?: Maybe<Array<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>>, derivedParameter?: Maybe<Array<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>> }
    )>, qualityChecks?: Maybe<(
      { __typename?: 'QualityChecks' }
      & Pick<QualityChecks, 'totalRecordCount' | 'fieldCreationWarningCount' | 'fieldCreationErrorCount' | 'fieldCreationInfoCount' | 'hasMoreEvents'>
      & { sequenceCreationEvent?: Maybe<Array<(
        { __typename?: 'SequenceCreationEvent' }
        & Pick<SequenceCreationEvent, 'context' | 'unitId'>
        & { recordCreationEvent?: Maybe<Array<(
          { __typename?: 'RecordCreationEvent' }
          & Pick<RecordCreationEvent, 'context' | 'outerContext' | 'unitId'>
          & { error?: Maybe<Array<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>>, warning?: Maybe<Array<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>>, information?: Maybe<Array<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>> }
        )>> }
      )>>, accStructReqError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )>, clientSpecificReqError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )>, accStructTruncError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )>, reqError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )>, truncError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )>, codeListMappingError?: Maybe<(
        { __typename?: 'StatType' }
        & FragmentStatTypeFragment
      )> }
    )>, enrollmentStats?: Maybe<(
      { __typename?: 'EnrollmentStat' }
      & EnrollmentStatFragmentFragment
    )>, inboundEnrollmentStats?: Maybe<(
      { __typename?: 'EnrollmentStat' }
      & EnrollmentStatFragmentFragment
    )>, outboundEnrollmentStats?: Maybe<(
      { __typename?: 'EnrollmentStat' }
      & EnrollmentStatFragmentFragment
    )>, outboundRecordCounts?: Maybe<(
      { __typename?: 'RecordCounts' }
      & RecordCountsFragmentFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WorkPacketCommand' }
      & FragmentWorkPacketCommandFragment
    )>> }
  )> }
);

export type WorkPacketStatusQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;


export type WorkPacketStatusQuery = (
  { __typename?: 'Query' }
  & { workPacketStatus?: Maybe<(
    { __typename?: 'WorkPacketStatus' }
    & Pick<WorkPacketStatus, 'workOrderId' | 'timestamp' | 'orgId' | 'orgSid' | 'detailsPath' | 'inboundFilename' | 'vendorId' | 'vendorSid' | 'step' | 'stepStatus' | 'packetStatus' | 'reprocessedBy' | 'reprocessedOn' | 'restartReason' | 'recordHighlightCount' | 'populationCount' | 'recordHighlightType' | 'clientFileArchivePath' | 'vendorFileArchivePath' | 'vendorFilename' | 'feedType' | 'inboundDataType' | 'inboundDataSize' | 'version' | 'supplementalFilesArchivePaths' | 'archiveOnly' | 'hasErrors' | 'environment'>
    & { commands?: Maybe<Array<(
      { __typename?: 'WorkPacketCommand' }
      & FragmentWorkPacketCommandFragment
    )>> }
  )> }
);

export type WorkPacketStatusPollQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
  lastUpdated: Scalars['DateTime'];
}>;


export type WorkPacketStatusPollQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'workPacketStatusPoll'>
);

export type WorkPacketStatusesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput: PageableInput;
}>;


export type WorkPacketStatusesQuery = (
  { __typename?: 'Query' }
  & { workPacketStatuses?: Maybe<(
    { __typename?: 'WorkPacketStatusConnection' }
    & { listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'WorkPacketStatus' }
      & Pick<WorkPacketStatus, 'workOrderId' | 'timestamp' | 'orgId' | 'orgSid' | 'detailsPath' | 'inboundFilename' | 'vendorId' | 'vendorSid' | 'step' | 'stepStatus' | 'packetStatus' | 'reprocessedBy' | 'reprocessedOn' | 'restartReason' | 'recordHighlightCount' | 'populationCount' | 'recordHighlightType' | 'clientFileArchivePath' | 'vendorFileArchivePath' | 'vendorFilename' | 'feedType' | 'inboundDataType' | 'inboundDataSize' | 'version' | 'supplementalFilesArchivePaths' | 'archiveOnly' | 'hasErrors' | 'environment'>
      & { commands?: Maybe<Array<(
        { __typename?: 'WorkPacketCommand' }
        & FragmentWorkPacketCommandFragment
      )>> }
    )>> }
  )> }
);

export type WorkPacketStatusesPollQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  lastUpdated: Scalars['DateTime'];
}>;


export type WorkPacketStatusesPollQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'workPacketStatusesPoll'>
);

export type WpProcessErrorsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type WpProcessErrorsQuery = (
  { __typename?: 'Query' }
  & { wpProcessErrors?: Maybe<(
    { __typename?: 'WPProcessErrorConnection' }
    & { listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'WPProcessError' }
      & Pick<WpProcessError, 'id' | 'workOrderId' | 'startTime' | 'stepName' | 'orgSid' | 'planSponsorId' | 'vendorSid' | 'vendorId' | 'msg' | 'inboundFilename' | 'clientFileArchivePath' | 'environment'>
      & { commands?: Maybe<Array<(
        { __typename?: 'WorkPacketCommand' }
        & FragmentWorkPacketCommandFragment
      )>> }
    )>> }
  )> }
);

export type WpTransmissionsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type WpTransmissionsQuery = (
  { __typename?: 'Query' }
  & { wpTransmissions?: Maybe<(
    { __typename?: 'WPTransmissionConnection' }
    & { listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'WPTransmission' }
      & Pick<WpTransmission, 'id' | 'workOrderId' | 'deliveredOn' | 'orgSid' | 'planSponsorId' | 'vendorSid' | 'vendorId' | 'specId' | 'implementation' | 'inboundFilename' | 'outboundFilename' | 'outboundFilesize' | 'billingCount' | 'totalRecords' | 'extractType' | 'extractVersion' | 'environment'>
      & { commands?: Maybe<Array<(
        { __typename?: 'WorkPacketCommand' }
        & FragmentWorkPacketCommandFragment
      )>> }
    )>> }
  )> }
);

export type ScheduleOccurrencesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type ScheduleOccurrencesQuery = (
  { __typename?: 'Query' }
  & { scheduleOccurrences?: Maybe<(
    { __typename?: 'ScheduleOccurrenceConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'ScheduleOccurrence' }
      & Pick<ScheduleOccurrence, 'resource' | 'scheduleId' | 'orgSid' | 'timeScheduled' | 'schedOccurStatus' | 'schedOccurStatusLabel'>
      & { runOccurrences?: Maybe<Array<(
        { __typename?: 'ScheduleRunOccurrence' }
        & Pick<ScheduleRunOccurrence, 'workOrderId' | 'timeRan' | 'status' | 'statusLabel'>
        & { commands?: Maybe<Array<(
          { __typename?: 'WorkPacketCommand' }
          & FragmentWorkPacketCommandFragment
        )>> }
      )>> }
    )>> }
  )> }
);

export type DashboardPeriodsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type DashboardPeriodsQuery = (
  { __typename?: 'Query' }
  & { dashboardPeriods?: Maybe<(
    { __typename?: 'DashboardPeriods' }
    & { dailyCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & FragmentDashboardPeriodCountsFragment
    )>, yesterdayCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & FragmentDashboardPeriodCountsFragment
    )>, monthlyCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & FragmentDashboardPeriodCountsFragment
    )>, lastMonthlyCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & FragmentDashboardPeriodCountsFragment
    )> }
  )> }
);

export type DashboardPeriodCountsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
}>;


export type DashboardPeriodCountsQuery = (
  { __typename?: 'Query' }
  & { dashboardPeriodCounts?: Maybe<(
    { __typename?: 'DashboardPeriodCounts' }
    & Pick<DashboardPeriodCounts, 'showCountsByPlanSponsor' | 'showCountsByFile' | 'transmissionCount' | 'billingUnitCount' | 'processErrorCount'>
    & { vendorTransmissions?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, vendorTransmissionsBySpec?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, planSponsorTransmissions?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, fileTransmissions?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, vendorProcessErrors?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, planSponsorProcessErrors?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>>, fileProcessErrors?: Maybe<Array<(
      { __typename?: 'DashboardPeriodCount' }
      & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
    )>> }
  )> }
);

export type UsersForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type UsersForOrgQuery = (
  { __typename?: 'Query' }
  & { usersForOrg?: Maybe<(
    { __typename?: 'UserConnection' }
    & { userSearchForm?: Maybe<(
      { __typename?: 'UserSearchForm' }
      & { searchText?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, lockedFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, pendingActivationFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, expiredActivationFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, searchAllOrgs?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, toolTips?: Maybe<(
      { __typename?: 'UserConnectionTooltips' }
      & Pick<UserConnectionTooltips, 'accountLocked' | 'pendingActivation' | 'expiredActivation' | 'notificationOnlyUser'>
    )>, paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'UserItem' }
      & Pick<UserItem, 'accountLocked' | 'pendingActivation' | 'expiredActivation' | 'notificationOnlyUser' | 'orgId' | 'orgName'>
      & { item: (
        { __typename?: 'UserAccount' }
        & Pick<UserAccount, 'sid' | 'email'>
        & { person?: Maybe<(
          { __typename?: 'Person' }
          & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
        )>, accessPolicyGroups?: Maybe<Array<(
          { __typename?: 'AccessPolicyGroup' }
          & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
          & { policies?: Maybe<Array<(
            { __typename?: 'AccessPolicy' }
            & FragmentAccessPolicyFragment
          )>> }
        )>> }
      ), listItemCommands?: Maybe<Array<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>> }
    )>> }
  )> }
);

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { currentUser?: Maybe<(
    { __typename?: 'CurrentUserInfo' }
    & Pick<CurrentUserInfo, 'loggedIn'>
    & { domain?: Maybe<(
      { __typename?: 'WebAppDomain' }
      & Pick<WebAppDomain, 'type' | 'selectedPage'>
      & { navItems?: Maybe<Array<(
        { __typename?: 'WebNav' }
        & FragmentWebNavFragment
      )>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'orgName' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
      )> }
    )> }
  )> }
);

export type CurrentOrgNavQueryVariables = Exact<{
  orgInput?: Maybe<OrgSidInput>;
}>;


export type CurrentOrgNavQuery = (
  { __typename?: 'Query' }
  & { currentOrgNav?: Maybe<(
    { __typename?: 'WebNav' }
    & Pick<WebNav, 'orgId' | 'label' | 'appDomain'>
    & { page?: Maybe<(
      { __typename?: 'WebPage' }
      & FragmentWebPageFragment
    )>, subNavItems?: Maybe<Array<(
      { __typename?: 'WebNav' }
      & FragmentWebNavFragment
    )>> }
  )> }
);

export type UserThemeQueryVariables = Exact<{
  themeColorMode?: Maybe<ThemeColorMode>;
}>;


export type UserThemeQuery = (
  { __typename?: 'Query' }
  & { userTheme?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type FindUserByEmailQueryVariables = Exact<{
  userEmail: Scalars['String'];
}>;


export type FindUserByEmailQuery = (
  { __typename?: 'Query' }
  & { findUserByEmail?: Maybe<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'sid' | 'email'>
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
    )>, accessPolicyGroups?: Maybe<Array<(
      { __typename?: 'AccessPolicyGroup' }
      & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
      & { policies?: Maybe<Array<(
        { __typename?: 'AccessPolicy' }
        & FragmentAccessPolicyFragment
      )>> }
    )>> }
  )> }
);

export type UserAccountFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type UserAccountFormQuery = (
  { __typename?: 'Query' }
  & { userAccountForm?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type FindUserAccountQueryVariables = Exact<{
  userSid: Scalars['ID'];
}>;


export type FindUserAccountQuery = (
  { __typename?: 'Query' }
  & { findUserAccount?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type UserAccountAuditLogsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  changedUserSid?: Maybe<Scalars['ID']>;
  changedByUserSid?: Maybe<Scalars['ID']>;
  events?: Maybe<Array<UserAccountAuditEvent> | UserAccountAuditEvent>;
  dateRange: DateTimeRangeInput;
  pageableInput?: Maybe<PageableInput>;
}>;


export type UserAccountAuditLogsQuery = (
  { __typename?: 'Query' }
  & { userAccountAuditLogs?: Maybe<(
    { __typename?: 'UserAccountLogConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'UserAccountAuditLog' }
      & Pick<UserAccountAuditLog, 'auditDateTime' | 'event' | 'orgSid' | 'oldValue' | 'newValue' | 'workOrderId'>
      & { userAccount?: Maybe<(
        { __typename?: 'UserAccount' }
        & Pick<UserAccount, 'sid' | 'email'>
        & { person?: Maybe<(
          { __typename?: 'Person' }
          & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
        )> }
      )>, changedByUserAccount?: Maybe<(
        { __typename?: 'UserAccount' }
        & Pick<UserAccount, 'sid' | 'email'>
        & { person?: Maybe<(
          { __typename?: 'Person' }
          & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
        )> }
      )> }
    )>> }
  )> }
);

export type FindExternalUsersQueryVariables = Exact<{
  searchText?: Maybe<Scalars['String']>;
}>;


export type FindExternalUsersQuery = (
  { __typename?: 'Query' }
  & { findExternalUsers?: Maybe<Array<(
    { __typename?: 'UserAccount' }
    & Pick<UserAccount, 'sid' | 'email'>
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
    )>, accessPolicyGroups?: Maybe<Array<(
      { __typename?: 'AccessPolicyGroup' }
      & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
      & { policies?: Maybe<Array<(
        { __typename?: 'AccessPolicy' }
        & FragmentAccessPolicyFragment
      )>> }
    )>> }
  )>> }
);

export type ExternalUsersForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type ExternalUsersForOrgQuery = (
  { __typename?: 'Query' }
  & { externalUsersForOrg?: Maybe<(
    { __typename?: 'UserConnection' }
    & { userSearchForm?: Maybe<(
      { __typename?: 'UserSearchForm' }
      & { searchText?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, lockedFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, pendingActivationFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, expiredActivationFilter?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, searchAllOrgs?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, toolTips?: Maybe<(
      { __typename?: 'UserConnectionTooltips' }
      & Pick<UserConnectionTooltips, 'accountLocked' | 'pendingActivation' | 'expiredActivation' | 'notificationOnlyUser'>
    )>, paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'UserItem' }
      & Pick<UserItem, 'accountLocked' | 'pendingActivation' | 'expiredActivation' | 'notificationOnlyUser' | 'orgId' | 'orgName'>
      & { item: (
        { __typename?: 'UserAccount' }
        & Pick<UserAccount, 'sid' | 'email'>
        & { person?: Maybe<(
          { __typename?: 'Person' }
          & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
        )>, accessPolicyGroups?: Maybe<Array<(
          { __typename?: 'AccessPolicyGroup' }
          & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
          & { policies?: Maybe<Array<(
            { __typename?: 'AccessPolicy' }
            & FragmentAccessPolicyFragment
          )>> }
        )>> }
      ), listItemCommands?: Maybe<Array<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>> }
    )>> }
  )> }
);

export type ExternalUserForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userSid: Scalars['ID'];
}>;


export type ExternalUserForOrgQuery = (
  { __typename?: 'Query' }
  & { externalUserForOrg?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type AccessPolicyQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
}>;


export type AccessPolicyQuery = (
  { __typename?: 'Query' }
  & { accessPolicy?: Maybe<(
    { __typename?: 'AccessPolicy' }
    & Pick<AccessPolicy, 'sid' | 'name' | 'permissions' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
  )> }
);

export type AccessPoliciesForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;


export type AccessPoliciesForOrgQuery = (
  { __typename?: 'Query' }
  & { accessPoliciesForOrg?: Maybe<(
    { __typename?: 'AccessPolicyConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'AccessPolicy' }
      & FragmentAccessPolicyFragment
    )>> }
  )> }
);

export type AccessPolicyTemplatesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type AccessPolicyTemplatesQuery = (
  { __typename?: 'Query' }
  & { accessPolicyTemplates?: Maybe<Array<(
    { __typename?: 'UIOption' }
    & Pick<UiOption, 'label' | 'value' | 'info' | 'category'>
  )>> }
);

export type AccessSpecializationsForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;


export type AccessSpecializationsForOrgQuery = (
  { __typename?: 'Query' }
  & { accessSpecializationsForOrg?: Maybe<(
    { __typename?: 'AccessSpecializationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'AccessSpecialization' }
      & Pick<AccessSpecialization, 'sid' | 'name'>
      & { filters?: Maybe<Array<(
        { __typename?: 'SpecializationFilter' }
        & Pick<SpecializationFilter, 'sid' | 'permission' | 'orgSids'>
      )>> }
    )>> }
  )> }
);

export type AccessPolicyGroupsForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;


export type AccessPolicyGroupsForOrgQuery = (
  { __typename?: 'Query' }
  & { accessPolicyGroupsForOrg?: Maybe<(
    { __typename?: 'AccessPolicyGroupConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'AccessPolicyGroup' }
      & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
      & { policies?: Maybe<Array<(
        { __typename?: 'AccessPolicy' }
        & FragmentAccessPolicyFragment
      )>> }
    )>> }
  )> }
);

export type AccessPolicyGroupTemplatesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type AccessPolicyGroupTemplatesQuery = (
  { __typename?: 'Query' }
  & { accessPolicyGroupTemplates?: Maybe<Array<(
    { __typename?: 'UIOption' }
    & Pick<UiOption, 'label' | 'value' | 'info' | 'category'>
  )>> }
);

export type AccessPolicyFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  templatePolicySid?: Maybe<Scalars['ID']>;
}>;


export type AccessPolicyFormQuery = (
  { __typename?: 'Query' }
  & { accessPolicyForm?: Maybe<(
    { __typename?: 'AccessPolicyForm' }
    & Pick<AccessPolicyForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type FindAccessPolicyQueryVariables = Exact<{
  policySid: Scalars['ID'];
}>;


export type FindAccessPolicyQuery = (
  { __typename?: 'Query' }
  & { findAccessPolicy?: Maybe<(
    { __typename?: 'AccessPolicyForm' }
    & Pick<AccessPolicyForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type AccessSpecializationFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type AccessSpecializationFormQuery = (
  { __typename?: 'Query' }
  & { accessSpecializationForm?: Maybe<(
    { __typename?: 'AccessSpecializationForm' }
    & Pick<AccessSpecializationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), filters?: Maybe<Array<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'permission' | 'label' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & FragmentUiSelectManyFieldFragment
      )> }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type FindAccessSpecializationQueryVariables = Exact<{
  specializationSid: Scalars['ID'];
}>;


export type FindAccessSpecializationQuery = (
  { __typename?: 'Query' }
  & { findAccessSpecialization?: Maybe<(
    { __typename?: 'AccessSpecializationForm' }
    & Pick<AccessSpecializationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), filters?: Maybe<Array<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'permission' | 'label' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & FragmentUiSelectManyFieldFragment
      )> }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type AccessPolicyGroupFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  templateGroupSid?: Maybe<Scalars['ID']>;
}>;


export type AccessPolicyGroupFormQuery = (
  { __typename?: 'Query' }
  & { accessPolicyGroupForm?: Maybe<(
    { __typename?: 'AccessPolicyGroupForm' }
    & Pick<AccessPolicyGroupForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), description: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type FindAccessPolicyGroupQueryVariables = Exact<{
  policyGroupSid: Scalars['ID'];
}>;


export type FindAccessPolicyGroupQuery = (
  { __typename?: 'Query' }
  & { findAccessPolicyGroup?: Maybe<(
    { __typename?: 'AccessPolicyGroupForm' }
    & Pick<AccessPolicyGroupForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), description: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type TopLevelOrgsByTypeQueryVariables = Exact<{
  orgType: OrgType;
}>;


export type TopLevelOrgsByTypeQuery = (
  { __typename?: 'Query' }
  & { topLevelOrgsByType?: Maybe<Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
  )>> }
);

export type OrgByIdQueryVariables = Exact<{
  orgSid?: Maybe<Scalars['ID']>;
  orgId: Scalars['String'];
}>;


export type OrgByIdQuery = (
  { __typename?: 'Query' }
  & { orgById?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
  )> }
);

export type DirectOrganizationsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type DirectOrganizationsQuery = (
  { __typename?: 'Query' }
  & { directOrganizations?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
    )>> }
  )> }
);

export type OrganizationFormQueryVariables = Exact<{
  orgOwnerSid: Scalars['ID'];
}>;


export type OrganizationFormQuery = (
  { __typename?: 'Query' }
  & { organizationForm?: Maybe<(
    { __typename?: 'OrganizationForm' }
    & Pick<OrganizationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgId: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgType?: Maybe<(
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    )>, active: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), whitelist?: Maybe<Array<(
      { __typename?: 'OrgWhitelistForm' }
      & Pick<OrgWhitelistForm, 'errCode' | 'errMsg' | 'errSeverity'>
      & { pattern: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type FindOrganizationQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type FindOrganizationQuery = (
  { __typename?: 'Query' }
  & { findOrganization?: Maybe<(
    { __typename?: 'OrganizationForm' }
    & Pick<OrganizationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgId: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgType?: Maybe<(
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    )>, active: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), whitelist?: Maybe<Array<(
      { __typename?: 'OrgWhitelistForm' }
      & Pick<OrgWhitelistForm, 'errCode' | 'errMsg' | 'errSeverity'>
      & { pattern: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type SearchOrganizationsQueryVariables = Exact<{
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type SearchOrganizationsQuery = (
  { __typename?: 'Query' }
  & { searchOrganizations?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
    )>> }
  )> }
);

export type OrganizationQuickSearchQueryVariables = Exact<{
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
}>;


export type OrganizationQuickSearchQuery = (
  { __typename?: 'Query' }
  & { organizationQuickSearch?: Maybe<Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
  )>> }
);

export type VendorQuickSearchQueryVariables = Exact<{
  orgOwnerSid: Scalars['ID'];
  searchText: Scalars['String'];
}>;


export type VendorQuickSearchQuery = (
  { __typename?: 'Query' }
  & { vendorQuickSearch?: Maybe<Array<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
  )>> }
);

export type OrgSecurityFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type OrgSecurityFormQuery = (
  { __typename?: 'Query' }
  & { orgSecurityForm?: Maybe<(
    { __typename?: 'OrgSecurityForm' }
    & Pick<OrgSecurityForm, 'orgSid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { forgotPasswordEnabled: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), forgotPasswordMsg: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), allowedEmailDomains: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type ExternalOrgsQueryVariables = Exact<{
  pageableInput?: Maybe<PageableInput>;
}>;


export type ExternalOrgsQuery = (
  { __typename?: 'Query' }
  & { externalOrgs?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & FragmentListPageInfoFragment
    )>, nodes?: Maybe<Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
    )>> }
  )> }
);

export type DashThemeColorForOrgQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type DashThemeColorForOrgQuery = (
  { __typename?: 'Query' }
  & { dashThemeColorForOrg?: Maybe<(
    { __typename?: 'DashThemeColorConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>> }
  )> }
);

export type DashSiteForOrgQueryVariables = Exact<{
  orgSidInput?: Maybe<OrgSidInput>;
}>;


export type DashSiteForOrgQuery = (
  { __typename?: 'Query' }
  & { dashSiteForOrg?: Maybe<(
    { __typename?: 'DashSite' }
    & Pick<DashSite, 'id' | 'active'>
  )> }
);

export type DashThemeColorQueryVariables = Exact<{
  ownedInputSid?: Maybe<OwnedInputSid>;
}>;


export type DashThemeColorQuery = (
  { __typename?: 'Query' }
  & { dashThemeColor?: Maybe<(
    { __typename?: 'DashThemeColor' }
    & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
  )> }
);

export type DashThemeColorByNameQueryVariables = Exact<{
  ownedInputName?: Maybe<OwnedInputName>;
}>;


export type DashThemeColorByNameQuery = (
  { __typename?: 'Query' }
  & { dashThemeColorByName?: Maybe<(
    { __typename?: 'DashThemeColor' }
    & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
  )> }
);

export type DefaultDashThemeForSiteQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
}>;


export type DefaultDashThemeForSiteQuery = (
  { __typename?: 'Query' }
  & { defaultDashThemeForSite?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type DefaultDashThemeForSitePageQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
}>;


export type DefaultDashThemeForSitePageQuery = (
  { __typename?: 'Query' }
  & { defaultDashThemeForSitePage?: Maybe<(
    { __typename?: 'DefaultDashThemePage' }
    & Pick<DefaultDashThemePage, 'themeColorModes' | 'themeFontSizes'>
    & { themeColorPalettes?: Maybe<Array<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>> }
  )> }
);

export type CurrentUserDashThemePageQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserDashThemePageQuery = (
  { __typename?: 'Query' }
  & { currentUserDashThemePage?: Maybe<(
    { __typename?: 'UserDashThemePage' }
    & Pick<UserDashThemePage, 'themeColorModes' | 'themeFontSizes'>
    & { themeColorPalettes?: Maybe<Array<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>>, dashTheme?: Maybe<(
      { __typename?: 'DashTheme' }
      & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
      & { dashThemeColor?: Maybe<(
        { __typename?: 'DashThemeColor' }
        & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
      )> }
    )> }
  )> }
);

export type NavigateToNewDomainQueryVariables = Exact<{
  domainNavInput?: Maybe<DomainNavInput>;
}>;


export type NavigateToNewDomainQuery = (
  { __typename?: 'Query' }
  & { navigateToNewDomain?: Maybe<(
    { __typename?: 'WebAppDomain' }
    & Pick<WebAppDomain, 'type' | 'selectedPage'>
    & { navItems?: Maybe<Array<(
      { __typename?: 'WebNav' }
      & { subNavItems?: Maybe<Array<(
        { __typename?: 'WebNav' }
        & FragmentWebNavFragment
      )>> }
      & FragmentWebNavFragment
    )>> }
  )> }
);

export type SimulateSessionExpirQueryVariables = Exact<{ [key: string]: never; }>;


export type SimulateSessionExpirQuery = (
  { __typename?: 'Query' }
  & { simulateSessionExpir?: Maybe<(
    { __typename?: 'LogOutInfo' }
    & Pick<LogOutInfo, 'successful'>
  )> }
);

export type PasswordRulesFormQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type PasswordRulesFormQuery = (
  { __typename?: 'Query' }
  & { passwordRulesForm?: Maybe<(
    { __typename?: 'PasswordRulesForm' }
    & Pick<PasswordRulesForm, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), mustAlwaysBeMet?: Maybe<(
      { __typename?: 'RequiredPasswordRuleSetForm' }
      & { mustNotContainWhiteSpace?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainUserName?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainNumericSequence?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustFollowLengthRequirements?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, maxLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainUpperCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minUpperCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainLowerCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLowerCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainNumericDigits?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minNumericDigits?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainSpecialCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minSpecialCharacters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotRepeatCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, maxAllowedRepeatedChars?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotReusePasswords?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordHistoryVariations?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotMatchExactDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotMatchPartialDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, someMustBeMet?: Maybe<(
      { __typename?: 'CompositePasswordRuleSetForm' }
      & { enabled?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordComplexity?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, requiredNumPassingRules?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotContainWhiteSpace?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainUserName?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainNumericSequence?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustFollowLengthRequirements?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, maxLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainUpperCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minUpperCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainLowerCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLowerCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainNumericDigits?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minNumericDigits?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainSpecialCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minSpecialCharacters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotRepeatCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, maxAllowedRepeatedChars?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotReusePasswords?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordHistoryVariations?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotMatchExactDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotMatchPartialDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, autoLockAccount?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, autoLockAfterFailedAttempts?: Maybe<(
      { __typename?: 'UIIntField' }
      & FragmentUiIntFieldFragment
    )>, autoUnlockAccount?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, autoUnlockAccountDelayMinutes?: Maybe<(
      { __typename?: 'UIIntField' }
      & FragmentUiIntFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type PasswordValidationQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userSid: Scalars['ID'];
  password: Scalars['String'];
}>;


export type PasswordValidationQuery = (
  { __typename?: 'Query' }
  & { passwordValidation?: Maybe<(
    { __typename?: 'PasswordValidation' }
    & Pick<PasswordValidation, 'passes'>
    & { mustAlwaysBeMet?: Maybe<(
      { __typename?: 'PasswordValidationGroup' }
      & Pick<PasswordValidationGroup, 'enabled' | 'requiredNumPassingRules' | 'passes'>
      & { rules: Array<(
        { __typename?: 'PasswordValidationRule' }
        & Pick<PasswordValidationRule, 'passes' | 'label'>
      )> }
    )>, passwordStrength?: Maybe<(
      { __typename?: 'PasswordValidationStrengthRule' }
      & Pick<PasswordValidationStrengthRule, 'passes' | 'minPasswordComplexity'>
    )>, someMustBeMet?: Maybe<(
      { __typename?: 'PasswordValidationGroup' }
      & Pick<PasswordValidationGroup, 'enabled' | 'requiredNumPassingRules' | 'passes'>
      & { rules: Array<(
        { __typename?: 'PasswordValidationRule' }
        & Pick<PasswordValidationRule, 'passes' | 'label'>
      )> }
    )> }
  )> }
);

export type XpsftpTestQueryVariables = Exact<{
  orgSid?: Maybe<Scalars['ID']>;
}>;


export type XpsftpTestQuery = (
  { __typename?: 'Query' }
  & { xpsftpTest?: Maybe<(
    { __typename?: 'XPSFTPTestPage' }
    & Pick<XpsftpTestPage, 'includeFileUpload'>
    & { xpSFTPForm: (
      { __typename?: 'XPSFTPForm' }
      & Pick<XpsftpForm, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { host?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, port?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, user?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, password?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, folder?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, stepWise?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, sshKeyPath?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, sshKeyPassword?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, options?: Maybe<Array<(
        { __typename?: 'UIOptions' }
        & FragmentUiOptionsFragment
      )>> }
    ), sendTestFileForm?: Maybe<(
      { __typename?: 'SFTPTestSendTestFileForm' }
      & { sendTestFile?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, testFileStrategy?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, fileName?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, fileBody?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )> }
    )> }
  )> }
);

export type ReprocessDialogQueryVariables = Exact<{
  workOrderId: Scalars['String'];
}>;


export type ReprocessDialogQuery = (
  { __typename?: 'Query' }
  & { reprocessDialog?: Maybe<(
    { __typename?: 'ReprocessDialog' }
    & Pick<ReprocessDialog, 'captureChangeReason' | 'title' | 'message'>
  )> }
);

export type XchangeProfileQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type XchangeProfileQuery = (
  { __typename?: 'Query' }
  & { xchangeProfile?: Maybe<(
    { __typename?: 'XchangeProfile' }
    & Pick<XchangeProfile, 'comments' | 'hasUnpublishedChanges' | 'requiresConversion' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { xchanges?: Maybe<Array<(
      { __typename?: 'XchangeConfigSummary' }
      & Pick<XchangeConfigSummary, 'vendorIds' | 'specIds' | 'coreFilename' | 'active' | 'hasUnpublishedChanges' | 'hasAlerts' | 'implementationPending'>
      & { uatActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), testActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), prodActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), errorActivity?: Maybe<(
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      )> }
    )>>, globalXchangeAlerts?: Maybe<(
      { __typename?: 'XchangeAlertSummary' }
      & Pick<XchangeAlertSummary, 'coreFilename' | 'numSubscribers' | 'hasUnpublishedChanges'>
    )>, individualXchangeAlerts?: Maybe<Array<(
      { __typename?: 'XchangeAlertSummary' }
      & Pick<XchangeAlertSummary, 'coreFilename' | 'numSubscribers' | 'hasUnpublishedChanges'>
    )>>, tooltips: (
      { __typename?: 'XchangeProfileTooltips' }
      & Pick<XchangeProfileTooltips, 'inactive' | 'hasUnpublishedChanges' | 'hasAlerts' | 'implementationPending' | 'requiresConversion'>
    ), commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type XchangeDetailsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  coreFilename: Scalars['String'];
}>;


export type XchangeDetailsQuery = (
  { __typename?: 'Query' }
  & { xchangeDetails?: Maybe<(
    { __typename?: 'XchangeConfigForm' }
    & Pick<XchangeConfigForm, 'sid' | 'requiresConversion' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { coreFilename: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), coreFilenamePattern: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), comments: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), processes?: Maybe<Array<(
      { __typename?: 'XchangeFileProcessForm' }
      & Pick<XchangeFileProcessForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { vendor: (
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      ), specId: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), filenameQualifiers: (
        { __typename?: 'UISelectManyField' }
        & FragmentUiSelectManyFieldFragment
      ), diagram: (
        { __typename?: 'XchangeDiagram' }
        & { steps?: Maybe<Array<(
          { __typename?: 'XchangeDiagramStep' }
          & Pick<XchangeDiagramStep, 'sid' | 'key' | 'icon' | 'title' | 'subTitle' | 'qualifier'>
          & { commands?: Maybe<Array<(
            { __typename?: 'WebCommand' }
            & FragmentWebCommandFragment
          )>>, position: (
            { __typename?: 'DiagramCoordinates' }
            & Pick<DiagramCoordinates, 'x' | 'y'>
          ) }
        )>>, stepGroups?: Maybe<Array<(
          { __typename?: 'XchangeDiagramStepGroup' }
          & { start: (
            { __typename?: 'DiagramCoordinates' }
            & Pick<DiagramCoordinates, 'x' | 'y'>
          ), end: (
            { __typename?: 'DiagramCoordinates' }
            & Pick<DiagramCoordinates, 'x' | 'y'>
          ) }
        )>>, transmissions?: Maybe<Array<(
          { __typename?: 'XchangeDiagramFileTransmission' }
          & Pick<XchangeDiagramFileTransmission, 'sid' | 'key' | 'protocol' | 'host' | 'qualifier'>
          & { commands?: Maybe<Array<(
            { __typename?: 'WebCommand' }
            & FragmentWebCommandFragment
          )>>, position: (
            { __typename?: 'DiagramCoordinates' }
            & Pick<DiagramCoordinates, 'x' | 'y'>
          ) }
        )>>, connectors?: Maybe<Array<(
          { __typename?: 'DiagramConnector' }
          & Pick<DiagramConnector, 'fromKey' | 'toKey'>
        )>> }
      ), options?: Maybe<Array<(
        { __typename?: 'UIOptions' }
        & FragmentUiOptionsFragment
      )>>, commands?: Maybe<Array<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>> }
    )>>, alerts?: Maybe<Array<(
      { __typename?: 'XchangeAlert' }
      & Pick<XchangeAlert, 'filenameQualifier' | 'alertTypes'>
      & { subscribers?: Maybe<Array<(
        { __typename?: 'XchangeAlertSubscriber' }
        & Pick<XchangeAlertSubscriber, 'sid' | 'email' | 'firstNm' | 'lastNm'>
      )>>, commands?: Maybe<Array<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>> }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type PreviewConvertXchangeProfileQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type PreviewConvertXchangeProfileQuery = (
  { __typename?: 'Query' }
  & { previewConvertXchangeProfile?: Maybe<(
    { __typename?: 'XchangeProfileConvertPreview' }
    & Pick<XchangeProfileConvertPreview, 'info' | 'newUserAccounts' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { newVendors?: Maybe<Array<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType' | 'orgTypeLabel'>
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type XchangeStepFormQueryVariables = Exact<{
  xchangeFileProcessSid: Scalars['ID'];
  sid?: Maybe<Scalars['ID']>;
}>;


export type XchangeStepFormQuery = (
  { __typename?: 'Query' }
  & { xchangeStepForm?: Maybe<(
    { __typename?: 'XchangeStepForm' }
    & Pick<XchangeStepForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { xml: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), lastUpdated?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type XchangeFileTransmissionFormQueryVariables = Exact<{
  xchangeFileProcessSid: Scalars['ID'];
  sid?: Maybe<Scalars['ID']>;
}>;


export type XchangeFileTransmissionFormQuery = (
  { __typename?: 'Query' }
  & { xchangeFileTransmissionForm?: Maybe<(
    { __typename?: 'XchangeFileTransmissionForm' }
    & Pick<XchangeFileTransmissionForm, 'sid' | 'parentId' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { filenameQualifiers: (
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    ), protocol: (
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    ), host: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), port: (
      { __typename?: 'UIIntField' }
      & FragmentUiIntFieldFragment
    ), userName: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), password: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), authKeyName: (
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    ), folder: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), filenamePattern: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), stepWise: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), encryptionKeyName: (
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    ), lastUpdated?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, comments: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type BeginLoginMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type BeginLoginMutation = (
  { __typename?: 'Mutation' }
  & { beginLogin?: Maybe<(
    { __typename?: 'LoginStep' }
    & Pick<LoginStep, 'userId' | 'step' | 'redirectPath' | 'forgotPasswordEnabled' | 'forgotPasswordMsg'>
    & { loginCompleteDomain?: Maybe<(
      { __typename?: 'WebAppDomain' }
      & Pick<WebAppDomain, 'type' | 'selectedPage'>
      & { navItems?: Maybe<Array<(
        { __typename?: 'WebNav' }
        & FragmentWebNavFragment
      )>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'orgName' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
      )> }
    )> }
  )> }
);

export type PasswordLoginMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;


export type PasswordLoginMutation = (
  { __typename?: 'Mutation' }
  & { passwordLogin?: Maybe<(
    { __typename?: 'LoginStep' }
    & Pick<LoginStep, 'step' | 'redirectPath' | 'forgotPasswordEnabled' | 'forgotPasswordMsg'>
    & { loginCompleteDomain?: Maybe<(
      { __typename?: 'WebAppDomain' }
      & Pick<WebAppDomain, 'type' | 'selectedPage'>
      & { navItems?: Maybe<Array<(
        { __typename?: 'WebNav' }
        & { subNavItems?: Maybe<Array<(
          { __typename?: 'WebNav' }
          & FragmentWebNavFragment
        )>> }
        & FragmentWebNavFragment
      )>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'orgName' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
      )> }
    )> }
  )> }
);

export type LogOutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogOutMutation = (
  { __typename?: 'Mutation' }
  & { logOut?: Maybe<(
    { __typename?: 'LogOutInfo' }
    & Pick<LogOutInfo, 'successful'>
  )> }
);

export type ForgotPasswordMutationVariables = Exact<{
  userId: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & { forgotPassword?: Maybe<(
    { __typename?: 'ForgotPasswordResponse' }
    & Pick<ForgotPasswordResponse, 'response' | 'responseMsg'>
  )> }
);

export type UpdateOwnPasswordMutationVariables = Exact<{
  updateOwnPasswordInput: UpdateOwnPasswordInput;
}>;


export type UpdateOwnPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateOwnPassword?: Maybe<(
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'orgName' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
  )> }
);

export type ResetPasswordMutationVariables = Exact<{
  userSid: Scalars['ID'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'resetPassword'>
);

export type UpdatePasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;


export type UpdatePasswordMutation = (
  { __typename?: 'Mutation' }
  & { updatePassword?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type CreateOrgMutationVariables = Exact<{
  orgInfo: CreateOrgInput;
}>;


export type CreateOrgMutation = (
  { __typename?: 'Mutation' }
  & { createOrg?: Maybe<(
    { __typename?: 'OrganizationForm' }
    & Pick<OrganizationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgId: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgType?: Maybe<(
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    )>, active: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), whitelist?: Maybe<Array<(
      { __typename?: 'OrgWhitelistForm' }
      & Pick<OrgWhitelistForm, 'errCode' | 'errMsg' | 'errSeverity'>
      & { pattern: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateOrgMutationVariables = Exact<{
  orgInfo: UpdateOrgInput;
}>;


export type UpdateOrgMutation = (
  { __typename?: 'Mutation' }
  & { updateOrg?: Maybe<(
    { __typename?: 'OrganizationForm' }
    & Pick<OrganizationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgId: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), orgType?: Maybe<(
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    )>, active: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), whitelist?: Maybe<Array<(
      { __typename?: 'OrgWhitelistForm' }
      & Pick<OrgWhitelistForm, 'errCode' | 'errMsg' | 'errSeverity'>
      & { pattern: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type DeactivateOrgMutationVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type DeactivateOrgMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deactivateOrg'>
);

export type UpdateOrgSecurityMutationVariables = Exact<{
  orgSecurityInfo: UpdateOrgSecurityInput;
}>;


export type UpdateOrgSecurityMutation = (
  { __typename?: 'Mutation' }
  & { updateOrgSecurity?: Maybe<(
    { __typename?: 'OrgSecurityForm' }
    & Pick<OrgSecurityForm, 'orgSid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { forgotPasswordEnabled: (
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    ), forgotPasswordMsg: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), allowedEmailDomains: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type CreateAccessPolicyMutationVariables = Exact<{
  createAccessPolicyInput: CreateAccessPolicyInput;
}>;


export type CreateAccessPolicyMutation = (
  { __typename?: 'Mutation' }
  & { createAccessPolicy?: Maybe<(
    { __typename?: 'AccessPolicyForm' }
    & Pick<AccessPolicyForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateAccessPolicyMutationVariables = Exact<{
  updateAccessPolicyInput?: Maybe<UpdateAccessPolicyInput>;
}>;


export type UpdateAccessPolicyMutation = (
  { __typename?: 'Mutation' }
  & { updateAccessPolicy?: Maybe<(
    { __typename?: 'AccessPolicyForm' }
    & Pick<AccessPolicyForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type DeleteAccessPoliciesMutationVariables = Exact<{
  deleteAccessPoliciesInput?: Maybe<DeleteAccessPoliciesInput>;
}>;


export type DeleteAccessPoliciesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccessPolicies'>
);

export type DeleteAccessPolicyMutationVariables = Exact<{
  policySid: Scalars['ID'];
}>;


export type DeleteAccessPolicyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccessPolicy'>
);

export type CreateAccessSpecializationMutationVariables = Exact<{
  createAccessSpecializationInput: CreateAccessSpecializationInput;
}>;


export type CreateAccessSpecializationMutation = (
  { __typename?: 'Mutation' }
  & { createAccessSpecialization?: Maybe<(
    { __typename?: 'AccessSpecializationForm' }
    & Pick<AccessSpecializationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), filters?: Maybe<Array<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'permission' | 'label' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & FragmentUiSelectManyFieldFragment
      )> }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateAccessSpecializationMutationVariables = Exact<{
  updateAccessSpecializationInput?: Maybe<UpdateAccessSpecializationInput>;
}>;


export type UpdateAccessSpecializationMutation = (
  { __typename?: 'Mutation' }
  & { updateAccessSpecialization?: Maybe<(
    { __typename?: 'AccessSpecializationForm' }
    & Pick<AccessSpecializationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), filters?: Maybe<Array<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'permission' | 'label' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & FragmentUiSelectManyFieldFragment
      )> }
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type DeleteAccessSpecializationMutationVariables = Exact<{
  specializationSid: Scalars['ID'];
}>;


export type DeleteAccessSpecializationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccessSpecialization'>
);

export type CreateAccessPolicyGroupMutationVariables = Exact<{
  createAccessPolicyGroupInput: CreateAccessPolicyGroupInput;
}>;


export type CreateAccessPolicyGroupMutation = (
  { __typename?: 'Mutation' }
  & { createAccessPolicyGroup?: Maybe<(
    { __typename?: 'AccessPolicyGroupForm' }
    & Pick<AccessPolicyGroupForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), description: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateAccessPolicyGroupMutationVariables = Exact<{
  updateAccessPolicyGroupInput?: Maybe<UpdateAccessPolicyGroupInput>;
}>;


export type UpdateAccessPolicyGroupMutation = (
  { __typename?: 'Mutation' }
  & { updateAccessPolicyGroup?: Maybe<(
    { __typename?: 'AccessPolicyGroupForm' }
    & Pick<AccessPolicyGroupForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), description: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type DeleteAccessPolicyGroupMutationVariables = Exact<{
  policyGroupSid: Scalars['ID'];
}>;


export type DeleteAccessPolicyGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteAccessPolicyGroup'>
);

export type CreateUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type UpdateUserMutationVariables = Exact<{
  userInfo: UpdateUserInput;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type UpdateUserAccessPolicyGroupsMutationVariables = Exact<{
  userAccessPolicyGroupUpdate?: Maybe<UpdateUserAccessPolicyGroupsInput>;
}>;


export type UpdateUserAccessPolicyGroupsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAccessPolicyGroups?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type DeactivateUserMutationVariables = Exact<{
  sidInput: SidInput;
}>;


export type DeactivateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deactivateUser'>
);

export type DeactivateUsersMutationVariables = Exact<{
  sidsInput: SidsInput;
}>;


export type DeactivateUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deactivateUsers'>
);

export type ActivateUserMutationVariables = Exact<{
  sidInput: SidInput;
}>;


export type ActivateUserMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'activateUser'>
);

export type ActivateUsersMutationVariables = Exact<{
  sidsInput: SidsInput;
}>;


export type ActivateUsersMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'activateUsers'>
);

export type GrantExternalUserAccessMutationVariables = Exact<{
  userInfo: GrantExternalUserInput;
}>;


export type GrantExternalUserAccessMutation = (
  { __typename?: 'Mutation' }
  & { grantExternalUserAccess?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type CreateExternalUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;


export type CreateExternalUserMutation = (
  { __typename?: 'Mutation' }
  & { createExternalUser?: Maybe<(
    { __typename?: 'UserAccountForm' }
    & Pick<UserAccountForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { email?: Maybe<(
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    )>, sendActivationEmail?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, lastLogin?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type RevokeExternalUserAccessMutationVariables = Exact<{
  orgSid: Scalars['ID'];
  userAccountSid: Scalars['ID'];
}>;


export type RevokeExternalUserAccessMutation = (
  { __typename?: 'Mutation' }
  & { revokeExternalUserAccess?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type CreateDashThemeColorMutationVariables = Exact<{
  createDashThemeColorInput: CreateDashThemeColorInput;
}>;


export type CreateDashThemeColorMutation = (
  { __typename?: 'Mutation' }
  & { createDashThemeColor?: Maybe<(
    { __typename?: 'DashThemeColor' }
    & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
  )> }
);

export type UpdateDashThemeColorMutationVariables = Exact<{
  updateDashThemeColorInput: UpdateDashThemeColorInput;
}>;


export type UpdateDashThemeColorMutation = (
  { __typename?: 'Mutation' }
  & { updateDashThemeColor?: Maybe<(
    { __typename?: 'DashThemeColor' }
    & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
  )> }
);

export type CreateDefaultDashThemeMutationVariables = Exact<{
  createDefaultDashThemeInput?: Maybe<CreateDefaultDashThemeInput>;
}>;


export type CreateDefaultDashThemeMutation = (
  { __typename?: 'Mutation' }
  & { createDefaultDashTheme?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type UpdateDefaultDashThemeMutationVariables = Exact<{
  updateDefaultDashThemeInput?: Maybe<UpdateDefaultDashThemeInput>;
}>;


export type UpdateDefaultDashThemeMutation = (
  { __typename?: 'Mutation' }
  & { updateDefaultDashTheme?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type RemoveDashThemeColorMutationVariables = Exact<{
  ownedInputSid?: Maybe<OwnedInputSid>;
}>;


export type RemoveDashThemeColorMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeDashThemeColor'>
);

export type RemoveDefaultDashThemeMutationVariables = Exact<{
  ownedInputSid?: Maybe<OwnedInputSid>;
}>;


export type RemoveDefaultDashThemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeDefaultDashTheme'>
);

export type SetDashThemeColorDefaultMutationVariables = Exact<{
  dashThemeColorDefaultInput?: Maybe<DashThemeColorDefaultInput>;
}>;


export type SetDashThemeColorDefaultMutation = (
  { __typename?: 'Mutation' }
  & { setDashThemeColorDefault?: Maybe<(
    { __typename?: 'DashThemeColor' }
    & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
  )> }
);

export type CreateOrUpdateOwnDashThemeMutationVariables = Exact<{
  dashThemeInput?: Maybe<DashThemeInput>;
}>;


export type CreateOrUpdateOwnDashThemeMutation = (
  { __typename?: 'Mutation' }
  & { createOrUpdateOwnDashTheme?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type SetOwnDashThemeFontSizeMutationVariables = Exact<{
  dashThemeInput?: Maybe<DashThemeInput>;
}>;


export type SetOwnDashThemeFontSizeMutation = (
  { __typename?: 'Mutation' }
  & { setOwnDashThemeFontSize?: Maybe<(
    { __typename?: 'DashTheme' }
    & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'>
    & { dashThemeColor?: Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )> }
  )> }
);

export type UpdatePasswordRulesMutationVariables = Exact<{
  passwordRulesInput?: Maybe<PasswordRulesInput>;
}>;


export type UpdatePasswordRulesMutation = (
  { __typename?: 'Mutation' }
  & { updatePasswordRules?: Maybe<(
    { __typename?: 'PasswordRulesForm' }
    & Pick<PasswordRulesForm, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { organization: (
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    ), mustAlwaysBeMet?: Maybe<(
      { __typename?: 'RequiredPasswordRuleSetForm' }
      & { mustNotContainWhiteSpace?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainUserName?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainNumericSequence?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustFollowLengthRequirements?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, maxLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainUpperCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minUpperCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainLowerCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLowerCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainNumericDigits?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minNumericDigits?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainSpecialCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minSpecialCharacters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotRepeatCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, maxAllowedRepeatedChars?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotReusePasswords?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordHistoryVariations?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotMatchExactDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotMatchPartialDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, someMustBeMet?: Maybe<(
      { __typename?: 'CompositePasswordRuleSetForm' }
      & { enabled?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordComplexity?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, requiredNumPassingRules?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotContainWhiteSpace?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainUserName?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotContainNumericSequence?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustFollowLengthRequirements?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, maxLength?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainUpperCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minUpperCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainLowerCaseLetters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minLowerCaseLetters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainNumericDigits?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minNumericDigits?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustContainSpecialCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minSpecialCharacters?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotRepeatCharacters?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, maxAllowedRepeatedChars?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotReusePasswords?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, minPasswordHistoryVariations?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, mustNotMatchExactDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, mustNotMatchPartialDictionaryWord?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )> }
    )>, autoLockAccount?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, autoLockAfterFailedAttempts?: Maybe<(
      { __typename?: 'UIIntField' }
      & FragmentUiIntFieldFragment
    )>, autoUnlockAccount?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & FragmentUiBooleanFieldFragment
    )>, autoUnlockAccountDelayMinutes?: Maybe<(
      { __typename?: 'UIIntField' }
      & FragmentUiIntFieldFragment
    )>, options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>> }
  )> }
);

export type ImplementationDeployMutationVariables = Exact<{ [key: string]: never; }>;


export type ImplementationDeployMutation = (
  { __typename?: 'Mutation' }
  & { implementationDeploy?: Maybe<(
    { __typename?: 'ImplementationDeployResponse' }
    & Pick<ImplementationDeployResponse, 'response' | 'timestamp' | 'references' | 'changes'>
  )> }
);

export type FtpTestMMutationVariables = Exact<{
  xpsftp: XsftpInput;
  sendTestFile?: Maybe<SftpTestSendTestFile>;
  testFile?: Maybe<Scalars['Upload']>;
}>;


export type FtpTestMMutation = (
  { __typename?: 'Mutation' }
  & { ftpTestM?: Maybe<(
    { __typename?: 'SFTPConfigSubscriptionResponse' }
    & Pick<SftpConfigSubscriptionResponse, 'status' | 'clientProfileSnippet' | 'csvLog' | 'includeFileUpload'>
    & { logMessage: (
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    ), allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>>, xpSFTPForm?: Maybe<(
      { __typename?: 'XPSFTPForm' }
      & Pick<XpsftpForm, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { host?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, port?: Maybe<(
        { __typename?: 'UIIntField' }
        & FragmentUiIntFieldFragment
      )>, user?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, password?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, folder?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, stepWise?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, sshKeyPath?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, sshKeyPassword?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, options?: Maybe<Array<(
        { __typename?: 'UIOptions' }
        & FragmentUiOptionsFragment
      )>> }
    )>, sendTestFileForm?: Maybe<(
      { __typename?: 'SFTPTestSendTestFileForm' }
      & { sendTestFile?: Maybe<(
        { __typename?: 'UIBooleanField' }
        & FragmentUiBooleanFieldFragment
      )>, testFileStrategy?: Maybe<(
        { __typename?: 'UISelectOneField' }
        & FragmentUiSelectOneFieldFragment
      )>, fileName?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )>, fileBody?: Maybe<(
        { __typename?: 'UIStringField' }
        & FragmentUiStringFieldFragment
      )> }
    )> }
  )> }
);

export type WorkPacketRerunStepMutationVariables = Exact<{
  workOrderId: Scalars['String'];
  stepName: Scalars['String'];
  changeReason?: Maybe<ChangeReason>;
}>;


export type WorkPacketRerunStepMutation = (
  { __typename?: 'Mutation' }
  & { workPacketRerunStep?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type WorkPacketDeleteMutationVariables = Exact<{
  workOrderId: Scalars['String'];
}>;


export type WorkPacketDeleteMutation = (
  { __typename?: 'Mutation' }
  & { workPacketDelete?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type WorkPacketContinueMutationVariables = Exact<{
  workOrderId: Scalars['String'];
}>;


export type WorkPacketContinueMutation = (
  { __typename?: 'Mutation' }
  & { workPacketContinue?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type WorkPacketCancelMutationVariables = Exact<{
  workOrderId: Scalars['String'];
}>;


export type WorkPacketCancelMutation = (
  { __typename?: 'Mutation' }
  & { workPacketCancel?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type WorkPacketReprocessMutationVariables = Exact<{
  workOrderId: Scalars['String'];
  changeReason?: Maybe<ChangeReason>;
}>;


export type WorkPacketReprocessMutation = (
  { __typename?: 'Mutation' }
  & { workPacketReprocess?: Maybe<(
    { __typename?: 'ReprocessResponse' }
    & Pick<ReprocessResponse, 'newWorkOrderId' | 'orgSid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
  )> }
);

export type WorkPacketRenameAndReprocessMutationVariables = Exact<{
  workOrderId: Scalars['String'];
  newFileName: Scalars['String'];
}>;


export type WorkPacketRenameAndReprocessMutation = (
  { __typename?: 'Mutation' }
  & { workPacketRenameAndReprocess?: Maybe<(
    { __typename?: 'ReprocessResponse' }
    & Pick<ReprocessResponse, 'newWorkOrderId' | 'orgSid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
  )> }
);

export type WorkPacketResendMutationVariables = Exact<{
  workOrderId: Scalars['String'];
}>;


export type WorkPacketResendMutation = (
  { __typename?: 'Mutation' }
  & { workPacketResend?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type ConvertXchangeProfileMutationVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type ConvertXchangeProfileMutation = (
  { __typename?: 'Mutation' }
  & { convertXchangeProfile?: Maybe<(
    { __typename?: 'XchangeProfile' }
    & Pick<XchangeProfile, 'comments' | 'hasUnpublishedChanges' | 'requiresConversion' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { xchanges?: Maybe<Array<(
      { __typename?: 'XchangeConfigSummary' }
      & Pick<XchangeConfigSummary, 'vendorIds' | 'specIds' | 'coreFilename' | 'active' | 'hasUnpublishedChanges' | 'hasAlerts' | 'implementationPending'>
      & { uatActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), testActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), prodActivity: (
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      ), errorActivity?: Maybe<(
        { __typename?: 'XchangeConfigActivity' }
        & FragmentXchangeConfigActivityFragment
      )> }
    )>>, globalXchangeAlerts?: Maybe<(
      { __typename?: 'XchangeAlertSummary' }
      & Pick<XchangeAlertSummary, 'coreFilename' | 'numSubscribers' | 'hasUnpublishedChanges'>
    )>, individualXchangeAlerts?: Maybe<Array<(
      { __typename?: 'XchangeAlertSummary' }
      & Pick<XchangeAlertSummary, 'coreFilename' | 'numSubscribers' | 'hasUnpublishedChanges'>
    )>>, tooltips: (
      { __typename?: 'XchangeProfileTooltips' }
      & Pick<XchangeProfileTooltips, 'inactive' | 'hasUnpublishedChanges' | 'hasAlerts' | 'implementationPending' | 'requiresConversion'>
    ), commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateXchangeProfileCommentMutationVariables = Exact<{
  orgSid: Scalars['ID'];
  comment: Scalars['String'];
}>;


export type UpdateXchangeProfileCommentMutation = (
  { __typename?: 'Mutation' }
  & { updateXchangeProfileComment?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type PublishXchangeProfileMutationVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type PublishXchangeProfileMutation = (
  { __typename?: 'Mutation' }
  & { publishXchangeProfile?: Maybe<(
    { __typename?: 'GenericResponse' }
    & Pick<GenericResponse, 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { allMessages?: Maybe<Array<(
      { __typename?: 'LogMessage' }
      & Pick<LogMessage, 'timeStamp' | 'severity' | 'name' | 'body'>
      & { attributes?: Maybe<Array<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>> }
    )>> }
  )> }
);

export type CreateXchangeStepMutationVariables = Exact<{
  stepInput?: Maybe<CreateXchangeStepInput>;
}>;


export type CreateXchangeStepMutation = (
  { __typename?: 'Mutation' }
  & { createXchangeStep?: Maybe<(
    { __typename?: 'XchangeStepForm' }
    & Pick<XchangeStepForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { xml: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), lastUpdated?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type UpdateXchangeStepMutationVariables = Exact<{
  stepInput?: Maybe<UpdateXchangeStepInput>;
}>;


export type UpdateXchangeStepMutation = (
  { __typename?: 'Mutation' }
  & { updateXchangeStep?: Maybe<(
    { __typename?: 'XchangeStepForm' }
    & Pick<XchangeStepForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { xml: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), lastUpdated?: Maybe<(
      { __typename?: 'UIReadOnlyField' }
      & FragmentUiReadOnlyFieldFragment
    )>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export type CopyXchangeStepMutationVariables = Exact<{
  xchangeFileProcessSid: Scalars['ID'];
  sid: Scalars['ID'];
}>;


export type CopyXchangeStepMutation = (
  { __typename?: 'Mutation' }
  & { copyXchangeStep?: Maybe<(
    { __typename?: 'XchangeFileProcessForm' }
    & Pick<XchangeFileProcessForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { vendor: (
      { __typename?: 'UISelectOneField' }
      & FragmentUiSelectOneFieldFragment
    ), specId: (
      { __typename?: 'UIStringField' }
      & FragmentUiStringFieldFragment
    ), filenameQualifiers: (
      { __typename?: 'UISelectManyField' }
      & FragmentUiSelectManyFieldFragment
    ), diagram: (
      { __typename?: 'XchangeDiagram' }
      & { steps?: Maybe<Array<(
        { __typename?: 'XchangeDiagramStep' }
        & Pick<XchangeDiagramStep, 'sid' | 'key' | 'icon' | 'title' | 'subTitle' | 'qualifier'>
        & { commands?: Maybe<Array<(
          { __typename?: 'WebCommand' }
          & FragmentWebCommandFragment
        )>>, position: (
          { __typename?: 'DiagramCoordinates' }
          & Pick<DiagramCoordinates, 'x' | 'y'>
        ) }
      )>>, stepGroups?: Maybe<Array<(
        { __typename?: 'XchangeDiagramStepGroup' }
        & { start: (
          { __typename?: 'DiagramCoordinates' }
          & Pick<DiagramCoordinates, 'x' | 'y'>
        ), end: (
          { __typename?: 'DiagramCoordinates' }
          & Pick<DiagramCoordinates, 'x' | 'y'>
        ) }
      )>>, transmissions?: Maybe<Array<(
        { __typename?: 'XchangeDiagramFileTransmission' }
        & Pick<XchangeDiagramFileTransmission, 'sid' | 'key' | 'protocol' | 'host' | 'qualifier'>
        & { commands?: Maybe<Array<(
          { __typename?: 'WebCommand' }
          & FragmentWebCommandFragment
        )>>, position: (
          { __typename?: 'DiagramCoordinates' }
          & Pick<DiagramCoordinates, 'x' | 'y'>
        ) }
      )>>, connectors?: Maybe<Array<(
        { __typename?: 'DiagramConnector' }
        & Pick<DiagramConnector, 'fromKey' | 'toKey'>
      )>> }
    ), options?: Maybe<Array<(
      { __typename?: 'UIOptions' }
      & FragmentUiOptionsFragment
    )>>, commands?: Maybe<Array<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>> }
  )> }
);

export const FragmentStatTypeFragmentDoc = gql`
    fragment fragmentStatType on StatType {
  count
  facetTotal
  inTolerance
  toleranceMsg
  hold
}
    `;
export const RecordCountsFragmentFragmentDoc = gql`
    fragment recordCountsFragment on RecordCounts {
  totalCount
  showUser
  recordCount {
    name
    count
  }
}
    `;
export const ExtractParameterFragmentFragmentDoc = gql`
    fragment extractParameterFragment on ExtractParameter {
  label
  name
  value
}
    `;
export const FieldCreationFragmentFragmentDoc = gql`
    fragment fieldCreationFragment on FieldCreationEvent {
  message
  name
  id
  value
  rawValue
  type
}
    `;
export const FragmentDashboardPeriodCountsFragmentDoc = gql`
    fragment fragmentDashboardPeriodCounts on DashboardPeriodCounts {
  vendorTransmissions {
    name
    secondaryDescr
    count
    total
  }
  vendorTransmissionsBySpec {
    name
    secondaryDescr
    count
    total
  }
  planSponsorTransmissions {
    name
    secondaryDescr
    count
    total
  }
  fileTransmissions {
    name
    secondaryDescr
    count
    total
  }
  vendorProcessErrors {
    name
    secondaryDescr
    count
    total
  }
  planSponsorProcessErrors {
    name
    secondaryDescr
    count
    total
  }
  fileProcessErrors {
    name
    secondaryDescr
    count
    total
  }
  showCountsByPlanSponsor
  showCountsByFile
  transmissionCount
  billingUnitCount
  processErrorCount
}
    `;
export const StatInFragmentFragmentDoc = gql`
    fragment statInFragment on StatInt {
  prior
  value
}
    `;
export const InsuredStatCountFragmentFragmentDoc = gql`
    fragment insuredStatCountFragment on InsuredStatCount {
  active {
    ...statInFragment
  }
  ended {
    ...statInFragment
  }
  expectedTotal
  inTolerance
  toleranceMsg
  hold
}
    ${StatInFragmentFragmentDoc}`;
export const InsuredStatFragmentFragmentDoc = gql`
    fragment insuredStatFragment on InsuredStat {
  subscribers {
    ...insuredStatCountFragment
  }
  dependents {
    ...insuredStatCountFragment
  }
}
    ${InsuredStatCountFragmentFragmentDoc}`;
export const PlanInsuredStatFragmentFragmentDoc = gql`
    fragment planInsuredStatFragment on PlanInsuredStat {
  planCode
  planType
  subscribers {
    ...insuredStatCountFragment
  }
  dependents {
    ...insuredStatCountFragment
  }
}
    ${InsuredStatCountFragmentFragmentDoc}`;
export const EnrollmentStatFragmentFragmentDoc = gql`
    fragment enrollmentStatFragment on EnrollmentStat {
  insuredStat {
    ...insuredStatFragment
  }
  excludedInsuredStat {
    ...insuredStatFragment
  }
  excludedPlanInsuredStat {
    ...planInsuredStatFragment
  }
  planInsuredStat {
    ...planInsuredStatFragment
  }
}
    ${InsuredStatFragmentFragmentDoc}
${PlanInsuredStatFragmentFragmentDoc}`;
export const UnionNvpFragmentDoc = gql`
    fragment unionNVP on NVP {
  __typename
  ... on NVPStr {
    name
    strValue: value
  }
  ... on NVPId {
    name
    idValue: value
  }
}
    `;
export const FragmentWebPageFragmentDoc = gql`
    fragment fragmentWebPage on WebPage {
  type
  parameters {
    ...unionNVP
  }
  commands {
    label
    page {
      type
      parameters {
        ...unionNVP
      }
    }
    appDomain
  }
  pivots {
    label
    type
  }
}
    ${UnionNvpFragmentDoc}`;
export const FragmentWebNavFragmentDoc = gql`
    fragment fragmentWebNav on WebNav {
  orgId
  label
  page {
    ...fragmentWebPage
  }
  appDomain
}
    ${FragmentWebPageFragmentDoc}`;
export const FragmentAccessPolicyFragmentDoc = gql`
    fragment fragmentAccessPolicy on AccessPolicy {
  sid
  name
  permissions
  tmpl
  tmplUseAsIs
  applicableOrgTypes
}
    `;
export const FragmentWebCommandFragmentDoc = gql`
    fragment fragmentWebCommand on WebCommand {
  endPoint
  label
  parameters {
    name
    value
  }
  commandType
}
    `;
export const FragmentListPageInfoFragmentDoc = gql`
    fragment fragmentListPageInfo on ListPageInfo {
  pageHeaderLabel
  secondaryHeaderLabel
  pageCommands {
    ...fragmentWebCommand
  }
  listItemCommands {
    ...fragmentWebCommand
  }
  listItemBulkCommands {
    ...fragmentWebCommand
  }
}
    ${FragmentWebCommandFragmentDoc}`;
export const FragmentWorkPacketCommandFragmentDoc = gql`
    fragment fragmentWorkPacketCommand on WorkPacketCommand {
  label
  commandType
}
    `;
export const FragmentPaginationInfoFragmentDoc = gql`
    fragment fragmentPaginationInfo on PaginationInfo {
  totalPages
  totalElements
  pageNumber
  pageSize
}
    `;
export const FragmentUiOptionFragmentDoc = gql`
    fragment fragmentUIOption on UIOption {
  label
  value
  info
  category
}
    `;
export const FragmentUiOptionsFragmentDoc = gql`
    fragment fragmentUIOptions on UIOptions {
  key
  values {
    ...fragmentUIOption
  }
}
    ${FragmentUiOptionFragmentDoc}`;
export const FragmentUiStringFieldFragmentDoc = gql`
    fragment fragmentUIStringField on UIStringField {
  value
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  min
  max
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiBooleanFieldFragmentDoc = gql`
    fragment fragmentUIBooleanField on UIBooleanField {
  value
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiDateFieldFragmentDoc = gql`
    fragment fragmentUIDateField on UIDateField {
  value
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiIntFieldFragmentDoc = gql`
    fragment fragmentUIIntField on UIIntField {
  value
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  min
  max
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiLongFieldFragmentDoc = gql`
    fragment fragmentUILongField on UILongField {
  value
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  min
  max
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiSelectOneFieldFragmentDoc = gql`
    fragment fragmentUISelectOneField on UISelectOneField {
  value {
    name
    value
  }
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  options
  query
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiSelectManyFieldFragmentDoc = gql`
    fragment fragmentUISelectManyField on UISelectManyField {
  value {
    name
    value
  }
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  options
  query
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentUiReadOnlyFieldFragmentDoc = gql`
    fragment fragmentUIReadOnlyField on UIReadOnlyField {
  value
  description
  label
  readOnly
  info
  required
  visible
  inheritedFrom
  inheritedBy
  errCode
  errMsg
  errSeverity
}
    `;
export const FragmentXchangeConfigActivityFragmentDoc = gql`
    fragment fragmentXchangeConfigActivity on XchangeConfigActivity {
  filesProcessed
  lastActivity
}
    `;
export const VersionDocument = gql`
    query Version {
  version
}
    `;

/**
 * __useVersionQuery__
 *
 * To run a query within a React component, call `useVersionQuery` and pass it any options that fit your needs.
 * When your component renders, `useVersionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVersionQuery({
 *   variables: {
 *   },
 * });
 */
export function useVersionQuery(baseOptions?: Apollo.QueryHookOptions<VersionQuery, VersionQueryVariables>) {
        return Apollo.useQuery<VersionQuery, VersionQueryVariables>(VersionDocument, baseOptions);
      }
export function useVersionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VersionQuery, VersionQueryVariables>) {
          return Apollo.useLazyQuery<VersionQuery, VersionQueryVariables>(VersionDocument, baseOptions);
        }
export type VersionQueryHookResult = ReturnType<typeof useVersionQuery>;
export type VersionLazyQueryHookResult = ReturnType<typeof useVersionLazyQuery>;
export type VersionQueryResult = Apollo.QueryResult<VersionQuery, VersionQueryVariables>;
export const VerifyPasswordResetTokenDocument = gql`
    query VerifyPasswordResetToken($token: String!) {
  verifyPasswordResetToken(token: $token) {
    orgSid
    userSid
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

/**
 * __useVerifyPasswordResetTokenQuery__
 *
 * To run a query within a React component, call `useVerifyPasswordResetTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useVerifyPasswordResetTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVerifyPasswordResetTokenQuery({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyPasswordResetTokenQuery(baseOptions: Apollo.QueryHookOptions<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>) {
        return Apollo.useQuery<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>(VerifyPasswordResetTokenDocument, baseOptions);
      }
export function useVerifyPasswordResetTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>) {
          return Apollo.useLazyQuery<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>(VerifyPasswordResetTokenDocument, baseOptions);
        }
export type VerifyPasswordResetTokenQueryHookResult = ReturnType<typeof useVerifyPasswordResetTokenQuery>;
export type VerifyPasswordResetTokenLazyQueryHookResult = ReturnType<typeof useVerifyPasswordResetTokenLazyQuery>;
export type VerifyPasswordResetTokenQueryResult = Apollo.QueryResult<VerifyPasswordResetTokenQuery, VerifyPasswordResetTokenQueryVariables>;
export const ExchangeActivityInProcessDocument = gql`
    query ExchangeActivityInProcess($orgSidInput: OrgSidInput!, $searchText: String, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityInProcess(
    orgSidInput: $orgSidInput
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      orgId
      name
      type
      activityTime
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

/**
 * __useExchangeActivityInProcessQuery__
 *
 * To run a query within a React component, call `useExchangeActivityInProcessQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeActivityInProcessQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeActivityInProcessQuery({
 *   variables: {
 *      orgSidInput: // value for 'orgSidInput'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityInProcessQuery(baseOptions: Apollo.QueryHookOptions<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>) {
        return Apollo.useQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(ExchangeActivityInProcessDocument, baseOptions);
      }
export function useExchangeActivityInProcessLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>) {
          return Apollo.useLazyQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(ExchangeActivityInProcessDocument, baseOptions);
        }
export type ExchangeActivityInProcessQueryHookResult = ReturnType<typeof useExchangeActivityInProcessQuery>;
export type ExchangeActivityInProcessLazyQueryHookResult = ReturnType<typeof useExchangeActivityInProcessLazyQuery>;
export type ExchangeActivityInProcessQueryResult = Apollo.QueryResult<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>;
export const ExchangeActivityTransmittedDocument = gql`
    query ExchangeActivityTransmitted($orgSidInput: OrgSidInput!, $searchText: String, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityTransmitted(
    orgSidInput: $orgSidInput
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      orgId
      name
      type
      activityTime
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

/**
 * __useExchangeActivityTransmittedQuery__
 *
 * To run a query within a React component, call `useExchangeActivityTransmittedQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeActivityTransmittedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeActivityTransmittedQuery({
 *   variables: {
 *      orgSidInput: // value for 'orgSidInput'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityTransmittedQuery(baseOptions: Apollo.QueryHookOptions<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>) {
        return Apollo.useQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(ExchangeActivityTransmittedDocument, baseOptions);
      }
export function useExchangeActivityTransmittedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>) {
          return Apollo.useLazyQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(ExchangeActivityTransmittedDocument, baseOptions);
        }
export type ExchangeActivityTransmittedQueryHookResult = ReturnType<typeof useExchangeActivityTransmittedQuery>;
export type ExchangeActivityTransmittedLazyQueryHookResult = ReturnType<typeof useExchangeActivityTransmittedLazyQuery>;
export type ExchangeActivityTransmittedQueryResult = Apollo.QueryResult<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>;
export const ExchangeActivityErroredDocument = gql`
    query ExchangeActivityErrored($orgSidInput: OrgSidInput!, $searchText: String, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityErrored(
    orgSidInput: $orgSidInput
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      orgId
      name
      type
      activityTime
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

/**
 * __useExchangeActivityErroredQuery__
 *
 * To run a query within a React component, call `useExchangeActivityErroredQuery` and pass it any options that fit your needs.
 * When your component renders, `useExchangeActivityErroredQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExchangeActivityErroredQuery({
 *   variables: {
 *      orgSidInput: // value for 'orgSidInput'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityErroredQuery(baseOptions: Apollo.QueryHookOptions<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>) {
        return Apollo.useQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(ExchangeActivityErroredDocument, baseOptions);
      }
export function useExchangeActivityErroredLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>) {
          return Apollo.useLazyQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(ExchangeActivityErroredDocument, baseOptions);
        }
export type ExchangeActivityErroredQueryHookResult = ReturnType<typeof useExchangeActivityErroredQuery>;
export type ExchangeActivityErroredLazyQueryHookResult = ReturnType<typeof useExchangeActivityErroredLazyQuery>;
export type ExchangeActivityErroredQueryResult = Apollo.QueryResult<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>;
export const WorkPacketStatusDetailsDocument = gql`
    query WorkPacketStatusDetails($orgSid: ID!, $workOrderId: String!) {
  workPacketStatusDetails(orgSid: $orgSid, workOrderId: $workOrderId) {
    workOrderId
    inboundFilename
    timestamp
    orgSid
    orgId
    orgName
    vendorSid
    vendorId
    vendorName
    specId
    specImplName
    fingerPrint
    populationCount
    suppressBilling
    deliveredFiles {
      filename
      fileSizeInBytes
      textSizeInBytes
      timeDelivered
      ftp {
        protocol
        host
        username
        folder
        port
      }
      kcurl {
        url
      }
    }
    packetStatus
    workStepStatus {
      stepStatus
      stepName
      stepType
      populationCount {
        value
      }
      transformedArchiveFile {
        value
        label
      }
      recordCounts {
        ...recordCountsFragment
      }
      stepFile {
        value
        label
      }
      nvp {
        name
        value
      }
      commands {
        ...fragmentWorkPacketCommand
      }
    }
    extractParameters {
      originalParameter {
        ...extractParameterFragment
      }
      overriddenParameter {
        ...extractParameterFragment
      }
      derivedParameter {
        ...extractParameterFragment
      }
    }
    qualityChecks {
      sequenceCreationEvent {
        context
        unitId
        recordCreationEvent {
          context
          outerContext
          unitId
          error {
            ...fieldCreationFragment
          }
          warning {
            ...fieldCreationFragment
          }
          information {
            ...fieldCreationFragment
          }
        }
      }
      totalRecordCount
      fieldCreationWarningCount
      fieldCreationErrorCount
      fieldCreationInfoCount
      accStructReqError {
        ...fragmentStatType
      }
      clientSpecificReqError {
        ...fragmentStatType
      }
      accStructTruncError {
        ...fragmentStatType
      }
      reqError {
        ...fragmentStatType
      }
      truncError {
        ...fragmentStatType
      }
      codeListMappingError {
        ...fragmentStatType
      }
      hasMoreEvents
    }
    enrollmentStats {
      ...enrollmentStatFragment
    }
    inboundEnrollmentStats {
      ...enrollmentStatFragment
    }
    outboundEnrollmentStats {
      ...enrollmentStatFragment
    }
    outboundRecordCounts {
      ...recordCountsFragment
    }
    inboundLabel
    outboundLabel
    clientFileArchivePath
    vendorFileArchivePath
    supplementalFilesArchivePaths
    commands {
      ...fragmentWorkPacketCommand
    }
  }
}
    ${RecordCountsFragmentFragmentDoc}
${FragmentWorkPacketCommandFragmentDoc}
${ExtractParameterFragmentFragmentDoc}
${FieldCreationFragmentFragmentDoc}
${FragmentStatTypeFragmentDoc}
${EnrollmentStatFragmentFragmentDoc}`;

/**
 * __useWorkPacketStatusDetailsQuery__
 *
 * To run a query within a React component, call `useWorkPacketStatusDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketStatusDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkPacketStatusDetailsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketStatusDetailsQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(WorkPacketStatusDetailsDocument, baseOptions);
      }
export function useWorkPacketStatusDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(WorkPacketStatusDetailsDocument, baseOptions);
        }
export type WorkPacketStatusDetailsQueryHookResult = ReturnType<typeof useWorkPacketStatusDetailsQuery>;
export type WorkPacketStatusDetailsLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusDetailsLazyQuery>;
export type WorkPacketStatusDetailsQueryResult = Apollo.QueryResult<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>;
export const WorkPacketStatusDocument = gql`
    query WorkPacketStatus($orgSid: ID!, $workOrderId: String!) {
  workPacketStatus(orgSid: $orgSid, workOrderId: $workOrderId) {
    workOrderId
    timestamp
    orgId
    orgSid
    detailsPath
    inboundFilename
    vendorId
    vendorSid
    step
    stepStatus
    packetStatus
    reprocessedBy
    reprocessedOn
    restartReason
    recordHighlightCount
    populationCount
    recordHighlightType
    clientFileArchivePath
    vendorFileArchivePath
    vendorFilename
    feedType
    inboundDataType
    inboundDataSize
    version
    supplementalFilesArchivePaths
    archiveOnly
    hasErrors
    environment
    commands {
      ...fragmentWorkPacketCommand
    }
  }
}
    ${FragmentWorkPacketCommandFragmentDoc}`;

/**
 * __useWorkPacketStatusQuery__
 *
 * To run a query within a React component, call `useWorkPacketStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkPacketStatusQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketStatusQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(WorkPacketStatusDocument, baseOptions);
      }
export function useWorkPacketStatusLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(WorkPacketStatusDocument, baseOptions);
        }
export type WorkPacketStatusQueryHookResult = ReturnType<typeof useWorkPacketStatusQuery>;
export type WorkPacketStatusLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusLazyQuery>;
export type WorkPacketStatusQueryResult = Apollo.QueryResult<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>;
export const WorkPacketStatusPollDocument = gql`
    query WorkPacketStatusPoll($orgSid: ID!, $workOrderId: String!, $lastUpdated: DateTime!) {
  workPacketStatusPoll(
    orgSid: $orgSid
    workOrderId: $workOrderId
    lastUpdated: $lastUpdated
  )
}
    `;

/**
 * __useWorkPacketStatusPollQuery__
 *
 * To run a query within a React component, call `useWorkPacketStatusPollQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketStatusPollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkPacketStatusPollQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      workOrderId: // value for 'workOrderId'
 *      lastUpdated: // value for 'lastUpdated'
 *   },
 * });
 */
export function useWorkPacketStatusPollQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusPollQuery, WorkPacketStatusPollQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusPollQuery, WorkPacketStatusPollQueryVariables>(WorkPacketStatusPollDocument, baseOptions);
      }
export function useWorkPacketStatusPollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusPollQuery, WorkPacketStatusPollQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusPollQuery, WorkPacketStatusPollQueryVariables>(WorkPacketStatusPollDocument, baseOptions);
        }
export type WorkPacketStatusPollQueryHookResult = ReturnType<typeof useWorkPacketStatusPollQuery>;
export type WorkPacketStatusPollLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusPollLazyQuery>;
export type WorkPacketStatusPollQueryResult = Apollo.QueryResult<WorkPacketStatusPollQuery, WorkPacketStatusPollQueryVariables>;
export const WorkPacketStatusesDocument = gql`
    query WorkPacketStatuses($orgSid: ID!, $searchText: String, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput!) {
  workPacketStatuses(
    orgSid: $orgSid
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    listPageInfo {
      ...fragmentListPageInfo
    }
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      workOrderId
      timestamp
      orgId
      orgSid
      detailsPath
      inboundFilename
      vendorId
      vendorSid
      step
      stepStatus
      packetStatus
      reprocessedBy
      reprocessedOn
      restartReason
      recordHighlightCount
      populationCount
      recordHighlightType
      clientFileArchivePath
      vendorFileArchivePath
      vendorFilename
      feedType
      inboundDataType
      inboundDataSize
      version
      supplementalFilesArchivePaths
      archiveOnly
      hasErrors
      environment
      commands {
        ...fragmentWorkPacketCommand
      }
    }
  }
}
    ${FragmentListPageInfoFragmentDoc}
${FragmentPaginationInfoFragmentDoc}
${FragmentWorkPacketCommandFragmentDoc}`;

/**
 * __useWorkPacketStatusesQuery__
 *
 * To run a query within a React component, call `useWorkPacketStatusesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketStatusesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkPacketStatusesQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useWorkPacketStatusesQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(WorkPacketStatusesDocument, baseOptions);
      }
export function useWorkPacketStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(WorkPacketStatusesDocument, baseOptions);
        }
export type WorkPacketStatusesQueryHookResult = ReturnType<typeof useWorkPacketStatusesQuery>;
export type WorkPacketStatusesLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusesLazyQuery>;
export type WorkPacketStatusesQueryResult = Apollo.QueryResult<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>;
export const WorkPacketStatusesPollDocument = gql`
    query WorkPacketStatusesPoll($orgSid: ID!, $searchText: String, $dateRange: DateTimeRangeInput, $lastUpdated: DateTime!) {
  workPacketStatusesPoll(
    orgSid: $orgSid
    searchText: $searchText
    dateRange: $dateRange
    lastUpdated: $lastUpdated
  )
}
    `;

/**
 * __useWorkPacketStatusesPollQuery__
 *
 * To run a query within a React component, call `useWorkPacketStatusesPollQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketStatusesPollQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkPacketStatusesPollQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      lastUpdated: // value for 'lastUpdated'
 *   },
 * });
 */
export function useWorkPacketStatusesPollQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusesPollQuery, WorkPacketStatusesPollQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusesPollQuery, WorkPacketStatusesPollQueryVariables>(WorkPacketStatusesPollDocument, baseOptions);
      }
export function useWorkPacketStatusesPollLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusesPollQuery, WorkPacketStatusesPollQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusesPollQuery, WorkPacketStatusesPollQueryVariables>(WorkPacketStatusesPollDocument, baseOptions);
        }
export type WorkPacketStatusesPollQueryHookResult = ReturnType<typeof useWorkPacketStatusesPollQuery>;
export type WorkPacketStatusesPollLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusesPollLazyQuery>;
export type WorkPacketStatusesPollQueryResult = Apollo.QueryResult<WorkPacketStatusesPollQuery, WorkPacketStatusesPollQueryVariables>;
export const WpProcessErrorsDocument = gql`
    query WpProcessErrors($orgSid: ID!, $searchText: String, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  wpProcessErrors(
    orgSid: $orgSid
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    listPageInfo {
      ...fragmentListPageInfo
    }
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      workOrderId
      startTime
      stepName
      orgSid
      planSponsorId
      vendorSid
      vendorId
      msg
      inboundFilename
      clientFileArchivePath
      environment
      commands {
        ...fragmentWorkPacketCommand
      }
    }
  }
}
    ${FragmentListPageInfoFragmentDoc}
${FragmentPaginationInfoFragmentDoc}
${FragmentWorkPacketCommandFragmentDoc}`;

/**
 * __useWpProcessErrorsQuery__
 *
 * To run a query within a React component, call `useWpProcessErrorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWpProcessErrorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWpProcessErrorsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useWpProcessErrorsQuery(baseOptions: Apollo.QueryHookOptions<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>) {
        return Apollo.useQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, baseOptions);
      }
export function useWpProcessErrorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>) {
          return Apollo.useLazyQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, baseOptions);
        }
export type WpProcessErrorsQueryHookResult = ReturnType<typeof useWpProcessErrorsQuery>;
export type WpProcessErrorsLazyQueryHookResult = ReturnType<typeof useWpProcessErrorsLazyQuery>;
export type WpProcessErrorsQueryResult = Apollo.QueryResult<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>;
export const WpTransmissionsDocument = gql`
    query WpTransmissions($orgSid: ID!, $searchText: String, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  wpTransmissions(
    orgSid: $orgSid
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    listPageInfo {
      ...fragmentListPageInfo
    }
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      workOrderId
      deliveredOn
      orgSid
      planSponsorId
      vendorSid
      vendorId
      specId
      implementation
      inboundFilename
      outboundFilename
      outboundFilesize
      billingCount
      totalRecords
      extractType
      extractVersion
      environment
      commands {
        ...fragmentWorkPacketCommand
      }
    }
  }
}
    ${FragmentListPageInfoFragmentDoc}
${FragmentPaginationInfoFragmentDoc}
${FragmentWorkPacketCommandFragmentDoc}`;

/**
 * __useWpTransmissionsQuery__
 *
 * To run a query within a React component, call `useWpTransmissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWpTransmissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWpTransmissionsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      searchText: // value for 'searchText'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useWpTransmissionsQuery(baseOptions: Apollo.QueryHookOptions<WpTransmissionsQuery, WpTransmissionsQueryVariables>) {
        return Apollo.useQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, baseOptions);
      }
export function useWpTransmissionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WpTransmissionsQuery, WpTransmissionsQueryVariables>) {
          return Apollo.useLazyQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, baseOptions);
        }
export type WpTransmissionsQueryHookResult = ReturnType<typeof useWpTransmissionsQuery>;
export type WpTransmissionsLazyQueryHookResult = ReturnType<typeof useWpTransmissionsLazyQuery>;
export type WpTransmissionsQueryResult = Apollo.QueryResult<WpTransmissionsQuery, WpTransmissionsQueryVariables>;
export const ScheduleOccurrencesDocument = gql`
    query ScheduleOccurrences($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  scheduleOccurrences(
    orgSid: $orgSid
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      resource
      scheduleId
      orgSid
      timeScheduled
      schedOccurStatus
      schedOccurStatusLabel
      runOccurrences {
        workOrderId
        timeRan
        status
        statusLabel
        commands {
          ...fragmentWorkPacketCommand
        }
      }
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentWorkPacketCommandFragmentDoc}`;

/**
 * __useScheduleOccurrencesQuery__
 *
 * To run a query within a React component, call `useScheduleOccurrencesQuery` and pass it any options that fit your needs.
 * When your component renders, `useScheduleOccurrencesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useScheduleOccurrencesQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useScheduleOccurrencesQuery(baseOptions: Apollo.QueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>) {
        return Apollo.useQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(ScheduleOccurrencesDocument, baseOptions);
      }
export function useScheduleOccurrencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>) {
          return Apollo.useLazyQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(ScheduleOccurrencesDocument, baseOptions);
        }
export type ScheduleOccurrencesQueryHookResult = ReturnType<typeof useScheduleOccurrencesQuery>;
export type ScheduleOccurrencesLazyQueryHookResult = ReturnType<typeof useScheduleOccurrencesLazyQuery>;
export type ScheduleOccurrencesQueryResult = Apollo.QueryResult<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>;
export const DashboardPeriodsDocument = gql`
    query DashboardPeriods($orgSid: ID!) {
  dashboardPeriods(orgSid: $orgSid) {
    dailyCounts {
      ...fragmentDashboardPeriodCounts
    }
    yesterdayCounts {
      ...fragmentDashboardPeriodCounts
    }
    monthlyCounts {
      ...fragmentDashboardPeriodCounts
    }
    lastMonthlyCounts {
      ...fragmentDashboardPeriodCounts
    }
  }
}
    ${FragmentDashboardPeriodCountsFragmentDoc}`;

/**
 * __useDashboardPeriodsQuery__
 *
 * To run a query within a React component, call `useDashboardPeriodsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPeriodsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPeriodsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useDashboardPeriodsQuery(baseOptions: Apollo.QueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>) {
        return Apollo.useQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(DashboardPeriodsDocument, baseOptions);
      }
export function useDashboardPeriodsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>) {
          return Apollo.useLazyQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(DashboardPeriodsDocument, baseOptions);
        }
export type DashboardPeriodsQueryHookResult = ReturnType<typeof useDashboardPeriodsQuery>;
export type DashboardPeriodsLazyQueryHookResult = ReturnType<typeof useDashboardPeriodsLazyQuery>;
export type DashboardPeriodsQueryResult = Apollo.QueryResult<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>;
export const DashboardPeriodCountsDocument = gql`
    query DashboardPeriodCounts($orgSid: ID!, $dateRange: DateTimeRangeInput) {
  dashboardPeriodCounts(orgSid: $orgSid, dateRange: $dateRange) {
    vendorTransmissions {
      name
      secondaryDescr
      count
      total
    }
    vendorTransmissionsBySpec {
      name
      secondaryDescr
      count
      total
    }
    planSponsorTransmissions {
      name
      secondaryDescr
      count
      total
    }
    fileTransmissions {
      name
      secondaryDescr
      count
      total
    }
    vendorProcessErrors {
      name
      secondaryDescr
      count
      total
    }
    planSponsorProcessErrors {
      name
      secondaryDescr
      count
      total
    }
    fileProcessErrors {
      name
      secondaryDescr
      count
      total
    }
    showCountsByPlanSponsor
    showCountsByFile
    transmissionCount
    billingUnitCount
    processErrorCount
  }
}
    `;

/**
 * __useDashboardPeriodCountsQuery__
 *
 * To run a query within a React component, call `useDashboardPeriodCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashboardPeriodCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashboardPeriodCountsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      dateRange: // value for 'dateRange'
 *   },
 * });
 */
export function useDashboardPeriodCountsQuery(baseOptions: Apollo.QueryHookOptions<DashboardPeriodCountsQuery, DashboardPeriodCountsQueryVariables>) {
        return Apollo.useQuery<DashboardPeriodCountsQuery, DashboardPeriodCountsQueryVariables>(DashboardPeriodCountsDocument, baseOptions);
      }
export function useDashboardPeriodCountsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashboardPeriodCountsQuery, DashboardPeriodCountsQueryVariables>) {
          return Apollo.useLazyQuery<DashboardPeriodCountsQuery, DashboardPeriodCountsQueryVariables>(DashboardPeriodCountsDocument, baseOptions);
        }
export type DashboardPeriodCountsQueryHookResult = ReturnType<typeof useDashboardPeriodCountsQuery>;
export type DashboardPeriodCountsLazyQueryHookResult = ReturnType<typeof useDashboardPeriodCountsLazyQuery>;
export type DashboardPeriodCountsQueryResult = Apollo.QueryResult<DashboardPeriodCountsQuery, DashboardPeriodCountsQueryVariables>;
export const UsersForOrgDocument = gql`
    query UsersForOrg($orgSid: ID!, $userFilter: UserFilterInput, $pageableInput: PageableInput) {
  usersForOrg(
    orgSid: $orgSid
    userFilter: $userFilter
    pageableInput: $pageableInput
  ) {
    userSearchForm {
      searchText {
        ...fragmentUIStringField
      }
      lockedFilter {
        ...fragmentUIBooleanField
      }
      pendingActivationFilter {
        ...fragmentUIBooleanField
      }
      expiredActivationFilter {
        ...fragmentUIBooleanField
      }
      searchAllOrgs {
        ...fragmentUIBooleanField
      }
    }
    toolTips {
      accountLocked
      pendingActivation
      expiredActivation
      notificationOnlyUser
    }
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      item {
        sid
        email
        person {
          sid
          firstNm
          lastNm
        }
        accessPolicyGroups {
          sid
          name
          description
          tmpl
          tmplUseAsIs
          applicableOrgTypes
          policies {
            ...fragmentAccessPolicy
          }
        }
      }
      accountLocked
      pendingActivation
      expiredActivation
      notificationOnlyUser
      orgId
      orgName
      listItemCommands {
        ...fragmentWebCommand
      }
    }
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}
${FragmentAccessPolicyFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useUsersForOrgQuery__
 *
 * To run a query within a React component, call `useUsersForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      userFilter: // value for 'userFilter'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useUsersForOrgQuery(baseOptions: Apollo.QueryHookOptions<UsersForOrgQuery, UsersForOrgQueryVariables>) {
        return Apollo.useQuery<UsersForOrgQuery, UsersForOrgQueryVariables>(UsersForOrgDocument, baseOptions);
      }
export function useUsersForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersForOrgQuery, UsersForOrgQueryVariables>) {
          return Apollo.useLazyQuery<UsersForOrgQuery, UsersForOrgQueryVariables>(UsersForOrgDocument, baseOptions);
        }
export type UsersForOrgQueryHookResult = ReturnType<typeof useUsersForOrgQuery>;
export type UsersForOrgLazyQueryHookResult = ReturnType<typeof useUsersForOrgLazyQuery>;
export type UsersForOrgQueryResult = Apollo.QueryResult<UsersForOrgQuery, UsersForOrgQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    domain {
      type
      selectedPage
      navItems {
        ...fragmentWebNav
      }
    }
    tokenUser {
      token
      session {
        id
        orgId
        orgSid
        orgName
        userId
        firstNm
        pollInterval
        defaultAuthorities
      }
    }
    loggedIn
  }
}
    ${FragmentWebNavFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const CurrentOrgNavDocument = gql`
    query CurrentOrgNav($orgInput: OrgSidInput) {
  currentOrgNav(orgInput: $orgInput) {
    orgId
    label
    page {
      ...fragmentWebPage
    }
    appDomain
    subNavItems {
      ...fragmentWebNav
    }
  }
}
    ${FragmentWebPageFragmentDoc}
${FragmentWebNavFragmentDoc}`;

/**
 * __useCurrentOrgNavQuery__
 *
 * To run a query within a React component, call `useCurrentOrgNavQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentOrgNavQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentOrgNavQuery({
 *   variables: {
 *      orgInput: // value for 'orgInput'
 *   },
 * });
 */
export function useCurrentOrgNavQuery(baseOptions?: Apollo.QueryHookOptions<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>) {
        return Apollo.useQuery<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>(CurrentOrgNavDocument, baseOptions);
      }
export function useCurrentOrgNavLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>) {
          return Apollo.useLazyQuery<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>(CurrentOrgNavDocument, baseOptions);
        }
export type CurrentOrgNavQueryHookResult = ReturnType<typeof useCurrentOrgNavQuery>;
export type CurrentOrgNavLazyQueryHookResult = ReturnType<typeof useCurrentOrgNavLazyQuery>;
export type CurrentOrgNavQueryResult = Apollo.QueryResult<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>;
export const UserThemeDocument = gql`
    query UserTheme($themeColorMode: ThemeColorMode) {
  userTheme(themeColorMode: $themeColorMode) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;

/**
 * __useUserThemeQuery__
 *
 * To run a query within a React component, call `useUserThemeQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserThemeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserThemeQuery({
 *   variables: {
 *      themeColorMode: // value for 'themeColorMode'
 *   },
 * });
 */
export function useUserThemeQuery(baseOptions?: Apollo.QueryHookOptions<UserThemeQuery, UserThemeQueryVariables>) {
        return Apollo.useQuery<UserThemeQuery, UserThemeQueryVariables>(UserThemeDocument, baseOptions);
      }
export function useUserThemeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserThemeQuery, UserThemeQueryVariables>) {
          return Apollo.useLazyQuery<UserThemeQuery, UserThemeQueryVariables>(UserThemeDocument, baseOptions);
        }
export type UserThemeQueryHookResult = ReturnType<typeof useUserThemeQuery>;
export type UserThemeLazyQueryHookResult = ReturnType<typeof useUserThemeLazyQuery>;
export type UserThemeQueryResult = Apollo.QueryResult<UserThemeQuery, UserThemeQueryVariables>;
export const FindUserByEmailDocument = gql`
    query FindUserByEmail($userEmail: String!) {
  findUserByEmail(userEmail: $userEmail) {
    sid
    email
    person {
      sid
      firstNm
      lastNm
    }
    accessPolicyGroups {
      sid
      name
      description
      tmpl
      tmplUseAsIs
      applicableOrgTypes
      policies {
        ...fragmentAccessPolicy
      }
    }
  }
}
    ${FragmentAccessPolicyFragmentDoc}`;

/**
 * __useFindUserByEmailQuery__
 *
 * To run a query within a React component, call `useFindUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserByEmailQuery({
 *   variables: {
 *      userEmail: // value for 'userEmail'
 *   },
 * });
 */
export function useFindUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>) {
        return Apollo.useQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, baseOptions);
      }
export function useFindUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>) {
          return Apollo.useLazyQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, baseOptions);
        }
export type FindUserByEmailQueryHookResult = ReturnType<typeof useFindUserByEmailQuery>;
export type FindUserByEmailLazyQueryHookResult = ReturnType<typeof useFindUserByEmailLazyQuery>;
export type FindUserByEmailQueryResult = Apollo.QueryResult<FindUserByEmailQuery, FindUserByEmailQueryVariables>;
export const UserAccountFormDocument = gql`
    query UserAccountForm($orgSid: ID!) {
  userAccountForm(orgSid: $orgSid) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __useUserAccountFormQuery__
 *
 * To run a query within a React component, call `useUserAccountFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAccountFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAccountFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useUserAccountFormQuery(baseOptions: Apollo.QueryHookOptions<UserAccountFormQuery, UserAccountFormQueryVariables>) {
        return Apollo.useQuery<UserAccountFormQuery, UserAccountFormQueryVariables>(UserAccountFormDocument, baseOptions);
      }
export function useUserAccountFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAccountFormQuery, UserAccountFormQueryVariables>) {
          return Apollo.useLazyQuery<UserAccountFormQuery, UserAccountFormQueryVariables>(UserAccountFormDocument, baseOptions);
        }
export type UserAccountFormQueryHookResult = ReturnType<typeof useUserAccountFormQuery>;
export type UserAccountFormLazyQueryHookResult = ReturnType<typeof useUserAccountFormLazyQuery>;
export type UserAccountFormQueryResult = Apollo.QueryResult<UserAccountFormQuery, UserAccountFormQueryVariables>;
export const FindUserAccountDocument = gql`
    query FindUserAccount($userSid: ID!) {
  findUserAccount(userSid: $userSid) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __useFindUserAccountQuery__
 *
 * To run a query within a React component, call `useFindUserAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserAccountQuery({
 *   variables: {
 *      userSid: // value for 'userSid'
 *   },
 * });
 */
export function useFindUserAccountQuery(baseOptions: Apollo.QueryHookOptions<FindUserAccountQuery, FindUserAccountQueryVariables>) {
        return Apollo.useQuery<FindUserAccountQuery, FindUserAccountQueryVariables>(FindUserAccountDocument, baseOptions);
      }
export function useFindUserAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserAccountQuery, FindUserAccountQueryVariables>) {
          return Apollo.useLazyQuery<FindUserAccountQuery, FindUserAccountQueryVariables>(FindUserAccountDocument, baseOptions);
        }
export type FindUserAccountQueryHookResult = ReturnType<typeof useFindUserAccountQuery>;
export type FindUserAccountLazyQueryHookResult = ReturnType<typeof useFindUserAccountLazyQuery>;
export type FindUserAccountQueryResult = Apollo.QueryResult<FindUserAccountQuery, FindUserAccountQueryVariables>;
export const UserAccountAuditLogsDocument = gql`
    query UserAccountAuditLogs($orgSid: ID!, $changedUserSid: ID, $changedByUserSid: ID, $events: [UserAccountAuditEvent!], $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput) {
  userAccountAuditLogs(
    orgSid: $orgSid
    changedUserSid: $changedUserSid
    changedByUserSid: $changedByUserSid
    events: $events
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      auditDateTime
      event
      orgSid
      userAccount {
        sid
        email
        person {
          sid
          firstNm
          lastNm
        }
      }
      oldValue
      newValue
      workOrderId
      changedByUserAccount {
        sid
        email
        person {
          sid
          firstNm
          lastNm
        }
      }
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}`;

/**
 * __useUserAccountAuditLogsQuery__
 *
 * To run a query within a React component, call `useUserAccountAuditLogsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAccountAuditLogsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAccountAuditLogsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      changedUserSid: // value for 'changedUserSid'
 *      changedByUserSid: // value for 'changedByUserSid'
 *      events: // value for 'events'
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useUserAccountAuditLogsQuery(baseOptions: Apollo.QueryHookOptions<UserAccountAuditLogsQuery, UserAccountAuditLogsQueryVariables>) {
        return Apollo.useQuery<UserAccountAuditLogsQuery, UserAccountAuditLogsQueryVariables>(UserAccountAuditLogsDocument, baseOptions);
      }
export function useUserAccountAuditLogsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserAccountAuditLogsQuery, UserAccountAuditLogsQueryVariables>) {
          return Apollo.useLazyQuery<UserAccountAuditLogsQuery, UserAccountAuditLogsQueryVariables>(UserAccountAuditLogsDocument, baseOptions);
        }
export type UserAccountAuditLogsQueryHookResult = ReturnType<typeof useUserAccountAuditLogsQuery>;
export type UserAccountAuditLogsLazyQueryHookResult = ReturnType<typeof useUserAccountAuditLogsLazyQuery>;
export type UserAccountAuditLogsQueryResult = Apollo.QueryResult<UserAccountAuditLogsQuery, UserAccountAuditLogsQueryVariables>;
export const FindExternalUsersDocument = gql`
    query FindExternalUsers($searchText: String) {
  findExternalUsers(searchText: $searchText) {
    sid
    email
    person {
      sid
      firstNm
      lastNm
    }
    accessPolicyGroups {
      sid
      name
      description
      tmpl
      tmplUseAsIs
      applicableOrgTypes
      policies {
        ...fragmentAccessPolicy
      }
    }
  }
}
    ${FragmentAccessPolicyFragmentDoc}`;

/**
 * __useFindExternalUsersQuery__
 *
 * To run a query within a React component, call `useFindExternalUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindExternalUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindExternalUsersQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useFindExternalUsersQuery(baseOptions?: Apollo.QueryHookOptions<FindExternalUsersQuery, FindExternalUsersQueryVariables>) {
        return Apollo.useQuery<FindExternalUsersQuery, FindExternalUsersQueryVariables>(FindExternalUsersDocument, baseOptions);
      }
export function useFindExternalUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindExternalUsersQuery, FindExternalUsersQueryVariables>) {
          return Apollo.useLazyQuery<FindExternalUsersQuery, FindExternalUsersQueryVariables>(FindExternalUsersDocument, baseOptions);
        }
export type FindExternalUsersQueryHookResult = ReturnType<typeof useFindExternalUsersQuery>;
export type FindExternalUsersLazyQueryHookResult = ReturnType<typeof useFindExternalUsersLazyQuery>;
export type FindExternalUsersQueryResult = Apollo.QueryResult<FindExternalUsersQuery, FindExternalUsersQueryVariables>;
export const ExternalUsersForOrgDocument = gql`
    query ExternalUsersForOrg($orgSid: ID!, $searchText: String, $pageableInput: PageableInput) {
  externalUsersForOrg(
    orgSid: $orgSid
    searchText: $searchText
    pageableInput: $pageableInput
  ) {
    userSearchForm {
      searchText {
        ...fragmentUIStringField
      }
      lockedFilter {
        ...fragmentUIBooleanField
      }
      pendingActivationFilter {
        ...fragmentUIBooleanField
      }
      expiredActivationFilter {
        ...fragmentUIBooleanField
      }
      searchAllOrgs {
        ...fragmentUIBooleanField
      }
    }
    toolTips {
      accountLocked
      pendingActivation
      expiredActivation
      notificationOnlyUser
    }
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      item {
        sid
        email
        person {
          sid
          firstNm
          lastNm
        }
        accessPolicyGroups {
          sid
          name
          description
          tmpl
          tmplUseAsIs
          applicableOrgTypes
          policies {
            ...fragmentAccessPolicy
          }
        }
      }
      accountLocked
      pendingActivation
      expiredActivation
      notificationOnlyUser
      orgId
      orgName
      listItemCommands {
        ...fragmentWebCommand
      }
    }
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}
${FragmentAccessPolicyFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useExternalUsersForOrgQuery__
 *
 * To run a query within a React component, call `useExternalUsersForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalUsersForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalUsersForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      searchText: // value for 'searchText'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExternalUsersForOrgQuery(baseOptions: Apollo.QueryHookOptions<ExternalUsersForOrgQuery, ExternalUsersForOrgQueryVariables>) {
        return Apollo.useQuery<ExternalUsersForOrgQuery, ExternalUsersForOrgQueryVariables>(ExternalUsersForOrgDocument, baseOptions);
      }
export function useExternalUsersForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExternalUsersForOrgQuery, ExternalUsersForOrgQueryVariables>) {
          return Apollo.useLazyQuery<ExternalUsersForOrgQuery, ExternalUsersForOrgQueryVariables>(ExternalUsersForOrgDocument, baseOptions);
        }
export type ExternalUsersForOrgQueryHookResult = ReturnType<typeof useExternalUsersForOrgQuery>;
export type ExternalUsersForOrgLazyQueryHookResult = ReturnType<typeof useExternalUsersForOrgLazyQuery>;
export type ExternalUsersForOrgQueryResult = Apollo.QueryResult<ExternalUsersForOrgQuery, ExternalUsersForOrgQueryVariables>;
export const ExternalUserForOrgDocument = gql`
    query ExternalUserForOrg($orgSid: ID!, $userSid: ID!) {
  externalUserForOrg(orgSid: $orgSid, userSid: $userSid) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __useExternalUserForOrgQuery__
 *
 * To run a query within a React component, call `useExternalUserForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalUserForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalUserForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      userSid: // value for 'userSid'
 *   },
 * });
 */
export function useExternalUserForOrgQuery(baseOptions: Apollo.QueryHookOptions<ExternalUserForOrgQuery, ExternalUserForOrgQueryVariables>) {
        return Apollo.useQuery<ExternalUserForOrgQuery, ExternalUserForOrgQueryVariables>(ExternalUserForOrgDocument, baseOptions);
      }
export function useExternalUserForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExternalUserForOrgQuery, ExternalUserForOrgQueryVariables>) {
          return Apollo.useLazyQuery<ExternalUserForOrgQuery, ExternalUserForOrgQueryVariables>(ExternalUserForOrgDocument, baseOptions);
        }
export type ExternalUserForOrgQueryHookResult = ReturnType<typeof useExternalUserForOrgQuery>;
export type ExternalUserForOrgLazyQueryHookResult = ReturnType<typeof useExternalUserForOrgLazyQuery>;
export type ExternalUserForOrgQueryResult = Apollo.QueryResult<ExternalUserForOrgQuery, ExternalUserForOrgQueryVariables>;
export const AccessPolicyDocument = gql`
    query AccessPolicy($orgSid: ID!, $policySid: ID!) {
  accessPolicy(orgSid: $orgSid, policySid: $policySid) {
    sid
    name
    permissions
    tmpl
    tmplUseAsIs
    applicableOrgTypes
  }
}
    `;

/**
 * __useAccessPolicyQuery__
 *
 * To run a query within a React component, call `useAccessPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useAccessPolicyQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyQuery, AccessPolicyQueryVariables>) {
        return Apollo.useQuery<AccessPolicyQuery, AccessPolicyQueryVariables>(AccessPolicyDocument, baseOptions);
      }
export function useAccessPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyQuery, AccessPolicyQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyQuery, AccessPolicyQueryVariables>(AccessPolicyDocument, baseOptions);
        }
export type AccessPolicyQueryHookResult = ReturnType<typeof useAccessPolicyQuery>;
export type AccessPolicyLazyQueryHookResult = ReturnType<typeof useAccessPolicyLazyQuery>;
export type AccessPolicyQueryResult = Apollo.QueryResult<AccessPolicyQuery, AccessPolicyQueryVariables>;
export const AccessPoliciesForOrgDocument = gql`
    query AccessPoliciesForOrg($orgSid: ID!, $pageableInput: PageableInput) {
  accessPoliciesForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      ...fragmentAccessPolicy
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}
${FragmentAccessPolicyFragmentDoc}`;

/**
 * __useAccessPoliciesForOrgQuery__
 *
 * To run a query within a React component, call `useAccessPoliciesForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPoliciesForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPoliciesForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useAccessPoliciesForOrgQuery(baseOptions: Apollo.QueryHookOptions<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>) {
        return Apollo.useQuery<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>(AccessPoliciesForOrgDocument, baseOptions);
      }
export function useAccessPoliciesForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>) {
          return Apollo.useLazyQuery<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>(AccessPoliciesForOrgDocument, baseOptions);
        }
export type AccessPoliciesForOrgQueryHookResult = ReturnType<typeof useAccessPoliciesForOrgQuery>;
export type AccessPoliciesForOrgLazyQueryHookResult = ReturnType<typeof useAccessPoliciesForOrgLazyQuery>;
export type AccessPoliciesForOrgQueryResult = Apollo.QueryResult<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>;
export const AccessPolicyTemplatesDocument = gql`
    query AccessPolicyTemplates($orgSid: ID!) {
  accessPolicyTemplates(orgSid: $orgSid) {
    label
    value
    info
    category
  }
}
    `;

/**
 * __useAccessPolicyTemplatesQuery__
 *
 * To run a query within a React component, call `useAccessPolicyTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyTemplatesQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useAccessPolicyTemplatesQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyTemplatesQuery, AccessPolicyTemplatesQueryVariables>) {
        return Apollo.useQuery<AccessPolicyTemplatesQuery, AccessPolicyTemplatesQueryVariables>(AccessPolicyTemplatesDocument, baseOptions);
      }
export function useAccessPolicyTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyTemplatesQuery, AccessPolicyTemplatesQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyTemplatesQuery, AccessPolicyTemplatesQueryVariables>(AccessPolicyTemplatesDocument, baseOptions);
        }
export type AccessPolicyTemplatesQueryHookResult = ReturnType<typeof useAccessPolicyTemplatesQuery>;
export type AccessPolicyTemplatesLazyQueryHookResult = ReturnType<typeof useAccessPolicyTemplatesLazyQuery>;
export type AccessPolicyTemplatesQueryResult = Apollo.QueryResult<AccessPolicyTemplatesQuery, AccessPolicyTemplatesQueryVariables>;
export const AccessSpecializationsForOrgDocument = gql`
    query AccessSpecializationsForOrg($orgSid: ID!, $pageableInput: PageableInput) {
  accessSpecializationsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      sid
      name
      filters {
        sid
        permission
        orgSids
      }
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}`;

/**
 * __useAccessSpecializationsForOrgQuery__
 *
 * To run a query within a React component, call `useAccessSpecializationsForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessSpecializationsForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessSpecializationsForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useAccessSpecializationsForOrgQuery(baseOptions: Apollo.QueryHookOptions<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>) {
        return Apollo.useQuery<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>(AccessSpecializationsForOrgDocument, baseOptions);
      }
export function useAccessSpecializationsForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>) {
          return Apollo.useLazyQuery<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>(AccessSpecializationsForOrgDocument, baseOptions);
        }
export type AccessSpecializationsForOrgQueryHookResult = ReturnType<typeof useAccessSpecializationsForOrgQuery>;
export type AccessSpecializationsForOrgLazyQueryHookResult = ReturnType<typeof useAccessSpecializationsForOrgLazyQuery>;
export type AccessSpecializationsForOrgQueryResult = Apollo.QueryResult<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>;
export const AccessPolicyGroupsForOrgDocument = gql`
    query AccessPolicyGroupsForOrg($orgSid: ID!, $pageableInput: PageableInput) {
  accessPolicyGroupsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      sid
      name
      description
      tmpl
      tmplUseAsIs
      applicableOrgTypes
      policies {
        ...fragmentAccessPolicy
      }
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}
${FragmentAccessPolicyFragmentDoc}`;

/**
 * __useAccessPolicyGroupsForOrgQuery__
 *
 * To run a query within a React component, call `useAccessPolicyGroupsForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyGroupsForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyGroupsForOrgQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useAccessPolicyGroupsForOrgQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>) {
        return Apollo.useQuery<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>(AccessPolicyGroupsForOrgDocument, baseOptions);
      }
export function useAccessPolicyGroupsForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>(AccessPolicyGroupsForOrgDocument, baseOptions);
        }
export type AccessPolicyGroupsForOrgQueryHookResult = ReturnType<typeof useAccessPolicyGroupsForOrgQuery>;
export type AccessPolicyGroupsForOrgLazyQueryHookResult = ReturnType<typeof useAccessPolicyGroupsForOrgLazyQuery>;
export type AccessPolicyGroupsForOrgQueryResult = Apollo.QueryResult<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>;
export const AccessPolicyGroupTemplatesDocument = gql`
    query AccessPolicyGroupTemplates($orgSid: ID!) {
  accessPolicyGroupTemplates(orgSid: $orgSid) {
    label
    value
    info
    category
  }
}
    `;

/**
 * __useAccessPolicyGroupTemplatesQuery__
 *
 * To run a query within a React component, call `useAccessPolicyGroupTemplatesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyGroupTemplatesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyGroupTemplatesQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useAccessPolicyGroupTemplatesQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyGroupTemplatesQuery, AccessPolicyGroupTemplatesQueryVariables>) {
        return Apollo.useQuery<AccessPolicyGroupTemplatesQuery, AccessPolicyGroupTemplatesQueryVariables>(AccessPolicyGroupTemplatesDocument, baseOptions);
      }
export function useAccessPolicyGroupTemplatesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyGroupTemplatesQuery, AccessPolicyGroupTemplatesQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyGroupTemplatesQuery, AccessPolicyGroupTemplatesQueryVariables>(AccessPolicyGroupTemplatesDocument, baseOptions);
        }
export type AccessPolicyGroupTemplatesQueryHookResult = ReturnType<typeof useAccessPolicyGroupTemplatesQuery>;
export type AccessPolicyGroupTemplatesLazyQueryHookResult = ReturnType<typeof useAccessPolicyGroupTemplatesLazyQuery>;
export type AccessPolicyGroupTemplatesQueryResult = Apollo.QueryResult<AccessPolicyGroupTemplatesQuery, AccessPolicyGroupTemplatesQueryVariables>;
export const AccessPolicyFormDocument = gql`
    query AccessPolicyForm($orgSid: ID!, $templatePolicySid: ID) {
  accessPolicyForm(orgSid: $orgSid, templatePolicySid: $templatePolicySid) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    permissions {
      ...fragmentUISelectManyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useAccessPolicyFormQuery__
 *
 * To run a query within a React component, call `useAccessPolicyFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      templatePolicySid: // value for 'templatePolicySid'
 *   },
 * });
 */
export function useAccessPolicyFormQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>) {
        return Apollo.useQuery<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>(AccessPolicyFormDocument, baseOptions);
      }
export function useAccessPolicyFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>(AccessPolicyFormDocument, baseOptions);
        }
export type AccessPolicyFormQueryHookResult = ReturnType<typeof useAccessPolicyFormQuery>;
export type AccessPolicyFormLazyQueryHookResult = ReturnType<typeof useAccessPolicyFormLazyQuery>;
export type AccessPolicyFormQueryResult = Apollo.QueryResult<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>;
export const FindAccessPolicyDocument = gql`
    query FindAccessPolicy($policySid: ID!) {
  findAccessPolicy(policySid: $policySid) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    permissions {
      ...fragmentUISelectManyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useFindAccessPolicyQuery__
 *
 * To run a query within a React component, call `useFindAccessPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAccessPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAccessPolicyQuery({
 *   variables: {
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useFindAccessPolicyQuery(baseOptions: Apollo.QueryHookOptions<FindAccessPolicyQuery, FindAccessPolicyQueryVariables>) {
        return Apollo.useQuery<FindAccessPolicyQuery, FindAccessPolicyQueryVariables>(FindAccessPolicyDocument, baseOptions);
      }
export function useFindAccessPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAccessPolicyQuery, FindAccessPolicyQueryVariables>) {
          return Apollo.useLazyQuery<FindAccessPolicyQuery, FindAccessPolicyQueryVariables>(FindAccessPolicyDocument, baseOptions);
        }
export type FindAccessPolicyQueryHookResult = ReturnType<typeof useFindAccessPolicyQuery>;
export type FindAccessPolicyLazyQueryHookResult = ReturnType<typeof useFindAccessPolicyLazyQuery>;
export type FindAccessPolicyQueryResult = Apollo.QueryResult<FindAccessPolicyQuery, FindAccessPolicyQueryVariables>;
export const AccessSpecializationFormDocument = gql`
    query AccessSpecializationForm($orgSid: ID!) {
  accessSpecializationForm(orgSid: $orgSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    filters {
      permission
      label
      orgSids {
        ...fragmentUISelectManyField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useAccessSpecializationFormQuery__
 *
 * To run a query within a React component, call `useAccessSpecializationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessSpecializationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessSpecializationFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useAccessSpecializationFormQuery(baseOptions: Apollo.QueryHookOptions<AccessSpecializationFormQuery, AccessSpecializationFormQueryVariables>) {
        return Apollo.useQuery<AccessSpecializationFormQuery, AccessSpecializationFormQueryVariables>(AccessSpecializationFormDocument, baseOptions);
      }
export function useAccessSpecializationFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessSpecializationFormQuery, AccessSpecializationFormQueryVariables>) {
          return Apollo.useLazyQuery<AccessSpecializationFormQuery, AccessSpecializationFormQueryVariables>(AccessSpecializationFormDocument, baseOptions);
        }
export type AccessSpecializationFormQueryHookResult = ReturnType<typeof useAccessSpecializationFormQuery>;
export type AccessSpecializationFormLazyQueryHookResult = ReturnType<typeof useAccessSpecializationFormLazyQuery>;
export type AccessSpecializationFormQueryResult = Apollo.QueryResult<AccessSpecializationFormQuery, AccessSpecializationFormQueryVariables>;
export const FindAccessSpecializationDocument = gql`
    query FindAccessSpecialization($specializationSid: ID!) {
  findAccessSpecialization(specializationSid: $specializationSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    filters {
      permission
      label
      orgSids {
        ...fragmentUISelectManyField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useFindAccessSpecializationQuery__
 *
 * To run a query within a React component, call `useFindAccessSpecializationQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAccessSpecializationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAccessSpecializationQuery({
 *   variables: {
 *      specializationSid: // value for 'specializationSid'
 *   },
 * });
 */
export function useFindAccessSpecializationQuery(baseOptions: Apollo.QueryHookOptions<FindAccessSpecializationQuery, FindAccessSpecializationQueryVariables>) {
        return Apollo.useQuery<FindAccessSpecializationQuery, FindAccessSpecializationQueryVariables>(FindAccessSpecializationDocument, baseOptions);
      }
export function useFindAccessSpecializationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAccessSpecializationQuery, FindAccessSpecializationQueryVariables>) {
          return Apollo.useLazyQuery<FindAccessSpecializationQuery, FindAccessSpecializationQueryVariables>(FindAccessSpecializationDocument, baseOptions);
        }
export type FindAccessSpecializationQueryHookResult = ReturnType<typeof useFindAccessSpecializationQuery>;
export type FindAccessSpecializationLazyQueryHookResult = ReturnType<typeof useFindAccessSpecializationLazyQuery>;
export type FindAccessSpecializationQueryResult = Apollo.QueryResult<FindAccessSpecializationQuery, FindAccessSpecializationQueryVariables>;
export const AccessPolicyGroupFormDocument = gql`
    query AccessPolicyGroupForm($orgSid: ID!, $templateGroupSid: ID) {
  accessPolicyGroupForm(orgSid: $orgSid, templateGroupSid: $templateGroupSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    description {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    policies {
      ...fragmentUISelectManyField
    }
    specializations {
      ...fragmentUISelectManyField
    }
    includeAllSubOrgs {
      ...fragmentUIBooleanField
    }
    includeOrgSids {
      ...fragmentUISelectManyField
    }
    excludeOrgSids {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useAccessPolicyGroupFormQuery__
 *
 * To run a query within a React component, call `useAccessPolicyGroupFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyGroupFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyGroupFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      templateGroupSid: // value for 'templateGroupSid'
 *   },
 * });
 */
export function useAccessPolicyGroupFormQuery(baseOptions: Apollo.QueryHookOptions<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>) {
        return Apollo.useQuery<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>(AccessPolicyGroupFormDocument, baseOptions);
      }
export function useAccessPolicyGroupFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>) {
          return Apollo.useLazyQuery<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>(AccessPolicyGroupFormDocument, baseOptions);
        }
export type AccessPolicyGroupFormQueryHookResult = ReturnType<typeof useAccessPolicyGroupFormQuery>;
export type AccessPolicyGroupFormLazyQueryHookResult = ReturnType<typeof useAccessPolicyGroupFormLazyQuery>;
export type AccessPolicyGroupFormQueryResult = Apollo.QueryResult<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>;
export const FindAccessPolicyGroupDocument = gql`
    query FindAccessPolicyGroup($policyGroupSid: ID!) {
  findAccessPolicyGroup(policyGroupSid: $policyGroupSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    description {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    policies {
      ...fragmentUISelectManyField
    }
    specializations {
      ...fragmentUISelectManyField
    }
    includeAllSubOrgs {
      ...fragmentUIBooleanField
    }
    includeOrgSids {
      ...fragmentUISelectManyField
    }
    excludeOrgSids {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useFindAccessPolicyGroupQuery__
 *
 * To run a query within a React component, call `useFindAccessPolicyGroupQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAccessPolicyGroupQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAccessPolicyGroupQuery({
 *   variables: {
 *      policyGroupSid: // value for 'policyGroupSid'
 *   },
 * });
 */
export function useFindAccessPolicyGroupQuery(baseOptions: Apollo.QueryHookOptions<FindAccessPolicyGroupQuery, FindAccessPolicyGroupQueryVariables>) {
        return Apollo.useQuery<FindAccessPolicyGroupQuery, FindAccessPolicyGroupQueryVariables>(FindAccessPolicyGroupDocument, baseOptions);
      }
export function useFindAccessPolicyGroupLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAccessPolicyGroupQuery, FindAccessPolicyGroupQueryVariables>) {
          return Apollo.useLazyQuery<FindAccessPolicyGroupQuery, FindAccessPolicyGroupQueryVariables>(FindAccessPolicyGroupDocument, baseOptions);
        }
export type FindAccessPolicyGroupQueryHookResult = ReturnType<typeof useFindAccessPolicyGroupQuery>;
export type FindAccessPolicyGroupLazyQueryHookResult = ReturnType<typeof useFindAccessPolicyGroupLazyQuery>;
export type FindAccessPolicyGroupQueryResult = Apollo.QueryResult<FindAccessPolicyGroupQuery, FindAccessPolicyGroupQueryVariables>;
export const TopLevelOrgsByTypeDocument = gql`
    query TopLevelOrgsByType($orgType: OrgType!) {
  topLevelOrgsByType(orgType: $orgType) {
    sid
    name
    orgId
    orgType
    orgTypeLabel
  }
}
    `;

/**
 * __useTopLevelOrgsByTypeQuery__
 *
 * To run a query within a React component, call `useTopLevelOrgsByTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useTopLevelOrgsByTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTopLevelOrgsByTypeQuery({
 *   variables: {
 *      orgType: // value for 'orgType'
 *   },
 * });
 */
export function useTopLevelOrgsByTypeQuery(baseOptions: Apollo.QueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>) {
        return Apollo.useQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(TopLevelOrgsByTypeDocument, baseOptions);
      }
export function useTopLevelOrgsByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>) {
          return Apollo.useLazyQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(TopLevelOrgsByTypeDocument, baseOptions);
        }
export type TopLevelOrgsByTypeQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeQuery>;
export type TopLevelOrgsByTypeLazyQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeLazyQuery>;
export type TopLevelOrgsByTypeQueryResult = Apollo.QueryResult<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>;
export const OrgByIdDocument = gql`
    query OrgById($orgSid: ID, $orgId: String!) {
  orgById(orgSid: $orgSid, orgId: $orgId) {
    sid
    name
    orgId
    orgType
    orgTypeLabel
  }
}
    `;

/**
 * __useOrgByIdQuery__
 *
 * To run a query within a React component, call `useOrgByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgByIdQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      orgId: // value for 'orgId'
 *   },
 * });
 */
export function useOrgByIdQuery(baseOptions: Apollo.QueryHookOptions<OrgByIdQuery, OrgByIdQueryVariables>) {
        return Apollo.useQuery<OrgByIdQuery, OrgByIdQueryVariables>(OrgByIdDocument, baseOptions);
      }
export function useOrgByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgByIdQuery, OrgByIdQueryVariables>) {
          return Apollo.useLazyQuery<OrgByIdQuery, OrgByIdQueryVariables>(OrgByIdDocument, baseOptions);
        }
export type OrgByIdQueryHookResult = ReturnType<typeof useOrgByIdQuery>;
export type OrgByIdLazyQueryHookResult = ReturnType<typeof useOrgByIdLazyQuery>;
export type OrgByIdQueryResult = Apollo.QueryResult<OrgByIdQuery, OrgByIdQueryVariables>;
export const DirectOrganizationsDocument = gql`
    query DirectOrganizations($orgSid: ID!, $orgFilter: OrgFilterInput, $pageableInput: PageableInput) {
  directOrganizations(
    orgSid: $orgSid
    orgFilter: $orgFilter
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      sid
      name
      orgId
      orgType
      orgTypeLabel
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}`;

/**
 * __useDirectOrganizationsQuery__
 *
 * To run a query within a React component, call `useDirectOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectOrganizationsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      orgFilter: // value for 'orgFilter'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useDirectOrganizationsQuery(baseOptions: Apollo.QueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>) {
        return Apollo.useQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(DirectOrganizationsDocument, baseOptions);
      }
export function useDirectOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>) {
          return Apollo.useLazyQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(DirectOrganizationsDocument, baseOptions);
        }
export type DirectOrganizationsQueryHookResult = ReturnType<typeof useDirectOrganizationsQuery>;
export type DirectOrganizationsLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsLazyQuery>;
export type DirectOrganizationsQueryResult = Apollo.QueryResult<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>;
export const OrganizationFormDocument = gql`
    query OrganizationForm($orgOwnerSid: ID!) {
  organizationForm(orgOwnerSid: $orgOwnerSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    orgId {
      ...fragmentUIStringField
    }
    orgType {
      ...fragmentUISelectOneField
    }
    active {
      ...fragmentUIBooleanField
    }
    whitelist {
      pattern {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useOrganizationFormQuery__
 *
 * To run a query within a React component, call `useOrganizationFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationFormQuery({
 *   variables: {
 *      orgOwnerSid: // value for 'orgOwnerSid'
 *   },
 * });
 */
export function useOrganizationFormQuery(baseOptions: Apollo.QueryHookOptions<OrganizationFormQuery, OrganizationFormQueryVariables>) {
        return Apollo.useQuery<OrganizationFormQuery, OrganizationFormQueryVariables>(OrganizationFormDocument, baseOptions);
      }
export function useOrganizationFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationFormQuery, OrganizationFormQueryVariables>) {
          return Apollo.useLazyQuery<OrganizationFormQuery, OrganizationFormQueryVariables>(OrganizationFormDocument, baseOptions);
        }
export type OrganizationFormQueryHookResult = ReturnType<typeof useOrganizationFormQuery>;
export type OrganizationFormLazyQueryHookResult = ReturnType<typeof useOrganizationFormLazyQuery>;
export type OrganizationFormQueryResult = Apollo.QueryResult<OrganizationFormQuery, OrganizationFormQueryVariables>;
export const FindOrganizationDocument = gql`
    query FindOrganization($orgSid: ID!) {
  findOrganization(orgSid: $orgSid) {
    sid
    name {
      ...fragmentUIStringField
    }
    orgId {
      ...fragmentUIStringField
    }
    orgType {
      ...fragmentUISelectOneField
    }
    active {
      ...fragmentUIBooleanField
    }
    whitelist {
      pattern {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useFindOrganizationQuery__
 *
 * To run a query within a React component, call `useFindOrganizationQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindOrganizationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindOrganizationQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useFindOrganizationQuery(baseOptions: Apollo.QueryHookOptions<FindOrganizationQuery, FindOrganizationQueryVariables>) {
        return Apollo.useQuery<FindOrganizationQuery, FindOrganizationQueryVariables>(FindOrganizationDocument, baseOptions);
      }
export function useFindOrganizationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindOrganizationQuery, FindOrganizationQueryVariables>) {
          return Apollo.useLazyQuery<FindOrganizationQuery, FindOrganizationQueryVariables>(FindOrganizationDocument, baseOptions);
        }
export type FindOrganizationQueryHookResult = ReturnType<typeof useFindOrganizationQuery>;
export type FindOrganizationLazyQueryHookResult = ReturnType<typeof useFindOrganizationLazyQuery>;
export type FindOrganizationQueryResult = Apollo.QueryResult<FindOrganizationQuery, FindOrganizationQueryVariables>;
export const SearchOrganizationsDocument = gql`
    query SearchOrganizations($searchText: String!, $orgOwnerSid: ID!, $orgFilter: OrgFilterInput, $pageableInput: PageableInput) {
  searchOrganizations(
    searchText: $searchText
    orgOwnerSid: $orgOwnerSid
    orgFilter: $orgFilter
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      sid
      name
      orgId
      orgType
      orgTypeLabel
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}`;

/**
 * __useSearchOrganizationsQuery__
 *
 * To run a query within a React component, call `useSearchOrganizationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchOrganizationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchOrganizationsQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orgOwnerSid: // value for 'orgOwnerSid'
 *      orgFilter: // value for 'orgFilter'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useSearchOrganizationsQuery(baseOptions: Apollo.QueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>) {
        return Apollo.useQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(SearchOrganizationsDocument, baseOptions);
      }
export function useSearchOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>) {
          return Apollo.useLazyQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(SearchOrganizationsDocument, baseOptions);
        }
export type SearchOrganizationsQueryHookResult = ReturnType<typeof useSearchOrganizationsQuery>;
export type SearchOrganizationsLazyQueryHookResult = ReturnType<typeof useSearchOrganizationsLazyQuery>;
export type SearchOrganizationsQueryResult = Apollo.QueryResult<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>;
export const OrganizationQuickSearchDocument = gql`
    query OrganizationQuickSearch($searchText: String!, $orgOwnerSid: ID!) {
  organizationQuickSearch(searchText: $searchText, orgOwnerSid: $orgOwnerSid) {
    sid
    name
    orgId
    orgType
    orgTypeLabel
  }
}
    `;

/**
 * __useOrganizationQuickSearchQuery__
 *
 * To run a query within a React component, call `useOrganizationQuickSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrganizationQuickSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrganizationQuickSearchQuery({
 *   variables: {
 *      searchText: // value for 'searchText'
 *      orgOwnerSid: // value for 'orgOwnerSid'
 *   },
 * });
 */
export function useOrganizationQuickSearchQuery(baseOptions: Apollo.QueryHookOptions<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>) {
        return Apollo.useQuery<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>(OrganizationQuickSearchDocument, baseOptions);
      }
export function useOrganizationQuickSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>) {
          return Apollo.useLazyQuery<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>(OrganizationQuickSearchDocument, baseOptions);
        }
export type OrganizationQuickSearchQueryHookResult = ReturnType<typeof useOrganizationQuickSearchQuery>;
export type OrganizationQuickSearchLazyQueryHookResult = ReturnType<typeof useOrganizationQuickSearchLazyQuery>;
export type OrganizationQuickSearchQueryResult = Apollo.QueryResult<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>;
export const VendorQuickSearchDocument = gql`
    query VendorQuickSearch($orgOwnerSid: ID!, $searchText: String!) {
  vendorQuickSearch(orgOwnerSid: $orgOwnerSid, searchText: $searchText) {
    sid
    name
    orgId
    orgType
    orgTypeLabel
  }
}
    `;

/**
 * __useVendorQuickSearchQuery__
 *
 * To run a query within a React component, call `useVendorQuickSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useVendorQuickSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useVendorQuickSearchQuery({
 *   variables: {
 *      orgOwnerSid: // value for 'orgOwnerSid'
 *      searchText: // value for 'searchText'
 *   },
 * });
 */
export function useVendorQuickSearchQuery(baseOptions: Apollo.QueryHookOptions<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>) {
        return Apollo.useQuery<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>(VendorQuickSearchDocument, baseOptions);
      }
export function useVendorQuickSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>) {
          return Apollo.useLazyQuery<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>(VendorQuickSearchDocument, baseOptions);
        }
export type VendorQuickSearchQueryHookResult = ReturnType<typeof useVendorQuickSearchQuery>;
export type VendorQuickSearchLazyQueryHookResult = ReturnType<typeof useVendorQuickSearchLazyQuery>;
export type VendorQuickSearchQueryResult = Apollo.QueryResult<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>;
export const OrgSecurityFormDocument = gql`
    query OrgSecurityForm($orgSid: ID!) {
  orgSecurityForm(orgSid: $orgSid) {
    orgSid
    forgotPasswordEnabled {
      ...fragmentUIBooleanField
    }
    forgotPasswordMsg {
      ...fragmentUIStringField
    }
    allowedEmailDomains {
      ...fragmentUIStringField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiStringFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useOrgSecurityFormQuery__
 *
 * To run a query within a React component, call `useOrgSecurityFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrgSecurityFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrgSecurityFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useOrgSecurityFormQuery(baseOptions: Apollo.QueryHookOptions<OrgSecurityFormQuery, OrgSecurityFormQueryVariables>) {
        return Apollo.useQuery<OrgSecurityFormQuery, OrgSecurityFormQueryVariables>(OrgSecurityFormDocument, baseOptions);
      }
export function useOrgSecurityFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgSecurityFormQuery, OrgSecurityFormQueryVariables>) {
          return Apollo.useLazyQuery<OrgSecurityFormQuery, OrgSecurityFormQueryVariables>(OrgSecurityFormDocument, baseOptions);
        }
export type OrgSecurityFormQueryHookResult = ReturnType<typeof useOrgSecurityFormQuery>;
export type OrgSecurityFormLazyQueryHookResult = ReturnType<typeof useOrgSecurityFormLazyQuery>;
export type OrgSecurityFormQueryResult = Apollo.QueryResult<OrgSecurityFormQuery, OrgSecurityFormQueryVariables>;
export const ExternalOrgsDocument = gql`
    query ExternalOrgs($pageableInput: PageableInput) {
  externalOrgs(pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      ...fragmentListPageInfo
    }
    nodes {
      sid
      name
      orgId
      orgType
      orgTypeLabel
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentListPageInfoFragmentDoc}`;

/**
 * __useExternalOrgsQuery__
 *
 * To run a query within a React component, call `useExternalOrgsQuery` and pass it any options that fit your needs.
 * When your component renders, `useExternalOrgsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExternalOrgsQuery({
 *   variables: {
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExternalOrgsQuery(baseOptions?: Apollo.QueryHookOptions<ExternalOrgsQuery, ExternalOrgsQueryVariables>) {
        return Apollo.useQuery<ExternalOrgsQuery, ExternalOrgsQueryVariables>(ExternalOrgsDocument, baseOptions);
      }
export function useExternalOrgsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExternalOrgsQuery, ExternalOrgsQueryVariables>) {
          return Apollo.useLazyQuery<ExternalOrgsQuery, ExternalOrgsQueryVariables>(ExternalOrgsDocument, baseOptions);
        }
export type ExternalOrgsQueryHookResult = ReturnType<typeof useExternalOrgsQuery>;
export type ExternalOrgsLazyQueryHookResult = ReturnType<typeof useExternalOrgsLazyQuery>;
export type ExternalOrgsQueryResult = Apollo.QueryResult<ExternalOrgsQuery, ExternalOrgsQueryVariables>;
export const DashThemeColorForOrgDocument = gql`
    query DashThemeColorForOrg($ownedInput: OwnedInput, $pageableInput: PageableInput) {
  dashThemeColorForOrg(ownedInput: $ownedInput, pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

/**
 * __useDashThemeColorForOrgQuery__
 *
 * To run a query within a React component, call `useDashThemeColorForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashThemeColorForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashThemeColorForOrgQuery({
 *   variables: {
 *      ownedInput: // value for 'ownedInput'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useDashThemeColorForOrgQuery(baseOptions?: Apollo.QueryHookOptions<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>) {
        return Apollo.useQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(DashThemeColorForOrgDocument, baseOptions);
      }
export function useDashThemeColorForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>) {
          return Apollo.useLazyQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(DashThemeColorForOrgDocument, baseOptions);
        }
export type DashThemeColorForOrgQueryHookResult = ReturnType<typeof useDashThemeColorForOrgQuery>;
export type DashThemeColorForOrgLazyQueryHookResult = ReturnType<typeof useDashThemeColorForOrgLazyQuery>;
export type DashThemeColorForOrgQueryResult = Apollo.QueryResult<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>;
export const DashSiteForOrgDocument = gql`
    query DashSiteForOrg($orgSidInput: OrgSidInput) {
  dashSiteForOrg(orgSidInput: $orgSidInput) {
    id
    active
  }
}
    `;

/**
 * __useDashSiteForOrgQuery__
 *
 * To run a query within a React component, call `useDashSiteForOrgQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashSiteForOrgQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashSiteForOrgQuery({
 *   variables: {
 *      orgSidInput: // value for 'orgSidInput'
 *   },
 * });
 */
export function useDashSiteForOrgQuery(baseOptions?: Apollo.QueryHookOptions<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>) {
        return Apollo.useQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, baseOptions);
      }
export function useDashSiteForOrgLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>) {
          return Apollo.useLazyQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, baseOptions);
        }
export type DashSiteForOrgQueryHookResult = ReturnType<typeof useDashSiteForOrgQuery>;
export type DashSiteForOrgLazyQueryHookResult = ReturnType<typeof useDashSiteForOrgLazyQuery>;
export type DashSiteForOrgQueryResult = Apollo.QueryResult<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>;
export const DashThemeColorDocument = gql`
    query DashThemeColor($ownedInputSid: OwnedInputSid) {
  dashThemeColor(ownedInputSid: $ownedInputSid) {
    id
    defaultPalette
    themeColorMode
    allowDark
    paletteNm
    themePrimary
    themeLighterAlt
    themeLighter
    themeLight
    themeTertiary
    themeSecondary
    themeDarkAlt
    themeDark
    themeDarker
    neutralLighterAlt
    neutralLighter
    neutralLight
    neutralQuaternaryAlt
    neutralQuaternary
    neutralTertiaryAlt
    neutralTertiary
    neutralSecondary
    neutralPrimaryAlt
    neutralPrimary
    neutralDark
    black
    white
  }
}
    `;

/**
 * __useDashThemeColorQuery__
 *
 * To run a query within a React component, call `useDashThemeColorQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashThemeColorQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashThemeColorQuery({
 *   variables: {
 *      ownedInputSid: // value for 'ownedInputSid'
 *   },
 * });
 */
export function useDashThemeColorQuery(baseOptions?: Apollo.QueryHookOptions<DashThemeColorQuery, DashThemeColorQueryVariables>) {
        return Apollo.useQuery<DashThemeColorQuery, DashThemeColorQueryVariables>(DashThemeColorDocument, baseOptions);
      }
export function useDashThemeColorLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorQuery, DashThemeColorQueryVariables>) {
          return Apollo.useLazyQuery<DashThemeColorQuery, DashThemeColorQueryVariables>(DashThemeColorDocument, baseOptions);
        }
export type DashThemeColorQueryHookResult = ReturnType<typeof useDashThemeColorQuery>;
export type DashThemeColorLazyQueryHookResult = ReturnType<typeof useDashThemeColorLazyQuery>;
export type DashThemeColorQueryResult = Apollo.QueryResult<DashThemeColorQuery, DashThemeColorQueryVariables>;
export const DashThemeColorByNameDocument = gql`
    query DashThemeColorByName($ownedInputName: OwnedInputName) {
  dashThemeColorByName(ownedInputName: $ownedInputName) {
    id
    defaultPalette
    themeColorMode
    allowDark
    paletteNm
    themePrimary
    themeLighterAlt
    themeLighter
    themeLight
    themeTertiary
    themeSecondary
    themeDarkAlt
    themeDark
    themeDarker
    neutralLighterAlt
    neutralLighter
    neutralLight
    neutralQuaternaryAlt
    neutralQuaternary
    neutralTertiaryAlt
    neutralTertiary
    neutralSecondary
    neutralPrimaryAlt
    neutralPrimary
    neutralDark
    black
    white
  }
}
    `;

/**
 * __useDashThemeColorByNameQuery__
 *
 * To run a query within a React component, call `useDashThemeColorByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useDashThemeColorByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDashThemeColorByNameQuery({
 *   variables: {
 *      ownedInputName: // value for 'ownedInputName'
 *   },
 * });
 */
export function useDashThemeColorByNameQuery(baseOptions?: Apollo.QueryHookOptions<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>) {
        return Apollo.useQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(DashThemeColorByNameDocument, baseOptions);
      }
export function useDashThemeColorByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>) {
          return Apollo.useLazyQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(DashThemeColorByNameDocument, baseOptions);
        }
export type DashThemeColorByNameQueryHookResult = ReturnType<typeof useDashThemeColorByNameQuery>;
export type DashThemeColorByNameLazyQueryHookResult = ReturnType<typeof useDashThemeColorByNameLazyQuery>;
export type DashThemeColorByNameQueryResult = Apollo.QueryResult<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>;
export const DefaultDashThemeForSiteDocument = gql`
    query DefaultDashThemeForSite($ownedInput: OwnedInput) {
  defaultDashThemeForSite(ownedInput: $ownedInput) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;

/**
 * __useDefaultDashThemeForSiteQuery__
 *
 * To run a query within a React component, call `useDefaultDashThemeForSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultDashThemeForSiteQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultDashThemeForSiteQuery({
 *   variables: {
 *      ownedInput: // value for 'ownedInput'
 *   },
 * });
 */
export function useDefaultDashThemeForSiteQuery(baseOptions?: Apollo.QueryHookOptions<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>) {
        return Apollo.useQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(DefaultDashThemeForSiteDocument, baseOptions);
      }
export function useDefaultDashThemeForSiteLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>) {
          return Apollo.useLazyQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(DefaultDashThemeForSiteDocument, baseOptions);
        }
export type DefaultDashThemeForSiteQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteQuery>;
export type DefaultDashThemeForSiteLazyQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteLazyQuery>;
export type DefaultDashThemeForSiteQueryResult = Apollo.QueryResult<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>;
export const DefaultDashThemeForSitePageDocument = gql`
    query DefaultDashThemeForSitePage($ownedInput: OwnedInput) {
  defaultDashThemeForSitePage(ownedInput: $ownedInput) {
    themeColorModes
    themeFontSizes
    themeColorPalettes {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;

/**
 * __useDefaultDashThemeForSitePageQuery__
 *
 * To run a query within a React component, call `useDefaultDashThemeForSitePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useDefaultDashThemeForSitePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDefaultDashThemeForSitePageQuery({
 *   variables: {
 *      ownedInput: // value for 'ownedInput'
 *   },
 * });
 */
export function useDefaultDashThemeForSitePageQuery(baseOptions?: Apollo.QueryHookOptions<DefaultDashThemeForSitePageQuery, DefaultDashThemeForSitePageQueryVariables>) {
        return Apollo.useQuery<DefaultDashThemeForSitePageQuery, DefaultDashThemeForSitePageQueryVariables>(DefaultDashThemeForSitePageDocument, baseOptions);
      }
export function useDefaultDashThemeForSitePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DefaultDashThemeForSitePageQuery, DefaultDashThemeForSitePageQueryVariables>) {
          return Apollo.useLazyQuery<DefaultDashThemeForSitePageQuery, DefaultDashThemeForSitePageQueryVariables>(DefaultDashThemeForSitePageDocument, baseOptions);
        }
export type DefaultDashThemeForSitePageQueryHookResult = ReturnType<typeof useDefaultDashThemeForSitePageQuery>;
export type DefaultDashThemeForSitePageLazyQueryHookResult = ReturnType<typeof useDefaultDashThemeForSitePageLazyQuery>;
export type DefaultDashThemeForSitePageQueryResult = Apollo.QueryResult<DefaultDashThemeForSitePageQuery, DefaultDashThemeForSitePageQueryVariables>;
export const CurrentUserDashThemePageDocument = gql`
    query CurrentUserDashThemePage {
  currentUserDashThemePage {
    themeColorModes
    themeFontSizes
    themeColorPalettes {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
    dashTheme {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
        defaultPalette
        themeColorMode
        allowDark
        paletteNm
        themePrimary
        themeLighterAlt
        themeLighter
        themeLight
        themeTertiary
        themeSecondary
        themeDarkAlt
        themeDark
        themeDarker
        neutralLighterAlt
        neutralLighter
        neutralLight
        neutralQuaternaryAlt
        neutralQuaternary
        neutralTertiaryAlt
        neutralTertiary
        neutralSecondary
        neutralPrimaryAlt
        neutralPrimary
        neutralDark
        black
        white
      }
    }
  }
}
    `;

/**
 * __useCurrentUserDashThemePageQuery__
 *
 * To run a query within a React component, call `useCurrentUserDashThemePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserDashThemePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserDashThemePageQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserDashThemePageQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>) {
        return Apollo.useQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(CurrentUserDashThemePageDocument, baseOptions);
      }
export function useCurrentUserDashThemePageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>) {
          return Apollo.useLazyQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(CurrentUserDashThemePageDocument, baseOptions);
        }
export type CurrentUserDashThemePageQueryHookResult = ReturnType<typeof useCurrentUserDashThemePageQuery>;
export type CurrentUserDashThemePageLazyQueryHookResult = ReturnType<typeof useCurrentUserDashThemePageLazyQuery>;
export type CurrentUserDashThemePageQueryResult = Apollo.QueryResult<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>;
export const NavigateToNewDomainDocument = gql`
    query NavigateToNewDomain($domainNavInput: DomainNavInput) {
  navigateToNewDomain(domainNavInput: $domainNavInput) {
    type
    selectedPage
    navItems {
      ...fragmentWebNav
      subNavItems {
        ...fragmentWebNav
      }
    }
  }
}
    ${FragmentWebNavFragmentDoc}`;

/**
 * __useNavigateToNewDomainQuery__
 *
 * To run a query within a React component, call `useNavigateToNewDomainQuery` and pass it any options that fit your needs.
 * When your component renders, `useNavigateToNewDomainQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNavigateToNewDomainQuery({
 *   variables: {
 *      domainNavInput: // value for 'domainNavInput'
 *   },
 * });
 */
export function useNavigateToNewDomainQuery(baseOptions?: Apollo.QueryHookOptions<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>) {
        return Apollo.useQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(NavigateToNewDomainDocument, baseOptions);
      }
export function useNavigateToNewDomainLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>) {
          return Apollo.useLazyQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(NavigateToNewDomainDocument, baseOptions);
        }
export type NavigateToNewDomainQueryHookResult = ReturnType<typeof useNavigateToNewDomainQuery>;
export type NavigateToNewDomainLazyQueryHookResult = ReturnType<typeof useNavigateToNewDomainLazyQuery>;
export type NavigateToNewDomainQueryResult = Apollo.QueryResult<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>;
export const SimulateSessionExpirDocument = gql`
    query SimulateSessionExpir {
  simulateSessionExpir {
    successful
  }
}
    `;

/**
 * __useSimulateSessionExpirQuery__
 *
 * To run a query within a React component, call `useSimulateSessionExpirQuery` and pass it any options that fit your needs.
 * When your component renders, `useSimulateSessionExpirQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSimulateSessionExpirQuery({
 *   variables: {
 *   },
 * });
 */
export function useSimulateSessionExpirQuery(baseOptions?: Apollo.QueryHookOptions<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>) {
        return Apollo.useQuery<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>(SimulateSessionExpirDocument, baseOptions);
      }
export function useSimulateSessionExpirLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>) {
          return Apollo.useLazyQuery<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>(SimulateSessionExpirDocument, baseOptions);
        }
export type SimulateSessionExpirQueryHookResult = ReturnType<typeof useSimulateSessionExpirQuery>;
export type SimulateSessionExpirLazyQueryHookResult = ReturnType<typeof useSimulateSessionExpirLazyQuery>;
export type SimulateSessionExpirQueryResult = Apollo.QueryResult<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>;
export const PasswordRulesFormDocument = gql`
    query PasswordRulesForm($orgSid: ID!) {
  passwordRulesForm(orgSid: $orgSid) {
    organization {
      ...fragmentUIReadOnlyField
    }
    mustAlwaysBeMet {
      mustNotContainWhiteSpace {
        ...fragmentUIBooleanField
      }
      mustNotContainUserName {
        ...fragmentUIBooleanField
      }
      mustNotContainNumericSequence {
        ...fragmentUIBooleanField
      }
      mustFollowLengthRequirements {
        ...fragmentUIBooleanField
      }
      minLength {
        ...fragmentUIIntField
      }
      maxLength {
        ...fragmentUIIntField
      }
      mustContainUpperCaseLetters {
        ...fragmentUIBooleanField
      }
      minUpperCaseLetters {
        ...fragmentUIIntField
      }
      mustContainLowerCaseLetters {
        ...fragmentUIBooleanField
      }
      minLowerCaseLetters {
        ...fragmentUIIntField
      }
      mustContainNumericDigits {
        ...fragmentUIBooleanField
      }
      minNumericDigits {
        ...fragmentUIIntField
      }
      mustContainSpecialCharacters {
        ...fragmentUIBooleanField
      }
      minSpecialCharacters {
        ...fragmentUIIntField
      }
      mustNotRepeatCharacters {
        ...fragmentUIBooleanField
      }
      maxAllowedRepeatedChars {
        ...fragmentUIIntField
      }
      mustNotReusePasswords {
        ...fragmentUIBooleanField
      }
      minPasswordHistoryVariations {
        ...fragmentUIIntField
      }
      mustNotMatchExactDictionaryWord {
        ...fragmentUIBooleanField
      }
      mustNotMatchPartialDictionaryWord {
        ...fragmentUIBooleanField
      }
    }
    someMustBeMet {
      enabled {
        ...fragmentUIBooleanField
      }
      minPasswordComplexity {
        ...fragmentUISelectOneField
      }
      requiredNumPassingRules {
        ...fragmentUIIntField
      }
      mustNotContainWhiteSpace {
        ...fragmentUIBooleanField
      }
      mustNotContainUserName {
        ...fragmentUIBooleanField
      }
      mustNotContainNumericSequence {
        ...fragmentUIBooleanField
      }
      mustFollowLengthRequirements {
        ...fragmentUIBooleanField
      }
      minLength {
        ...fragmentUIIntField
      }
      maxLength {
        ...fragmentUIIntField
      }
      mustContainUpperCaseLetters {
        ...fragmentUIBooleanField
      }
      minUpperCaseLetters {
        ...fragmentUIIntField
      }
      mustContainLowerCaseLetters {
        ...fragmentUIBooleanField
      }
      minLowerCaseLetters {
        ...fragmentUIIntField
      }
      mustContainNumericDigits {
        ...fragmentUIBooleanField
      }
      minNumericDigits {
        ...fragmentUIIntField
      }
      mustContainSpecialCharacters {
        ...fragmentUIBooleanField
      }
      minSpecialCharacters {
        ...fragmentUIIntField
      }
      mustNotRepeatCharacters {
        ...fragmentUIBooleanField
      }
      maxAllowedRepeatedChars {
        ...fragmentUIIntField
      }
      mustNotReusePasswords {
        ...fragmentUIBooleanField
      }
      minPasswordHistoryVariations {
        ...fragmentUIIntField
      }
      mustNotMatchExactDictionaryWord {
        ...fragmentUIBooleanField
      }
      mustNotMatchPartialDictionaryWord {
        ...fragmentUIBooleanField
      }
    }
    autoLockAccount {
      ...fragmentUIBooleanField
    }
    autoLockAfterFailedAttempts {
      ...fragmentUIIntField
    }
    autoUnlockAccount {
      ...fragmentUIBooleanField
    }
    autoUnlockAccountDelayMinutes {
      ...fragmentUIIntField
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiIntFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __usePasswordRulesFormQuery__
 *
 * To run a query within a React component, call `usePasswordRulesFormQuery` and pass it any options that fit your needs.
 * When your component renders, `usePasswordRulesFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePasswordRulesFormQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function usePasswordRulesFormQuery(baseOptions: Apollo.QueryHookOptions<PasswordRulesFormQuery, PasswordRulesFormQueryVariables>) {
        return Apollo.useQuery<PasswordRulesFormQuery, PasswordRulesFormQueryVariables>(PasswordRulesFormDocument, baseOptions);
      }
export function usePasswordRulesFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PasswordRulesFormQuery, PasswordRulesFormQueryVariables>) {
          return Apollo.useLazyQuery<PasswordRulesFormQuery, PasswordRulesFormQueryVariables>(PasswordRulesFormDocument, baseOptions);
        }
export type PasswordRulesFormQueryHookResult = ReturnType<typeof usePasswordRulesFormQuery>;
export type PasswordRulesFormLazyQueryHookResult = ReturnType<typeof usePasswordRulesFormLazyQuery>;
export type PasswordRulesFormQueryResult = Apollo.QueryResult<PasswordRulesFormQuery, PasswordRulesFormQueryVariables>;
export const PasswordValidationDocument = gql`
    query PasswordValidation($orgSid: ID!, $userSid: ID!, $password: String!) {
  passwordValidation(orgSid: $orgSid, userSid: $userSid, password: $password) {
    passes
    mustAlwaysBeMet {
      enabled
      requiredNumPassingRules
      passes
      rules {
        passes
        label
      }
    }
    passwordStrength {
      passes
      minPasswordComplexity
    }
    someMustBeMet {
      enabled
      requiredNumPassingRules
      passes
      rules {
        passes
        label
      }
    }
  }
}
    `;

/**
 * __usePasswordValidationQuery__
 *
 * To run a query within a React component, call `usePasswordValidationQuery` and pass it any options that fit your needs.
 * When your component renders, `usePasswordValidationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePasswordValidationQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      userSid: // value for 'userSid'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePasswordValidationQuery(baseOptions: Apollo.QueryHookOptions<PasswordValidationQuery, PasswordValidationQueryVariables>) {
        return Apollo.useQuery<PasswordValidationQuery, PasswordValidationQueryVariables>(PasswordValidationDocument, baseOptions);
      }
export function usePasswordValidationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PasswordValidationQuery, PasswordValidationQueryVariables>) {
          return Apollo.useLazyQuery<PasswordValidationQuery, PasswordValidationQueryVariables>(PasswordValidationDocument, baseOptions);
        }
export type PasswordValidationQueryHookResult = ReturnType<typeof usePasswordValidationQuery>;
export type PasswordValidationLazyQueryHookResult = ReturnType<typeof usePasswordValidationLazyQuery>;
export type PasswordValidationQueryResult = Apollo.QueryResult<PasswordValidationQuery, PasswordValidationQueryVariables>;
export const XpsftpTestDocument = gql`
    query XpsftpTest($orgSid: ID) {
  xpsftpTest(orgSid: $orgSid) {
    xpSFTPForm {
      host {
        ...fragmentUIStringField
      }
      port {
        ...fragmentUIIntField
      }
      user {
        ...fragmentUIStringField
      }
      password {
        ...fragmentUIStringField
      }
      folder {
        ...fragmentUIStringField
      }
      stepWise {
        ...fragmentUIBooleanField
      }
      response
      errCode
      errMsg
      errSeverity
      sshKeyPath {
        ...fragmentUISelectOneField
      }
      sshKeyPassword {
        ...fragmentUIStringField
      }
      options {
        ...fragmentUIOptions
      }
    }
    sendTestFileForm {
      sendTestFile {
        ...fragmentUIBooleanField
      }
      testFileStrategy {
        ...fragmentUISelectOneField
      }
      fileName {
        ...fragmentUIStringField
      }
      fileBody {
        ...fragmentUIStringField
      }
    }
    includeFileUpload
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiIntFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __useXpsftpTestQuery__
 *
 * To run a query within a React component, call `useXpsftpTestQuery` and pass it any options that fit your needs.
 * When your component renders, `useXpsftpTestQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXpsftpTestQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useXpsftpTestQuery(baseOptions?: Apollo.QueryHookOptions<XpsftpTestQuery, XpsftpTestQueryVariables>) {
        return Apollo.useQuery<XpsftpTestQuery, XpsftpTestQueryVariables>(XpsftpTestDocument, baseOptions);
      }
export function useXpsftpTestLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<XpsftpTestQuery, XpsftpTestQueryVariables>) {
          return Apollo.useLazyQuery<XpsftpTestQuery, XpsftpTestQueryVariables>(XpsftpTestDocument, baseOptions);
        }
export type XpsftpTestQueryHookResult = ReturnType<typeof useXpsftpTestQuery>;
export type XpsftpTestLazyQueryHookResult = ReturnType<typeof useXpsftpTestLazyQuery>;
export type XpsftpTestQueryResult = Apollo.QueryResult<XpsftpTestQuery, XpsftpTestQueryVariables>;
export const ReprocessDialogDocument = gql`
    query ReprocessDialog($workOrderId: String!) {
  reprocessDialog(workOrderId: $workOrderId) {
    captureChangeReason
    title
    message
  }
}
    `;

/**
 * __useReprocessDialogQuery__
 *
 * To run a query within a React component, call `useReprocessDialogQuery` and pass it any options that fit your needs.
 * When your component renders, `useReprocessDialogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReprocessDialogQuery({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useReprocessDialogQuery(baseOptions: Apollo.QueryHookOptions<ReprocessDialogQuery, ReprocessDialogQueryVariables>) {
        return Apollo.useQuery<ReprocessDialogQuery, ReprocessDialogQueryVariables>(ReprocessDialogDocument, baseOptions);
      }
export function useReprocessDialogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReprocessDialogQuery, ReprocessDialogQueryVariables>) {
          return Apollo.useLazyQuery<ReprocessDialogQuery, ReprocessDialogQueryVariables>(ReprocessDialogDocument, baseOptions);
        }
export type ReprocessDialogQueryHookResult = ReturnType<typeof useReprocessDialogQuery>;
export type ReprocessDialogLazyQueryHookResult = ReturnType<typeof useReprocessDialogLazyQuery>;
export type ReprocessDialogQueryResult = Apollo.QueryResult<ReprocessDialogQuery, ReprocessDialogQueryVariables>;
export const XchangeProfileDocument = gql`
    query XchangeProfile($orgSid: ID!) {
  xchangeProfile(orgSid: $orgSid) {
    xchanges {
      vendorIds
      specIds
      coreFilename
      uatActivity {
        ...fragmentXchangeConfigActivity
      }
      testActivity {
        ...fragmentXchangeConfigActivity
      }
      prodActivity {
        ...fragmentXchangeConfigActivity
      }
      errorActivity {
        ...fragmentXchangeConfigActivity
      }
      active
      hasUnpublishedChanges
      hasAlerts
      implementationPending
    }
    globalXchangeAlerts {
      coreFilename
      numSubscribers
      hasUnpublishedChanges
    }
    individualXchangeAlerts {
      coreFilename
      numSubscribers
      hasUnpublishedChanges
    }
    comments
    hasUnpublishedChanges
    requiresConversion
    tooltips {
      inactive
      hasUnpublishedChanges
      hasAlerts
      implementationPending
      requiresConversion
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentXchangeConfigActivityFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useXchangeProfileQuery__
 *
 * To run a query within a React component, call `useXchangeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useXchangeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXchangeProfileQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useXchangeProfileQuery(baseOptions: Apollo.QueryHookOptions<XchangeProfileQuery, XchangeProfileQueryVariables>) {
        return Apollo.useQuery<XchangeProfileQuery, XchangeProfileQueryVariables>(XchangeProfileDocument, baseOptions);
      }
export function useXchangeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<XchangeProfileQuery, XchangeProfileQueryVariables>) {
          return Apollo.useLazyQuery<XchangeProfileQuery, XchangeProfileQueryVariables>(XchangeProfileDocument, baseOptions);
        }
export type XchangeProfileQueryHookResult = ReturnType<typeof useXchangeProfileQuery>;
export type XchangeProfileLazyQueryHookResult = ReturnType<typeof useXchangeProfileLazyQuery>;
export type XchangeProfileQueryResult = Apollo.QueryResult<XchangeProfileQuery, XchangeProfileQueryVariables>;
export const XchangeDetailsDocument = gql`
    query XchangeDetails($orgSid: ID!, $coreFilename: String!) {
  xchangeDetails(orgSid: $orgSid, coreFilename: $coreFilename) {
    sid
    requiresConversion
    coreFilename {
      ...fragmentUIStringField
    }
    coreFilenamePattern {
      ...fragmentUIStringField
    }
    comments {
      ...fragmentUIStringField
    }
    processes {
      sid
      vendor {
        ...fragmentUISelectOneField
      }
      specId {
        ...fragmentUIStringField
      }
      filenameQualifiers {
        ...fragmentUISelectManyField
      }
      diagram {
        steps {
          sid
          key
          icon
          title
          subTitle
          qualifier
          commands {
            ...fragmentWebCommand
          }
          position {
            x
            y
          }
        }
        stepGroups {
          start {
            x
            y
          }
          end {
            x
            y
          }
        }
        transmissions {
          sid
          key
          protocol
          host
          qualifier
          commands {
            ...fragmentWebCommand
          }
          position {
            x
            y
          }
        }
        connectors {
          fromKey
          toKey
        }
      }
      options {
        ...fragmentUIOptions
      }
      commands {
        ...fragmentWebCommand
      }
      response
      errCode
      errMsg
      errSeverity
    }
    alerts {
      filenameQualifier
      alertTypes
      subscribers {
        sid
        email
        firstNm
        lastNm
      }
      commands {
        ...fragmentWebCommand
      }
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;

/**
 * __useXchangeDetailsQuery__
 *
 * To run a query within a React component, call `useXchangeDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useXchangeDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXchangeDetailsQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      coreFilename: // value for 'coreFilename'
 *   },
 * });
 */
export function useXchangeDetailsQuery(baseOptions: Apollo.QueryHookOptions<XchangeDetailsQuery, XchangeDetailsQueryVariables>) {
        return Apollo.useQuery<XchangeDetailsQuery, XchangeDetailsQueryVariables>(XchangeDetailsDocument, baseOptions);
      }
export function useXchangeDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<XchangeDetailsQuery, XchangeDetailsQueryVariables>) {
          return Apollo.useLazyQuery<XchangeDetailsQuery, XchangeDetailsQueryVariables>(XchangeDetailsDocument, baseOptions);
        }
export type XchangeDetailsQueryHookResult = ReturnType<typeof useXchangeDetailsQuery>;
export type XchangeDetailsLazyQueryHookResult = ReturnType<typeof useXchangeDetailsLazyQuery>;
export type XchangeDetailsQueryResult = Apollo.QueryResult<XchangeDetailsQuery, XchangeDetailsQueryVariables>;
export const PreviewConvertXchangeProfileDocument = gql`
    query PreviewConvertXchangeProfile($orgSid: ID!) {
  previewConvertXchangeProfile(orgSid: $orgSid) {
    info
    newVendors {
      sid
      name
      orgId
      orgType
      orgTypeLabel
    }
    newUserAccounts
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentWebCommandFragmentDoc}`;

/**
 * __usePreviewConvertXchangeProfileQuery__
 *
 * To run a query within a React component, call `usePreviewConvertXchangeProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `usePreviewConvertXchangeProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePreviewConvertXchangeProfileQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function usePreviewConvertXchangeProfileQuery(baseOptions: Apollo.QueryHookOptions<PreviewConvertXchangeProfileQuery, PreviewConvertXchangeProfileQueryVariables>) {
        return Apollo.useQuery<PreviewConvertXchangeProfileQuery, PreviewConvertXchangeProfileQueryVariables>(PreviewConvertXchangeProfileDocument, baseOptions);
      }
export function usePreviewConvertXchangeProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<PreviewConvertXchangeProfileQuery, PreviewConvertXchangeProfileQueryVariables>) {
          return Apollo.useLazyQuery<PreviewConvertXchangeProfileQuery, PreviewConvertXchangeProfileQueryVariables>(PreviewConvertXchangeProfileDocument, baseOptions);
        }
export type PreviewConvertXchangeProfileQueryHookResult = ReturnType<typeof usePreviewConvertXchangeProfileQuery>;
export type PreviewConvertXchangeProfileLazyQueryHookResult = ReturnType<typeof usePreviewConvertXchangeProfileLazyQuery>;
export type PreviewConvertXchangeProfileQueryResult = Apollo.QueryResult<PreviewConvertXchangeProfileQuery, PreviewConvertXchangeProfileQueryVariables>;
export const XchangeStepFormDocument = gql`
    query XchangeStepForm($xchangeFileProcessSid: ID!, $sid: ID) {
  xchangeStepForm(xchangeFileProcessSid: $xchangeFileProcessSid, sid: $sid) {
    sid
    xml {
      ...fragmentUIStringField
    }
    lastUpdated {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useXchangeStepFormQuery__
 *
 * To run a query within a React component, call `useXchangeStepFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useXchangeStepFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXchangeStepFormQuery({
 *   variables: {
 *      xchangeFileProcessSid: // value for 'xchangeFileProcessSid'
 *      sid: // value for 'sid'
 *   },
 * });
 */
export function useXchangeStepFormQuery(baseOptions: Apollo.QueryHookOptions<XchangeStepFormQuery, XchangeStepFormQueryVariables>) {
        return Apollo.useQuery<XchangeStepFormQuery, XchangeStepFormQueryVariables>(XchangeStepFormDocument, baseOptions);
      }
export function useXchangeStepFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<XchangeStepFormQuery, XchangeStepFormQueryVariables>) {
          return Apollo.useLazyQuery<XchangeStepFormQuery, XchangeStepFormQueryVariables>(XchangeStepFormDocument, baseOptions);
        }
export type XchangeStepFormQueryHookResult = ReturnType<typeof useXchangeStepFormQuery>;
export type XchangeStepFormLazyQueryHookResult = ReturnType<typeof useXchangeStepFormLazyQuery>;
export type XchangeStepFormQueryResult = Apollo.QueryResult<XchangeStepFormQuery, XchangeStepFormQueryVariables>;
export const XchangeFileTransmissionFormDocument = gql`
    query XchangeFileTransmissionForm($xchangeFileProcessSid: ID!, $sid: ID) {
  xchangeFileTransmissionForm(
    xchangeFileProcessSid: $xchangeFileProcessSid
    sid: $sid
  ) {
    sid
    parentId
    filenameQualifiers {
      ...fragmentUISelectManyField
    }
    protocol {
      ...fragmentUISelectOneField
    }
    host {
      ...fragmentUIStringField
    }
    port {
      ...fragmentUIIntField
    }
    userName {
      ...fragmentUIStringField
    }
    password {
      ...fragmentUIStringField
    }
    authKeyName {
      ...fragmentUISelectOneField
    }
    folder {
      ...fragmentUIStringField
    }
    filenamePattern {
      ...fragmentUIStringField
    }
    stepWise {
      ...fragmentUIBooleanField
    }
    encryptionKeyName {
      ...fragmentUISelectOneField
    }
    lastUpdated {
      ...fragmentUIReadOnlyField
    }
    comments {
      ...fragmentUIStringField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiStringFieldFragmentDoc}
${FragmentUiIntFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;

/**
 * __useXchangeFileTransmissionFormQuery__
 *
 * To run a query within a React component, call `useXchangeFileTransmissionFormQuery` and pass it any options that fit your needs.
 * When your component renders, `useXchangeFileTransmissionFormQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useXchangeFileTransmissionFormQuery({
 *   variables: {
 *      xchangeFileProcessSid: // value for 'xchangeFileProcessSid'
 *      sid: // value for 'sid'
 *   },
 * });
 */
export function useXchangeFileTransmissionFormQuery(baseOptions: Apollo.QueryHookOptions<XchangeFileTransmissionFormQuery, XchangeFileTransmissionFormQueryVariables>) {
        return Apollo.useQuery<XchangeFileTransmissionFormQuery, XchangeFileTransmissionFormQueryVariables>(XchangeFileTransmissionFormDocument, baseOptions);
      }
export function useXchangeFileTransmissionFormLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<XchangeFileTransmissionFormQuery, XchangeFileTransmissionFormQueryVariables>) {
          return Apollo.useLazyQuery<XchangeFileTransmissionFormQuery, XchangeFileTransmissionFormQueryVariables>(XchangeFileTransmissionFormDocument, baseOptions);
        }
export type XchangeFileTransmissionFormQueryHookResult = ReturnType<typeof useXchangeFileTransmissionFormQuery>;
export type XchangeFileTransmissionFormLazyQueryHookResult = ReturnType<typeof useXchangeFileTransmissionFormLazyQuery>;
export type XchangeFileTransmissionFormQueryResult = Apollo.QueryResult<XchangeFileTransmissionFormQuery, XchangeFileTransmissionFormQueryVariables>;
export const BeginLoginDocument = gql`
    mutation BeginLogin($userId: String!) {
  beginLogin(userId: $userId) {
    userId
    step
    redirectPath
    loginCompleteDomain {
      type
      selectedPage
      navItems {
        ...fragmentWebNav
      }
    }
    tokenUser {
      token
      session {
        id
        orgId
        orgSid
        orgName
        userId
        firstNm
        pollInterval
        defaultAuthorities
      }
    }
    forgotPasswordEnabled
    forgotPasswordMsg
  }
}
    ${FragmentWebNavFragmentDoc}`;
export type BeginLoginMutationFn = Apollo.MutationFunction<BeginLoginMutation, BeginLoginMutationVariables>;

/**
 * __useBeginLoginMutation__
 *
 * To run a mutation, you first call `useBeginLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useBeginLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [beginLoginMutation, { data, loading, error }] = useBeginLoginMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBeginLoginMutation(baseOptions?: Apollo.MutationHookOptions<BeginLoginMutation, BeginLoginMutationVariables>) {
        return Apollo.useMutation<BeginLoginMutation, BeginLoginMutationVariables>(BeginLoginDocument, baseOptions);
      }
export type BeginLoginMutationHookResult = ReturnType<typeof useBeginLoginMutation>;
export type BeginLoginMutationResult = Apollo.MutationResult<BeginLoginMutation>;
export type BeginLoginMutationOptions = Apollo.BaseMutationOptions<BeginLoginMutation, BeginLoginMutationVariables>;
export const PasswordLoginDocument = gql`
    mutation PasswordLogin($userId: String!, $password: String!) {
  passwordLogin(userId: $userId, password: $password) {
    step
    redirectPath
    loginCompleteDomain {
      type
      selectedPage
      navItems {
        ...fragmentWebNav
        subNavItems {
          ...fragmentWebNav
        }
      }
    }
    tokenUser {
      token
      session {
        id
        orgId
        orgSid
        orgName
        userId
        firstNm
        pollInterval
        defaultAuthorities
      }
    }
    forgotPasswordEnabled
    forgotPasswordMsg
  }
}
    ${FragmentWebNavFragmentDoc}`;
export type PasswordLoginMutationFn = Apollo.MutationFunction<PasswordLoginMutation, PasswordLoginMutationVariables>;

/**
 * __usePasswordLoginMutation__
 *
 * To run a mutation, you first call `usePasswordLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePasswordLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [passwordLoginMutation, { data, loading, error }] = usePasswordLoginMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function usePasswordLoginMutation(baseOptions?: Apollo.MutationHookOptions<PasswordLoginMutation, PasswordLoginMutationVariables>) {
        return Apollo.useMutation<PasswordLoginMutation, PasswordLoginMutationVariables>(PasswordLoginDocument, baseOptions);
      }
export type PasswordLoginMutationHookResult = ReturnType<typeof usePasswordLoginMutation>;
export type PasswordLoginMutationResult = Apollo.MutationResult<PasswordLoginMutation>;
export type PasswordLoginMutationOptions = Apollo.BaseMutationOptions<PasswordLoginMutation, PasswordLoginMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    successful
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<LogOutMutation, LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<LogOutMutation, LogOutMutationVariables>) {
        return Apollo.useMutation<LogOutMutation, LogOutMutationVariables>(LogOutDocument, baseOptions);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<LogOutMutation, LogOutMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($userId: String!) {
  forgotPassword(userId: $userId) {
    response
    responseMsg
  }
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const UpdateOwnPasswordDocument = gql`
    mutation UpdateOwnPassword($updateOwnPasswordInput: UpdateOwnPasswordInput!) {
  updateOwnPassword(updateOwnPasswordInput: $updateOwnPasswordInput) {
    id
    orgId
    orgSid
    orgName
    userId
    firstNm
    pollInterval
    defaultAuthorities
  }
}
    `;
export type UpdateOwnPasswordMutationFn = Apollo.MutationFunction<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>;

/**
 * __useUpdateOwnPasswordMutation__
 *
 * To run a mutation, you first call `useUpdateOwnPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOwnPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOwnPasswordMutation, { data, loading, error }] = useUpdateOwnPasswordMutation({
 *   variables: {
 *      updateOwnPasswordInput: // value for 'updateOwnPasswordInput'
 *   },
 * });
 */
export function useUpdateOwnPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>) {
        return Apollo.useMutation<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>(UpdateOwnPasswordDocument, baseOptions);
      }
export type UpdateOwnPasswordMutationHookResult = ReturnType<typeof useUpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationResult = Apollo.MutationResult<UpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($userSid: ID!) {
  resetPassword(userSid: $userSid)
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      userSid: // value for 'userSid'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, baseOptions);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
export const UpdatePasswordDocument = gql`
    mutation UpdatePassword($updatePasswordInput: UpdatePasswordInput!) {
  updatePassword(updatePasswordInput: $updatePasswordInput) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type UpdatePasswordMutationFn = Apollo.MutationFunction<UpdatePasswordMutation, UpdatePasswordMutationVariables>;

/**
 * __useUpdatePasswordMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordMutation, { data, loading, error }] = useUpdatePasswordMutation({
 *   variables: {
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdatePasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>) {
        return Apollo.useMutation<UpdatePasswordMutation, UpdatePasswordMutationVariables>(UpdatePasswordDocument, baseOptions);
      }
export type UpdatePasswordMutationHookResult = ReturnType<typeof useUpdatePasswordMutation>;
export type UpdatePasswordMutationResult = Apollo.MutationResult<UpdatePasswordMutation>;
export type UpdatePasswordMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordMutation, UpdatePasswordMutationVariables>;
export const CreateOrgDocument = gql`
    mutation CreateOrg($orgInfo: CreateOrgInput!) {
  createOrg(orgInfo: $orgInfo) {
    sid
    name {
      ...fragmentUIStringField
    }
    orgId {
      ...fragmentUIStringField
    }
    orgType {
      ...fragmentUISelectOneField
    }
    active {
      ...fragmentUIBooleanField
    }
    whitelist {
      pattern {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type CreateOrgMutationFn = Apollo.MutationFunction<CreateOrgMutation, CreateOrgMutationVariables>;

/**
 * __useCreateOrgMutation__
 *
 * To run a mutation, you first call `useCreateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrgMutation, { data, loading, error }] = useCreateOrgMutation({
 *   variables: {
 *      orgInfo: // value for 'orgInfo'
 *   },
 * });
 */
export function useCreateOrgMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>) {
        return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, baseOptions);
      }
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
export const UpdateOrgDocument = gql`
    mutation UpdateOrg($orgInfo: UpdateOrgInput!) {
  updateOrg(orgInfo: $orgInfo) {
    sid
    name {
      ...fragmentUIStringField
    }
    orgId {
      ...fragmentUIStringField
    }
    orgType {
      ...fragmentUISelectOneField
    }
    active {
      ...fragmentUIBooleanField
    }
    whitelist {
      pattern {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateOrgMutationFn = Apollo.MutationFunction<UpdateOrgMutation, UpdateOrgMutationVariables>;

/**
 * __useUpdateOrgMutation__
 *
 * To run a mutation, you first call `useUpdateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgMutation, { data, loading, error }] = useUpdateOrgMutation({
 *   variables: {
 *      orgInfo: // value for 'orgInfo'
 *   },
 * });
 */
export function useUpdateOrgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgMutation, UpdateOrgMutationVariables>) {
        return Apollo.useMutation<UpdateOrgMutation, UpdateOrgMutationVariables>(UpdateOrgDocument, baseOptions);
      }
export type UpdateOrgMutationHookResult = ReturnType<typeof useUpdateOrgMutation>;
export type UpdateOrgMutationResult = Apollo.MutationResult<UpdateOrgMutation>;
export type UpdateOrgMutationOptions = Apollo.BaseMutationOptions<UpdateOrgMutation, UpdateOrgMutationVariables>;
export const DeactivateOrgDocument = gql`
    mutation DeactivateOrg($orgSid: ID!) {
  deactivateOrg(orgSid: $orgSid)
}
    `;
export type DeactivateOrgMutationFn = Apollo.MutationFunction<DeactivateOrgMutation, DeactivateOrgMutationVariables>;

/**
 * __useDeactivateOrgMutation__
 *
 * To run a mutation, you first call `useDeactivateOrgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateOrgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateOrgMutation, { data, loading, error }] = useDeactivateOrgMutation({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useDeactivateOrgMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateOrgMutation, DeactivateOrgMutationVariables>) {
        return Apollo.useMutation<DeactivateOrgMutation, DeactivateOrgMutationVariables>(DeactivateOrgDocument, baseOptions);
      }
export type DeactivateOrgMutationHookResult = ReturnType<typeof useDeactivateOrgMutation>;
export type DeactivateOrgMutationResult = Apollo.MutationResult<DeactivateOrgMutation>;
export type DeactivateOrgMutationOptions = Apollo.BaseMutationOptions<DeactivateOrgMutation, DeactivateOrgMutationVariables>;
export const UpdateOrgSecurityDocument = gql`
    mutation UpdateOrgSecurity($orgSecurityInfo: UpdateOrgSecurityInput!) {
  updateOrgSecurity(orgSecurityInfo: $orgSecurityInfo) {
    orgSid
    forgotPasswordEnabled {
      ...fragmentUIBooleanField
    }
    forgotPasswordMsg {
      ...fragmentUIStringField
    }
    allowedEmailDomains {
      ...fragmentUIStringField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiStringFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateOrgSecurityMutationFn = Apollo.MutationFunction<UpdateOrgSecurityMutation, UpdateOrgSecurityMutationVariables>;

/**
 * __useUpdateOrgSecurityMutation__
 *
 * To run a mutation, you first call `useUpdateOrgSecurityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOrgSecurityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOrgSecurityMutation, { data, loading, error }] = useUpdateOrgSecurityMutation({
 *   variables: {
 *      orgSecurityInfo: // value for 'orgSecurityInfo'
 *   },
 * });
 */
export function useUpdateOrgSecurityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOrgSecurityMutation, UpdateOrgSecurityMutationVariables>) {
        return Apollo.useMutation<UpdateOrgSecurityMutation, UpdateOrgSecurityMutationVariables>(UpdateOrgSecurityDocument, baseOptions);
      }
export type UpdateOrgSecurityMutationHookResult = ReturnType<typeof useUpdateOrgSecurityMutation>;
export type UpdateOrgSecurityMutationResult = Apollo.MutationResult<UpdateOrgSecurityMutation>;
export type UpdateOrgSecurityMutationOptions = Apollo.BaseMutationOptions<UpdateOrgSecurityMutation, UpdateOrgSecurityMutationVariables>;
export const CreateAccessPolicyDocument = gql`
    mutation CreateAccessPolicy($createAccessPolicyInput: CreateAccessPolicyInput!) {
  createAccessPolicy(createAccessPolicyInput: $createAccessPolicyInput) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    permissions {
      ...fragmentUISelectManyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type CreateAccessPolicyMutationFn = Apollo.MutationFunction<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>;

/**
 * __useCreateAccessPolicyMutation__
 *
 * To run a mutation, you first call `useCreateAccessPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessPolicyMutation, { data, loading, error }] = useCreateAccessPolicyMutation({
 *   variables: {
 *      createAccessPolicyInput: // value for 'createAccessPolicyInput'
 *   },
 * });
 */
export function useCreateAccessPolicyMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>) {
        return Apollo.useMutation<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>(CreateAccessPolicyDocument, baseOptions);
      }
export type CreateAccessPolicyMutationHookResult = ReturnType<typeof useCreateAccessPolicyMutation>;
export type CreateAccessPolicyMutationResult = Apollo.MutationResult<CreateAccessPolicyMutation>;
export type CreateAccessPolicyMutationOptions = Apollo.BaseMutationOptions<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>;
export const UpdateAccessPolicyDocument = gql`
    mutation UpdateAccessPolicy($updateAccessPolicyInput: UpdateAccessPolicyInput) {
  updateAccessPolicy(updateAccessPolicyInput: $updateAccessPolicyInput) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    permissions {
      ...fragmentUISelectManyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateAccessPolicyMutationFn = Apollo.MutationFunction<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>;

/**
 * __useUpdateAccessPolicyMutation__
 *
 * To run a mutation, you first call `useUpdateAccessPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessPolicyMutation, { data, loading, error }] = useUpdateAccessPolicyMutation({
 *   variables: {
 *      updateAccessPolicyInput: // value for 'updateAccessPolicyInput'
 *   },
 * });
 */
export function useUpdateAccessPolicyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>) {
        return Apollo.useMutation<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>(UpdateAccessPolicyDocument, baseOptions);
      }
export type UpdateAccessPolicyMutationHookResult = ReturnType<typeof useUpdateAccessPolicyMutation>;
export type UpdateAccessPolicyMutationResult = Apollo.MutationResult<UpdateAccessPolicyMutation>;
export type UpdateAccessPolicyMutationOptions = Apollo.BaseMutationOptions<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>;
export const DeleteAccessPoliciesDocument = gql`
    mutation DeleteAccessPolicies($deleteAccessPoliciesInput: DeleteAccessPoliciesInput) {
  deleteAccessPolicies(deleteAccessPoliciesInput: $deleteAccessPoliciesInput)
}
    `;
export type DeleteAccessPoliciesMutationFn = Apollo.MutationFunction<DeleteAccessPoliciesMutation, DeleteAccessPoliciesMutationVariables>;

/**
 * __useDeleteAccessPoliciesMutation__
 *
 * To run a mutation, you first call `useDeleteAccessPoliciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessPoliciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessPoliciesMutation, { data, loading, error }] = useDeleteAccessPoliciesMutation({
 *   variables: {
 *      deleteAccessPoliciesInput: // value for 'deleteAccessPoliciesInput'
 *   },
 * });
 */
export function useDeleteAccessPoliciesMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessPoliciesMutation, DeleteAccessPoliciesMutationVariables>) {
        return Apollo.useMutation<DeleteAccessPoliciesMutation, DeleteAccessPoliciesMutationVariables>(DeleteAccessPoliciesDocument, baseOptions);
      }
export type DeleteAccessPoliciesMutationHookResult = ReturnType<typeof useDeleteAccessPoliciesMutation>;
export type DeleteAccessPoliciesMutationResult = Apollo.MutationResult<DeleteAccessPoliciesMutation>;
export type DeleteAccessPoliciesMutationOptions = Apollo.BaseMutationOptions<DeleteAccessPoliciesMutation, DeleteAccessPoliciesMutationVariables>;
export const DeleteAccessPolicyDocument = gql`
    mutation DeleteAccessPolicy($policySid: ID!) {
  deleteAccessPolicy(policySid: $policySid)
}
    `;
export type DeleteAccessPolicyMutationFn = Apollo.MutationFunction<DeleteAccessPolicyMutation, DeleteAccessPolicyMutationVariables>;

/**
 * __useDeleteAccessPolicyMutation__
 *
 * To run a mutation, you first call `useDeleteAccessPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessPolicyMutation, { data, loading, error }] = useDeleteAccessPolicyMutation({
 *   variables: {
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useDeleteAccessPolicyMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessPolicyMutation, DeleteAccessPolicyMutationVariables>) {
        return Apollo.useMutation<DeleteAccessPolicyMutation, DeleteAccessPolicyMutationVariables>(DeleteAccessPolicyDocument, baseOptions);
      }
export type DeleteAccessPolicyMutationHookResult = ReturnType<typeof useDeleteAccessPolicyMutation>;
export type DeleteAccessPolicyMutationResult = Apollo.MutationResult<DeleteAccessPolicyMutation>;
export type DeleteAccessPolicyMutationOptions = Apollo.BaseMutationOptions<DeleteAccessPolicyMutation, DeleteAccessPolicyMutationVariables>;
export const CreateAccessSpecializationDocument = gql`
    mutation CreateAccessSpecialization($createAccessSpecializationInput: CreateAccessSpecializationInput!) {
  createAccessSpecialization(
    createAccessSpecializationInput: $createAccessSpecializationInput
  ) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    filters {
      permission
      label
      orgSids {
        ...fragmentUISelectManyField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type CreateAccessSpecializationMutationFn = Apollo.MutationFunction<CreateAccessSpecializationMutation, CreateAccessSpecializationMutationVariables>;

/**
 * __useCreateAccessSpecializationMutation__
 *
 * To run a mutation, you first call `useCreateAccessSpecializationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessSpecializationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessSpecializationMutation, { data, loading, error }] = useCreateAccessSpecializationMutation({
 *   variables: {
 *      createAccessSpecializationInput: // value for 'createAccessSpecializationInput'
 *   },
 * });
 */
export function useCreateAccessSpecializationMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessSpecializationMutation, CreateAccessSpecializationMutationVariables>) {
        return Apollo.useMutation<CreateAccessSpecializationMutation, CreateAccessSpecializationMutationVariables>(CreateAccessSpecializationDocument, baseOptions);
      }
export type CreateAccessSpecializationMutationHookResult = ReturnType<typeof useCreateAccessSpecializationMutation>;
export type CreateAccessSpecializationMutationResult = Apollo.MutationResult<CreateAccessSpecializationMutation>;
export type CreateAccessSpecializationMutationOptions = Apollo.BaseMutationOptions<CreateAccessSpecializationMutation, CreateAccessSpecializationMutationVariables>;
export const UpdateAccessSpecializationDocument = gql`
    mutation UpdateAccessSpecialization($updateAccessSpecializationInput: UpdateAccessSpecializationInput) {
  updateAccessSpecialization(
    updateAccessSpecializationInput: $updateAccessSpecializationInput
  ) {
    sid
    name {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    filters {
      permission
      label
      orgSids {
        ...fragmentUISelectManyField
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateAccessSpecializationMutationFn = Apollo.MutationFunction<UpdateAccessSpecializationMutation, UpdateAccessSpecializationMutationVariables>;

/**
 * __useUpdateAccessSpecializationMutation__
 *
 * To run a mutation, you first call `useUpdateAccessSpecializationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessSpecializationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessSpecializationMutation, { data, loading, error }] = useUpdateAccessSpecializationMutation({
 *   variables: {
 *      updateAccessSpecializationInput: // value for 'updateAccessSpecializationInput'
 *   },
 * });
 */
export function useUpdateAccessSpecializationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessSpecializationMutation, UpdateAccessSpecializationMutationVariables>) {
        return Apollo.useMutation<UpdateAccessSpecializationMutation, UpdateAccessSpecializationMutationVariables>(UpdateAccessSpecializationDocument, baseOptions);
      }
export type UpdateAccessSpecializationMutationHookResult = ReturnType<typeof useUpdateAccessSpecializationMutation>;
export type UpdateAccessSpecializationMutationResult = Apollo.MutationResult<UpdateAccessSpecializationMutation>;
export type UpdateAccessSpecializationMutationOptions = Apollo.BaseMutationOptions<UpdateAccessSpecializationMutation, UpdateAccessSpecializationMutationVariables>;
export const DeleteAccessSpecializationDocument = gql`
    mutation DeleteAccessSpecialization($specializationSid: ID!) {
  deleteAccessSpecialization(specializationSid: $specializationSid)
}
    `;
export type DeleteAccessSpecializationMutationFn = Apollo.MutationFunction<DeleteAccessSpecializationMutation, DeleteAccessSpecializationMutationVariables>;

/**
 * __useDeleteAccessSpecializationMutation__
 *
 * To run a mutation, you first call `useDeleteAccessSpecializationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessSpecializationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessSpecializationMutation, { data, loading, error }] = useDeleteAccessSpecializationMutation({
 *   variables: {
 *      specializationSid: // value for 'specializationSid'
 *   },
 * });
 */
export function useDeleteAccessSpecializationMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessSpecializationMutation, DeleteAccessSpecializationMutationVariables>) {
        return Apollo.useMutation<DeleteAccessSpecializationMutation, DeleteAccessSpecializationMutationVariables>(DeleteAccessSpecializationDocument, baseOptions);
      }
export type DeleteAccessSpecializationMutationHookResult = ReturnType<typeof useDeleteAccessSpecializationMutation>;
export type DeleteAccessSpecializationMutationResult = Apollo.MutationResult<DeleteAccessSpecializationMutation>;
export type DeleteAccessSpecializationMutationOptions = Apollo.BaseMutationOptions<DeleteAccessSpecializationMutation, DeleteAccessSpecializationMutationVariables>;
export const CreateAccessPolicyGroupDocument = gql`
    mutation CreateAccessPolicyGroup($createAccessPolicyGroupInput: CreateAccessPolicyGroupInput!) {
  createAccessPolicyGroup(
    createAccessPolicyGroupInput: $createAccessPolicyGroupInput
  ) {
    sid
    name {
      ...fragmentUIStringField
    }
    description {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    policies {
      ...fragmentUISelectManyField
    }
    specializations {
      ...fragmentUISelectManyField
    }
    includeAllSubOrgs {
      ...fragmentUIBooleanField
    }
    includeOrgSids {
      ...fragmentUISelectManyField
    }
    excludeOrgSids {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type CreateAccessPolicyGroupMutationFn = Apollo.MutationFunction<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>;

/**
 * __useCreateAccessPolicyGroupMutation__
 *
 * To run a mutation, you first call `useCreateAccessPolicyGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccessPolicyGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccessPolicyGroupMutation, { data, loading, error }] = useCreateAccessPolicyGroupMutation({
 *   variables: {
 *      createAccessPolicyGroupInput: // value for 'createAccessPolicyGroupInput'
 *   },
 * });
 */
export function useCreateAccessPolicyGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>) {
        return Apollo.useMutation<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>(CreateAccessPolicyGroupDocument, baseOptions);
      }
export type CreateAccessPolicyGroupMutationHookResult = ReturnType<typeof useCreateAccessPolicyGroupMutation>;
export type CreateAccessPolicyGroupMutationResult = Apollo.MutationResult<CreateAccessPolicyGroupMutation>;
export type CreateAccessPolicyGroupMutationOptions = Apollo.BaseMutationOptions<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>;
export const UpdateAccessPolicyGroupDocument = gql`
    mutation UpdateAccessPolicyGroup($updateAccessPolicyGroupInput: UpdateAccessPolicyGroupInput) {
  updateAccessPolicyGroup(
    updateAccessPolicyGroupInput: $updateAccessPolicyGroupInput
  ) {
    sid
    name {
      ...fragmentUIStringField
    }
    description {
      ...fragmentUIStringField
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    tmpl {
      ...fragmentUIBooleanField
    }
    tmplUseAsIs {
      ...fragmentUIBooleanField
    }
    applicableOrgTypes {
      ...fragmentUISelectManyField
    }
    policies {
      ...fragmentUISelectManyField
    }
    specializations {
      ...fragmentUISelectManyField
    }
    includeAllSubOrgs {
      ...fragmentUIBooleanField
    }
    includeOrgSids {
      ...fragmentUISelectManyField
    }
    excludeOrgSids {
      ...fragmentUISelectManyField
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateAccessPolicyGroupMutationFn = Apollo.MutationFunction<UpdateAccessPolicyGroupMutation, UpdateAccessPolicyGroupMutationVariables>;

/**
 * __useUpdateAccessPolicyGroupMutation__
 *
 * To run a mutation, you first call `useUpdateAccessPolicyGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccessPolicyGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccessPolicyGroupMutation, { data, loading, error }] = useUpdateAccessPolicyGroupMutation({
 *   variables: {
 *      updateAccessPolicyGroupInput: // value for 'updateAccessPolicyGroupInput'
 *   },
 * });
 */
export function useUpdateAccessPolicyGroupMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccessPolicyGroupMutation, UpdateAccessPolicyGroupMutationVariables>) {
        return Apollo.useMutation<UpdateAccessPolicyGroupMutation, UpdateAccessPolicyGroupMutationVariables>(UpdateAccessPolicyGroupDocument, baseOptions);
      }
export type UpdateAccessPolicyGroupMutationHookResult = ReturnType<typeof useUpdateAccessPolicyGroupMutation>;
export type UpdateAccessPolicyGroupMutationResult = Apollo.MutationResult<UpdateAccessPolicyGroupMutation>;
export type UpdateAccessPolicyGroupMutationOptions = Apollo.BaseMutationOptions<UpdateAccessPolicyGroupMutation, UpdateAccessPolicyGroupMutationVariables>;
export const DeleteAccessPolicyGroupDocument = gql`
    mutation DeleteAccessPolicyGroup($policyGroupSid: ID!) {
  deleteAccessPolicyGroup(policyGroupSid: $policyGroupSid)
}
    `;
export type DeleteAccessPolicyGroupMutationFn = Apollo.MutationFunction<DeleteAccessPolicyGroupMutation, DeleteAccessPolicyGroupMutationVariables>;

/**
 * __useDeleteAccessPolicyGroupMutation__
 *
 * To run a mutation, you first call `useDeleteAccessPolicyGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAccessPolicyGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAccessPolicyGroupMutation, { data, loading, error }] = useDeleteAccessPolicyGroupMutation({
 *   variables: {
 *      policyGroupSid: // value for 'policyGroupSid'
 *   },
 * });
 */
export function useDeleteAccessPolicyGroupMutation(baseOptions?: Apollo.MutationHookOptions<DeleteAccessPolicyGroupMutation, DeleteAccessPolicyGroupMutationVariables>) {
        return Apollo.useMutation<DeleteAccessPolicyGroupMutation, DeleteAccessPolicyGroupMutationVariables>(DeleteAccessPolicyGroupDocument, baseOptions);
      }
export type DeleteAccessPolicyGroupMutationHookResult = ReturnType<typeof useDeleteAccessPolicyGroupMutation>;
export type DeleteAccessPolicyGroupMutationResult = Apollo.MutationResult<DeleteAccessPolicyGroupMutation>;
export type DeleteAccessPolicyGroupMutationOptions = Apollo.BaseMutationOptions<DeleteAccessPolicyGroupMutation, DeleteAccessPolicyGroupMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
  createUser(userInfo: $userInfo, personInfo: $personInfo) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *      personInfo: // value for 'personInfo'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($userInfo: UpdateUserInput!) {
  updateUser(userInfo: $userInfo) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserAccessPolicyGroupsDocument = gql`
    mutation UpdateUserAccessPolicyGroups($userAccessPolicyGroupUpdate: UpdateUserAccessPolicyGroupsInput) {
  updateUserAccessPolicyGroups(
    userAccessPolicyGroupUpdate: $userAccessPolicyGroupUpdate
  ) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type UpdateUserAccessPolicyGroupsMutationFn = Apollo.MutationFunction<UpdateUserAccessPolicyGroupsMutation, UpdateUserAccessPolicyGroupsMutationVariables>;

/**
 * __useUpdateUserAccessPolicyGroupsMutation__
 *
 * To run a mutation, you first call `useUpdateUserAccessPolicyGroupsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserAccessPolicyGroupsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserAccessPolicyGroupsMutation, { data, loading, error }] = useUpdateUserAccessPolicyGroupsMutation({
 *   variables: {
 *      userAccessPolicyGroupUpdate: // value for 'userAccessPolicyGroupUpdate'
 *   },
 * });
 */
export function useUpdateUserAccessPolicyGroupsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserAccessPolicyGroupsMutation, UpdateUserAccessPolicyGroupsMutationVariables>) {
        return Apollo.useMutation<UpdateUserAccessPolicyGroupsMutation, UpdateUserAccessPolicyGroupsMutationVariables>(UpdateUserAccessPolicyGroupsDocument, baseOptions);
      }
export type UpdateUserAccessPolicyGroupsMutationHookResult = ReturnType<typeof useUpdateUserAccessPolicyGroupsMutation>;
export type UpdateUserAccessPolicyGroupsMutationResult = Apollo.MutationResult<UpdateUserAccessPolicyGroupsMutation>;
export type UpdateUserAccessPolicyGroupsMutationOptions = Apollo.BaseMutationOptions<UpdateUserAccessPolicyGroupsMutation, UpdateUserAccessPolicyGroupsMutationVariables>;
export const DeactivateUserDocument = gql`
    mutation DeactivateUser($sidInput: SidInput!) {
  deactivateUser(sidInput: $sidInput)
}
    `;
export type DeactivateUserMutationFn = Apollo.MutationFunction<DeactivateUserMutation, DeactivateUserMutationVariables>;

/**
 * __useDeactivateUserMutation__
 *
 * To run a mutation, you first call `useDeactivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUserMutation, { data, loading, error }] = useDeactivateUserMutation({
 *   variables: {
 *      sidInput: // value for 'sidInput'
 *   },
 * });
 */
export function useDeactivateUserMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>) {
        return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(DeactivateUserDocument, baseOptions);
      }
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<DeactivateUserMutation, DeactivateUserMutationVariables>;
export const DeactivateUsersDocument = gql`
    mutation DeactivateUsers($sidsInput: SidsInput!) {
  deactivateUsers(sidsInput: $sidsInput)
}
    `;
export type DeactivateUsersMutationFn = Apollo.MutationFunction<DeactivateUsersMutation, DeactivateUsersMutationVariables>;

/**
 * __useDeactivateUsersMutation__
 *
 * To run a mutation, you first call `useDeactivateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeactivateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deactivateUsersMutation, { data, loading, error }] = useDeactivateUsersMutation({
 *   variables: {
 *      sidsInput: // value for 'sidsInput'
 *   },
 * });
 */
export function useDeactivateUsersMutation(baseOptions?: Apollo.MutationHookOptions<DeactivateUsersMutation, DeactivateUsersMutationVariables>) {
        return Apollo.useMutation<DeactivateUsersMutation, DeactivateUsersMutationVariables>(DeactivateUsersDocument, baseOptions);
      }
export type DeactivateUsersMutationHookResult = ReturnType<typeof useDeactivateUsersMutation>;
export type DeactivateUsersMutationResult = Apollo.MutationResult<DeactivateUsersMutation>;
export type DeactivateUsersMutationOptions = Apollo.BaseMutationOptions<DeactivateUsersMutation, DeactivateUsersMutationVariables>;
export const ActivateUserDocument = gql`
    mutation ActivateUser($sidInput: SidInput!) {
  activateUser(sidInput: $sidInput)
}
    `;
export type ActivateUserMutationFn = Apollo.MutationFunction<ActivateUserMutation, ActivateUserMutationVariables>;

/**
 * __useActivateUserMutation__
 *
 * To run a mutation, you first call `useActivateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUserMutation, { data, loading, error }] = useActivateUserMutation({
 *   variables: {
 *      sidInput: // value for 'sidInput'
 *   },
 * });
 */
export function useActivateUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>) {
        return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, baseOptions);
      }
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<ActivateUserMutation, ActivateUserMutationVariables>;
export const ActivateUsersDocument = gql`
    mutation ActivateUsers($sidsInput: SidsInput!) {
  activateUsers(sidsInput: $sidsInput)
}
    `;
export type ActivateUsersMutationFn = Apollo.MutationFunction<ActivateUsersMutation, ActivateUsersMutationVariables>;

/**
 * __useActivateUsersMutation__
 *
 * To run a mutation, you first call `useActivateUsersMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateUsersMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateUsersMutation, { data, loading, error }] = useActivateUsersMutation({
 *   variables: {
 *      sidsInput: // value for 'sidsInput'
 *   },
 * });
 */
export function useActivateUsersMutation(baseOptions?: Apollo.MutationHookOptions<ActivateUsersMutation, ActivateUsersMutationVariables>) {
        return Apollo.useMutation<ActivateUsersMutation, ActivateUsersMutationVariables>(ActivateUsersDocument, baseOptions);
      }
export type ActivateUsersMutationHookResult = ReturnType<typeof useActivateUsersMutation>;
export type ActivateUsersMutationResult = Apollo.MutationResult<ActivateUsersMutation>;
export type ActivateUsersMutationOptions = Apollo.BaseMutationOptions<ActivateUsersMutation, ActivateUsersMutationVariables>;
export const GrantExternalUserAccessDocument = gql`
    mutation GrantExternalUserAccess($userInfo: GrantExternalUserInput!) {
  grantExternalUserAccess(userInfo: $userInfo) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type GrantExternalUserAccessMutationFn = Apollo.MutationFunction<GrantExternalUserAccessMutation, GrantExternalUserAccessMutationVariables>;

/**
 * __useGrantExternalUserAccessMutation__
 *
 * To run a mutation, you first call `useGrantExternalUserAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGrantExternalUserAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [grantExternalUserAccessMutation, { data, loading, error }] = useGrantExternalUserAccessMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *   },
 * });
 */
export function useGrantExternalUserAccessMutation(baseOptions?: Apollo.MutationHookOptions<GrantExternalUserAccessMutation, GrantExternalUserAccessMutationVariables>) {
        return Apollo.useMutation<GrantExternalUserAccessMutation, GrantExternalUserAccessMutationVariables>(GrantExternalUserAccessDocument, baseOptions);
      }
export type GrantExternalUserAccessMutationHookResult = ReturnType<typeof useGrantExternalUserAccessMutation>;
export type GrantExternalUserAccessMutationResult = Apollo.MutationResult<GrantExternalUserAccessMutation>;
export type GrantExternalUserAccessMutationOptions = Apollo.BaseMutationOptions<GrantExternalUserAccessMutation, GrantExternalUserAccessMutationVariables>;
export const CreateExternalUserDocument = gql`
    mutation CreateExternalUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
  createExternalUser(userInfo: $userInfo, personInfo: $personInfo) {
    sid
    email {
      ...fragmentUIStringField
    }
    active {
      ...fragmentUIBooleanField
    }
    person {
      sid
      firstNm {
        ...fragmentUIStringField
      }
      lastNm {
        ...fragmentUIStringField
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      ...fragmentUIReadOnlyField
    }
    accessPolicyGroups {
      ...fragmentUISelectManyField
    }
    sendActivationEmail {
      ...fragmentUIBooleanField
    }
    lastLogin {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type CreateExternalUserMutationFn = Apollo.MutationFunction<CreateExternalUserMutation, CreateExternalUserMutationVariables>;

/**
 * __useCreateExternalUserMutation__
 *
 * To run a mutation, you first call `useCreateExternalUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateExternalUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createExternalUserMutation, { data, loading, error }] = useCreateExternalUserMutation({
 *   variables: {
 *      userInfo: // value for 'userInfo'
 *      personInfo: // value for 'personInfo'
 *   },
 * });
 */
export function useCreateExternalUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateExternalUserMutation, CreateExternalUserMutationVariables>) {
        return Apollo.useMutation<CreateExternalUserMutation, CreateExternalUserMutationVariables>(CreateExternalUserDocument, baseOptions);
      }
export type CreateExternalUserMutationHookResult = ReturnType<typeof useCreateExternalUserMutation>;
export type CreateExternalUserMutationResult = Apollo.MutationResult<CreateExternalUserMutation>;
export type CreateExternalUserMutationOptions = Apollo.BaseMutationOptions<CreateExternalUserMutation, CreateExternalUserMutationVariables>;
export const RevokeExternalUserAccessDocument = gql`
    mutation RevokeExternalUserAccess($orgSid: ID!, $userAccountSid: ID!) {
  revokeExternalUserAccess(orgSid: $orgSid, userAccountSid: $userAccountSid) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type RevokeExternalUserAccessMutationFn = Apollo.MutationFunction<RevokeExternalUserAccessMutation, RevokeExternalUserAccessMutationVariables>;

/**
 * __useRevokeExternalUserAccessMutation__
 *
 * To run a mutation, you first call `useRevokeExternalUserAccessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRevokeExternalUserAccessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [revokeExternalUserAccessMutation, { data, loading, error }] = useRevokeExternalUserAccessMutation({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      userAccountSid: // value for 'userAccountSid'
 *   },
 * });
 */
export function useRevokeExternalUserAccessMutation(baseOptions?: Apollo.MutationHookOptions<RevokeExternalUserAccessMutation, RevokeExternalUserAccessMutationVariables>) {
        return Apollo.useMutation<RevokeExternalUserAccessMutation, RevokeExternalUserAccessMutationVariables>(RevokeExternalUserAccessDocument, baseOptions);
      }
export type RevokeExternalUserAccessMutationHookResult = ReturnType<typeof useRevokeExternalUserAccessMutation>;
export type RevokeExternalUserAccessMutationResult = Apollo.MutationResult<RevokeExternalUserAccessMutation>;
export type RevokeExternalUserAccessMutationOptions = Apollo.BaseMutationOptions<RevokeExternalUserAccessMutation, RevokeExternalUserAccessMutationVariables>;
export const CreateDashThemeColorDocument = gql`
    mutation CreateDashThemeColor($createDashThemeColorInput: CreateDashThemeColorInput!) {
  createDashThemeColor(createDashThemeColorInput: $createDashThemeColorInput) {
    id
    defaultPalette
    themeColorMode
    allowDark
    paletteNm
    themePrimary
    themeLighterAlt
    themeLighter
    themeLight
    themeTertiary
    themeSecondary
    themeDarkAlt
    themeDark
    themeDarker
    neutralLighterAlt
    neutralLighter
    neutralLight
    neutralQuaternaryAlt
    neutralQuaternary
    neutralTertiaryAlt
    neutralTertiary
    neutralSecondary
    neutralPrimaryAlt
    neutralPrimary
    neutralDark
    black
    white
  }
}
    `;
export type CreateDashThemeColorMutationFn = Apollo.MutationFunction<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>;

/**
 * __useCreateDashThemeColorMutation__
 *
 * To run a mutation, you first call `useCreateDashThemeColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDashThemeColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDashThemeColorMutation, { data, loading, error }] = useCreateDashThemeColorMutation({
 *   variables: {
 *      createDashThemeColorInput: // value for 'createDashThemeColorInput'
 *   },
 * });
 */
export function useCreateDashThemeColorMutation(baseOptions?: Apollo.MutationHookOptions<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>) {
        return Apollo.useMutation<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>(CreateDashThemeColorDocument, baseOptions);
      }
export type CreateDashThemeColorMutationHookResult = ReturnType<typeof useCreateDashThemeColorMutation>;
export type CreateDashThemeColorMutationResult = Apollo.MutationResult<CreateDashThemeColorMutation>;
export type CreateDashThemeColorMutationOptions = Apollo.BaseMutationOptions<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>;
export const UpdateDashThemeColorDocument = gql`
    mutation UpdateDashThemeColor($updateDashThemeColorInput: UpdateDashThemeColorInput!) {
  updateDashThemeColor(updateDashThemeColorInput: $updateDashThemeColorInput) {
    id
    defaultPalette
    themeColorMode
    allowDark
    paletteNm
    themePrimary
    themeLighterAlt
    themeLighter
    themeLight
    themeTertiary
    themeSecondary
    themeDarkAlt
    themeDark
    themeDarker
    neutralLighterAlt
    neutralLighter
    neutralLight
    neutralQuaternaryAlt
    neutralQuaternary
    neutralTertiaryAlt
    neutralTertiary
    neutralSecondary
    neutralPrimaryAlt
    neutralPrimary
    neutralDark
    black
    white
  }
}
    `;
export type UpdateDashThemeColorMutationFn = Apollo.MutationFunction<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>;

/**
 * __useUpdateDashThemeColorMutation__
 *
 * To run a mutation, you first call `useUpdateDashThemeColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDashThemeColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDashThemeColorMutation, { data, loading, error }] = useUpdateDashThemeColorMutation({
 *   variables: {
 *      updateDashThemeColorInput: // value for 'updateDashThemeColorInput'
 *   },
 * });
 */
export function useUpdateDashThemeColorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>) {
        return Apollo.useMutation<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>(UpdateDashThemeColorDocument, baseOptions);
      }
export type UpdateDashThemeColorMutationHookResult = ReturnType<typeof useUpdateDashThemeColorMutation>;
export type UpdateDashThemeColorMutationResult = Apollo.MutationResult<UpdateDashThemeColorMutation>;
export type UpdateDashThemeColorMutationOptions = Apollo.BaseMutationOptions<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>;
export const CreateDefaultDashThemeDocument = gql`
    mutation CreateDefaultDashTheme($createDefaultDashThemeInput: CreateDefaultDashThemeInput) {
  createDefaultDashTheme(
    createDefaultDashThemeInput: $createDefaultDashThemeInput
  ) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;
export type CreateDefaultDashThemeMutationFn = Apollo.MutationFunction<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>;

/**
 * __useCreateDefaultDashThemeMutation__
 *
 * To run a mutation, you first call `useCreateDefaultDashThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDefaultDashThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDefaultDashThemeMutation, { data, loading, error }] = useCreateDefaultDashThemeMutation({
 *   variables: {
 *      createDefaultDashThemeInput: // value for 'createDefaultDashThemeInput'
 *   },
 * });
 */
export function useCreateDefaultDashThemeMutation(baseOptions?: Apollo.MutationHookOptions<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>) {
        return Apollo.useMutation<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>(CreateDefaultDashThemeDocument, baseOptions);
      }
export type CreateDefaultDashThemeMutationHookResult = ReturnType<typeof useCreateDefaultDashThemeMutation>;
export type CreateDefaultDashThemeMutationResult = Apollo.MutationResult<CreateDefaultDashThemeMutation>;
export type CreateDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>;
export const UpdateDefaultDashThemeDocument = gql`
    mutation UpdateDefaultDashTheme($updateDefaultDashThemeInput: UpdateDefaultDashThemeInput) {
  updateDefaultDashTheme(
    updateDefaultDashThemeInput: $updateDefaultDashThemeInput
  ) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;
export type UpdateDefaultDashThemeMutationFn = Apollo.MutationFunction<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>;

/**
 * __useUpdateDefaultDashThemeMutation__
 *
 * To run a mutation, you first call `useUpdateDefaultDashThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDefaultDashThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDefaultDashThemeMutation, { data, loading, error }] = useUpdateDefaultDashThemeMutation({
 *   variables: {
 *      updateDefaultDashThemeInput: // value for 'updateDefaultDashThemeInput'
 *   },
 * });
 */
export function useUpdateDefaultDashThemeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>) {
        return Apollo.useMutation<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>(UpdateDefaultDashThemeDocument, baseOptions);
      }
export type UpdateDefaultDashThemeMutationHookResult = ReturnType<typeof useUpdateDefaultDashThemeMutation>;
export type UpdateDefaultDashThemeMutationResult = Apollo.MutationResult<UpdateDefaultDashThemeMutation>;
export type UpdateDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>;
export const RemoveDashThemeColorDocument = gql`
    mutation RemoveDashThemeColor($ownedInputSid: OwnedInputSid) {
  removeDashThemeColor(ownedInputSid: $ownedInputSid)
}
    `;
export type RemoveDashThemeColorMutationFn = Apollo.MutationFunction<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>;

/**
 * __useRemoveDashThemeColorMutation__
 *
 * To run a mutation, you first call `useRemoveDashThemeColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDashThemeColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDashThemeColorMutation, { data, loading, error }] = useRemoveDashThemeColorMutation({
 *   variables: {
 *      ownedInputSid: // value for 'ownedInputSid'
 *   },
 * });
 */
export function useRemoveDashThemeColorMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>) {
        return Apollo.useMutation<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>(RemoveDashThemeColorDocument, baseOptions);
      }
export type RemoveDashThemeColorMutationHookResult = ReturnType<typeof useRemoveDashThemeColorMutation>;
export type RemoveDashThemeColorMutationResult = Apollo.MutationResult<RemoveDashThemeColorMutation>;
export type RemoveDashThemeColorMutationOptions = Apollo.BaseMutationOptions<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>;
export const RemoveDefaultDashThemeDocument = gql`
    mutation RemoveDefaultDashTheme($ownedInputSid: OwnedInputSid) {
  removeDefaultDashTheme(ownedInputSid: $ownedInputSid)
}
    `;
export type RemoveDefaultDashThemeMutationFn = Apollo.MutationFunction<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>;

/**
 * __useRemoveDefaultDashThemeMutation__
 *
 * To run a mutation, you first call `useRemoveDefaultDashThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveDefaultDashThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeDefaultDashThemeMutation, { data, loading, error }] = useRemoveDefaultDashThemeMutation({
 *   variables: {
 *      ownedInputSid: // value for 'ownedInputSid'
 *   },
 * });
 */
export function useRemoveDefaultDashThemeMutation(baseOptions?: Apollo.MutationHookOptions<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>) {
        return Apollo.useMutation<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>(RemoveDefaultDashThemeDocument, baseOptions);
      }
export type RemoveDefaultDashThemeMutationHookResult = ReturnType<typeof useRemoveDefaultDashThemeMutation>;
export type RemoveDefaultDashThemeMutationResult = Apollo.MutationResult<RemoveDefaultDashThemeMutation>;
export type RemoveDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>;
export const SetDashThemeColorDefaultDocument = gql`
    mutation SetDashThemeColorDefault($dashThemeColorDefaultInput: DashThemeColorDefaultInput) {
  setDashThemeColorDefault(
    dashThemeColorDefaultInput: $dashThemeColorDefaultInput
  ) {
    id
    defaultPalette
    themeColorMode
    allowDark
    paletteNm
    themePrimary
    themeLighterAlt
    themeLighter
    themeLight
    themeTertiary
    themeSecondary
    themeDarkAlt
    themeDark
    themeDarker
    neutralLighterAlt
    neutralLighter
    neutralLight
    neutralQuaternaryAlt
    neutralQuaternary
    neutralTertiaryAlt
    neutralTertiary
    neutralSecondary
    neutralPrimaryAlt
    neutralPrimary
    neutralDark
    black
    white
  }
}
    `;
export type SetDashThemeColorDefaultMutationFn = Apollo.MutationFunction<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>;

/**
 * __useSetDashThemeColorDefaultMutation__
 *
 * To run a mutation, you first call `useSetDashThemeColorDefaultMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetDashThemeColorDefaultMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setDashThemeColorDefaultMutation, { data, loading, error }] = useSetDashThemeColorDefaultMutation({
 *   variables: {
 *      dashThemeColorDefaultInput: // value for 'dashThemeColorDefaultInput'
 *   },
 * });
 */
export function useSetDashThemeColorDefaultMutation(baseOptions?: Apollo.MutationHookOptions<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>) {
        return Apollo.useMutation<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>(SetDashThemeColorDefaultDocument, baseOptions);
      }
export type SetDashThemeColorDefaultMutationHookResult = ReturnType<typeof useSetDashThemeColorDefaultMutation>;
export type SetDashThemeColorDefaultMutationResult = Apollo.MutationResult<SetDashThemeColorDefaultMutation>;
export type SetDashThemeColorDefaultMutationOptions = Apollo.BaseMutationOptions<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>;
export const CreateOrUpdateOwnDashThemeDocument = gql`
    mutation CreateOrUpdateOwnDashTheme($dashThemeInput: DashThemeInput) {
  createOrUpdateOwnDashTheme(dashThemeInput: $dashThemeInput) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;
export type CreateOrUpdateOwnDashThemeMutationFn = Apollo.MutationFunction<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>;

/**
 * __useCreateOrUpdateOwnDashThemeMutation__
 *
 * To run a mutation, you first call `useCreateOrUpdateOwnDashThemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrUpdateOwnDashThemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrUpdateOwnDashThemeMutation, { data, loading, error }] = useCreateOrUpdateOwnDashThemeMutation({
 *   variables: {
 *      dashThemeInput: // value for 'dashThemeInput'
 *   },
 * });
 */
export function useCreateOrUpdateOwnDashThemeMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>) {
        return Apollo.useMutation<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>(CreateOrUpdateOwnDashThemeDocument, baseOptions);
      }
export type CreateOrUpdateOwnDashThemeMutationHookResult = ReturnType<typeof useCreateOrUpdateOwnDashThemeMutation>;
export type CreateOrUpdateOwnDashThemeMutationResult = Apollo.MutationResult<CreateOrUpdateOwnDashThemeMutation>;
export type CreateOrUpdateOwnDashThemeMutationOptions = Apollo.BaseMutationOptions<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>;
export const SetOwnDashThemeFontSizeDocument = gql`
    mutation SetOwnDashThemeFontSize($dashThemeInput: DashThemeInput) {
  setOwnDashThemeFontSize(dashThemeInput: $dashThemeInput) {
    id
    themeColorMode
    themeFontSize
    dashThemeColor {
      id
      defaultPalette
      themeColorMode
      allowDark
      paletteNm
      themePrimary
      themeLighterAlt
      themeLighter
      themeLight
      themeTertiary
      themeSecondary
      themeDarkAlt
      themeDark
      themeDarker
      neutralLighterAlt
      neutralLighter
      neutralLight
      neutralQuaternaryAlt
      neutralQuaternary
      neutralTertiaryAlt
      neutralTertiary
      neutralSecondary
      neutralPrimaryAlt
      neutralPrimary
      neutralDark
      black
      white
    }
  }
}
    `;
export type SetOwnDashThemeFontSizeMutationFn = Apollo.MutationFunction<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>;

/**
 * __useSetOwnDashThemeFontSizeMutation__
 *
 * To run a mutation, you first call `useSetOwnDashThemeFontSizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetOwnDashThemeFontSizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setOwnDashThemeFontSizeMutation, { data, loading, error }] = useSetOwnDashThemeFontSizeMutation({
 *   variables: {
 *      dashThemeInput: // value for 'dashThemeInput'
 *   },
 * });
 */
export function useSetOwnDashThemeFontSizeMutation(baseOptions?: Apollo.MutationHookOptions<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>) {
        return Apollo.useMutation<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>(SetOwnDashThemeFontSizeDocument, baseOptions);
      }
export type SetOwnDashThemeFontSizeMutationHookResult = ReturnType<typeof useSetOwnDashThemeFontSizeMutation>;
export type SetOwnDashThemeFontSizeMutationResult = Apollo.MutationResult<SetOwnDashThemeFontSizeMutation>;
export type SetOwnDashThemeFontSizeMutationOptions = Apollo.BaseMutationOptions<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>;
export const UpdatePasswordRulesDocument = gql`
    mutation UpdatePasswordRules($passwordRulesInput: PasswordRulesInput) {
  updatePasswordRules(passwordRulesInput: $passwordRulesInput) {
    organization {
      ...fragmentUIReadOnlyField
    }
    mustAlwaysBeMet {
      mustNotContainWhiteSpace {
        ...fragmentUIBooleanField
      }
      mustNotContainUserName {
        ...fragmentUIBooleanField
      }
      mustNotContainNumericSequence {
        ...fragmentUIBooleanField
      }
      mustFollowLengthRequirements {
        ...fragmentUIBooleanField
      }
      minLength {
        ...fragmentUIIntField
      }
      maxLength {
        ...fragmentUIIntField
      }
      mustContainUpperCaseLetters {
        ...fragmentUIBooleanField
      }
      minUpperCaseLetters {
        ...fragmentUIIntField
      }
      mustContainLowerCaseLetters {
        ...fragmentUIBooleanField
      }
      minLowerCaseLetters {
        ...fragmentUIIntField
      }
      mustContainNumericDigits {
        ...fragmentUIBooleanField
      }
      minNumericDigits {
        ...fragmentUIIntField
      }
      mustContainSpecialCharacters {
        ...fragmentUIBooleanField
      }
      minSpecialCharacters {
        ...fragmentUIIntField
      }
      mustNotRepeatCharacters {
        ...fragmentUIBooleanField
      }
      maxAllowedRepeatedChars {
        ...fragmentUIIntField
      }
      mustNotReusePasswords {
        ...fragmentUIBooleanField
      }
      minPasswordHistoryVariations {
        ...fragmentUIIntField
      }
      mustNotMatchExactDictionaryWord {
        ...fragmentUIBooleanField
      }
      mustNotMatchPartialDictionaryWord {
        ...fragmentUIBooleanField
      }
    }
    someMustBeMet {
      enabled {
        ...fragmentUIBooleanField
      }
      minPasswordComplexity {
        ...fragmentUISelectOneField
      }
      requiredNumPassingRules {
        ...fragmentUIIntField
      }
      mustNotContainWhiteSpace {
        ...fragmentUIBooleanField
      }
      mustNotContainUserName {
        ...fragmentUIBooleanField
      }
      mustNotContainNumericSequence {
        ...fragmentUIBooleanField
      }
      mustFollowLengthRequirements {
        ...fragmentUIBooleanField
      }
      minLength {
        ...fragmentUIIntField
      }
      maxLength {
        ...fragmentUIIntField
      }
      mustContainUpperCaseLetters {
        ...fragmentUIBooleanField
      }
      minUpperCaseLetters {
        ...fragmentUIIntField
      }
      mustContainLowerCaseLetters {
        ...fragmentUIBooleanField
      }
      minLowerCaseLetters {
        ...fragmentUIIntField
      }
      mustContainNumericDigits {
        ...fragmentUIBooleanField
      }
      minNumericDigits {
        ...fragmentUIIntField
      }
      mustContainSpecialCharacters {
        ...fragmentUIBooleanField
      }
      minSpecialCharacters {
        ...fragmentUIIntField
      }
      mustNotRepeatCharacters {
        ...fragmentUIBooleanField
      }
      maxAllowedRepeatedChars {
        ...fragmentUIIntField
      }
      mustNotReusePasswords {
        ...fragmentUIBooleanField
      }
      minPasswordHistoryVariations {
        ...fragmentUIIntField
      }
      mustNotMatchExactDictionaryWord {
        ...fragmentUIBooleanField
      }
      mustNotMatchPartialDictionaryWord {
        ...fragmentUIBooleanField
      }
    }
    autoLockAccount {
      ...fragmentUIBooleanField
    }
    autoLockAfterFailedAttempts {
      ...fragmentUIIntField
    }
    autoUnlockAccount {
      ...fragmentUIBooleanField
    }
    autoUnlockAccountDelayMinutes {
      ...fragmentUIIntField
    }
    response
    options {
      ...fragmentUIOptions
    }
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiIntFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type UpdatePasswordRulesMutationFn = Apollo.MutationFunction<UpdatePasswordRulesMutation, UpdatePasswordRulesMutationVariables>;

/**
 * __useUpdatePasswordRulesMutation__
 *
 * To run a mutation, you first call `useUpdatePasswordRulesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePasswordRulesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePasswordRulesMutation, { data, loading, error }] = useUpdatePasswordRulesMutation({
 *   variables: {
 *      passwordRulesInput: // value for 'passwordRulesInput'
 *   },
 * });
 */
export function useUpdatePasswordRulesMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePasswordRulesMutation, UpdatePasswordRulesMutationVariables>) {
        return Apollo.useMutation<UpdatePasswordRulesMutation, UpdatePasswordRulesMutationVariables>(UpdatePasswordRulesDocument, baseOptions);
      }
export type UpdatePasswordRulesMutationHookResult = ReturnType<typeof useUpdatePasswordRulesMutation>;
export type UpdatePasswordRulesMutationResult = Apollo.MutationResult<UpdatePasswordRulesMutation>;
export type UpdatePasswordRulesMutationOptions = Apollo.BaseMutationOptions<UpdatePasswordRulesMutation, UpdatePasswordRulesMutationVariables>;
export const ImplementationDeployDocument = gql`
    mutation ImplementationDeploy {
  implementationDeploy {
    response
    timestamp
    references
    changes
  }
}
    `;
export type ImplementationDeployMutationFn = Apollo.MutationFunction<ImplementationDeployMutation, ImplementationDeployMutationVariables>;

/**
 * __useImplementationDeployMutation__
 *
 * To run a mutation, you first call `useImplementationDeployMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useImplementationDeployMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [implementationDeployMutation, { data, loading, error }] = useImplementationDeployMutation({
 *   variables: {
 *   },
 * });
 */
export function useImplementationDeployMutation(baseOptions?: Apollo.MutationHookOptions<ImplementationDeployMutation, ImplementationDeployMutationVariables>) {
        return Apollo.useMutation<ImplementationDeployMutation, ImplementationDeployMutationVariables>(ImplementationDeployDocument, baseOptions);
      }
export type ImplementationDeployMutationHookResult = ReturnType<typeof useImplementationDeployMutation>;
export type ImplementationDeployMutationResult = Apollo.MutationResult<ImplementationDeployMutation>;
export type ImplementationDeployMutationOptions = Apollo.BaseMutationOptions<ImplementationDeployMutation, ImplementationDeployMutationVariables>;
export const FtpTestMDocument = gql`
    mutation FtpTestM($xpsftp: XSFTPInput!, $sendTestFile: SFTPTestSendTestFile, $testFile: Upload) {
  ftpTestM(xpsftp: $xpsftp, sendTestFile: $sendTestFile, testFile: $testFile) {
    status
    logMessage {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
    clientProfileSnippet
    csvLog
    xpSFTPForm {
      host {
        ...fragmentUIStringField
      }
      port {
        ...fragmentUIIntField
      }
      user {
        ...fragmentUIStringField
      }
      password {
        ...fragmentUIStringField
      }
      folder {
        ...fragmentUIStringField
      }
      stepWise {
        ...fragmentUIBooleanField
      }
      response
      errCode
      errMsg
      errSeverity
      sshKeyPath {
        ...fragmentUISelectOneField
      }
      sshKeyPassword {
        ...fragmentUIStringField
      }
      options {
        ...fragmentUIOptions
      }
    }
    sendTestFileForm {
      sendTestFile {
        ...fragmentUIBooleanField
      }
      testFileStrategy {
        ...fragmentUISelectOneField
      }
      fileName {
        ...fragmentUIStringField
      }
      fileBody {
        ...fragmentUIStringField
      }
    }
    includeFileUpload
  }
}
    ${UnionNvpFragmentDoc}
${FragmentUiStringFieldFragmentDoc}
${FragmentUiIntFieldFragmentDoc}
${FragmentUiBooleanFieldFragmentDoc}
${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type FtpTestMMutationFn = Apollo.MutationFunction<FtpTestMMutation, FtpTestMMutationVariables>;

/**
 * __useFtpTestMMutation__
 *
 * To run a mutation, you first call `useFtpTestMMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useFtpTestMMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ftpTestMMutation, { data, loading, error }] = useFtpTestMMutation({
 *   variables: {
 *      xpsftp: // value for 'xpsftp'
 *      sendTestFile: // value for 'sendTestFile'
 *      testFile: // value for 'testFile'
 *   },
 * });
 */
export function useFtpTestMMutation(baseOptions?: Apollo.MutationHookOptions<FtpTestMMutation, FtpTestMMutationVariables>) {
        return Apollo.useMutation<FtpTestMMutation, FtpTestMMutationVariables>(FtpTestMDocument, baseOptions);
      }
export type FtpTestMMutationHookResult = ReturnType<typeof useFtpTestMMutation>;
export type FtpTestMMutationResult = Apollo.MutationResult<FtpTestMMutation>;
export type FtpTestMMutationOptions = Apollo.BaseMutationOptions<FtpTestMMutation, FtpTestMMutationVariables>;
export const WorkPacketRerunStepDocument = gql`
    mutation WorkPacketRerunStep($workOrderId: String!, $stepName: String!, $changeReason: ChangeReason) {
  workPacketRerunStep(
    workOrderId: $workOrderId
    stepName: $stepName
    changeReason: $changeReason
  ) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type WorkPacketRerunStepMutationFn = Apollo.MutationFunction<WorkPacketRerunStepMutation, WorkPacketRerunStepMutationVariables>;

/**
 * __useWorkPacketRerunStepMutation__
 *
 * To run a mutation, you first call `useWorkPacketRerunStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketRerunStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketRerunStepMutation, { data, loading, error }] = useWorkPacketRerunStepMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *      stepName: // value for 'stepName'
 *      changeReason: // value for 'changeReason'
 *   },
 * });
 */
export function useWorkPacketRerunStepMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketRerunStepMutation, WorkPacketRerunStepMutationVariables>) {
        return Apollo.useMutation<WorkPacketRerunStepMutation, WorkPacketRerunStepMutationVariables>(WorkPacketRerunStepDocument, baseOptions);
      }
export type WorkPacketRerunStepMutationHookResult = ReturnType<typeof useWorkPacketRerunStepMutation>;
export type WorkPacketRerunStepMutationResult = Apollo.MutationResult<WorkPacketRerunStepMutation>;
export type WorkPacketRerunStepMutationOptions = Apollo.BaseMutationOptions<WorkPacketRerunStepMutation, WorkPacketRerunStepMutationVariables>;
export const WorkPacketDeleteDocument = gql`
    mutation WorkPacketDelete($workOrderId: String!) {
  workPacketDelete(workOrderId: $workOrderId) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type WorkPacketDeleteMutationFn = Apollo.MutationFunction<WorkPacketDeleteMutation, WorkPacketDeleteMutationVariables>;

/**
 * __useWorkPacketDeleteMutation__
 *
 * To run a mutation, you first call `useWorkPacketDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketDeleteMutation, { data, loading, error }] = useWorkPacketDeleteMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketDeleteMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketDeleteMutation, WorkPacketDeleteMutationVariables>) {
        return Apollo.useMutation<WorkPacketDeleteMutation, WorkPacketDeleteMutationVariables>(WorkPacketDeleteDocument, baseOptions);
      }
export type WorkPacketDeleteMutationHookResult = ReturnType<typeof useWorkPacketDeleteMutation>;
export type WorkPacketDeleteMutationResult = Apollo.MutationResult<WorkPacketDeleteMutation>;
export type WorkPacketDeleteMutationOptions = Apollo.BaseMutationOptions<WorkPacketDeleteMutation, WorkPacketDeleteMutationVariables>;
export const WorkPacketContinueDocument = gql`
    mutation WorkPacketContinue($workOrderId: String!) {
  workPacketContinue(workOrderId: $workOrderId) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type WorkPacketContinueMutationFn = Apollo.MutationFunction<WorkPacketContinueMutation, WorkPacketContinueMutationVariables>;

/**
 * __useWorkPacketContinueMutation__
 *
 * To run a mutation, you first call `useWorkPacketContinueMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketContinueMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketContinueMutation, { data, loading, error }] = useWorkPacketContinueMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketContinueMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketContinueMutation, WorkPacketContinueMutationVariables>) {
        return Apollo.useMutation<WorkPacketContinueMutation, WorkPacketContinueMutationVariables>(WorkPacketContinueDocument, baseOptions);
      }
export type WorkPacketContinueMutationHookResult = ReturnType<typeof useWorkPacketContinueMutation>;
export type WorkPacketContinueMutationResult = Apollo.MutationResult<WorkPacketContinueMutation>;
export type WorkPacketContinueMutationOptions = Apollo.BaseMutationOptions<WorkPacketContinueMutation, WorkPacketContinueMutationVariables>;
export const WorkPacketCancelDocument = gql`
    mutation WorkPacketCancel($workOrderId: String!) {
  workPacketCancel(workOrderId: $workOrderId) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type WorkPacketCancelMutationFn = Apollo.MutationFunction<WorkPacketCancelMutation, WorkPacketCancelMutationVariables>;

/**
 * __useWorkPacketCancelMutation__
 *
 * To run a mutation, you first call `useWorkPacketCancelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketCancelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketCancelMutation, { data, loading, error }] = useWorkPacketCancelMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketCancelMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketCancelMutation, WorkPacketCancelMutationVariables>) {
        return Apollo.useMutation<WorkPacketCancelMutation, WorkPacketCancelMutationVariables>(WorkPacketCancelDocument, baseOptions);
      }
export type WorkPacketCancelMutationHookResult = ReturnType<typeof useWorkPacketCancelMutation>;
export type WorkPacketCancelMutationResult = Apollo.MutationResult<WorkPacketCancelMutation>;
export type WorkPacketCancelMutationOptions = Apollo.BaseMutationOptions<WorkPacketCancelMutation, WorkPacketCancelMutationVariables>;
export const WorkPacketReprocessDocument = gql`
    mutation WorkPacketReprocess($workOrderId: String!, $changeReason: ChangeReason) {
  workPacketReprocess(workOrderId: $workOrderId, changeReason: $changeReason) {
    newWorkOrderId
    orgSid
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
export type WorkPacketReprocessMutationFn = Apollo.MutationFunction<WorkPacketReprocessMutation, WorkPacketReprocessMutationVariables>;

/**
 * __useWorkPacketReprocessMutation__
 *
 * To run a mutation, you first call `useWorkPacketReprocessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketReprocessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketReprocessMutation, { data, loading, error }] = useWorkPacketReprocessMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *      changeReason: // value for 'changeReason'
 *   },
 * });
 */
export function useWorkPacketReprocessMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketReprocessMutation, WorkPacketReprocessMutationVariables>) {
        return Apollo.useMutation<WorkPacketReprocessMutation, WorkPacketReprocessMutationVariables>(WorkPacketReprocessDocument, baseOptions);
      }
export type WorkPacketReprocessMutationHookResult = ReturnType<typeof useWorkPacketReprocessMutation>;
export type WorkPacketReprocessMutationResult = Apollo.MutationResult<WorkPacketReprocessMutation>;
export type WorkPacketReprocessMutationOptions = Apollo.BaseMutationOptions<WorkPacketReprocessMutation, WorkPacketReprocessMutationVariables>;
export const WorkPacketRenameAndReprocessDocument = gql`
    mutation WorkPacketRenameAndReprocess($workOrderId: String!, $newFileName: String!) {
  workPacketRenameAndReprocess(
    workOrderId: $workOrderId
    newFileName: $newFileName
  ) {
    newWorkOrderId
    orgSid
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
export type WorkPacketRenameAndReprocessMutationFn = Apollo.MutationFunction<WorkPacketRenameAndReprocessMutation, WorkPacketRenameAndReprocessMutationVariables>;

/**
 * __useWorkPacketRenameAndReprocessMutation__
 *
 * To run a mutation, you first call `useWorkPacketRenameAndReprocessMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketRenameAndReprocessMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketRenameAndReprocessMutation, { data, loading, error }] = useWorkPacketRenameAndReprocessMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *      newFileName: // value for 'newFileName'
 *   },
 * });
 */
export function useWorkPacketRenameAndReprocessMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketRenameAndReprocessMutation, WorkPacketRenameAndReprocessMutationVariables>) {
        return Apollo.useMutation<WorkPacketRenameAndReprocessMutation, WorkPacketRenameAndReprocessMutationVariables>(WorkPacketRenameAndReprocessDocument, baseOptions);
      }
export type WorkPacketRenameAndReprocessMutationHookResult = ReturnType<typeof useWorkPacketRenameAndReprocessMutation>;
export type WorkPacketRenameAndReprocessMutationResult = Apollo.MutationResult<WorkPacketRenameAndReprocessMutation>;
export type WorkPacketRenameAndReprocessMutationOptions = Apollo.BaseMutationOptions<WorkPacketRenameAndReprocessMutation, WorkPacketRenameAndReprocessMutationVariables>;
export const WorkPacketResendDocument = gql`
    mutation WorkPacketResend($workOrderId: String!) {
  workPacketResend(workOrderId: $workOrderId) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type WorkPacketResendMutationFn = Apollo.MutationFunction<WorkPacketResendMutation, WorkPacketResendMutationVariables>;

/**
 * __useWorkPacketResendMutation__
 *
 * To run a mutation, you first call `useWorkPacketResendMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWorkPacketResendMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [workPacketResendMutation, { data, loading, error }] = useWorkPacketResendMutation({
 *   variables: {
 *      workOrderId: // value for 'workOrderId'
 *   },
 * });
 */
export function useWorkPacketResendMutation(baseOptions?: Apollo.MutationHookOptions<WorkPacketResendMutation, WorkPacketResendMutationVariables>) {
        return Apollo.useMutation<WorkPacketResendMutation, WorkPacketResendMutationVariables>(WorkPacketResendDocument, baseOptions);
      }
export type WorkPacketResendMutationHookResult = ReturnType<typeof useWorkPacketResendMutation>;
export type WorkPacketResendMutationResult = Apollo.MutationResult<WorkPacketResendMutation>;
export type WorkPacketResendMutationOptions = Apollo.BaseMutationOptions<WorkPacketResendMutation, WorkPacketResendMutationVariables>;
export const ConvertXchangeProfileDocument = gql`
    mutation ConvertXchangeProfile($orgSid: ID!) {
  convertXchangeProfile(orgSid: $orgSid) {
    xchanges {
      vendorIds
      specIds
      coreFilename
      uatActivity {
        ...fragmentXchangeConfigActivity
      }
      testActivity {
        ...fragmentXchangeConfigActivity
      }
      prodActivity {
        ...fragmentXchangeConfigActivity
      }
      errorActivity {
        ...fragmentXchangeConfigActivity
      }
      active
      hasUnpublishedChanges
      hasAlerts
      implementationPending
    }
    globalXchangeAlerts {
      coreFilename
      numSubscribers
      hasUnpublishedChanges
    }
    individualXchangeAlerts {
      coreFilename
      numSubscribers
      hasUnpublishedChanges
    }
    comments
    hasUnpublishedChanges
    requiresConversion
    tooltips {
      inactive
      hasUnpublishedChanges
      hasAlerts
      implementationPending
      requiresConversion
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentXchangeConfigActivityFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type ConvertXchangeProfileMutationFn = Apollo.MutationFunction<ConvertXchangeProfileMutation, ConvertXchangeProfileMutationVariables>;

/**
 * __useConvertXchangeProfileMutation__
 *
 * To run a mutation, you first call `useConvertXchangeProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConvertXchangeProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [convertXchangeProfileMutation, { data, loading, error }] = useConvertXchangeProfileMutation({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useConvertXchangeProfileMutation(baseOptions?: Apollo.MutationHookOptions<ConvertXchangeProfileMutation, ConvertXchangeProfileMutationVariables>) {
        return Apollo.useMutation<ConvertXchangeProfileMutation, ConvertXchangeProfileMutationVariables>(ConvertXchangeProfileDocument, baseOptions);
      }
export type ConvertXchangeProfileMutationHookResult = ReturnType<typeof useConvertXchangeProfileMutation>;
export type ConvertXchangeProfileMutationResult = Apollo.MutationResult<ConvertXchangeProfileMutation>;
export type ConvertXchangeProfileMutationOptions = Apollo.BaseMutationOptions<ConvertXchangeProfileMutation, ConvertXchangeProfileMutationVariables>;
export const UpdateXchangeProfileCommentDocument = gql`
    mutation UpdateXchangeProfileComment($orgSid: ID!, $comment: String!) {
  updateXchangeProfileComment(orgSid: $orgSid, comment: $comment) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type UpdateXchangeProfileCommentMutationFn = Apollo.MutationFunction<UpdateXchangeProfileCommentMutation, UpdateXchangeProfileCommentMutationVariables>;

/**
 * __useUpdateXchangeProfileCommentMutation__
 *
 * To run a mutation, you first call `useUpdateXchangeProfileCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateXchangeProfileCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateXchangeProfileCommentMutation, { data, loading, error }] = useUpdateXchangeProfileCommentMutation({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useUpdateXchangeProfileCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateXchangeProfileCommentMutation, UpdateXchangeProfileCommentMutationVariables>) {
        return Apollo.useMutation<UpdateXchangeProfileCommentMutation, UpdateXchangeProfileCommentMutationVariables>(UpdateXchangeProfileCommentDocument, baseOptions);
      }
export type UpdateXchangeProfileCommentMutationHookResult = ReturnType<typeof useUpdateXchangeProfileCommentMutation>;
export type UpdateXchangeProfileCommentMutationResult = Apollo.MutationResult<UpdateXchangeProfileCommentMutation>;
export type UpdateXchangeProfileCommentMutationOptions = Apollo.BaseMutationOptions<UpdateXchangeProfileCommentMutation, UpdateXchangeProfileCommentMutationVariables>;
export const PublishXchangeProfileDocument = gql`
    mutation PublishXchangeProfile($orgSid: ID!) {
  publishXchangeProfile(orgSid: $orgSid) {
    response
    errCode
    errMsg
    errSeverity
    allMessages {
      timeStamp
      severity
      name
      body
      attributes {
        ...unionNVP
      }
    }
  }
}
    ${UnionNvpFragmentDoc}`;
export type PublishXchangeProfileMutationFn = Apollo.MutationFunction<PublishXchangeProfileMutation, PublishXchangeProfileMutationVariables>;

/**
 * __usePublishXchangeProfileMutation__
 *
 * To run a mutation, you first call `usePublishXchangeProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublishXchangeProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publishXchangeProfileMutation, { data, loading, error }] = usePublishXchangeProfileMutation({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function usePublishXchangeProfileMutation(baseOptions?: Apollo.MutationHookOptions<PublishXchangeProfileMutation, PublishXchangeProfileMutationVariables>) {
        return Apollo.useMutation<PublishXchangeProfileMutation, PublishXchangeProfileMutationVariables>(PublishXchangeProfileDocument, baseOptions);
      }
export type PublishXchangeProfileMutationHookResult = ReturnType<typeof usePublishXchangeProfileMutation>;
export type PublishXchangeProfileMutationResult = Apollo.MutationResult<PublishXchangeProfileMutation>;
export type PublishXchangeProfileMutationOptions = Apollo.BaseMutationOptions<PublishXchangeProfileMutation, PublishXchangeProfileMutationVariables>;
export const CreateXchangeStepDocument = gql`
    mutation CreateXchangeStep($stepInput: CreateXchangeStepInput) {
  createXchangeStep(stepInput: $stepInput) {
    sid
    xml {
      ...fragmentUIStringField
    }
    lastUpdated {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type CreateXchangeStepMutationFn = Apollo.MutationFunction<CreateXchangeStepMutation, CreateXchangeStepMutationVariables>;

/**
 * __useCreateXchangeStepMutation__
 *
 * To run a mutation, you first call `useCreateXchangeStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateXchangeStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createXchangeStepMutation, { data, loading, error }] = useCreateXchangeStepMutation({
 *   variables: {
 *      stepInput: // value for 'stepInput'
 *   },
 * });
 */
export function useCreateXchangeStepMutation(baseOptions?: Apollo.MutationHookOptions<CreateXchangeStepMutation, CreateXchangeStepMutationVariables>) {
        return Apollo.useMutation<CreateXchangeStepMutation, CreateXchangeStepMutationVariables>(CreateXchangeStepDocument, baseOptions);
      }
export type CreateXchangeStepMutationHookResult = ReturnType<typeof useCreateXchangeStepMutation>;
export type CreateXchangeStepMutationResult = Apollo.MutationResult<CreateXchangeStepMutation>;
export type CreateXchangeStepMutationOptions = Apollo.BaseMutationOptions<CreateXchangeStepMutation, CreateXchangeStepMutationVariables>;
export const UpdateXchangeStepDocument = gql`
    mutation UpdateXchangeStep($stepInput: UpdateXchangeStepInput) {
  updateXchangeStep(stepInput: $stepInput) {
    sid
    xml {
      ...fragmentUIStringField
    }
    lastUpdated {
      ...fragmentUIReadOnlyField
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiStringFieldFragmentDoc}
${FragmentUiReadOnlyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}`;
export type UpdateXchangeStepMutationFn = Apollo.MutationFunction<UpdateXchangeStepMutation, UpdateXchangeStepMutationVariables>;

/**
 * __useUpdateXchangeStepMutation__
 *
 * To run a mutation, you first call `useUpdateXchangeStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateXchangeStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateXchangeStepMutation, { data, loading, error }] = useUpdateXchangeStepMutation({
 *   variables: {
 *      stepInput: // value for 'stepInput'
 *   },
 * });
 */
export function useUpdateXchangeStepMutation(baseOptions?: Apollo.MutationHookOptions<UpdateXchangeStepMutation, UpdateXchangeStepMutationVariables>) {
        return Apollo.useMutation<UpdateXchangeStepMutation, UpdateXchangeStepMutationVariables>(UpdateXchangeStepDocument, baseOptions);
      }
export type UpdateXchangeStepMutationHookResult = ReturnType<typeof useUpdateXchangeStepMutation>;
export type UpdateXchangeStepMutationResult = Apollo.MutationResult<UpdateXchangeStepMutation>;
export type UpdateXchangeStepMutationOptions = Apollo.BaseMutationOptions<UpdateXchangeStepMutation, UpdateXchangeStepMutationVariables>;
export const CopyXchangeStepDocument = gql`
    mutation CopyXchangeStep($xchangeFileProcessSid: ID!, $sid: ID!) {
  copyXchangeStep(xchangeFileProcessSid: $xchangeFileProcessSid, sid: $sid) {
    sid
    vendor {
      ...fragmentUISelectOneField
    }
    specId {
      ...fragmentUIStringField
    }
    filenameQualifiers {
      ...fragmentUISelectManyField
    }
    diagram {
      steps {
        sid
        key
        icon
        title
        subTitle
        qualifier
        commands {
          ...fragmentWebCommand
        }
        position {
          x
          y
        }
      }
      stepGroups {
        start {
          x
          y
        }
        end {
          x
          y
        }
      }
      transmissions {
        sid
        key
        protocol
        host
        qualifier
        commands {
          ...fragmentWebCommand
        }
        position {
          x
          y
        }
      }
      connectors {
        fromKey
        toKey
      }
    }
    options {
      ...fragmentUIOptions
    }
    commands {
      ...fragmentWebCommand
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    ${FragmentUiSelectOneFieldFragmentDoc}
${FragmentUiStringFieldFragmentDoc}
${FragmentUiSelectManyFieldFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentUiOptionsFragmentDoc}`;
export type CopyXchangeStepMutationFn = Apollo.MutationFunction<CopyXchangeStepMutation, CopyXchangeStepMutationVariables>;

/**
 * __useCopyXchangeStepMutation__
 *
 * To run a mutation, you first call `useCopyXchangeStepMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCopyXchangeStepMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [copyXchangeStepMutation, { data, loading, error }] = useCopyXchangeStepMutation({
 *   variables: {
 *      xchangeFileProcessSid: // value for 'xchangeFileProcessSid'
 *      sid: // value for 'sid'
 *   },
 * });
 */
export function useCopyXchangeStepMutation(baseOptions?: Apollo.MutationHookOptions<CopyXchangeStepMutation, CopyXchangeStepMutationVariables>) {
        return Apollo.useMutation<CopyXchangeStepMutation, CopyXchangeStepMutationVariables>(CopyXchangeStepDocument, baseOptions);
      }
export type CopyXchangeStepMutationHookResult = ReturnType<typeof useCopyXchangeStepMutation>;
export type CopyXchangeStepMutationResult = Apollo.MutationResult<CopyXchangeStepMutation>;
export type CopyXchangeStepMutationOptions = Apollo.BaseMutationOptions<CopyXchangeStepMutation, CopyXchangeStepMutationVariables>;