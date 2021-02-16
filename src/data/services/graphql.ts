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
  DateTime: any;
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  beginLogin?: Maybe<LoginStep>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  workPacketStatuses?: Maybe<Array<Maybe<WorkPacketStatus>>>;
  dashboardPeriods?: Maybe<DashboardPeriods>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  amPolicyPage?: Maybe<AmPolicyPage>;
  amPolicy?: Maybe<AmPolicy>;
  amPolicyFacetsForService?: Maybe<Array<Maybe<CdxFacetNvp>>>;
  amPolicyVerbForFacet?: Maybe<Array<Maybe<PermissionVerbNvp>>>;
  amPoliciesForOrg?: Maybe<AmPolicyConnection>;
  amGroupsForOrg?: Maybe<AmGroupConnection>;
  usersForOrg?: Maybe<UserConnection>;
  systemTemplateAMGroupByName?: Maybe<Array<Maybe<AmGroup>>>;
  topLevelOrgsByType?: Maybe<Array<Maybe<Organization>>>;
  orgById?: Maybe<Organization>;
  directOrganizations?: Maybe<OrganizationConnection>;
  wpProcessErrors?: Maybe<WpProcessErrorConnection>;
  wpTransmissions?: Maybe<WpTransmissionConnection>;
  scheduleOccurrences?: Maybe<ScheduleOccurrenceConnection>;
};


export type QueryBeginLoginArgs = {
  userId: Scalars['String'];
};


export type QueryWorkPacketStatusDetailsArgs = {
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


export type QueryAmPolicyPageArgs = {
  orgSid: Scalars['ID'];
};


export type QueryAmPolicyArgs = {
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
};


export type QueryAmPolicyFacetsForServiceArgs = {
  orgSid: Scalars['ID'];
  cdxService: CdxService;
};


export type QueryAmPolicyVerbForFacetArgs = {
  orgSid: Scalars['ID'];
  cdxService: CdxService;
  cdxFacet: CdxFacet;
};


export type QueryAmPoliciesForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};


export type QueryAmGroupsForOrgArgs = {
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
};


export type QueryUsersForOrgArgs = {
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
};


export type QuerySystemTemplateAmGroupByNameArgs = {
  name: Scalars['String'];
};


export type QueryTopLevelOrgsByTypeArgs = {
  orgType: OrgType;
};


export type QueryOrgByIdArgs = {
  orgSid: Scalars['ID'];
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

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<LoginStep>;
  createOrg?: Maybe<Organization>;
  createAMPolicy?: Maybe<AmPolicy>;
  createAMPermission?: Maybe<AmPermission>;
  createAMPermissionAction?: Maybe<AmPermissionAction>;
  createAMGroup?: Maybe<AmGroup>;
  createUser?: Maybe<User>;
  removeAMPolicies?: Maybe<Scalars['String']>;
  removeAMPolicy?: Maybe<Scalars['String']>;
  removeAMPermissions?: Maybe<Scalars['String']>;
  removeAMPermission?: Maybe<Scalars['String']>;
  removeAMPermissionActions?: Maybe<Scalars['String']>;
  removeAMPermissionAction?: Maybe<Scalars['String']>;
  updateAMPolicy?: Maybe<AmPolicy>;
  updateAMPermission?: Maybe<AmPermission>;
  updateAMPermissionAction?: Maybe<AmPermissionAction>;
};


export type MutationPasswordLoginArgs = {
  userId: Scalars['String'];
  password: Scalars['String'];
};


export type MutationCreateOrgArgs = {
  orgInfo: CreateOrgInput;
};


export type MutationCreateAmPolicyArgs = {
  policyInfo: CreateAmPolicyInput;
};


export type MutationCreateAmPermissionArgs = {
  permissionInfo: CreateAmPermissionInput;
};


export type MutationCreateAmPermissionActionArgs = {
  permssionActionInfo: CreateAmPermissionActionInput;
};


export type MutationCreateAmGroupArgs = {
  amGroupInfo: CreateAmGroupInput;
};


export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
};


export type MutationRemoveAmPoliciesArgs = {
  deleteAMPoliciesInput?: Maybe<DeleteAmPoliciesInput>;
};


export type MutationRemoveAmPolicyArgs = {
  policySid: Scalars['ID'];
};


export type MutationRemoveAmPermissionsArgs = {
  deleteAMPermissionsInput?: Maybe<DeleteAmPermissionsInput>;
};


export type MutationRemoveAmPermissionArgs = {
  permissionSid: Scalars['ID'];
};


export type MutationRemoveAmPermissionActionsArgs = {
  deleteAMPermissionActionsInput?: Maybe<DeleteAmPermissionActionsInput>;
};


export type MutationRemoveAmPermissionActionArgs = {
  permissionActionSid: Scalars['ID'];
};


export type MutationUpdateAmPolicyArgs = {
  updateAMPolicyInput?: Maybe<UpdateAmPolicyInput>;
};


export type MutationUpdateAmPermissionArgs = {
  updateAMPermissionInput?: Maybe<UpdateAmPermissionInput>;
};


