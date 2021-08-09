import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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
  exchangeActivityInProcess?: Maybe<OrganizationLinkConnection>;
  exchangeActivityTransmitted?: Maybe<OrganizationLinkConnection>;
  exchangeActivityErrored?: Maybe<OrganizationLinkConnection>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  workPacketStatus?: Maybe<WorkPacketStatus>;
  workPacketStatuses?: Maybe<Array<Maybe<WorkPacketStatus>>>;
  dashboardPeriods?: Maybe<DashboardPeriods>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  currentUser?: Maybe<CurrentUserInfo>;
  userTheme?: Maybe<DashTheme>;
  logOut?: Maybe<LogOutInfo>;
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

export type QueryUserThemeArgs = {
  themeColorMode?: Maybe<ThemeColorMode>;
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

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<LoginStep>;
  updateOwnPassword?: Maybe<UserSession>;
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

export type CurrentUserInfo = {
  __typename?: 'CurrentUserInfo';
  domain?: Maybe<WebAppDomain>;
  tokenUser?: Maybe<TokenUser>;
  loggedIn?: Maybe<Scalars['Boolean']>;
};

export type UserSession = {
  __typename?: 'UserSession';
  id: Scalars['ID'];
  orgId: Scalars['ID'];
  userId: Scalars['String'];
  firstNm: Scalars['String'];
  pollInterval?: Maybe<Scalars['Int']>;
  defaultAuthorities?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum LoginStepType {
  Username = 'USERNAME',
  Password = 'PASSWORD',
  Complete = 'COMPLETE',
}

export type AmPasswordConfigInput = {
  allowForgotten?: Maybe<Scalars['Boolean']>;
  orgUnitOwner?: Maybe<Scalars['ID']>;
};

export type UpdatePasswordInput = {
  originalPassword: Scalars['String'];
  newPassword: Scalars['String'];
  verifyPassword: Scalars['String'];
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
  None = 'NONE',
}

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL',
}

export type PasswordRule =
  | PasswordLengthRule
  | PasswordWhitespaceRule
  | PasswordCharacterRule
  | PasswordStrengthRule
  | PasswordRuleGroup;

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
  AccessManagement = 'ACCESS_MANAGEMENT',
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
  Organization = 'ORGANIZATION',
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
  Assign = 'ASSIGN',
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
  AddUser = 'ADD_USER',
  ColorPalettes = 'COLOR_PALETTES',
  Theme = 'THEME',
}

export enum CdxWebAppDomain {
  Dashboard = 'DASHBOARD',
  Organization = 'ORGANIZATION',
}

export enum CdxWebPivot {
  Activity = 'ACTIVITY',
  InProgress = 'IN_PROGRESS',
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
  SalesProspect = 'SALES_PROSPECT',
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
  Deny = 'DENY',
}

export type PermissionEffectNvp = {
  __typename?: 'PermissionEffectNVP';
  name: Scalars['String'];
  value: PermissionEffect;
};

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
  Desc = 'DESC',
}

export enum NullHandling {
  NullsFirst = 'NULLS_FIRST',
  NullsLast = 'NULLS_LAST',
}

export enum ActiveEnum {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  All = 'ALL',
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
  NotScheduled = 'NOT_SCHEDULED',
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

export type LogOutInfo = {
  __typename?: 'LogOutInfo';
  successful: Scalars['Boolean'];
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

export type OwnedInput = {
  orgSid: Scalars['ID'];
  ownerId?: Maybe<Scalars['ID']>;
};

export type OwnedInputSid = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
};

export type OwnedInputName = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  name: Scalars['String'];
};

export type OrgSidInput = {
  orgSid: Scalars['ID'];
};

export type DashSite = {
  __typename?: 'DashSite';
  id?: Maybe<Scalars['ID']>;
  active?: Maybe<Scalars['Boolean']>;
};

export type DashThemeColorConnection = {
  __typename?: 'DashThemeColorConnection';
  paginationInfo: PaginationInfo;
  nodes?: Maybe<Array<Maybe<DashThemeColor>>>;
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

export type CreateDefaultDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type UpdateDefaultDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export enum GqOperationResponse {
  Success = 'SUCCESS',
  Fail = 'FAIL',
}

export type DefaultDashThemePage = {
  __typename?: 'DefaultDashThemePage';
  themeColorModes?: Maybe<Array<Maybe<ThemeColorMode>>>;
  themeFontSizes?: Maybe<Array<Maybe<ThemeFontSize>>>;
  themeColorPalettes?: Maybe<Array<Maybe<DashThemeColor>>>;
};

export type DashThemeInput = {
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type CreateUserDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type UpdateUserDashThemeInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  themeFontSize?: Maybe<ThemeFontSize>;
  themeColorMode?: Maybe<ThemeColorMode>;
  themeColorSid?: Maybe<Scalars['ID']>;
};

export type UserDashThemePage = {
  __typename?: 'UserDashThemePage';
  themeColorModes?: Maybe<Array<Maybe<ThemeColorMode>>>;
  themeFontSizes?: Maybe<Array<Maybe<ThemeFontSize>>>;
  themeColorPalettes?: Maybe<Array<Maybe<DashThemeColor>>>;
  dashTheme?: Maybe<DashTheme>;
};

export type DashThemeColorDefaultInput = {
  orgSid: Scalars['ID'];
  ownerId: Scalars['ID'];
  sid: Scalars['ID'];
  defaultPalette: Scalars['Boolean'];
  themeColorMode?: Maybe<ThemeColorMode>;
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

export type DomainNavInput = {
  orgSid: Scalars['ID'];
  ownerId?: Maybe<Scalars['ID']>;
  appDomain: CdxWebAppDomain;
  selectedPage?: Maybe<CdxWebPage>;
};

export type BeginLoginQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type BeginLoginQuery = {
  __typename?: 'Query';
  beginLogin?: Maybe<{
    __typename?: 'LoginStep';
    userId: string;
    step: LoginStepType;
    redirectPath?: Maybe<string>;
    allowLostPassword?: Maybe<boolean>;
  }>;
};

export type PasswordLoginMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;

export type PasswordLoginMutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<{
    __typename?: 'LoginStep';
    step: LoginStepType;
    loginCompleteDomain?: Maybe<{
      __typename?: 'WebAppDomain';
      type: CdxWebAppDomain;
      selectedPage?: Maybe<CdxWebPage>;
      navItems?: Maybe<
        Array<
          Maybe<{
            __typename?: 'WebNav';
            label?: Maybe<string>;
            appDomain?: Maybe<CdxWebAppDomain>;
            subNavItems?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'WebNav';
                  label?: Maybe<string>;
                  appDomain?: Maybe<CdxWebAppDomain>;
                  page?: Maybe<{
                    __typename?: 'WebPage';
                    type: CdxWebPage;
                    parameters?: Maybe<
                      Array<
                        Maybe<
                          | { __typename: 'NVPStr'; name: string; strValue: string }
                          | { __typename: 'NVPId'; name: string; idValue: string }
                        >
                      >
                    >;
                    commands?: Maybe<
                      Array<
                        Maybe<{
                          __typename?: 'WebNav';
                          label?: Maybe<string>;
                          appDomain?: Maybe<CdxWebAppDomain>;
                          page?: Maybe<{
                            __typename?: 'WebPage';
                            type: CdxWebPage;
                            parameters?: Maybe<
                              Array<
                                Maybe<
                                  | { __typename: 'NVPStr'; name: string; strValue: string }
                                  | { __typename: 'NVPId'; name: string; idValue: string }
                                >
                              >
                            >;
                          }>;
                        }>
                      >
                    >;
                    pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
                  }>;
                }>
              >
            >;
            page?: Maybe<{
              __typename?: 'WebPage';
              type: CdxWebPage;
              parameters?: Maybe<
                Array<
                  Maybe<
                    | { __typename: 'NVPStr'; name: string; strValue: string }
                    | { __typename: 'NVPId'; name: string; idValue: string }
                  >
                >
              >;
              commands?: Maybe<
                Array<
                  Maybe<{
                    __typename?: 'WebNav';
                    label?: Maybe<string>;
                    appDomain?: Maybe<CdxWebAppDomain>;
                    page?: Maybe<{
                      __typename?: 'WebPage';
                      type: CdxWebPage;
                      parameters?: Maybe<
                        Array<
                          Maybe<
                            | { __typename: 'NVPStr'; name: string; strValue: string }
                            | { __typename: 'NVPId'; name: string; idValue: string }
                          >
                        >
                      >;
                    }>;
                  }>
                >
              >;
              pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
            }>;
          }>
        >
      >;
    }>;
    tokenUser?: Maybe<{
      __typename?: 'TokenUser';
      token?: Maybe<string>;
      session?: Maybe<{
        __typename?: 'UserSession';
        id: string;
        orgId: string;
        userId: string;
        firstNm: string;
        defaultAuthorities?: Maybe<Array<Maybe<string>>>;
      }>;
    }>;
  }>;
};

export type NavItemFragmentFragment = {
  __typename?: 'WebNav';
  label?: Maybe<string>;
  appDomain?: Maybe<CdxWebAppDomain>;
  page?: Maybe<{
    __typename?: 'WebPage';
    type: CdxWebPage;
    parameters?: Maybe<
      Array<
        Maybe<
          | { __typename: 'NVPStr'; name: string; strValue: string }
          | { __typename: 'NVPId'; name: string; idValue: string }
        >
      >
    >;
    commands?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WebNav';
          label?: Maybe<string>;
          appDomain?: Maybe<CdxWebAppDomain>;
          page?: Maybe<{
            __typename?: 'WebPage';
            type: CdxWebPage;
            parameters?: Maybe<
              Array<
                Maybe<
                  | { __typename: 'NVPStr'; name: string; strValue: string }
                  | { __typename: 'NVPId'; name: string; idValue: string }
                >
              >
            >;
          }>;
        }>
      >
    >;
    pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
  }>;
};

export type WebPageFragmentFragment = {
  __typename?: 'WebPage';
  type: CdxWebPage;
  parameters?: Maybe<
    Array<
      Maybe<
        | { __typename: 'NVPStr'; name: string; strValue: string }
        | { __typename: 'NVPId'; name: string; idValue: string }
      >
    >
  >;
  commands?: Maybe<
    Array<
      Maybe<{
        __typename?: 'WebNav';
        label?: Maybe<string>;
        appDomain?: Maybe<CdxWebAppDomain>;
        page?: Maybe<{
          __typename?: 'WebPage';
          type: CdxWebPage;
          parameters?: Maybe<
            Array<
              Maybe<
                | { __typename: 'NVPStr'; name: string; strValue: string }
                | { __typename: 'NVPId'; name: string; idValue: string }
              >
            >
          >;
        }>;
      }>
    >
  >;
  pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
};

type UnionNvp_NvpStr_Fragment = { __typename: 'NVPStr'; name: string; strValue: string };

