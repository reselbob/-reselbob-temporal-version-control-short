import {ApplicationFailure} from "@temporalio/workflow";
import path from "path";
import fs from "fs";

const PAUSE_LENGTH= 4000;
const dataFileSpec = path.join(__dirname, '../data', 'data.json')
export async function getArticle(): Promise<string>  {
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const articles = JSON.parse(data).articles;
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomEntry = articles[randomIndex];
    //await pause(PAUSE_LENGTH);
    return randomEntry;
}

export async function getEditor(): Promise<string>  {
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const articles = JSON.parse(data).editors;
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomEntry = articles[randomIndex];
    //await pause(PAUSE_LENGTH);
    return randomEntry;
}


export async function proofread(editor: string, article:string): Promise<string> {
    const msg = `${editor} is proofreading: ${article}.`;

    const arr : string[] = [];
    arr.push(msg);
    arr.push(await checkSpelling(editor, article));
    arr.push(await checkGrammar(editor, article));
    const json = JSON.stringify(arr,null, 2);
    console.log(json);
    //await pause(PAUSE_LENGTH);
    return json;
}

export async function copyEdit(editor: string, article:string): Promise<string> {
    const msg = `${editor} is copy editing: ${article}.`;
    console.log(msg);
    //await pause(PAUSE_LENGTH);
    return msg;
}

export async function formatEdit(editor: string, article:string): Promise<string> {
    const msg = `${editor} is format editing: ${article}.`;
    console.log(msg);
    //await pause(PAUSE_LENGTH);
    return msg;
}

export async function techEdit(editor: string, article:string): Promise<string> {
    const msg = `${editor} is tech editing: ${article}.`;
    console.log(msg);
    //await pause(PAUSE_LENGTH);
    return msg;
}

export async function checkSpelling(editor: string, article:string): Promise<string> {
    //await pause(PAUSE_LENGTH);
    const msg = `${editor} is spell checking: ${article}.`;
    return msg;
}

export async function checkGrammar(editor: string, article:string): Promise<string> {
    //await pause(PAUSE_LENGTH);
    const msg = `${editor} is grammar checking: ${article}.`;
    return msg;
}

async function pause(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



