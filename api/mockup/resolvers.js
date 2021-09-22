const { PubSub } = require('apollo-server');

const UPDATE_STATUS = 'UPDATE_STATUS';

const pubSub = new PubSub();

module.exports = {
  // beginLogin(userId: String!): LoginStep
  // changeOwnPasswordPage: PasswordPage
  // changeOwnPasswordPage2
  Query: {
    beginLogin: (parent, args, {dataSources}, info) => {
      return dataSources.mockAPI.beginLogin(args.userId);
    },
    changeOwnPasswordPage: (parent, args, {dataSources}, info) => {
      return dataSources.mockAPI.changeOwnPasswordPage();
    },

    dashboardPeriods: (parent, args, {dataSources}, info) => {
      return dataSources.mockAPI.dashboard().data.dashboardPeriods;
    },
    // orgSid, dateRange, filter;

    workPacketStatuses: (parent, args, {dataSources}, info) => {
      return dataSources.mockAPI.workPacketStatuses(args.orgSid, args.dateRange, args.filter).workPacketStatuses;
    },

    workPacketStatusDetails: (parent, args, {dataSources}, info) => {
      return dataSources.mockAPI.workPacketStatusDetails(args.orgSid, args.workOrderId);
    },
  },
  Mutation: {
    passwordLogin: (parent, {id}, {dataSources}, info) => {
      return dataSources.mockAPI.passwordLogin();
    },
  }
}