type UnionNvp_NvpId_Fragment = { __typename: 'NVPId'; name: string; idValue: string };

export type UnionNvpFragment = UnionNvp_NvpStr_Fragment | UnionNvp_NvpId_Fragment;

export type WorkPacketStatusesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  filter?: Maybe<WorkPacketStatusFilter>;
}>;

export type WorkPacketStatusesQuery = {
  __typename?: 'Query';
  workPacketStatuses?: Maybe<
    Array<
      Maybe<{
        __typename?: 'WorkPacketStatus';
        workOrderId: string;
        timestamp: any;
        planSponsorId?: Maybe<string>;
        detailsPath?: Maybe<string>;
        subClientPath?: Maybe<string>;
        inboundFilename: string;
        vendorId?: Maybe<string>;
        step: number;
        stepStatus: string;
        packetStatus: string;
        reprocessedBy?: Maybe<string>;
        reprocessAction?: Maybe<number>;
        populationCount?: Maybe<number>;
        recordHighlightCount?: Maybe<number>;
        recordHighlightType?: Maybe<string>;
        clientFileArchivePath?: Maybe<string>;
        vendorFileArchivePath?: Maybe<string>;
        supplementalFilesArchivePaths?: Maybe<Array<Maybe<string>>>;
        archiveOnly?: Maybe<boolean>;
        hasErrors?: Maybe<boolean>;
      }>
    >
  >;
};

export type WorkPacketStatusDetailsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;

export type WorkPacketStatusDetailsQuery = {
  __typename?: 'Query';
  workPacketStatusDetails?: Maybe<{
    __typename?: 'WorkPacketStatusDetails';
    workOrderId: string;
    specId?: Maybe<string>;
    specImplName?: Maybe<string>;
    fingerPrint?: Maybe<string>;
    suppressBilling?: Maybe<boolean>;
    inboundLabel?: Maybe<string>;
    outboundLabel?: Maybe<string>;
    workStepStatus?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WorkStepStatus';
          stepStatus?: Maybe<string>;
          stepName?: Maybe<string>;
          stepType?: Maybe<string>;
          populationCount?: Maybe<{ __typename?: 'StatCountType'; value?: Maybe<number> }>;
          stepFile?: Maybe<Array<Maybe<{ __typename?: 'ArchiveFileType'; value: string; label?: Maybe<string> }>>>;
          nvp?: Maybe<Array<Maybe<{ __typename?: 'NVPStr'; name: string; value: string }>>>;
          recordCounts?: Maybe<{
            __typename?: 'RecordCounts';
            totalCount?: Maybe<number>;
            showUser?: Maybe<boolean>;
            recordCount?: Maybe<Array<Maybe<{ __typename?: 'RecordCount'; name: string; count: number }>>>;
          }>;
        }>
      >
    >;
    deliveredFile?: Maybe<{
      __typename?: 'DeliveredFile';
      filename: string;
      fileSizeInBytes?: Maybe<number>;
      textSizeInBytes?: Maybe<number>;
      timeDelivered?: Maybe<any>;
      ftp?: Maybe<{
        __typename?: 'DeliveredFileFTP';
        protocol: string;
        host: string;
        username?: Maybe<string>;
        folder?: Maybe<string>;
        port?: Maybe<number>;
      }>;
      kcurl?: Maybe<{ __typename?: 'DeliveredKCURL'; url: string }>;
    }>;
    extractParameters?: Maybe<{
      __typename?: 'ExtractParameters';
      originalParameter?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ExtractParameter';
            label?: Maybe<string>;
            name?: Maybe<string>;
            value?: Maybe<Array<Maybe<string>>>;
          }>
        >
      >;
      overriddenParameter?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ExtractParameter';
            label?: Maybe<string>;
            name?: Maybe<string>;
            value?: Maybe<Array<Maybe<string>>>;
          }>
        >
      >;
      derivedParameter?: Maybe<
        Array<
          Maybe<{
            __typename?: 'ExtractParameter';
            label?: Maybe<string>;
            name?: Maybe<string>;
            value?: Maybe<Array<Maybe<string>>>;
          }>
        >
      >;
    }>;
    qualityChecks?: Maybe<{
      __typename?: 'QualityChecks';
      sequenceCreationEvent?: Maybe<
        Array<
          Maybe<{
            __typename?: 'SequenceCreationEvent';
            context?: Maybe<string>;
            unitId?: Maybe<string>;
            recordCreationEvent?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'RecordCreationEvent';
                  context?: Maybe<string>;
                  outerContext?: Maybe<string>;
                  unitId?: Maybe<string>;
                  error?: Maybe<
                    Array<
                      Maybe<{
                        __typename?: 'FieldCreationEvent';
                        message?: Maybe<Array<Maybe<string>>>;
                        name?: Maybe<string>;
                        id?: Maybe<string>;
                        value?: Maybe<string>;
                        rawValue?: Maybe<string>;
                        type?: Maybe<string>;
                      }>
                    >
                  >;
                  warning?: Maybe<
                    Array<
                      Maybe<{
                        __typename?: 'FieldCreationEvent';
                        message?: Maybe<Array<Maybe<string>>>;
                        name?: Maybe<string>;
                        id?: Maybe<string>;
                        value?: Maybe<string>;
                        rawValue?: Maybe<string>;
                        type?: Maybe<string>;
                      }>
                    >
                  >;
                  information?: Maybe<
                    Array<
                      Maybe<{
                        __typename?: 'FieldCreationEvent';
                        message?: Maybe<Array<Maybe<string>>>;
                        name?: Maybe<string>;
                        id?: Maybe<string>;
                        value?: Maybe<string>;
                        rawValue?: Maybe<string>;
                        type?: Maybe<string>;
                      }>
                    >
                  >;
                }>
              >
            >;
          }>
        >
      >;
    }>;
    enrollmentStats?: Maybe<{
      __typename?: 'EnrollmentStat';
      insuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedInsuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedPlanInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
      planInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
    }>;
    inboundEnrollmentStats?: Maybe<{
      __typename?: 'EnrollmentStat';
      insuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedInsuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedPlanInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
      planInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
    }>;
    outboundEnrollmentStats?: Maybe<{
      __typename?: 'EnrollmentStat';
      insuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedInsuredStat?: Maybe<{
        __typename?: 'InsuredStat';
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>;
      excludedPlanInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
      planInsuredStat?: Maybe<
        Array<
          Maybe<{
            __typename?: 'PlanInsuredStat';
            planCode?: Maybe<string>;
            planType?: Maybe<string>;
            subscribers?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
            dependents?: Maybe<{
              __typename?: 'InsuredStatCount';
              expectedTotal?: Maybe<number>;
              inTolerance?: Maybe<boolean>;
              toleranceMsg?: Maybe<string>;
              hold?: Maybe<boolean>;
              active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
              ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
            }>;
          }>
        >
      >;
    }>;
    outboundRecordCounts?: Maybe<{
      __typename?: 'RecordCounts';
      totalCount?: Maybe<number>;
      showUser?: Maybe<boolean>;
      recordCount?: Maybe<Array<Maybe<{ __typename?: 'RecordCount'; name: string; count: number }>>>;
    }>;
  }>;
};

export type WorkPacketStatusQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  workOrderId: Scalars['String'];
}>;

export type WorkPacketStatusQuery = {
  __typename?: 'Query';
  workPacketStatus?: Maybe<{
    __typename?: 'WorkPacketStatus';
    workOrderId: string;
    timestamp: any;
    planSponsorId?: Maybe<string>;
    detailsPath?: Maybe<string>;
    subClientPath?: Maybe<string>;
    inboundFilename: string;
    vendorId?: Maybe<string>;
    step: number;
    stepStatus: string;
    packetStatus: string;
    reprocessedBy?: Maybe<string>;
    reprocessAction?: Maybe<number>;
    populationCount?: Maybe<number>;
    recordHighlightCount?: Maybe<number>;
    recordHighlightType?: Maybe<string>;
    clientFileArchivePath?: Maybe<string>;
    vendorFileArchivePath?: Maybe<string>;
    supplementalFilesArchivePaths?: Maybe<Array<Maybe<string>>>;
    archiveOnly?: Maybe<boolean>;
    hasErrors?: Maybe<boolean>;
  }>;
};

export type RecordCountsFragmentFragment = {
  __typename?: 'RecordCounts';
  totalCount?: Maybe<number>;
  showUser?: Maybe<boolean>;
  recordCount?: Maybe<Array<Maybe<{ __typename?: 'RecordCount'; name: string; count: number }>>>;
};

export type ExtractParameterFragmentFragment = {
  __typename?: 'ExtractParameter';
  label?: Maybe<string>;
  name?: Maybe<string>;
  value?: Maybe<Array<Maybe<string>>>;
};

export type FieldCreationFragmentFragment = {
  __typename?: 'FieldCreationEvent';
  message?: Maybe<Array<Maybe<string>>>;
  name?: Maybe<string>;
  id?: Maybe<string>;
  value?: Maybe<string>;
  rawValue?: Maybe<string>;
  type?: Maybe<string>;
};

export type EnrollmentStatFragmentFragment = {
  __typename?: 'EnrollmentStat';
  insuredStat?: Maybe<{
    __typename?: 'InsuredStat';
    subscribers?: Maybe<{
      __typename?: 'InsuredStatCount';
      expectedTotal?: Maybe<number>;
      inTolerance?: Maybe<boolean>;
      toleranceMsg?: Maybe<string>;
      hold?: Maybe<boolean>;
      active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
      ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    }>;
    dependents?: Maybe<{
      __typename?: 'InsuredStatCount';
      expectedTotal?: Maybe<number>;
      inTolerance?: Maybe<boolean>;
      toleranceMsg?: Maybe<string>;
      hold?: Maybe<boolean>;
      active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
      ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    }>;
  }>;
  excludedInsuredStat?: Maybe<{
    __typename?: 'InsuredStat';
    subscribers?: Maybe<{
      __typename?: 'InsuredStatCount';
      expectedTotal?: Maybe<number>;
      inTolerance?: Maybe<boolean>;
      toleranceMsg?: Maybe<string>;
      hold?: Maybe<boolean>;
      active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
      ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    }>;
    dependents?: Maybe<{
      __typename?: 'InsuredStatCount';
      expectedTotal?: Maybe<number>;
      inTolerance?: Maybe<boolean>;
      toleranceMsg?: Maybe<string>;
      hold?: Maybe<boolean>;
      active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
      ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    }>;
  }>;
  excludedPlanInsuredStat?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PlanInsuredStat';
        planCode?: Maybe<string>;
        planType?: Maybe<string>;
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>
    >
  >;
  planInsuredStat?: Maybe<
    Array<
      Maybe<{
        __typename?: 'PlanInsuredStat';
        planCode?: Maybe<string>;
        planType?: Maybe<string>;
        subscribers?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
        dependents?: Maybe<{
          __typename?: 'InsuredStatCount';
          expectedTotal?: Maybe<number>;
          inTolerance?: Maybe<boolean>;
          toleranceMsg?: Maybe<string>;
          hold?: Maybe<boolean>;
          active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
          ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
        }>;
      }>
    >
  >;
};

