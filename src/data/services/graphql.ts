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
  sid?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
};

export type AccessPolicyConnection = {
  __typename?: 'AccessPolicyConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessPolicy>>>;
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
  options?: Maybe<Array<Maybe<UiOptions>>>;
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
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
  policies?: Maybe<Array<Maybe<AccessPolicy>>>;
};

export type AccessPolicyGroupConnection = {
  __typename?: 'AccessPolicyGroupConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
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
  options?: Maybe<Array<Maybe<UiOptions>>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type AccessSpecialization = {
  __typename?: 'AccessSpecialization';
  sid: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<Maybe<SpecializationFilter>>>;
};

export type AccessSpecializationConnection = {
  __typename?: 'AccessSpecializationConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AccessSpecialization>>>;
};

export type AccessSpecializationForm = {
  __typename?: 'AccessSpecializationForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  organization: UiReadOnlyField;
  filters?: Maybe<Array<Maybe<SpecializationFilterForm>>>;
  options?: Maybe<Array<Maybe<UiOptions>>>;
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
  Organization = 'ORGANIZATION'
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
  AccessManagement = 'ACCESS_MANAGEMENT'
}

export type CdxServiceNvp = {
  __typename?: 'CDXServiceNVP';
  name: Scalars['String'];
  value?: Maybe<CdxService>;
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
  Update = 'UPDATE'
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
  Theme = 'THEME'
}

export enum CdxWebPivot {
  Activity = 'ACTIVITY',
  InProgress = 'IN_PROGRESS'
}

export type CreateAccessPolicyGroupInput = {
  orgSid: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
  policySids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  specializationSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  includeAllSubOrgs?: Maybe<Scalars['Boolean']>;
  includeOrgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  excludeOrgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateAccessPolicyInput = {
  name: Scalars['String'];
  orgSid: Scalars['ID'];
  permissions?: Maybe<Array<Maybe<Permission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
};

export type CreateAccessSpecializationInput = {
  orgSid: Scalars['ID'];
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
  name: Scalars['String'];
  orgType: OrgType;
  orgOwnerSid?: Maybe<Scalars['ID']>;
};

export type CreatePersonInput = {
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type CreateSpecializationFilterInput = {
  permission: Permission;
  orgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
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
  accessPolicyGroupSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export enum Environment {
  K2U = 'K2U',
  Test = 'TEST',
  Uat = 'UAT',
  Prod = 'PROD'
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
  Fail = 'FAIL'
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
  Complete = 'COMPLETE'
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
  deactivateOrg?: Maybe<GqOperationResponse>;
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
  updateUserAccessPolicyGroups?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
  deactivateUser?: Maybe<GqOperationResponse>;
  deactivateUsers?: Maybe<GqOperationResponse>;
  activateUser?: Maybe<GqOperationResponse>;
  activateUsers?: Maybe<GqOperationResponse>;
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


export type MutationDeactivateOrgArgs = {
  orgSid: Scalars['ID'];
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
  NullsLast = 'NULLS_LAST'
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
  SalesProspect = 'SALES_PROSPECT'
}

export type Organization = {
  __typename?: 'Organization';
  sid?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orgId: Scalars['String'];
  orgType: OrgType;
};

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<Organization>>>;
};

export type OrganizationForm = {
  __typename?: 'OrganizationForm';
  sid?: Maybe<Scalars['ID']>;
  name: UiStringField;
  orgId: UiStringField;
  orgType?: Maybe<UiSelectOneField>;
  active: UiBooleanField;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  response: GqOperationResponse;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
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
  Special = 'SPECIAL'
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

export type PasswordRule = PasswordLengthRule | PasswordWhitespaceRule | PasswordCharacterRule | PasswordStrengthRule | PasswordRuleGroup;

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

export type PasswordRuleSet = {
  __typename?: 'PasswordRuleSet';
  mustNotContainWhiteSpace?: Maybe<Scalars['Boolean']>;
  mustNotContainUserName?: Maybe<Scalars['Boolean']>;
  mustNotContainNumericSequence?: Maybe<Scalars['Boolean']>;
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
  minUpperCaseLetters?: Maybe<Scalars['Int']>;
  minLowerCaseLetters?: Maybe<Scalars['Int']>;
  minNumericDigits?: Maybe<Scalars['Int']>;
  minSpecialCharacters?: Maybe<Scalars['Int']>;
  maxAllowedRepeatedChars?: Maybe<Scalars['Int']>;
  minPasswordHistoryVariations?: Maybe<Scalars['Int']>;
  mustNotMatchExactDictionaryWord?: Maybe<Scalars['Boolean']>;
  mustNotMatchPartialDictionaryWord?: Maybe<Scalars['Boolean']>;
};

export type PasswordRules = {
  __typename?: 'PasswordRules';
  mustAlwaysBeMet?: Maybe<PasswordRuleSet>;
  someMustBeMet?: Maybe<PasswordRuleSet>;
  autoLockAccount?: Maybe<Scalars['Boolean']>;
  autoLockAfterFailedAttempts?: Maybe<Scalars['Int']>;
  autoUnlockAccount?: Maybe<Scalars['Boolean']>;
  autoUnlockAccountDelayMinutes?: Maybe<Scalars['Int']>;
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
  K2UExchangeDownloadSteps = 'K2U_EXCHANGE_DOWNLOAD_STEPS',
  K2UExchangeRestart = 'K2U_EXCHANGE_RESTART',
  K2UExchangeCancel = 'K2U_EXCHANGE_CANCEL',
  K2UExchangeArchiveRead = 'K2U_EXCHANGE_ARCHIVE_READ',
  K2UExchangeArchiveStepsRead = 'K2U_EXCHANGE_ARCHIVE_STEPS_READ',
  TestExchangeList = 'TEST_EXCHANGE_LIST',
  TestExchangeRead = 'TEST_EXCHANGE_READ',
  TestExchangeDownload = 'TEST_EXCHANGE_DOWNLOAD',
  TestExchangeDownloadSteps = 'TEST_EXCHANGE_DOWNLOAD_STEPS',
  TestExchangeRestart = 'TEST_EXCHANGE_RESTART',
  TestExchangeCancel = 'TEST_EXCHANGE_CANCEL',
  TestExchangeArchiveRead = 'TEST_EXCHANGE_ARCHIVE_READ',
  TestExchangeArchiveStepsRead = 'TEST_EXCHANGE_ARCHIVE_STEPS_READ',
  UatExchangeList = 'UAT_EXCHANGE_LIST',
  UatExchangeRead = 'UAT_EXCHANGE_READ',
  UatExchangeDownload = 'UAT_EXCHANGE_DOWNLOAD',
  UatExchangeDownloadSteps = 'UAT_EXCHANGE_DOWNLOAD_STEPS',
  UatExchangeRestart = 'UAT_EXCHANGE_RESTART',
  UatExchangeCancel = 'UAT_EXCHANGE_CANCEL',
  UatExchangeArchiveRead = 'UAT_EXCHANGE_ARCHIVE_READ',
  UatExchangeArchiveStepsRead = 'UAT_EXCHANGE_ARCHIVE_STEPS_READ',
  ProdExchangeList = 'PROD_EXCHANGE_LIST',
  ProdExchangeRead = 'PROD_EXCHANGE_READ',
  ProdExchangeDownload = 'PROD_EXCHANGE_DOWNLOAD',
  ProdExchangeDownloadSteps = 'PROD_EXCHANGE_DOWNLOAD_STEPS',
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
  ThemeDelete = 'THEME_DELETE'
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
  sequenceCreationEvent?: Maybe<Array<Maybe<SequenceCreationEvent>>>;
};

export type Query = {
  __typename?: 'Query';
  version?: Maybe<Scalars['String']>;
  beginLogin?: Maybe<LoginStep>;
  logOut?: Maybe<LogOutInfo>;
  exchangeActivityInProcess?: Maybe<OrganizationLinkConnection>;
  exchangeActivityTransmitted?: Maybe<OrganizationLinkConnection>;
  exchangeActivityErrored?: Maybe<OrganizationLinkConnection>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  workPacketStatus?: Maybe<WorkPacketStatus>;
  workPacketStatuses?: Maybe<WorkPacketStatusConnection>;
  dashboardPeriods?: Maybe<DashboardPeriods>;
  usersForOrg?: Maybe<UserConnection>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  currentUser?: Maybe<CurrentUserInfo>;
  currentOrgNav?: Maybe<WebNav>;
  userTheme?: Maybe<DashTheme>;
  findUserByEmail?: Maybe<UserAccount>;
  userAccountForm?: Maybe<UserAccountForm>;
  findUserAccount?: Maybe<UserAccountForm>;
  accessPolicy?: Maybe<AccessPolicy>;
  accessPoliciesForOrg?: Maybe<AccessPolicyConnection>;
  accessSpecializationsForOrg?: Maybe<AccessSpecializationConnection>;
  accessPolicyGroupsForOrg?: Maybe<AccessPolicyGroupConnection>;
  systemTemplateAccessPolicyGroupByName?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
  accessPolicyForm?: Maybe<AccessPolicyForm>;
  findAccessPolicy?: Maybe<AccessPolicyForm>;
  accessSpecializationForm?: Maybe<AccessSpecializationForm>;
  findAccessSpecialization?: Maybe<AccessSpecializationForm>;
  accessPolicyGroupForm?: Maybe<AccessPolicyGroupForm>;
  findAccessPolicyGroup?: Maybe<AccessPolicyGroupForm>;
  /** currentOrgInfo(orgInput: OrgSidInput): [Organization] */
  topLevelOrgsByType?: Maybe<Array<Maybe<Organization>>>;
  orgById?: Maybe<Organization>;
  directOrganizations?: Maybe<OrganizationConnection>;
  wpProcessErrors?: Maybe<WpProcessErrorConnection>;
  wpTransmissions?: Maybe<WpTransmissionConnection>;
  scheduleOccurrences?: Maybe<ScheduleOccurrenceConnection>;
  organizationForm?: Maybe<OrganizationForm>;
  findOrganization?: Maybe<OrganizationForm>;
  searchOrganizations?: Maybe<OrganizationConnection>;
  organizationQuickSearch?: Maybe<Array<Maybe<Organization>>>;
  vendorQuickSearch?: Maybe<Array<Maybe<Organization>>>;
  dashThemeColorForOrg?: Maybe<DashThemeColorConnection>;
  dashSiteForOrg?: Maybe<DashSite>;
  dashThemeColor?: Maybe<DashThemeColor>;
  dashThemeColorByName?: Maybe<DashThemeColor>;
  defaultDashThemeForSite?: Maybe<DashTheme>;
  defaultDashThemeForSitePage?: Maybe<DefaultDashThemePage>;
  /** userDashThemePage(ownedInput : OwnedInput) : UserDashThemePage */
  currentUserDashThemePage?: Maybe<UserDashThemePage>;
  navigateToNewDomain?: Maybe<WebAppDomain>;
  simulateSessionExpir?: Maybe<LogOutInfo>;
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
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput: PageableInput;
};


export type QueryDashboardPeriodsArgs = {
  orgSid: Scalars['ID'];
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


export type QuerySystemTemplateAccessPolicyGroupByNameArgs = {
  name: Scalars['String'];
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


export type QueryFindOrganizationArgs = {
  orgSid: Scalars['ID'];
};


export type QuerySearchOrganizationsArgs = {
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
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

export enum RestartReason {
  Internal = 'INTERNAL',
  External = 'EXTERNAL'
}

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
  orgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type SpecializationFilterForm = {
  __typename?: 'SpecializationFilterForm';
  sid?: Maybe<Scalars['ID']>;
  permission: UiSelectOneField;
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

export type UiBooleanField = UiField & {
  __typename?: 'UIBooleanField';
  value?: Maybe<Scalars['Boolean']>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiDateField = UiField & {
  __typename?: 'UIDateField';
  value?: Maybe<Scalars['Date']>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiField = {
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
};

export type UiIntField = UiField & {
  __typename?: 'UIIntField';
  value?: Maybe<Scalars['Int']>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
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
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
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
};

export type UiOptions = {
  __typename?: 'UIOptions';
  key?: Maybe<Scalars['String']>;
  values?: Maybe<Array<Maybe<UiOption>>>;
};

export type UiReadOnlyField = UiField & {
  __typename?: 'UIReadOnlyField';
  value?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
};

export type UiSelectManyField = UiField & {
  __typename?: 'UISelectManyField';
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
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
  value?: Maybe<Scalars['String']>;
  label: Scalars['String'];
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
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
  info?: Maybe<Scalars['String']>;
  required: Scalars['Boolean'];
  visible: Scalars['Boolean'];
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
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
  policySids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  specializationSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  includeAllSubOrgs?: Maybe<Scalars['Boolean']>;
  includeOrgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
  excludeOrgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UpdateAccessPolicyInput = {
  policySid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  permissions?: Maybe<Array<Maybe<Permission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  applicableOrgTypes?: Maybe<Array<Maybe<OrgType>>>;
};

export type UpdateAccessSpecializationInput = {
  sid: Scalars['ID'];
  name: Scalars['String'];
  filters?: Maybe<Array<Maybe<UpdateSpecializationFilterInput>>>;
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

export type UpdateSpecializationFilterInput = {
  sid?: Maybe<Scalars['ID']>;
  permission: Permission;
  orgSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type UpdateUserAccessPolicyGroupsInput = {
  userAccountSid: Scalars['ID'];
  accessPolicyGroupSids?: Maybe<Array<Maybe<Scalars['ID']>>>;
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

export type UserAccount = {
  __typename?: 'UserAccount';
  sid: Scalars['ID'];
  email: Scalars['String'];
  person?: Maybe<Person>;
  accessPolicyGroups?: Maybe<Array<Maybe<AccessPolicyGroup>>>;
};

export type UserAccountForm = {
  __typename?: 'UserAccountForm';
  sid?: Maybe<Scalars['ID']>;
  email?: Maybe<UiStringField>;
  active?: Maybe<UiBooleanField>;
  person?: Maybe<PersonForm>;
  organization: UiReadOnlyField;
  accessPolicyGroups?: Maybe<UiSelectManyField>;
  response: GqOperationResponse;
  options?: Maybe<Array<Maybe<UiOptions>>>;
  errCode?: Maybe<Scalars['String']>;
  errMsg?: Maybe<Scalars['String']>;
  errSeverity?: Maybe<ErrorSeverity>;
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
  item: UserAccount;
  listItemCommands?: Maybe<Array<Maybe<WebCommand>>>;
};

export type UserResponse = {
  __typename?: 'UserResponse';
  response: GqOperationResponse;
  msg?: Maybe<Scalars['String']>;
  model?: Maybe<UserAccount>;
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
  RegLink = 'REG_LINK'
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
  None = 'NONE'
}

export type WorkPacketStatus = {
  __typename?: 'WorkPacketStatus';
  workOrderId: Scalars['String'];
  timestamp: Scalars['DateTime'];
  /** @deprecated Field no longer supported */
  planSponsorId?: Maybe<Scalars['String']>;
  orgId?: Maybe<Scalars['String']>;
  orgSid: Scalars['ID'];
  detailsPath?: Maybe<Scalars['String']>;
  /** @deprecated Field no longer supported */
  subClientPath?: Maybe<Scalars['String']>;
  inboundFilename: Scalars['String'];
  vendorId?: Maybe<Scalars['String']>;
  vendorSid: Scalars['ID'];
  step: WorkStep;
  stepStatus: WorkStatus;
  /** Make Enumeration @see OrigWorkPacketStatusConverter */
  packetStatus: WorkStatus;
  /** User email address */
  reprocessedBy?: Maybe<Scalars['String']>;
  restartReason?: Maybe<RestartReason>;
  recordHighlightCount?: Maybe<Scalars['Int']>;
  populationCount?: Maybe<Scalars['Int']>;
  recordHighlightType?: Maybe<ErrorSeverity>;
  /** The next three options only are returned when the user has the *_EXCHANGE_ARCHIVE_READ Permission */
  clientFileArchivePath?: Maybe<Scalars['String']>;
  vendorFileArchivePath?: Maybe<Scalars['String']>;
  feedType?: Maybe<Scalars['String']>;
  inboundDataType?: Maybe<Scalars['String']>;
  inboundDataSize?: Maybe<Scalars['Int']>;
  version?: Maybe<Scalars['String']>;
  supplementalFilesArchivePaths?: Maybe<Array<Maybe<Scalars['String']>>>;
  /** Indicates this file didn't get delivered anywhere. Is only archived and is accessible from the CDX Dashboard */
  archiveOnly?: Maybe<Scalars['Boolean']>;
  hasErrors?: Maybe<Scalars['Boolean']>;
  environment?: Maybe<Environment>;
};

export type WorkPacketStatusConnection = {
  __typename?: 'WorkPacketStatusConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<WorkPacketStatus>>>;
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
  stepStatus?: Maybe<Scalars['String']>;
  stepName?: Maybe<Scalars['String']>;
  stepType?: Maybe<Scalars['String']>;
  populationCount?: Maybe<StatCountType>;
  transformedArchiveFile?: Maybe<ArchiveFileType>;
  recordCounts?: Maybe<RecordCounts>;
  stepFile?: Maybe<Array<Maybe<ArchiveFileType>>>;
  nvp?: Maybe<Array<Maybe<NvpStr>>>;
};

export type RecordCountsFragmentFragment = (
  { __typename?: 'RecordCounts' }
  & Pick<RecordCounts, 'totalCount' | 'showUser'>
  & { recordCount?: Maybe<Array<Maybe<(
    { __typename?: 'RecordCount' }
    & Pick<RecordCount, 'name' | 'count'>
  )>>> }
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
  & Pick<DashboardPeriodCounts, 'transmissionCount' | 'billingUnitCount' | 'processErrorCount'>
  & { vendorTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, vendorTransmissionsBySpec?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, planSponsorTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, fileTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, vendorProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, planSponsorProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>>, fileProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
  )>>> }
);

export type EnrollmentStatFragmentFragment = (
  { __typename?: 'EnrollmentStat' }
  & { insuredStat?: Maybe<(
    { __typename?: 'InsuredStat' }
    & InsuredStatFragmentFragment
  )>, excludedInsuredStat?: Maybe<(
    { __typename?: 'InsuredStat' }
    & InsuredStatFragmentFragment
  )>, excludedPlanInsuredStat?: Maybe<Array<Maybe<(
    { __typename?: 'PlanInsuredStat' }
    & PlanInsuredStatFragmentFragment
  )>>>, planInsuredStat?: Maybe<Array<Maybe<(
    { __typename?: 'PlanInsuredStat' }
    & PlanInsuredStatFragmentFragment
  )>>> }
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
  & { parameters?: Maybe<Array<Maybe<(
    { __typename?: 'NVPStr' }
    & UnionNvp_NvpStr_Fragment
  ) | (
    { __typename?: 'NVPId' }
    & UnionNvp_NvpId_Fragment
  )>>>, commands?: Maybe<Array<Maybe<(
    { __typename?: 'WebNav' }
    & Pick<WebNav, 'label' | 'appDomain'>
    & { page?: Maybe<(
      { __typename?: 'WebPage' }
      & Pick<WebPage, 'type'>
      & { parameters?: Maybe<Array<Maybe<(
        { __typename?: 'NVPStr' }
        & UnionNvp_NvpStr_Fragment
      ) | (
        { __typename?: 'NVPId' }
        & UnionNvp_NvpId_Fragment
      )>>> }
    )> }
  )>>>, pivots?: Maybe<Array<Maybe<(
    { __typename?: 'WebPivot' }
    & Pick<WebPivot, 'label' | 'type'>
  )>>> }
);

export type FragmentWebNavFragment = (
  { __typename?: 'WebNav' }
  & Pick<WebNav, 'label' | 'appDomain'>
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

export type FragmentWebCommandFragment = (
  { __typename?: 'WebCommand' }
  & Pick<WebCommand, 'endPoint' | 'label' | 'commandType'>
  & { parameters?: Maybe<Array<Maybe<(
    { __typename?: 'NVPStr' }
    & UnionNvp_NvpStr_Fragment
  ) | (
    { __typename?: 'NVPId' }
    & UnionNvp_NvpId_Fragment
  )>>> }
);

export type FragmentPaginationInfoFragment = (
  { __typename?: 'PaginationInfo' }
  & Pick<PaginationInfo, 'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'>
);

export type FragmentCdxPageInfoFragment = (
  { __typename?: 'CDXPageInfo' }
  & Pick<CdxPageInfo, 'orgSid'>
  & { formInfo?: Maybe<Array<Maybe<(
    { __typename?: 'FormInfo' }
    & Pick<FormInfo, 'label'>
    & { formCommands?: Maybe<Array<Maybe<(
      { __typename?: 'WebCommand' }
      & FragmentWebCommandFragment
    )>>> }
  )>>>, lookupData?: Maybe<Array<Maybe<(
    { __typename?: 'LookupData' }
    & Pick<LookupData, 'key'>
    & { lookupPairs?: Maybe<Array<Maybe<(
      { __typename?: 'NVPStr' }
      & UnionNvp_NvpStr_Fragment
    ) | (
      { __typename?: 'NVPId' }
      & UnionNvp_NvpId_Fragment
    )>>> }
  )>>> }
);

export type VersionQueryVariables = Exact<{ [key: string]: never; }>;


export type VersionQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'version'>
);

export type BeginLoginQueryVariables = Exact<{
  userId: Scalars['String'];
}>;


export type BeginLoginQuery = (
  { __typename?: 'Query' }
  & { beginLogin?: Maybe<(
    { __typename?: 'LoginStep' }
    & Pick<LoginStep, 'userId' | 'step' | 'redirectPath' | 'allowLostPassword'>
  )> }
);

export type LogOutQueryVariables = Exact<{ [key: string]: never; }>;


export type LogOutQuery = (
  { __typename?: 'Query' }
  & { logOut?: Maybe<(
    { __typename?: 'LogOutInfo' }
    & Pick<LogOutInfo, 'successful'>
  )> }
);

export type ExchangeActivityInProcessQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>>> }
  )> }
);

export type ExchangeActivityTransmittedQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>>> }
  )> }
);

export type ExchangeActivityErroredQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'OrganizationLink' }
      & Pick<OrganizationLink, 'id' | 'orgId' | 'name' | 'type' | 'activityTime'>
    )>>> }
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
    & Pick<WorkPacketStatusDetails, 'workOrderId' | 'specId' | 'specImplName' | 'fingerPrint' | 'suppressBilling' | 'inboundLabel' | 'outboundLabel'>
    & { deliveredFile?: Maybe<(
      { __typename?: 'DeliveredFile' }
      & Pick<DeliveredFile, 'filename' | 'fileSizeInBytes' | 'textSizeInBytes' | 'timeDelivered'>
      & { ftp?: Maybe<(
        { __typename?: 'DeliveredFileFTP' }
        & Pick<DeliveredFileFtp, 'protocol' | 'host' | 'username' | 'folder' | 'port'>
      )>, kcurl?: Maybe<(
        { __typename?: 'DeliveredKCURL' }
        & Pick<DeliveredKcurl, 'url'>
      )> }
    )>, workStepStatus?: Maybe<Array<Maybe<(
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
      )>, stepFile?: Maybe<Array<Maybe<(
        { __typename?: 'ArchiveFileType' }
        & Pick<ArchiveFileType, 'value' | 'label'>
      )>>>, nvp?: Maybe<Array<Maybe<(
        { __typename?: 'NVPStr' }
        & Pick<NvpStr, 'name' | 'value'>
      )>>> }
    )>>>, extractParameters?: Maybe<(
      { __typename?: 'ExtractParameters' }
      & { originalParameter?: Maybe<Array<Maybe<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>>>, overriddenParameter?: Maybe<Array<Maybe<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>>>, derivedParameter?: Maybe<Array<Maybe<(
        { __typename?: 'ExtractParameter' }
        & ExtractParameterFragmentFragment
      )>>> }
    )>, qualityChecks?: Maybe<(
      { __typename?: 'QualityChecks' }
      & { sequenceCreationEvent?: Maybe<Array<Maybe<(
        { __typename?: 'SequenceCreationEvent' }
        & Pick<SequenceCreationEvent, 'context' | 'unitId'>
        & { recordCreationEvent?: Maybe<Array<Maybe<(
          { __typename?: 'RecordCreationEvent' }
          & Pick<RecordCreationEvent, 'context' | 'outerContext' | 'unitId'>
          & { error?: Maybe<Array<Maybe<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>>>, warning?: Maybe<Array<Maybe<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>>>, information?: Maybe<Array<Maybe<(
            { __typename?: 'FieldCreationEvent' }
            & FieldCreationFragmentFragment
          )>>> }
        )>>> }
      )>>> }
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
    )> }
  )> }
);

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
      | 'orgId'
      | 'orgSid'
      | 'detailsPath'
      | 'subClientPath'
      | 'inboundFilename'
      | 'vendorId'
      | 'vendorSid'
      | 'step'
      | 'stepStatus'
      | 'packetStatus'
      | 'reprocessedBy'
      | 'restartReason'
      | 'recordHighlightCount'
      | 'populationCount'
      | 'recordHighlightType'
      | 'clientFileArchivePath'
      | 'vendorFileArchivePath'
      | 'supplementalFilesArchivePaths'
      | 'archiveOnly'
      | 'hasErrors'
      | 'environment'
    >
  >;
};

