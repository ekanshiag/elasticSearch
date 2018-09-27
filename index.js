const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
})
const dataset = require('./unionBudget2018.json')

function bulkIndex (index, type, data) {
  let bulkBody = []
  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type,
        _id: item.Id
      }
    })
    bulkBody.push(item)
  })
  client.bulk({
    body: bulkBody
  }, function (error, response) {
    if (error) console.log(error)
    else console.log('Data indexed successfully!')
  })
}

bulkIndex('budget', 'union', dataset)
