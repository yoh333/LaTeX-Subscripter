"use strict";

import * as vscode from 'vscode';


export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand(
		"latex-subscripter.subscript",
		function () {
			// Get the active editor
			const editor = vscode.window.activeTextEditor;

			if (editor) {
				const document = editor.document;
				const selection = editor.selection;

				// Get the word within the selection
				const word = document.getText(selection);
				let subscript = word;

				// Change the word
				if (word.slice(0, 1) === "$" && word.slice(-1) === "$") {
					subscript = subscript.replace(/\$|_|{|}/g, "");
				} else {
				  if (word.length > 2) {
					subscript = word.slice(0, 1) + "{" + word.substring(1) + "}";
				  }
				  subscript =
					"$" + subscript.slice(0, 1) + "_" + subscript.substring(1) + "$";
				}

				// Replace the word
				editor.edit((editorBuilder) => {
					editorBuilder.replace(selection, subscript);
				});
			}
		}
	);
	// Resource release
	context.subscriptions.push(disposable);
}

