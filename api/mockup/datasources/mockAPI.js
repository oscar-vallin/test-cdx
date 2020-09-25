const { DataSource } = require('apollo-datasource')
const _ = require('lodash')
const rawData = require('../data/mockData.json')

class mockAPI extends DataSource {
  constructor() {
    super()
  }

  initialize(config) {}

  getBooks(args) {
    if (args) return _.filter(rawData, args)

    return rawData
  }

  getBookById(id) {
    const item = _.filter(rawData, { id: parseInt(id) })
    return rawData[0]
  }
}

module.exports = mockAPI
