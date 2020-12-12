// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "ui5-jsdoc-sync" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('ui5-jsdoc-sync.helloWorld', () => {
		// The code you placvsce packagee here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from UI5 JSDoc Sync!');
	});

	context.subscriptions.push(disposable);

	disposable = vscode.commands.registerCommand('ui5-jsdoc-sync.sync', () => {
		let deleteIndexStart: any;
		let deleteIndexEnd: any;
		let insertIndexStart: any;

		const editor = vscode.window.activeTextEditor;

		if (editor) {
			const document = editor.document;

			let documentText = document.getText();

			let jSDocString: string = "";

			let match: string;

			let defineParameters: Array<string> = [];
			let matchString: Array<string> = [];

			let regExp = new RegExp(/(?<=sap.ui.define\(\[)[\s\S]*(?=\],)/g);
			matchString = documentText.match(regExp) || [];


			for (let index = 0; index < matchString.length; index++) {
				matchString[index] = matchString[index].trim();
				matchString[index] = matchString[index].replace(/ /g, '');
				matchString[index] = matchString[index].replace(/\'/g, '');
				matchString[index] = matchString[index].replace(/'/g, '');
				matchString[index] = matchString[index].replace(/\\n/g, '');
				matchString[index] = matchString[index].replace(/\n/g, '');
				matchString[index] = matchString[index].replace(/^\s+|\s+$/g, '');
			}

			defineParameters = matchString[0].split(",");

			let lastParameter = defineParameters[defineParameters.length - 1];
			let lastPosition = documentText.indexOf(lastParameter);

			let insertIndexStart = documentText.indexOf(",", lastPosition + lastParameter.length) + 2;
			let deleteIndexEnd = documentText.indexOf("function") - 1;
			let deleteIndexStart = insertIndexStart;

			jSDocString = "\n";

			jSDocString = jSDocString + "    /**\n";
			jSDocString = jSDocString + "    * Module dependencies\n";
			jSDocString = jSDocString + "    *\n";

			for (let k = 0; k < defineParameters.length; k++) {
				// let nameSpace: string = "";
				let nameSpace = defineParameters[k];
				var names = nameSpace.split("/");
				var lastName = names[names.length - 1];
				let dotNamespace = names.join(".");

				jSDocString = jSDocString + `    *   @param  {typeof ${dotNamespace}} ${lastName} \n`;
			}

			jSDocString = jSDocString + "    */\n";

			editor.edit(editBuilder => {
				if (editor) {
					if (deleteIndexStart && deleteIndexEnd) {
						editBuilder.delete(new vscode.Range(document.positionAt(deleteIndexStart), document.positionAt(deleteIndexEnd)));
					}
					if (insertIndexStart) {
						editBuilder.insert(document.positionAt(insertIndexStart), jSDocString);
					}
				}
			});

		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Define paramaters added to JSDOC');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
