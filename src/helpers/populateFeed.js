function populateFeed(feedData) {
  return feedData
    .map(
      ({ node }) => `
        <div class="post" id="${node.id}">
        <h2 class="post-title">${node.title}</h2>
       <div class="author-info">
       <img src="${node.author.profilePicture}" alt="${
        node.author.name
      }" class="author-profile" />
      <div class="publication">
      <p class="post-author" onclick="dispatchOpenProfileEvent('${node.author.username}')">Author: ${node.author.name}</p>
      <p> Published to : ${node.publication.url} </p>
      </div>
       </div>
     <div class="post-header">
     <div>
     <p onclick="dispatchOpenPostEvent('${node.id}')">${node.brief}</p>
     </div>
     <div>
          ${
            node.coverImage && node.coverImage.url
              ? `<img src="${node.coverImage.url}" alt="${node.title}" class="cover-image">`
              : ""
          } 
          </div>          
          </div> 
          <p>Published at ${
  node.publishedAt.split("T")[0]
          }</p>
          <div class="post-reach">
          <p>Views ${node.views}</p>
          <p>Reactions  ${node.reactionCount}</p>
          <p>Read time  ${node.readTimeInMinutes} minutes</p>
          </div>
           <div class="tags-wrapper">
           ${
            node.tags.length > 0 &&
            `<div class="tags">
               ${node.tags
                 .slice(0, 3)
                 .map((tag) => `<span class="tag">${tag.name}</span>`)
                 .join("")}
           </div>
           `
          }
          </div>
        </div>
    `
    )
    .join("");
}
