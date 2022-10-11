import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';

interface TestEditorOptions {
	language?: string;
	content?: string;
}

type TestEditorAction = (editor: vscode.TextEditor, document: vscode.TextDocument) => void;

async function inTextEditor(options: TestEditorOptions, action: TestEditorAction) {
	const d = await vscode.workspace.openTextDocument(options);
	await vscode.window.showTextDocument(d);
	await action(vscode.window.activeTextEditor!, d);
}

function move(editor: vscode.TextEditor, line: number, col: number) {
	const pos = new vscode.Position(line, col);
	editor.selection = new vscode.Selection(pos, pos);
}
/*

function select(editor: vscode.TextEditor, range: vscode.Range) {
	editor.selection = new vscode.Selection(range.start, range.end);
}


suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start default tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});*/


suite('Commands', () => {
	vscode.window.showInformationMessage('Start commands tests.');

	test('Promote', async () => {
		const steps = [
			'##### Home',
			'#### Home',
			'### Home',
			'## Home',
			'# Home',
			'Home',
		];

		await inTextEditor({ language: 'markdown', content: steps[0] }, async (_, document) => {
			for (let i = 1; i < steps.length; ++i) {
				await vscode.commands.executeCommand('markdownheadings.promoteHeading');
				assert.equal(document.getText(), steps[i]);
			}
		});
	});

	test('Demote', async () => {
		const steps = [
			'Home',
			'# Home',
			'## Home',
			'### Home',
			'#### Home',
			'##### Home',
		];

		await inTextEditor({ language: 'markdown', content: steps[0] }, async (_, document) => {
			for (let i = 1; i < steps.length; ++i) {
				await vscode.commands.executeCommand('markdownheadings.demoteHeading');
				assert.equal(document.getText(), steps[i]);
			}
		});
	});

	test('InsertHeading', async () => {
		const initial = `# Header`;
		const expected = `# Header
# 
# `;

		await inTextEditor({ language: 'markdown', content: initial }, async (_, document) => {
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			assert.equal(document.getText(), expected);
		});
	});

	test('InsertSubheading', async () => {
		const initial = `# Header`;
		const expected = `# Header
## 
### `;

		await inTextEditor({ language: 'markdown', content: initial }, async (_, document) => {
			await vscode.commands.executeCommand('markdownheadings.addSubHeading');
			await vscode.commands.executeCommand('markdownheadings.addSubHeading');
			assert.equal(document.getText(), expected);
		});
	});

	test('InsertSubheading2', async () => {
		const initial = ``;
		const expected = `# 
## `;

		await inTextEditor({ language: 'markdown', content: initial }, async (_, document) => {
			await vscode.commands.executeCommand('markdownheadings.addSubHeading');
			await vscode.commands.executeCommand('markdownheadings.addSubHeading');
			assert.equal(document.getText(), expected);
		});
	});

	test('InsertHeading2', async () => {
		const initial = `Hello`;
		const expected = `Hello
# 
# `;

		await inTextEditor({ language: 'markdown', content: initial }, async (_, document) => {
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			assert.equal(document.getText(), expected);
		});
	});

	test('InsertHeading3', async () => {
		const initial = `# Hello

`;
		const expected = `# Hello

# 
# `;

		await inTextEditor({ language: 'markdown', content: initial }, async (editor, document) => {
			move(editor, 2, 0);
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			await vscode.commands.executeCommand('markdownheadings.addHeading');
			assert.equal(document.getText(), expected);
		});
	});
});
