import * as wf from '@temporalio/workflow';
import type * as activities from './activities';
import {timings} from "./timings";

const {getArticle, getEditor, proofread, copyEdit, techEdit, formatEdit} = wf.proxyActivities<typeof activities>({
    startToCloseTimeout: '60 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts: 2,
    }
});
/**
NOTE: The workflow has a delay between the first and second activity
      as defined by the variable sleepPeriod. The delay is injected
      so as to emulate long running workflow behavior.
 */
export async function techPublishingWorkflow(): Promise<void> {

    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();

    let v = '';
    let pr = '';
    let te = '';
    let ce = ''
    let fe = '';

    if (wf.patched('V3_techEdit_before_proofread')) {
        v = 'Release_activity_reorder';
        te = await techEdit(await getEditor(), article);

        await wf.sleep(timings.sleepPeriod01);

        pr = await proofread(await getEditor(), article);

        await wf.sleep(timings.sleepPeriod02);

        ce = await copyEdit(await getEditor(), article);
    
        fe = await formatEdit(await getEditor(), article);
    } else {
        v = 'Release_original';
        pr = await proofread(await getEditor(), article);

        await wf.sleep(timings.sleepPeriod01);

        te = await techEdit(await getEditor(), article);

        await wf.sleep(timings.sleepPeriod02);

        ce = await copyEdit(await getEditor(), article);
    
        fe = await formatEdit(await getEditor(), article);
    }

    const techPub = {
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
