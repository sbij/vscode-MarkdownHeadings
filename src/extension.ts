// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import * as ExtFunctions from './ext-functions';


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "markdownheadings" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json

	
	const disposableAddHeading = vscode.commands.registerTextEditorCommand('markdownheadings.addHeading', ExtFunctions.addHeading);
	const disposableAddSubHeading = vscode.commands.registerTextEditorCommand('markdownheadings.addSubHeading', ExtFunctions.addSubHeading);
	const disposableDemoteHeading = vscode.commands.registerTextEditorCommand('markdownheadings.demoteHeading', ExtFunctions.demoteHeading);
	const disposablePromoteHeading = vscode.commands.registerTextEditorCommand('markdownheadings.promoteHeading', ExtFunctions.promoteHeading);

	context.subscriptions.push(disposableAddHeading);
	context.subscriptions.push(disposableAddSubHeading);
	context.subscriptions.push(disposableDemoteHeading);
	context.subscriptions.push(disposablePromoteHeading);
}

// this method is called when your extension is deactivated
export function deactivate() { }
