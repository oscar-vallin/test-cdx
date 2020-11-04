import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  beginLogin?: Maybe<LoginStep>;
  changeOwnPasswordPage?: Maybe<PasswordPage>;
  workPacketStatusDetails?: Maybe<WorkPacketStatusDetails>;
  dashboardPeriods?: Maybe<DashboardPeriods>;
};

export type QueryBeginLoginArgs = {
  userId: Scalars['String'];
};

export type QueryWorkPacketStatusDetailsArgs = {
  orgSid: Scalars['ID'];
  workOrderID: Scalars['String'];
};

export type QueryDashboardPeriodsArgs = {
  orgSid: Scalars['ID'];
};

export type Mutation = {
  __typename?: 'Mutation';
  passwordLogin?: Maybe<TokenUser>;
  createOrg?: Maybe<Organization>;
  createUser?: Maybe<User>;
  createAMPolicy?: Maybe<AmPolicy>;
  createAMGroup?: Maybe<AmGroup>;
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
  timestamp: ZonedDateTime;
  planSponsorId?: Maybe<Scalars['String']>;
  detailsPath?: Maybe<Scalars['String']>;
  subClientPath?: Maybe<Scalars['String']>;
  inboundFilename: Scalars['String'];
  vendorId?: Maybe<Scalars['String']>;
  step: Scalars['Int'];
  stepStatus: Scalars['Int'];
  packetStatus: Scalars['Int'];
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

export type ZonedDateTime = {
  __typename?: 'ZonedDateTime';
  formatString?: Maybe<Scalars['String']>;
  iso?: Maybe<Scalars['String']>;
};

export type ZonedDateTimeFormatStringArgs = {
  format: Scalars['String'];
};

export type Date = {
  __typename?: 'Date';
  formatString?: Maybe<Scalars['String']>;
  iso?: Maybe<Scalars['String']>;
};

export type DateFormatStringArgs = {
  format: Scalars['String'];
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

export enum OrgType {
  IntegrationSponsor = 'INTEGRATION_SPONSOR',
  IntegrationPlatform = 'INTEGRATION_PLATFORM',
}

export enum WhitespaceRuleType {
  None = 'NONE',
}

export enum PasswordCharacterType {
  UpperCase = 'UPPER_CASE',
  LowerCase = 'LOWER_CASE',
  Digit = 'DIGIT',
  Special = 'SPECIAL',
}

export enum PermissionEffect {
  Allow = 'ALLOW',
  Deny = 'DENY',
}

export enum PermissionPredicate {
  NotKntuEnv = 'NOT_KNTU_ENV',
  StringEqualsIgnoreCase = 'STRING_EQUALS_IGNORE_CASE',
  StringNotEqualsIgnoreCase = 'STRING_NOT_EQUALS_IGNORE_CASE',
}

export enum CdxService {
  Cdx = 'CDX',
  Integration = 'INTEGRATION',
}

export enum CdxFacet {
  All = 'ALL',
  Archive = 'ARCHIVE',
  Status = 'STATUS',
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
}

export type PasswordRule =
  | PasswordLengthRule
  | PasswordWhitespaceRule
  | PasswordCharacterRule
  | PasswordStrengthRule
  | PasswordRuleGroup;

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

export type UserTokenMutation = { __typename?: 'Mutation' } & {
  passwordLogin?: Maybe<
    { __typename?: 'TokenUser' } & Pick<TokenUser, 'token'> & {
        session?: Maybe<
          { __typename?: 'UserSession' } & Pick<UserSession, 'id' | 'orgId' | 'userId' | 'defaultAuthorities'>
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
export function useUserTokenMutation(
  baseOptions?: Apollo.MutationHookOptions<UserTokenMutation, UserTokenMutationVariables>
) {
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
  baseOptions?: Apollo.QueryHookOptions<WorkPacketStatusDetailsQuery, WorkPacketStatusDetailsQueryVariables>
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
  baseOptions?: Apollo.QueryHookOptions<DashboardPeriodsQuery, DashboardPeriodsQueryVariables>
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
export function useBeginLoginQuery(baseOptions?: Apollo.QueryHookOptions<BeginLoginQuery, BeginLoginQueryVariables>) {
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
