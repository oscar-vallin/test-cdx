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
  amPolicyFacetsForService?: Maybe<Array<Maybe<CdxFacet>>>;
  amPolicyVerbForFacet?: Maybe<Array<Maybe<PermissionVerb>>>;
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

export type QueryAmPolicyFacetsForServiceArgs = {
  orgSid: Scalars['ID'];
  cdxService: CdxService;
};

export type QueryAmPolicyVerbForFacetArgs = {
  orgSid: Scalars['ID'];
  cdxService: CdxService;
  cdxFacet: CdxFacet;
};

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<LoginStep>;
};

export type MutationPasswordLoginArgs = {
  userId: Scalars['String'];
  password: Scalars['String'];
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
  Complete = 'COMPLETE',
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
  value?: Maybe<Scalars['String']>;
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
  services?: Maybe<Array<Maybe<CdxService>>>;
};

export enum CdxService {
  Cdx = 'CDX',
  Integration = 'INTEGRATION',
  AccessManagement = 'ACCESS_MANAGEMENT',
}

export enum CdxFacet {
  All = 'ALL',
  Archive = 'ARCHIVE',
  Status = 'STATUS',
  AmPolicy = 'AM_POLICY',
  AmUser = 'AM_USER',
  Organization = 'ORGANIZATION',
}

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

export type WebPage = {
  __typename?: 'WebPage';
  type: CdxWebPage;
  /** parameters: any dynamic parameters the page end point needs to be called with */
  // parameters?: Maybe<Array<Maybe<Nvp>>>;
  /** commands: actions on the page that may lead to another page e.g. add new */
  // commands?: Maybe<Array<Maybe<WebNav>>>;
  /** pivots: any pivots the page might have */
  // pivots?: Maybe<Array<Maybe<WebPivot>>>;
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
                { __typename?: 'UserSession' } & Pick<UserSession, 'id' | 'orgId' | 'userId' | 'defaultAuthorities'>
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
      'workOrderId' | 'specId' | 'specImplName' | 'fingerPrint' | 'suppressBilling'
    > & {
        workStepStatus?: Maybe<
          Array<
            Maybe<
              { __typename?: 'WorkStepStatus' } & Pick<WorkStepStatus, 'stepStatus' | 'stepName' | 'stepType'> & {
                  populationCount?: Maybe<{ __typename?: 'StatCountType' } & Pick<StatCountType, 'value'>>;
                  transformedArchiveFile?: Maybe<{ __typename?: 'ArchiveFileType' } & Pick<ArchiveFileType, 'value'>>;
                  stepFile?: Maybe<Array<Maybe<{ __typename?: 'ArchiveFileType' } & Pick<ArchiveFileType, 'value'>>>>;
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

export type PlanInsuredStatFragmentFragment = { __typename?: 'PlanInsuredStat' } & {
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

export type AmPolicyPageQueryVariables = Exact<{
  orgSid: Scalars['ID'];
}>;

export type AmPolicyPageQuery = { __typename?: 'Query' } & {
  amPolicyPage?: Maybe<{ __typename?: 'AMPolicyPage' } & Pick<AmPolicyPage, 'services'>>;
};

export type AmPolicyFacetsForServiceQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
}>;

export type AmPolicyFacetsForServiceQuery = { __typename?: 'Query' } & Pick<Query, 'amPolicyFacetsForService'>;

export type AmPolicyVerbForFacetQueryVariables = Exact<{
  orgSid: Scalars['ID'];
  cdxService: CdxService;
  cdxFacet: CdxFacet;
}>;

export type AmPolicyVerbForFacetQuery = { __typename?: 'Query' } & Pick<Query, 'amPolicyVerbForFacet'>;

export const UnionNvpFragmentDoc = gql`
  fragment unionNVP on NVP {
    __typename
    #   ... on NVPStr {
    #     name
    #     strValue: value
    #   }
    #   ... on NVPId {
    #     name
    #     idValue: value
    #   }
  }
`;
export const WebPageFragmentFragmentDoc = gql`
  fragment webPageFragment on WebPage {
    type
    commands {
      label
      page {
        type
      }
      appDomain
    }
    pivots {
      label
      type
    }
  }
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
          userId
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
        transformedArchiveFile {
          value
        }
        stepFile {
          value
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
export const AmPolicyPageDocument = gql`
  query AMPolicyPage($orgSid: ID!) {
    amPolicyPage(orgSid: $orgSid) {
      services
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
  return Apollo.useQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, baseOptions);
}
export function useAmPolicyPageLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyPageQuery, AmPolicyPageQueryVariables>
) {
  return Apollo.useLazyQuery<AmPolicyPageQuery, AmPolicyPageQueryVariables>(AmPolicyPageDocument, baseOptions);
}
export type AmPolicyPageQueryHookResult = ReturnType<typeof useAmPolicyPageQuery>;
export type AmPolicyPageLazyQueryHookResult = ReturnType<typeof useAmPolicyPageLazyQuery>;
export type AmPolicyPageQueryResult = Apollo.QueryResult<AmPolicyPageQuery, AmPolicyPageQueryVariables>;
export const AmPolicyFacetsForServiceDocument = gql`
  query AMPolicyFacetsForService($orgSid: ID!, $cdxService: CDXService!) {
    amPolicyFacetsForService(orgSid: $orgSid, cdxService: $cdxService)
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
  return Apollo.useQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(
    AmPolicyFacetsForServiceDocument,
    baseOptions
  );
}
export function useAmPolicyFacetsForServiceLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>
) {
  return Apollo.useLazyQuery<AmPolicyFacetsForServiceQuery, AmPolicyFacetsForServiceQueryVariables>(
    AmPolicyFacetsForServiceDocument,
    baseOptions
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
    amPolicyVerbForFacet(orgSid: $orgSid, cdxService: $cdxService, cdxFacet: $cdxFacet)
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
  return Apollo.useQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(
    AmPolicyVerbForFacetDocument,
    baseOptions
  );
}
export function useAmPolicyVerbForFacetLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>
) {
  return Apollo.useLazyQuery<AmPolicyVerbForFacetQuery, AmPolicyVerbForFacetQueryVariables>(
    AmPolicyVerbForFacetDocument,
    baseOptions
  );
}
export type AmPolicyVerbForFacetQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetQuery>;
export type AmPolicyVerbForFacetLazyQueryHookResult = ReturnType<typeof useAmPolicyVerbForFacetLazyQuery>;
export type AmPolicyVerbForFacetQueryResult = Apollo.QueryResult<
  AmPolicyVerbForFacetQuery,
  AmPolicyVerbForFacetQueryVariables
>;
