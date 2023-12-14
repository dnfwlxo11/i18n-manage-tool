// import path from 'path'
const { app } = require('@electron/remote')
const path = require('path')

const Datastore = require('nedb-promises')

const dbPath = path.join(app.getAppPath('appData'), 'appData', 'app.db')
const datastore = Datastore.create({
  autoload: true,
  filename: dbPath
})

async function findAllDataCount() {
  const response = await datastore.find({})

  return response.length
}

async function findAllData() {
  const response = await datastore.find({})

  return response
}

async function findDataById(id) {
  const response = await datastore.find({ _id: id })

  return response
}

async function findDataByFilter(filter) {
  const response = await datastore.find(filter)

  return response
}

async function updateDataById(id, data) {
  await datastore.update({ _id: id }, data)
}

async function deleteDataById(id) {
  await datastore.remove({ _id: id })
}

async function insertData(data) {
  await datastore.insert(data)
}

export {
  findDataByFilter,
  findAllDataCount,
  findAllData,
  findDataById,
  updateDataById,
  deleteDataById,
  insertData,
}