export type MutationUpdateAmPermissionActionArgs = {
  updateAMPermissionActionInput?: Maybe<UpdateAmPermissionActionInput>;
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

export type TokenUser = {
  __typename?: 'TokenUser';
  token?: Maybe<Scalars['String']>;
  session?: Maybe<UserSession>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  orgId: Scalars['ID'];
  userId: Scalars['String'];
  defaultAuthorities?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum LoginStepType {
  Username = 'USERNAME',
  Password = 'PASSWORD',
  Complete = 'COMPLETE'
}

export type AmPasswordConfigInput = {
  allowForgotten?: Maybe<Scalars['Boolean']>;
  orgUnitOwner?: Maybe<Scalars['ID']>;
};

export type DateTimeRangeInput = {
  rangeStart: Scalars['DateTime'];
  rangeEnd: Scalars['DateTime'];
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

export type StatCountType = {
  __typename?: 'StatCountType';
  value?: Maybe<Scalars['Int']>;
};

export type ArchiveFileType = {
  __typename?: 'ArchiveFileType';
  value: Scalars['String'];
  label?: Maybe<Scalars['String']>;
};

export type RecordCounts = {
  __typename?: 'RecordCounts';
  totalCount?: Maybe<Scalars['Int']>;
  showUser?: Maybe<Scalars['Boolean']>;
  recordCount?: Maybe<Array<Maybe<RecordCount>>>;
};

export type RecordCount = {
  __typename?: 'RecordCount';
  name: Scalars['String'];
  count: Scalars['Int'];
};

export type ExtractParameters = {
  __typename?: 'ExtractParameters';
  originalParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
  overriddenParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
  derivedParameter?: Maybe<Array<Maybe<ExtractParameter>>>;
};

export type ExtractParameter = {
  __typename?: 'ExtractParameter';
  label?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  value?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type QualityChecks = {
  __typename?: 'QualityChecks';
  sequenceCreationEvent?: Maybe<Array<Maybe<SequenceCreationEvent>>>;
};

export type SequenceCreationEvent = {
  __typename?: 'SequenceCreationEvent';
  context?: Maybe<Scalars['String']>;
  unitId?: Maybe<Scalars['String']>;
  recordCreationEvent?: Maybe<Array<Maybe<RecordCreationEvent>>>;
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

export type FieldCreationEvent = {
  __typename?: 'FieldCreationEvent';
  message?: Maybe<Array<Maybe<Scalars['String']>>>;
  name?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  rawValue?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
};

export type DashboardPeriods = {
  __typename?: 'DashboardPeriods';
  dailyCounts?: Maybe<DashboardPeriodCounts>;
  yesterdayCounts?: Maybe<DashboardPeriodCounts>;
  monthlyCounts?: Maybe<DashboardPeriodCounts>;
  lastMonthlyCounts?: Maybe<DashboardPeriodCounts>;
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

export type DashboardPeriodCount = {
  __typename?: 'DashboardPeriodCount';
  name?: Maybe<Scalars['String']>;
  secondaryDescr?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export type WorkPacketStatusFilter = {
  excludedEnvs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

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

export type EnrollmentStat = {
  __typename?: 'EnrollmentStat';
  insuredStat?: Maybe<InsuredStat>;
  excludedInsuredStat?: Maybe<InsuredStat>;
  excludedPlanInsuredStat?: Maybe<Array<Maybe<PlanInsuredStat>>>;
  planInsuredStat?: Maybe<Array<Maybe<PlanInsuredStat>>>;
};

export type InsuredStat = {
  __typename?: 'InsuredStat';
  subscribers?: Maybe<InsuredStatCount>;
  dependents?: Maybe<InsuredStatCount>;
};

export type PlanInsuredStat = {
  __typename?: 'PlanInsuredStat';
  planCode?: Maybe<Scalars['String']>;
  planType?: Maybe<Scalars['String']>;
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

export type StatInt = {
  __typename?: 'StatInt';
  prior?: Maybe<Scalars['Int']>;
  value?: Maybe<Scalars['Int']>;
};

export type PasswordPage = {
  __typename?: 'PasswordPage';
  ruleGroup: PasswordRuleGroup;
};

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

export type PasswordLengthRule = {
  __typename?: 'PasswordLengthRule';
  minLength?: Maybe<Scalars['Int']>;
  maxLength?: Maybe<Scalars['Int']>;
};

export type PasswordWhitespaceRule = {
  __typename?: 'PasswordWhitespaceRule';
  allowedWhitespace?: Maybe<WhitespaceRuleType>;
};

export type PasswordCharacterRule = {
  __typename?: 'PasswordCharacterRule';
  characterType?: Maybe<PasswordCharacterType>;
  numberOfCharacters?: Maybe<Scalars['Int']>;
};

export type PasswordStrengthRule = {
  __typename?: 'PasswordStrengthRule';
  requiredStrengthLevel: Scalars['Int'];
};

export enum WhitespaceRuleType {
  None = 'NONE'
}

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL'
}

export type PasswordRule = PasswordLengthRule | PasswordWhitespaceRule | PasswordCharacterRule | PasswordStrengthRule | PasswordRuleGroup;

export type AmPolicyPage = {
  __typename?: 'AMPolicyPage';
  /** The services availble for permission actions */
  permissionServices?: Maybe<Array<Maybe<CdxServiceNvp>>>;
  /** Avaliable Predicates for this policy's permissions note a policy does not need a predicate */
  predicates?: Maybe<Array<Maybe<PermissionPredicateNvp>>>;
  /** can this policy be configured as a template */
  showTemplateSection?: Maybe<Scalars['Boolean']>;
  /** The service archtype for this template */
  templateServices?: Maybe<Array<Maybe<CdxServiceNvp>>>;
  permissionEffectNVPs?: Maybe<Array<Maybe<PermissionEffectNvp>>>;
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

export enum PermissionVerb {
  All = 'ALL',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
  List = 'LIST',
  Download = 'DOWNLOAD',
  Restart = 'RESTART',
  Assign = 'ASSIGN'
}

export type PermissionVerbNvp = {
  __typename?: 'PermissionVerbNVP';
  name: Scalars['String'];
  value: PermissionVerb;
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

export type WebAppDomain = {
  __typename?: 'WebAppDomain';
  type: CdxWebAppDomain;
  /** selectedPage: either the page to load - must be in teh navItems */
  selectedPage?: Maybe<CdxWebPage>;
  /** navItems: either the left nav or top nav depending on the domain */
  navItems?: Maybe<Array<Maybe<WebNav>>>;
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

export type WebPivot = {
  __typename?: 'WebPivot';
  label?: Maybe<Scalars['String']>;
  type: CdxWebPivot;
};

export type NvpStr = {
  __typename?: 'NVPStr';
  name: Scalars['String'];
  value: Scalars['String'];
};

export type NvpId = {
  __typename?: 'NVPId';
  name: Scalars['String'];
  value: Scalars['ID'];
};

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
  AddUser = 'ADD_USER'
}

export enum CdxWebAppDomain {
  Dashboard = 'DASHBOARD',
  Organization = 'ORGANIZATION'
}

export enum CdxWebPivot {
  Activity = 'ACTIVITY',
  InProgress = 'IN_PROGRESS'
}

export type Nvp = NvpStr | NvpId;

export type CreateOrgInput = {
  orgId: Scalars['String'];
  orgName: Scalars['String'];
  orgType: OrgType;
  orgOwnerId?: Maybe<Scalars['ID']>;
};

export type Organization = {
  __typename?: 'Organization';
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  orgId: Scalars['String'];
  orgType: OrgType;
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

export type CreateAmPolicyInput = {
  name: Scalars['String'];
  orgOwnerId: Scalars['ID'];
  permissions?: Maybe<Array<Maybe<CreateAmPermissionInput>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
};

export type CreateAmPermissionInput = {
  policySid?: Maybe<Scalars['ID']>;
  effect: PermissionEffect;
  actions?: Maybe<Array<Maybe<CreateAmPermissionActionInput>>>;
  predicate?: Maybe<PermissionPredicate>;
  predVar1?: Maybe<Scalars['String']>;
  predParam1?: Maybe<Scalars['String']>;
};

export type CreateAmPermissionActionInput = {
  permissionSid?: Maybe<Scalars['ID']>;
  service: CdxService;
  facet: CdxFacet;
  verb: PermissionVerb;
};

export enum PermissionEffect {
  Allow = 'ALLOW',
  Deny = 'DENY'
}

export type PermissionEffectNvp = {
  __typename?: 'PermissionEffectNVP';
  name: Scalars['String'];
  value: PermissionEffect;
};

export enum PermissionPredicate {
  NotKntuEnv = 'NOT_KNTU_ENV',
  StringEqualsIgnoreCase = 'STRING_EQUALS_IGNORE_CASE',
  StringNotEqualsIgnoreCase = 'STRING_NOT_EQUALS_IGNORE_CASE'
}

export type PermissionPredicateNvp = {
  __typename?: 'PermissionPredicateNVP';
  name: Scalars['String'];
  value: PermissionPredicate;
};

export type AmPolicy = {
  __typename?: 'AMPolicy';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  permissions?: Maybe<Array<Maybe<AmPermission>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
};

export type AmPermission = {
  __typename?: 'AMPermission';
  id?: Maybe<Scalars['ID']>;
  effect: PermissionEffect;
  actions?: Maybe<Array<Maybe<AmPermissionAction>>>;
  predicate?: Maybe<PermissionPredicate>;
  predVar1?: Maybe<Scalars['String']>;
  predParam1?: Maybe<Scalars['String']>;
};

export type AmPermissionAction = {
  __typename?: 'AMPermissionAction';
  id?: Maybe<Scalars['ID']>;
  service: CdxService;
  facet: CdxFacet;
  verb: PermissionVerb;
};

export type CreateAmGroupInput = {
  orgOwnerId: Scalars['ID'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
  policyIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type AmGroup = {
  __typename?: 'AMGroup';
  id?: Maybe<Scalars['ID']>;
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
  policies?: Maybe<Array<Maybe<AmPolicy>>>;
};

export type AmPolicyConnection = {
  __typename?: 'AMPolicyConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AmPolicy>>>;
};

export type AmGroupConnection = {
  __typename?: 'AMGroupConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<AmGroup>>>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  orgOwnerId: Scalars['ID'];
  groupIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreatePersonInput = {
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email: Scalars['String'];
  person?: Maybe<Person>;
};

export type Person = {
  __typename?: 'Person';
  id: Scalars['ID'];
  firstNm: Scalars['String'];
  lastNm?: Maybe<Scalars['String']>;
};

export type DeleteAmPoliciesInput = {
  policySids: Array<Maybe<Scalars['ID']>>;
};

export type DeleteAmPermissionsInput = {
  policySid: Scalars['ID'];
  permissionSids: Array<Maybe<Scalars['ID']>>;
};

export type DeleteAmPermissionActionsInput = {
  permissionSid: Scalars['ID'];
  permissionActionSids: Array<Maybe<Scalars['ID']>>;
};

export type UpdateAmPolicyInput = {
  policySid: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
};

export type UpdateAmPermissionInput = {
  policySid: Scalars['ID'];
  permissionSid: Scalars['ID'];
  effect: PermissionEffect;
  predicate?: Maybe<PermissionPredicate>;
  predVar1?: Maybe<Scalars['String']>;
  predParam1?: Maybe<Scalars['String']>;
};

export type UpdateAmPermissionActionInput = {
  permissionSid: Scalars['ID'];
  permissionActionSid: Scalars['ID'];
  service: CdxService;
  facet: CdxFacet;
  verb: PermissionVerb;
};

export type PaginationInfo = {
  __typename?: 'PaginationInfo';
  totalPages?: Maybe<Scalars['Int']>;
  totalElements?: Maybe<Scalars['Int']>;
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
};

export type PageableInput = {
  pageNumber?: Maybe<Scalars['Int']>;
  pageSize?: Maybe<Scalars['Int']>;
  sort?: Maybe<Array<Maybe<SortOrderInput>>>;
};

export type SortOrderInput = {
  direction?: Maybe<SortDirection>;
  property?: Maybe<Scalars['String']>;
  ignoreCase?: Maybe<Scalars['Boolean']>;
  nullHandling?: Maybe<NullHandling>;
};

export type UserFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
};

export type OrgFilterInput = {
  activeFilter?: Maybe<ActiveEnum>;
};

export enum SortDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum NullHandling {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST'
}

export enum ActiveEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  All = 'ALL'
}

export type OrganizationConnection = {
  __typename?: 'OrganizationConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<Organization>>>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<User>>>;
};

export type WpProcessErrorConnection = {
  __typename?: 'WPProcessErrorConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<WpProcessError>>>;
};

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

export type WpTransmissionConnection = {
  __typename?: 'WPTransmissionConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<WpTransmission>>>;
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

export type ScheduleOccurrenceConnection = {
  __typename?: 'ScheduleOccurrenceConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<ScheduleOccurrence>>>;
};

export type ScheduleOccurrence = {
  __typename?: 'ScheduleOccurrence';
  resource: Scalars['String'];
  scheduleId?: Maybe<Scalars['ID']>;
  timeScheduled?: Maybe<Scalars['DateTime']>;
  schedOccurStatus: SchedOccurStatusEnum;
  runOccurrences?: Maybe<Array<Maybe<ScheduleRunOccurrence>>>;
};

export type ScheduleRunOccurrence = {
  __typename?: 'ScheduleRunOccurrence';
  workOrderId: Scalars['String'];
  timeRan?: Maybe<Scalars['DateTime']>;
  status: SchedOccurStatusEnum;
};

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

export type PasswordLoginMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;


export type PasswordLoginMutation = (
  { __typename?: 'Mutation' }
  & { passwordLogin?: Maybe<(
    { __typename?: 'LoginStep' }
    & Pick<LoginStep, 'step'>
    & { loginCompleteDomain?: Maybe<(
      { __typename?: 'WebAppDomain' }
      & Pick<WebAppDomain, 'type' | 'selectedPage'>
      & { navItems?: Maybe<Array<Maybe<(
        { __typename?: 'WebNav' }
        & { subNavItems?: Maybe<Array<Maybe<(
          { __typename?: 'WebNav' }
          & NavItemFragmentFragment
        )>>> }
        & NavItemFragmentFragment
      )>>> }
    )>, tokenUser?: Maybe<(
      { __typename?: 'TokenUser' }
      & Pick<TokenUser, 'token'>
      & { session?: Maybe<(
        { __typename?: 'UserSession' }
        & Pick<UserSession, 'id' | 'orgId' | 'userId' | 'defaultAuthorities'>
      )> }
    )> }
  )> }
);

export type NavItemFragmentFragment = (
  { __typename?: 'WebNav' }
  & Pick<WebNav, 'label' | 'appDomain'>
  & { page?: Maybe<(
    { __typename?: 'WebPage' }
    & WebPageFragmentFragment
  )> }
);

export type WebPageFragmentFragment = (
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

export type WorkPacketStatusesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  filter?: Maybe<WorkPacketStatusFilter>;
}>;


export type WorkPacketStatusesQuery = (
  { __typename?: 'Query' }
  & { workPacketStatuses?: Maybe<Array<Maybe<(
    { __typename?: 'WorkPacketStatus' }
    & Pick<WorkPacketStatus, 'workOrderId' | 'timestamp' | 'planSponsorId' | 'detailsPath' | 'subClientPath' | 'inboundFilename' | 'vendorId' | 'step' | 'stepStatus' | 'packetStatus' | 'reprocessedBy' | 'reprocessAction' | 'populationCount' | 'recordHighlightCount' | 'recordHighlightType' | 'clientFileArchivePath' | 'vendorFileArchivePath' | 'supplementalFilesArchivePaths' | 'archiveOnly' | 'hasErrors'>
  )>>> }
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
    & { workStepStatus?: Maybe<Array<Maybe<(
      { __typename?: 'WorkStepStatus' }
      & Pick<WorkStepStatus, 'stepStatus' | 'stepName' | 'stepType'>
      & { populationCount?: Maybe<(
        { __typename?: 'StatCountType' }
        & Pick<StatCountType, 'value'>
      )>, stepFile?: Maybe<Array<Maybe<(
        { __typename?: 'ArchiveFileType' }
        & Pick<ArchiveFileType, 'value' | 'label'>
      )>>>, nvp?: Maybe<Array<Maybe<(
        { __typename?: 'NVPStr' }
        & Pick<NvpStr, 'name' | 'value'>
      )>>>, recordCounts?: Maybe<(
        { __typename?: 'RecordCounts' }
        & RecordCountsFragmentFragment
      )> }
    )>>>, deliveredFile?: Maybe<(
      { __typename?: 'DeliveredFile' }
      & Pick<DeliveredFile, 'filename' | 'fileSizeInBytes' | 'textSizeInBytes' | 'timeDelivered'>
      & { ftp?: Maybe<(
        { __typename?: 'DeliveredFileFTP' }
        & Pick<DeliveredFileFtp, 'protocol' | 'host' | 'username' | 'folder' | 'port'>
      )>, kcurl?: Maybe<(
        { __typename?: 'DeliveredKCURL' }
        & Pick<DeliveredKcurl, 'url'>
      )> }
    )>, extractParameters?: Maybe<(
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
    & StatIntFragmentFragment
  )>, ended?: Maybe<(
    { __typename?: 'StatInt' }
    & StatIntFragmentFragment
  )> }
);

export type StatIntFragmentFragment = (
  { __typename?: 'StatInt' }
  & Pick<StatInt, 'prior' | 'value'>
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
      & DashPeriodCountsFragmentFragment
    )>, yesterdayCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & DashPeriodCountsFragmentFragment
    )>, monthlyCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & DashPeriodCountsFragmentFragment
    )>, lastMonthlyCounts?: Maybe<(
      { __typename?: 'DashboardPeriodCounts' }
      & DashPeriodCountsFragmentFragment
    )> }
  )> }
);

export type DashPeriodCountsFragmentFragment = (
  { __typename?: 'DashboardPeriodCounts' }
  & Pick<DashboardPeriodCounts, 'transmissionCount' | 'billingUnitCount' | 'processErrorCount'>
  & { vendorTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, vendorTransmissionsBySpec?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, planSponsorTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, fileTransmissions?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, vendorProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, planSponsorProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>>, fileProcessErrors?: Maybe<Array<Maybe<(
    { __typename?: 'DashboardPeriodCount' }
    & DashPeriodCountFragmentFragment
  )>>> }
);

export type DashPeriodCountFragmentFragment = (
  { __typename?: 'DashboardPeriodCount' }
  & Pick<DashboardPeriodCount, 'name' | 'secondaryDescr' | 'count' | 'total'>
);

export type AmPolicyPageQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type AmPolicyPageQuery = (
  { __typename?: 'Query' }
  & { amPolicyPage?: Maybe<(
    { __typename?: 'AMPolicyPage' }
    & Pick<AmPolicyPage, 'showTemplateSection'>
    & { permissionServices?: Maybe<Array<Maybe<(
      { __typename?: 'CDXServiceNVP' }
      & Pick<CdxServiceNvp, 'name' | 'value'>
    )>>>, predicates?: Maybe<Array<Maybe<(
      { __typename?: 'PermissionPredicateNVP' }
      & Pick<PermissionPredicateNvp, 'name' | 'value'>
    )>>>, templateServices?: Maybe<Array<Maybe<(
      { __typename?: 'CDXServiceNVP' }
      & Pick<CdxServiceNvp, 'name' | 'value'>
    )>>>, permissionEffectNVPs?: Maybe<Array<Maybe<(
      { __typename?: 'PermissionEffectNVP' }
      & Pick<PermissionEffectNvp, 'name' | 'value'>
    )>>> }
  )> }
);

export type AmPolicyFacetsForServiceQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
}>;


export type AmPolicyFacetsForServiceQuery = (
  { __typename?: 'Query' }
  & { amPolicyFacetsForService?: Maybe<Array<Maybe<(
    { __typename?: 'CDXFacetNVP' }
    & Pick<CdxFacetNvp, 'name' | 'value'>
  )>>> }
);

export type AmPolicyVerbForFacetQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
  cdxFacet: CdxFacet;
}>;


export type AmPolicyVerbForFacetQuery = (
  { __typename?: 'Query' }
  & { amPolicyVerbForFacet?: Maybe<Array<Maybe<(
    { __typename?: 'PermissionVerbNVP' }
    & Pick<PermissionVerbNvp, 'name' | 'value'>
  )>>> }
);

export type CreateOrgMutationVariables = Exact<{
  orgInfo: CreateOrgInput;
}>;


export type CreateOrgMutation = (
  { __typename?: 'Mutation' }
  & { createOrg?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'orgId' | 'orgType'>
  )> }
);

export type CreateAmPolicyMutationVariables = Exact<{
  policyInfo: CreateAmPolicyInput;
}>;


export type CreateAmPolicyMutation = (
  { __typename?: 'Mutation' }
  & { createAMPolicy?: Maybe<(
    { __typename?: 'AMPolicy' }
    & PolicyFragmentFragment
  )> }
);

export type PolicyFragmentFragment = (
  { __typename?: 'AMPolicy' }
  & Pick<AmPolicy, 'id' | 'name' | 'tmpl' | 'tmplUseAsIs'>
  & { permissions?: Maybe<Array<Maybe<(
    { __typename?: 'AMPermission' }
    & Pick<AmPermission, 'id' | 'effect' | 'predicate' | 'predVar1' | 'predParam1'>
    & { actions?: Maybe<Array<Maybe<(
      { __typename?: 'AMPermissionAction' }
      & Pick<AmPermissionAction, 'id' | 'service' | 'facet' | 'verb'>
    )>>> }
  )>>> }
);

export type CreateAmGroupMutationVariables = Exact<{
  amGroupInfo: CreateAmGroupInput;
}>;


export type CreateAmGroupMutation = (
  { __typename?: 'Mutation' }
  & { createAMGroup?: Maybe<(
    { __typename?: 'AMGroup' }
    & Pick<AmGroup, 'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs'>
    & { policies?: Maybe<Array<Maybe<(
      { __typename?: 'AMPolicy' }
      & Pick<AmPolicy, 'id' | 'name'>
    )>>> }
  )> }
);

export type SystemTemplateAmGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type SystemTemplateAmGroupByNameQuery = (
  { __typename?: 'Query' }
  & { systemTemplateAMGroupByName?: Maybe<Array<Maybe<(
    { __typename?: 'AMGroup' }
    & Pick<AmGroup, 'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'tmplServiceType'>
  )>>> }
);

export type CreateUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email'>
    & { person?: Maybe<(
      { __typename?: 'Person' }
      & Pick<Person, 'firstNm' | 'lastNm'>
    )> }
  )> }
);

export type AmPoliciesForOrgPQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;


export type AmPoliciesForOrgPQuery = (
  { __typename?: 'Query' }
  & { amPoliciesForOrg?: Maybe<(
    { __typename?: 'AMPolicyConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'AMPolicy' }
      & Pick<AmPolicy, 'id' | 'name' | 'tmpl'>
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
    & Pick<Organization, 'id' | 'orgId' | 'orgType'>
  )>>> }
);

export type AmGroupsForOrgPQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;


export type AmGroupsForOrgPQuery = (
  { __typename?: 'Query' }
  & { amGroupsForOrg?: Maybe<(
    { __typename?: 'AMGroupConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'AMGroup' }
      & Pick<AmGroup, 'id' | 'name' | 'tmpl'>
    )>>> }
  )> }
);

export type UsersForOrgFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type UsersForOrgFpQuery = (
  { __typename?: 'Query' }
  & { usersForOrg?: Maybe<(
    { __typename?: 'UserConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email'>
      & { person?: Maybe<(
        { __typename?: 'Person' }
        & Pick<Person, 'firstNm' | 'lastNm'>
      )> }
    )>>> }
  )> }
);

