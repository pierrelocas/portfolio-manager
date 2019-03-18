// This is a (sample) collection of books we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const db = {
  users: [
    {
      id: "1",
      firstname: 'Pierre',
      lastname: 'Locas',
      email:'pierre.locas@gmail.com',
      password: '$2b$12$uhwVbKpW7gJV7zY7oCtHqOxY80bXhYZVj.hOywQ9hl40h1RgGQuw6'
    },
    {
      id: "2",
      firstname: 'Yolenis',
      lastname: 'Andrade',
      email:'yolenis.andrade@gmail.com',
      password: 'test'
    },
  ],
  portfolios: [
    {
      id: "1",
      user_id: "2",
      name : 'Canadian Account'
    },
    {
      id: "2",
      user_id: "1",
      name: 'US Account'
    },
    {
      id: "3",
      user_id: "2",
      name : 'Some Portfolio'
    },
    {
      id: "4",
      user_id: "1",
      name: 'German Portfolio'
    },
    {
      id: "5",
      user_id: "2",
      name : 'Another Portfolio'
    },
  ],
  transactions: [
    {
      id: "1",
      portfolio_id: "2",
      date: '23/08/2019',
      stock:  'BNC',
      quantity: 22,
      price: 33.56,
      commission: 5.99,
    },
    {
      id: "3",
      portfolio_id: "2",
      date: '05/14/2007',
      stock:  'TLC',
      quantity: 55,
      price: 200.56,
      commission: 8.99,
    },
    {
      id: "4",
      portfolio_id: "2",
      date: '20/06/2017',
      stock:  'RY',
      quantity: 69,
      price: 22.56,
      commission: 3.99,
    },
    {
      id: "2",
      portfolio_id: "1",
      date: '26/08/2019',
      stock:  'BCE',
      quantity: 10,
      price: 22.57,
      commission: 7.99,
    },
    {
      id: "5",
      portfolio_id: "1",
      date: '26/09/2019',
      stock:  'BCE',
      quantity: 50,
      price: 30.57,
      commission: 2.99,
    }
  ]
}

module.exports = db