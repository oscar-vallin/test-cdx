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
  changeOwnPasswordPage?: Maybe<PasswordPage>;
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
  workOrderID: Scalars['String'];
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
  passwordLogin?: Maybe<TokenUser>;
  createOrg?: Maybe<Organization>;
  createUser?: Maybe<User>;
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

export type MutationCreateUserArgs = {
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
};

export type MutationCreateAmPolicyArgs = {
  policyInfo: CreateAmPolicyInput;
};


export type MutationCreateAmGroupArgs = {
  amGroupInfo: CreateAmGroupInput;
};

export type Organization = {
  __typename?: 'Organization';
  id?: Maybe<Scalars['ID']>;
  orgId: Scalars['String'];
  orgType: OrgType;
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
  step: Scalars['Int'];
  redirectPath?: Maybe<Scalars['String']>;
  allowLostPassword?: Maybe<Scalars['Boolean']>;
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

/**
 * type ZonedDateTime {
 *     formatString(format: String!): String
 *     iso: String
 * }
 * 
 * type Date {
 *     formatString(format: String!): String
 *     iso: String
 * }
 */
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
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
  policyIds?: Maybe<Array<Maybe<Scalars['ID']>>>;
};

export type CreateAmPolicyInput = {
  name: Scalars['String'];
  orgOwnerId: Scalars['ID'];
  permissions?: Maybe<Array<Maybe<CreateAmPermissionInput>>>;
  tmpl?: Maybe<Scalars['Boolean']>;
  tmplUseAsIs?: Maybe<Scalars['Boolean']>;
  tmplServiceType?: Maybe<CdxService>;
};

export type CreateAmPermissionInput = {
  effect: PermissionEffect;
  actions?: Maybe<Array<Maybe<CreateAmPermissionActionInput>>>;
  predicate?: Maybe<PermissionPredicate>;
  predVar1?: Maybe<Scalars['String']>;
  predParam1?: Maybe<Scalars['String']>;
};

export type CreateAmPermissionActionInput = {
  service: CdxService;
  facet: CdxFacet;
  verb: PermissionVerb;
};