export type InsuredStatFragmentFragment = {
  __typename?: 'InsuredStat';
  subscribers?: Maybe<{
    __typename?: 'InsuredStatCount';
    expectedTotal?: Maybe<number>;
    inTolerance?: Maybe<boolean>;
    toleranceMsg?: Maybe<string>;
    hold?: Maybe<boolean>;
    active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
  }>;
  dependents?: Maybe<{
    __typename?: 'InsuredStatCount';
    expectedTotal?: Maybe<number>;
    inTolerance?: Maybe<boolean>;
    toleranceMsg?: Maybe<string>;
    hold?: Maybe<boolean>;
    active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
  }>;
};

export type PlanInsuredStatFragmentFragment = {
  __typename?: 'PlanInsuredStat';
  planCode?: Maybe<string>;
  planType?: Maybe<string>;
  subscribers?: Maybe<{
    __typename?: 'InsuredStatCount';
    expectedTotal?: Maybe<number>;
    inTolerance?: Maybe<boolean>;
    toleranceMsg?: Maybe<string>;
    hold?: Maybe<boolean>;
    active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
  }>;
  dependents?: Maybe<{
    __typename?: 'InsuredStatCount';
    expectedTotal?: Maybe<number>;
    inTolerance?: Maybe<boolean>;
    toleranceMsg?: Maybe<string>;
    hold?: Maybe<boolean>;
    active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
    ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
  }>;
};

export type InsuredStatCountFragmentFragment = {
  __typename?: 'InsuredStatCount';
  expectedTotal?: Maybe<number>;
  inTolerance?: Maybe<boolean>;
  toleranceMsg?: Maybe<string>;
  hold?: Maybe<boolean>;
  active?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
  ended?: Maybe<{ __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> }>;
};

export type StatIntFragmentFragment = { __typename?: 'StatInt'; prior?: Maybe<number>; value?: Maybe<number> };

export type DashboardPeriodsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type DashboardPeriodsQuery = {
  __typename?: 'Query';
  dashboardPeriods?: Maybe<{
    __typename?: 'DashboardPeriods';
    dailyCounts?: Maybe<{
      __typename?: 'DashboardPeriodCounts';
      transmissionCount?: Maybe<number>;
      billingUnitCount?: Maybe<number>;
      processErrorCount?: Maybe<number>;
      vendorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorTransmissionsBySpec?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
    }>;
    yesterdayCounts?: Maybe<{
      __typename?: 'DashboardPeriodCounts';
      transmissionCount?: Maybe<number>;
      billingUnitCount?: Maybe<number>;
      processErrorCount?: Maybe<number>;
      vendorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorTransmissionsBySpec?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
    }>;
    monthlyCounts?: Maybe<{
      __typename?: 'DashboardPeriodCounts';
      transmissionCount?: Maybe<number>;
      billingUnitCount?: Maybe<number>;
      processErrorCount?: Maybe<number>;
      vendorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorTransmissionsBySpec?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
    }>;
    lastMonthlyCounts?: Maybe<{
      __typename?: 'DashboardPeriodCounts';
      transmissionCount?: Maybe<number>;
      billingUnitCount?: Maybe<number>;
      processErrorCount?: Maybe<number>;
      vendorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorTransmissionsBySpec?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileTransmissions?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      vendorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      planSponsorProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
      fileProcessErrors?: Maybe<
        Array<
          Maybe<{
            __typename?: 'DashboardPeriodCount';
            name?: Maybe<string>;
            secondaryDescr?: Maybe<string>;
            count?: Maybe<number>;
            total?: Maybe<number>;
          }>
        >
      >;
    }>;
  }>;
};

export type DashPeriodCountsFragmentFragment = {
  __typename?: 'DashboardPeriodCounts';
  transmissionCount?: Maybe<number>;
  billingUnitCount?: Maybe<number>;
  processErrorCount?: Maybe<number>;
  vendorTransmissions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  vendorTransmissionsBySpec?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  planSponsorTransmissions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  fileTransmissions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  vendorProcessErrors?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  planSponsorProcessErrors?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
  fileProcessErrors?: Maybe<
    Array<
      Maybe<{
        __typename?: 'DashboardPeriodCount';
        name?: Maybe<string>;
        secondaryDescr?: Maybe<string>;
        count?: Maybe<number>;
        total?: Maybe<number>;
      }>
    >
  >;
};

export type DashPeriodCountFragmentFragment = {
  __typename?: 'DashboardPeriodCount';
  name?: Maybe<string>;
  secondaryDescr?: Maybe<string>;
  count?: Maybe<number>;
  total?: Maybe<number>;
};

export type AmPolicyPageQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type AmPolicyPageQuery = {
  __typename?: 'Query';
  amPolicyPage?: Maybe<{
    __typename?: 'AMPolicyPage';
    showTemplateSection?: Maybe<boolean>;
    permissionServices?: Maybe<Array<Maybe<{ __typename?: 'CDXServiceNVP'; name: string; value?: Maybe<CdxService> }>>>;
    predicates?: Maybe<
      Array<Maybe<{ __typename?: 'PermissionPredicateNVP'; name: string; value: PermissionPredicate }>>
    >;
    templateServices?: Maybe<Array<Maybe<{ __typename?: 'CDXServiceNVP'; name: string; value?: Maybe<CdxService> }>>>;
    permissionEffectNVPs?: Maybe<
      Array<Maybe<{ __typename?: 'PermissionEffectNVP'; name: string; value: PermissionEffect }>>
    >;
  }>;
};

export type AmPolicyFacetsForServiceQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
}>;

export type AmPolicyFacetsForServiceQuery = {
  __typename?: 'Query';
  amPolicyFacetsForService?: Maybe<Array<Maybe<{ __typename?: 'CDXFacetNVP'; name: string; value: CdxFacet }>>>;
};

export type AmPolicyVerbForFacetQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
  cdxFacet: CdxFacet;
}>;

export type AmPolicyVerbForFacetQuery = {
  __typename?: 'Query';
  amPolicyVerbForFacet?: Maybe<Array<Maybe<{ __typename?: 'PermissionVerbNVP'; name: string; value: PermissionVerb }>>>;
};

export type CreateOrgMutationVariables = Exact<{
  orgInfo: CreateOrgInput;
}>;

export type CreateOrgMutation = {
  __typename?: 'Mutation';
  createOrg?: Maybe<{ __typename?: 'Organization'; id?: Maybe<string>; orgId: string; orgType: OrgType }>;
};

export type CreateAmPolicyMutationVariables = Exact<{
  policyInfo: CreateAmPolicyInput;
}>;

export type CreateAmPolicyMutation = {
  __typename?: 'Mutation';
  createAMPolicy?: Maybe<{
    __typename?: 'AMPolicy';
    id?: Maybe<string>;
    name: string;
    tmpl?: Maybe<boolean>;
    tmplUseAsIs?: Maybe<boolean>;
    permissions?: Maybe<
      Array<
        Maybe<{
          __typename?: 'AMPermission';
          id?: Maybe<string>;
          effect: PermissionEffect;
          predicate?: Maybe<PermissionPredicate>;
          predVar1?: Maybe<string>;
          predParam1?: Maybe<string>;
          actions?: Maybe<
            Array<
              Maybe<{
                __typename?: 'AMPermissionAction';
                id?: Maybe<string>;
                service: CdxService;
                facet: CdxFacet;
                verb: PermissionVerb;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type PolicyFragmentFragment = {
  __typename?: 'AMPolicy';
  id?: Maybe<string>;
  name: string;
  tmpl?: Maybe<boolean>;
  tmplUseAsIs?: Maybe<boolean>;
  permissions?: Maybe<
    Array<
      Maybe<{
        __typename?: 'AMPermission';
        id?: Maybe<string>;
        effect: PermissionEffect;
        predicate?: Maybe<PermissionPredicate>;
        predVar1?: Maybe<string>;
        predParam1?: Maybe<string>;
        actions?: Maybe<
          Array<
            Maybe<{
              __typename?: 'AMPermissionAction';
              id?: Maybe<string>;
              service: CdxService;
              facet: CdxFacet;
              verb: PermissionVerb;
            }>
          >
        >;
      }>
    >
  >;
};

export type CreateAmGroupMutationVariables = Exact<{
  amGroupInfo: CreateAmGroupInput;
}>;

export type CreateAmGroupMutation = {
  __typename?: 'Mutation';
  createAMGroup?: Maybe<{
    __typename?: 'AMGroup';
    id?: Maybe<string>;
    name: string;
    description?: Maybe<string>;
    tmpl?: Maybe<boolean>;
    tmplUseAsIs?: Maybe<boolean>;
    policies?: Maybe<Array<Maybe<{ __typename?: 'AMPolicy'; id?: Maybe<string>; name: string }>>>;
  }>;
};

export type SystemTemplateAmGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type SystemTemplateAmGroupByNameQuery = {
  __typename?: 'Query';
  systemTemplateAMGroupByName?: Maybe<
    Array<
      Maybe<{
        __typename?: 'AMGroup';
        id?: Maybe<string>;
        name: string;
        description?: Maybe<string>;
        tmpl?: Maybe<boolean>;
        tmplUseAsIs?: Maybe<boolean>;
        tmplServiceType?: Maybe<CdxService>;
      }>
    >
  >;
};

export type CreateUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<{
    __typename?: 'User';
    id: string;
    email: string;
    person?: Maybe<{ __typename?: 'Person'; firstNm: string; lastNm?: Maybe<string> }>;
  }>;
};

export type AmPoliciesForOrgPQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;

export type AmPoliciesForOrgPQuery = {
  __typename?: 'Query';
  amPoliciesForOrg?: Maybe<{
    __typename?: 'AMPolicyConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<Array<Maybe<{ __typename?: 'AMPolicy'; id?: Maybe<string>; name: string; tmpl?: Maybe<boolean> }>>>;
  }>;
};

export type TopLevelOrgsByTypeQueryVariables = Exact<{
  orgType: OrgType;
}>;

export type TopLevelOrgsByTypeQuery = {
  __typename?: 'Query';
  topLevelOrgsByType?: Maybe<
    Array<Maybe<{ __typename?: 'Organization'; id?: Maybe<string>; orgId: string; orgType: OrgType }>>
  >;
};

export type AmGroupsForOrgPQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  pageableInput?: Maybe<PageableInput>;
}>;

export type AmGroupsForOrgPQuery = {
  __typename?: 'Query';
  amGroupsForOrg?: Maybe<{
    __typename?: 'AMGroupConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<Array<Maybe<{ __typename?: 'AMGroup'; id?: Maybe<string>; name: string; tmpl?: Maybe<boolean> }>>>;
  }>;
};

export type UsersForOrgFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  userFilter?: Maybe<UserFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type UsersForOrgFpQuery = {
  __typename?: 'Query';
  usersForOrg?: Maybe<{
    __typename?: 'UserConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'User';
          id: string;
          email: string;
          person?: Maybe<{ __typename?: 'Person'; firstNm: string; lastNm?: Maybe<string> }>;
        }>
      >
    >;
  }>;
};

export type DirectOrganizationsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type DirectOrganizationsQuery = {
  __typename?: 'Query';
  directOrganizations?: Maybe<{
    __typename?: 'OrganizationConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Organization';
          id?: Maybe<string>;
          name?: Maybe<string>;
          orgId: string;
          orgType: OrgType;
        }>
      >
    >;
  }>;
};

