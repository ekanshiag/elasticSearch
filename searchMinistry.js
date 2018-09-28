const elasticSearch = require('elasticsearch')
const client = new elasticSearch.Client({
  host: 'localhost:9200',
  log: 'error'
})

async function searchMinistry (index, Ministry) {
  const response = await client.search({
    index,
    body: {
      size: 100,
      query: {
        match: {
          Ministry
        }
      }
    }
  })

  for (let hit of response.hits.hits) {
    console.log(hit['_source'])
  }
}

searchMinistry('budget', 'Agriculture')