export type WorkPacketStatusesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  searchText?: Maybe<Scalars['String']>;
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput: PageableInput;
}>;

export type WorkPacketStatusesQuery = { __typename?: 'Query' } & {
  workPacketStatuses?: Maybe<
    { __typename?: 'WorkPacketStatusConnection' } & {
      paginationInfo: { __typename?: 'PaginationInfo' } & FragmentPaginationInfoFragment;
      nodes?: Maybe<
        Array<
          Maybe<
            { __typename?: 'WorkPacketStatus' } & Pick<
              WorkPacketStatus,
              | 'workOrderId'
              | 'timestamp'
              | 'planSponsorId'
              | 'orgId'
              | 'orgSid'
              | 'detailsPath'
              | 'subClientPath'
              | 'inboundFilename'
              | 'vendorId'
              | 'vendorSid'
              | 'step'
              | 'stepStatus'
              | 'packetStatus'
              | 'reprocessedBy'
              | 'restartReason'
              | 'recordHighlightCount'
              | 'populationCount'
              | 'recordHighlightType'
              | 'clientFileArchivePath'
              | 'vendorFileArchivePath'
              | 'supplementalFilesArchivePaths'
              | 'archiveOnly'
              | 'hasErrors'
              | 'environment'
            >
          >
        >
      >;
    }
  >;
};

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

