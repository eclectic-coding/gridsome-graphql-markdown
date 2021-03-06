// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here requires a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

// module.exports = function (api) {
//   api.loadSource(({ addCollection }) => {
//     // Use the Data store API here: https://gridsome.org/docs/data-store-api/
//   })
// }
module.exports = function(api) {
  api.loadSource(store => {
    if (process.env.NODE_ENV === 'production') {
      const posts = store.getContentType('Post')

      posts.data().forEach(node => {
        if (node.published !== true) {
          posts.removeNode(node.id)
        }
      })
    }
  })
}
