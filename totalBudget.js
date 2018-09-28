const elasticsearch = require('elasticsearch')
const client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'error'
})

async function totalBudget (index) {
  const response = await client.search({
    index,
    body: {
      size: 0,
      query: {
        match_all: {}
      },
      aggs: {
        'Total Revenue': {sum: {field: 'Revenue'}},
        'Total Capital': {sum: {field: 'Capital'}},
        'Total': {sum: {field: 'Total'}}
      }
    }
  })

  console.log('Total Revenue: Rs. ', response.aggregations['Total Revenue']['value'], ' crores')
  console.log('Total Capital: Rs. ', response.aggregations['Total Capital']['value'], ' crores')
  console.log('Total: Rs. ', response.aggregations['Total']['value'], ' crores')
}

totalBudget('budget')