export type DirectOrganizationsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;


export type DirectOrganizationsQuery = (
  { __typename?: 'Query' }
  & { directOrganizations?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>
    )>>> }
  )> }
);

export type DirectOrganizationsFQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
}>;


export type DirectOrganizationsFQuery = (
  { __typename?: 'Query' }
  & { directOrganizations?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>
    )>>> }
  )> }
);

export type DirectOrganizationsFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;


export type DirectOrganizationsFpQuery = (
  { __typename?: 'Query' }
  & { directOrganizations?: Maybe<(
    { __typename?: 'OrganizationConnection' }
    & { paginationInfo: (
      { __typename?: 'PaginationInfo' }
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'Organization' }
      & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>
    )>>> }
  )> }
);

export type PaginationInfoFragmentFragment = (
  { __typename?: 'PaginationInfo' }
  & Pick<PaginationInfo, 'totalPages' | 'totalElements' | 'pageNumber' | 'pageSize'>
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
      & PaginationInfoFragmentFragment
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
      & PaginationInfoFragmentFragment
    ), nodes?: Maybe<Array<Maybe<(
      { __typename?: 'WPTransmission' }
      & Pick<WpTransmission, 'id' | 'workOrderId' | 'deliveredOn' | 'planSponsorId' | 'vendorId' | 'specId' | 'implementation' | 'inboundFilename' | 'outboundFilename' | 'outboundFilesize' | 'billingCount' | 'totalRecords' | 'extractType' | 'extractVersion'>
    )>>> }
  )> }
);

