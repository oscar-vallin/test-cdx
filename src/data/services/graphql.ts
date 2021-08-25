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
};

export type AmPasswordConfigInput = {
  allowForgotten?: Maybe<Scalars['Boolean']>;
  orgUnitOwner?: Maybe<Scalars['ID']>;
};

export type AccessPolicy = {
  __typename?: 'AccessPolicy';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
};

export type AccessPolicyConnection = {
  __typename?: 'AccessPolicyConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessPolicy>>>;
};

export type AccessPolicyGroup = {
  __typename?: 'AccessPolicyGroup';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  policies?: Maybe<Array<Maybe<AccessPolicy>>>;
};

export type AccessPolicyGroupConnection = {
  __typename?: 'AccessPolicyGroupConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
};

export type AccessPolicyPage = {
  __typename?: 'AccessPolicyPage';
  /** The services availble for permission actions */
  permissionServices?: Maybe<Array<Maybe<CdxServiceNvp>>>;
  /** Avaliable Predicates for this policy's permissions note a policy does not need a predicate */
  predicates?: Maybe<Array<Maybe<PermissionPredicateNvp>>>;
  /** can this policy be configured as a template */
  showTemplateSection?: Maybe<Scalars['Boolean']>;
  /** The service archtype for this template */
  templateServices?: Maybe<Array<Maybe<CdxServiceNvp>>>;
};

export type AccessSpecialization = {
  __typename?: 'AccessSpecialization';
  id: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<Maybe<SpecializationFilter>>>;
};

export type AccessSpecializationConnection = {
  __typename?: 'AccessSpecializationConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessSpecialization>>>;
};

export enum ActiveEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  All = 'ALL',
}

export type ArchiveFileType = {
  __typename?: 'ArchiveFileType';
  value: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export enum CdxFacet {
  All = 'ALL',
  Archive = 'ARCHIVE',
  Status = 'STATUS',
  AmPolicy = 'AM_POLICY',
  AmUser = 'AM_USER',
  Organization = 'ORGANIZATION',
}

export type CdxFacetNvp = {
  __typename?: 'CDXFacetNVP';
  name: Scalars['String'];
  value: CdxFacet;
};

export type CdxPageInfo = {
  __typename?: 'CDXPageInfo';
  orgSid?: Maybe<Scalars['ID']>;
  formInfo?: Maybe<Array<Maybe<FormInfo>>>;
  lookupData?: Maybe<Array<Maybe<LookupData>>>;
};

export enum CdxService {
  Cdx = 'CDX',
  Integration = 'INTEGRATION',
  AccessManagement = 'ACCESS_MANAGEMENT',
}

export type CdxServiceNvp = {
  __typename?: 'CDXServiceNVP';
  name: Scalars['String'];
  value?: Maybe<CdxService>;
};

export enum CdxWebAppDomain {
  Dashboard = 'DASHBOARD',
  Organization = 'ORGANIZATION',
}

export enum CdxWebCommandType {
  PageAdd = 'PAGE_ADD',
  PageUpdate = 'PAGE_UPDATE',
  Deactivate = 'DEACTIVATE',
  Activate = 'ACTIVATE',
  Add = 'ADD',
  Update = 'UPDATE',
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
  ActiveUsers = 'ACTIVE_USERS',
  DeletedUsers = 'DELETED_USERS',
  AmGroups = 'AM_GROUPS',
  AmPolicies = 'AM_POLICIES',
  FtpTest = 'FTP_TEST',
  ImplDeploy = 'IMPL_DEPLOY',
  UserAccountRules = 'USER_ACCOUNT_RULES',
  PasswordRules = 'PASSWORD_RULES',
  SsoConfig = 'SSO_CONFIG',
  AddOrg = 'ADD_ORG',
  AddUser = 'ADD_USER',
  ColorPalettes = 'COLOR_PALETTES',
  Theme = 'THEME',
}

export enum CdxWebPivot {
  Activity = 'ACTIVITY',
  InProgress = 'IN_PROGRESS',
}

export type CreateAccessPolicyGroupInput = {
  orgOwnerId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  policyIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateAccessPolicyInput = {
  name: Scalars['String'];
  orgOwnerId: Scalars['ID'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
};

export type CreateAccessSpecializationInput = {
  orgOwnerId: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<Maybe<CreateSpecializationFilterInput>>>;
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
  orgName: Scalars['String'];
  orgType: OrgType;
  orgOwnerId?: Maybe<Scalars['ID']>;
};

export type CreatePersonInput = {
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type CreateSpecializationFilterInput = {
  permission: Permission;
  organizationIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  orgOwnerId: Scalars['ID'];
  groupIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  nodes?: Maybe<Array<Maybe<DashThemeColor>>>;
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
  vendorTransmissions?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  vendorTransmissionsBySpec?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  planSponsorTransmissions?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  fileTransmissions?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  vendorProcessErrors?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  planSponsorProcessErrors?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
  fileProcessErrors?: Maybe<Array<Maybe<DashboardPeriodCount>>>;
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
  themeColorModes?: Maybe<Array<Maybe<ThemeColorMode>>>;
  themeFontSizes?: Maybe<Array<Maybe<ThemeFontSize>>>;
  themeColorPalettes?: Maybe<Array<Maybe<DashThemeColor>>>;
};

export type DeleteAccessPoliciesInput = {
  policySids: Array<Maybe<Scalars['ID']>>;
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
  excludedPlanInsuredStat?: Maybe<Array<Maybe<PlanInsuredStat>>>;
  planInsuredStat?: Maybe<Array<Maybe<PlanInsuredStat>>>;
};

export type ExtractParameter = {
  __typename?: 'ExtractParameter';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ExtractParameters = {
  __typename?: 'ExtractParameters';
  originalParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
  overriddenParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
  derivedParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
};

export type FieldCreationEvent = {
  __typename?: 'FieldCreationEvent';
  message?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  rawValue?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type FormInfo = {
  __typename?: 'FormInfo';
  label?: Maybe<Scalars['String']>;
  formCommands?: Maybe<Array<Maybe<WebCommand>>>;
};

export enum GqOperationResponse {
  Success = 'SUCCESS',
  Fail = 'FAIL',
}

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
  pageCommands?: Maybe<Array<Maybe<WebCommand>>>;
  listItemCommands?: Maybe<Array<Maybe<WebCommand>>>;
  listItemBulkCommands?: Maybe<Array<Maybe<WebCommand>>>;
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
  allowLostPassword?: Maybe<Scalars['Boolean']>;
  /** this is the domain/section of the website to continue to if the login is complete */
  loginCompleteDomain?: Maybe<WebAppDomain>;
  tokenUser?: Maybe<TokenUser>;
};

export enum LoginStepType {
  Username = 'USERNAME',
  Password = 'PASSWORD',
  Complete = 'COMPLETE',
}

export type LookupData = {
  __typename?: 'LookupData';
  key?: Maybe<Scalars['String']>;
  lookupPairs?: Maybe<Array<Maybe<Nvp>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<LoginStep>;
  updateOwnPassword?: Maybe<UserSession>;
  createOrg?: Maybe<Organization>;
  createAccessPolicy?: Maybe<AccessPolicy>;
  createAccessSpecialization?: Maybe<AccessSpecialization>;
  createAccessPolicyGroup?: Maybe<AccessPolicyGroup>;
  createUser?: Maybe<UserResponse>;
  updateUser?: Maybe<User>;
  updateUserAccessPolicyGroups?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
  deactivateUser?: Maybe<GqOperationResponse>;
  deactivateUsers?: Maybe<GqOperationResponse>;
  activateUser?: Maybe<GqOperationResponse>;
  activateUsers?: Maybe<GqOperationResponse>;
  removeAccessPolicies?: Maybe<Scalars['String']>;
  removeAccessPolicy?: Maybe<Scalars['String']>;
  updateAccessPolicy?: Maybe<AccessPolicy>;
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
};

export type MutationPasswordLoginArgs = {
  userId: Scalars['String'];
  password: Scalars['String'];
};

export type MutationUpdateOwnPasswordArgs = {
  updatePasswordInput: UpdatePasswordInput;
};

export type MutationCreateOrgArgs = {
  orgInfo: CreateOrgInput;
};

export type MutationCreateAccessPolicyArgs = {
  policyInfo: CreateAccessPolicyInput;
};

export type MutationCreateAccessSpecializationArgs = {
  specializationInfo: CreateAccessSpecializationInput;
};

export type MutationCreateAccessPolicyGroupArgs = {
  accessPolicyGroupInfo: CreateAccessPolicyGroupInput;
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

export type MutationRemoveAccessPoliciesArgs = {
  deleteAccessPoliciesInput?: Maybe<DeleteAccessPoliciesInput>;
};

export type MutationRemoveAccessPolicyArgs = {
  policySid: Scalars['ID'];
};

export type MutationUpdateAccessPolicyArgs = {
  updateAccessPolicyInput?: Maybe<UpdateAccessPolicyInput>;
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
  NullsLast = 'NULLS_LAST',
}

export type OrgFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
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
}

export type Organization = {
  __typename?: 'Organization';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orgId: Scalars['String'];
  orgType: OrgType;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<Organization>>>;
};

/**
 * input DashThemeColorModeInput{
 * orgSid: ID!
 * ownerId: ID!
 * sid: ID!
 * themeColorMode: ThemeColorMode!
 * }
 */
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
  nodes?: Maybe<Array<Maybe<OrganizationLink>>>;
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
  sort?: Maybe<Array<Maybe<SortOrderInput>>>;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  totalPages?: Maybe<Scalars['Int']>;
  totalElements?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type PasswordCharacterRule = {
  __typename?: 'PasswordCharacterRule';
  characterType?: Maybe<PasswordCharacterType>;
  numberOfCharacters?: Maybe<Scalars['Int']>;
};

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL',
}

export type PasswordLengthRule = {
  __typename?: 'PasswordLengthRule';
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
};

export type PasswordPage = {
  __typename?: 'PasswordPage';
  ruleGroup: PasswordRuleGroup;
};

export type PasswordRule =
  | PasswordLengthRule
  | PasswordWhitespaceRule
  | PasswordCharacterRule
  | PasswordStrengthRule
  | PasswordRuleGroup;

export type PasswordRuleGroup = {
  __typename?: 'PasswordRuleGroup';
  /**
   * number of rule predicates that must be true for the group to pass
   * if numberOfCharacteristics is omitted all rules are required
   */
  numberOfCharacteristics?: Maybe<Scalars['Int']>;
  /** list of rules or rule sub groups */
  rules?: Maybe<Array<Maybe<PasswordRule>>>;
};

export type PasswordStrengthRule = {
  __typename?: 'PasswordStrengthRule';
  requiredStrengthLevel: Scalars['Int'];
};

export type PasswordWhitespaceRule = {
  __typename?: 'PasswordWhitespaceRule';
  allowedWhitespace?: Maybe<WhitespaceRuleType>;
};

export enum Permission {
  K2UExchangeList = 'K2U_EXCHANGE_LIST',
  K2UExchangeRead = 'K2U_EXCHANGE_READ',
  K2UExchangeDownload = 'K2U_EXCHANGE_DOWNLOAD',
  K2UExchangeRestart = 'K2U_EXCHANGE_RESTART',
  K2UExchangeCancel = 'K2U_EXCHANGE_CANCEL',
  K2UExchangeArchiveRead = 'K2U_EXCHANGE_ARCHIVE_READ',
  K2UExchangeArchiveStepsRead = 'K2U_EXCHANGE_ARCHIVE_STEPS_READ',
  TestExchangeList = 'TEST_EXCHANGE_LIST',
  TestExchangeRead = 'TEST_EXCHANGE_READ',
  TestExchangeDownload = 'TEST_EXCHANGE_DOWNLOAD',
  TestExchangeRestart = 'TEST_EXCHANGE_RESTART',
  TestExchangeCancel = 'TEST_EXCHANGE_CANCEL',
  TestExchangeArchiveRead = 'TEST_EXCHANGE_ARCHIVE_READ',
  TestExchangeArchiveStepsRead = 'TEST_EXCHANGE_ARCHIVE_STEPS_READ',
  UatExchangeList = 'UAT_EXCHANGE_LIST',
  UatExchangeRead = 'UAT_EXCHANGE_READ',
  UatExchangeDownload = 'UAT_EXCHANGE_DOWNLOAD',
  UatExchangeRestart = 'UAT_EXCHANGE_RESTART',
  UatExchangeCancel = 'UAT_EXCHANGE_CANCEL',
  UatExchangeArchiveRead = 'UAT_EXCHANGE_ARCHIVE_READ',
  UatExchangeArchiveStepsRead = 'UAT_EXCHANGE_ARCHIVE_STEPS_READ',
  ProdExchangeList = 'PROD_EXCHANGE_LIST',
  ProdExchangeRead = 'PROD_EXCHANGE_READ',
  ProdExchangeDownload = 'PROD_EXCHANGE_DOWNLOAD',
  ProdExchangeRestart = 'PROD_EXCHANGE_RESTART',
  ProdExchangeCancel = 'PROD_EXCHANGE_CANCEL',
  ProdExchangeArchiveRead = 'PROD_EXCHANGE_ARCHIVE_READ',
  ProdExchangeArchiveStepsRead = 'PROD_EXCHANGE_ARCHIVE_STEPS_READ',
  UserCreate = 'USER_CREATE',
  UserRead = 'USER_READ',
  UserUpdate = 'USER_UPDATE',
  UserDelete = 'USER_DELETE',
  UserAssign = 'USER_ASSIGN',
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
}

export enum PermissionPredicate {
  NotKntuEnv = 'NOT_KNTU_ENV',
  StringEqualsIgnoreCase = 'STRING_EQUALS_IGNORE_CASE',
  StringNotEqualsIgnoreCase = 'STRING_NOT_EQUALS_IGNORE_CASE',
}

export type PermissionPredicateNvp = {
  __typename?: 'PermissionPredicateNVP';
  name: Scalars['String'];
  value: PermissionPredicate;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
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
  sequenceCreationEvent?: Maybe<Array<Maybe<SequenceCreationEvent>>>;
};

export type Query = {
  __typename?: 'Query';
  beginLogin?: Maybe<LoginStep>;
  exchangeActivityInProcess?: Maybe<OrganizationLinkConnection>;
  exchangeActivityTransmitted?: Maybe<OrganizationLinkConnection>;
  exchangeActivityErrored?: Maybe<OrganizationLinkConnection>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  workPacketStatus?: Maybe<WorkPacketStatus>;
  workPacketStatuses?: Maybe<Array<Maybe<WorkPacketStatus>>>;
  dashboardPeriods?: Maybe<DashboardPeriods>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  currentUser?: Maybe<CurrentUserInfo>;
  /** currentOrgInfo(orgInput: OrgSidInput): [Organization] */
  currentOrgNav?: Maybe<WebNav>;
  userTheme?: Maybe<DashTheme>;
  logOut?: Maybe<LogOutInfo>;
  simulateSessionExpir?: Maybe<LogOutInfo>;
  accessPolicyPage?: Maybe<AccessPolicyPage>;
  accessPolicy?: Maybe<AccessPolicy>;
  accessPoliciesForOrg?: Maybe<AccessPolicyConnection>;
  accessSpecializationsForOrg?: Maybe<AccessSpecializationConnection>;
  accessPolicyGroupsForOrg?: Maybe<AccessPolicyGroupConnection>;
  usersForOrg?: Maybe<UserConnection>;
  systemTemplateAccessPolicyGroupByName?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
  topLevelOrgsByType?: Maybe<Array<Maybe<Organization>>>;
  orgById?: Maybe<Organization>;
  directOrganizations?: Maybe<OrganizationConnection>;
  wpProcessErrors?: Maybe<WpProcessErrorConnection>;
  wpTransmissions?: Maybe<WpTransmissionConnection>;
  scheduleOccurrences?: Maybe<ScheduleOccurrenceConnection>;
  dashThemeColorForOrg?: Maybe<DashThemeColorConnection>;
  dashSiteForOrg?: Maybe<DashSite>;
  dashThemeColor?: Maybe<DashThemeColor>;
  dashThemeColorByName?: Maybe<DashThemeColor>;
  defaultDashThemeForSite?: Maybe<DashTheme>;
  defaultDashThemeForSitePage?: Maybe<DefaultDashThemePage>;
  /** userDashThemePage(ownedInput : OwnedInput) : UserDashThemePage */
  currentUserDashThemePage?: Maybe<UserDashThemePage>;
  findUserByEmail?: Maybe<User>;
  findUser?: Maybe<User>;
  navigateToNewDomain?: Maybe<WebAppDomain>;
  userCreatePage?: Maybe<UserPageInfo>;
  /** userAssignAccessPolicyGroups(sidInput: SidInput) :  */
  userUpdatePage?: Maybe<UserPageInfo>;
  userAssignAccessPolicyGroupsPage?: Maybe<UserPageInfo>;
};

export type QueryBeginLoginArgs = {
  userId: Scalars['String'];
};

export type QueryExchangeActivityInProcessArgs = {
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
};

export type QueryExchangeActivityTransmittedArgs = {
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
};

export type QueryExchangeActivityErroredArgs = {
  orgSidInput: OrgSidInput;
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

export type QueryWorkPacketStatusesArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  filter?: Maybe<WorkPacketStatusFilter>;
};

export type QueryDashboardPeriodsArgs = {
  orgSid: Scalars['ID'];
};

export type QueryCurrentOrgNavArgs = {
  orgInput?: Maybe<OrgSidInput>;
};

export type QueryUserThemeArgs = {
  themeColorMode?: Maybe<ThemeColorMode>;
};

export type QueryAccessPolicyPageArgs = {
  orgSid: Scalars['ID'];
};

export type QueryAccessPolicyArgs = {
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
};

export type QueryAccessPoliciesForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};

export type QueryAccessSpecializationsForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};

export type QueryAccessPolicyGroupsForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};

export type QueryUsersForOrgArgs = {
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
};

export type QuerySystemTemplateAccessPolicyGroupByNameArgs = {
  name: Scalars['String'];
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

export type QueryWpProcessErrorsArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
};

export type QueryWpTransmissionsArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
};

