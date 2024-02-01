const vscode = require("vscode");
const userQuery = require("../apiQueries/user.js");
const blog = require("./blog.js");
const getUris = require("../helpers/getUris.js");

function userProfile(context, username) {
  if (username) {
    const panel = vscode.window.createWebviewPanel(
      "hashnodeProfile",
      "Hashnode Profile",
      vscode.ViewColumn.One,
      {
        enableScripts: true,
      }
    );

    panel.webview.onDidReceiveMessage(
      (message) => {
        switch (message.command) {
          case "openBlog":
            console.log("openBlog");
            blog(context, message.blog);
            return;
        }
      },
      undefined,
      context.subscriptions
    );

    const {
      userStyleSheet,
      createProfileScript,
      hashnodeImg,
      githubIcon,
      linkedinIcon,
      twitterIcon,
      websiteIcon,
      facebookIcon,
      instagramIcon,
      stackoverflowIcon,
      youtubeIcon,
      calendarIcon,
      locationIcon,
    } = getUris(context);
    const userStyleSheetUri = panel.webview.asWebviewUri(userStyleSheet);
    const createProfileScriptUri =
      panel.webview.asWebviewUri(createProfileScript);
    const hashnodeImgUri = panel.webview.asWebviewUri(hashnodeImg);

    // Create WebView URIs for the remaining icons
    const githubIconUri = panel.webview.asWebviewUri(githubIcon);
    const linkedinIconUri = panel.webview.asWebviewUri(linkedinIcon);
    const twitterIconUri = panel.webview.asWebviewUri(twitterIcon);
    const websiteIconUri = panel.webview.asWebviewUri(websiteIcon);
    const facebookIconUri = panel.webview.asWebviewUri(facebookIcon);
    const instagramIconUri = panel.webview.asWebviewUri(instagramIcon);
    const stackoverflowIconUri = panel.webview.asWebviewUri(stackoverflowIcon);
    const youtubeIconUri = panel.webview.asWebviewUri(youtubeIcon);
    const calendarIconUri = panel.webview.asWebviewUri(calendarIcon);
    const locationIconUri = panel.webview.asWebviewUri(locationIcon);

    panel.webview.html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hashnode for VS Code</title>
    <link rel="stylesheet" href="${userStyleSheetUri}">
</head>
<body>
    <header>
       <div class="header-wrapper">
       <img src="${hashnodeImgUri}" alt="hashnode-icon" class="hashnode-icon" width="100"/>
        <h1>Hashnode for VS Code</h1>
       </div>
    </header>
    <main>
        <div class="profile-wrapper">
        <h2>Profile</h2>
        </div>
    </main>
    <footer></footer>
    <script src="${createProfileScriptUri}"></script>
    <script>
    const vscode = acquireVsCodeApi();
    function dispatchOpenBlog(blog) {
      console.log(blog);
      const event = new CustomEvent('openBlog', { detail: blog });
      window.dispatchEvent(event);
    }
    window.addEventListener('openBlog', function (event) {
      vscode.postMessage({
        command: 'openBlog',
        blog: event.detail
      });
    })    
    fetch("https://gql.hashnode.com", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    query: \`
    ${userQuery}
    \`,
    variables: {
      username: "${username}",
      roles: ["OWNER"]
    }
  })
})
.then((res) => res.json())
.then((data) => {
  const profile = data.data.user;
  const icons = {
    githubIcon: "${githubIconUri}",
    twitterIcon: "${twitterIconUri}",
    linkedinIcon: "${linkedinIconUri}",
    websiteIcon: "${websiteIconUri}",
    facebookIcon: "${facebookIconUri}",
    instagramIcon: "${instagramIconUri}",
    stackoverflowIcon: "${stackoverflowIconUri}",
    youtubeIcon: "${youtubeIconUri}",
    calendarIcon: "${calendarIconUri}",
    locationIcon: "${locationIconUri}"
  };
  const profileWrapper = document.querySelector(".profile-wrapper");
  const profileHTML = createProfile(profile,icons);
  profileWrapper.innerHTML = profileHTML;
})
.catch((error) => console.error('Error:', error));
    </script>
</body>
</html>
    `;
  } else {
    vscode.window.showInformationMessage(
      "Please set your Hashnode username first"
    );
  }
}

module.exports = userProfile;
