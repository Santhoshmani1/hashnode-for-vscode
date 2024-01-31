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
      headerColor
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
                  brief
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
      author {
        id
        username
        name
        profilePicture 
      }
      pinnedPost {
        id
        title
        coverImage {
          url
        }
        slug
        brief
        views
        readTimeInMinutes
      }
      posts(first:20) {
        edges {
          node {
            id
            title
            coverImage {
              url
            }
            brief
            views
            readTimeInMinutes
          }
        }
      }
    }
  }  
`;
module.exports = blogQuery;