export type DirectOrganizationsFQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
}>;

export type DirectOrganizationsFQuery = {
  __typename?: 'Query';
  directOrganizations?: Maybe<{
    __typename?: 'OrganizationConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Organization';
          id?: Maybe<string>;
          name?: Maybe<string>;
          orgId: string;
          orgType: OrgType;
        }>
      >
    >;
  }>;
};

export type DirectOrganizationsFpQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgFilter?: Maybe<OrgFilterInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type DirectOrganizationsFpQuery = {
  __typename?: 'Query';
  directOrganizations?: Maybe<{
    __typename?: 'OrganizationConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'Organization';
          id?: Maybe<string>;
          name?: Maybe<string>;
          orgId: string;
          orgType: OrgType;
        }>
      >
    >;
  }>;
};

export type PaginationInfoFragmentFragment = {
  __typename?: 'PaginationInfo';
  totalPages?: Maybe<number>;
  totalElements?: Maybe<number>;
  pageNumber?: Maybe<number>;
  pageSize?: Maybe<number>;
};

export type WpProcessErrorsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type WpProcessErrorsQuery = {
  __typename?: 'Query';
  wpProcessErrors?: Maybe<{
    __typename?: 'WPProcessErrorConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WPProcessError';
          id: string;
          workOrderId: string;
          startTime: any;
          stepName?: Maybe<string>;
          planSponsorId?: Maybe<string>;
          vendorId?: Maybe<string>;
          msg?: Maybe<string>;
          inboundFilename?: Maybe<string>;
          clientFileArchivePath?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type WpTransmissionsQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type WpTransmissionsQuery = {
  __typename?: 'Query';
  wpTransmissions?: Maybe<{
    __typename?: 'WPTransmissionConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WPTransmission';
          id: string;
          workOrderId: string;
          deliveredOn: any;
          planSponsorId?: Maybe<string>;
          vendorId?: Maybe<string>;
          specId?: Maybe<string>;
          implementation?: Maybe<string>;
          inboundFilename?: Maybe<string>;
          outboundFilename?: Maybe<string>;
          outboundFilesize?: Maybe<number>;
          billingCount?: Maybe<number>;
          totalRecords?: Maybe<number>;
          extractType?: Maybe<string>;
          extractVersion?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type AmPolicyQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  policySid: Scalars['ID'];
}>;

export type AmPolicyQuery = {
  __typename?: 'Query';
  amPolicy?: Maybe<{
    __typename?: 'AMPolicy';
    id?: Maybe<string>;
    name: string;
    tmpl?: Maybe<boolean>;
    tmplUseAsIs?: Maybe<boolean>;
    tmplServiceType?: Maybe<CdxService>;
    permissions?: Maybe<
      Array<
        Maybe<{
          __typename?: 'AMPermission';
          id?: Maybe<string>;
          effect: PermissionEffect;
          predicate?: Maybe<PermissionPredicate>;
          predVar1?: Maybe<string>;
          predParam1?: Maybe<string>;
          actions?: Maybe<
            Array<
              Maybe<{
                __typename?: 'AMPermissionAction';
                id?: Maybe<string>;
                service: CdxService;
                facet: CdxFacet;
                verb: PermissionVerb;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type ScheduleOccurrencesQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  dateRange?: Maybe<DateTimeRangeInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type ScheduleOccurrencesQuery = {
  __typename?: 'Query';
  scheduleOccurrences?: Maybe<{
    __typename?: 'ScheduleOccurrenceConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'ScheduleOccurrence';
          resource: string;
          scheduleId?: Maybe<string>;
          timeScheduled?: Maybe<any>;
          schedOccurStatus: SchedOccurStatusEnum;
          runOccurrences?: Maybe<
            Array<
              Maybe<{
                __typename?: 'ScheduleRunOccurrence';
                workOrderId: string;
                timeRan?: Maybe<any>;
                status: SchedOccurStatusEnum;
              }>
            >
          >;
        }>
      >
    >;
  }>;
};

export type UpdateAmPermissionActionMutationVariables = Exact<{
  updateAMPermissionActionInput?: Maybe<UpdateAmPermissionActionInput>;
}>;

export type UpdateAmPermissionActionMutation = {
  __typename?: 'Mutation';
  updateAMPermissionAction?: Maybe<{
    __typename?: 'AMPermissionAction';
    id?: Maybe<string>;
    service: CdxService;
    facet: CdxFacet;
    verb: PermissionVerb;
  }>;
};

export type UpdateOwnPasswordMutationVariables = Exact<{
  updatePasswordInput: UpdatePasswordInput;
}>;

export type UpdateOwnPasswordMutation = {
  __typename?: 'Mutation';
  updateOwnPassword?: Maybe<{ __typename?: 'UserSession'; id: string; orgId: string; userId: string }>;
};

export type OrgByIdQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  orgId: Scalars['String'];
}>;

export type OrgByIdQuery = {
  __typename?: 'Query';
  orgById?: Maybe<{
    __typename?: 'Organization';
    id?: Maybe<string>;
    name?: Maybe<string>;
    orgId: string;
    orgType: OrgType;
  }>;
};

export type CurrentUserQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserQuery = {
  __typename?: 'Query';
  currentUser?: Maybe<{
    __typename?: 'CurrentUserInfo';
    loggedIn?: Maybe<boolean>;
    domain?: Maybe<{
      __typename?: 'WebAppDomain';
      type: CdxWebAppDomain;
      selectedPage?: Maybe<CdxWebPage>;
      navItems?: Maybe<
        Array<
          Maybe<{
            __typename?: 'WebNav';
            label?: Maybe<string>;
            appDomain?: Maybe<CdxWebAppDomain>;
            subNavItems?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'WebNav';
                  label?: Maybe<string>;
                  appDomain?: Maybe<CdxWebAppDomain>;
                  page?: Maybe<{
                    __typename?: 'WebPage';
                    type: CdxWebPage;
                    parameters?: Maybe<
                      Array<
                        Maybe<
                          | { __typename: 'NVPStr'; name: string; strValue: string }
                          | { __typename: 'NVPId'; name: string; idValue: string }
                        >
                      >
                    >;
                    commands?: Maybe<
                      Array<
                        Maybe<{
                          __typename?: 'WebNav';
                          label?: Maybe<string>;
                          appDomain?: Maybe<CdxWebAppDomain>;
                          page?: Maybe<{
                            __typename?: 'WebPage';
                            type: CdxWebPage;
                            parameters?: Maybe<
                              Array<
                                Maybe<
                                  | { __typename: 'NVPStr'; name: string; strValue: string }
                                  | { __typename: 'NVPId'; name: string; idValue: string }
                                >
                              >
                            >;
                          }>;
                        }>
                      >
                    >;
                    pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
                  }>;
                }>
              >
            >;
            page?: Maybe<{
              __typename?: 'WebPage';
              type: CdxWebPage;
              parameters?: Maybe<
                Array<
                  Maybe<
                    | { __typename: 'NVPStr'; name: string; strValue: string }
                    | { __typename: 'NVPId'; name: string; idValue: string }
                  >
                >
              >;
              commands?: Maybe<
                Array<
                  Maybe<{
                    __typename?: 'WebNav';
                    label?: Maybe<string>;
                    appDomain?: Maybe<CdxWebAppDomain>;
                    page?: Maybe<{
                      __typename?: 'WebPage';
                      type: CdxWebPage;
                      parameters?: Maybe<
                        Array<
                          Maybe<
                            | { __typename: 'NVPStr'; name: string; strValue: string }
                            | { __typename: 'NVPId'; name: string; idValue: string }
                          >
                        >
                      >;
                    }>;
                  }>
                >
              >;
              pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
            }>;
          }>
        >
      >;
    }>;
    tokenUser?: Maybe<{
      __typename?: 'TokenUser';
      token?: Maybe<string>;
      session?: Maybe<{
        __typename?: 'UserSession';
        id: string;
        orgId: string;
        userId: string;
        pollInterval?: Maybe<number>;
        defaultAuthorities?: Maybe<Array<Maybe<string>>>;
      }>;
    }>;
  }>;
};

export type RemoveAmPolicyMutationVariables = Exact<{
  policySid: Scalars['ID'];
}>;

export type RemoveAmPolicyMutation = { __typename?: 'Mutation'; removeAMPolicy?: Maybe<string> };

export type RemoveAmPoliciesMutationVariables = Exact<{
  deleteAMPoliciesInput: DeleteAmPoliciesInput;
}>;

export type RemoveAmPoliciesMutation = { __typename?: 'Mutation'; removeAMPolicies?: Maybe<string> };

export type CreateAmPermissionMutationVariables = Exact<{
  permissionInfo: CreateAmPermissionInput;
}>;

export type CreateAmPermissionMutation = {
  __typename?: 'Mutation';
  createAMPermission?: Maybe<{
    __typename?: 'AMPermission';
    id?: Maybe<string>;
    effect: PermissionEffect;
    actions?: Maybe<
      Array<
        Maybe<{
          __typename?: 'AMPermissionAction';
          id?: Maybe<string>;
          service: CdxService;
          facet: CdxFacet;
          verb: PermissionVerb;
        }>
      >
    >;
  }>;
};

export type UpdateAmPermissionMutationVariables = Exact<{
  updateAMPermissionInput?: Maybe<UpdateAmPermissionInput>;
}>;

export type UpdateAmPermissionMutation = {
  __typename?: 'Mutation';
  updateAMPermission?: Maybe<{
    __typename?: 'AMPermission';
    id?: Maybe<string>;
    effect: PermissionEffect;
    predicate?: Maybe<PermissionPredicate>;
    predVar1?: Maybe<string>;
    predParam1?: Maybe<string>;
  }>;
};

export type RemoveAmPermissionMutationVariables = Exact<{
  permissionSid: Scalars['ID'];
}>;

export type RemoveAmPermissionMutation = { __typename?: 'Mutation'; removeAMPermission?: Maybe<string> };

export type UpdateAmPolicyMutationVariables = Exact<{
  updateAMPolicyInput: UpdateAmPolicyInput;
}>;

export type UpdateAmPolicyMutation = {
  __typename?: 'Mutation';
  updateAMPolicy?: Maybe<{
    __typename?: 'AMPolicy';
    id?: Maybe<string>;
    name: string;
    tmpl?: Maybe<boolean>;
    tmplUseAsIs?: Maybe<boolean>;
    tmplServiceType?: Maybe<CdxService>;
  }>;
};

export type RemoveAmPermissionActionMutationVariables = Exact<{
  permissionActionSid: Scalars['ID'];
}>;

export type RemoveAmPermissionActionMutation = { __typename?: 'Mutation'; removeAMPermissionAction?: Maybe<string> };

export type LogOutQueryVariables = Exact<{ [key: string]: never }>;

export type LogOutQuery = { __typename?: 'Query'; logOut?: Maybe<{ __typename?: 'LogOutInfo'; successful: boolean }> };

export type UserThemeQueryVariables = Exact<{
  themeColorMode?: Maybe<ThemeColorMode>;
}>;

export type UserThemeQuery = {
  __typename?: 'Query';
  userTheme?: Maybe<{
    __typename?: 'DashTheme';
    themeColorMode?: Maybe<ThemeColorMode>;
    themeFontSize?: Maybe<ThemeFontSize>;
    dashThemeColor?: Maybe<{
      __typename?: 'DashThemeColor';
      paletteNm?: Maybe<string>;
      themePrimary?: Maybe<string>;
      themeLighterAlt?: Maybe<string>;
      themeLighter?: Maybe<string>;
      themeLight?: Maybe<string>;
      themeTertiary?: Maybe<string>;
      themeSecondary?: Maybe<string>;
      themeDarkAlt?: Maybe<string>;
      themeDark?: Maybe<string>;
      themeDarker?: Maybe<string>;
      neutralLighterAlt?: Maybe<string>;
      neutralLighter?: Maybe<string>;
      neutralLight?: Maybe<string>;
      neutralQuaternaryAlt?: Maybe<string>;
      neutralQuaternary?: Maybe<string>;
      neutralTertiaryAlt?: Maybe<string>;
      neutralTertiary?: Maybe<string>;
      neutralSecondary?: Maybe<string>;
      neutralPrimaryAlt?: Maybe<string>;
      neutralPrimary?: Maybe<string>;
      neutralDark?: Maybe<string>;
      black?: Maybe<string>;
      white?: Maybe<string>;
    }>;
  }>;
};

export type DashThemeColorForOrgQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
  pageableInput?: Maybe<PageableInput>;
}>;

export type DashThemeColorForOrgQuery = {
  __typename?: 'Query';
  dashThemeColorForOrg?: Maybe<{
    __typename?: 'DashThemeColorConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'DashThemeColor';
          id?: Maybe<string>;
          paletteNm?: Maybe<string>;
          defaultPalette?: Maybe<boolean>;
          allowDark?: Maybe<boolean>;
          themeColorMode?: Maybe<ThemeColorMode>;
          themePrimary?: Maybe<string>;
          neutralPrimary?: Maybe<string>;
          white?: Maybe<string>;
        }>
      >
    >;
  }>;
};

export type DashSiteForOrgQueryVariables = Exact<{
  orgSidInput?: Maybe<OrgSidInput>;
}>;

export type DashSiteForOrgQuery = {
  __typename?: 'Query';
  dashSiteForOrg?: Maybe<{ __typename?: 'DashSite'; id?: Maybe<string>; active?: Maybe<boolean> }>;
};

export type CreateDashThemeColorMutationVariables = Exact<{
  createDashThemeColorInput: CreateDashThemeColorInput;
}>;

export type CreateDashThemeColorMutation = {
  __typename?: 'Mutation';
  createDashThemeColor?: Maybe<{
    __typename?: 'DashThemeColor';
    id?: Maybe<string>;
    defaultPalette?: Maybe<boolean>;
    allowDark?: Maybe<boolean>;
    themeColorMode?: Maybe<ThemeColorMode>;
    paletteNm?: Maybe<string>;
    themePrimary?: Maybe<string>;
    themeLighterAlt?: Maybe<string>;
    themeLighter?: Maybe<string>;
    themeLight?: Maybe<string>;
    themeTertiary?: Maybe<string>;
    themeSecondary?: Maybe<string>;
    themeDarkAlt?: Maybe<string>;
    themeDark?: Maybe<string>;
    themeDarker?: Maybe<string>;
    neutralLighterAlt?: Maybe<string>;
    neutralLighter?: Maybe<string>;
    neutralLight?: Maybe<string>;
    neutralQuaternaryAlt?: Maybe<string>;
    neutralQuaternary?: Maybe<string>;
    neutralTertiaryAlt?: Maybe<string>;
    neutralTertiary?: Maybe<string>;
    neutralSecondary?: Maybe<string>;
    neutralPrimaryAlt?: Maybe<string>;
    neutralPrimary?: Maybe<string>;
    neutralDark?: Maybe<string>;
    black?: Maybe<string>;
    white?: Maybe<string>;
  }>;
};

export type DashThemeColorByNameQueryVariables = Exact<{
  ownedInputName?: Maybe<OwnedInputName>;
}>;

export type DashThemeColorByNameQuery = {
  __typename?: 'Query';
  dashThemeColorByName?: Maybe<{
    __typename?: 'DashThemeColor';
    id?: Maybe<string>;
    defaultPalette?: Maybe<boolean>;
    allowDark?: Maybe<boolean>;
    themeColorMode?: Maybe<ThemeColorMode>;
    paletteNm?: Maybe<string>;
    themePrimary?: Maybe<string>;
    themeLighterAlt?: Maybe<string>;
    themeLighter?: Maybe<string>;
    themeLight?: Maybe<string>;
    themeTertiary?: Maybe<string>;
    themeSecondary?: Maybe<string>;
    themeDarkAlt?: Maybe<string>;
    themeDark?: Maybe<string>;
    themeDarker?: Maybe<string>;
    neutralLighterAlt?: Maybe<string>;
    neutralLighter?: Maybe<string>;
    neutralLight?: Maybe<string>;
    neutralQuaternaryAlt?: Maybe<string>;
    neutralQuaternary?: Maybe<string>;
    neutralTertiaryAlt?: Maybe<string>;
    neutralTertiary?: Maybe<string>;
    neutralSecondary?: Maybe<string>;
    neutralPrimaryAlt?: Maybe<string>;
    neutralPrimary?: Maybe<string>;
    neutralDark?: Maybe<string>;
    black?: Maybe<string>;
    white?: Maybe<string>;
  }>;
};

export type UpdateDashThemeColorMutationVariables = Exact<{
  updateDashThemeColorInput: UpdateDashThemeColorInput;
}>;

export type UpdateDashThemeColorMutation = {
  __typename?: 'Mutation';
  updateDashThemeColor?: Maybe<{
    __typename?: 'DashThemeColor';
    id?: Maybe<string>;
    defaultPalette?: Maybe<boolean>;
    allowDark?: Maybe<boolean>;
    themeColorMode?: Maybe<ThemeColorMode>;
    paletteNm?: Maybe<string>;
    themePrimary?: Maybe<string>;
    themeLighterAlt?: Maybe<string>;
    themeLighter?: Maybe<string>;
    themeLight?: Maybe<string>;
    themeTertiary?: Maybe<string>;
    themeSecondary?: Maybe<string>;
    themeDarkAlt?: Maybe<string>;
    themeDark?: Maybe<string>;
    themeDarker?: Maybe<string>;
    neutralLighterAlt?: Maybe<string>;
    neutralLighter?: Maybe<string>;
    neutralLight?: Maybe<string>;
    neutralQuaternaryAlt?: Maybe<string>;
    neutralQuaternary?: Maybe<string>;
    neutralTertiaryAlt?: Maybe<string>;
    neutralTertiary?: Maybe<string>;
    neutralSecondary?: Maybe<string>;
    neutralPrimaryAlt?: Maybe<string>;
    neutralPrimary?: Maybe<string>;
    neutralDark?: Maybe<string>;
    black?: Maybe<string>;
    white?: Maybe<string>;
  }>;
};

export type CreateDefaultDashThemeMutationVariables = Exact<{
  createDefaultDashThemeInput: CreateDefaultDashThemeInput;
}>;

export type CreateDefaultDashThemeMutation = {
  __typename?: 'Mutation';
  createDefaultDashTheme?: Maybe<{
    __typename?: 'DashTheme';
    id?: Maybe<string>;
    themeColorMode?: Maybe<ThemeColorMode>;
    themeFontSize?: Maybe<ThemeFontSize>;
    dashThemeColor?: Maybe<{ __typename?: 'DashThemeColor'; id?: Maybe<string> }>;
  }>;
};

export type DefaultDashThemeForSiteQueryVariables = Exact<{
  ownedInput?: Maybe<OwnedInput>;
}>;

export type DefaultDashThemeForSiteQuery = {
  __typename?: 'Query';
  defaultDashThemeForSite?: Maybe<{
    __typename?: 'DashTheme';
    id?: Maybe<string>;
    themeColorMode?: Maybe<ThemeColorMode>;
    themeFontSize?: Maybe<ThemeFontSize>;
    dashThemeColor?: Maybe<{
      __typename?: 'DashThemeColor';
      id?: Maybe<string>;
      themePrimary?: Maybe<string>;
      neutralPrimary?: Maybe<string>;
      white?: Maybe<string>;
    }>;
  }>;
};

export type UpdateDefaultDashThemeMutationVariables = Exact<{
  updateDefaultDashThemeInput: UpdateDefaultDashThemeInput;
}>;

export type UpdateDefaultDashThemeMutation = {
  __typename?: 'Mutation';
  updateDefaultDashTheme?: Maybe<{
    __typename?: 'DashTheme';
    id?: Maybe<string>;
    themeColorMode?: Maybe<ThemeColorMode>;
    themeFontSize?: Maybe<ThemeFontSize>;
    dashThemeColor?: Maybe<{ __typename?: 'DashThemeColor'; id?: Maybe<string> }>;
  }>;
};

export type RemoveDashThemeColorMutationVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type RemoveDashThemeColorMutation = {
  __typename?: 'Mutation';
  removeDashThemeColor?: Maybe<GqOperationResponse>;
};

export type RemoveDefaultDashThemeMutationVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type RemoveDefaultDashThemeMutation = {
  __typename?: 'Mutation';
  removeDefaultDashTheme?: Maybe<GqOperationResponse>;
};

export type CurrentUserDashThemePageQueryVariables = Exact<{ [key: string]: never }>;

export type CurrentUserDashThemePageQuery = {
  __typename?: 'Query';
  currentUserDashThemePage?: Maybe<{
    __typename?: 'UserDashThemePage';
    themeColorModes?: Maybe<Array<Maybe<ThemeColorMode>>>;
    themeFontSizes?: Maybe<Array<Maybe<ThemeFontSize>>>;
    themeColorPalettes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'DashThemeColor';
          id?: Maybe<string>;
          allowDark?: Maybe<boolean>;
          themePrimary?: Maybe<string>;
          neutralPrimary?: Maybe<string>;
          white?: Maybe<string>;
        }>
      >
    >;
    dashTheme?: Maybe<{
      __typename?: 'DashTheme';
      id?: Maybe<string>;
      themeFontSize?: Maybe<ThemeFontSize>;
      themeColorMode?: Maybe<ThemeColorMode>;
      dashThemeColor?: Maybe<{
        __typename?: 'DashThemeColor';
        id?: Maybe<string>;
        themePrimary?: Maybe<string>;
        neutralPrimary?: Maybe<string>;
        white?: Maybe<string>;
      }>;
    }>;
  }>;
};

export type FindUserByEmailQueryVariables = Exact<{
  userEmail: Scalars['String'];
}>;

export type FindUserByEmailQuery = {
  __typename?: 'Query';
  findUserByEmail?: Maybe<{
    __typename?: 'User';
    id: string;
    email: string;
    person?: Maybe<{ __typename?: 'Person'; id: string; firstNm: string; lastNm?: Maybe<string> }>;
  }>;
};

export type FindUserQueryVariables = Exact<{
  ownedInputSid: OwnedInputSid;
}>;

export type FindUserQuery = {
  __typename?: 'Query';
  findUser?: Maybe<{
    __typename?: 'User';
    id: string;
    email: string;
    person?: Maybe<{ __typename?: 'Person'; id: string; firstNm: string; lastNm?: Maybe<string> }>;
  }>;
};

export type CreateOrUpdateOwnDashThemeMutationVariables = Exact<{
  dashThemeInput: DashThemeInput;
}>;

export type CreateOrUpdateOwnDashThemeMutation = {
  __typename?: 'Mutation';
  createOrUpdateOwnDashTheme?: Maybe<{
    __typename?: 'DashTheme';
    id?: Maybe<string>;
    themeColorMode?: Maybe<ThemeColorMode>;
    themeFontSize?: Maybe<ThemeFontSize>;
    dashThemeColor?: Maybe<{
      __typename?: 'DashThemeColor';
      id?: Maybe<string>;
      themePrimary?: Maybe<string>;
      neutralPrimary?: Maybe<string>;
      white?: Maybe<string>;
    }>;
  }>;
};

export type SetDashThemeColorDefaultMutationVariables = Exact<{
  dashThemeColorDefaultInput: DashThemeColorDefaultInput;
}>;

export type SetDashThemeColorDefaultMutation = {
  __typename?: 'Mutation';
  setDashThemeColorDefault?: Maybe<{
    __typename?: 'DashThemeColor';
    id?: Maybe<string>;
    themePrimary?: Maybe<string>;
    neutralPrimary?: Maybe<string>;
    white?: Maybe<string>;
  }>;
};

export type ChangeOwnPasswordPageQueryVariables = Exact<{ [key: string]: never }>;

export type ChangeOwnPasswordPageQuery = {
  __typename?: 'Query';
  changeOwnPasswordPage?: Maybe<{
    __typename?: 'PasswordPage';
    ruleGroup: {
      __typename?: 'PasswordRuleGroup';
      numberOfCharacteristics?: Maybe<number>;
      rules?: Maybe<
        Array<
          Maybe<
            | { __typename: 'PasswordLengthRule'; minLength?: Maybe<number>; maxLength?: Maybe<number> }
            | { __typename: 'PasswordWhitespaceRule'; allowedWhitespace?: Maybe<WhitespaceRuleType> }
            | {
                __typename: 'PasswordCharacterRule';
                characterType?: Maybe<PasswordCharacterType>;
                numberOfCharacters?: Maybe<number>;
              }
            | { __typename: 'PasswordStrengthRule'; requiredStrengthLevel: number }
            | {
                __typename: 'PasswordRuleGroup';
                numberOfCharacteristics?: Maybe<number>;
                rules?: Maybe<
                  Array<
                    Maybe<
                      | { __typename: 'PasswordLengthRule'; minLength?: Maybe<number>; maxLength?: Maybe<number> }
                      | { __typename: 'PasswordWhitespaceRule'; allowedWhitespace?: Maybe<WhitespaceRuleType> }
                      | {
                          __typename: 'PasswordCharacterRule';
                          characterType?: Maybe<PasswordCharacterType>;
                          numberOfCharacters?: Maybe<number>;
                        }
                      | { __typename: 'PasswordStrengthRule'; requiredStrengthLevel: number }
                      | {
                          __typename: 'PasswordRuleGroup';
                          numberOfCharacteristics?: Maybe<number>;
                          rules?: Maybe<
                            Array<
                              Maybe<
                                | {
                                    __typename: 'PasswordLengthRule';
                                    minLength?: Maybe<number>;
                                    maxLength?: Maybe<number>;
                                  }
                                | {
                                    __typename: 'PasswordWhitespaceRule';
                                    allowedWhitespace?: Maybe<WhitespaceRuleType>;
                                  }
                                | {
                                    __typename: 'PasswordCharacterRule';
                                    characterType?: Maybe<PasswordCharacterType>;
                                    numberOfCharacters?: Maybe<number>;
                                  }
                                | { __typename: 'PasswordStrengthRule'; requiredStrengthLevel: number }
                                | { __typename: 'PasswordRuleGroup'; numberOfCharacteristics?: Maybe<number> }
                              >
                            >
                          >;
                        }
                    >
                  >
                >;
              }
          >
        >
      >;
    };
  }>;
};

type UnionPasswordRule_PasswordLengthRule_Fragment = {
  __typename: 'PasswordLengthRule';
  minLength?: Maybe<number>;
  maxLength?: Maybe<number>;
};

type UnionPasswordRule_PasswordWhitespaceRule_Fragment = {
  __typename: 'PasswordWhitespaceRule';
  allowedWhitespace?: Maybe<WhitespaceRuleType>;
};

type UnionPasswordRule_PasswordCharacterRule_Fragment = {
  __typename: 'PasswordCharacterRule';
  characterType?: Maybe<PasswordCharacterType>;
  numberOfCharacters?: Maybe<number>;
};

type UnionPasswordRule_PasswordStrengthRule_Fragment = {
  __typename: 'PasswordStrengthRule';
  requiredStrengthLevel: number;
};

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

export type ExchangeActivityInProcessQuery = {
  __typename?: 'Query';
  exchangeActivityInProcess?: Maybe<{
    __typename?: 'OrganizationLinkConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'OrganizationLink';
          id: string;
          orgId: string;
          name: string;
          type?: Maybe<CdxWebPage>;
          activityTime?: Maybe<any>;
        }>
      >
    >;
  }>;
};

export type ExchangeActivityTransmittedQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;

export type ExchangeActivityTransmittedQuery = {
  __typename?: 'Query';
  exchangeActivityTransmitted?: Maybe<{
    __typename?: 'OrganizationLinkConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'OrganizationLink';
          id: string;
          orgId: string;
          name: string;
          type?: Maybe<CdxWebPage>;
          activityTime?: Maybe<any>;
        }>
      >
    >;
  }>;
};

export type ExchangeActivityErroredQueryVariables = Exact<{
  orgSidInput: OrgSidInput;
  dateRange: DateTimeRangeInput;
  pageableInput: PageableInput;
}>;

export type ExchangeActivityErroredQuery = {
  __typename?: 'Query';
  exchangeActivityErrored?: Maybe<{
    __typename?: 'OrganizationLinkConnection';
    paginationInfo: {
      __typename?: 'PaginationInfo';
      totalPages?: Maybe<number>;
      totalElements?: Maybe<number>;
      pageNumber?: Maybe<number>;
      pageSize?: Maybe<number>;
    };
    nodes?: Maybe<
      Array<
        Maybe<{
          __typename?: 'OrganizationLink';
          id: string;
          orgId: string;
          name: string;
          type?: Maybe<CdxWebPage>;
          activityTime?: Maybe<any>;
        }>
      >
    >;
  }>;
};

