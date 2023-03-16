import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';



const maximumAttempts = 10; //The number of times to retry

// Get the activities function in order to make them to the workflow.
const {getArticle, getEditor, proofread, copyEdit, techEdit, formatEdit} = wf.proxyActivities<typeof activities>({
    //More info about startToCloseTimeout is here: https://docs.temporal.io/concepts/what-is-a-start-to-close-timeout/
    startToCloseTimeout: '4 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts: 2,
    }
});

export async function techPublishingWorkflow(): Promise<void> {
    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();

    const pr = await proofread(await getEditor(), article);

    const te = await techEdit(await getEditor(), article);

    const ce = await copyEdit(await getEditor(), article);

    const fe = await formatEdit(await getEditor(), article);

    const endTime = new Date(Date.now()).toString();

    const techPub = {
        startTime,
        proofread: pr,
        techEdit: te,
        copyEdit: ce,
        formatEdit: fe,
        endTime
    }

    console.log(JSON.stringify(techPub,null, 2));
}


