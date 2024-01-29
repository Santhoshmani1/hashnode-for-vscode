const vscode = require("vscode");
const userProfile = require("./pages/profile.js");
const feed = require("./pages/feed.js");

function activate(context) {
  console.log(
    'Congratulations, your extension "hashnode-for-vscode" is now active!'
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("hashnode-for-vscode.setUserName", () => {
      vscode.window
        .showInputBox({ prompt: "Enter your Hashnode username" })
        .then((name) => {
          name = name.trim();
          context.globalState.update("hashnodeUserName", name);
          console.log(context.globalState.get("hashnodeUserName"));
          vscode.window.showInformationMessage(
            "Welcome" + name + "to Hashnode for VSCode"
          );
          userProfile(context);
        });
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("hashnode-for-vscode.userProfile", () => {
      userProfile(context);
    })
  );
  context.subscriptions.push(
    vscode.commands.registerCommand("hashnode-for-vscode.feed", () => {
     feed(context);
    })
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