export type NavigateToNewDomainQueryVariables = Exact<{
  domainNavInput: DomainNavInput;
}>;

export type NavigateToNewDomainQuery = {
  __typename?: 'Query';
  navigateToNewDomain?: Maybe<{
    __typename?: 'WebAppDomain';
    type: CdxWebAppDomain;
    selectedPage?: Maybe<CdxWebPage>;
    navItems?: Maybe<
      Array<
        Maybe<{
          __typename?: 'WebNav';
          label?: Maybe<string>;
          appDomain?: Maybe<CdxWebAppDomain>;
          subNavItems?: Maybe<
            Array<
              Maybe<{
                __typename?: 'WebNav';
                label?: Maybe<string>;
                appDomain?: Maybe<CdxWebAppDomain>;
                page?: Maybe<{
                  __typename?: 'WebPage';
                  type: CdxWebPage;
                  parameters?: Maybe<
                    Array<
                      Maybe<
                        | { __typename: 'NVPStr'; name: string; strValue: string }
                        | { __typename: 'NVPId'; name: string; idValue: string }
                      >
                    >
                  >;
                  commands?: Maybe<
                    Array<
                      Maybe<{
                        __typename?: 'WebNav';
                        label?: Maybe<string>;
                        appDomain?: Maybe<CdxWebAppDomain>;
                        page?: Maybe<{
                          __typename?: 'WebPage';
                          type: CdxWebPage;
                          parameters?: Maybe<
                            Array<
                              Maybe<
                                | { __typename: 'NVPStr'; name: string; strValue: string }
                                | { __typename: 'NVPId'; name: string; idValue: string }
                              >
                            >
                          >;
                        }>;
                      }>
                    >
                  >;
                  pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
                }>;
              }>
            >
          >;
          page?: Maybe<{
            __typename?: 'WebPage';
            type: CdxWebPage;
            parameters?: Maybe<
              Array<
                Maybe<
                  | { __typename: 'NVPStr'; name: string; strValue: string }
                  | { __typename: 'NVPId'; name: string; idValue: string }
                >
              >
            >;
            commands?: Maybe<
              Array<
                Maybe<{
                  __typename?: 'WebNav';
                  label?: Maybe<string>;
                  appDomain?: Maybe<CdxWebAppDomain>;
                  page?: Maybe<{
                    __typename?: 'WebPage';
                    type: CdxWebPage;
                    parameters?: Maybe<
                      Array<
                        Maybe<
                          | { __typename: 'NVPStr'; name: string; strValue: string }
                          | { __typename: 'NVPId'; name: string; idValue: string }
                        >
                      >
                    >;
                  }>;
                }>
              >
            >;
            pivots?: Maybe<Array<Maybe<{ __typename?: 'WebPivot'; label?: Maybe<string>; type: CdxWebPivot }>>>;
          }>;
        }>
      >
    >;
  }>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<BeginLoginQuery, BeginLoginQueryVariables>(BeginLoginDocument, options);
}
export function useBeginLoginLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<BeginLoginQuery, BeginLoginQueryVariables>(BeginLoginDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<PasswordLoginMutation, PasswordLoginMutationVariables>(PasswordLoginDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(
    WorkPacketStatusesDocument,
    options
  );
}
export function useWorkPacketStatusesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WorkPacketStatusesQuery, WorkPacketStatusesQueryVariables>(
    WorkPacketStatusesDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(
    WorkPacketStatusDetailsDocument,
    options
  );
}
export function useWorkPacketStatusDetailsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>(
    WorkPacketStatusDetailsDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(WorkPacketStatusDocument, options);
}
export function useWorkPacketStatusLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WorkPacketStatusQuery, WorkPacketStatusQueryVariables>(WorkPacketStatusDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(DashboardPeriodsDocument, options);
}
export function useDashboardPeriodsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>(DashboardPeriodsDocument, options);
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
export function useAmPolicyPageQuery(
  baseOptions: Apollo.QueryHookOptions<AmPolicyPageQuery, AmPolicyPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, options);
}
export function useAmPolicyPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyPageQuery, AmPolicyPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, options);
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
export function useAmPolicyFacetsForServiceQuery(
  baseOptions: Apollo.QueryHookOptions<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(
    AmPolicyFacetsForServiceDocument,
    options
  );
}
export function useAmPolicyFacetsForServiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(
    AmPolicyFacetsForServiceDocument,
    options
  );
}
export type AmPolicyFacetsForServiceQueryHookResult = ReturnType<typeof useAmPolicyFacetsForServiceQuery>;
export type AmPolicyFacetsForServiceLazyQueryHookResult = ReturnType<typeof useAmPolicyFacetsForServiceLazyQuery>;
export type AmPolicyFacetsForServiceQueryResult = Apollo.QueryResult<
  AmPolicyFacetsForServiceQuery,
  AmPolicyFacetsForServiceQueryVariables
