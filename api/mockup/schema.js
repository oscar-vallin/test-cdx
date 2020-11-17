const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    beginLogin(userId: String!): LoginStep
    changeOwnPasswordPage: PasswordPage
    workPacketStatusDetails(orgSid: ID!, workOrderID: String!): WorkPacketStatusDetails
    workPacketStatuses(orgSid: ID!, dateRange: DateTimeRangeInput, filter: WorkPacketStatusFilter): [WorkPacketStatus]
    dashboardPeriods(orgSid: ID!): DashboardPeriods
    systemTemplateAMGroupByName(name: String!): [AMGroup]
  }

  type Mutation {
    passwordLogin(userId: String!, password: String!): TokenUser
    createOrg(orgInfo: CreateOrgInput!): Organization
    createUser(userInfo: CreateUserInput!, personInfo: CreatePersonInput!): User
    createAMPolicy(policyInfo: CreateAMPolicyInput!): AMPolicy
    createAMGroup(amGroupInfo: CreateAMGroupInput!): AMGroup
  }

  scalar DateTime
  scalar Date

  type Organization {
    id: ID
    orgId: String!
    orgType: OrgType!
  }

  type LoginStep {
    userId: String!
    step: LoginStepType!
    redirectPath: String
    allowLostPassword: Boolean
    loginCompletePage: LoginCompletePage
    tokenUser: TokenUser
  }

  type PasswordPage {
    ruleGroup: PasswordRuleGroup!
  }

  type PasswordRuleGroup {
    """
    number of rule predicates that must be true for the group to pass
    if numberOfCharacteristics is omitted all rules are required
    """
    numberOfCharacteristics: Int
    """
    list of rules or rule sub groups
    """
    rules: [PasswordRule]
  }

  type PasswordLengthRule {
    minLength: Int
    maxLength: Int
  }

  type PasswordWhitespaceRule {
    allowedWhitespace: WhitespaceRuleType
  }

  type PasswordCharacterRule {
    characterType: PasswordCharacterType
    numberOfCharacters: Int
  }

  type PasswordStrengthRule {
    requiredStrengthLevel: Int!
  }

  type TokenUser {
    token: String
    session: UserSession
  }

  type UserSession {
    id: ID!
    orgId: ID!
    userId: String!
    defaultAuthorities: [String]
  }

  enum LoginStepType {
    USERNAME
    PASSWORD
    COMPLETE
    #SSO_REDIRECT
    #TOTP
  }

  enum LoginCompletePage {
    WP_STATUS
    ORG_ACTIVITY
    ORG_LIST
  }

  input AMPasswordConfigInput {
    allowForgotten: Boolean
    orgUnitOwner: ID
  }

  type User {
    id: ID!
    email: String!
    person: Person
  }

  type Person {
    id: ID!
    firstNm: String!
    lastNm: String
  }

  type WorkPacketStatus {
    workOrderId: String!
    timestamp: DateTime!
    planSponsorId: String
    detailsPath: String
    subClientPath: String
    inboundFilename: String!
    vendorId: String
    step: Int!
    stepStatus: String!
    packetStatus: String!
    reprocessedBy: String
    reprocessAction: Int
    recordHighlightCount: Int
    recordHighlightType: String
    clientFileArchivePath: String
    vendorFileArchivePath: String
    supplementalFilesArchivePaths: [String]
    archiveOnly: Boolean
    hasErrors: Boolean
  }

  """
  type ZonedDateTime {
      formatString(format: String!): String
      iso: String
  }

  type Date {
      formatString(format: String!): String
      iso: String
  }
  """
  type AMGroup {
    id: ID
    name: String!
    description: String
    tmpl: Boolean
    tmplUseAsIs: Boolean
    tmplServiceType: CDXService
    policies: [AMPolicy]
  }

  type AMPolicy {
    id: ID
    name: String!
    permissions: [AMPermission]
    tmpl: Boolean
    tmplUseAsIs: Boolean
    tmplServiceType: CDXService
  }

  type AMPermission {
    id: ID
    effect: PermissionEffect!
    actions: [AMPermissionAction]
    predicate: PermissionPredicate
    predVar1: String
    predParam1: String
  }

  type AMPermissionAction {
    id: ID
    service: CDXService!
    facet: CDXFacet!
    verb: PermissionVerb!
  }

  input CreateAMGroupInput {
    name: String!
    description: String
    tmpl: Boolean
    tmplUseAsIs: Boolean
    tmplServiceType: CDXService
    policyIds: [ID]
  }

  input CreateAMPolicyInput {
    name: String!
    orgOwnerId: ID!
    permissions: [CreateAMPermissionInput]
    tmpl: Boolean
    tmplUseAsIs: Boolean
    tmplServiceType: CDXService
  }

  input CreateAMPermissionInput {
    effect: PermissionEffect!
    actions: [CreateAMPermissionActionInput]
    predicate: PermissionPredicate
    predVar1: String
    predParam1: String
  }

  input CreateAMPermissionActionInput {
    service: CDXService!
    facet: CDXFacet!
    verb: PermissionVerb!
  }

  input CreateOrgInput {
    orgId: String!
    orgName: String!
    orgType: OrgType!
    orgOwnerId: ID
  }

  input CreateUserInput {
    email: String!
    password: String
    orgOwnerId: ID!
    groupIds: [ID]
  }

  input CreatePersonInput {
    firstNm: String!
    lastNm: String
  }

  input DateTimeRangeInput {
    rangeStart: DateTime!
    rangeEnd: DateTime!
  }

  """
  input DateRangeInput{
      rangeStart: Date!
      rangeEnd: Date!
      timeZone: String
  }
  """
  input WorkPacketStatusFilter {
    excludedEnvs: [String]
  }

  enum OrgType {
    INTEGRATION_SPONSOR
    INTEGRATION_PLATFORM
  }

  enum WhitespaceRuleType {
    NONE
  }

  enum PasswordCharacterType {
    UPPER_CASE
    LOWER_CASE
    DIGIT
    SPECIAL
  }

  enum PermissionEffect {
    ALLOW
    DENY
  }

  enum PermissionPredicate {
    NOT_KNTU_ENV
    STRING_EQUALS_IGNORE_CASE
    STRING_NOT_EQUALS_IGNORE_CASE
  }

  enum CDXService {
    CDX
    INTEGRATION
  }

  enum CDXFacet {
    ALL
    ARCHIVE
    STATUS
  }

  enum PermissionVerb {
    ALL
    CREATE
    READ
    UPDATE
    DELETE
    LIST
    DOWNLOAD
    RESTART
  }

  union PasswordRule =
      PasswordLengthRule
    | PasswordWhitespaceRule
    | PasswordCharacterRule
    | PasswordStrengthRule
    | PasswordRuleGroup

  type WorkPacketStatusDetails {
    workOrderId: String!
    specId: String
    specImplName: String
    fingerPrint: String
    suppressBilling: Boolean
    deliveredFile: DeliveredFile
    workStepStatus: [WorkStepStatus]
    extractParameters: ExtractParameters
    qualityChecks: QualityChecks
    enrollmentStats: EnrollmentStat
    inboundEnrollmentStats: EnrollmentStat
    outboundEnrollmentStats: EnrollmentStat
  }

  type DeliveredFile {
    filename: String!
    fileSizeInBytes: Int
    textSizeInBytes: Int
    timeDelivered: DateTime
    ftp: DeliveredFileFTP
    kcurl: DeliveredKCURL
  }

  type DeliveredFileFTP {
    protocol: String!
    host: String!
    username: String
    folder: String
    port: Int
  }

  type DeliveredKCURL {
    url: String!
  }

  type WorkStepStatus {
    stepStatus: String
    stepName: String
    stepType: String
    populationCount: StatCountType
    transformedArchiveFile: ArchiveFileType
    recordCounts: RecordCounts
    stepFile: [ArchiveFileType]
    nvp: [NVP]
  }

  type StatCountType {
    value: Int
  }

  type ArchiveFileType {
    value: String
  }

  type NVP {
    value: String!
    name: String!
  }

  type RecordCounts {
    totalCount: Int
    showUser: Boolean
    recordCount: [RecordCount]
  }

  type RecordCount {
    name: String!
    count: Int!
  }

  type ExtractParameters {
    originalParameter: [ExtractParameter]
    overriddenParameter: [ExtractParameter]
    derivedParameter: [ExtractParameter]
  }

  type ExtractParameter {
    label: String
    name: String
    value: [String]
  }

  type QualityChecks {
    sequenceCreationEvent: [SequenceCreationEvent]
  }

  type SequenceCreationEvent {
    context: String
    unitId: String
    recordCreationEvent: [RecordCreationEvent]
  }

  type RecordCreationEvent {
    context: String
    outerContext: String
    unitId: String
    error: [FieldCreationEvent]
    warning: [FieldCreationEvent]
    information: [FieldCreationEvent]
  }

  type FieldCreationEvent {
    message: [String]
    name: String
    id: String
    value: String
    rawValue: String
    type: String
  }

  type DashboardPeriods {
    dailyCounts: DashboardPeriodCounts
    yesterdayCounts: DashboardPeriodCounts
    monthlyCounts: DashboardPeriodCounts
    lastMonthlyCounts: DashboardPeriodCounts
  }

  type DashboardPeriodCounts {
    vendorTransmissions: [DashboardPeriodCount]
    vendorTransmissionsBySpec: [DashboardPeriodCount]
    planSponsorTransmissions: [DashboardPeriodCount]
    fileTransmissions: [DashboardPeriodCount]
    vendorProcessErrors: [DashboardPeriodCount]
    planSponsorProcessErrors: [DashboardPeriodCount]
    fileProcessErrors: [DashboardPeriodCount]
    transmissionCount: Int
    billingUnitCount: Int
    processErrorCount: Int
  }

  type DashboardPeriodCount {
    name: String
    secondaryDescr: String
    count: Int
    total: Int
  }

  type EnrollmentStat {
    insuredStat: InsuredStat
    excludedInsuredStat: InsuredStat
    excludedPlanInsuredStat: [PlanInsuredStat]
    planInsuredStat: [PlanInsuredStat]
  }

  type InsuredStat {
    subscribers: InsuredStatCount
    dependents: InsuredStatCount
  }

  type PlanInsuredStat {
    planCode: String
    planType: String

    subscribers: InsuredStatCount
    dependents: InsuredStatCount
  }

  type InsuredStatCount {
    active: StatInt
    ended: StatInt
    expectedTotal: Int
    inTolerance: Boolean
    toleranceMsg: String
    hold: Boolean
  }

  type StatInt {
    prior: Int
    value: Int
  }
`;