export type CreateOrgInput = {
  orgId: Scalars['String'];
  orgName: Scalars['String'];
  orgType: OrgType;
  orgOwnerId?: Maybe<Scalars['ID']>;
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

export type DateTimeRangeInput = {
  rangeStart: Scalars['DateTime'];
  rangeEnd: Scalars['DateTime'];
};

/**
 * input DateRangeInput{
 *     rangeStart: Date!
 *     rangeEnd: Date!
 *     timeZone: String
 * }
 */
export type WorkPacketStatusFilter = {
  excludedEnvs?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export enum OrgType {
  IntegrationSponsor = 'INTEGRATION_SPONSOR',
  IntegrationPlatform = 'INTEGRATION_PLATFORM'
}

export enum WhitespaceRuleType {
  None = 'NONE'
}

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL'
}

export enum PermissionEffect {
  Allow = 'ALLOW',
  Deny = 'DENY'
}

export enum PermissionPredicate {
  NotKntuEnv = 'NOT_KNTU_ENV',
  StringEqualsIgnoreCase = 'STRING_EQUALS_IGNORE_CASE',
  StringNotEqualsIgnoreCase = 'STRING_NOT_EQUALS_IGNORE_CASE'
}

export enum CdxService {
  Cdx = 'CDX',
  Integration = 'INTEGRATION'
}

export enum CdxFacet {
  All = 'ALL',
  Archive = 'ARCHIVE',
  Status = 'STATUS'
}

export enum PermissionVerb {
  All = 'ALL',
  Create = 'CREATE',
  Read = 'READ',
  Update = 'UPDATE',
  Delete = 'DELETE',
  List = 'LIST',
  Download = 'DOWNLOAD',
  Restart = 'RESTART'
}

export type PasswordRule = PasswordLengthRule | PasswordWhitespaceRule | PasswordCharacterRule | PasswordStrengthRule | PasswordRuleGroup;

export type WorkPacketStatusDetails = {
  __typename?: 'WorkPacketStatusDetails';
  workOrderID: Scalars['String'];
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
  nvp?: Maybe<Array<Maybe<Nvp>>>;
};

export type StatCountType = {
  __typename?: 'StatCountType';
  value?: Maybe<Scalars['Int']>;
};

export type ArchiveFileType = {
  __typename?: 'ArchiveFileType';
  value?: Maybe<Scalars['String']>;
};

export type Nvp = {
  __typename?: 'NVP';
  value: Scalars['String'];
  name: Scalars['String'];
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

export type UserTokenMutationVariables = Exact<{
  userId: Scalars['String'];
  password: Scalars['String'];
}>;


export type UserTokenMutation = (
  { __typename?: 'Mutation' }
  & { passwordLogin?: Maybe<(
    { __typename?: 'TokenUser' }
    & Pick<TokenUser, 'token'>
    & { session?: Maybe<(
      { __typename?: 'UserSession' }
      & Pick<UserSession, 'id' | 'orgId' | 'userId' | 'defaultAuthorities'>
    )> }
  )> }
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

export type CreateUserMutationVariables = Exact<{
  userInfo: CreateUserInput;
  personInfo: CreatePersonInput;
}>;

export type CreateUserMutation = { __typename?: 'Mutation' } & {
  createUser?: Maybe<
    { __typename?: 'User' } & Pick<User, 'id' | 'email'> & {
        person?: Maybe<{ __typename?: 'Person' } & Pick<Person, 'firstNm' | 'lastNm'>>;
      }
  >;
};

export type CreateAmGroupMutationVariables = Exact<{
  amGroupInfo: CreateAmGroupInput;
}>;

export type CreateAmGroupMutation = { __typename?: 'Mutation' } & {
  createAMGroup?: Maybe<
    { __typename?: 'AMGroup' } & Pick<AmGroup, 'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs'> & {
        policies?: Maybe<Array<Maybe<{ __typename?: 'AMPolicy' } & Pick<AmPolicy, 'id' | 'name'>>>>;
      }
  >;
};

export type CreateAmPolicyMutationVariables = Exact<{
  policyInfo: CreateAmPolicyInput;
}>;

export type CreateAmPolicyMutation = { __typename?: 'Mutation' } & {
  createAMPolicy?: Maybe<{ __typename?: 'AMPolicy' } & PolicyFragmentFragment>;
};

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
  workOrderID: Scalars['String'];
}>;

export type WorkPacketStatusDetailsQuery = { __typename?: 'Query' } & {
  workPacketStatusDetails?: Maybe<
    { __typename?: 'WorkPacketStatusDetails' } & Pick<
      WorkPacketStatusDetails,
      'workOrderID' | 'specId' | 'specImplName' | 'fingerPrint' | 'suppressBilling'
    > & {
        workStepStatus?: Maybe<
          Array<
            Maybe<
              { __typename?: 'WorkStepStatus' } & Pick<WorkStepStatus, 'stepStatus' | 'stepName' | 'stepType'> & {
                  populationCount?: Maybe<{ __typename?: 'StatCountType' } & Pick<StatCountType, 'value'>>;
                  transformedArchiveFile?: Maybe<{ __typename?: 'ArchiveFileType' } & Pick<ArchiveFileType, 'value'>>;
                  stepFile?: Maybe<Array<Maybe<{ __typename?: 'ArchiveFileType' } & Pick<ArchiveFileType, 'value'>>>>;
                  nvp?: Maybe<Array<Maybe<{ __typename?: 'NVP' } & Pick<Nvp, 'name' | 'value'>>>>;
                  recordCounts?: Maybe<
                    { __typename?: 'RecordCounts' } & Pick<RecordCounts, 'totalCount' | 'showUser'> & {
                        recordCount?: Maybe<
                          Array<Maybe<{ __typename?: 'RecordCount' } & Pick<RecordCount, 'name' | 'count'>>>
                        >;
                      }
                  >;
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
      }
  >;
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

export type BeginLoginQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type BeginLoginQuery = { __typename?: 'Query' } & {
  beginLogin?: Maybe<
    { __typename?: 'LoginStep' } & Pick<LoginStep, 'userId' | 'step' | 'redirectPath' | 'allowLostPassword'>
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

export type PolicyFragmentFragment = { __typename?: 'AMPolicy' } & Pick<
  AmPolicy,
  'id' | 'name' | 'tmpl' | 'tmplUseAsIs'
> & {
    permissions?: Maybe<
      Array<
        Maybe<
          { __typename?: 'AMPermission' } & Pick<
            AmPermission,
            'id' | 'effect' | 'predicate' | 'predVar1' | 'predParam1'
          > & {
              actions?: Maybe<
                Array<
                  Maybe<
                    { __typename?: 'AMPermissionAction' } & Pick<
                      AmPermissionAction,
                      'id' | 'service' | 'facet' | 'verb'
                    >
                  >
                >
              >;
            }
        >
      >
    >;
  };

export type ExtractParameterFragmentFragment = { __typename?: 'ExtractParameter' } & Pick<
  ExtractParameter,
  'label' | 'name' | 'value'
>;

export type FieldCreationFragmentFragment = { __typename?: 'FieldCreationEvent' } & Pick<
  FieldCreationEvent,
  'message' | 'name' | 'id' | 'value' | 'rawValue' | 'type'
>;

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

export type SystemTemplateAmGroupByNameQueryVariables = Exact<{
  name: Scalars['String'];
}>;

export type SystemTemplateAmGroupByNameQuery = { __typename?: 'Query' } & {
  systemTemplateAMGroupByName?: Maybe<
    Array<
      Maybe<
        { __typename?: 'AMGroup' } & Pick<
          AmGroup,
          'id' | 'name' | 'description' | 'tmpl' | 'tmplUseAsIs' | 'tmplServiceType'
        >
      >
    >
  >;
};

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
export const UserTokenDocument = gql`
  mutation UserToken($userId: String!, $password: String!) {
    passwordLogin(userId: $userId, password: $password) {
      token
      session {
        id
        orgId
        userId
        defaultAuthorities
      }
    }
  }
`;
export type UserTokenMutationFn = Apollo.MutationFunction<UserTokenMutation, UserTokenMutationVariables>;

/**
 * __useUserTokenMutation__
 *
 * To run a mutation, you first call `useUserTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userTokenMutation, { data, loading, error }] = useUserTokenMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useUserTokenMutation(baseOptions?: Apollo.MutationHookOptions<UserTokenMutation, UserTokenMutationVariables>) {
        return Apollo.useMutation<UserTokenMutation, UserTokenMutationVariables>(UserTokenDocument, baseOptions);
      }
export type UserTokenMutationHookResult = ReturnType<typeof useUserTokenMutation>;
export type UserTokenMutationResult = Apollo.MutationResult<UserTokenMutation>;
export type UserTokenMutationOptions = Apollo.BaseMutationOptions<UserTokenMutation, UserTokenMutationVariables>;
export const CreateOrgDocument = gql`
    mutation CreateOrg($orgInfo: CreateOrgInput!) {
  createOrg(orgInfo: $orgInfo) {
    id
    orgId
    orgType
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
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
  return Apollo.useMutation<CreateAmGroupMutation, CreateAmGroupMutationVariables>(CreateAmGroupDocument, baseOptions);
}
export type CreateAmGroupMutationHookResult = ReturnType<typeof useCreateAmGroupMutation>;
export type CreateAmGroupMutationResult = Apollo.MutationResult<CreateAmGroupMutation>;
export type CreateAmGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateAmGroupMutation,
  CreateAmGroupMutationVariables
>;
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
  return Apollo.useMutation<CreateAmPolicyMutation, CreateAmPolicyMutationVariables>(
    CreateAmPolicyDocument,
    baseOptions
  );
}
export type CreateAmPolicyMutationHookResult = ReturnType<typeof useCreateAmPolicyMutation>;
export type CreateAmPolicyMutationResult = Apollo.MutationResult<CreateAmPolicyMutation>;
export type CreateAmPolicyMutationOptions = Apollo.BaseMutationOptions<
  CreateAmPolicyMutation,
  CreateAmPolicyMutationVariables
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
  query WorkPacketStatusDetails($orgSid: ID!, $workOrderID: String!) {
    workPacketStatusDetails(orgSid: $orgSid, workOrderID: $workOrderID) {
      workOrderID
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
          totalCount
          showUser
          recordCount {
            name
            count
          }
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
          outerContext
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
  ${ExtractParameterFragmentFragmentDoc}
  ${FieldCreationFragmentFragmentDoc}
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
 *      workOrderID: // value for 'workOrderID'
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
  return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
}
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
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
  return Apollo.useMutation<CreateAmGroupMutation, CreateAmGroupMutationVariables>(CreateAmGroupDocument, baseOptions);
}
export type CreateAmGroupMutationHookResult = ReturnType<typeof useCreateAmGroupMutation>;
export type CreateAmGroupMutationResult = Apollo.MutationResult<CreateAmGroupMutation>;
export type CreateAmGroupMutationOptions = Apollo.BaseMutationOptions<
  CreateAmGroupMutation,
  CreateAmGroupMutationVariables
>;
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
  ${ExtractParameterFragmentFragmentDoc}
  ${FieldCreationFragmentFragmentDoc}
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
 *      workOrderID: // value for 'workOrderID'
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
 *      amGroupInfo: // value for 'amGroupInfo'
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