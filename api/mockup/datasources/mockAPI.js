const { DataSource } = require('apollo-datasource');
const _ = require('lodash');
const { ApolloServer, PubSub } = require('apollo-server');
const rawLogin = require('../data/rawLogin.json');
const rawChangeOwn = require('../data/rawChangeOwn.json');
const rawChangeOwn2 = require('../data/rawChangeOwn2.json');
const rawToken = require('../data/rawToken.json');
const rawFiles = require('../data/rawFiles.json');

const UPDATE_STATUS = 'UPDATE_STATUS';

class mockAPI extends DataSource {
  constructor() {
    super();
  }

  initialize(config) {}

  // beginLogin(userId: String!): LoginStep
  // changeOwnPasswordPage: PasswordPage
  // changeOwnPasswordPage2

  beginLogin(userId) {
    console.log({ userId });
    console.log({ rawLogin: rawLogin[0] });

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

  fileUpdate(pubsub, id, name, status) {
    const fileId = id;
    const fileName = name;
    const fileStatus = status;

    console.log({ pubsub });

    console.log('FileName');
    console.log({ fileId, fileName });

    const fileData = rawFiles.find(({ id }) => id == fileId);

    console.log({ fileData });
    if (!fileData) return new ApolloError('Sorry, File ID not Found.');

    const updateFile = {
      ...fileData,
      name: fileName || fileData.name,
      status: fileStatus || fileData.status,
    };

    console.log({ updateFile });
    pubsub.publish('UPDATE_STATUS', { updateStatus: updateFile });
    // pubsub.publish('UPDATE_STATUS', { file: updateFile });

    return updateFile;
  }

  subscriptionStatusUpdate() {
    return rawToken[0];
  }
}

module.exports = mockAPI;
