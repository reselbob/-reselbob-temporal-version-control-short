import path from "path";
import fs from "fs";
import {IConfig} from "../config";

export async function proofread_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is proofreading: ${config.article} for publisher - ${config.publisher}.`;
    const arr : string[] = [];
    arr.push(msg);
    arr.push(await checkSpelling_v4(config));
    arr.push(await checkGrammar_v4(config));
    const json = JSON.stringify(arr,null, 2);
    console.log(json);
    return json;
}

export async function copyEdit_v4(config : IConfig): Promise<string> {
    const arr : string[] = [];
    arr.push(`${config.editor} is copy editing: ${config.article} for publisher - ${config.publisher}.`);
    arr.push(await checkStyle_v4(config));
    return JSON.stringify(arr, null, 2);
}

export async function formatEdit_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is format editing: ${config.article} for publisher - ${config.publisher}.`;
    console.log(msg);
    return msg;
}

export async function techEdit_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is tech editing: ${config.article} for publisher - ${config.publisher}.`;
    console.log(msg);
    return msg;
}

export async function checkSpelling_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is spell checking: ${config.article} for publisher - ${config.publisher}.`;
    return msg;
}

export async function checkGrammar_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is grammar checking: ${config.article} for publisher - ${config.publisher}.`;
    return msg;
}

export async function checkStyle_v4(config : IConfig): Promise<string> {
    const msg = `${config.editor} is style checking: ${config.article}.`;
    return msg;
}
