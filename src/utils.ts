//import { posix } from 'path';
import * as vscode from 'vscode';

export function getCursorPosition() {
    const activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        //const currentPos = activeEditor.document.offsetAt(activeEditor.selection.active);
        const currentPos = (activeEditor.selection.active);
        return currentPos;
    } else {
        return null;
    }

}

export function headingLine(document: vscode.TextDocument, lineNum: vscode.Position) {
    var verifLine = lineNum.line;
    var ok = 0;
    
    while (ok === 0 && verifLine >= 0) {
        // we check if we find a markdown heading at this line
        // if not, we go up one line
        var prefix = document.lineAt(verifLine).text.match(/^\#+\s/);
        if (prefix) {
            return verifLine;
        }
        verifLine--;
    }
    return "";
}

export function getHeadingPrefix(document: vscode.TextDocument, lineNum: number) {
    const prefix = document.lineAt(lineNum).text.match(/^\#+\s/);
    if (prefix) {
        return prefix[0].trim();
    } else {
        return "";
    }
}

export function getLine(document: vscode.TextDocument, lineNum: number) {
    return document.lineAt(lineNum).text;
}

export function moveToEndOfLine(editor: vscode.TextEditor, pos: vscode.Position) {
    const curLine = getLine(editor.document, pos.line);
    const endOfLine = curLine.length;
    const endOfLinePos = new vscode.Position(pos.line, endOfLine);
    editor.selections = [new vscode.Selection(endOfLinePos, endOfLinePos)];
}