import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';
import { patched } from '@temporalio/workflow';

// Get the activities function in order to make them to the workflow.
const {getArticle, getEditor, proofread, copyEdit, techEdit, formatEdit, getBrandingApproval} = wf.proxyActivities<typeof activities>({
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
    let techPub = {};
    if (patched('V3')) {
        const te = await techEdit(await getEditor(), article);

        const pr = await proofread(await getEditor(), article);

        const ce = await copyEdit(await getEditor(), article);

        const fe = await formatEdit(await getEditor(), article);

        const ba = await getBrandingApproval(article);

        if(!ba){
            console.log(`${article} did not get through branding`)
        }
        techPub = {
            startTime,
            techEdit: te,
            proofread: pr,
            copyEdit: ce,
            formatEdit: fe,
            brandingApproval: ba,
            endTime:  new Date(Date.now()).toString()
        }
    }else {
        const te = await techEdit(await getEditor(), article);

        const pr = await proofread(await getEditor(), article);

        const ce = await copyEdit(await getEditor(), article);

        const fe = await formatEdit(await getEditor(), article);

        const ba = await getBrandingApproval(article);

        if(!ba){
            console.log(`${article} did not get through branding`)
        }
        techPub = {
            startTime,
            techEdit: te,
            proofread: pr,
            copyEdit: ce,
            formatEdit: fe,
            brandingApproval: ba,
            endTime: new Date(Date.now()).toString()
        }
    }

    console.log(JSON.stringify(techPub,null, 2));
}