export type QueryScheduleOccurrencesArgs = {
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
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

export type QueryFindUserByEmailArgs = {
  userEmail: Scalars['String'];
};

export type QueryFindUserArgs = {
  ownedInputSid?: Maybe<OwnedInputSid>;
};

export type QueryNavigateToNewDomainArgs = {
  domainNavInput?: Maybe<DomainNavInput>;
};

export type QueryUserCreatePageArgs = {
  orgSidInput?: Maybe<OrgSidInput>;
};

export type QueryUserUpdatePageArgs = {
  sidInput?: Maybe<SidInput>;
};

export type QueryUserAssignAccessPolicyGroupsPageArgs = {
  sidInput?: Maybe<SidInput>;
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
  recordCount?: Maybe<Array<Maybe<RecordCount>>>;
};

export type RecordCreationEvent = {
  __typename?: 'RecordCreationEvent';
  context?: Maybe<Scalars['String']>;
  outerContext?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['String']>;
  error?: Maybe<Array<Maybe<FieldCreationEvent>>>;
  warning?: Maybe<Array<Maybe<FieldCreationEvent>>>;
  information?: Maybe<Array<Maybe<FieldCreationEvent>>>;
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
  NotScheduled = 'NOT_SCHEDULED',
}

export type ScheduleOccurrence = {
  __typename?: 'ScheduleOccurrence';
  resource: Scalars['String'];
  scheduleId?: Maybe<Scalars['ID']>;
  timeScheduled?: Maybe<Scalars['DateTime']>;
  schedOccurStatus: SchedOccurStatusEnum;
  runOccurrences?: Maybe<Array<Maybe<ScheduleRunOccurrence>>>;
};

export type ScheduleOccurrenceConnection = {
  __typename?: 'ScheduleOccurrenceConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<ScheduleOccurrence>>>;
};

export type ScheduleRunOccurrence = {
  __typename?: 'ScheduleRunOccurrence';
  workOrderId: Scalars['String'];
  timeRan?: Maybe<Scalars['DateTime']>;
  status: SchedOccurStatusEnum;
};

export type SequenceCreationEvent = {
  __typename?: 'SequenceCreationEvent';
  context?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['String']>;
  recordCreationEvent?: Maybe<Array<Maybe<RecordCreationEvent>>>;
};

export type SidInput = {
  sid: Scalars['ID'];
};

export type SidsInput = {
  sids: Array<Maybe<Scalars['ID']>>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC',
}

export type SortOrderInput = {
  direction?: Maybe<SortDirection>;
  property?: Maybe<Scalars['String']>;
  ignoreCase?: Maybe<Scalars['Boolean']>;
  nullHandling?: Maybe<NullHandling>;
};

export type SpecializationFilter = {
  __typename?: 'SpecializationFilter';
  id: Scalars['ID'];
  permission: Permission;
  organizationIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export enum ThemeColorMode {
  Light = 'LIGHT',
  Dark = 'DARK',
}

export enum ThemeFontSize {
  Small = 'SMALL',
  Medium = 'MEDIUM',
  Large = 'LARGE',
}

export type TokenUser = {
  __typename?: 'TokenUser';
  token?: Maybe<Scalars['String']>;
  session?: Maybe<UserSession>;
};

export type UpdateAccessPolicyInput = {
  policySid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
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

export type UpdatePasswordInput = {
  originalPassword: Scalars['String'];
  newPassword: Scalars['String'];
  verifyPassword: Scalars['String'];
};

export type UpdateUserAccessPolicyGroupsInput = {
  accessPolicyGroupIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  person?: Maybe<Person>;
  accessPolicyGroups?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  paginationInfo: PaginationInfo;
  listPageInfo?: Maybe<ListPageInfo>;
  nodes?: Maybe<Array<Maybe<UserItem>>>;
};

export type UserDashThemePage = {
  __typename?: 'UserDashThemePage';
  themeColorModes?: Maybe<Array<Maybe<ThemeColorMode>>>;
  themeFontSizes?: Maybe<Array<Maybe<ThemeFontSize>>>;
  themeColorPalettes?: Maybe<Array<Maybe<DashThemeColor>>>;
  dashTheme?: Maybe<DashTheme>;
};

export type UserFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
};

export type UserItem = {
  __typename?: 'UserItem';
  item: User;
  listItemCommands?: Maybe<Array<Maybe<WebCommand>>>;
};

export type UserPageInfo = {
  __typename?: 'UserPageInfo';
  model?: Maybe<User>;
  cdxPageInfo?: Maybe<CdxPageInfo>;
  accessPolicyGroupConnection?: Maybe<AccessPolicyGroupConnection>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  response: GqOperationResponse;
  msg?: Maybe<Scalars['String']>;
  model?: Maybe<User>;
  nextPage?: Maybe<UserWebPage>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  /** orgId is deprecated prefer orgSid instead */
  orgId?: Maybe<Scalars['ID']>;
  orgSid: Scalars['ID'];
  userId: Scalars['String'];
  firstNm: Scalars['String'];
  pollInterval?: Maybe<Scalars['Int']>;
  defaultAuthorities?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum UserWebPage {
  AmGroup = 'AM_GROUP',
  GenPass = 'GEN_PASS',
  RegLink = 'REG_LINK',
}

export type WpProcessError = {
  __typename?: 'WPProcessError';
  id: Scalars['ID'];
  workOrderId: Scalars['String'];
  startTime: Scalars['DateTime'];
  stepName?: Maybe<Scalars['String']>;
  planSponsorId?: Maybe<Scalars['String']>;
  vendorId?: Maybe<Scalars['String']>;
  msg?: Maybe<Scalars['String']>;
  inboundFilename?: Maybe<Scalars['String']>;
  clientFileArchivePath?: Maybe<Scalars['String']>;
};

export type WpProcessErrorConnection = {
  __typename?: 'WPProcessErrorConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<WpProcessError>>>;
};

export type WpTransmission = {
  __typename?: 'WPTransmission';
  id: Scalars['ID'];
  workOrderId: Scalars['String'];
  deliveredOn: Scalars['DateTime'];
  planSponsorId?: Maybe<Scalars['String']>;
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
};

export type WpTransmissionConnection = {
  __typename?: 'WPTransmissionConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<WpTransmission>>>;
};

export type WebAppDomain = {
  __typename?: 'WebAppDomain';
  type: CdxWebAppDomain;
  /** selectedPage: either the page to load - must be in teh navItems */
  selectedPage?: Maybe<CdxWebPage>;
  /** navItems: either the left nav or top nav depending on the domain */
  navItems?: Maybe<Array<Maybe<WebNav>>>;
};

export type WebCommand = {
  __typename?: 'WebCommand';
  endPoint?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  parameters?: Maybe<Array<Maybe<Nvp>>>;
  commandType?: Maybe<CdxWebCommandType>;
};

export type WebNav = {
  __typename?: 'WebNav';
  label?: Maybe<Scalars['String']>;
  /** page: WebPage to nave to, blank if this only has subnavs */
  page?: Maybe<WebPage>;
  /** appDomain: only needs to be set here if this link will change domains */
  appDomain?: Maybe<CdxWebAppDomain>;
  subNavItems?: Maybe<Array<Maybe<WebNav>>>;
};

export type WebPage = {
  __typename?: 'WebPage';
  type: CdxWebPage;
  /** parameters: any dynamic parameters the page end point needs to be called with */
  parameters?: Maybe<Array<Maybe<Nvp>>>;
  /** commands: actions on the page that may lead to another page e.g. add new */
  commands?: Maybe<Array<Maybe<WebNav>>>;
  /** pivots: any pivots the page might have */
  pivots?: Maybe<Array<Maybe<WebPivot>>>;
};

export type WebPivot = {
  __typename?: 'WebPivot';
  label?: Maybe<Scalars['String']>;
  type: CdxWebPivot;
};

export enum WhitespaceRuleType {
  None = 'NONE',
}

export type WorkPacketStatus = {
  __typename?: 'WorkPacketStatus';
  workOrderId: Scalars['String'];
  timestamp: Scalars['DateTime'];
  planSponsorId?: Maybe<Scalars['String']>;
  detailsPath?: Maybe<Scalars['String']>;
  subClientPath?: Maybe<Scalars['String']>;
  inboundFilename: Scalars['String'];
  vendorId?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
  stepStatus: Scalars['String'];
  packetStatus: Scalars['String'];
  reprocessedBy?: Maybe<Scalars['String']>;
  reprocessAction?: Maybe<Scalars['Int']>;
  recordHighlightCount?: Maybe<Scalars['Int']>;
  populationCount?: Maybe<Scalars['Int']>;
  recordHighlightType?: Maybe<Scalars['String']>;
  clientFileArchivePath?: Maybe<Scalars['String']>;
  vendorFileArchivePath?: Maybe<Scalars['String']>;
  supplementalFilesArchivePaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  archiveOnly?: Maybe<Scalars['Boolean']>;
  hasErrors?: Maybe<Scalars['Boolean']>;
};

export type WorkPacketStatusDetails = {
  __typename?: 'WorkPacketStatusDetails';
  workOrderId: Scalars['String'];
  specId?: Maybe<Scalars['String']>;
  specImplName?: Maybe<Scalars['String']>;
  fingerPrint?: Maybe<Scalars['String']>;
  suppressBilling?: Maybe<Scalars['Boolean']>;
  deliveredFile?: Maybe<DeliveredFile>;
  workStepStatus?: Maybe<Array<Maybe<WorkStepStatus>>>;
  extractParameters?: Maybe<ExtractParameters>;
  qualityChecks?: Maybe<QualityChecks>;
  enrollmentStats?: Maybe<EnrollmentStat>;
  inboundEnrollmentStats?: Maybe<EnrollmentStat>;
  outboundEnrollmentStats?: Maybe<EnrollmentStat>;
  outboundRecordCounts?: Maybe<RecordCounts>;
  inboundLabel?: Maybe<Scalars['String']>;
  outboundLabel?: Maybe<Scalars['String']>;
};

export type WorkPacketStatusFilter = {
  excludedEnvs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type WorkStepStatus = {
  __typename?: 'WorkStepStatus';
  stepStatus?: Maybe<Scalars['String']>;
  stepName?: Maybe<Scalars['String']>;
  stepType?: Maybe<Scalars['String']>;
  populationCount?: Maybe<StatCountType>;
  transformedArchiveFile?: Maybe<ArchiveFileType>;
  recordCounts?: Maybe<RecordCounts>;
  stepFile?: Maybe<Array<Maybe<ArchiveFileType>>>;
  nvp?: Maybe<Array<Maybe<NvpStr>>>;
};

export type BeginLoginQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type BeginLoginQuery = { __typename?: 'Query' } & {
  beginLogin?: Maybe<
    { __typename?: 'LoginStep' } & Pick<LoginStep, 'userId' | 'step' | 'redirectPath' | 'allowLostPassword'>
  >;
};

export type PasswordLoginMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;

export type PasswordLoginMutation = { __typename?: 'Mutation' } & {
  passwordLogin?: Maybe<
    { __typename?: 'LoginStep' } & Pick<LoginStep, 'step'> & {
        loginCompleteDomain?: Maybe<
          { __typename?: 'WebAppDomain' } & Pick<WebAppDomain, 'type' | 'selectedPage'> & {
              navItems?: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'WebNav' } & {
                      subNavItems?: Maybe<Array<Maybe<{ __typename?: 'WebNav' } & NavItemFragmentFragment>>>;
                    } & NavItemFragmentFragment
                  >
                >
              >;
            }
        >;
        tokenUser?: Maybe<
          { __typename?: 'TokenUser' } & Pick<TokenUser, 'token'> & {
              session?: Maybe<
                { __typename?: 'UserSession' } & Pick<
                  UserSession,
                  'id' | 'orgId' | 'orgSid' | 'userId' | 'firstNm' | 'defaultAuthorities'
                >
              >;
            }
        >;
      }
  >;
};

export type NavItemFragmentFragment = { __typename?: 'WebNav' } & Pick<WebNav, 'label' | 'appDomain'> & {
    page?: Maybe<{ __typename?: 'WebPage' } & WebPageFragmentFragment>;
  };

export type WebPageFragmentFragment = { __typename?: 'WebPage' } & Pick<WebPage, 'type'> & {
    parameters?: Maybe<
      Array<
        Maybe<
          ({ __typename?: 'NVPStr' } & UnionNvp_NvpStr_Fragment) | ({ __typename?: 'NVPId' } & UnionNvp_NvpId_Fragment)
        >
      >
    >;
    commands?: Maybe<
      Array<
        Maybe<
          { __typename?: 'WebNav' } & Pick<WebNav, 'label' | 'appDomain'> & {
              page?: Maybe<
                { __typename?: 'WebPage' } & Pick<WebPage, 'type'> & {
                    parameters?: Maybe<
                      Array<
                        Maybe<
                          | ({ __typename?: 'NVPStr' } & UnionNvp_NvpStr_Fragment)
                          | ({ __typename?: 'NVPId' } & UnionNvp_NvpId_Fragment)
                        >
                      >
                    >;
                  }
              >;
            }
        >
      >
    >;
    pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot' } & Pick<WebPivot, 'label' | 'type'>>>>;
  };

type UnionNvp_NvpStr_Fragment = { __typename: 'NVPStr' } & Pick<NvpStr, 'name'> & { strValue: NvpStr['value'] };

type UnionNvp_NvpId_Fragment = { __typename: 'NVPId' } & Pick<NvpId, 'name'> & { idValue: NvpId['value'] };

export type UnionNvpFragment = UnionNvp_NvpStr_Fragment | UnionNvp_NvpId_Fragment;

export type WorkPacketStatusesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  filter?: Maybe<WorkPacketStatusFilter>;
}>;

export type WorkPacketStatusesQuery = { __typename?: 'Query' } & {
  workPacketStatuses?: Maybe<
    Array<
      Maybe<
        { __typename?: 'WorkPacketStatus' } & Pick<
          WorkPacketStatus,
          | 'workOrderId'
          | 'timestamp'
          | 'planSponsorId'
          | 'detailsPath'
          | 'subClientPath'
          | 'inboundFilename'
          | 'vendorId'
          | 'step'
          | 'stepStatus'
          | 'packetStatus'
          | 'reprocessedBy'
          | 'reprocessAction'
          | 'populationCount'
          | 'recordHighlightCount'
          | 'recordHighlightType'
          | 'clientFileArchivePath'
          | 'vendorFileArchivePath'
          | 'supplementalFilesArchivePaths'
          | 'archiveOnly'
          | 'hasErrors'
        >
      >
    >
  >;
};

export type WorkPacketStatusDetailsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;

export type WorkPacketStatusDetailsQuery = { __typename?: 'Query' } & {
  workPacketStatusDetails?: Maybe<
    { __typename?: 'WorkPacketStatusDetails' } & Pick<
      WorkPacketStatusDetails,
      'workOrderId' | 'specId' | 'specImplName' | 'fingerPrint' | 'suppressBilling' | 'inboundLabel' | 'outboundLabel'
    > & {
        workStepStatus?: Maybe<
          Array<
            Maybe<
              { __typename?: 'WorkStepStatus' } & Pick<WorkStepStatus, 'stepStatus' | 'stepName' | 'stepType'> & {
                  populationCount?: Maybe<{ __typename?: 'StatCountType' } & Pick<StatCountType, 'value'>>;
                  stepFile?: Maybe<
                    Array<Maybe<{ __typename?: 'ArchiveFileType' } & Pick<ArchiveFileType, 'value' | 'label'>>>
                  >;
                  nvp?: Maybe<Array<Maybe<{ __typename?: 'NVPStr' } & Pick<NvpStr, 'name' | 'value'>>>>;
                  recordCounts?: Maybe<{ __typename?: 'RecordCounts' } & RecordCountsFragmentFragment>;
                }
            >
          >
        >;
        deliveredFile?: Maybe<
          { __typename?: 'DeliveredFile' } & Pick<
            DeliveredFile,
            'filename' | 'fileSizeInBytes' | 'textSizeInBytes' | 'timeDelivered'
          > & {
              ftp?: Maybe<
                { __typename?: 'DeliveredFileFTP' } & Pick<
                  DeliveredFileFtp,
                  'protocol' | 'host' | 'username' | 'folder' | 'port'
                >
              >;
              kcurl?: Maybe<{ __typename?: 'DeliveredKCURL' } & Pick<DeliveredKcurl, 'url'>>;
            }
        >;
        extractParameters?: Maybe<
          { __typename?: 'ExtractParameters' } & {
            originalParameter?: Maybe<
              Array<Maybe<{ __typename?: 'ExtractParameter' } & ExtractParameterFragmentFragment>>
            >;
            overriddenParameter?: Maybe<
              Array<Maybe<{ __typename?: 'ExtractParameter' } & ExtractParameterFragmentFragment>>
            >;
            derivedParameter?: Maybe<
              Array<Maybe<{ __typename?: 'ExtractParameter' } & ExtractParameterFragmentFragment>>
            >;
          }
        >;
        qualityChecks?: Maybe<
          { __typename?: 'QualityChecks' } & {
            sequenceCreationEvent?: Maybe<
              Array<
                Maybe<
                  { __typename?: 'SequenceCreationEvent' } & Pick<SequenceCreationEvent, 'context' | 'unitId'> & {
                      recordCreationEvent?: Maybe<
                        Array<
                          Maybe<
                            { __typename?: 'RecordCreationEvent' } & Pick<
                              RecordCreationEvent,
                              'context' | 'outerContext' | 'unitId'
                            > & {
                                error?: Maybe<
                                  Array<Maybe<{ __typename?: 'FieldCreationEvent' } & FieldCreationFragmentFragment>>
                                >;
                                warning?: Maybe<
                                  Array<Maybe<{ __typename?: 'FieldCreationEvent' } & FieldCreationFragmentFragment>>
                                >;
                                information?: Maybe<
                                  Array<Maybe<{ __typename?: 'FieldCreationEvent' } & FieldCreationFragmentFragment>>
                                >;
                              }
                          >
                        >
                      >;
                    }
                >
              >
            >;
          }
        >;
        enrollmentStats?: Maybe<{ __typename?: 'EnrollmentStat' } & EnrollmentStatFragmentFragment>;
        inboundEnrollmentStats?: Maybe<{ __typename?: 'EnrollmentStat' } & EnrollmentStatFragmentFragment>;
        outboundEnrollmentStats?: Maybe<{ __typename?: 'EnrollmentStat' } & EnrollmentStatFragmentFragment>;
        outboundRecordCounts?: Maybe<{ __typename?: 'RecordCounts' } & RecordCountsFragmentFragment>;
      }
  >;
};

export type WorkPacketStatusQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;

export type WorkPacketStatusQuery = { __typename?: 'Query' } & {
  workPacketStatus?: Maybe<
    { __typename?: 'WorkPacketStatus' } & Pick<
      WorkPacketStatus,
      | 'workOrderId'
      | 'timestamp'
      | 'planSponsorId'
      | 'detailsPath'
      | 'subClientPath'
      | 'inboundFilename'
      | 'vendorId'
      | 'step'
      | 'stepStatus'
      | 'packetStatus'
      | 'reprocessedBy'
      | 'reprocessAction'
      | 'populationCount'
      | 'recordHighlightCount'
      | 'recordHighlightType'
      | 'clientFileArchivePath'
      | 'vendorFileArchivePath'
      | 'supplementalFilesArchivePaths'
      | 'archiveOnly'
      | 'hasErrors'
    >
  >;
};

export type RecordCountsFragmentFragment = { __typename?: 'RecordCounts' } & Pick<
  RecordCounts,
  'totalCount' | 'showUser'
> & { recordCount?: Maybe<Array<Maybe<{ __typename?: 'RecordCount' } & Pick<RecordCount, 'name' | 'count'>>>> };

export type ExtractParameterFragmentFragment = { __typename?: 'ExtractParameter' } & Pick<
  ExtractParameter,
  'label' | 'name' | 'value'
>;

export type FieldCreationFragmentFragment = { __typename?: 'FieldCreationEvent' } & Pick<
  FieldCreationEvent,
  'message' | 'name' | 'id' | 'value' | 'rawValue' | 'type'
>;

export type EnrollmentStatFragmentFragment = { __typename?: 'EnrollmentStat' } & {
  insuredStat?: Maybe<{ __typename?: 'InsuredStat' } & InsuredStatFragmentFragment>;
  excludedInsuredStat?: Maybe<{ __typename?: 'InsuredStat' } & InsuredStatFragmentFragment>;
  excludedPlanInsuredStat?: Maybe<Array<Maybe<{ __typename?: 'PlanInsuredStat' } & PlanInsuredStatFragmentFragment>>>;
  planInsuredStat?: Maybe<Array<Maybe<{ __typename?: 'PlanInsuredStat' } & PlanInsuredStatFragmentFragment>>>;
};

export type InsuredStatFragmentFragment = { __typename?: 'InsuredStat' } & {
  subscribers?: Maybe<{ __typename?: 'InsuredStatCount' } & InsuredStatCountFragmentFragment>;
  dependents?: Maybe<{ __typename?: 'InsuredStatCount' } & InsuredStatCountFragmentFragment>;
};

export type PlanInsuredStatFragmentFragment = { __typename?: 'PlanInsuredStat' } & Pick<
  PlanInsuredStat,
  'planCode' | 'planType'
> & {
    subscribers?: Maybe<{ __typename?: 'InsuredStatCount' } & InsuredStatCountFragmentFragment>;
    dependents?: Maybe<{ __typename?: 'InsuredStatCount' } & InsuredStatCountFragmentFragment>;
  };

export type InsuredStatCountFragmentFragment = { __typename?: 'InsuredStatCount' } & Pick<
  InsuredStatCount,
  'expectedTotal' | 'inTolerance' | 'toleranceMsg' | 'hold'
> & {
    active?: Maybe<{ __typename?: 'StatInt' } & StatIntFragmentFragment>;
    ended?: Maybe<{ __typename?: 'StatInt' } & StatIntFragmentFragment>;
  };

export type StatIntFragmentFragment = { __typename?: 'StatInt' } & Pick<StatInt, 'prior' | 'value'>;

export type DashboardPeriodsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type DashboardPeriodsQuery = { __typename?: 'Query' } & {
  dashboardPeriods?: Maybe<
    { __typename?: 'DashboardPeriods' } & {
      dailyCounts?: Maybe<{ __typename?: 'DashboardPeriodCounts' } & DashPeriodCountsFragmentFragment>;
      yesterdayCounts?: Maybe<{ __typename?: 'DashboardPeriodCounts' } & DashPeriodCountsFragmentFragment>;
      monthlyCounts?: Maybe<{ __typename?: 'DashboardPeriodCounts' } & DashPeriodCountsFragmentFragment>;
      lastMonthlyCounts?: Maybe<{ __typename?: 'DashboardPeriodCounts' } & DashPeriodCountsFragmentFragment>;
    }
  >;
};

export type DashPeriodCountsFragmentFragment = { __typename?: 'DashboardPeriodCounts' } & Pick<
  DashboardPeriodCounts,
  'transmissionCount' | 'billingUnitCount' | 'processErrorCount'
> & {
    vendorTransmissions?: Maybe<
      Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>
    >;
    vendorTransmissionsBySpec?: Maybe<
      Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>
    >;
    planSponsorTransmissions?: Maybe<
      Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>
    >;
    fileTransmissions?: Maybe<Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>>;
    vendorProcessErrors?: Maybe<
      Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>
    >;
    planSponsorProcessErrors?: Maybe<
      Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>
    >;
    fileProcessErrors?: Maybe<Array<Maybe<{ __typename?: 'DashboardPeriodCount' } & DashPeriodCountFragmentFragment>>>;
  };

export type DashPeriodCountFragmentFragment = { __typename?: 'DashboardPeriodCount' } & Pick<
  DashboardPeriodCount,
  'name' | 'secondaryDescr' | 'count' | 'total'
>;

export type AccessPolicyPageQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type AccessPolicyPageQuery = { __typename?: 'Query' } & {
  accessPolicyPage?: Maybe<
    { __typename?: 'AccessPolicyPage' } & Pick<AccessPolicyPage, 'showTemplateSection'> & {
        permissionServices?: Maybe<
          Array<Maybe<{ __typename?: 'CDXServiceNVP' } & Pick<CdxServiceNvp, 'name' | 'value'>>>
        >;
        predicates?: Maybe<
          Array<Maybe<{ __typename?: 'PermissionPredicateNVP' } & Pick<PermissionPredicateNvp, 'name' | 'value'>>>
        >;
        templateServices?: Maybe<
          Array<Maybe<{ __typename?: 'CDXServiceNVP' } & Pick<CdxServiceNvp, 'name' | 'value'>>>
        >;
      }
  >;
};

export type CreateOrgMutationVariables = Exact<{
  orgInfo: CreateOrgInput;
}>;

export type CreateOrgMutation = { __typename?: 'Mutation' } & {
  createOrg?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'orgId' | 'orgType'>>;
};

export type CreateAccessPolicyMutationVariables = Exact<{
  policyInfo: CreateAccessPolicyInput;
}>;

export type CreateAccessPolicyMutation = { __typename?: 'Mutation' } & {
  createAccessPolicy?: Maybe<{ __typename?: 'AccessPolicy' } & PolicyFragmentFragment>;
};

export type PolicyFragmentFragment = { __typename?: 'AccessPolicy' } & Pick<
  AccessPolicy,
  'id' | 'name' | 'tmpl' | 'tmplUseAsIs' | 'permissions'
>;

export type CreateAccessPolicyGroupMutationVariables = Exact<{
  accessPolicyGroupInfo: CreateAccessPolicyGroupInput;
}>;

export type CreateAccessPolicyGroupMutation = { __typename?: 'Mutation' } & {
  createAccessPolicyGroup?: Maybe<
    { __typename?: 'AccessPolicyGroup' } & Pick<
      AccessPolicyGroup,
      'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs'
    > & { policies?: Maybe<Array<Maybe<{ __typename?: 'AccessPolicy' } & Pick<AccessPolicy, 'id' | 'name'>>>> }
  >;
};

export type CreateAccessSpecializationMutationVariables = Exact<{
  specializationInfo: CreateAccessSpecializationInput;
}>;

export type CreateAccessSpecializationMutation = { __typename?: 'Mutation' } & {
  createAccessSpecialization?: Maybe<
    { __typename?: 'AccessSpecialization' } & Pick<AccessSpecialization, 'id' | 'name'> & {
        filters?: Maybe<
          Array<
            Maybe<
              { __typename?: 'SpecializationFilter' } & Pick<SpecializationFilter, 'permission' | 'organizationIds'>
            >
          >
        >;
      }
  >;
};

export type SystemTemplateAccessPolicyGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type SystemTemplateAccessPolicyGroupByNameQuery = { __typename?: 'Query' } & {
  systemTemplateAccessPolicyGroupByName?: Maybe<
    Array<
      Maybe<
        { __typename?: 'AccessPolicyGroup' } & Pick<
          AccessPolicyGroup,
          'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs'
        >
      >
    >
  >;
};

export type CreateUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser?: Maybe<
    { __typename?: 'UserResponse' } & Pick<UserResponse, 'response' | 'msg' | 'nextPage'> & {
        model?: Maybe<
          { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
              person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'firstNm' | 'lastNm'>>;
            }
        >;
      }
  >;
};

export type UpdateUserMutationVariables = Exact<{
  userInfo: UpdateUserInput;
}>;

export type UpdateUserMutation = { __typename?: 'Mutation' } & {
  updateUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
        person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'firstNm' | 'lastNm'>>;
      }
  >;
};