export type UsersForOrgQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type UsersForOrgQuery = (
  { __typename?: 'Query' }
  & { usersForOrg?: Maybe<(
    { __typename?: 'UserConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), listPageInfo?: Maybe<(
      { __typename?: 'ListPageInfo' }
      & Pick<ListPageInfo, 'pageHeaderLabel'>
      & { pageCommands?: Maybe<Array<Maybe<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>>>, listItemCommands?: Maybe<Array<Maybe<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>>>, listItemBulkCommands?: Maybe<Array<Maybe<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>>> }
    )>, nodes?: Maybe<Array<Maybe<(
      { __typename?: 'UserItem' }
      & { item: (
        { __typename?: 'UserAccount' }
        & Pick<UserAccount, 'sid' | 'email'>
        & { person?: Maybe<(
          { __typename?: 'Person' }
          & Pick<Person, 'sid' | 'firstNm' | 'lastNm'>
        )>, accessPolicyGroups?: Maybe<Array<Maybe<(
          { __typename?: 'AccessPolicyGroup' }
          & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
          & { policies?: Maybe<Array<Maybe<(
            { __typename?: 'AccessPolicy' }
            & FragmentAccessPolicyFragment
          )>>> }
        )>>> }
      ), listItemCommands?: Maybe<Array<Maybe<(
        { __typename?: 'WebCommand' }
        & FragmentWebCommandFragment
      )>>> }
    )>>> }
  )> }
);