export type AmPolicyQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
}>;


export type AmPolicyQuery = (
  { __typename?: 'Query' }
  & { amPolicy?: Maybe<(
    { __typename?: 'AMPolicy' }
    & Pick<AmPolicy, 'id' | 'name' | 'tmpl' | 'tmplUseAsIs' | 'tmplServiceType'>
    & { permissions?: Maybe<Array<Maybe<(
      { __typename?: 'AMPermission' }
      & Pick<AmPermission, 'id' | 'effect' | 'predicate' | 'predVar1' | 'predParam1'>
      & { actions?: Maybe<Array<Maybe<(
        { __typename?: 'AMPermissionAction' }
        & Pick<AmPermissionAction, 'id' | 'service' | 'facet' | 'verb'>
      )>>> }
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
      & PaginationInfoFragmentFragment
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

export type UpdateAmPermissionActionMutationVariables = Exact<{
  updateAMPermissionActionInput?: Maybe<UpdateAmPermissionActionInput>;
}>;


export type UpdateAmPermissionActionMutation = (
  { __typename?: 'Mutation' }
  & { updateAMPermissionAction?: Maybe<(
    { __typename?: 'AMPermissionAction' }
    & Pick<AmPermissionAction, 'id' | 'service' | 'facet' | 'verb'>
  )> }
);

export type OrgByIdQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgId: Scalars['String'];
}>;


export type OrgByIdQuery = (
  { __typename?: 'Query' }
  & { orgById?: Maybe<(
    { __typename?: 'Organization' }
    & Pick<Organization, 'id' | 'name' | 'orgId' | 'orgType'>
  )> }
);

export type RemoveAmPolicyMutationVariables = Exact<{
  policySid: Scalars['ID'];
}>;


export type RemoveAmPolicyMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAMPolicy'>
);

export type RemoveAmPoliciesMutationVariables = Exact<{
  deleteAMPoliciesInput: DeleteAmPoliciesInput;
}>;


export type RemoveAmPoliciesMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAMPolicies'>
);

export type CreateAmPermissionMutationVariables = Exact<{
  permissionInfo: CreateAmPermissionInput;
}>;


export type CreateAmPermissionMutation = (
  { __typename?: 'Mutation' }
  & { createAMPermission?: Maybe<(
    { __typename?: 'AMPermission' }
    & Pick<AmPermission, 'id' | 'effect'>
    & { actions?: Maybe<Array<Maybe<(
      { __typename?: 'AMPermissionAction' }
      & Pick<AmPermissionAction, 'id' | 'service' | 'facet' | 'verb'>
    )>>> }
  )> }
);

export type UpdateAmPermissionMutationVariables = Exact<{
  updateAMPermissionInput?: Maybe<UpdateAmPermissionInput>;
}>;


export type UpdateAmPermissionMutation = (
  { __typename?: 'Mutation' }
  & { updateAMPermission?: Maybe<(
    { __typename?: 'AMPermission' }
    & Pick<AmPermission, 'id' | 'effect' | 'predicate' | 'predVar1' | 'predParam1'>
  )> }
);

export type RemoveAmPermissionMutationVariables = Exact<{
  permissionSid: Scalars['ID'];
}>;


export type RemoveAmPermissionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAMPermission'>
);

export type UpdateAmPolicyMutationVariables = Exact<{
  updateAMPolicyInput: UpdateAmPolicyInput;
}>;


export type UpdateAmPolicyMutation = (
  { __typename?: 'Mutation' }
  & { updateAMPolicy?: Maybe<(
    { __typename?: 'AMPolicy' }
    & Pick<AmPolicy, 'id' | 'name' | 'tmpl' | 'tmplUseAsIs' | 'tmplServiceType'>
  )> }
);

export type RemoveAmPermissionActionMutationVariables = Exact<{
  permissionActionSid: Scalars['ID'];
}>;


export type RemoveAmPermissionActionMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'removeAMPermissionAction'>
);

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
    ${UnionNvpFragmentDoc}`;
export const NavItemFragmentFragmentDoc = gql`
    fragment navItemFragment on WebNav {
  label
  page {
    ...webPageFragment
  }
  appDomain
}
    ${WebPageFragmentFragmentDoc}`;
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
    ${StatIntFragmentFragmentDoc}`;
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
    ${DashPeriodCountFragmentFragmentDoc}`;
export const PolicyFragmentFragmentDoc = gql`
    fragment policyFragment on AMPolicy {
  id
  name
  tmpl
  tmplUseAsIs
  permissions {
    id
    effect
    predicate
    predVar1
    predParam1
    actions {
      id
      service
      facet
      verb
    }
  }
}
    `;
export const PaginationInfoFragmentFragmentDoc = gql`
    fragment paginationInfoFragment on PaginationInfo {
  totalPages
  totalElements
  pageNumber
  pageSize
}
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
export function useBeginLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>) {
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
        userId
        defaultAuthorities
      }
    }
  }
}
    ${NavItemFragmentFragmentDoc}`;
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
export function useWorkPacketStatusesQuery(baseOptions: Apollo.QueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>) {
        return Apollo.useQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(WorkPacketStatusesDocument, baseOptions);
      }
export function useWorkPacketStatusesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>) {
          return Apollo.useLazyQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(WorkPacketStatusesDocument, baseOptions);
        }
export type WorkPacketStatusesQueryHookResult = ReturnType<typeof useWorkPacketStatusesQuery>;
export type WorkPacketStatusesLazyQueryHookResult = ReturnType<typeof useWorkPacketStatusesLazyQuery>;
export type WorkPacketStatusesQueryResult = Apollo.QueryResult<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>;
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
    ${DashPeriodCountsFragmentFragmentDoc}`;

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
export const AmPolicyPageDocument = gql`
    query AMPolicyPage($orgSid: ID!) {
  amPolicyPage(orgSid: $orgSid) {
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
    permissionEffectNVPs {
      name
      value
    }
  }
}
    `;

