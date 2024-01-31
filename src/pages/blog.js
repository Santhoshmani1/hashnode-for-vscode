const vscode = require("vscode");
const blogQuery = require("../apiQueries/blog.js");
const getUris = require("../helpers/getUris.js");
function blog(context, host) {
  const panel = vscode.window.createWebviewPanel(
    "hashnodeBlog",
    "Hashnode Blog",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );
  const { blogStyleSheet } = getUris(context);
  const blogStyleSheetUri = panel.webview.asWebviewUri(blogStyleSheet);

  panel.webview.html = `
    <!DOCTYPE html>
    <html lang="en">
     <head>
       <meta charset="UTF-8">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <title>Hashnode Feed</title>
        <link rel="stylesheet" href="${blogStyleSheetUri}">
     </head>
     <body>
        <header>
          <div class="header-wrapper">
           <h1>Hashnode for VS Code</h1>
          </div>
       </header>
       <main>
            <div id="blog">
            </div>
       </main>
       <script>
       let publicationData = {};
        function getBlogData(){
         fetch("https://gql.hashnode.com", {
          method : "POST",
          headers : {
            "Content-Type": "application/json"
          },
          body : JSON.stringify({
            query: \`${blogQuery}\`,
            variables: {
              "host": "${host}",
            }
          })
         })
         .then((res => res.json()))
         .then((data) => {
          console.log(data);
          publicationData = data.data.publication;
          const blog = document.querySelector("#blog")
          const blogHtml = renderBlog(data.data)
          blog.innerHTML = blogHtml;
        })
        .finally(() => {
          const headerWrapper = document.querySelector('.blog-header-wrapper');
          headerWrapper.style.backgroundColor = publicationData.headerColor;
          const listItems = document.querySelectorAll('.blog-navitem');
          const navbarItems = publicationData.preferences.navbarItems;
          console.log(navbarItems);
          loadHome(publicationData.posts);
          listItems.forEach((item) => {
            item.addEventListener('click', (e) => {
              const pageBody = document.querySelector('.blog-page-body');
              const url = e.target.id;
              console.log(url);
              if(url === publicationData.url + "/"){
                const posts = publicationData.posts;
                loadHome(posts);
              }
              else if(new RegExp(publicationData.url + "/series/.*").test(url)){  
                loadSeries(publicationData.preferences.navbarItems, url);
              }
              else{
                loadPage(publicationData.preferences.navbarItems, url);
              }
            })
          })
         })
       }
       function renderBlog(blogData) {
        const { id, title, displayTitle, url, about, links, preferences,posts,headerColo,author} =
          blogData.publication;
        const html = \`
      <div class="blog-header-wrapper">
        <div class="author-container" id="\${author.username}">
          <div class="author-image-container">
            <img src="\${author.profilePicture}" alt="profile-picture" width="100px" height="100px" class="author-image"/>
          </div>
          <div class="blog-title">\${title}</div>
        </div>          
        <div class="blog-navbar">
              <ul id="nav-container">
                <li class="blog-navitem"  id=\${url+ "/"}>Home</li>
                \${preferences.navbarItems
                  .map((navItem) => {
                    return \`
                    <li class="blog-navitem" id=\${navItem.url}>\${navItem.label}</li>
                    \`;
                  })
                  .join("")}
              </ul>
        </div>
      </div>
      <div class="blog-page-body">
      </div>
          \`;
        return html;
      }
      function loadHome(posts){

        const homeBody = \`
        <div class="blog-home">
          \${posts.edges.map(({node}) => {
            return \`
            <div class="blog-post">
              <div class="blog-post-title">\${node.title}</div>
              <div class="blog-post-brief">\${node.brief}</div>
              <img src="\${node.coverImage.url}" alt="post-cover-image" width="300px" height="200px" class="post-cover-image"/>
              <div class="post-read-time" >Read time :\${node.readTimeInMinutes}</div>
              <div class="post-views">Views : \${node.views}</div>
            </div>
            \`;
          }).join('')}
       </div>
       \`;
       const blogPageBody = document.querySelector(".blog-page-body");
       blogPageBody.innerHTML = homeBody;
}
        function loadSeries(navbarItems, url){
          const seriesItem = navbarItems.find(item => item.url === url);
          if(seriesItem && seriesItem.type === 'series') {
            const posts = seriesItem.series.posts;
            posts.edges.map(({node}) => {
              console.log(node.title);
            })
            const seriesBody = \`
            <div class="blog-series">
            \${posts.edges.map(({node}) => {
              console.log(node);
              return \`
              <div class="blog-post">
                <div class="blog-post-title">\${node.title}</div>
                <div class="blog-post-brief">\${node.brief}</div>
                <img src="\${node.coverImage.url}" alt="post-cover" class="post-cover-image" width="300px" height="200px"/>
                <div class="post-read-time" >Read time : \${node.readTimeInMinutes}</div>
                <div class="post-views">Views : \${node.views}</div>
              </div>
              \`;
            }).join('')}
            </div>
            \`;
            const blogPageBody = document.querySelector(".blog-page-body");
            blogPageBody.innerHTML = seriesBody;
          }
        }
      function loadPage(navbarItems, url){
        const pageItem = navbarItems.find(item => item.url === url);
        if(pageItem && pageItem.type === 'page') {
          const htmlContent = pageItem.page.content.html;
        const blogPageBody = document.querySelector(".blog-page-body");
        blogPageBody.innerHTML = htmlContent;
      }

      }
       getBlogData();
       </script>
    <body>
    `;
}

module.exports = blog;
