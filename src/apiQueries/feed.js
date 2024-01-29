const feedQuery = `
query feed {
  feed(first: 10) {
    edges {
      node {
        id
        title
        url
        coverImage {
          url
        }
        author {
          name
          username
          profilePicture
        }
        publication {
          url
        }
        tags {
          id
          name
        }
        publishedAt
        views
        reactionCount
        readTimeInMinutes
        brief
      }
    }
  }
} 
`

module.exports = feedQuery;
