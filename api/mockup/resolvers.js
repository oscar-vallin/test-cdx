module.exports = {
  // beginLogin(userId: String!): LoginStep
  // changeOwnPasswordPage: PasswordPage
  // changeOwnPasswordPage2
  Query: {
    beginLogin: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.beginLogin()
    },
    changeOwnPasswordPage: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.changeOwnPasswordPage()
    },
    changeOwnPasswordPage2: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.changeOwnPasswordPage2()
    },
  },
  Mutation: {
    passwordLogin: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.passwordLogin()
    },
  },
}
