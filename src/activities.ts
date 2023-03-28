import path from "path";
import fs from "fs";
import {IConfig} from "./config";

const dataFileSpec = path.join(__dirname, '../data', 'data.json')
export async function getArticle(): Promise<string>  {
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const articles = JSON.parse(data).articles;
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomEntry = articles[randomIndex];
    return randomEntry;
}

export async function getEditor(): Promise<string>  {
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const editors = JSON.parse(data).editors;
    let randomEntry = '';
    while (randomEntry === '' || randomEntry.includes("Fred") || randomEntry.includes("Elmer")) {
        const randomIndex = Math.floor(Math.random() * editors.length);
        randomEntry = editors[randomIndex];
        if (randomEntry != '' && !randomEntry.includes("Fred") && !randomEntry.includes("Elmer")) {
            return randomEntry;
        }
    }
    return 'Unknown';
}


export async function proofread(config : IConfig): Promise<string> {
    const msg = `${config.editor} is proofreading: ${config.article} for publisher - ${config.publisher}.`;
    const arr : string[] = [];
    arr.push(msg);
    arr.push(await checkSpelling(config));
    arr.push(await checkGrammar(config));
    const json = JSON.stringify(arr,null, 2);
    console.log(json);
    return json;
}

export async function copyEdit(config : IConfig): Promise<string> {
    const arr : string[] = [];
    arr.push(`${config.editor} is copy editing: ${config.article}.`);
    arr.push(await checkStyle(config));
    return JSON.stringify(arr, null, 2);
}

export async function getBrandingApproval(config : IConfig): Promise<boolean> {
    let b = true
    let  msg = `${config.article} has been approved by the Branding Committee for publisher - ${config.publisher}.`
    if(config.article.includes('Understanding EVM Bytecode') || config.article.includes('10 Tips for Bash Scripting') ) b = false;

    if(!b){
        msg = `${config. article} has NOT been approved by the Branding Committee for publisher - ${config.publisher}.`
    }
    console.log(msg);
    return b;
}

export async function formatEdit(config : IConfig): Promise<string> {
    const msg = `${config.editor} is format editing: ${config.article} for publisher - ${config.publisher}.`;
    console.log(msg);
    return msg;
}

export async function techEdit(config : IConfig): Promise<string> {
    const msg = `${config.editor} is tech editing: ${config.article} for publisher - ${config.publisher}.`;
    console.log(msg);
    return msg;
}

export async function checkSpelling(config : IConfig): Promise<string> {
    const msg = `${config.editor} is spell checking: ${config.article} for publisher - ${config.publisher}.`;
    return msg;
}

export async function checkGrammar(config : IConfig): Promise<string> {
    const msg = `${config.editor} is grammar checking: ${config.article} for publisher - ${config.publisher}.`;
    return msg;
}

export async function checkStyle(config : IConfig): Promise<string> {
    const msg = `${config.editor} is style checking: ${config.article}.`;
    return msg;
}
