const elasticSearch = require('elasticsearch')
const client = new elasticSearch.Client({
  host: 'localhost:9200',
  log: 'error'
})

async function searchAll (index) {
  const response = await client.search({
    index: index,
    body: {
      size: 100,
      query: {
        match_all: {}
      }
    }
  })
  for (let hit of response.hits.hits) {
    console.log(hit['_source'])
  }
}

searchAll('budget')
