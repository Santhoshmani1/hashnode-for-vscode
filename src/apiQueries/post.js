const postQuery = `
query Post($id: ID!) {
    post(id: $id) {
      id
      slug
      title
      subtitle
      content {
        html
      }
      author{
        username
        profilePicture
      }
      coverImage {
        url
      }
      views
      publishedAt
      readTimeInMinutes
      publication{
        url
        id
      }
    }
  }
`
module.exports = postQuery;