export type UpdateUserAccessPolicyGroupsMutationVariables = Exact<{
  userAccessPolicyGroupUpdate: UpdateUserAccessPolicyGroupsInput;
}>;

export type UpdateUserAccessPolicyGroupsMutation = { __typename?: 'Mutation' } & {
  updateUserAccessPolicyGroups?: Maybe<
    Array<Maybe<{ __typename?: 'AccessPolicyGroup' } & Pick<AccessPolicyGroup, 'id' | 'name'>>>
  >;
};

export type DeactivateUserMutationVariables = Exact<{
  sidInput: SidInput;
}>;

export type DeactivateUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deactivateUser'>;

export type DeactivateUsersMutationVariables = Exact<{
  sidsInput: SidsInput;
}>;

export type DeactivateUsersMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'deactivateUsers'>;

export type ActivateUserMutationVariables = Exact<{
  sidInput: SidInput;
}>;

export type ActivateUserMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'activateUser'>;

export type ActivateUsersMutationVariables = Exact<{
  sidsInput: SidsInput;
}>;

export type ActivateUsersMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'activateUsers'>;

export type AccessPoliciesForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;

export type AccessPoliciesForOrgQuery = { __typename?: 'Query' } & {
  accessPoliciesForOrg?: Maybe<
    { __typename?: 'AccessPolicyConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<Array<Maybe<{ __typename?: 'AccessPolicy' } & Pick<AccessPolicy, 'id' | 'name' | 'tmpl'>>>>;
    }
  >;
};

export type AccessSpecializationsForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;

export type AccessSpecializationsForOrgQuery = { __typename?: 'Query' } & {
  accessSpecializationsForOrg?: Maybe<
    { __typename?: 'AccessSpecializationConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<Array<Maybe<{ __typename?: 'AccessSpecialization' } & Pick<AccessSpecialization, 'id' | 'name'>>>>;
    }
  >;
};

export type AccessPolicyGroupsForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;

export type AccessPolicyGroupsForOrgQuery = { __typename?: 'Query' } & {
  accessPolicyGroupsForOrg?: Maybe<
    { __typename?: 'AccessPolicyGroupConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<Maybe<{ __typename?: 'AccessPolicyGroup' } & Pick<AccessPolicyGroup, 'id' | 'name' | 'tmpl'>>>
      >;
    }
  >;
};

export type TopLevelOrgsByTypeQueryVariables = Exact<{
  orgType: OrgType;
}>;

export type TopLevelOrgsByTypeQuery = { __typename?: 'Query' } & {
  topLevelOrgsByType?: Maybe<
    Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'orgId' | 'orgType'>>>
  >;
};

export type UsersForOrgFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type UsersForOrgFpQuery = { __typename?: 'Query' } & {
  usersForOrg?: Maybe<
    { __typename?: 'UserConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      listPageInfo?: Maybe<
        { __typename?: 'ListPageInfo' } & Pick<ListPageInfo, 'pageHeaderLabel'> & {
            pageCommands?: Maybe<Array<Maybe<{ __typename?: 'WebCommand' } & WebCommandFragmentFragment>>>;
            listItemCommands?: Maybe<Array<Maybe<{ __typename?: 'WebCommand' } & WebCommandFragmentFragment>>>;
            listItemBulkCommands?: Maybe<Array<Maybe<{ __typename?: 'WebCommand' } & WebCommandFragmentFragment>>>;
          }
      >;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'UserItem' } & {
              item: { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
                  person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'firstNm' | 'lastNm'>>;
                };
            }
          >
        >
      >;
    }
  >;
};

export type DirectOrganizationsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type DirectOrganizationsQuery = { __typename?: 'Query' } & {
  directOrganizations?: Maybe<
    { __typename?: 'OrganizationConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>>>
      >;
    }
  >;
};

export type DirectOrganizationsFQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
}>;

export type DirectOrganizationsFQuery = { __typename?: 'Query' } & {
  directOrganizations?: Maybe<
    { __typename?: 'OrganizationConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>>>
      >;
    }
  >;
};

export type DirectOrganizationsFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type DirectOrganizationsFpQuery = { __typename?: 'Query' } & {
  directOrganizations?: Maybe<
    { __typename?: 'OrganizationConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>>>
      >;
    }
  >;
};

export type PaginationInfoFragmentFragment = { __typename?: 'PaginationInfo' } & Pick<
  PaginationInfo,
  'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'
>;

export type WebCommandFragmentFragment = { __typename?: 'WebCommand' } & Pick<
  WebCommand,
  'endPoint' | 'label' | 'commandType'
> & {
    parameters?: Maybe<
      Array<
        Maybe<
          ({ __typename?: 'NVPStr' } & UnionNvp_NvpStr_Fragment) | ({ __typename?: 'NVPId' } & UnionNvp_NvpId_Fragment)
        >
      >
    >;
  };

export type WpProcessErrorsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type WpProcessErrorsQuery = { __typename?: 'Query' } & {
  wpProcessErrors?: Maybe<
    { __typename?: 'WPProcessErrorConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'WPProcessError' } & Pick<
              WpProcessError,
              | 'id'
              | 'workOrderId'
              | 'startTime'
              | 'stepName'
              | 'planSponsorId'
              | 'vendorId'
              | 'msg'
              | 'inboundFilename'
              | 'clientFileArchivePath'
            >
          >
        >
      >;
    }
  >;
};

export type WpTransmissionsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type WpTransmissionsQuery = { __typename?: 'Query' } & {
  wpTransmissions?: Maybe<
    { __typename?: 'WPTransmissionConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'WPTransmission' } & Pick<
              WpTransmission,
              | 'id'
              | 'workOrderId'
              | 'deliveredOn'
              | 'planSponsorId'
              | 'vendorId'
              | 'specId'
              | 'implementation'
              | 'inboundFilename'
              | 'outboundFilename'
              | 'outboundFilesize'
              | 'billingCount'
              | 'totalRecords'
              | 'extractType'
              | 'extractVersion'
            >
          >
        >
      >;
    }
  >;
};

export type AccessPolicyQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
}>;

export type AccessPolicyQuery = { __typename?: 'Query' } & {
  accessPolicy?: Maybe<
    { __typename?: 'AccessPolicy' } & Pick<AccessPolicy, 'id' | 'name' | 'permissions' | 'tmpl' | 'tmplUseAsIs'>
  >;
};

export type ScheduleOccurrencesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type ScheduleOccurrencesQuery = { __typename?: 'Query' } & {
  scheduleOccurrences?: Maybe<
    { __typename?: 'ScheduleOccurrenceConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'ScheduleOccurrence' } & Pick<
              ScheduleOccurrence,
              'resource' | 'scheduleId' | 'timeScheduled' | 'schedOccurStatus'
            > & {
                runOccurrences?: Maybe<
                  Array<
                    Maybe<
                      { __typename?: 'ScheduleRunOccurrence' } & Pick<
                        ScheduleRunOccurrence,
                        'workOrderId' | 'timeRan' | 'status'
                      >
                    >
                  >
                >;
              }
          >
        >
      >;
    }
  >;
};

export type UpdateOwnPasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;

export type UpdateOwnPasswordMutation = { __typename?: 'Mutation' } & {
  updateOwnPassword?: Maybe<{ __typename?: 'UserSession' } & Pick<UserSession, 'id' | 'orgId' | 'userId'>>;
};

export type OrgByIdQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgId: Scalars['String'];
}>;

export type OrgByIdQuery = { __typename?: 'Query' } & {
  orgById?: Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = { __typename?: 'Query' } & {
  currentUser?: Maybe<
    { __typename?: 'CurrentUserInfo' } & Pick<CurrentUserInfo, 'loggedIn'> & {
        domain?: Maybe<
          { __typename?: 'WebAppDomain' } & Pick<WebAppDomain, 'type' | 'selectedPage'> & {
              navItems?: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'WebNav' } & {
                      subNavItems?: Maybe<Array<Maybe<{ __typename?: 'WebNav' } & NavItemFragmentFragment>>>;
                    } & NavItemFragmentFragment
                  >
                >
              >;
            }
        >;
        tokenUser?: Maybe<
          { __typename?: 'TokenUser' } & Pick<TokenUser, 'token'> & {
              session?: Maybe<
                { __typename?: 'UserSession' } & Pick<
                  UserSession,
                  'id' | 'orgId' | 'userId' | 'pollInterval' | 'defaultAuthorities'
                >
              >;
            }
        >;
      }
  >;
};

export type RemoveAccessPolicyMutationVariables = Exact<{
  policySid: Scalars['ID'];
}>;

export type RemoveAccessPolicyMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeAccessPolicy'>;

export type RemoveAccessPoliciesMutationVariables = Exact<{
  deleteAccessPoliciesInput: DeleteAccessPoliciesInput;
}>;

export type RemoveAccessPoliciesMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeAccessPolicies'>;

export type UpdateAccessPolicyMutationVariables = Exact<{
  updateAccessPolicyInput: UpdateAccessPolicyInput;
}>;

export type UpdateAccessPolicyMutation = { __typename?: 'Mutation' } & {
  updateAccessPolicy?: Maybe<
    { __typename?: 'AccessPolicy' } & Pick<AccessPolicy, 'id' | 'name' | 'tmpl' | 'tmplUseAsIs' | 'permissions'>
  >;
};

export type LogOutQueryVariables = Exact<{ [key: string]: never }>;

export type LogOutQuery = { __typename?: 'Query' } & {
  logOut?: Maybe<{ __typename?: 'LogOutInfo' } & Pick<LogOutInfo, 'successful'>>;
};

export type UserThemeQueryVariables = Exact<{
  themeColorMode?: Maybe<ThemeColorMode>;
}>;

export type UserThemeQuery = { __typename?: 'Query' } & {
  userTheme?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<
          { __typename?: 'DashThemeColor' } & Pick<
            DashThemeColor,
            | 'paletteNm'
            | 'themePrimary'
            | 'themeLighterAlt'
            | 'themeLighter'
            | 'themeLight'
            | 'themeTertiary'
            | 'themeSecondary'
            | 'themeDarkAlt'
            | 'themeDark'
            | 'themeDarker'
            | 'neutralLighterAlt'
            | 'neutralLighter'
            | 'neutralLight'
            | 'neutralQuaternaryAlt'
            | 'neutralQuaternary'
            | 'neutralTertiaryAlt'
            | 'neutralTertiary'
            | 'neutralSecondary'
            | 'neutralPrimaryAlt'
            | 'neutralPrimary'
            | 'neutralDark'
            | 'black'
            | 'white'
          >
        >;
      }
  >;
};

export type DashThemeColorForOrgQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type DashThemeColorForOrgQuery = { __typename?: 'Query' } & {
  dashThemeColorForOrg?: Maybe<
    { __typename?: 'DashThemeColorConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'DashThemeColor' } & Pick<
              DashThemeColor,
              | 'id'
              | 'paletteNm'
              | 'defaultPalette'
              | 'allowDark'
              | 'themeColorMode'
              | 'themePrimary'
              | 'neutralPrimary'
              | 'white'
            >
          >
        >
      >;
    }
  >;
};

