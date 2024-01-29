const blogQuery = `
query Publication($host: String) {
    publication(host: $host) {
      id
      title
      displayTitle
      url
      about {
        html
      }
      links {
        hashnode
        twitter
        linkedin
        github
        website
        youtube
        dailydev
        mastodon
        instagram
      }
      preferences {
        navbarItems {
          id
          label
          url
          priority
          type
          series {
            name
            posts(first: 10) {
              edges {
                node {
                  id
                  title
                  subtitle
                  publishedAt
                  coverImage {
                    url
                  }
                  readTimeInMinutes
                  views
                  preferences {
                    pinnedToBlog
                  }
                  tags {
                    name
                  }
                }
              }
            }
          }
          page {
            id
            title
            content {
              html
            }
          }
        }
        layout
        enabledPages {
          badges
          newsletter
          members
        }
      }
    }
  }  
`
module.exports = blogQuery;