>;
export const AmPolicyVerbForFacetDocument = gql`
  query AMPolicyVerbForFacet($orgSid: ID!, $cdxService: CDXService!, $cdxFacet: CDXFacet!) {
    amPolicyVerbForFacet(orgSid: $orgSid, cdxService: $cdxService, cdxFacet: $cdxFacet) {
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
export function useAmPolicyVerbForFacetQuery(
  baseOptions: Apollo.QueryHookOptions<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(
    AmPolicyVerbForFacetDocument,
    options
  );
}
export function useAmPolicyVerbForFacetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(
    AmPolicyVerbForFacetDocument,
    options
  );
}
export type AmPolicyVerbForFacetQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetQuery>;
export type AmPolicyVerbForFacetLazyQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetLazyQuery>;
export type AmPolicyVerbForFacetQueryResult = Apollo.QueryResult<
  AmPolicyVerbForFacetQuery,
  AmPolicyVerbForFacetQueryVariables
>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrgMutation, CreateOrgMutationVariables>(CreateOrgDocument, options);
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
  ${PolicyFragmentFragmentDoc}
`;
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
export function useCreateAmPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>(CreateAmPolicyDocument, options);
}
export type CreateAmPolicyMutationHookResult = ReturnType<typeof useCreateAmPolicyMutation>;
export type CreateAmPolicyMutationResult = Apollo.MutationResult<CreateAmPolicyMutation>;
export type CreateAmPolicyMutationOptions = Apollo.BaseMutationOptions<
  CreateAmPolicyMutation,
  CreateAmPolicyMutationVariables
>;
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
export function useCreateAmGroupMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAmGroupMutation, CreateAmGroupMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAmGroupMutation, CreateAmGroupMutationVariables>(CreateAmGroupDocument, options);
}
export type CreateAmGroupMutationHookResult = ReturnType<typeof useCreateAmGroupMutation>;
export type CreateAmGroupMutationResult = Apollo.MutationResult<CreateAmGroupMutation>;
export type CreateAmGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateAmGroupMutation,
  CreateAmGroupMutationVariables
>;
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
export function useSystemTemplateAmGroupByNameQuery(
  baseOptions: Apollo.QueryHookOptions<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>(
    SystemTemplateAmGroupByNameDocument,
    options
  );
}
export function useSystemTemplateAmGroupByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SystemTemplateAmGroupByNameQuery, SystemTemplateAmGroupByNameQueryVariables>(
    SystemTemplateAmGroupByNameDocument,
    options
  );
}
export type SystemTemplateAmGroupByNameQueryHookResult = ReturnType<typeof useSystemTemplateAmGroupByNameQuery>;
export type SystemTemplateAmGroupByNameLazyQueryHookResult = ReturnType<typeof useSystemTemplateAmGroupByNameLazyQuery>;
export type SystemTemplateAmGroupByNameQueryResult = Apollo.QueryResult<
  SystemTemplateAmGroupByNameQuery,
  SystemTemplateAmGroupByNameQueryVariables
>;
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
export function useCreateUserMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
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
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useAmPoliciesForOrgPQuery(
  baseOptions: Apollo.QueryHookOptions<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>(AmPoliciesForOrgPDocument, options);
}
export function useAmPoliciesForOrgPLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmPoliciesForOrgPQuery, AmPoliciesForOrgPQueryVariables>(
    AmPoliciesForOrgPDocument,
    options
  );
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
export function useTopLevelOrgsByTypeQuery(
  baseOptions: Apollo.QueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(
    TopLevelOrgsByTypeDocument,
    options
  );
}
export function useTopLevelOrgsByTypeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<TopLevelOrgsByTypeQuery, TopLevelOrgsByTypeQueryVariables>(
    TopLevelOrgsByTypeDocument,
    options
  );
}
export type TopLevelOrgsByTypeQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeQuery>;
export type TopLevelOrgsByTypeLazyQueryHookResult = ReturnType<typeof useTopLevelOrgsByTypeLazyQuery>;
export type TopLevelOrgsByTypeQueryResult = Apollo.QueryResult<
  TopLevelOrgsByTypeQuery,
  TopLevelOrgsByTypeQueryVariables
>;
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
  ${PaginationInfoFragmentFragmentDoc}
`;

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
export function useAmGroupsForOrgPQuery(
  baseOptions: Apollo.QueryHookOptions<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>(AmGroupsForOrgPDocument, options);
}
export function useAmGroupsForOrgPLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>(AmGroupsForOrgPDocument, options);
}
export type AmGroupsForOrgPQueryHookResult = ReturnType<typeof useAmGroupsForOrgPQuery>;
export type AmGroupsForOrgPLazyQueryHookResult = ReturnType<typeof useAmGroupsForOrgPLazyQuery>;
export type AmGroupsForOrgPQueryResult = Apollo.QueryResult<AmGroupsForOrgPQuery, AmGroupsForOrgPQueryVariables>;
export const UsersForOrgFpDocument = gql`
  query UsersForOrgFP($orgSid: ID!, $userFilter: UserFilterInput, $pageableInput: PageableInput) {
    usersForOrg(orgSid: $orgSid, userFilter: $userFilter, pageableInput: $pageableInput) {
      paginationInfo {
        ...paginationInfoFragment
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>(UsersForOrgFpDocument, options);
}
export function useUsersForOrgFpLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UsersForOrgFpQuery, UsersForOrgFpQueryVariables>(UsersForOrgFpDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(
    DirectOrganizationsDocument,
    options
  );
}
export function useDirectOrganizationsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DirectOrganizationsQuery, DirectOrganizationsQueryVariables>(
    DirectOrganizationsDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(
    DirectOrganizationsFDocument,
    options
  );
}
export function useDirectOrganizationsFLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DirectOrganizationsFQuery, DirectOrganizationsFQueryVariables>(
    DirectOrganizationsFDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(
    DirectOrganizationsFpDocument,
    options
  );
}
export function useDirectOrganizationsFpLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DirectOrganizationsFpQuery, DirectOrganizationsFpQueryVariables>(
    DirectOrganizationsFpDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, options);
}
export function useWpProcessErrorsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WpProcessErrorsQuery, WpProcessErrorsQueryVariables>(WpProcessErrorsDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, options);
}
export function useWpTransmissionsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<WpTransmissionsQuery, WpTransmissionsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<WpTransmissionsQuery, WpTransmissionsQueryVariables>(WpTransmissionsDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AmPolicyQuery, AmPolicyQueryVariables>(AmPolicyDocument, options);
}
export function useAmPolicyLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyQuery, AmPolicyQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AmPolicyQuery, AmPolicyQueryVariables>(AmPolicyDocument, options);
}
export type AmPolicyQueryHookResult = ReturnType<typeof useAmPolicyQuery>;
export type AmPolicyLazyQueryHookResult = ReturnType<typeof useAmPolicyLazyQuery>;
export type AmPolicyQueryResult = Apollo.QueryResult<AmPolicyQuery, AmPolicyQueryVariables>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(
    ScheduleOccurrencesDocument,
    options
  );
}
export function useScheduleOccurrencesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ScheduleOccurrencesQuery, ScheduleOccurrencesQueryVariables>(
    ScheduleOccurrencesDocument,
    options
  );
}
export type ScheduleOccurrencesQueryHookResult = ReturnType<typeof useScheduleOccurrencesQuery>;
export type ScheduleOccurrencesLazyQueryHookResult = ReturnType<typeof useScheduleOccurrencesLazyQuery>;
export type ScheduleOccurrencesQueryResult = Apollo.QueryResult<
  ScheduleOccurrencesQuery,
  ScheduleOccurrencesQueryVariables
>;
export const UpdateAmPermissionActionDocument = gql`
  mutation UpdateAMPermissionAction($updateAMPermissionActionInput: UpdateAMPermissionActionInput) {
    updateAMPermissionAction(updateAMPermissionActionInput: $updateAMPermissionActionInput) {
      id
      service
      facet
      verb
    }
  }
`;
export type UpdateAmPermissionActionMutationFn = Apollo.MutationFunction<
  UpdateAmPermissionActionMutation,
  UpdateAmPermissionActionMutationVariables
>;

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
export function useUpdateAmPermissionActionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAmPermissionActionMutation, UpdateAmPermissionActionMutationVariables>(
    UpdateAmPermissionActionDocument,
    options
  );
}
export type UpdateAmPermissionActionMutationHookResult = ReturnType<typeof useUpdateAmPermissionActionMutation>;
export type UpdateAmPermissionActionMutationResult = Apollo.MutationResult<UpdateAmPermissionActionMutation>;
export type UpdateAmPermissionActionMutationOptions = Apollo.BaseMutationOptions<
  UpdateAmPermissionActionMutation,
  UpdateAmPermissionActionMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOwnPasswordMutation, UpdateOwnPasswordMutationVariables>(
    UpdateOwnPasswordDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<OrgByIdQuery, OrgByIdQueryVariables>(OrgByIdDocument, options);
}
export function useOrgByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OrgByIdQuery, OrgByIdQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<OrgByIdQuery, OrgByIdQueryVariables>(OrgByIdDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
}
export function useCurrentUserLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
}
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
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
export function useRemoveAmPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAmPolicyMutation, RemoveAmPolicyMutationVariables>(RemoveAmPolicyDocument, options);
}
export type RemoveAmPolicyMutationHookResult = ReturnType<typeof useRemoveAmPolicyMutation>;
export type RemoveAmPolicyMutationResult = Apollo.MutationResult<RemoveAmPolicyMutation>;
export type RemoveAmPolicyMutationOptions = Apollo.BaseMutationOptions<
  RemoveAmPolicyMutation,
  RemoveAmPolicyMutationVariables
