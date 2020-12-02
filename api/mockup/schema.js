const { gql } = require('apollo-server');

module.exports = gql`
  type Query {
    beginLogin(userId: String!): LoginStep
    workPacketStatusDetails(orgSid: ID!, workOrderId: String!): WorkPacketStatusDetails
    workPacketStatuses(orgSid: ID!, dateRange: DateTimeRangeInput, filter: WorkPacketStatusFilter): [WorkPacketStatus]
    dashboardPeriods(orgSid: ID!): DashboardPeriods
    changeOwnPasswordPage: PasswordPage
    amPolicyPage(orgSid: ID!): AMPolicyPage
    amPolicyFacetsForService(orgSid: ID!, cdxService: CDXService!): [CDXFacet]
    amPolicyVerbForFacet(orgSid: ID!, cdxService: CDXService!, cdxFacet: CDXFacet!): [PermissionVerb]
  }

  type Mutation {
    passwordLogin(userId: String!, password: String!): LoginStep
  }

  scalar DateTime
  scalar Date

  type LoginStep {
    userId: String!
    step: LoginStepType!
    redirectPath: String
    allowLostPassword: Boolean
    """
    this is the domain/section of the website to continue to if the login is complete
    """
    loginCompleteDomain: WebAppDomain
    tokenUser: TokenUser
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

  input AMPasswordConfigInput {
    allowForgotten: Boolean
    orgUnitOwner: ID
  }

  input DateTimeRangeInput {
    rangeStart: DateTime!
    rangeEnd: DateTime!
  }

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
    outboundRecordCounts: RecordCounts
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
    nvp: [NVPStr]
  }

  type StatCountType {
    value: Int
  }

  type ArchiveFileType {
    value: String
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

  input WorkPacketStatusFilter {
    excludedEnvs: [String]
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

  enum WhitespaceRuleType {
    NONE
  }

  enum PasswordCharacterType {
    UPPER_CASE
    LOWER_CASE
    DIGIT
    SPECIAL
  }

  union PasswordRule =
      PasswordLengthRule
    | PasswordWhitespaceRule
    | PasswordCharacterRule
    | PasswordStrengthRule
    | PasswordRuleGroup

  type AMPolicyPage {
    services: [CDXService]
  }

  enum CDXService {
    CDX
    INTEGRATION
    ACCESS_MANAGEMENT
  }

  enum CDXFacet {
    ALL
    ARCHIVE
    STATUS
    AM_POLICY
    AM_USER
    ORGANIZATION
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
    ASSIGN
  }

  type WebPage {
    type: CDXWebPage!
    """
    parameters: any dynamic parameters the page end point needs to be called with
    """
    parameters: [NVP]
    """
    commands: actions on the page that may lead to another page e.g. add new
    """
    commands: [WebNav]
    """
    pivots: any pivots the page might have
    """
    pivots: [WebPivot]
  }

  type WebAppDomain {
    type: CDXWebAppDomain!
    """
    selectedPage: either the page to load - must be in teh navItems
    """
    selectedPage: CDXWebPage
    """
    navItems: either the left nav or top nav depending on the domain
    """
    navItems: [WebNav]
  }

  type WebNav {
    label: String
    """
    page: WebPage to nave to, blank if this only has subnavs
    """
    page: WebPage
    """
    appDomain: only needs to be set here if this link will change domains
    """
    appDomain: CDXWebAppDomain
    subNavItems: [WebNav]
  }

  type WebPivot {
    label: String
    type: CDXWebPivot!
  }

  type NVPStr {
    name: String!
    value: String!
  }

  type NVPId {
    name: String!
    value: ID!
  }

  enum CDXWebPage {
    DASHBOARD
    FILE_STATUS
    ARCHIVES
    SCHEDULE
    TRANSMISSIONS
    ERRORS
    ORG_ACTIVITY
    ACTIVE_ORGS
    ACTIVE_USERS
    DELETED_USERS
    AM_GROUPS
    AM_POLICIES
    FTP_TEST
    IMPL_DEPLOY
    USER_ACCOUNT_RULES
    PASSWORD_RULES
    SSO_CONFIG
    ADD_ORG
    ADD_USER
  }

  enum CDXWebAppDomain {
    DASHBOARD
    ORGANIZATION
  }

  enum CDXWebPivot {
    ACTIVITY
    IN_PROGRESS
  }

  union NVP = NVPStr | NVPId
`;
