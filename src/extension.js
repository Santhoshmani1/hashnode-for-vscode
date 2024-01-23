// The module 'vscode' contains the VS Code extensibility API

// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log(
    'Congratulations, your extension "hashnode-for-vscode" is now active!'
  );

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
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
        })
        .catch((err) => {
          vscode.window.showErrorMessage("Unable to set Username,Try Again");
        });
    })
  );
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
