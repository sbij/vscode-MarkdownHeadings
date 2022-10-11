import * as vscode from 'vscode';
import * as Utils from './utils';


export function addHeading(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        //const document = textEditor.document;
        const cursorPos = Utils.getCursorPosition();
        if (cursorPos !== null) {
            const curHeadingLine = Utils.headingLine(textEditor.document, cursorPos);
            const endOfLine = Utils.getLine(textEditor.document, cursorPos.line).length; // position of end of line
            const insertPos = new vscode.Position(cursorPos.line, endOfLine); // go to end of line

            if (curHeadingLine !== "") {
                const headingPrefix = Utils.getHeadingPrefix(textEditor.document, curHeadingLine);
                // we check where we are launching the function (on a line, under a line, etc.), and add a different number of linebreaks depending on the position
                if (endOfLine !== 0) { // if we are on a line containing text
                    edit.insert(insertPos, "\n" + headingPrefix + " ");
                } else { // if we are on an empty line
                    edit.insert(insertPos, headingPrefix + " ");
                }
            } else {
                // if there is no title, we add a level 1 title
                // we check where we launch the function from, and may add linebreaks
                if (endOfLine !== 0) { // if we are on a line containing text
                    edit.insert(insertPos, "\n# ");
                } else { // if we are on an empty line
                    edit.insert(insertPos, "# ");
                }
            }
            Utils.moveToEndOfLine(textEditor, new vscode.Position(insertPos.line, 0));
            textEditor.revealRange(new vscode.Range(insertPos, insertPos));     // jump screen so cursor is in view
        }
    }
}

export function addSubHeading(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        //const document = textEditor.document;
        const cursorPos = Utils.getCursorPosition();
        if (cursorPos !== null) {
            const curHeadingLine = Utils.headingLine(textEditor.document, cursorPos);
            const endOfLine = Utils.getLine(textEditor.document, cursorPos.line).length;
            const insertPos = new vscode.Position(cursorPos.line, endOfLine);

            if (curHeadingLine !== "") {
                const headingPrefix = Utils.getHeadingPrefix(textEditor.document, curHeadingLine);
                if (endOfLine !== 0) {
                    edit.insert(insertPos, "\n" + headingPrefix + "# ");
                } else {
                    edit.insert(insertPos, headingPrefix + "# ");
                }
            } else {
                // if there is no title, we add a level 1 title
                // or we do not add anything?
                if (endOfLine !== 0) {
                    edit.insert(insertPos, "\n# ");
                } else {
                    edit.insert(insertPos, "# ");
                }
            }
            Utils.moveToEndOfLine(textEditor, new vscode.Position(insertPos.line, 0));
            textEditor.revealRange(new vscode.Range(insertPos, insertPos));     // jump screen so cursor is in view
        }
    }
}

export function demoteHeading(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        //const document = textEditor.document;
        const cursorPos = Utils.getCursorPosition();
        if (cursorPos !== null) {
            //const curHeadingLine = Utils.headingLine(textEditor.document, cursorPos);
            //const endOfLine = Utils.getLine(textEditor.document, cursorPos.line).length;
            const insertPos = new vscode.Position(cursorPos.line, 0);
            const curLine = Utils.getLine(textEditor.document, cursorPos.line);

            // we check if the line on which the cursor is is a heading
            const headingPrefix = Utils.getHeadingPrefix(textEditor.document, cursorPos.line);

            if (headingPrefix !== "") {
                // we replace the heading from the line

                const headingPosition = new vscode.Range(insertPos, new vscode.Position(cursorPos.line, headingPrefix.length));

                edit.replace(headingPosition, headingPrefix + "#");

            } else {
                // not a heading line, so we add a level 1 title
                edit.insert(insertPos, "# ");

                //Utils.moveToEndOfLine(textEditor, new vscode.Position(insertPos.line, 0));
                //textEditor.revealRange(new vscode.Range(insertPos, insertPos));     // jump screen so cursor is in view
            }
        }
    }
}

export function promoteHeading(textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        //const document = textEditor.document;
        const cursorPos = Utils.getCursorPosition();
        if (cursorPos !== null) {
            //const curHeadingLine = Utils.headingLine(textEditor.document, cursorPos);
            //const endOfLine = Utils.getLine(textEditor.document, cursorPos.line).length;
            const insertPos = new vscode.Position(cursorPos.line, 0);
            const curLine = Utils.getLine(textEditor.document, cursorPos.line);

            // we check if the line on which the cursor is is a heading
            const headingPrefix = Utils.getHeadingPrefix(textEditor.document, cursorPos.line);

            if (headingPrefix !== "") {
                // we replace the heading from the line

                const headingPosition = new vscode.Range(insertPos, new vscode.Position(cursorPos.line, headingPrefix.length));

                // we remove the last char of headingprefix
                // if prefix is only one # we remove the space too
                if (headingPrefix === "#") {
                    edit.delete(new vscode.Range(insertPos, new vscode.Position(cursorPos.line, 2)));
                } else {
                    edit.replace(headingPosition, headingPrefix.slice(0, -1));
                }
            }
        }
    }
}