export type DashSiteForOrgQueryVariables = Exact<{
  orgSidInput?: Maybe<OrgSidInput>;
}>;

export type DashSiteForOrgQuery = { __typename?: 'Query' } & {
  dashSiteForOrg?: Maybe<{ __typename?: 'DashSite' } & Pick<DashSite, 'id' | 'active'>>;
};

export type CreateDashThemeColorMutationVariables = Exact<{
  createDashThemeColorInput: CreateDashThemeColorInput;
}>;

export type CreateDashThemeColorMutation = { __typename?: 'Mutation' } & {
  createDashThemeColor?: Maybe<
    { __typename?: 'DashThemeColor' } & Pick<
      DashThemeColor,
      | 'id'
      | 'defaultPalette'
      | 'allowDark'
      | 'themeColorMode'
      | 'paletteNm'
      | 'themePrimary'
      | 'themeLighterAlt'
      | 'themeLighter'
      | 'themeLight'
      | 'themeTertiary'
      | 'themeSecondary'
      | 'themeDarkAlt'
      | 'themeDark'
      | 'themeDarker'
      | 'neutralLighterAlt'
      | 'neutralLighter'
      | 'neutralLight'
      | 'neutralQuaternaryAlt'
      | 'neutralQuaternary'
      | 'neutralTertiaryAlt'
      | 'neutralTertiary'
      | 'neutralSecondary'
      | 'neutralPrimaryAlt'
      | 'neutralPrimary'
      | 'neutralDark'
      | 'black'
      | 'white'
    >
  >;
};

export type DashThemeColorByNameQueryVariables = Exact<{
  ownedInputName?: Maybe<OwnedInputName>;
}>;

export type DashThemeColorByNameQuery = { __typename?: 'Query' } & {
  dashThemeColorByName?: Maybe<
    { __typename?: 'DashThemeColor' } & Pick<
      DashThemeColor,
      | 'id'
      | 'defaultPalette'
      | 'allowDark'
      | 'themeColorMode'
      | 'paletteNm'
      | 'themePrimary'
      | 'themeLighterAlt'
      | 'themeLighter'
      | 'themeLight'
      | 'themeTertiary'
      | 'themeSecondary'
      | 'themeDarkAlt'
      | 'themeDark'
      | 'themeDarker'
      | 'neutralLighterAlt'
      | 'neutralLighter'
      | 'neutralLight'
      | 'neutralQuaternaryAlt'
      | 'neutralQuaternary'
      | 'neutralTertiaryAlt'
      | 'neutralTertiary'
      | 'neutralSecondary'
      | 'neutralPrimaryAlt'
      | 'neutralPrimary'
      | 'neutralDark'
      | 'black'
      | 'white'
    >
  >;
};

export type UpdateDashThemeColorMutationVariables = Exact<{
  updateDashThemeColorInput: UpdateDashThemeColorInput;
}>;

export type UpdateDashThemeColorMutation = { __typename?: 'Mutation' } & {
  updateDashThemeColor?: Maybe<
    { __typename?: 'DashThemeColor' } & Pick<
      DashThemeColor,
      | 'id'
      | 'defaultPalette'
      | 'allowDark'
      | 'themeColorMode'
      | 'paletteNm'
      | 'themePrimary'
      | 'themeLighterAlt'
      | 'themeLighter'
      | 'themeLight'
      | 'themeTertiary'
      | 'themeSecondary'
      | 'themeDarkAlt'
      | 'themeDark'
      | 'themeDarker'
      | 'neutralLighterAlt'
      | 'neutralLighter'
      | 'neutralLight'
      | 'neutralQuaternaryAlt'
      | 'neutralQuaternary'
      | 'neutralTertiaryAlt'
      | 'neutralTertiary'
      | 'neutralSecondary'
      | 'neutralPrimaryAlt'
      | 'neutralPrimary'
      | 'neutralDark'
      | 'black'
      | 'white'
    >
  >;
};

export type CreateDefaultDashThemeMutationVariables = Exact<{
  createDefaultDashThemeInput: CreateDefaultDashThemeInput;
}>;

export type CreateDefaultDashThemeMutation = { __typename?: 'Mutation' } & {
  createDefaultDashTheme?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<{ __typename?: 'DashThemeColor' } & Pick<DashThemeColor, 'id'>>;
      }
  >;
};

export type DefaultDashThemeForSiteQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
}>;

export type DefaultDashThemeForSiteQuery = { __typename?: 'Query' } & {
  defaultDashThemeForSite?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<
          { __typename?: 'DashThemeColor' } & Pick<
            DashThemeColor,
            'id' | 'paletteNm' | 'allowDark' | 'themePrimary' | 'neutralPrimary' | 'white'
          >
        >;
      }
  >;
};

export type CurrentOrgNavQueryVariables = Exact<{
  orgInput?: Maybe<OrgSidInput>;
}>;

export type CurrentOrgNavQuery = { __typename?: 'Query' } & {
  currentOrgNav?: Maybe<
    { __typename?: 'WebNav' } & Pick<WebNav, 'label'> & {
        subNavItems?: Maybe<Array<Maybe<{ __typename?: 'WebNav' } & NavItemFragmentFragment>>>;
      }
  >;
};

export type UpdateDefaultDashThemeMutationVariables = Exact<{
  updateDefaultDashThemeInput: UpdateDefaultDashThemeInput;
}>;

export type UpdateDefaultDashThemeMutation = { __typename?: 'Mutation' } & {
  updateDefaultDashTheme?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<{ __typename?: 'DashThemeColor' } & Pick<DashThemeColor, 'id'>>;
      }
  >;
};

export type RemoveDashThemeColorMutationVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type RemoveDashThemeColorMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeDashThemeColor'>;

export type RemoveDefaultDashThemeMutationVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type RemoveDefaultDashThemeMutation = { __typename?: 'Mutation' } & Pick<Mutation, 'removeDefaultDashTheme'>;

export type CurrentUserDashThemePageQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserDashThemePageQuery = { __typename?: 'Query' } & {
  currentUserDashThemePage?: Maybe<
    { __typename?: 'UserDashThemePage' } & Pick<UserDashThemePage, 'themeColorModes' | 'themeFontSizes'> & {
        themeColorPalettes?: Maybe<
          Array<
            Maybe<
              { __typename?: 'DashThemeColor' } & Pick<
                DashThemeColor,
                'id' | 'paletteNm' | 'neutralPrimary' | 'allowDark' | 'themePrimary' | 'white'
              >
            >
          >
        >;
        dashTheme?: Maybe<
          { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeFontSize' | 'themeColorMode'> & {
              dashThemeColor?: Maybe<
                { __typename?: 'DashThemeColor' } & Pick<
                  DashThemeColor,
                  'id' | 'paletteNm' | 'allowDark' | 'themePrimary' | 'neutralPrimary' | 'white'
                >
              >;
            }
        >;
      }
  >;
};

export type FindUserByEmailQueryVariables = Exact<{
  userEmail: Scalars['String'];
}>;

export type FindUserByEmailQuery = { __typename?: 'Query' } & {
  findUserByEmail?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
        person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'id' | 'firstNm' | 'lastNm'>>;
      }
  >;
};

export type FindUserQueryVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type FindUserQuery = { __typename?: 'Query' } & {
  findUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
        person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'id' | 'firstNm' | 'lastNm'>>;
      }
  >;
};

export type SetOwnDashThemeFontSizeMutationVariables = Exact<{
  dashThemeInput: DashThemeInput;
}>;

export type SetOwnDashThemeFontSizeMutation = { __typename?: 'Mutation' } & {
  setOwnDashThemeFontSize?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<
          { __typename?: 'DashThemeColor' } & Pick<
            DashThemeColor,
            | 'id'
            | 'paletteNm'
            | 'themePrimary'
            | 'themeLighterAlt'
            | 'themeLighter'
            | 'themeLight'
            | 'themeTertiary'
            | 'themeSecondary'
            | 'themeDarkAlt'
            | 'themeDark'
            | 'themeDarker'
            | 'neutralLighterAlt'
            | 'neutralLighter'
            | 'neutralLight'
            | 'neutralQuaternaryAlt'
            | 'neutralQuaternary'
            | 'neutralTertiaryAlt'
            | 'neutralTertiary'
            | 'neutralSecondary'
            | 'neutralPrimaryAlt'
            | 'neutralPrimary'
            | 'neutralDark'
            | 'black'
            | 'white'
          >
        >;
      }
  >;
};

export type CreateOrUpdateOwnDashThemeMutationVariables = Exact<{
  dashThemeInput: DashThemeInput;
}>;

export type CreateOrUpdateOwnDashThemeMutation = { __typename?: 'Mutation' } & {
  createOrUpdateOwnDashTheme?: Maybe<
    { __typename?: 'DashTheme' } & Pick<DashTheme, 'id' | 'themeColorMode' | 'themeFontSize'> & {
        dashThemeColor?: Maybe<
          { __typename?: 'DashThemeColor' } & Pick<DashThemeColor, 'id' | 'themePrimary' | 'neutralPrimary' | 'white'>
        >;
      }
  >;
};

export type SetDashThemeColorDefaultMutationVariables = Exact<{
  dashThemeColorDefaultInput: DashThemeColorDefaultInput;
}>;

export type SetDashThemeColorDefaultMutation = { __typename?: 'Mutation' } & {
  setDashThemeColorDefault?: Maybe<
    { __typename?: 'DashThemeColor' } & Pick<DashThemeColor, 'id' | 'themePrimary' | 'neutralPrimary' | 'white'>
  >;
};

export type ChangeOwnPasswordPageQueryVariables = Exact<{ [key: string]: never }>;

export type ChangeOwnPasswordPageQuery = { __typename?: 'Query' } & {
  changeOwnPasswordPage?: Maybe<
    { __typename?: 'PasswordPage' } & {
      ruleGroup: { __typename?: 'PasswordRuleGroup' } & Pick<PasswordRuleGroup, 'numberOfCharacteristics'> & {
          rules?: Maybe<
            Array<
              Maybe<
                | ({ __typename?: 'PasswordLengthRule' } & UnionPasswordRule_PasswordLengthRule_Fragment)
                | ({ __typename?: 'PasswordWhitespaceRule' } & UnionPasswordRule_PasswordWhitespaceRule_Fragment)
                | ({ __typename?: 'PasswordCharacterRule' } & UnionPasswordRule_PasswordCharacterRule_Fragment)
                | ({ __typename?: 'PasswordStrengthRule' } & UnionPasswordRule_PasswordStrengthRule_Fragment)
                | ({ __typename?: 'PasswordRuleGroup' } & Pick<PasswordRuleGroup, 'numberOfCharacteristics'> & {
                      rules?: Maybe<
                        Array<
                          Maybe<
                            | ({ __typename?: 'PasswordLengthRule' } & UnionPasswordRule_PasswordLengthRule_Fragment)
                            | ({
                                __typename?: 'PasswordWhitespaceRule';
                              } & UnionPasswordRule_PasswordWhitespaceRule_Fragment)
                            | ({
                                __typename?: 'PasswordCharacterRule';
                              } & UnionPasswordRule_PasswordCharacterRule_Fragment)
                            | ({
                                __typename?: 'PasswordStrengthRule';
                              } & UnionPasswordRule_PasswordStrengthRule_Fragment)
                            | ({ __typename?: 'PasswordRuleGroup' } & Pick<
                                PasswordRuleGroup,
                                'numberOfCharacteristics'
                              > & {
                                  rules?: Maybe<
                                    Array<
                                      Maybe<
                                        | ({
                                            __typename?: 'PasswordLengthRule';
                                          } & UnionPasswordRule_PasswordLengthRule_Fragment)
                                        | ({
                                            __typename?: 'PasswordWhitespaceRule';
                                          } & UnionPasswordRule_PasswordWhitespaceRule_Fragment)
                                        | ({
                                            __typename?: 'PasswordCharacterRule';
                                          } & UnionPasswordRule_PasswordCharacterRule_Fragment)
                                        | ({
                                            __typename?: 'PasswordStrengthRule';
                                          } & UnionPasswordRule_PasswordStrengthRule_Fragment)
                                        | ({ __typename?: 'PasswordRuleGroup' } & Pick<
                                            PasswordRuleGroup,
                                            'numberOfCharacteristics'
                                          > &
                                            UnionPasswordRule_PasswordRuleGroup_Fragment)
                                      >
                                    >
                                  >;
                                } & UnionPasswordRule_PasswordRuleGroup_Fragment)
                          >
                        >
                      >;
                    } & UnionPasswordRule_PasswordRuleGroup_Fragment)
              >
            >
          >;
        };
    }
  >;
};

type UnionPasswordRule_PasswordLengthRule_Fragment = { __typename: 'PasswordLengthRule' } & Pick<
  PasswordLengthRule,
  'minLength' | 'maxLength'
>;

type UnionPasswordRule_PasswordWhitespaceRule_Fragment = { __typename: 'PasswordWhitespaceRule' } & Pick<
  PasswordWhitespaceRule,
  'allowedWhitespace'
>;

type UnionPasswordRule_PasswordCharacterRule_Fragment = { __typename: 'PasswordCharacterRule' } & Pick<
  PasswordCharacterRule,
  'characterType' | 'numberOfCharacters'
>;

type UnionPasswordRule_PasswordStrengthRule_Fragment = { __typename: 'PasswordStrengthRule' } & Pick<
  PasswordStrengthRule,
  'requiredStrengthLevel'
>;

type UnionPasswordRule_PasswordRuleGroup_Fragment = { __typename: 'PasswordRuleGroup' };

export type UnionPasswordRuleFragment =
  | UnionPasswordRule_PasswordLengthRule_Fragment
  | UnionPasswordRule_PasswordWhitespaceRule_Fragment
  | UnionPasswordRule_PasswordCharacterRule_Fragment
  | UnionPasswordRule_PasswordStrengthRule_Fragment
  | UnionPasswordRule_PasswordRuleGroup_Fragment;

export type ExchangeActivityInProcessQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;

export type ExchangeActivityInProcessQuery = { __typename?: 'Query' } & {
  exchangeActivityInProcess?: Maybe<
    { __typename?: 'OrganizationLinkConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & Pick<
        PaginationInfo,
        'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'
      >;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'OrganizationLink' } & Pick<
              OrganizationLink,
              'id' | 'orgId' | 'name' | 'type' | 'activityTime'
            >
          >
        >
      >;
    }
  >;
};

export type ExchangeActivityTransmittedQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;

export type ExchangeActivityTransmittedQuery = { __typename?: 'Query' } & {
  exchangeActivityTransmitted?: Maybe<
    { __typename?: 'OrganizationLinkConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & Pick<
        PaginationInfo,
        'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'
      >;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'OrganizationLink' } & Pick<
              OrganizationLink,
              'id' | 'orgId' | 'name' | 'type' | 'activityTime'
            >
          >
        >
      >;
    }
  >;
};

export type ExchangeActivityErroredQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;

export type ExchangeActivityErroredQuery = { __typename?: 'Query' } & {
  exchangeActivityErrored?: Maybe<
    { __typename?: 'OrganizationLinkConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & Pick<
        PaginationInfo,
        'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'
      >;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'OrganizationLink' } & Pick<
              OrganizationLink,
              'id' | 'orgId' | 'name' | 'type' | 'activityTime'
            >
          >
        >
      >;
    }
  >;
};

export type NavigateToNewDomainQueryVariables = Exact<{
  domainNavInput: DomainNavInput;
}>;

export type NavigateToNewDomainQuery = { __typename?: 'Query' } & {
  navigateToNewDomain?: Maybe<
    { __typename?: 'WebAppDomain' } & Pick<WebAppDomain, 'type' | 'selectedPage'> & {
        navItems?: Maybe<
          Array<
            Maybe<
              { __typename?: 'WebNav' } & {
                subNavItems?: Maybe<Array<Maybe<{ __typename?: 'WebNav' } & NavItemFragmentFragment>>>;
              } & NavItemFragmentFragment
            >
          >
        >;
      }
  >;
};

export type UserCreatePageQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
}>;

export type UserCreatePageQuery = { __typename?: 'Query' } & {
  userCreatePage?: Maybe<{ __typename?: 'UserPageInfo' } & FragmentUserPageInfoFragment>;
};

export type UserUpdatePageQueryVariables = Exact<{
  sidInput: SidInput;
}>;

export type UserUpdatePageQuery = { __typename?: 'Query' } & {
  userUpdatePage?: Maybe<{ __typename?: 'UserPageInfo' } & FragmentUserPageInfoFragment>;
};

export type UserAssignAccessPolicyGroupsPageQueryVariables = Exact<{
  sidInput: SidInput;
}>;

export type UserAssignAccessPolicyGroupsPageQuery = { __typename?: 'Query' } & {
  userUpdatePage?: Maybe<{ __typename?: 'UserPageInfo' } & FragmentUserPageInfoFragment>;
};

export type FragmentUserPageInfoFragment = { __typename?: 'UserPageInfo' } & {
  model?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
        person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'firstNm' | 'lastNm'>>;
        accessPolicyGroups?: Maybe<
          Array<
            Maybe<
              { __typename?: 'AccessPolicyGroup' } & Pick<AccessPolicyGroup, 'id' | 'name'> & {
                  policies?: Maybe<Array<Maybe<{ __typename?: 'AccessPolicy' } & Pick<AccessPolicy, 'name'>>>>;
                }
            >
          >
        >;
      }
  >;
  cdxPageInfo?: Maybe<{ __typename?: 'CDXPageInfo' } & FragmentPageInfoFragment>;
  accessPolicyGroupConnection?: Maybe<
    { __typename?: 'AccessPolicyGroupConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & PaginationInfoFragmentFragment;
      nodes?: Maybe<Array<Maybe<{ __typename?: 'AccessPolicyGroup' } & Pick<AccessPolicyGroup, 'id' | 'name'>>>>;
    }
  >;
};

export type FragmentPageInfoFragment = { __typename?: 'CDXPageInfo' } & Pick<CdxPageInfo, 'orgSid'> & {
    formInfo?: Maybe<
      Array<
        Maybe<
          { __typename?: 'FormInfo' } & Pick<FormInfo, 'label'> & {
              formCommands?: Maybe<Array<Maybe<{ __typename?: 'WebCommand' } & FragmentWebCommandFragment>>>;
            }
        >
      >
    >;
    lookupData?: Maybe<
      Array<
        Maybe<
          { __typename?: 'LookupData' } & Pick<LookupData, 'key'> & {
              lookupPairs?: Maybe<
                Array<
                  Maybe<
                    | ({ __typename?: 'NVPStr' } & UnionNvp_NvpStr_Fragment)
                    | ({ __typename?: 'NVPId' } & UnionNvp_NvpId_Fragment)
                  >
                >
              >;
            }
        >
      >
    >;
  };

export type FragmentWebCommandFragment = { __typename?: 'WebCommand' } & Pick<
  WebCommand,
  'endPoint' | 'label' | 'commandType'