export type ChangeOwnPasswordPageQueryVariables = Exact<{ [key: string]: never; }>;


export type ChangeOwnPasswordPageQuery = (
  { __typename?: 'Query' }
  & { changeOwnPasswordPage?: Maybe<(
    { __typename?: 'PasswordPage' }
    & { ruleGroup: (
      { __typename?: 'PasswordRuleGroup' }
      & Pick<PasswordRuleGroup, 'numberOfCharacteristics'>
    ) }
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
      & { navItems?: Maybe<Array<Maybe<(
        { __typename?: 'WebNav' }
        & FragmentWebNavFragment
      )>>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
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
    & Pick<WebNav, 'label' | 'appDomain'>
    & { page?: Maybe<(
      { __typename?: 'WebPage' }
      & FragmentWebPageFragment
    )>, subNavItems?: Maybe<Array<Maybe<(
      { __typename?: 'WebNav' }
      & FragmentWebNavFragment
    )>>> }
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
    )>, accessPolicyGroups?: Maybe<Array<Maybe<(
      { __typename?: 'AccessPolicyGroup' }
      & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
      & { policies?: Maybe<Array<Maybe<(
        { __typename?: 'AccessPolicy' }
        & FragmentAccessPolicyFragment
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'AccessPolicy' }
      & FragmentAccessPolicyFragment
    )>>> }
  )> }
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'AccessSpecialization' }
      & Pick<AccessSpecialization, 'sid' | 'name'>
      & { filters?: Maybe<Array<Maybe<(
        { __typename?: 'SpecializationFilter' }
        & Pick<SpecializationFilter, 'sid' | 'permission' | 'orgSids'>
      )>>> }
    )>>> }
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'AccessPolicyGroup' }
      & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
      & { policies?: Maybe<Array<Maybe<(
        { __typename?: 'AccessPolicy' }
        & FragmentAccessPolicyFragment
      )>>> }
    )>>> }
  )> }
);

export type SystemTemplateAccessPolicyGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type SystemTemplateAccessPolicyGroupByNameQuery = { __typename?: 'Query' } & {
  systemTemplateAccessPolicyGroupByName?: Maybe<
    Array<
      Maybe<
        { __typename?: 'AccessPolicyGroup' } & Pick<
          AccessPolicyGroup,
          'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'
        > & { policies?: Maybe<Array<Maybe<{ __typename?: 'AccessPolicy' } & FragmentAccessPolicyFragment>>> }
      >
    >
  >;
};

