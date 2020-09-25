const { DataSource } = require('apollo-datasource')
const _ = require('lodash')
const rawLogin = require('../data/rawLogin.json')
const rawChangeOwn = require('../data/rawChangeOwn.json')
const rawChangeOwn2 = require('../data/rawChangeOwn2.json')
const rawToken = require('../data/rawToken.json')

class mockAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  // beginLogin(userId: String!): LoginStep
  // changeOwnPasswordPage: PasswordPage
  // changeOwnPasswordPage2

  beginLogin() {
    console.log({ rawLogin: rawLogin[0] })

    return rawLogin[0]
  }

  changeOwnPasswordPage() {
    return rawChangeOwn[0]
  }

  changeOwnPasswordPage2() {
    return rawChangeOwn2[0]
  }

  passwordLogin() {
    return rawToken[0]
  }
}

module.exports = mockAPI
