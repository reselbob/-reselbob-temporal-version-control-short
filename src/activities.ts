import {ApplicationFailure} from "@temporalio/workflow";
import path from "path";
import fs from "fs";

const PAUSE_LENGTH= 4000;

export async function getArticle(): Promise<string>  {
    const dataFileSpec = path.join(__dirname, '../data', 'data.json')
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const articles = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomEntry = articles[randomIndex];
    await pause(PAUSE_LENGTH);
    return randomEntry;
}


export async function proofread(article:string): Promise<string> {
    const msg = `I am proofreading [${article}].`;

    const arr : string[] = [];
    arr.push(msg);
    arr.push(await checkSpelling(article));
    arr.push(await checkGrammar(article));
    const json = JSON.stringify(arr,null, 2);
    console.log(json);
    await pause(PAUSE_LENGTH);
    return json;
}

export async function copyEdit(article:string): Promise<string> {
    const msg = `I am copy editing [${article}].`;
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function formatEdit(article:string): Promise<string> {
    const msg = `I am format editing [${article}].`;
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function techEdit(article:string): Promise<string> {
    const msg = `I am tech editing [${article}].`;
    console.log(msg);
    await pause(PAUSE_LENGTH);
    return msg;
}

export async function checkSpelling(article:string): Promise<string> {
    await pause(PAUSE_LENGTH);
    return `I am spell checking [${article}].`;
}

export async function checkGrammar(article:string): Promise<string> {
    await pause(PAUSE_LENGTH);
    return `I am grammar checking [${article}].`;
}


async function pause(milliseconds: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}