export type AccessPolicyFormQueryVariables = Exact<{ [key: string]: never }>;

export type AccessPolicyFormQuery = { __typename?: 'Query' } & {
  accessPolicyForm?: Maybe<
    { __typename?: 'AccessPolicyForm' } & Pick<
      AccessPolicyForm,
      'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'
    > & {
        name: { __typename?: 'UIStringField' } & Pick<
          UiStringField,
          'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'
        >;
        organization: { __typename?: 'UIReadOnlyField' } & Pick<
          UiReadOnlyField,
          'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'
        >;
        permissions?: Maybe<
          { __typename?: 'UISelectManyField' } & Pick<
            UiSelectManyField,
            | 'value'
            | 'label'
            | 'info'
            | 'required'
            | 'visible'
            | 'options'
            | 'query'
            | 'errCode'
            | 'errMsg'
            | 'errSeverity'
          >
        >;
        tmpl?: Maybe<
          { __typename?: 'UIBooleanField' } & Pick<
            UiBooleanField,
            'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'
          >
        >;
        tmplUseAsIs?: Maybe<
          { __typename?: 'UIBooleanField' } & Pick<
            UiBooleanField,
            'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'
          >
        >;
        applicableOrgTypes?: Maybe<
          { __typename?: 'UISelectManyField' } & Pick<
            UiSelectManyField,
            | 'value'
            | 'label'
            | 'info'
            | 'required'
            | 'visible'
            | 'options'
            | 'query'
            | 'errCode'
            | 'errMsg'
            | 'errSeverity'
          >
        >;
        options?: Maybe<
          Array<
            Maybe<
              { __typename?: 'UIOptions' } & Pick<UiOptions, 'key'> & {
                  values?: Maybe<
                    Array<Maybe<{ __typename?: 'UIOption' } & Pick<UiOption, 'label' | 'value' | 'info'>>>
                  >;
                }
            >
          >
        >;
      }
  >;
};

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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), filters?: Maybe<Array<Maybe<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { permission: (
        { __typename?: 'UISelectOneField' }
        & Pick<UiSelectOneField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      )> }
    )>>>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), filters?: Maybe<Array<Maybe<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { permission: (
        { __typename?: 'UISelectOneField' }
        & Pick<UiSelectOneField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      )> }
    )>>>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), description: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), description: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
  )> }
);

export type TopLevelOrgsByTypeQueryVariables = Exact<{
  orgType: OrgType;
}>;


export type TopLevelOrgsByTypeQuery = (
  { __typename?: 'Query' }
  & { topLevelOrgsByType?: Maybe<Array<Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>
  )>>> }
);

export type OrgByIdQueryVariables = Exact<{
  orgSid?: Maybe<Scalars['ID']>;
  orgId: Scalars['String'];
}>;


export type OrgByIdQuery = (
  { __typename?: 'Query' }
  & { orgById?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>
    )>>> }
  )> }
);

export type WpProcessErrorsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type WpProcessErrorsQuery = (
  { __typename?: 'Query' }
  & { wpProcessErrors?: Maybe<(
    { __typename?: 'WPProcessErrorConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'WPProcessError' }
      & Pick<WpProcessError, 'id' | 'workOrderId' | 'startTime' | 'stepName' | 'planSponsorId' | 'vendorId' | 'msg' | 'inboundFilename' | 'clientFileArchivePath'>
    )>>> }
  )> }
);

export type WpTransmissionsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type WpTransmissionsQuery = (
  { __typename?: 'Query' }
  & { wpTransmissions?: Maybe<(
    { __typename?: 'WPTransmissionConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & FragmentPaginationInfoFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'WPTransmission' }
      & Pick<WpTransmission, 'id' | 'workOrderId' | 'deliveredOn' | 'planSponsorId' | 'vendorId' | 'specId' | 'implementation' | 'inboundFilename' | 'outboundFilename' | 'outboundFilesize' | 'billingCount' | 'totalRecords' | 'extractType' | 'extractVersion'>
    )>>> }
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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'ScheduleOccurrence' }
      & Pick<ScheduleOccurrence, 'resource' | 'scheduleId' | 'timeScheduled' | 'schedOccurStatus'>
      & { runOccurrences?: Maybe<Array<Maybe<(
        { __typename?: 'ScheduleRunOccurrence' }
        & Pick<ScheduleRunOccurrence, 'workOrderId' | 'timeRan' | 'status'>
      )>>> }
    )>>> }
  )> }
);

export type OrganizationFormQueryVariables = Exact<{ [key: string]: never; }>;


export type OrganizationFormQuery = (
  { __typename?: 'Query' }
  & { organizationForm?: Maybe<(
    { __typename?: 'OrganizationForm' }
    & Pick<OrganizationForm, 'sid' | 'response' | 'errCode' | 'errMsg' | 'errSeverity'>
    & { name: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), orgId: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), orgType?: Maybe<(
      { __typename?: 'UISelectOneField' }
      & Pick<UiSelectOneField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, active: (
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
  )> }
);

export type FindOrganizationQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type OrganizationQuickSearchQuery = { __typename?: 'Query' } & {
  organizationQuickSearch?: Maybe<
    Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>>>
  >;
};

export type SearchOrganizationsQueryVariables = Exact<{
  searchText: Scalars['String'];
  orgOwnerSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type VendorQuickSearchQuery = { __typename?: 'Query' } & {
  vendorQuickSearch?: Maybe<
    Array<Maybe<{ __typename?: 'Organization' } & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>>>
  >;
};

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
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>>> }
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
    & { themeColorPalettes?: Maybe<Array<Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>>> }
  )> }
);

export type CurrentUserDashThemePageQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserDashThemePageQuery = (
  { __typename?: 'Query' }
  & { currentUserDashThemePage?: Maybe<(
    { __typename?: 'UserDashThemePage' }
    & Pick<UserDashThemePage, 'themeColorModes' | 'themeFontSizes'>
    & { themeColorPalettes?: Maybe<Array<Maybe<(
      { __typename?: 'DashThemeColor' }
      & Pick<DashThemeColor, 'id' | 'defaultPalette' | 'themeColorMode' | 'allowDark' | 'paletteNm' | 'themePrimary' | 'themeLighterAlt' | 'themeLighter' | 'themeLight' | 'themeTertiary' | 'themeSecondary' | 'themeDarkAlt' | 'themeDark' | 'themeDarker' | 'neutralLighterAlt' | 'neutralLighter' | 'neutralLight' | 'neutralQuaternaryAlt' | 'neutralQuaternary' | 'neutralTertiaryAlt' | 'neutralTertiary' | 'neutralSecondary' | 'neutralPrimaryAlt' | 'neutralPrimary' | 'neutralDark' | 'black' | 'white'>
    )>>>, dashTheme?: Maybe<(
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
    & { navItems?: Maybe<Array<Maybe<(
      { __typename?: 'WebNav' }
      & { subNavItems?: Maybe<Array<Maybe<(
        { __typename?: 'WebNav' }
        & FragmentWebNavFragment
      )>>> }
      & FragmentWebNavFragment
    )>>> }
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

export type PasswordLoginMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;


export type PasswordLoginMutation = (
  { __typename?: 'Mutation' }
  & { passwordLogin?: Maybe<(
    { __typename?: 'LoginStep' }
    & Pick<LoginStep, 'step' | 'redirectPath' | 'allowLostPassword'>
    & { loginCompleteDomain?: Maybe<(
      { __typename?: 'WebAppDomain' }
      & Pick<WebAppDomain, 'type' | 'selectedPage'>
      & { navItems?: Maybe<Array<Maybe<(
        { __typename?: 'WebNav' }
        & { subNavItems?: Maybe<Array<Maybe<(
          { __typename?: 'WebNav' }
          & FragmentWebNavFragment
        )>>> }
        & FragmentWebNavFragment
      )>>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
      )> }
    )> }
  )> }
);

export type UpdateOwnPasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;


export type UpdateOwnPasswordMutation = (
  { __typename?: 'Mutation' }
  & { updateOwnPassword?: Maybe<(
    { __typename?: 'UserSession' }
    & Pick<UserSession, 'id' | 'orgId' | 'orgSid' | 'userId' | 'firstNm' | 'pollInterval' | 'defaultAuthorities'>
  )> }
);

export type CreateOrgMutationVariables = Exact<{
  orgInfo: CreateOrgInput;
}>;


export type CreateOrgMutation = (
  { __typename?: 'Mutation' }
  & { createOrg?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'sid' | 'name' | 'orgId' | 'orgType'>
  )> }
);

export type DeactivateOrgMutationVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type DeactivateOrgMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deactivateOrg'>
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), permissions?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), filters?: Maybe<Array<Maybe<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { permission: (
        { __typename?: 'UISelectOneField' }
        & Pick<UiSelectOneField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      )> }
    )>>>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), filters?: Maybe<Array<Maybe<(
      { __typename?: 'SpecializationFilterForm' }
      & Pick<SpecializationFilterForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { permission: (
        { __typename?: 'UISelectOneField' }
        & Pick<UiSelectOneField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), orgSids?: Maybe<(
        { __typename?: 'UISelectManyField' }
        & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
      )> }
    )>>>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), description: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), description: (
      { __typename?: 'UIStringField' }
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), tmpl?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, tmplUseAsIs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, applicableOrgTypes?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, policies?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, specializations?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeAllSubOrgs?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, includeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, excludeOrgSids?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
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
      & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, active?: Maybe<(
      { __typename?: 'UIBooleanField' }
      & Pick<UiBooleanField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, person?: Maybe<(
      { __typename?: 'PersonForm' }
      & Pick<PersonForm, 'sid' | 'errCode' | 'errMsg' | 'errSeverity'>
      & { firstNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ), lastNm: (
        { __typename?: 'UIStringField' }
        & Pick<UiStringField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'min' | 'max' | 'errCode' | 'errMsg' | 'errSeverity'>
      ) }
    )>, organization: (
      { __typename?: 'UIReadOnlyField' }
      & Pick<UiReadOnlyField, 'value' | 'description' | 'label' | 'info' | 'required' | 'visible' | 'errCode' | 'errMsg' | 'errSeverity'>
    ), accessPolicyGroups?: Maybe<(
      { __typename?: 'UISelectManyField' }
      & Pick<UiSelectManyField, 'value' | 'label' | 'info' | 'required' | 'visible' | 'options' | 'query' | 'errCode' | 'errMsg' | 'errSeverity'>
    )>, options?: Maybe<Array<Maybe<(
      { __typename?: 'UIOptions' }
      & Pick<UiOptions, 'key'>
      & { values?: Maybe<Array<Maybe<(
        { __typename?: 'UIOption' }
        & Pick<UiOption, 'label' | 'value' | 'info'>
      )>>> }
    )>>> }
  )> }
);

export type UpdateUserAccessPolicyGroupsMutationVariables = Exact<{
  userAccessPolicyGroupUpdate?: Maybe<UpdateUserAccessPolicyGroupsInput>;
}>;


export type UpdateUserAccessPolicyGroupsMutation = (
  { __typename?: 'Mutation' }
  & { updateUserAccessPolicyGroups?: Maybe<Array<Maybe<(
    { __typename?: 'AccessPolicyGroup' }
    & Pick<AccessPolicyGroup, 'sid' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'applicableOrgTypes'>
    & { policies?: Maybe<Array<Maybe<(
      { __typename?: 'AccessPolicy' }
      & FragmentAccessPolicyFragment
    )>>> }
  )>>> }
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
export const FragmentPaginationInfoFragmentDoc = gql`
    fragment fragmentPaginationInfo on PaginationInfo {
  totalPages
  totalElements
  pageNumber
  pageSize
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
    ${UnionNvpFragmentDoc}`;
export const FragmentCdxPageInfoFragmentDoc = gql`
    fragment fragmentCDXPageInfo on CDXPageInfo {
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
${UnionNvpFragmentDoc}`;
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
export function useBeginLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>) {
          return Apollo.useLazyQuery<BeginLoginQuery, BeginLoginQueryVariables>(BeginLoginDocument, baseOptions);
        }
