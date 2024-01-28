const userQuery = `
query User($username: String!, $roles: [UserPublicationRole!]) {
    user(username: $username) {
      id
      username
      name
      tagline
      bio {
        text
      }
      profilePicture
      socialMediaLinks {
        website
        github
        twitter
        instagram
        facebook
        stackoverflow
        linkedin
        youtube
      }
      badges {
        id
        name
        description
        image
        dateAssigned
      }
      followersCount
      followingsCount
      dateJoined
      location
      availableFor
      followers(page: 1, pageSize: 0) {
        nodes {
          name
          username
        }
        pageInfo {
          previousPage
          nextPage
          hasNextPage
          hasPreviousPage
        }
        totalDocuments
      }
      follows(page: 1, pageSize: 0) {
        nodes {
          name
          username
        }
        pageInfo {
          previousPage
          hasPreviousPage
          nextPage
          hasNextPage
        }
        totalDocuments
      }
      publications(first: 5, filter: { roles: $roles }) {
        edges {
          node {
            id
            title
            displayTitle
            about {
              html
            }
            url
          }
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  }`

  module.exports = userQuery;