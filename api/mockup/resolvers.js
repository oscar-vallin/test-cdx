const { PubSub } = require('apollo-server');

const UPDATE_STATUS = 'UPDATE_STATUS';

const pubSub = new PubSub();

module.exports = {
  // beginLogin(userId: String!): LoginStep
  // changeOwnPasswordPage: PasswordPage
  // changeOwnPasswordPage2
  Query: {
    beginLogin: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.beginLogin(args.userId);
    },
    changeOwnPasswordPage: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.changeOwnPasswordPage();
    },
    changeOwnPasswordPage2: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.changeOwnPasswordPage2();
    },
    fileList: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.fileList();
    },
    fileGet: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.fileList(id);
    },
  },
  Mutation: {
    passwordLogin: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.passwordLogin();
    },
    fileUpdate: (parent, { id, name, status }, { dataSources }, info) => {
      return dataSources.mockAPI.fileUpdate(pubSub, id, name, status);
    },
  },
  Subscription: {
    updateStatus: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: (parent, args, { dataSources }, info) => {
        return pubSub.asyncIterator(UPDATE_STATUS);
      },
    },
  },
};
