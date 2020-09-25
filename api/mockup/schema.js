const { gql } = require('apollo-server')

module.exports = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    id: ID!
    title: String!
    author: String!
    description: String
    observation: String @deprecated(reason: "Not all the Books have Observations, Don't have this field on your side.")
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    book(id: ID, title: String, author: String): [Book]
    books(id: ID): [Book]
    bookById(id: ID): Book
  }
`