export type BeginLoginQueryHookResult = ReturnType<typeof useBeginLoginQuery>;
export type BeginLoginLazyQueryHookResult = ReturnType<typeof useBeginLoginLazyQuery>;
export type BeginLoginQueryResult = Apollo.QueryResult<BeginLoginQuery, BeginLoginQueryVariables>;
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
export const ExchangeActivityInProcessDocument = gql`
    query ExchangeActivityInProcess($orgSidInput: OrgSidInput!, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityInProcess(
    orgSidInput: $orgSidInput
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
    query ExchangeActivityTransmitted($orgSidInput: OrgSidInput!, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityTransmitted(
    orgSidInput: $orgSidInput
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
    query ExchangeActivityErrored($orgSidInput: OrgSidInput!, $dateRange: DateTimeRangeInput!, $pageableInput: PageableInput!) {
  exchangeActivityErrored(
    orgSidInput: $orgSidInput
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
    specId
    specImplName
    fingerPrint
    suppressBilling
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
      planSponsorId
      orgId
      orgSid
      detailsPath
      subClientPath
      inboundFilename
      vendorId
      vendorSid
      step
      stepStatus
      packetStatus
      reprocessedBy
      restartReason
      recordHighlightCount
      populationCount
      recordHighlightType
      clientFileArchivePath
      vendorFileArchivePath
      feedType
      inboundDataType
      inboundDataSize
      version
      supplementalFilesArchivePaths
      archiveOnly
      hasErrors
      environment
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
export const WorkPacketStatusesDocument = gql`
    query WorkPacketStatuses($orgSid: ID!, $searchText: String, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput!) {
  workPacketStatuses(
    orgSid: $orgSid
    searchText: $searchText
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    nodes {
      workOrderId
      timestamp
      planSponsorId
      orgId
      orgSid
      detailsPath
      subClientPath
      inboundFilename
      vendorId
      vendorSid
      step
      stepStatus
      packetStatus
      reprocessedBy
      restartReason
      recordHighlightCount
      populationCount
      recordHighlightType
      clientFileArchivePath
      vendorFileArchivePath
      feedType
      inboundDataType
      inboundDataSize
      version
      supplementalFilesArchivePaths
      archiveOnly
      hasErrors
      environment
    }
  }
}
export type WorkPacketStatusQueryHookResult = ReturnType<typeof useWorkPacketStatusQuery>;
export type WorkPacketStatusLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusLazyQuery>;
export type WorkPacketStatusQueryResult = Apollo.QueryResult<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>;
export const WorkPacketStatusesDocument = gql`
  query WorkPacketStatuses(
    $orgSid: ID!
    $searchText: String
    $dateRange: DateTimeRangeInput
    $pageableInput: PageableInput!
  ) {
    workPacketStatuses(orgSid: $orgSid, searchText: $searchText, dateRange: $dateRange, pageableInput: $pageableInput) {
      paginationInfo {
        ...fragmentPaginationInfo
      }
      nodes {
        workOrderId
        timestamp
        planSponsorId
        orgId
        orgSid
        detailsPath
        subClientPath
        inboundFilename
        vendorId
        vendorSid
        step
        stepStatus
        packetStatus
        reprocessedBy
        restartReason
        recordHighlightCount
        populationCount
        recordHighlightType
        clientFileArchivePath
        vendorFileArchivePath
        feedType
        inboundDataType
        inboundDataSize
        version
        supplementalFilesArchivePaths
        archiveOnly
        hasErrors
        environment
      }
    }
  }
  ${FragmentPaginationInfoFragmentDoc}
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
export const UsersForOrgDocument = gql`
    query UsersForOrg($orgSid: ID!, $userFilter: UserFilterInput, $pageableInput: PageableInput) {
  usersForOrg(
    orgSid: $orgSid
    userFilter: $userFilter
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
    }
    listPageInfo {
      pageHeaderLabel
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
      listItemCommands {
        ...fragmentWebCommand
      }
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
${FragmentWebCommandFragmentDoc}
${FragmentAccessPolicyFragmentDoc}`;

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
export const ChangeOwnPasswordPageDocument = gql`
    query ChangeOwnPasswordPage {
  changeOwnPasswordPage {
    ruleGroup {
      numberOfCharacteristics
    }
  }
}
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
export function useChangeOwnPasswordPageQuery(baseOptions?: Apollo.QueryHookOptions<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>) {
        return Apollo.useQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(ChangeOwnPasswordPageDocument, baseOptions);
      }
export function useChangeOwnPasswordPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>) {
          return Apollo.useLazyQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(ChangeOwnPasswordPageDocument, baseOptions);
        }
export type ChangeOwnPasswordPageQueryHookResult = ReturnType<typeof useChangeOwnPasswordPageQuery>;
export type ChangeOwnPasswordPageLazyQueryHookResult = ReturnType<typeof useChangeOwnPasswordPageLazyQuery>;
export type ChangeOwnPasswordPageQueryResult = Apollo.QueryResult<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    active {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    person {
      sid
      firstNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      lastNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    accessPolicyGroups {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    response
    options {
      key
      values {
        label
        value
        info
      }
    }
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    active {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    person {
      sid
      firstNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      lastNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    accessPolicyGroups {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    response
    options {
      key
      values {
        label
        value
        info
      }
    }
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
    nodes {
      ...fragmentAccessPolicy
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}
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
export const AccessSpecializationsForOrgDocument = gql`
    query AccessSpecializationsForOrg($orgSid: ID!, $pageableInput: PageableInput) {
  accessSpecializationsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
    paginationInfo {
      ...fragmentPaginationInfo
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
    ${FragmentPaginationInfoFragmentDoc}`;

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
export const SystemTemplateAccessPolicyGroupByNameDocument = gql`
    query SystemTemplateAccessPolicyGroupByName($name: String!) {
  systemTemplateAccessPolicyGroupByName(name: $name) {
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
    ${FragmentAccessPolicyFragmentDoc}`;

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
export function useSystemTemplateAccessPolicyGroupByNameQuery(baseOptions: Apollo.QueryHookOptions<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>) {
        return Apollo.useQuery<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
      }
export function useSystemTemplateAccessPolicyGroupByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>) {
          return Apollo.useLazyQuery<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
        }
export type SystemTemplateAccessPolicyGroupByNameQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameQuery>;
export type SystemTemplateAccessPolicyGroupByNameLazyQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameLazyQuery>;
export type SystemTemplateAccessPolicyGroupByNameQueryResult = Apollo.QueryResult<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>;
export const AccessPolicyFormDocument = gql`
  query AccessPolicyForm($templatePolicySid: ID) {
    accessPolicyForm(templatePolicySid: $templatePolicySid) {
      sid
      name {
        value
        label
        value
        info
      }
      permissions {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      tmpl {
        value
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      tmplUseAsIs {
        value
        label
        value
        info
      }
export function useSystemTemplateAccessPolicyGroupByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>) {
          return Apollo.useLazyQuery<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
        }
export type SystemTemplateAccessPolicyGroupByNameQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameQuery>;
export type SystemTemplateAccessPolicyGroupByNameLazyQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameLazyQuery>;
export type SystemTemplateAccessPolicyGroupByNameQueryResult = Apollo.QueryResult<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>;
export const AccessPolicyFormDocument = gql`
    query AccessPolicyForm {
  accessPolicyForm {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    permissions {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      tmplUseAsIs {
        value
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      applicableOrgTypes {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
export function useSystemTemplateAccessPolicyGroupByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>) {
          return Apollo.useLazyQuery<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>(SystemTemplateAccessPolicyGroupByNameDocument, baseOptions);
        }
export type SystemTemplateAccessPolicyGroupByNameQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameQuery>;
export type SystemTemplateAccessPolicyGroupByNameLazyQueryHookResult = ReturnType<typeof useSystemTemplateAccessPolicyGroupByNameLazyQuery>;
export type SystemTemplateAccessPolicyGroupByNameQueryResult = Apollo.QueryResult<SystemTemplateAccessPolicyGroupByNameQuery, SystemTemplateAccessPolicyGroupByNameQueryVariables>;
export const AccessPolicyFormDocument = gql`
    query AccessPolicyForm {
  accessPolicyForm {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    permissions {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
      options {
        key
        values {
          label
          value
          info
        }
      }
      response
      errCode
      errMsg
      errSeverity
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
 *      templatePolicySid: // value for 'templatePolicySid'
 *   },
 * });
 */
export function useAccessPolicyFormQuery(baseOptions?: Apollo.QueryHookOptions<AccessPolicyFormQuery, AccessPolicyFormQueryVariables>) {
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    permissions {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    filters {
      sid
      permission {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      orgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    filters {
      sid
      permission {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      orgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
    query AccessPolicyGroupForm($orgSid: ID!) {
  accessPolicyGroupForm(orgSid: $orgSid) {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    description {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    policies {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    specializations {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    includeAllSubOrgs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    includeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    excludeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
      organization {
        value
        description
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      tmpl {
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    description {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    policies {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    specializations {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    includeAllSubOrgs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    includeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    excludeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      tmplUseAsIs {
        value
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      applicableOrgTypes {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      policies {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      specializations {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      includeAllSubOrgs {
        value
        label
        info
        required
        visible
        errCode
        errMsg
        errSeverity
      }
      includeOrgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      excludeOrgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      options {
        key
        values {
          label
          value
          info
        }
export type AccessPolicyGroupFormQueryHookResult = ReturnType<typeof useAccessPolicyGroupFormQuery>;
export type AccessPolicyGroupFormLazyQueryHookResult = ReturnType<typeof useAccessPolicyGroupFormLazyQuery>;
export type AccessPolicyGroupFormQueryResult = Apollo.QueryResult<AccessPolicyGroupFormQuery, AccessPolicyGroupFormQueryVariables>;
export const FindAccessPolicyGroupDocument = gql`
    query FindAccessPolicyGroup($policyGroupSid: ID!) {
  findAccessPolicyGroup(policyGroupSid: $policyGroupSid) {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    description {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    policies {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    specializations {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    includeAllSubOrgs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    includeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    excludeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
    nodes {
      sid
      name
      orgId
      orgType
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

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
export function useScheduleOccurrencesQuery(baseOptions: Apollo.QueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>) {
        return Apollo.useQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(ScheduleOccurrencesDocument, baseOptions);
      }
export function useScheduleOccurrencesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>) {
          return Apollo.useLazyQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(ScheduleOccurrencesDocument, baseOptions);
        }
export type ScheduleOccurrencesQueryHookResult = ReturnType<typeof useScheduleOccurrencesQuery>;
export type ScheduleOccurrencesLazyQueryHookResult = ReturnType<typeof useScheduleOccurrencesLazyQuery>;
export type ScheduleOccurrencesQueryResult = Apollo.QueryResult<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>;
export const OrganizationFormDocument = gql`
    query OrganizationForm {
  organizationForm {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    orgId {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    orgType {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
  }
  ${FragmentPaginationInfoFragmentDoc}
`;

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
export function useSearchOrganizationsQuery(
  baseOptions: Apollo.QueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>
) {
  return Apollo.useQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(
    SearchOrganizationsDocument,
    baseOptions
  );
}
export function useSearchOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>
) {
  return Apollo.useLazyQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(
    SearchOrganizationsDocument,
    baseOptions
  );
}
export type SearchOrganizationsQueryHookResult = ReturnType<typeof useSearchOrganizationsQuery>;
export type SearchOrganizationsLazyQueryHookResult = ReturnType<typeof useSearchOrganizationsLazyQuery>;
export type SearchOrganizationsQueryResult = Apollo.QueryResult<
  SearchOrganizationsQuery,
  SearchOrganizationsQueryVariables
>;
export const OrganizationQuickSearchDocument = gql`
  query OrganizationQuickSearch($searchText: String!, $orgOwnerSid: ID!) {
    organizationQuickSearch(searchText: $searchText, orgOwnerSid: $orgOwnerSid) {
      sid
      name
      orgId
      orgType
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
export function useOrganizationQuickSearchQuery(
  baseOptions: Apollo.QueryHookOptions<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>
) {
  return Apollo.useQuery<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>(
    OrganizationQuickSearchDocument,
    baseOptions
  );
}
export function useOrganizationQuickSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>
) {
  return Apollo.useLazyQuery<OrganizationQuickSearchQuery, OrganizationQuickSearchQueryVariables>(
    OrganizationQuickSearchDocument,
    baseOptions
  );
}
export type OrganizationQuickSearchQueryHookResult = ReturnType<typeof useOrganizationQuickSearchQuery>;
export type OrganizationQuickSearchLazyQueryHookResult = ReturnType<typeof useOrganizationQuickSearchLazyQuery>;
export type OrganizationQuickSearchQueryResult = Apollo.QueryResult<
  OrganizationQuickSearchQuery,
  OrganizationQuickSearchQueryVariables
>;
export const VendorQuickSearchDocument = gql`
  query VendorQuickSearch($searchText: String!, $orgOwnerSid: ID!) {
    vendorQuickSearch(searchText: $searchText, orgOwnerSid: $orgOwnerSid) {
      sid
      name
      orgId
      orgType
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
 *      searchText: // value for 'searchText'
 *      orgOwnerSid: // value for 'orgOwnerSid'
 *   },
 * });
 */
export function useVendorQuickSearchQuery(
  baseOptions: Apollo.QueryHookOptions<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>
) {
  return Apollo.useQuery<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>(
    VendorQuickSearchDocument,
    baseOptions
  );
}
export function useVendorQuickSearchLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>
) {
  return Apollo.useLazyQuery<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>(
    VendorQuickSearchDocument,
    baseOptions
  );
}
export type VendorQuickSearchQueryHookResult = ReturnType<typeof useVendorQuickSearchQuery>;
export type VendorQuickSearchLazyQueryHookResult = ReturnType<typeof useVendorQuickSearchLazyQuery>;
export type VendorQuickSearchQueryResult = Apollo.QueryResult<VendorQuickSearchQuery, VendorQuickSearchQueryVariables>;
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
}
    ${FragmentPaginationInfoFragmentDoc}`;

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
    query WpTransmissions($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  wpTransmissions(
    orgSid: $orgSid
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...fragmentPaginationInfo
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
    ${FragmentPaginationInfoFragmentDoc}`;

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
    ${FragmentPaginationInfoFragmentDoc}`;

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
export function useSearchOrganizationsQuery(baseOptions: Apollo.QueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>) {
        return Apollo.useQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(SearchOrganizationsDocument, baseOptions);
      }
export function useSearchOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>) {
          return Apollo.useLazyQuery<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>(SearchOrganizationsDocument, baseOptions);
        }
export type SearchOrganizationsQueryHookResult = ReturnType<typeof useSearchOrganizationsQuery>;
export type SearchOrganizationsLazyQueryHookResult = ReturnType<typeof useSearchOrganizationsLazyQuery>;
export type SearchOrganizationsQueryResult = Apollo.QueryResult<SearchOrganizationsQuery, SearchOrganizationsQueryVariables>;
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
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;

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
    nodes {
      sid
      name
      orgId
      orgType
    }
  }
}
    ${FragmentPaginationInfoFragmentDoc}`;

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
export type SearchOrganizationsQueryResult = Apollo.QueryResult<
  SearchOrganizationsQuery,
  SearchOrganizationsQueryVariables
>;
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
export const PasswordLoginDocument = gql`
    mutation PasswordLogin($userId: String!, $password: String!) {
  passwordLogin(userId: $userId, password: $password) {
    step
    redirectPath
    allowLostPassword
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
        userId
        firstNm
        pollInterval
        defaultAuthorities
      }
    }
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
export const UpdateOwnPasswordDocument = gql`
    mutation UpdateOwnPassword($updatePasswordInput: UpdatePasswordInput!) {
  updateOwnPassword(updatePasswordInput: $updatePasswordInput) {
    id
    orgId
    orgSid
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
 *      updatePasswordInput: // value for 'updatePasswordInput'
 *   },
 * });
 */
export function useUpdateOwnPasswordMutation(baseOptions?: Apollo.MutationHookOptions<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>) {
        return Apollo.useMutation<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>(UpdateOwnPasswordDocument, baseOptions);
      }
export type UpdateOwnPasswordMutationHookResult = ReturnType<typeof useUpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationResult = Apollo.MutationResult<UpdateOwnPasswordMutation>;
export type UpdateOwnPasswordMutationOptions = Apollo.BaseMutationOptions<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>;
export const CreateOrgDocument = gql`
    mutation CreateOrg($orgInfo: CreateOrgInput!) {
  createOrg(orgInfo: $orgInfo) {
    sid
    name
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
export function useCreateOrgMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>) {
        return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, baseOptions);
      }
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
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
export const CreateAccessPolicyDocument = gql`
    mutation CreateAccessPolicy($createAccessPolicyInput: CreateAccessPolicyInput!) {
  createAccessPolicy(createAccessPolicyInput: $createAccessPolicyInput) {
    sid
    name {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    permissions {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
export type CreateAccessPolicyMutationFn = Apollo.MutationFunction<CreateAccessPolicyMutation, CreateAccessPolicyMutationVariables>;

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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    permissions {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    filters {
      sid
      permission {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      orgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    filters {
      sid
      permission {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      orgSids {
        value
        label
        info
        required
        visible
        options
        query
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    description {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    policies {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    specializations {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    includeAllSubOrgs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    includeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    excludeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    description {
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmpl {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    tmplUseAsIs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    applicableOrgTypes {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    policies {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    specializations {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    includeAllSubOrgs {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    includeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    excludeOrgSids {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    options {
      key
      values {
        label
        value
        info
      }
    }
    response
    errCode
    errMsg
    errSeverity
  }
}
    `;
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    active {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    person {
      sid
      firstNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      lastNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    accessPolicyGroups {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    response
    options {
      key
      values {
        label
        value
        info
      }
    }
    errCode
    errMsg
    errSeverity
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
      value
      label
      info
      required
      visible
      min
      max
      errCode
      errMsg
      errSeverity
    }
    active {
      value
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    person {
      sid
      firstNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      lastNm {
        value
        label
        info
        required
        visible
        min
        max
        errCode
        errMsg
        errSeverity
      }
      errCode
      errMsg
      errSeverity
    }
    organization {
      value
      description
      label
      info
      required
      visible
      errCode
      errMsg
      errSeverity
    }
    accessPolicyGroups {
      value
      label
      info
      required
      visible
      options
      query
      errCode
      errMsg
      errSeverity
    }
    response
    options {
      key
      values {
        label
        value
        info
      }
    }
    errCode
    errMsg
    errSeverity
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
    ${FragmentAccessPolicyFragmentDoc}`;
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