/**
 * __useAmPolicyPageQuery__
 *
 * To run a query within a React component, call `useAmPolicyPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmPolicyPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmPolicyPageQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *   },
 * });
 */
export function useAmPolicyPageQuery(baseOptions: Apollo.QueryHookOptions<AmPolicyPageQuery, AmPolicyPageQueryVariables>) {
        return Apollo.useQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, baseOptions);
      }
export function useAmPolicyPageLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyPageQuery, AmPolicyPageQueryVariables>) {
          return Apollo.useLazyQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, baseOptions);
        }
export type AmPolicyPageQueryHookResult = ReturnType<typeof useAmPolicyPageQuery>;
export type AmPolicyPageLazyQueryHookResult = ReturnType<typeof useAmPolicyPageLazyQuery>;
export type AmPolicyPageQueryResult = Apollo.QueryResult<AmPolicyPageQuery, AmPolicyPageQueryVariables>;
export const AmPolicyFacetsForServiceDocument = gql`
    query AMPolicyFacetsForService($orgSid: ID!, $cdxService: CDXService!) {
  amPolicyFacetsForService(orgSid: $orgSid, cdxService: $cdxService) {
    name
    value
  }
}
    `;

/**
 * __useAmPolicyFacetsForServiceQuery__
 *
 * To run a query within a React component, call `useAmPolicyFacetsForServiceQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmPolicyFacetsForServiceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmPolicyFacetsForServiceQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      cdxService: // value for 'cdxService'
 *   },
 * });
 */
export function useAmPolicyFacetsForServiceQuery(baseOptions: Apollo.QueryHookOptions<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>) {
        return Apollo.useQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(AmPolicyFacetsForServiceDocument, baseOptions);
      }
export function useAmPolicyFacetsForServiceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>) {
          return Apollo.useLazyQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(AmPolicyFacetsForServiceDocument, baseOptions);
        }
export type AmPolicyFacetsForServiceQueryHookResult = ReturnType<typeof useAmPolicyFacetsForServiceQuery>;
export type AmPolicyFacetsForServiceLazyQueryHookResult = ReturnType<typeof useAmPolicyFacetsForServiceLazyQuery>;
export type AmPolicyFacetsForServiceQueryResult = Apollo.QueryResult<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>;
export const AmPolicyVerbForFacetDocument = gql`
    query AMPolicyVerbForFacet($orgSid: ID!, $cdxService: CDXService!, $cdxFacet: CDXFacet!) {
  amPolicyVerbForFacet(
    orgSid: $orgSid
    cdxService: $cdxService
    cdxFacet: $cdxFacet
  ) {
    name
    value
  }
}
    `;

