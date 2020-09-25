module.exports = {
  Query: {
    books: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.getBooks()
    },
    book: (parent, args, { dataSources }, info) => {
      return dataSources.mockAPI.getBooks(args)
    },
    bookById: (parent, { id }, { dataSources }, info) => {
      return dataSources.mockAPI.getBookById(id)
    },
  },
}
