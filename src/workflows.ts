import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

// Get the activities function in order to make them to the workflow.
const {getArticle, getEditor, proofread, copyEdit, techEdit, formatEdit} = wf.proxyActivities<typeof activities>({
    //More info about startToCloseTimeout is here: https://docs.temporal.io/concepts/what-is-a-start-to-close-timeout/
    startToCloseTimeout: '4 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts: 2,
    }
});

/***************************
 create a workflow type named techPublishingWorkflow
 ******************************/
export async function techPublishingWorkflow(): Promise<void> {
    //Put activities here
    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();

    const pr = await proofread(await getEditor(), article);
    //             millisec * sec * min
    await wf.sleep(1000 * 60 * 5);
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


