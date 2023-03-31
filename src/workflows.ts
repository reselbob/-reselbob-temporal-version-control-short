import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import {patched} from '@temporalio/workflow';

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

    let v = '';
    let pr = '';
    let te = '';
    let ce = ''
    let fe = '';
    let techPub = {};
    if (patched('V3')) {
        v = 'V3';
        te = await techEdit(await getEditor(), article);

        //             millisec * sec * min
        await wf.sleep(1000 * 60 * 5);
        pr = await proofread(await getEditor(), article);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    }

    if (wf.patched('V2')) {
        v = 'V2';
        pr = await proofread(await getEditor(), article);
        //             millisec * sec * min
        await wf.sleep(1000 * 60 * 5);
        te = await techEdit(await getEditor(), article);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    }

    if (wf.patched('V1')) {
        v = 'V1';
        pr = await proofread(await getEditor(), article);
        //             millisec * sec * min
        await wf.sleep(1000 * 60 * 5);
        te = await techEdit(await getEditor(), article);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    }

    techPub = {
        startTime,
        version: v,
        techEdit: te,
        proofread: pr,
        copyEdit: ce,
        formatEdit: fe,
        endTime: new Date(Date.now()).toString()
    }

    console.log(JSON.stringify(techPub, null, 2));
}