/**
 * __useAmPolicyVerbForFacetQuery__
 *
 * To run a query within a React component, call `useAmPolicyVerbForFacetQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmPolicyVerbForFacetQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmPolicyVerbForFacetQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      cdxService: // value for 'cdxService'
 *      cdxFacet: // value for 'cdxFacet'
 *   },
 * });
 */
export function useAmPolicyVerbForFacetQuery(baseOptions: Apollo.QueryHookOptions<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>) {
        return Apollo.useQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(AmPolicyVerbForFacetDocument, baseOptions);
      }
export function useAmPolicyVerbForFacetLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>) {
          return Apollo.useLazyQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(AmPolicyVerbForFacetDocument, baseOptions);
        }
export type AmPolicyVerbForFacetQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetQuery>;
export type AmPolicyVerbForFacetLazyQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetLazyQuery>;
export type AmPolicyVerbForFacetQueryResult = Apollo.QueryResult<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>;
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
export function useCreateOrgMutation(baseOptions?: Apollo.MutationHookOptions<CreateOrgMutation, CreateOrgMutationVariables>) {
        return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, baseOptions);
      }
export type CreateOrgMutationHookResult = ReturnType<typeof useCreateOrgMutation>;
export type CreateOrgMutationResult = Apollo.MutationResult<CreateOrgMutation>;
export type CreateOrgMutationOptions = Apollo.BaseMutationOptions<CreateOrgMutation, CreateOrgMutationVariables>;
export const CreateAmPolicyDocument = gql`
    mutation CreateAMPolicy($policyInfo: CreateAMPolicyInput!) {
  createAMPolicy(policyInfo: $policyInfo) {
    ...policyFragment
  }
}
    ${PolicyFragmentFragmentDoc}`;
export type CreateAmPolicyMutationFn = Apollo.MutationFunction<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>;

/**
 * __useCreateAmPolicyMutation__
 *
 * To run a mutation, you first call `useCreateAmPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAmPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAmPolicyMutation, { data, loading, error }] = useCreateAmPolicyMutation({
 *   variables: {
 *      policyInfo: // value for 'policyInfo'
 *   },
 * });
 */
export function useCreateAmPolicyMutation(baseOptions?: Apollo.MutationHookOptions<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>) {
        return Apollo.useMutation<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>(CreateAmPolicyDocument, baseOptions);
      }
export type CreateAmPolicyMutationHookResult = ReturnType<typeof useCreateAmPolicyMutation>;
export type CreateAmPolicyMutationResult = Apollo.MutationResult<CreateAmPolicyMutation>;
export type CreateAmPolicyMutationOptions = Apollo.BaseMutationOptions<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>;
export const CreateAmGroupDocument = gql`
    mutation CreateAMGroup($amGroupInfo: CreateAMGroupInput!) {
  createAMGroup(amGroupInfo: $amGroupInfo) {
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
export type CreateAmGroupMutationFn = Apollo.MutationFunction<CreateAmGroupMutation, CreateAmGroupMutationVariables>;

/**
 * __useCreateAmGroupMutation__
 *
 * To run a mutation, you first call `useCreateAmGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAmGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAmGroupMutation, { data, loading, error }] = useCreateAmGroupMutation({
 *   variables: {
 *      amGroupInfo: // value for 'amGroupInfo'
 *   },
 * });
 */
export function useCreateAmGroupMutation(baseOptions?: Apollo.MutationHookOptions<CreateAmGroupMutation, CreateAmGroupMutationVariables>) {
        return Apollo.useMutation<CreateAmGroupMutation, CreateAmGroupMutationVariables>(CreateAmGroupDocument, baseOptions);
      }
export type CreateAmGroupMutationHookResult = ReturnType<typeof useCreateAmGroupMutation>;
export type CreateAmGroupMutationResult = Apollo.MutationResult<CreateAmGroupMutation>;
export type CreateAmGroupMutationOptions = Apollo.BaseMutationOptions<CreateAmGroupMutation, CreateAmGroupMutationVariables>;
export const SystemTemplateAmGroupByNameDocument = gql`
    query SystemTemplateAMGroupByName($name: String!) {
  systemTemplateAMGroupByName(name: $name) {
    id
    name
    description
    tmpl
    tmplUseAsIs
    tmplServiceType
  }
}
    `;

/**
 * __useSystemTemplateAmGroupByNameQuery__
 *
 * To run a query within a React component, call `useSystemTemplateAmGroupByNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useSystemTemplateAmGroupByNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSystemTemplateAmGroupByNameQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useSystemTemplateAmGroupByNameQuery(baseOptions: Apollo.QueryHookOptions<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>) {
        return Apollo.useQuery<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>(SystemTemplateAmGroupByNameDocument, baseOptions);
      }
export function useSystemTemplateAmGroupByNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>) {
          return Apollo.useLazyQuery<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>(SystemTemplateAmGroupByNameDocument, baseOptions);
        }
export type SystemTemplateAmGroupByNameQueryHookResult = ReturnType<typeof useSystemTemplateAmGroupByNameQuery>;
export type SystemTemplateAmGroupByNameLazyQueryHookResult = ReturnType<typeof useSystemTemplateAmGroupByNameLazyQuery>;
export type SystemTemplateAmGroupByNameQueryResult = Apollo.QueryResult<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($userInfo: CreateUserInput!, $personInfo: CreatePersonInput!) {
  createUser(userInfo: $userInfo, personInfo: $personInfo) {
    id
    email
    person {
      firstNm
      lastNm
    }
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
export const AmPoliciesForOrgPDocument = gql`
    query AMPoliciesForOrgP($orgSid: ID!, $pageableInput: PageableInput) {
  amPoliciesForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

/**
 * __useAmPoliciesForOrgPQuery__
 *
 * To run a query within a React component, call `useAmPoliciesForOrgPQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmPoliciesForOrgPQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmPoliciesForOrgPQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useAmPoliciesForOrgPQuery(baseOptions: Apollo.QueryHookOptions<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>) {
        return Apollo.useQuery<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>(AmPoliciesForOrgPDocument, baseOptions);
      }
export function useAmPoliciesForOrgPLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>) {
          return Apollo.useLazyQuery<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>(AmPoliciesForOrgPDocument, baseOptions);
        }
export type AmPoliciesForOrgPQueryHookResult = ReturnType<typeof useAmPoliciesForOrgPQuery>;
export type AmPoliciesForOrgPLazyQueryHookResult = ReturnType<typeof useAmPoliciesForOrgPLazyQuery>;
export type AmPoliciesForOrgPQueryResult = Apollo.QueryResult<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>;
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
export function useTopLevelOrgsByTypeQuery(baseOptions: Apollo.QueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>) {
        return Apollo.useQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(TopLevelOrgsByTypeDocument, baseOptions);
      }
export function useTopLevelOrgsByTypeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>) {
          return Apollo.useLazyQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(TopLevelOrgsByTypeDocument, baseOptions);
        }
export type TopLevelOrgsByTypeQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeQuery>;
export type TopLevelOrgsByTypeLazyQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeLazyQuery>;
export type TopLevelOrgsByTypeQueryResult = Apollo.QueryResult<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>;
export const AmGroupsForOrgPDocument = gql`
    query AMGroupsForOrgP($orgSid: ID!, $pageableInput: PageableInput) {
  amGroupsForOrg(orgSid: $orgSid, pageableInput: $pageableInput) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

/**
 * __useAmGroupsForOrgPQuery__
 *
 * To run a query within a React component, call `useAmGroupsForOrgPQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmGroupsForOrgPQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmGroupsForOrgPQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      pageableInput: // value for 'pageableInput'
 *   },
 * });
 */
