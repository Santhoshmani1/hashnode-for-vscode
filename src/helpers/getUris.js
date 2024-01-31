const vscode = require("vscode");
const path = require("path");

function getUris(context) {
  const userStyleSheet = vscode.Uri.file(
    path.join(context.extensionPath, "src", "styles", "userProfile.css")
  );

  const feedStyleSheet =  vscode.Uri.file(
    path.join(context.extensionPath, "src", "styles", "feed.css")
  );

  const blogStyleSheet = vscode.Uri.file(
    path.join(context.extensionPath, "src", "styles", "blog.css")
  );

  const postStyleSheet = vscode.Uri.file(
    path.join(context.extensionPath, "src", "styles", "post.css")
  );

  const createProfileScript = vscode.Uri.file(
    path.join(context.extensionPath, "src", "helpers", "createProfile.js")
  );

  const populateFeedScript = vscode.Uri.file(
    path.join(context.extensionPath, "src", "helpers", "populateFeed.js")
  );

  const hashnodeImg = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "hashnode-icon.png")
  );

  // social icons uris
  const githubIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "github.svg")
  );

  const twitterIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "twitter.svg")
  );

  const linkedinIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "linkedin.svg")
  );

  const websiteIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "website.svg")
  );

  const youtubeIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "youtube.svg")
  );

  const stackoverflowIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "stackoverflow.svg")
  );

  const facebookIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "facebook.svg")
  );

  const instagramIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "instagram.svg")
  );

  // other icons uris
  const calendarIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "calendar.svg")
  );

  const locationIcon = vscode.Uri.file(
    path.join(context.extensionPath, "src", "images", "location.svg")
  );


  return {
    userStyleSheet,
    feedStyleSheet,
    blogStyleSheet,
    postStyleSheet,
    createProfileScript,
    populateFeedScript,
    hashnodeImg,
    githubIcon,
    twitterIcon,
    linkedinIcon,
    websiteIcon,
    youtubeIcon,
    stackoverflowIcon,
    facebookIcon,
    instagramIcon,
    calendarIcon,
    locationIcon
  };
}

module.exports = getUris;
