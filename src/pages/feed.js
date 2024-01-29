const vscode = require("vscode");
const feedQuery = require("../apiQueries/feed.js");
const getUris = require("../helpers/getUris.js");



function feed(context) {
  const panel = vscode.window.createWebviewPanel(
    "hashnodeFeed",
    "Hashnode Feed",
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  );

  const {populateFeedScript,feedStyleSheet,hashnodeImg} = getUris(context);

  const populateFeedScriptUri = panel.webview.asWebviewUri(populateFeedScript);
  const feedStyleSheetUri = panel.webview.asWebviewUri(feedStyleSheet);
  const hashnodeImgUri = panel.webview.asWebviewUri(hashnodeImg);

  panel.webview.html = `
    <!DOCTYPE html>
 <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hashnode Feed</title>
    <link rel="stylesheet" href="${feedStyleSheetUri}" />
  </head>
  <body>
  <header>
       <div class="header-wrapper">
       <img src="${hashnodeImgUri}" alt="hashnode-icon" class="hashnode-icon" width="100"/>
        <h1>Hashnode for VS Code</h1>
       </div>
    </header>
    <main>
        <div class="hashnode-feed"></div>
    </main>
    <script src="${populateFeedScriptUri}"></script>
    <script>
    fetch("https://gql.hashnode.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: \`
       ${feedQuery}
        \`,
      })
    })
    .then((res) => res.json())
    .then((feedData) => {
      const feedHtml = populateFeed(feedData.data.feed.edges)
      document.querySelector(".hashnode-feed").innerHTML = feedHtml
    })
    .catch((error) => console.error('Error:', error));
      </script>
  </body>
</html>
`;
}

module.exports = feed;