export function useAmGroupsForOrgPQuery(baseOptions: Apollo.QueryHookOptions<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>) {
        return Apollo.useQuery<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>(AmGroupsForOrgPDocument, baseOptions);
      }
export function useAmGroupsForOrgPLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>) {
          return Apollo.useLazyQuery<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>(AmGroupsForOrgPDocument, baseOptions);
        }
export type AmGroupsForOrgPQueryHookResult = ReturnType<typeof useAmGroupsForOrgPQuery>;
export type AmGroupsForOrgPLazyQueryHookResult = ReturnType<typeof useAmGroupsForOrgPLazyQuery>;
export type AmGroupsForOrgPQueryResult = Apollo.QueryResult<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>;
export const UsersForOrgFpDocument = gql`
    query UsersForOrgFP($orgSid: ID!, $userFilter: UserFilterInput, $pageableInput: PageableInput) {
  usersForOrg(
    orgSid: $orgSid
    userFilter: $userFilter
    pageableInput: $pageableInput
  ) {
    paginationInfo {
      ...paginationInfoFragment
    }
    nodes {
      id
      email
      person {
        firstNm
        lastNm
      }
    }
  }
}
    ${PaginationInfoFragmentFragmentDoc}`;

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
export function useUsersForOrgFpQuery(baseOptions: Apollo.QueryHookOptions<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>) {
        return Apollo.useQuery<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>(UsersForOrgFpDocument, baseOptions);
      }
export function useUsersForOrgFpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
export function useDirectOrganizationsQuery(baseOptions: Apollo.QueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>) {
        return Apollo.useQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(DirectOrganizationsDocument, baseOptions);
      }
export function useDirectOrganizationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>) {
          return Apollo.useLazyQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(DirectOrganizationsDocument, baseOptions);
        }
export type DirectOrganizationsQueryHookResult = ReturnType<typeof useDirectOrganizationsQuery>;
export type DirectOrganizationsLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsLazyQuery>;
export type DirectOrganizationsQueryResult = Apollo.QueryResult<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>;
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
export function useDirectOrganizationsFQuery(baseOptions: Apollo.QueryHookOptions<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>) {
        return Apollo.useQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(DirectOrganizationsFDocument, baseOptions);
      }
export function useDirectOrganizationsFLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>) {
          return Apollo.useLazyQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(DirectOrganizationsFDocument, baseOptions);
        }
export type DirectOrganizationsFQueryHookResult = ReturnType<typeof useDirectOrganizationsFQuery>;
export type DirectOrganizationsFLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsFLazyQuery>;
export type DirectOrganizationsFQueryResult = Apollo.QueryResult<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>;
export const DirectOrganizationsFpDocument = gql`
    query DirectOrganizationsFP($orgSid: ID!, $orgFilter: OrgFilterInput, $pageableInput: PageableInput) {
  directOrganizations(
    orgSid: $orgSid
    orgFilter: $orgFilter
    pageableInput: $pageableInput
  ) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
export function useDirectOrganizationsFpQuery(baseOptions: Apollo.QueryHookOptions<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>) {
        return Apollo.useQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(DirectOrganizationsFpDocument, baseOptions);
      }
export function useDirectOrganizationsFpLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>) {
          return Apollo.useLazyQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(DirectOrganizationsFpDocument, baseOptions);
        }
export type DirectOrganizationsFpQueryHookResult = ReturnType<typeof useDirectOrganizationsFpQuery>;
export type DirectOrganizationsFpLazyQueryHookResult = ReturnType<typeof useDirectOrganizationsFpLazyQuery>;
export type DirectOrganizationsFpQueryResult = Apollo.QueryResult<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>;
export const WpProcessErrorsDocument = gql`
    query WPProcessErrors($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  wpProcessErrors(
    orgSid: $orgSid
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
    query WPTransmissions($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  wpTransmissions(
    orgSid: $orgSid
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
export const AmPolicyDocument = gql`
    query AMPolicy($orgSid: ID!, $policySid: ID!) {
  amPolicy(orgSid: $orgSid, policySid: $policySid) {
    id
    name
    permissions {
      id
      effect
      actions {
        id
        service
        facet
        verb
      }
      predicate
      predVar1
      predParam1
    }
    tmpl
    tmplUseAsIs
    tmplServiceType
  }
}
    `;

/**
 * __useAmPolicyQuery__
 *
 * To run a query within a React component, call `useAmPolicyQuery` and pass it any options that fit your needs.
 * When your component renders, `useAmPolicyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAmPolicyQuery({
 *   variables: {
 *      orgSid: // value for 'orgSid'
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useAmPolicyQuery(baseOptions: Apollo.QueryHookOptions<AmPolicyQuery, AmPolicyQueryVariables>) {
        return Apollo.useQuery<AmPolicyQuery, AmPolicyQueryVariables>(AmPolicyDocument, baseOptions);
      }
export function useAmPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyQuery, AmPolicyQueryVariables>) {
          return Apollo.useLazyQuery<AmPolicyQuery, AmPolicyQueryVariables>(AmPolicyDocument, baseOptions);
        }
export type AmPolicyQueryHookResult = ReturnType<typeof useAmPolicyQuery>;
export type AmPolicyLazyQueryHookResult = ReturnType<typeof useAmPolicyLazyQuery>;
export type AmPolicyQueryResult = Apollo.QueryResult<AmPolicyQuery, AmPolicyQueryVariables>;
export const ScheduleOccurrencesDocument = gql`
    query ScheduleOccurrences($orgSid: ID!, $dateRange: DateTimeRangeInput, $pageableInput: PageableInput) {
  scheduleOccurrences(
    orgSid: $orgSid
    dateRange: $dateRange
    pageableInput: $pageableInput
  ) {
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
    ${PaginationInfoFragmentFragmentDoc}`;

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
export const UpdateAmPermissionActionDocument = gql`
    mutation UpdateAMPermissionAction($updateAMPermissionActionInput: UpdateAMPermissionActionInput) {
  updateAMPermissionAction(
    updateAMPermissionActionInput: $updateAMPermissionActionInput
  ) {
    id
    service
    facet
    verb
  }
}
    `;
export type UpdateAmPermissionActionMutationFn = Apollo.MutationFunction<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>;

/**
 * __useUpdateAmPermissionActionMutation__
 *
 * To run a mutation, you first call `useUpdateAmPermissionActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAmPermissionActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAmPermissionActionMutation, { data, loading, error }] = useUpdateAmPermissionActionMutation({
 *   variables: {
 *      updateAMPermissionActionInput: // value for 'updateAMPermissionActionInput'
 *   },
 * });
 */
export function useUpdateAmPermissionActionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>) {
        return Apollo.useMutation<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>(UpdateAmPermissionActionDocument, baseOptions);
      }
export type UpdateAmPermissionActionMutationHookResult = ReturnType<typeof useUpdateAmPermissionActionMutation>;
export type UpdateAmPermissionActionMutationResult = Apollo.MutationResult<UpdateAmPermissionActionMutation>;
export type UpdateAmPermissionActionMutationOptions = Apollo.BaseMutationOptions<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>;
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
export const RemoveAmPolicyDocument = gql`
    mutation RemoveAMPolicy($policySid: ID!) {
  removeAMPolicy(policySid: $policySid)
}
    `;
export type RemoveAmPolicyMutationFn = Apollo.MutationFunction<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>;

/**
 * __useRemoveAmPolicyMutation__
 *
 * To run a mutation, you first call `useRemoveAmPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAmPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAmPolicyMutation, { data, loading, error }] = useRemoveAmPolicyMutation({
 *   variables: {
 *      policySid: // value for 'policySid'
 *   },
 * });
 */
export function useRemoveAmPolicyMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>) {
        return Apollo.useMutation<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>(RemoveAmPolicyDocument, baseOptions);
      }
export type RemoveAmPolicyMutationHookResult = ReturnType<typeof useRemoveAmPolicyMutation>;
export type RemoveAmPolicyMutationResult = Apollo.MutationResult<RemoveAmPolicyMutation>;
export type RemoveAmPolicyMutationOptions = Apollo.BaseMutationOptions<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>;
export const RemoveAmPoliciesDocument = gql`
    mutation RemoveAMPolicies($deleteAMPoliciesInput: DeleteAMPoliciesInput!) {
  removeAMPolicies(deleteAMPoliciesInput: $deleteAMPoliciesInput)
}
    `;
export type RemoveAmPoliciesMutationFn = Apollo.MutationFunction<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>;

/**
 * __useRemoveAmPoliciesMutation__
 *
 * To run a mutation, you first call `useRemoveAmPoliciesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAmPoliciesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAmPoliciesMutation, { data, loading, error }] = useRemoveAmPoliciesMutation({
 *   variables: {
 *      deleteAMPoliciesInput: // value for 'deleteAMPoliciesInput'
 *   },
 * });
 */
export function useRemoveAmPoliciesMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>) {
        return Apollo.useMutation<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>(RemoveAmPoliciesDocument, baseOptions);
      }
export type RemoveAmPoliciesMutationHookResult = ReturnType<typeof useRemoveAmPoliciesMutation>;
export type RemoveAmPoliciesMutationResult = Apollo.MutationResult<RemoveAmPoliciesMutation>;
export type RemoveAmPoliciesMutationOptions = Apollo.BaseMutationOptions<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>;
export const CreateAmPermissionDocument = gql`
    mutation CreateAMPermission($permissionInfo: CreateAMPermissionInput!) {
  createAMPermission(permissionInfo: $permissionInfo) {
    id
    effect
    actions {
      id
      service
      facet
      verb
    }
  }
}
    `;
export type CreateAmPermissionMutationFn = Apollo.MutationFunction<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>;

/**
 * __useCreateAmPermissionMutation__
 *
 * To run a mutation, you first call `useCreateAmPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAmPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAmPermissionMutation, { data, loading, error }] = useCreateAmPermissionMutation({
 *   variables: {
 *      permissionInfo: // value for 'permissionInfo'
 *   },
 * });
 */
export function useCreateAmPermissionMutation(baseOptions?: Apollo.MutationHookOptions<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>) {
        return Apollo.useMutation<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>(CreateAmPermissionDocument, baseOptions);
      }
export type CreateAmPermissionMutationHookResult = ReturnType<typeof useCreateAmPermissionMutation>;
export type CreateAmPermissionMutationResult = Apollo.MutationResult<CreateAmPermissionMutation>;
export type CreateAmPermissionMutationOptions = Apollo.BaseMutationOptions<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>;
export const UpdateAmPermissionDocument = gql`
    mutation UpdateAMPermission($updateAMPermissionInput: UpdateAMPermissionInput) {
  updateAMPermission(updateAMPermissionInput: $updateAMPermissionInput) {
    id
    effect
    predicate
    predVar1
    predParam1
  }
}
    `;
export type UpdateAmPermissionMutationFn = Apollo.MutationFunction<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>;

/**
 * __useUpdateAmPermissionMutation__
 *
 * To run a mutation, you first call `useUpdateAmPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAmPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAmPermissionMutation, { data, loading, error }] = useUpdateAmPermissionMutation({
 *   variables: {
 *      updateAMPermissionInput: // value for 'updateAMPermissionInput'
 *   },
 * });
 */
export function useUpdateAmPermissionMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>) {
        return Apollo.useMutation<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>(UpdateAmPermissionDocument, baseOptions);
      }
