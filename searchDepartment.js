const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
})

async function searchDepartment (index, Department) {
  const response = await client.search({
    index,
    body: {
      size: 100,
      query: {
        match: {
          Department
        }
      }
    }
  })

  for (let hit of response.hits.hits) {
    console.log(hit['_source'])
  }
}

searchDepartment('budget', 'Agriculture')