> & {
    parameters?: Maybe<
      Array<
        Maybe<
          ({ __typename?: 'NVPStr' } & UnionNvp_NvpStr_Fragment) | ({ __typename?: 'NVPId' } & UnionNvp_NvpId_Fragment)
        >
      >
    >;
  };

export type SimulateSessionExpirQueryVariables = Exact<{ [key: string]: never }>;

export type SimulateSessionExpirQuery = { __typename?: 'Query' } & {
  simulateSessionExpir?: Maybe<{ __typename?: 'LogOutInfo' } & Pick<LogOutInfo, 'successful'>>;
};

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
export const WebPageFragmentFragmentDoc = gql`
  fragment webPageFragment on WebPage {
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
  ${UnionNvpFragmentDoc}
`;
export const NavItemFragmentFragmentDoc = gql`
  fragment navItemFragment on WebNav {
    label
    page {
      ...webPageFragment
    }
    appDomain
  }
  ${WebPageFragmentFragmentDoc}
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
export const StatIntFragmentFragmentDoc = gql`
  fragment statIntFragment on StatInt {
    prior
    value
  }
`;
export const InsuredStatCountFragmentFragmentDoc = gql`
  fragment insuredStatCountFragment on InsuredStatCount {
    active {
      ...statIntFragment
    }
    ended {
      ...statIntFragment
    }
    expectedTotal
    inTolerance
    toleranceMsg
    hold
  }
  ${StatIntFragmentFragmentDoc}
`;
export const InsuredStatFragmentFragmentDoc = gql`
  fragment insuredStatFragment on InsuredStat {
    subscribers {
      ...insuredStatCountFragment
    }
    dependents {
      ...insuredStatCountFragment
    }
  }
  ${InsuredStatCountFragmentFragmentDoc}
`;
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
  ${InsuredStatCountFragmentFragmentDoc}
`;
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
  ${PlanInsuredStatFragmentFragmentDoc}
`;
export const DashPeriodCountFragmentFragmentDoc = gql`
  fragment dashPeriodCountFragment on DashboardPeriodCount {
    name
    secondaryDescr
    count
    total
  }
`;
export const DashPeriodCountsFragmentFragmentDoc = gql`
  fragment dashPeriodCountsFragment on DashboardPeriodCounts {
    vendorTransmissions {
      ...dashPeriodCountFragment
    }
    vendorTransmissionsBySpec {
      ...dashPeriodCountFragment
    }
    planSponsorTransmissions {
      ...dashPeriodCountFragment
    }
    fileTransmissions {
      ...dashPeriodCountFragment
    }
    vendorProcessErrors {
      ...dashPeriodCountFragment
    }
    planSponsorProcessErrors {
      ...dashPeriodCountFragment
    }
    fileProcessErrors {
      ...dashPeriodCountFragment
    }
    transmissionCount
    billingUnitCount
    processErrorCount
  }
  ${DashPeriodCountFragmentFragmentDoc}
`;
export const PolicyFragmentFragmentDoc = gql`
  fragment policyFragment on AccessPolicy {
    id
    name
    tmpl
    tmplUseAsIs
    permissions
  }
`;
export const WebCommandFragmentFragmentDoc = gql`
  fragment webCommandFragment on WebCommand {
    endPoint
    label
    commandType
    parameters {
      ...unionNVP
    }
  }
  ${UnionNvpFragmentDoc}
`;
export const UnionPasswordRuleFragmentDoc = gql`
  fragment unionPasswordRule on PasswordRule {
    __typename
    ... on PasswordLengthRule {
      minLength
      maxLength
    }
    ... on PasswordStrengthRule {
      requiredStrengthLevel
    }
    ... on PasswordCharacterRule {
      characterType
      numberOfCharacters
    }
    ... on PasswordWhitespaceRule {
      allowedWhitespace
    }
  }
`;
export const FragmentWebCommandFragmentDoc = gql`
  fragment fragmentWebCommand on WebCommand {
    endPoint
    label
    parameters {
      ...unionNVP
    }
    commandType
  }
  ${UnionNvpFragmentDoc}
`;
export const FragmentPageInfoFragmentDoc = gql`
  fragment fragmentPageInfo on CDXPageInfo {
    orgSid
    formInfo {
      label
      formCommands {
        ...fragmentWebCommand
      }
    }
    lookupData {
      key
      lookupPairs {
        ...unionNVP
      }
    }
  }
  ${FragmentWebCommandFragmentDoc}
  ${UnionNvpFragmentDoc}
`;
export const PaginationInfoFragmentFragmentDoc = gql`
  fragment paginationInfoFragment on PaginationInfo {
    totalPages
    totalElements
    pageNumber
    pageSize
  }
`;
export const FragmentUserPageInfoFragmentDoc = gql`
  fragment fragmentUserPageInfo on UserPageInfo {
    model {
      id
      email
      person {
        firstNm
        lastNm
      }
      accessPolicyGroups {
        id
        name
        policies {
          name
        }
      }
    }
    cdxPageInfo {
      ...fragmentPageInfo
    }
    accessPolicyGroupConnection {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
      }
    }
  }
  ${FragmentPageInfoFragmentDoc}
  ${PaginationInfoFragmentFragmentDoc}
`;
export const BeginLoginDocument = gql`
  query BeginLogin($userId: String!) {
    beginLogin(userId: $userId) {
      userId
      step
      redirectPath
      allowLostPassword
    }
  }
`;

/**
 * __useBeginLoginQuery__
 *
 * To run a query within a React component, call `useBeginLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useBeginLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBeginLoginQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useBeginLoginQuery(baseOptions: Apollo.QueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>) {
  return Apollo.useQuery<BeginLoginQuery, BeginLoginQueryVariables>(BeginLoginDocument, baseOptions);
}
export function useBeginLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>
) {
  return Apollo.useLazyQuery<BeginLoginQuery, BeginLoginQueryVariables>(BeginLoginDocument, baseOptions);
}
export type BeginLoginQueryHookResult = ReturnType<typeof useBeginLoginQuery>;
export type BeginLoginLazyQueryHookResult = ReturnType<typeof useBeginLoginLazyQuery>;
export type BeginLoginQueryResult = Apollo.QueryResult<BeginLoginQuery, BeginLoginQueryVariables>;
export const PasswordLoginDocument = gql`
  mutation PasswordLogin($userId: String!, $password: String!) {
    passwordLogin(userId: $userId, password: $password) {
      step
      loginCompleteDomain {
        type
        selectedPage
        navItems {
          ...navItemFragment
          subNavItems {
            ...navItemFragment
          }
        }
      }
      tokenUser {
        token
        session {
          id
          orgId
          orgSid
          userId
          firstNm
          defaultAuthorities
        }
      }
    }
  }
  ${NavItemFragmentFragmentDoc}
`;
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
export function usePasswordLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<PasswordLoginMutation, PasswordLoginMutationVariables>
) {
  return Apollo.useMutation<PasswordLoginMutation, PasswordLoginMutationVariables>(PasswordLoginDocument, baseOptions);
}
export type PasswordLoginMutationHookResult = ReturnType<typeof usePasswordLoginMutation>;
export type PasswordLoginMutationResult = Apollo.MutationResult<PasswordLoginMutation>;
export type PasswordLoginMutationOptions = Apollo.BaseMutationOptions<
  PasswordLoginMutation,
  PasswordLoginMutationVariables
>;
export const WorkPacketStatusesDocument = gql`
  query WorkPacketStatuses($orgSid: ID!, $dateRange: DateTimeRangeInput, $filter: WorkPacketStatusFilter) {
    workPacketStatuses(orgSid: $orgSid, dateRange: $dateRange, filter: $filter) {
      workOrderId
      timestamp
      planSponsorId
      detailsPath
      subClientPath
      inboundFilename
      vendorId
      step
      stepStatus
      packetStatus
      reprocessedBy
      reprocessAction
      populationCount
      recordHighlightCount
      recordHighlightType
      clientFileArchivePath
      vendorFileArchivePath
      supplementalFilesArchivePaths
      archiveOnly
      hasErrors
    }
  }
`;

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
 *      dateRange: // value for 'dateRange'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useWorkPacketStatusesQuery(
  baseOptions: Apollo.QueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>
) {
  return Apollo.useQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(
    WorkPacketStatusesDocument,
    baseOptions
  );
}
export function useWorkPacketStatusesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>
) {
  return Apollo.useLazyQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(
    WorkPacketStatusesDocument,
    baseOptions
  );
}
export type WorkPacketStatusesQueryHookResult = ReturnType<typeof useWorkPacketStatusesQuery>;
export type WorkPacketStatusesLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusesLazyQuery>;
export type WorkPacketStatusesQueryResult = Apollo.QueryResult<
  WorkPacketStatusesQuery,
  WorkPacketStatusesQueryVariables
>;
export const WorkPacketStatusDetailsDocument = gql`
  query WorkPacketStatusDetails($orgSid: ID!, $workOrderId: String!) {
    workPacketStatusDetails(orgSid: $orgSid, workOrderId: $workOrderId) {
      workOrderId
      specId
      specImplName
      fingerPrint
      suppressBilling
      workStepStatus {
        stepStatus
        stepName
        stepType
        populationCount {
          value
        }
        stepFile {
          value
          label
        }
        nvp {
          name
          value
        }
        recordCounts {
          ...recordCountsFragment
        }
      }
      deliveredFile {
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
    }
  }
  ${RecordCountsFragmentFragmentDoc}
  ${ExtractParameterFragmentFragmentDoc}
  ${FieldCreationFragmentFragmentDoc}
  ${EnrollmentStatFragmentFragmentDoc}
`;

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
export function useWorkPacketStatusDetailsQuery(
  baseOptions: Apollo.QueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>
) {
  return Apollo.useQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(
    WorkPacketStatusDetailsDocument,
    baseOptions
  );
}
export function useWorkPacketStatusDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>
) {
  return Apollo.useLazyQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(
    WorkPacketStatusDetailsDocument,
    baseOptions
  );
}
export type WorkPacketStatusDetailsQueryHookResult = ReturnType<typeof useWorkPacketStatusDetailsQuery>;
export type WorkPacketStatusDetailsLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusDetailsLazyQuery>;
export type WorkPacketStatusDetailsQueryResult = Apollo.QueryResult<
  WorkPacketStatusDetailsQuery,
  WorkPacketStatusDetailsQueryVariables
>;
export const WorkPacketStatusDocument = gql`
  query WorkPacketStatus($orgSid: ID!, $workOrderId: String!) {
    workPacketStatus(orgSid: $orgSid, workOrderId: $workOrderId) {
      workOrderId
      timestamp
      planSponsorId
      detailsPath
      subClientPath
      inboundFilename
      vendorId
      step
      stepStatus
      packetStatus
      reprocessedBy
      reprocessAction
      populationCount
      recordHighlightCount
      recordHighlightType
      clientFileArchivePath
      vendorFileArchivePath
      supplementalFilesArchivePaths
      archiveOnly
      hasErrors
    }
  }
`;

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
export function useWorkPacketStatusQuery(
  baseOptions: Apollo.QueryHookOptions<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>
) {
  return Apollo.useQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(WorkPacketStatusDocument, baseOptions);
}
export function useWorkPacketStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>
) {
  return Apollo.useLazyQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(
    WorkPacketStatusDocument,
    baseOptions
  );
}
export type WorkPacketStatusQueryHookResult = ReturnType<typeof useWorkPacketStatusQuery>;
export type WorkPacketStatusLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusLazyQuery>;
export type WorkPacketStatusQueryResult = Apollo.QueryResult<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>;
export const DashboardPeriodsDocument = gql`
  query DashboardPeriods($orgSid: ID!) {
    dashboardPeriods(orgSid: $orgSid) {
      dailyCounts {
        ...dashPeriodCountsFragment
      }
      yesterdayCounts {
        ...dashPeriodCountsFragment
      }
      monthlyCounts {
        ...dashPeriodCountsFragment
      }
      lastMonthlyCounts {
        ...dashPeriodCountsFragment
      }
    }
  }
  ${DashPeriodCountsFragmentFragmentDoc}
`;

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
export function useDashboardPeriodsQuery(
  baseOptions: Apollo.QueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>
) {
  return Apollo.useQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(DashboardPeriodsDocument, baseOptions);
}
export function useDashboardPeriodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>
) {
  return Apollo.useLazyQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(
    DashboardPeriodsDocument,
    baseOptions
  );
}
export type DashboardPeriodsQueryHookResult = ReturnType<typeof useDashboardPeriodsQuery>;
export type DashboardPeriodsLazyQueryHookResult = ReturnType<typeof useDashboardPeriodsLazyQuery>;
export type DashboardPeriodsQueryResult = Apollo.QueryResult<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>;
export const AccessPolicyPageDocument = gql`
  query AccessPolicyPage($orgSid: ID!) {
    accessPolicyPage(orgSid: $orgSid) {
      permissionServices {
        name
        value
      }
      predicates {
        name
        value
      }
      showTemplateSection
      templateServices {
        name
        value
      }
    }
  }
`;

/**
 * __useAccessPolicyPageQuery__
 *
 * To run a query within a React component, call `useAccessPolicyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccessPolicyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccessPolicyPageQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useAccessPolicyPageQuery(
  baseOptions: Apollo.QueryHookOptions<AccessPolicyPageQuery, AccessPolicyPageQueryVariables>
) {
  return Apollo.useQuery<AccessPolicyPageQuery, AccessPolicyPageQueryVariables>(AccessPolicyPageDocument, baseOptions);
}
export function useAccessPolicyPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyPageQuery, AccessPolicyPageQueryVariables>
) {
  return Apollo.useLazyQuery<AccessPolicyPageQuery, AccessPolicyPageQueryVariables>(
    AccessPolicyPageDocument,
    baseOptions
  );
}
export type AccessPolicyPageQueryHookResult = ReturnType<typeof useAccessPolicyPageQuery>;
export type AccessPolicyPageLazyQueryHookResult = ReturnType<typeof useAccessPolicyPageLazyQuery>;
export type AccessPolicyPageQueryResult = Apollo.QueryResult<AccessPolicyPageQuery, AccessPolicyPageQueryVariables>;
export const CreateOrgDocument = gql`
  mutation CreateOrg($orgInfo: CreateOrgInput!) {
    createOrg(orgInfo: $orgInfo) {
      id
      orgId
      orgType
    }
  }
`;
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
export function useCreateOrgMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>
) {
  return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, baseOptions);
}
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
export const CreateAccessPolicyDocument = gql`
  mutation CreateAccessPolicy($policyInfo: CreateAccessPolicyInput!) {
    createAccessPolicy(policyInfo: $policyInfo) {
      ...policyFragment
    }
  }
  ${PolicyFragmentFragmentDoc}
`;
export type CreateAccessPolicyMutationFn = Apollo.MutationFunction<
  CreateAccessPolicyMutation,
  CreateAccessPolicyMutationVariables
>;

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
 *      policyInfo: // value for 'policyInfo'
 *   },
 * });
 */
export function useCreateAccessPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>
) {
  return Apollo.useMutation<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>(
    CreateAccessPolicyDocument,
    baseOptions
  );
}
export type CreateAccessPolicyMutationHookResult = ReturnType<typeof useCreateAccessPolicyMutation>;
export type CreateAccessPolicyMutationResult = Apollo.MutationResult<CreateAccessPolicyMutation>;
export type CreateAccessPolicyMutationOptions = Apollo.BaseMutationOptions<
  CreateAccessPolicyMutation,
  CreateAccessPolicyMutationVariables
>;
export const CreateAccessPolicyGroupDocument = gql`
  mutation CreateAccessPolicyGroup($accessPolicyGroupInfo: CreateAccessPolicyGroupInput!) {
    createAccessPolicyGroup(accessPolicyGroupInfo: $accessPolicyGroupInfo) {
      id
      name
      description
      tmpl
      tmplUseAsIs
      policies {
        id
        name
      }
    }
  }
`;
export type CreateAccessPolicyGroupMutationFn = Apollo.MutationFunction<
  CreateAccessPolicyGroupMutation,
  CreateAccessPolicyGroupMutationVariables
>;

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
 *      accessPolicyGroupInfo: // value for 'accessPolicyGroupInfo'
 *   },
 * });
 */
export function useCreateAccessPolicyGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>
) {
  return Apollo.useMutation<CreateAccessPolicyGroupMutation, CreateAccessPolicyGroupMutationVariables>(
    CreateAccessPolicyGroupDocument,
    baseOptions
  );
}
export type CreateAccessPolicyGroupMutationHookResult = ReturnType<typeof useCreateAccessPolicyGroupMutation>;
export type CreateAccessPolicyGroupMutationResult = Apollo.MutationResult<CreateAccessPolicyGroupMutation>;
export type CreateAccessPolicyGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateAccessPolicyGroupMutation,
  CreateAccessPolicyGroupMutationVariables
>;
export const CreateAccessSpecializationDocument = gql`
  mutation CreateAccessSpecialization($specializationInfo: CreateAccessSpecializationInput!) {
    createAccessSpecialization(specializationInfo: $specializationInfo) {
      id
      name
      filters {
        permission
        organizationIds
      }
    }
  }
`;
export type CreateAccessSpecializationMutationFn = Apollo.MutationFunction<
  CreateAccessSpecializationMutation,
  CreateAccessSpecializationMutationVariables
>;

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
 *      specializationInfo: // value for 'specializationInfo'
 *   },
 * });
 */
export function useCreateAccessSpecializationMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateAccessSpecializationMutation,
    CreateAccessSpecializationMutationVariables
  >
) {
  return Apollo.useMutation<CreateAccessSpecializationMutation, CreateAccessSpecializationMutationVariables>(
    CreateAccessSpecializationDocument,
    baseOptions
  );
}
export type CreateAccessSpecializationMutationHookResult = ReturnType<typeof useCreateAccessSpecializationMutation>;
export type CreateAccessSpecializationMutationResult = Apollo.MutationResult<CreateAccessSpecializationMutation>;
export type CreateAccessSpecializationMutationOptions = Apollo.BaseMutationOptions<
  CreateAccessSpecializationMutation,
  CreateAccessSpecializationMutationVariables
>;
export const SystemTemplateAccessPolicyGroupByNameDocument = gql`
  query SystemTemplateAccessPolicyGroupByName($name: String!) {
    systemTemplateAccessPolicyGroupByName(name: $name) {
      id
      name
      description
      tmpl
      tmplUseAsIs
    }
  }
`;

