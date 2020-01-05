require('dotenv').config()
const knex = require('knex')

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchName(searchTerm = 'burger') {
    knexInstance
      .select('id', 'item_name', 'price', 'category')
      .from('shopping_list')
      .where('item_name', 'ILIKE', `%${searchTerm}%`)
      .then(result => {
        console.log(result)
      })
}

// searchName()

function paginateProducts(page) {
    const itemsPerPage = 6
    const offset = itemsPerPage * (page - 1)
    knexInstance
        .select('id', 'item_name', 'price', 'category')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
        console.log(result)
        })
    }

// paginateProducts(2)

function addedAfterDate(date) {
    knexInstance
      .select('id', 'item_name', 'price', 'date_added', 'checked', 'category')
      .where(
        'date_added',
        '>',
        knexInstance.raw(`now() - '?? days'::INTERVAL`, date)
      )
      .from('shopping_list')
      .then(result => {
        console.log(result)
      })
  }
  
//   addedAfterDate(5)

function totalCost() {
    knexInstance
      .select('category')
      .from('shopping_list')
      .groupBy('category')
      .sum('price')
      .then(result => {
        console.log(result)
      })
}

totalCost()