export type UpdateAmPermissionMutationHookResult = ReturnType<typeof useUpdateAmPermissionMutation>;
export type UpdateAmPermissionMutationResult = Apollo.MutationResult<UpdateAmPermissionMutation>;
export type UpdateAmPermissionMutationOptions = Apollo.BaseMutationOptions<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>;
export const RemoveAmPermissionDocument = gql`
    mutation RemoveAMPermission($permissionSid: ID!) {
  removeAMPermission(permissionSid: $permissionSid)
}
    `;
export type RemoveAmPermissionMutationFn = Apollo.MutationFunction<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>;

/**
 * __useRemoveAmPermissionMutation__
 *
 * To run a mutation, you first call `useRemoveAmPermissionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAmPermissionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAmPermissionMutation, { data, loading, error }] = useRemoveAmPermissionMutation({
 *   variables: {
 *      permissionSid: // value for 'permissionSid'
 *   },
 * });
 */
export function useRemoveAmPermissionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>) {
        return Apollo.useMutation<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>(RemoveAmPermissionDocument, baseOptions);
      }
export type RemoveAmPermissionMutationHookResult = ReturnType<typeof useRemoveAmPermissionMutation>;
export type RemoveAmPermissionMutationResult = Apollo.MutationResult<RemoveAmPermissionMutation>;
export type RemoveAmPermissionMutationOptions = Apollo.BaseMutationOptions<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>;
export const UpdateAmPolicyDocument = gql`
    mutation UpdateAMPolicy($updateAMPolicyInput: UpdateAMPolicyInput!) {
  updateAMPolicy(updateAMPolicyInput: $updateAMPolicyInput) {
    id
    name
    tmpl
    tmplUseAsIs
    tmplServiceType
  }
}
    `;
export type UpdateAmPolicyMutationFn = Apollo.MutationFunction<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>;

/**
 * __useUpdateAmPolicyMutation__
 *
 * To run a mutation, you first call `useUpdateAmPolicyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAmPolicyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAmPolicyMutation, { data, loading, error }] = useUpdateAmPolicyMutation({
 *   variables: {
 *      updateAMPolicyInput: // value for 'updateAMPolicyInput'
 *   },
 * });
 */
export function useUpdateAmPolicyMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>) {
        return Apollo.useMutation<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>(UpdateAmPolicyDocument, baseOptions);
      }
export type UpdateAmPolicyMutationHookResult = ReturnType<typeof useUpdateAmPolicyMutation>;
export type UpdateAmPolicyMutationResult = Apollo.MutationResult<UpdateAmPolicyMutation>;
export type UpdateAmPolicyMutationOptions = Apollo.BaseMutationOptions<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>;
export const RemoveAmPermissionActionDocument = gql`
    mutation RemoveAMPermissionAction($permissionActionSid: ID!) {
  removeAMPermissionAction(permissionActionSid: $permissionActionSid)
}
    `;
export type RemoveAmPermissionActionMutationFn = Apollo.MutationFunction<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>;

/**
 * __useRemoveAmPermissionActionMutation__
 *
 * To run a mutation, you first call `useRemoveAmPermissionActionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveAmPermissionActionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeAmPermissionActionMutation, { data, loading, error }] = useRemoveAmPermissionActionMutation({
 *   variables: {
 *      permissionActionSid: // value for 'permissionActionSid'
 *   },
 * });
 */
export function useRemoveAmPermissionActionMutation(baseOptions?: Apollo.MutationHookOptions<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>) {
        return Apollo.useMutation<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>(RemoveAmPermissionActionDocument, baseOptions);
      }
export type RemoveAmPermissionActionMutationHookResult = ReturnType<typeof useRemoveAmPermissionActionMutation>;
export type RemoveAmPermissionActionMutationResult = Apollo.MutationResult<RemoveAmPermissionActionMutation>;
export type RemoveAmPermissionActionMutationOptions = Apollo.BaseMutationOptions<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>;