/**
 * __useSystemTemplateAccessPolicyGroupByNameQuery__
 *
 * To run a query within a React component, call `useSystemTemplateAccessPolicyGroupByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemTemplateAccessPolicyGroupByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemTemplateAccessPolicyGroupByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSystemTemplateAccessPolicyGroupByNameQuery(
  baseOptions: Apollo.QueryHookOptions<
    SystemTemplateAccessPolicyGroupByNameQuery,
    SystemTemplateAccessPolicyGroupByNameQueryVariables
  >
) {
  return Apollo.useQuery<
    SystemTemplateAccessPolicyGroupByNameQuery,
    SystemTemplateAccessPolicyGroupByNameQueryVariables
  >(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
}
export function useSystemTemplateAccessPolicyGroupByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    SystemTemplateAccessPolicyGroupByNameQuery,
    SystemTemplateAccessPolicyGroupByNameQueryVariables
  >
) {
  return Apollo.useLazyQuery<
    SystemTemplateAccessPolicyGroupByNameQuery,
    SystemTemplateAccessPolicyGroupByNameQueryVariables
  >(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
}
export type SystemTemplateAccessPolicyGroupByNameQueryHookResult = ReturnType<
  typeof useSystemTemplateAccessPolicyGroupByNameQuery
>;
export type SystemTemplateAccessPolicyGroupByNameLazyQueryHookResult = ReturnType<
  typeof useSystemTemplateAccessPolicyGroupByNameLazyQuery
>;
export type SystemTemplateAccessPolicyGroupByNameQueryResult = Apollo.QueryResult<
  SystemTemplateAccessPolicyGroupByNameQuery,
  SystemTemplateAccessPolicyGroupByNameQueryVariables
>;
export const CreateUserDocument = gql`
  mutation CreateUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
    createUser(userInfo: $userInfo, personInfo: $personInfo) {
      response
      msg
      model {
        id
        email
        person {
          firstNm
          lastNm
        }
      }
      nextPage
    }
  }
`;
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
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
  mutation UpdateUser($userInfo: UpdateUserInput!) {
    updateUser(userInfo: $userInfo) {
      id
      email
      person {
        firstNm
        lastNm
      }
    }
  }
`;
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
export function useUpdateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>
) {
  return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
}
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const UpdateUserAccessPolicyGroupsDocument = gql`
  mutation UpdateUserAccessPolicyGroups($userAccessPolicyGroupUpdate: UpdateUserAccessPolicyGroupsInput!) {
    updateUserAccessPolicyGroups(userAccessPolicyGroupUpdate: $userAccessPolicyGroupUpdate) {
      id
      name
    }
  }
`;
export type UpdateUserAccessPolicyGroupsMutationFn = Apollo.MutationFunction<
  UpdateUserAccessPolicyGroupsMutation,
  UpdateUserAccessPolicyGroupsMutationVariables
>;

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
export function useUpdateUserAccessPolicyGroupsMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateUserAccessPolicyGroupsMutation,
    UpdateUserAccessPolicyGroupsMutationVariables
  >
) {
  return Apollo.useMutation<UpdateUserAccessPolicyGroupsMutation, UpdateUserAccessPolicyGroupsMutationVariables>(
    UpdateUserAccessPolicyGroupsDocument,
    baseOptions
  );
}
export type UpdateUserAccessPolicyGroupsMutationHookResult = ReturnType<typeof useUpdateUserAccessPolicyGroupsMutation>;
export type UpdateUserAccessPolicyGroupsMutationResult = Apollo.MutationResult<UpdateUserAccessPolicyGroupsMutation>;
export type UpdateUserAccessPolicyGroupsMutationOptions = Apollo.BaseMutationOptions<
  UpdateUserAccessPolicyGroupsMutation,
  UpdateUserAccessPolicyGroupsMutationVariables
>;
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
export function useDeactivateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<DeactivateUserMutation, DeactivateUserMutationVariables>
) {
  return Apollo.useMutation<DeactivateUserMutation, DeactivateUserMutationVariables>(
    DeactivateUserDocument,
    baseOptions
  );
}
export type DeactivateUserMutationHookResult = ReturnType<typeof useDeactivateUserMutation>;
export type DeactivateUserMutationResult = Apollo.MutationResult<DeactivateUserMutation>;
export type DeactivateUserMutationOptions = Apollo.BaseMutationOptions<
  DeactivateUserMutation,
  DeactivateUserMutationVariables
>;
export const DeactivateUsersDocument = gql`
  mutation DeactivateUsers($sidsInput: SidsInput!) {
    deactivateUsers(sidsInput: $sidsInput)
  }
`;
export type DeactivateUsersMutationFn = Apollo.MutationFunction<
  DeactivateUsersMutation,
  DeactivateUsersMutationVariables
>;

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
export function useDeactivateUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<DeactivateUsersMutation, DeactivateUsersMutationVariables>
) {
  return Apollo.useMutation<DeactivateUsersMutation, DeactivateUsersMutationVariables>(
    DeactivateUsersDocument,
    baseOptions
  );
}
export type DeactivateUsersMutationHookResult = ReturnType<typeof useDeactivateUsersMutation>;
export type DeactivateUsersMutationResult = Apollo.MutationResult<DeactivateUsersMutation>;
export type DeactivateUsersMutationOptions = Apollo.BaseMutationOptions<
  DeactivateUsersMutation,
  DeactivateUsersMutationVariables
>;
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
export function useActivateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateUserMutation, ActivateUserMutationVariables>
) {
  return Apollo.useMutation<ActivateUserMutation, ActivateUserMutationVariables>(ActivateUserDocument, baseOptions);
}
export type ActivateUserMutationHookResult = ReturnType<typeof useActivateUserMutation>;
export type ActivateUserMutationResult = Apollo.MutationResult<ActivateUserMutation>;
export type ActivateUserMutationOptions = Apollo.BaseMutationOptions<
  ActivateUserMutation,
  ActivateUserMutationVariables
>;
export const ActivateUsersDocument = gql`
  mutation activateUsers($sidsInput: SidsInput!) {
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
export function useActivateUsersMutation(
  baseOptions?: Apollo.MutationHookOptions<ActivateUsersMutation, ActivateUsersMutationVariables>
) {
  return Apollo.useMutation<ActivateUsersMutation, ActivateUsersMutationVariables>(ActivateUsersDocument, baseOptions);
}
export type ActivateUsersMutationHookResult = ReturnType<typeof useActivateUsersMutation>;
export type ActivateUsersMutationResult = Apollo.MutationResult<ActivateUsersMutation>;
export type ActivateUsersMutationOptions = Apollo.BaseMutationOptions<
  ActivateUsersMutation,
  ActivateUsersMutationVariables
>;
export const AccessPoliciesForOrgDocument = gql`
  query AccessPoliciesForOrg($orgSid: ID!, $pageableInput: PageableInput) {
    accessPoliciesForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
        tmpl
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useAccessPoliciesForOrgQuery(
  baseOptions: Apollo.QueryHookOptions<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>
) {
  return Apollo.useQuery<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>(
    AccessPoliciesForOrgDocument,
    baseOptions
  );
}
export function useAccessPoliciesForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>
) {
  return Apollo.useLazyQuery<AccessPoliciesForOrgQuery, AccessPoliciesForOrgQueryVariables>(
    AccessPoliciesForOrgDocument,
    baseOptions
  );
}
export type AccessPoliciesForOrgQueryHookResult = ReturnType<typeof useAccessPoliciesForOrgQuery>;
export type AccessPoliciesForOrgLazyQueryHookResult = ReturnType<typeof useAccessPoliciesForOrgLazyQuery>;
export type AccessPoliciesForOrgQueryResult = Apollo.QueryResult<
  AccessPoliciesForOrgQuery,
  AccessPoliciesForOrgQueryVariables
>;
export const AccessSpecializationsForOrgDocument = gql`
  query AccessSpecializationsForOrg($orgSid: ID!, $pageableInput: PageableInput) {
    accessSpecializationsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useAccessSpecializationsForOrgQuery(
  baseOptions: Apollo.QueryHookOptions<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>
) {
  return Apollo.useQuery<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>(
    AccessSpecializationsForOrgDocument,
    baseOptions
  );
}
export function useAccessSpecializationsForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>
) {
  return Apollo.useLazyQuery<AccessSpecializationsForOrgQuery, AccessSpecializationsForOrgQueryVariables>(
    AccessSpecializationsForOrgDocument,
    baseOptions
  );
}
export type AccessSpecializationsForOrgQueryHookResult = ReturnType<typeof useAccessSpecializationsForOrgQuery>;
export type AccessSpecializationsForOrgLazyQueryHookResult = ReturnType<typeof useAccessSpecializationsForOrgLazyQuery>;
export type AccessSpecializationsForOrgQueryResult = Apollo.QueryResult<
  AccessSpecializationsForOrgQuery,
  AccessSpecializationsForOrgQueryVariables
>;
export const AccessPolicyGroupsForOrgDocument = gql`
  query AccessPolicyGroupsForOrg($orgSid: ID!, $pageableInput: PageableInput) {
    accessPolicyGroupsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
        tmpl
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useAccessPolicyGroupsForOrgQuery(
  baseOptions: Apollo.QueryHookOptions<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>
) {
  return Apollo.useQuery<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>(
    AccessPolicyGroupsForOrgDocument,
    baseOptions
  );
}
export function useAccessPolicyGroupsForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>
) {
  return Apollo.useLazyQuery<AccessPolicyGroupsForOrgQuery, AccessPolicyGroupsForOrgQueryVariables>(
    AccessPolicyGroupsForOrgDocument,
    baseOptions
  );
}
export type AccessPolicyGroupsForOrgQueryHookResult = ReturnType<typeof useAccessPolicyGroupsForOrgQuery>;
export type AccessPolicyGroupsForOrgLazyQueryHookResult = ReturnType<typeof useAccessPolicyGroupsForOrgLazyQuery>;
export type AccessPolicyGroupsForOrgQueryResult = Apollo.QueryResult<
  AccessPolicyGroupsForOrgQuery,
  AccessPolicyGroupsForOrgQueryVariables
>;
export const TopLevelOrgsByTypeDocument = gql`
  query TopLevelOrgsByType($orgType: OrgType!) {
    topLevelOrgsByType(orgType: $orgType) {
      id
      orgId
      orgType
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
export function useTopLevelOrgsByTypeQuery(
  baseOptions: Apollo.QueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>
) {
  return Apollo.useQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(
    TopLevelOrgsByTypeDocument,
    baseOptions
  );
}
export function useTopLevelOrgsByTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>
) {
  return Apollo.useLazyQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(
    TopLevelOrgsByTypeDocument,
    baseOptions
  );
}
export type TopLevelOrgsByTypeQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeQuery>;
export type TopLevelOrgsByTypeLazyQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeLazyQuery>;
export type TopLevelOrgsByTypeQueryResult = Apollo.QueryResult<
  TopLevelOrgsByTypeQuery,
  TopLevelOrgsByTypeQueryVariables
>;
export const UsersForOrgFpDocument = gql`
  query UsersForOrgFP($orgSid: ID!, $userFilter: UserFilterInput, $pageableInput: PageableInput) {
    usersForOrg(orgSid: $orgSid, userFilter: $userFilter, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      listPageInfo {
        pageHeaderLabel
        pageCommands {
          ...webCommandFragment
        }
        listItemCommands {
          ...webCommandFragment
        }
        listItemBulkCommands {
          ...webCommandFragment
        }
      }
      nodes {
        item {
          id
          email
          person {
            firstNm
            lastNm
          }
        }
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
  ${WebCommandFragmentFragmentDoc}
`;

/**
 * __useUsersForOrgFpQuery__
 *
 * To run a query within a React component, call `useUsersForOrgFpQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersForOrgFpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersForOrgFpQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      userFilter: // value for 'userFilter'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useUsersForOrgFpQuery(
  baseOptions: Apollo.QueryHookOptions<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>
) {
  return Apollo.useQuery<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>(UsersForOrgFpDocument, baseOptions);
}
export function useUsersForOrgFpLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>
) {
  return Apollo.useLazyQuery<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>(UsersForOrgFpDocument, baseOptions);
}
export type UsersForOrgFpQueryHookResult = ReturnType<typeof useUsersForOrgFpQuery>;
export type UsersForOrgFpLazyQueryHookResult = ReturnType<typeof useUsersForOrgFpLazyQuery>;
export type UsersForOrgFpQueryResult = Apollo.QueryResult<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>;
export const DirectOrganizationsDocument = gql`
  query DirectOrganizations($orgSid: ID!) {
    directOrganizations(orgSid: $orgSid) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
        orgId
        orgType
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
 *   },
 * });
 */
export function useDirectOrganizationsQuery(
  baseOptions: Apollo.QueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>
) {
  return Apollo.useQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(
    DirectOrganizationsDocument,
    baseOptions
  );
}
export function useDirectOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>
) {
  return Apollo.useLazyQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(
    DirectOrganizationsDocument,
    baseOptions
  );
}
export type DirectOrganizationsQueryHookResult = ReturnType<typeof useDirectOrganizationsQuery>;
export type DirectOrganizationsLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsLazyQuery>;
export type DirectOrganizationsQueryResult = Apollo.QueryResult<
  DirectOrganizationsQuery,
  DirectOrganizationsQueryVariables
>;
export const DirectOrganizationsFDocument = gql`
  query DirectOrganizationsF($orgSid: ID!, $orgFilter: OrgFilterInput) {
    directOrganizations(orgSid: $orgSid, orgFilter: $orgFilter) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
        orgId
        orgType
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

/**
 * __useDirectOrganizationsFQuery__
 *
 * To run a query within a React component, call `useDirectOrganizationsFQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectOrganizationsFQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectOrganizationsFQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      orgFilter: // value for 'orgFilter'
 *   },
 * });
 */
export function useDirectOrganizationsFQuery(
  baseOptions: Apollo.QueryHookOptions<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>
) {
  return Apollo.useQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(
    DirectOrganizationsFDocument,
    baseOptions
  );
}
export function useDirectOrganizationsFLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>
) {
  return Apollo.useLazyQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(
    DirectOrganizationsFDocument,
    baseOptions
  );
}
export type DirectOrganizationsFQueryHookResult = ReturnType<typeof useDirectOrganizationsFQuery>;
export type DirectOrganizationsFLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsFLazyQuery>;
export type DirectOrganizationsFQueryResult = Apollo.QueryResult<
  DirectOrganizationsFQuery,
  DirectOrganizationsFQueryVariables
>;
export const DirectOrganizationsFpDocument = gql`
  query DirectOrganizationsFP($orgSid: ID!, $orgFilter: OrgFilterInput, $pageableInput: PageableInput) {
    directOrganizations(orgSid: $orgSid, orgFilter: $orgFilter, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        name
        orgId
        orgType
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

/**
 * __useDirectOrganizationsFpQuery__
 *
 * To run a query within a React component, call `useDirectOrganizationsFpQuery` and pass it any options that fit your needs.
 * When your component renders, `useDirectOrganizationsFpQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useDirectOrganizationsFpQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      orgFilter: // value for 'orgFilter'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useDirectOrganizationsFpQuery(
  baseOptions: Apollo.QueryHookOptions<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>
) {
  return Apollo.useQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(
    DirectOrganizationsFpDocument,
    baseOptions
  );
}
export function useDirectOrganizationsFpLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>
) {
  return Apollo.useLazyQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(
    DirectOrganizationsFpDocument,
    baseOptions
  );
}
export type DirectOrganizationsFpQueryHookResult = ReturnType<typeof useDirectOrganizationsFpQuery>;
export type DirectOrganizationsFpLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsFpLazyQuery>;
export type DirectOrganizationsFpQueryResult = Apollo.QueryResult<
  DirectOrganizationsFpQuery,
  DirectOrganizationsFpQueryVariables
>;
export const WpProcessErrorsDocument = gql`
  query WPProcessErrors($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
    wpProcessErrors(orgSid: $orgSid, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        workOrderId
        startTime
        stepName
        planSponsorId
        vendorId
        msg
        inboundFilename
        clientFileArchivePath
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useWpProcessErrorsQuery(
  baseOptions: Apollo.QueryHookOptions<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>
) {
  return Apollo.useQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, baseOptions);
}
export function useWpProcessErrorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>
) {
  return Apollo.useLazyQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, baseOptions);
}
export type WpProcessErrorsQueryHookResult = ReturnType<typeof useWpProcessErrorsQuery>;
export type WpProcessErrorsLazyQueryHookResult = ReturnType<typeof useWpProcessErrorsLazyQuery>;
export type WpProcessErrorsQueryResult = Apollo.QueryResult<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>;
export const WpTransmissionsDocument = gql`
  query WPTransmissions($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
    wpTransmissions(orgSid: $orgSid, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        workOrderId
        deliveredOn
        planSponsorId
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
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useWpTransmissionsQuery(
  baseOptions: Apollo.QueryHookOptions<WpTransmissionsQuery, WpTransmissionsQueryVariables>
) {
  return Apollo.useQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, baseOptions);
}
export function useWpTransmissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WpTransmissionsQuery, WpTransmissionsQueryVariables>
) {
  return Apollo.useLazyQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, baseOptions);
}
export type WpTransmissionsQueryHookResult = ReturnType<typeof useWpTransmissionsQuery>;
export type WpTransmissionsLazyQueryHookResult = ReturnType<typeof useWpTransmissionsLazyQuery>;
export type WpTransmissionsQueryResult = Apollo.QueryResult<WpTransmissionsQuery, WpTransmissionsQueryVariables>;
export const AccessPolicyDocument = gql`
  query AccessPolicy($orgSid: ID!, $policySid: ID!) {
    accessPolicy(orgSid: $orgSid, policySid: $policySid) {
      id
      name
      permissions
      tmpl
      tmplUseAsIs
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
export function useAccessPolicyQuery(
  baseOptions: Apollo.QueryHookOptions<AccessPolicyQuery, AccessPolicyQueryVariables>
) {
  return Apollo.useQuery<AccessPolicyQuery, AccessPolicyQueryVariables>(AccessPolicyDocument, baseOptions);
}
export function useAccessPolicyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AccessPolicyQuery, AccessPolicyQueryVariables>
) {
  return Apollo.useLazyQuery<AccessPolicyQuery, AccessPolicyQueryVariables>(AccessPolicyDocument, baseOptions);
}
export type AccessPolicyQueryHookResult = ReturnType<typeof useAccessPolicyQuery>;
export type AccessPolicyLazyQueryHookResult = ReturnType<typeof useAccessPolicyLazyQuery>;
export type AccessPolicyQueryResult = Apollo.QueryResult<AccessPolicyQuery, AccessPolicyQueryVariables>;
export const ScheduleOccurrencesDocument = gql`
  query ScheduleOccurrences($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
    scheduleOccurrences(orgSid: $orgSid, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        resource
        scheduleId
        timeScheduled
        schedOccurStatus
        runOccurrences {
          workOrderId
          timeRan
          status
        }
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useScheduleOccurrencesQuery(
  baseOptions: Apollo.QueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>
) {
  return Apollo.useQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(
    ScheduleOccurrencesDocument,
    baseOptions
  );
}
export function useScheduleOccurrencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>
) {
  return Apollo.useLazyQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(
    ScheduleOccurrencesDocument,
    baseOptions
  );
}
export type ScheduleOccurrencesQueryHookResult = ReturnType<typeof useScheduleOccurrencesQuery>;
export type ScheduleOccurrencesLazyQueryHookResult = ReturnType<typeof useScheduleOccurrencesLazyQuery>;
export type ScheduleOccurrencesQueryResult = Apollo.QueryResult<
  ScheduleOccurrencesQuery,
  ScheduleOccurrencesQueryVariables
>;
export const UpdateOwnPasswordDocument = gql`
  mutation UpdateOwnPassword($updatePasswordInput: UpdatePasswordInput!) {
    updateOwnPassword(updatePasswordInput: $updatePasswordInput) {
      id
      orgId
      userId
    }
  }
`;
export type UpdateOwnPasswordMutationFn = Apollo.MutationFunction<
  UpdateOwnPasswordMutation,
  UpdateOwnPasswordMutationVariables
>;

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
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdateOwnPasswordMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>
) {
  return Apollo.useMutation<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>(
    UpdateOwnPasswordDocument,
    baseOptions
  );
}
export type UpdateOwnPasswordMutationHookResult = ReturnType<typeof useUpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationResult = Apollo.MutationResult<UpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationOptions = Apollo.BaseMutationOptions<
  UpdateOwnPasswordMutation,
  UpdateOwnPasswordMutationVariables