>;
export const RemoveAmPoliciesDocument = gql`
  mutation RemoveAMPolicies($deleteAMPoliciesInput: DeleteAMPoliciesInput!) {
    removeAMPolicies(deleteAMPoliciesInput: $deleteAMPoliciesInput)
  }
`;
export type RemoveAmPoliciesMutationFn = Apollo.MutationFunction<
  RemoveAmPoliciesMutation,
  RemoveAmPoliciesMutationVariables
>;

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
export function useRemoveAmPoliciesMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAmPoliciesMutation, RemoveAmPoliciesMutationVariables>(
    RemoveAmPoliciesDocument,
    options
  );
}
export type RemoveAmPoliciesMutationHookResult = ReturnType<typeof useRemoveAmPoliciesMutation>;
export type RemoveAmPoliciesMutationResult = Apollo.MutationResult<RemoveAmPoliciesMutation>;
export type RemoveAmPoliciesMutationOptions = Apollo.BaseMutationOptions<
  RemoveAmPoliciesMutation,
  RemoveAmPoliciesMutationVariables
>;
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
export type CreateAmPermissionMutationFn = Apollo.MutationFunction<
  CreateAmPermissionMutation,
  CreateAmPermissionMutationVariables
>;

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
export function useCreateAmPermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateAmPermissionMutation, CreateAmPermissionMutationVariables>(
    CreateAmPermissionDocument,
    options
  );
}
export type CreateAmPermissionMutationHookResult = ReturnType<typeof useCreateAmPermissionMutation>;
export type CreateAmPermissionMutationResult = Apollo.MutationResult<CreateAmPermissionMutation>;
export type CreateAmPermissionMutationOptions = Apollo.BaseMutationOptions<
  CreateAmPermissionMutation,
  CreateAmPermissionMutationVariables
>;
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
export type UpdateAmPermissionMutationFn = Apollo.MutationFunction<
  UpdateAmPermissionMutation,
  UpdateAmPermissionMutationVariables
>;

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
export function useUpdateAmPermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAmPermissionMutation, UpdateAmPermissionMutationVariables>(
    UpdateAmPermissionDocument,
    options
  );
}
export type UpdateAmPermissionMutationHookResult = ReturnType<typeof useUpdateAmPermissionMutation>;
export type UpdateAmPermissionMutationResult = Apollo.MutationResult<UpdateAmPermissionMutation>;
export type UpdateAmPermissionMutationOptions = Apollo.BaseMutationOptions<
  UpdateAmPermissionMutation,
  UpdateAmPermissionMutationVariables
>;
export const RemoveAmPermissionDocument = gql`
  mutation RemoveAMPermission($permissionSid: ID!) {
    removeAMPermission(permissionSid: $permissionSid)
  }
`;
export type RemoveAmPermissionMutationFn = Apollo.MutationFunction<
  RemoveAmPermissionMutation,
  RemoveAmPermissionMutationVariables
>;

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
export function useRemoveAmPermissionMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAmPermissionMutation, RemoveAmPermissionMutationVariables>(
    RemoveAmPermissionDocument,
    options
  );
}
export type RemoveAmPermissionMutationHookResult = ReturnType<typeof useRemoveAmPermissionMutation>;
export type RemoveAmPermissionMutationResult = Apollo.MutationResult<RemoveAmPermissionMutation>;
export type RemoveAmPermissionMutationOptions = Apollo.BaseMutationOptions<
  RemoveAmPermissionMutation,
  RemoveAmPermissionMutationVariables
>;
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
export function useUpdateAmPolicyMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateAmPolicyMutation, UpdateAmPolicyMutationVariables>(UpdateAmPolicyDocument, options);
}
export type UpdateAmPolicyMutationHookResult = ReturnType<typeof useUpdateAmPolicyMutation>;
export type UpdateAmPolicyMutationResult = Apollo.MutationResult<UpdateAmPolicyMutation>;
export type UpdateAmPolicyMutationOptions = Apollo.BaseMutationOptions<
  UpdateAmPolicyMutation,
  UpdateAmPolicyMutationVariables
>;
export const RemoveAmPermissionActionDocument = gql`
  mutation RemoveAMPermissionAction($permissionActionSid: ID!) {
    removeAMPermissionAction(permissionActionSid: $permissionActionSid)
  }
`;
export type RemoveAmPermissionActionMutationFn = Apollo.MutationFunction<
  RemoveAmPermissionActionMutation,
  RemoveAmPermissionActionMutationVariables
>;

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
export function useRemoveAmPermissionActionMutation(
  baseOptions?: Apollo.MutationHookOptions<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveAmPermissionActionMutation, RemoveAmPermissionActionMutationVariables>(
    RemoveAmPermissionActionDocument,
    options
  );
}
export type RemoveAmPermissionActionMutationHookResult = ReturnType<typeof useRemoveAmPermissionActionMutation>;
export type RemoveAmPermissionActionMutationResult = Apollo.MutationResult<RemoveAmPermissionActionMutation>;
export type RemoveAmPermissionActionMutationOptions = Apollo.BaseMutationOptions<
  RemoveAmPermissionActionMutation,
  RemoveAmPermissionActionMutationVariables
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<LogOutQuery, LogOutQueryVariables>(LogOutDocument, options);
}
export function useLogOutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LogOutQuery, LogOutQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<LogOutQuery, LogOutQueryVariables>(LogOutDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserThemeQuery, UserThemeQueryVariables>(UserThemeDocument, options);
}
export function useUserThemeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<UserThemeQuery, UserThemeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserThemeQuery, UserThemeQueryVariables>(UserThemeDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(
    DashThemeColorForOrgDocument,
    options
  );
}
export function useDashThemeColorForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DashThemeColorForOrgQuery, DashThemeColorForOrgQueryVariables>(
    DashThemeColorForOrgDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, options);
}
export function useDashSiteForOrgLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DashSiteForOrgQuery, DashSiteForOrgQueryVariables>(DashSiteForOrgDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDashThemeColorMutation, CreateDashThemeColorMutationVariables>(
    CreateDashThemeColorDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(
    DashThemeColorByNameDocument,
    options
  );
}
export function useDashThemeColorByNameLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DashThemeColorByNameQuery, DashThemeColorByNameQueryVariables>(
    DashThemeColorByNameDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDashThemeColorMutation, UpdateDashThemeColorMutationVariables>(
    UpdateDashThemeColorDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateDefaultDashThemeMutation, CreateDefaultDashThemeMutationVariables>(
    CreateDefaultDashThemeDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(
    DefaultDashThemeForSiteDocument,
    options
  );
}
export function useDefaultDashThemeForSiteLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<DefaultDashThemeForSiteQuery, DefaultDashThemeForSiteQueryVariables>(
    DefaultDashThemeForSiteDocument,
    options
  );
}
export type DefaultDashThemeForSiteQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteQuery>;
export type DefaultDashThemeForSiteLazyQueryHookResult = ReturnType<typeof useDefaultDashThemeForSiteLazyQuery>;
export type DefaultDashThemeForSiteQueryResult = Apollo.QueryResult<
  DefaultDashThemeForSiteQuery,
  DefaultDashThemeForSiteQueryVariables
>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateDefaultDashThemeMutation, UpdateDefaultDashThemeMutationVariables>(
    UpdateDefaultDashThemeDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveDashThemeColorMutation, RemoveDashThemeColorMutationVariables>(
    RemoveDashThemeColorDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RemoveDefaultDashThemeMutation, RemoveDefaultDashThemeMutationVariables>(
    RemoveDefaultDashThemeDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(
    CurrentUserDashThemePageDocument,
    options
  );
}
export function useCurrentUserDashThemePageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<CurrentUserDashThemePageQuery, CurrentUserDashThemePageQueryVariables>(
    CurrentUserDashThemePageDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
}
export function useFindUserByEmailLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<FindUserByEmailQuery, FindUserByEmailQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserByEmailQuery, FindUserByEmailQueryVariables>(FindUserByEmailDocument, options);
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
}
export function useFindUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindUserQuery, FindUserQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<FindUserQuery, FindUserQueryVariables>(FindUserDocument, options);
}
export type FindUserQueryHookResult = ReturnType<typeof useFindUserQuery>;
export type FindUserLazyQueryHookResult = ReturnType<typeof useFindUserLazyQuery>;
export type FindUserQueryResult = Apollo.QueryResult<FindUserQuery, FindUserQueryVariables>;
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateOrUpdateOwnDashThemeMutation, CreateOrUpdateOwnDashThemeMutationVariables>(
    CreateOrUpdateOwnDashThemeDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<SetDashThemeColorDefaultMutation, SetDashThemeColorDefaultMutationVariables>(
    SetDashThemeColorDefaultDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(
    ChangeOwnPasswordPageDocument,
    options
  );
}
export function useChangeOwnPasswordPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ChangeOwnPasswordPageQuery, ChangeOwnPasswordPageQueryVariables>(
    ChangeOwnPasswordPageDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(
    ExchangeActivityInProcessDocument,
    options
  );
}
export function useExchangeActivityInProcessLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExchangeActivityInProcessQuery, ExchangeActivityInProcessQueryVariables>(
    ExchangeActivityInProcessDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(
    ExchangeActivityTransmittedDocument,
    options
  );
}
export function useExchangeActivityTransmittedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExchangeActivityTransmittedQuery, ExchangeActivityTransmittedQueryVariables>(
    ExchangeActivityTransmittedDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(
    ExchangeActivityErroredDocument,
    options
  );
}
export function useExchangeActivityErroredLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ExchangeActivityErroredQuery, ExchangeActivityErroredQueryVariables>(
    ExchangeActivityErroredDocument,
    options
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
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(
    NavigateToNewDomainDocument,
    options
  );
}
export function useNavigateToNewDomainLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<NavigateToNewDomainQuery, NavigateToNewDomainQueryVariables>(
    NavigateToNewDomainDocument,
    options
  );
}
export type NavigateToNewDomainQueryHookResult = ReturnType<typeof useNavigateToNewDomainQuery>;
export type NavigateToNewDomainLazyQueryHookResult = ReturnType<typeof useNavigateToNewDomainLazyQuery>;
export type NavigateToNewDomainQueryResult = Apollo.QueryResult<
  NavigateToNewDomainQuery,
  NavigateToNewDomainQueryVariables
>;
