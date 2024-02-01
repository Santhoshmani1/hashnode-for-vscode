const vscode = require("vscode");
const postQuery = require("../apiQueries/post.js");
const getUris = require("../helpers/getUris.js");

function post(context, pageId) {
  console.log(pageId + "bro");
  const panel = vscode.window.createWebviewPanel(
    "hashnodePage",
    "Hashnode Page",
    vscode.ViewColumn.One,
    { enableScripts: true }
  );
  const { postStyleSheet } = getUris(context);
  const postStyleSheetUri = panel.webview.asWebviewUri(postStyleSheet);
  panel.webview.html = `
        <!DOCTYPE html>
        <html lang="en">
         <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Hashnode Post</title>
            <link rel="stylesheet" href="${postStyleSheetUri}">
         </head>
         <body>
            <header>
            <div class="header-wrapper">
             <h1>Hashnode for VS Code</h1>
            </div>
         </header>
         <main>
                <div id="page">
                </div>
         </main>
         <script>
         let postData = {};
            function getpostData(pageId){
             fetch("https://gql.hashnode.com", {
            method : "POST",
            headers : {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                query: \`${postQuery}\`,
                variables: {
                "id": \`${pageId}\`
                }
            })
             })
             .then((res => res.json()))
             .then((data) => {
            console.log(data);
            postData = data.data.page;
            const page = document.querySelector("#page")
            const pageHtml = renderPage(data.data)
            page.innerHTML = pageHtml;
            })
            .catch((error) => console.error('Error:', error))
            }
            function renderPage(postData){
                console.log(postData);
            const { title,publishedAt, author, views, readTimeInMinutes,content } = postData.post;
            return \`
                <div class="post">\${title}</div>
                <div class="post-cover">
                    <img src=\${postData.post?.coverImage?.url} alt=\${title} width="400px" height="auto"/>
                </div>
                <div class="post-author">\${author.username}</div>
                <div class="post-date">\${publishedAt}</div>
                <div class="post-read-time">\${readTimeInMinutes}</div>
                <div class="post-views">\${views}</div>
                <div class="post-content">\${content.html}</div>
            \`;
            }
            getpostData();
         </script>
         </body>
         </html>
    `;
}

module.exports = post;