>;
export const OrgByIdDocument = gql`
  query OrgById($orgSid: ID!, $orgId: String!) {
    orgById(orgSid: $orgSid, orgId: $orgId) {
      id
      name
      orgId
      orgType
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
export const CurrentUserDocument = gql`
  query CurrentUser {
    currentUser {
      loggedIn
      domain {
        type
        selectedPage
        navItems {
          ...navItemFragment
          subNavItems {
            ...navItemFragment
          }
        }
      }
      tokenUser {
        token
        session {
          id
          orgId
          userId
          pollInterval
          defaultAuthorities
        }
      }
    }
  }
  ${NavItemFragmentFragmentDoc}
`;

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
export function useCurrentUserQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const RemoveAccessPolicyDocument = gql`
  mutation RemoveAccessPolicy($policySid: ID!) {
    removeAccessPolicy(policySid: $policySid)
  }
`;
export type RemoveAccessPolicyMutationFn = Apollo.MutationFunction<
  RemoveAccessPolicyMutation,
  RemoveAccessPolicyMutationVariables
>;

/**
 * __useRemoveAccessPolicyMutation__
 *
 * To run a mutation, you first call `useRemoveAccessPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccessPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccessPolicyMutation, { data, loading, error }] = useRemoveAccessPolicyMutation({
 *   variables: {
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useRemoveAccessPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAccessPolicyMutation, RemoveAccessPolicyMutationVariables>
) {
  return Apollo.useMutation<RemoveAccessPolicyMutation, RemoveAccessPolicyMutationVariables>(
    RemoveAccessPolicyDocument,
    baseOptions
  );
}
export type RemoveAccessPolicyMutationHookResult = ReturnType<typeof useRemoveAccessPolicyMutation>;
export type RemoveAccessPolicyMutationResult = Apollo.MutationResult<RemoveAccessPolicyMutation>;
export type RemoveAccessPolicyMutationOptions = Apollo.BaseMutationOptions<
  RemoveAccessPolicyMutation,
  RemoveAccessPolicyMutationVariables
>;
export const RemoveAccessPoliciesDocument = gql`
  mutation RemoveAccessPolicies($deleteAccessPoliciesInput: DeleteAccessPoliciesInput!) {
    removeAccessPolicies(deleteAccessPoliciesInput: $deleteAccessPoliciesInput)
  }
`;
export type RemoveAccessPoliciesMutationFn = Apollo.MutationFunction<
  RemoveAccessPoliciesMutation,
  RemoveAccessPoliciesMutationVariables
>;

/**
 * __useRemoveAccessPoliciesMutation__
 *
 * To run a mutation, you first call `useRemoveAccessPoliciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAccessPoliciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAccessPoliciesMutation, { data, loading, error }] = useRemoveAccessPoliciesMutation({
 *   variables: {
 *      deleteAccessPoliciesInput: // value for 'deleteAccessPoliciesInput'
 *   },
 * });
 */
export function useRemoveAccessPoliciesMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAccessPoliciesMutation, RemoveAccessPoliciesMutationVariables>
) {
  return Apollo.useMutation<RemoveAccessPoliciesMutation, RemoveAccessPoliciesMutationVariables>(
    RemoveAccessPoliciesDocument,
    baseOptions
  );
}
export type RemoveAccessPoliciesMutationHookResult = ReturnType<typeof useRemoveAccessPoliciesMutation>;
export type RemoveAccessPoliciesMutationResult = Apollo.MutationResult<RemoveAccessPoliciesMutation>;
export type RemoveAccessPoliciesMutationOptions = Apollo.BaseMutationOptions<
  RemoveAccessPoliciesMutation,
  RemoveAccessPoliciesMutationVariables
>;
export const UpdateAccessPolicyDocument = gql`
  mutation UpdateAccessPolicy($updateAccessPolicyInput: UpdateAccessPolicyInput!) {
    updateAccessPolicy(updateAccessPolicyInput: $updateAccessPolicyInput) {
      id
      name
      tmpl
      tmplUseAsIs
      permissions
    }
  }
`;
export type UpdateAccessPolicyMutationFn = Apollo.MutationFunction<
  UpdateAccessPolicyMutation,
  UpdateAccessPolicyMutationVariables
>;

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
export function useUpdateAccessPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>
) {
  return Apollo.useMutation<UpdateAccessPolicyMutation, UpdateAccessPolicyMutationVariables>(
    UpdateAccessPolicyDocument,
    baseOptions
  );
}
export type UpdateAccessPolicyMutationHookResult = ReturnType<typeof useUpdateAccessPolicyMutation>;
export type UpdateAccessPolicyMutationResult = Apollo.MutationResult<UpdateAccessPolicyMutation>;
export type UpdateAccessPolicyMutationOptions = Apollo.BaseMutationOptions<
  UpdateAccessPolicyMutation,
  UpdateAccessPolicyMutationVariables
>;
export const LogOutDocument = gql`
  query LogOut {
    logOut {
      successful
    }
  }
`;

/**
 * __useLogOutQuery__
 *
 * To run a query within a React component, call `useLogOutQuery` and pass it any options that fit your needs.
 * When your component renders, `useLogOutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLogOutQuery({
 *   variables: {
 *   },
 * });
 */
export function useLogOutQuery(baseOptions?: Apollo.QueryHookOptions<LogOutQuery, LogOutQueryVariables>) {
  return Apollo.useQuery<LogOutQuery, LogOutQueryVariables>(LogOutDocument, baseOptions);
}
export function useLogOutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogOutQuery, LogOutQueryVariables>) {
  return Apollo.useLazyQuery<LogOutQuery, LogOutQueryVariables>(LogOutDocument, baseOptions);
}
export type LogOutQueryHookResult = ReturnType<typeof useLogOutQuery>;
export type LogOutLazyQueryHookResult = ReturnType<typeof useLogOutLazyQuery>;
export type LogOutQueryResult = Apollo.QueryResult<LogOutQuery, LogOutQueryVariables>;
export const UserThemeDocument = gql`
  query UserTheme($themeColorMode: ThemeColorMode) {
    userTheme(themeColorMode: $themeColorMode) {
      themeColorMode
      themeFontSize
      dashThemeColor {
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
export function useUserThemeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserThemeQuery, UserThemeQueryVariables>
) {
  return Apollo.useLazyQuery<UserThemeQuery, UserThemeQueryVariables>(UserThemeDocument, baseOptions);
}
export type UserThemeQueryHookResult = ReturnType<typeof useUserThemeQuery>;
export type UserThemeLazyQueryHookResult = ReturnType<typeof useUserThemeLazyQuery>;
export type UserThemeQueryResult = Apollo.QueryResult<UserThemeQuery, UserThemeQueryVariables>;
export const DashThemeColorForOrgDocument = gql`
  query DashThemeColorForOrg($ownedInput: OwnedInput, $pageableInput: PageableInput) {
    dashThemeColorForOrg(ownedInput: $ownedInput, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
      }
      nodes {
        id
        paletteNm
        defaultPalette
        allowDark
        themeColorMode
        themePrimary
        neutralPrimary
        white
      }
    }
  }
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useDashThemeColorForOrgQuery(
  baseOptions?: Apollo.QueryHookOptions<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>
) {
  return Apollo.useQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(
    DashThemeColorForOrgDocument,
    baseOptions
  );
}
export function useDashThemeColorForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>
) {
  return Apollo.useLazyQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(
    DashThemeColorForOrgDocument,
    baseOptions
  );
}
export type DashThemeColorForOrgQueryHookResult = ReturnType<typeof useDashThemeColorForOrgQuery>;
export type DashThemeColorForOrgLazyQueryHookResult = ReturnType<typeof useDashThemeColorForOrgLazyQuery>;
export type DashThemeColorForOrgQueryResult = Apollo.QueryResult<
  DashThemeColorForOrgQuery,
  DashThemeColorForOrgQueryVariables
>;
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
export function useDashSiteForOrgQuery(
  baseOptions?: Apollo.QueryHookOptions<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>
) {
  return Apollo.useQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, baseOptions);
}
export function useDashSiteForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>
) {
  return Apollo.useLazyQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, baseOptions);
}
export type DashSiteForOrgQueryHookResult = ReturnType<typeof useDashSiteForOrgQuery>;
export type DashSiteForOrgLazyQueryHookResult = ReturnType<typeof useDashSiteForOrgLazyQuery>;
export type DashSiteForOrgQueryResult = Apollo.QueryResult<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>;
export const CreateDashThemeColorDocument = gql`
  mutation CreateDashThemeColor($createDashThemeColorInput: CreateDashThemeColorInput!) {
    createDashThemeColor(createDashThemeColorInput: $createDashThemeColorInput) {
      id
      defaultPalette
      allowDark
      themeColorMode
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
export type CreateDashThemeColorMutationFn = Apollo.MutationFunction<
  CreateDashThemeColorMutation,
  CreateDashThemeColorMutationVariables
>;

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
export function useCreateDashThemeColorMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>
) {
  return Apollo.useMutation<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>(
    CreateDashThemeColorDocument,
    baseOptions
  );
}
export type CreateDashThemeColorMutationHookResult = ReturnType<typeof useCreateDashThemeColorMutation>;
export type CreateDashThemeColorMutationResult = Apollo.MutationResult<CreateDashThemeColorMutation>;
export type CreateDashThemeColorMutationOptions = Apollo.BaseMutationOptions<
  CreateDashThemeColorMutation,
  CreateDashThemeColorMutationVariables
>;
export const DashThemeColorByNameDocument = gql`
  query DashThemeColorByName($ownedInputName: OwnedInputName) {
    dashThemeColorByName(ownedInputName: $ownedInputName) {
      id
      defaultPalette
      allowDark
      themeColorMode
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
export function useDashThemeColorByNameQuery(
  baseOptions?: Apollo.QueryHookOptions<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>
) {
  return Apollo.useQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(
    DashThemeColorByNameDocument,
    baseOptions
  );
}
export function useDashThemeColorByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>
) {
  return Apollo.useLazyQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(
    DashThemeColorByNameDocument,
    baseOptions
  );
}
export type DashThemeColorByNameQueryHookResult = ReturnType<typeof useDashThemeColorByNameQuery>;
export type DashThemeColorByNameLazyQueryHookResult = ReturnType<typeof useDashThemeColorByNameLazyQuery>;
export type DashThemeColorByNameQueryResult = Apollo.QueryResult<
  DashThemeColorByNameQuery,
  DashThemeColorByNameQueryVariables
>;
export const UpdateDashThemeColorDocument = gql`
  mutation UpdateDashThemeColor($updateDashThemeColorInput: UpdateDashThemeColorInput!) {
    updateDashThemeColor(updateDashThemeColorInput: $updateDashThemeColorInput) {
      id
      defaultPalette
      allowDark
      themeColorMode
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
export type UpdateDashThemeColorMutationFn = Apollo.MutationFunction<
  UpdateDashThemeColorMutation,
  UpdateDashThemeColorMutationVariables
>;

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
export function useUpdateDashThemeColorMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>
) {
  return Apollo.useMutation<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>(
    UpdateDashThemeColorDocument,
    baseOptions
  );
}
export type UpdateDashThemeColorMutationHookResult = ReturnType<typeof useUpdateDashThemeColorMutation>;
export type UpdateDashThemeColorMutationResult = Apollo.MutationResult<UpdateDashThemeColorMutation>;
export type UpdateDashThemeColorMutationOptions = Apollo.BaseMutationOptions<
  UpdateDashThemeColorMutation,
  UpdateDashThemeColorMutationVariables
>;
export const CreateDefaultDashThemeDocument = gql`
  mutation CreateDefaultDashTheme($createDefaultDashThemeInput: CreateDefaultDashThemeInput!) {
    createDefaultDashTheme(createDefaultDashThemeInput: $createDefaultDashThemeInput) {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
      }
    }
  }
`;
export type CreateDefaultDashThemeMutationFn = Apollo.MutationFunction<
  CreateDefaultDashThemeMutation,
  CreateDefaultDashThemeMutationVariables
>;

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
export function useCreateDefaultDashThemeMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>
) {
  return Apollo.useMutation<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>(
    CreateDefaultDashThemeDocument,
    baseOptions
  );
}
export type CreateDefaultDashThemeMutationHookResult = ReturnType<typeof useCreateDefaultDashThemeMutation>;
export type CreateDefaultDashThemeMutationResult = Apollo.MutationResult<CreateDefaultDashThemeMutation>;
export type CreateDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<
  CreateDefaultDashThemeMutation,
  CreateDefaultDashThemeMutationVariables
>;
export const DefaultDashThemeForSiteDocument = gql`
  query DefaultDashThemeForSite($ownedInput: OwnedInput) {
    defaultDashThemeForSite(ownedInput: $ownedInput) {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
        paletteNm
        allowDark
        themePrimary
        neutralPrimary
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
export function useDefaultDashThemeForSiteQuery(
  baseOptions?: Apollo.QueryHookOptions<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>
) {
  return Apollo.useQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(
    DefaultDashThemeForSiteDocument,
    baseOptions
  );
}
export function useDefaultDashThemeForSiteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>
) {
  return Apollo.useLazyQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(
    DefaultDashThemeForSiteDocument,
    baseOptions
  );
}
export type DefaultDashThemeForSiteQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteQuery>;
export type DefaultDashThemeForSiteLazyQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteLazyQuery>;
export type DefaultDashThemeForSiteQueryResult = Apollo.QueryResult<
  DefaultDashThemeForSiteQuery,
  DefaultDashThemeForSiteQueryVariables
>;
export const CurrentOrgNavDocument = gql`
  query CurrentOrgNav($orgInput: OrgSidInput) {
    currentOrgNav(orgInput: $orgInput) {
      label
      subNavItems {
        ...navItemFragment
      }
    }
  }
  ${NavItemFragmentFragmentDoc}
`;

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
export function useCurrentOrgNavQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>
) {
  return Apollo.useQuery<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>(CurrentOrgNavDocument, baseOptions);
}
export function useCurrentOrgNavLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>
) {
  return Apollo.useLazyQuery<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>(CurrentOrgNavDocument, baseOptions);
}
export type CurrentOrgNavQueryHookResult = ReturnType<typeof useCurrentOrgNavQuery>;
export type CurrentOrgNavLazyQueryHookResult = ReturnType<typeof useCurrentOrgNavLazyQuery>;
export type CurrentOrgNavQueryResult = Apollo.QueryResult<CurrentOrgNavQuery, CurrentOrgNavQueryVariables>;
export const UpdateDefaultDashThemeDocument = gql`
  mutation UpdateDefaultDashTheme($updateDefaultDashThemeInput: UpdateDefaultDashThemeInput!) {
    updateDefaultDashTheme(updateDefaultDashThemeInput: $updateDefaultDashThemeInput) {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
      }
    }
  }
`;
export type UpdateDefaultDashThemeMutationFn = Apollo.MutationFunction<
  UpdateDefaultDashThemeMutation,
  UpdateDefaultDashThemeMutationVariables
>;

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
export function useUpdateDefaultDashThemeMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>
) {
  return Apollo.useMutation<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>(
    UpdateDefaultDashThemeDocument,
    baseOptions
  );
}
export type UpdateDefaultDashThemeMutationHookResult = ReturnType<typeof useUpdateDefaultDashThemeMutation>;
export type UpdateDefaultDashThemeMutationResult = Apollo.MutationResult<UpdateDefaultDashThemeMutation>;
export type UpdateDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<
  UpdateDefaultDashThemeMutation,
  UpdateDefaultDashThemeMutationVariables
>;
export const RemoveDashThemeColorDocument = gql`
  mutation RemoveDashThemeColor($ownedInputSid: OwnedInputSid!) {
    removeDashThemeColor(ownedInputSid: $ownedInputSid)
  }
`;
export type RemoveDashThemeColorMutationFn = Apollo.MutationFunction<
  RemoveDashThemeColorMutation,
  RemoveDashThemeColorMutationVariables
>;

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
export function useRemoveDashThemeColorMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>
) {
  return Apollo.useMutation<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>(
    RemoveDashThemeColorDocument,
    baseOptions
  );
}
export type RemoveDashThemeColorMutationHookResult = ReturnType<typeof useRemoveDashThemeColorMutation>;
export type RemoveDashThemeColorMutationResult = Apollo.MutationResult<RemoveDashThemeColorMutation>;
export type RemoveDashThemeColorMutationOptions = Apollo.BaseMutationOptions<
  RemoveDashThemeColorMutation,
  RemoveDashThemeColorMutationVariables
>;
export const RemoveDefaultDashThemeDocument = gql`
  mutation RemoveDefaultDashTheme($ownedInputSid: OwnedInputSid!) {
    removeDefaultDashTheme(ownedInputSid: $ownedInputSid)
  }
`;
export type RemoveDefaultDashThemeMutationFn = Apollo.MutationFunction<
  RemoveDefaultDashThemeMutation,
  RemoveDefaultDashThemeMutationVariables
>;

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
export function useRemoveDefaultDashThemeMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>
) {
  return Apollo.useMutation<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>(
    RemoveDefaultDashThemeDocument,
    baseOptions
  );
}
export type RemoveDefaultDashThemeMutationHookResult = ReturnType<typeof useRemoveDefaultDashThemeMutation>;
export type RemoveDefaultDashThemeMutationResult = Apollo.MutationResult<RemoveDefaultDashThemeMutation>;
export type RemoveDefaultDashThemeMutationOptions = Apollo.BaseMutationOptions<
  RemoveDefaultDashThemeMutation,
  RemoveDefaultDashThemeMutationVariables
