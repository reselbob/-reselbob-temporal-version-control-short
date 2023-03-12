import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import path from "path";
import fs from "fs";
//import {proofread} from "./activities";


const maximumAttempts = 10; //The number of times to retry

// Get the activities function in order to make them to the workflow.
const {proofread, copyEdit, techEdit, formatEdit} = wf.proxyActivities<typeof activities>({
    //More info about startToCloseTimeout is here: https://docs.temporal.io/concepts/what-is-a-start-to-close-timeout/
    startToCloseTimeout: '4 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts,
    }
});

export async function techPublishingWorkflow(): Promise<void> {
    const startTime = new Date(Date.now()).toString();
    const article = getArticle();

    const pr = await proofread(article);

    const te = await techEdit(article);

    const ce = await copyEdit(article);

    const fe = await formatEdit(article);

    const endTime = new Date(Date.now()).toString();

    const person = {
        startTime,
        proofread: pr,
        techEdit: te,
        copyEdit: ce,
        formatEdit: fe,
        endTime
    }

    console.log(JSON.stringify(person,null, 2));
}

function getArticle(): string{
    const dataFileSpec = path.join(__dirname, '../data', 'data.json')
    const data = fs.readFileSync(dataFileSpec,
        {encoding:'utf8', flag:'r'});
    const articles = JSON.parse(data);
    const randomIndex = Math.floor(Math.random() * articles.length);
    const randomEntry = articles[randomIndex];

    return randomEntry;
}
