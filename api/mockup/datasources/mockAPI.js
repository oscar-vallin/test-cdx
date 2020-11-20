const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const { ApolloServer, PubSub } = require('apollo-server');
const rawLogin = require('../data/rawLogin.json');
const rawChangeOwn = require('../data/rawChangeOwn.json');
const rawChangeOwn2 = require('../data/rawChangeOwn2.json');
const rawToken = require('../data/rawToken.json');
const rawFiles = require('../data/rawFiles.json');
const rawDashboard = require('../data/rawDashboard.json');
const rawWorkPacketStatuses = require('../data/rawWorkPacketStatuses.json');
const rawWorkPacketStatusDetails1 = require('../data/rawStatusDetail1.json');
const rawWorkPacketStatusDetails2 = require('../data/rawStatusDetail2.json');
const rawWorkPacketStatusDetails3 = require('../data/rawStatusDetail3.json');

const UPDATE_STATUS = 'UPDATE_STATUS';

class mockAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  beginLogin(userId) {
    return rawLogin[0];
  }

  changeOwnPasswordPage() {
    return rawChangeOwn[0];
  }

  changeOwnPasswordPage2() {
    return rawChangeOwn2[0];
  }

  passwordLogin() {
    return rawToken[0];
  }

  passwordLogin() {
    return rawToken[0];
  }

  fileList(id) {
    if (id) return rawFiles[0];

    return rawFiles;
  }

  fileAdd(name) {
    return rawFiles[0];
  }

  dashboard(orgId) {
    return rawDashboard;
  }

  // WorkPacketStatuses($orgSid: ID!, $dateRange: DateTimeRangeInput, $filter: WorkPacketStatusFilter){
  workPacketStatuses(orgSid, dateRange, filter) {
    console.log('mockAPI, workPacketStatuses');
    return rawWorkPacketStatuses;
  }

  // WorkPacketStatuses($orgSid: ID!, $dateRange: DateTimeRangeInput, $filter: WorkPacketStatusFilter){
  workPacketStatusDetails(orgSid, workOrderId) {
    const result =
      workOrderId === '1'
        ? rawWorkPacketStatusDetails2
        : workOrderId === '2'
        ? rawWorkPacketStatusDetails3
        : rawWorkPacketStatusDetails1;

    return result.data.workPacketStatusDetails;
  }

  fileUpdate(pubsub, id, name, status) {
    const fileId = id;
    const fileName = name;
    const fileStatus = status;

    const fileData = rawFiles.find(({ id }) => id == fileId);

    if (!fileData) return new ApolloError('Sorry, File ID not Found.');

    const updateFile = {
      ...fileData,
      name: fileName || fileData.name,
      status: fileStatus || fileData.status,
    };

    pubsub.publish('UPDATE_STATUS', { updateStatus: updateFile });

    return updateFile;
  }

  subscriptionStatusUpdate() {
    return rawToken[0];
  }
}

module.exports = mockAPI;