>;
export const CurrentUserDashThemePageDocument = gql`
  query CurrentUserDashThemePage {
    currentUserDashThemePage {
      themeColorModes
      themeFontSizes
      themeColorPalettes {
        id
        paletteNm
        neutralPrimary
        allowDark
        themePrimary
        neutralPrimary
        white
      }
      dashTheme {
        id
        themeFontSize
        themeColorMode
        dashThemeColor {
          id
          paletteNm
          allowDark
          themePrimary
          neutralPrimary
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
export function useCurrentUserDashThemePageQuery(
  baseOptions?: Apollo.QueryHookOptions<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>
) {
  return Apollo.useQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(
    CurrentUserDashThemePageDocument,
    baseOptions
  );
}
export function useCurrentUserDashThemePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>
) {
  return Apollo.useLazyQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(
    CurrentUserDashThemePageDocument,
    baseOptions
  );
}
export type CurrentUserDashThemePageQueryHookResult = ReturnType<typeof useCurrentUserDashThemePageQuery>;
export type CurrentUserDashThemePageLazyQueryHookResult = ReturnType<typeof useCurrentUserDashThemePageLazyQuery>;
export type CurrentUserDashThemePageQueryResult = Apollo.QueryResult<
  CurrentUserDashThemePageQuery,
  CurrentUserDashThemePageQueryVariables
>;
export const FindUserByEmailDocument = gql`
  query FindUserByEmail($userEmail: String!) {
    findUserByEmail(userEmail: $userEmail) {
      id
      email
      person {
        id
        firstNm
        lastNm
      }
    }
  }
`;

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
export function useFindUserByEmailQuery(
  baseOptions: Apollo.QueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>
) {
  return Apollo.useQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, baseOptions);
}
export function useFindUserByEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>
) {
  return Apollo.useLazyQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, baseOptions);
}
export type FindUserByEmailQueryHookResult = ReturnType<typeof useFindUserByEmailQuery>;
export type FindUserByEmailLazyQueryHookResult = ReturnType<typeof useFindUserByEmailLazyQuery>;
export type FindUserByEmailQueryResult = Apollo.QueryResult<FindUserByEmailQuery, FindUserByEmailQueryVariables>;
export const FindUserDocument = gql`
  query FindUser($ownedInputSid: OwnedInputSid!) {
    findUser(ownedInputSid: $ownedInputSid) {
      id
      email
      person {
        id
        firstNm
        lastNm
      }
    }
  }
`;

/**
 * __useFindUserQuery__
 *
 * To run a query within a React component, call `useFindUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindUserQuery({
 *   variables: {
 *      ownedInputSid: // value for 'ownedInputSid'
 *   },
 * });
 */
export function useFindUserQuery(baseOptions: Apollo.QueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
  return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, baseOptions);
}
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
  return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, baseOptions);
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
export const SetOwnDashThemeFontSizeDocument = gql`
  mutation SetOwnDashThemeFontSize($dashThemeInput: DashThemeInput!) {
    setOwnDashThemeFontSize(dashThemeInput: $dashThemeInput) {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
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
export type SetOwnDashThemeFontSizeMutationFn = Apollo.MutationFunction<
  SetOwnDashThemeFontSizeMutation,
  SetOwnDashThemeFontSizeMutationVariables
>;

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
export function useSetOwnDashThemeFontSizeMutation(
  baseOptions?: Apollo.MutationHookOptions<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>
) {
  return Apollo.useMutation<SetOwnDashThemeFontSizeMutation, SetOwnDashThemeFontSizeMutationVariables>(
    SetOwnDashThemeFontSizeDocument,
    baseOptions
  );
}
export type SetOwnDashThemeFontSizeMutationHookResult = ReturnType<typeof useSetOwnDashThemeFontSizeMutation>;
export type SetOwnDashThemeFontSizeMutationResult = Apollo.MutationResult<SetOwnDashThemeFontSizeMutation>;
export type SetOwnDashThemeFontSizeMutationOptions = Apollo.BaseMutationOptions<
  SetOwnDashThemeFontSizeMutation,
  SetOwnDashThemeFontSizeMutationVariables
>;
export const CreateOrUpdateOwnDashThemeDocument = gql`
  mutation CreateOrUpdateOwnDashTheme($dashThemeInput: DashThemeInput!) {
    createOrUpdateOwnDashTheme(dashThemeInput: $dashThemeInput) {
      id
      themeColorMode
      themeFontSize
      dashThemeColor {
        id
        themePrimary
        neutralPrimary
        white
      }
    }
  }
`;
export type CreateOrUpdateOwnDashThemeMutationFn = Apollo.MutationFunction<
  CreateOrUpdateOwnDashThemeMutation,
  CreateOrUpdateOwnDashThemeMutationVariables
>;

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
export function useCreateOrUpdateOwnDashThemeMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateOrUpdateOwnDashThemeMutation,
    CreateOrUpdateOwnDashThemeMutationVariables
  >
) {
  return Apollo.useMutation<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>(
    CreateOrUpdateOwnDashThemeDocument,
    baseOptions
  );
}
export type CreateOrUpdateOwnDashThemeMutationHookResult = ReturnType<typeof useCreateOrUpdateOwnDashThemeMutation>;
export type CreateOrUpdateOwnDashThemeMutationResult = Apollo.MutationResult<CreateOrUpdateOwnDashThemeMutation>;
export type CreateOrUpdateOwnDashThemeMutationOptions = Apollo.BaseMutationOptions<
  CreateOrUpdateOwnDashThemeMutation,
  CreateOrUpdateOwnDashThemeMutationVariables
>;
export const SetDashThemeColorDefaultDocument = gql`
  mutation SetDashThemeColorDefault($dashThemeColorDefaultInput: DashThemeColorDefaultInput!) {
    setDashThemeColorDefault(dashThemeColorDefaultInput: $dashThemeColorDefaultInput) {
      id
      themePrimary
      neutralPrimary
      white
    }
  }
`;
export type SetDashThemeColorDefaultMutationFn = Apollo.MutationFunction<
  SetDashThemeColorDefaultMutation,
  SetDashThemeColorDefaultMutationVariables
>;

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
export function useSetDashThemeColorDefaultMutation(
  baseOptions?: Apollo.MutationHookOptions<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>
) {
  return Apollo.useMutation<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>(
    SetDashThemeColorDefaultDocument,
    baseOptions
  );
}
export type SetDashThemeColorDefaultMutationHookResult = ReturnType<typeof useSetDashThemeColorDefaultMutation>;
export type SetDashThemeColorDefaultMutationResult = Apollo.MutationResult<SetDashThemeColorDefaultMutation>;
export type SetDashThemeColorDefaultMutationOptions = Apollo.BaseMutationOptions<
  SetDashThemeColorDefaultMutation,
  SetDashThemeColorDefaultMutationVariables
>;
export const ChangeOwnPasswordPageDocument = gql`
  query ChangeOwnPasswordPage {
    changeOwnPasswordPage {
      ruleGroup {
        numberOfCharacteristics
        rules {
          ...unionPasswordRule
          ... on PasswordRuleGroup {
            numberOfCharacteristics
            rules {
              ...unionPasswordRule
              ... on PasswordRuleGroup {
                numberOfCharacteristics
                rules {
                  ...unionPasswordRule
                  ... on PasswordRuleGroup {
                    numberOfCharacteristics
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  ${UnionPasswordRuleFragmentDoc}
`;

/**
 * __useChangeOwnPasswordPageQuery__
 *
 * To run a query within a React component, call `useChangeOwnPasswordPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useChangeOwnPasswordPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useChangeOwnPasswordPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useChangeOwnPasswordPageQuery(
  baseOptions?: Apollo.QueryHookOptions<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>
) {
  return Apollo.useQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(
    ChangeOwnPasswordPageDocument,
    baseOptions
  );
}
export function useChangeOwnPasswordPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>
) {
  return Apollo.useLazyQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(
    ChangeOwnPasswordPageDocument,
    baseOptions
  );
}
export type ChangeOwnPasswordPageQueryHookResult = ReturnType<typeof useChangeOwnPasswordPageQuery>;
export type ChangeOwnPasswordPageLazyQueryHookResult = ReturnType<typeof useChangeOwnPasswordPageLazyQuery>;
export type ChangeOwnPasswordPageQueryResult = Apollo.QueryResult<
  ChangeOwnPasswordPageQuery,
  ChangeOwnPasswordPageQueryVariables
>;
export const ExchangeActivityInProcessDocument = gql`
  query ExchangeActivityInProcess(
    $orgSidInput: OrgSidInput!
    $dateRange: DateTimeRangeInput!
    $pageableInput: PageableInput!
  ) {
    exchangeActivityInProcess(orgSidInput: $orgSidInput, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        totalPages
        totalElements
        pageNumber
        pageSize
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
`;

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
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityInProcessQuery(
  baseOptions: Apollo.QueryHookOptions<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>
) {
  return Apollo.useQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(
    ExchangeActivityInProcessDocument,
    baseOptions
  );
}
export function useExchangeActivityInProcessLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>
) {
  return Apollo.useLazyQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(
    ExchangeActivityInProcessDocument,
    baseOptions
  );
}
export type ExchangeActivityInProcessQueryHookResult = ReturnType<typeof useExchangeActivityInProcessQuery>;
export type ExchangeActivityInProcessLazyQueryHookResult = ReturnType<typeof useExchangeActivityInProcessLazyQuery>;
export type ExchangeActivityInProcessQueryResult = Apollo.QueryResult<
  ExchangeActivityInProcessQuery,
  ExchangeActivityInProcessQueryVariables
>;
export const ExchangeActivityTransmittedDocument = gql`
  query ExchangeActivityTransmitted(
    $orgSidInput: OrgSidInput!
    $dateRange: DateTimeRangeInput!
    $pageableInput: PageableInput!
  ) {
    exchangeActivityTransmitted(orgSidInput: $orgSidInput, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        totalPages
        totalElements
        pageNumber
        pageSize
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
`;

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
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityTransmittedQuery(
  baseOptions: Apollo.QueryHookOptions<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>
) {
  return Apollo.useQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(
    ExchangeActivityTransmittedDocument,
    baseOptions
  );
}
export function useExchangeActivityTransmittedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>
) {
  return Apollo.useLazyQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(
    ExchangeActivityTransmittedDocument,
    baseOptions
  );
}
export type ExchangeActivityTransmittedQueryHookResult = ReturnType<typeof useExchangeActivityTransmittedQuery>;
export type ExchangeActivityTransmittedLazyQueryHookResult = ReturnType<typeof useExchangeActivityTransmittedLazyQuery>;
export type ExchangeActivityTransmittedQueryResult = Apollo.QueryResult<
  ExchangeActivityTransmittedQuery,
  ExchangeActivityTransmittedQueryVariables
>;
export const ExchangeActivityErroredDocument = gql`
  query ExchangeActivityErrored(
    $orgSidInput: OrgSidInput!
    $dateRange: DateTimeRangeInput!
    $pageableInput: PageableInput!
  ) {
    exchangeActivityErrored(orgSidInput: $orgSidInput, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        totalPages
        totalElements
        pageNumber
        pageSize
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
`;

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
 *      dateRange: // value for 'dateRange'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useExchangeActivityErroredQuery(
  baseOptions: Apollo.QueryHookOptions<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>
) {
  return Apollo.useQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(
    ExchangeActivityErroredDocument,
    baseOptions
  );
}
export function useExchangeActivityErroredLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>
) {
  return Apollo.useLazyQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(
    ExchangeActivityErroredDocument,
    baseOptions
  );
}
export type ExchangeActivityErroredQueryHookResult = ReturnType<typeof useExchangeActivityErroredQuery>;
export type ExchangeActivityErroredLazyQueryHookResult = ReturnType<typeof useExchangeActivityErroredLazyQuery>;
export type ExchangeActivityErroredQueryResult = Apollo.QueryResult<
  ExchangeActivityErroredQuery,
  ExchangeActivityErroredQueryVariables
>;
export const NavigateToNewDomainDocument = gql`
  query NavigateToNewDomain($domainNavInput: DomainNavInput!) {
    navigateToNewDomain(domainNavInput: $domainNavInput) {
      type
      selectedPage
      navItems {
        ...navItemFragment
        subNavItems {
          ...navItemFragment
        }
      }
    }
  }
  ${NavItemFragmentFragmentDoc}
`;

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
export function useNavigateToNewDomainQuery(
  baseOptions: Apollo.QueryHookOptions<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>
) {
  return Apollo.useQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(
    NavigateToNewDomainDocument,
    baseOptions
  );
}
export function useNavigateToNewDomainLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>
) {
  return Apollo.useLazyQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(
    NavigateToNewDomainDocument,
    baseOptions
  );
}
export type NavigateToNewDomainQueryHookResult = ReturnType<typeof useNavigateToNewDomainQuery>;
export type NavigateToNewDomainLazyQueryHookResult = ReturnType<typeof useNavigateToNewDomainLazyQuery>;
export type NavigateToNewDomainQueryResult = Apollo.QueryResult<
  NavigateToNewDomainQuery,
  NavigateToNewDomainQueryVariables
>;
export const UserCreatePageDocument = gql`
  query UserCreatePage($orgSidInput: OrgSidInput!) {
    userCreatePage(orgSidInput: $orgSidInput) {
      ...fragmentUserPageInfo
    }
  }
  ${FragmentUserPageInfoFragmentDoc}
`;

/**
 * __useUserCreatePageQuery__
 *
 * To run a query within a React component, call `useUserCreatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCreatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCreatePageQuery({
 *   variables: {
 *      orgSidInput: // value for 'orgSidInput'
 *   },
 * });
 */
export function useUserCreatePageQuery(
  baseOptions: Apollo.QueryHookOptions<UserCreatePageQuery, UserCreatePageQueryVariables>
) {
  return Apollo.useQuery<UserCreatePageQuery, UserCreatePageQueryVariables>(UserCreatePageDocument, baseOptions);
}
export function useUserCreatePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserCreatePageQuery, UserCreatePageQueryVariables>
) {
  return Apollo.useLazyQuery<UserCreatePageQuery, UserCreatePageQueryVariables>(UserCreatePageDocument, baseOptions);
}
export type UserCreatePageQueryHookResult = ReturnType<typeof useUserCreatePageQuery>;
export type UserCreatePageLazyQueryHookResult = ReturnType<typeof useUserCreatePageLazyQuery>;
export type UserCreatePageQueryResult = Apollo.QueryResult<UserCreatePageQuery, UserCreatePageQueryVariables>;
export const UserUpdatePageDocument = gql`
  query UserUpdatePage($sidInput: SidInput!) {
    userUpdatePage(sidInput: $sidInput) {
      ...fragmentUserPageInfo
    }
  }
  ${FragmentUserPageInfoFragmentDoc}
`;

/**
 * __useUserUpdatePageQuery__
 *
 * To run a query within a React component, call `useUserUpdatePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserUpdatePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserUpdatePageQuery({
 *   variables: {
 *      sidInput: // value for 'sidInput'
 *   },
 * });
 */
export function useUserUpdatePageQuery(
  baseOptions: Apollo.QueryHookOptions<UserUpdatePageQuery, UserUpdatePageQueryVariables>
) {
  return Apollo.useQuery<UserUpdatePageQuery, UserUpdatePageQueryVariables>(UserUpdatePageDocument, baseOptions);
}
export function useUserUpdatePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserUpdatePageQuery, UserUpdatePageQueryVariables>
) {
  return Apollo.useLazyQuery<UserUpdatePageQuery, UserUpdatePageQueryVariables>(UserUpdatePageDocument, baseOptions);
}
export type UserUpdatePageQueryHookResult = ReturnType<typeof useUserUpdatePageQuery>;
export type UserUpdatePageLazyQueryHookResult = ReturnType<typeof useUserUpdatePageLazyQuery>;
export type UserUpdatePageQueryResult = Apollo.QueryResult<UserUpdatePageQuery, UserUpdatePageQueryVariables>;
export const UserAssignAccessPolicyGroupsPageDocument = gql`
  query userAssignAccessPolicyGroupsPage($sidInput: SidInput!) {
    userUpdatePage(sidInput: $sidInput) {
      ...fragmentUserPageInfo
    }
  }
  ${FragmentUserPageInfoFragmentDoc}
`;

/**
 * __useUserAssignAccessPolicyGroupsPageQuery__
 *
 * To run a query within a React component, call `useUserAssignAccessPolicyGroupsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAssignAccessPolicyGroupsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAssignAccessPolicyGroupsPageQuery({
 *   variables: {
 *      sidInput: // value for 'sidInput'
 *   },
 * });
 */
export function useUserAssignAccessPolicyGroupsPageQuery(
  baseOptions: Apollo.QueryHookOptions<
    UserAssignAccessPolicyGroupsPageQuery,
    UserAssignAccessPolicyGroupsPageQueryVariables
  >
) {
  return Apollo.useQuery<UserAssignAccessPolicyGroupsPageQuery, UserAssignAccessPolicyGroupsPageQueryVariables>(
    UserAssignAccessPolicyGroupsPageDocument,
    baseOptions
  );
}
export function useUserAssignAccessPolicyGroupsPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserAssignAccessPolicyGroupsPageQuery,
    UserAssignAccessPolicyGroupsPageQueryVariables
  >
) {
  return Apollo.useLazyQuery<UserAssignAccessPolicyGroupsPageQuery, UserAssignAccessPolicyGroupsPageQueryVariables>(
    UserAssignAccessPolicyGroupsPageDocument,
    baseOptions
  );
}
export type UserAssignAccessPolicyGroupsPageQueryHookResult = ReturnType<
  typeof useUserAssignAccessPolicyGroupsPageQuery
>;
export type UserAssignAccessPolicyGroupsPageLazyQueryHookResult = ReturnType<
  typeof useUserAssignAccessPolicyGroupsPageLazyQuery
>;
export type UserAssignAccessPolicyGroupsPageQueryResult = Apollo.QueryResult<
  UserAssignAccessPolicyGroupsPageQuery,
  UserAssignAccessPolicyGroupsPageQueryVariables
>;
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
export function useSimulateSessionExpirQuery(
  baseOptions?: Apollo.QueryHookOptions<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>
) {
  return Apollo.useQuery<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>(
    SimulateSessionExpirDocument,
    baseOptions
  );
}
export function useSimulateSessionExpirLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>
) {
  return Apollo.useLazyQuery<SimulateSessionExpirQuery, SimulateSessionExpirQueryVariables>(
    SimulateSessionExpirDocument,
    baseOptions
  );
}
export type SimulateSessionExpirQueryHookResult = ReturnType<typeof useSimulateSessionExpirQuery>;
export type SimulateSessionExpirLazyQueryHookResult = ReturnType<typeof useSimulateSessionExpirLazyQuery>;
export type SimulateSessionExpirQueryResult = Apollo.QueryResult<
  SimulateSessionExpirQuery,
  SimulateSessionExpirQueryVariables
>;
