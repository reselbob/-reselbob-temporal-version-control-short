import * as wf from '@temporalio/workflow';
import type * as activities from './activities'

/**
 Get the activities for both the legacy version that takes
 two string parameters int the activity function signature
 and the new version (V4) that passes a configuration object
 to an activity as a single parameter.
 */
const {
    getArticle,
    getEditor,
    proofread,
    copyEdit,
    techEdit,
    formatEdit,
    techEdit_v4,
    proofread_v4,
    copyEdit_v4,
    formatEdit_v4,
} = wf.proxyActivities<typeof activities>({
    startToCloseTimeout: '4 seconds',
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
export async function techPublishingWorkflow(publisher: string): Promise<void> {
    //                 millisec * sec * min
    const sleepPeriod01 = (1000 * 60 * 3)
    const sleepPeriod02 = (1000 * 60 * 1)

    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();
    let editor = '';
    let v = '';
    let pr = '';
    let te = '';
    let ce = ''
    let fe = '';

    if (wf.patched('Release_config_object')) {
        v = 'Release_config_object';

        editor = await getEditor();
        te = await techEdit_v4({editor, article, publisher});

        await wf.sleep(sleepPeriod01);

        editor = await getEditor();
        pr = await proofread_v4({editor, article, publisher});

        await wf.sleep(sleepPeriod02);

        editor = await getEditor();
        ce = await copyEdit_v4({editor, article, publisher});

        editor = await getEditor();
        fe = await formatEdit_v4({editor, article, publisher});

    } else if (wf.patched('Release_activity_reorder')) {
        v = 'Release_activity_reorder';
        te = await techEdit(await getEditor(), article);

        await wf.sleep(sleepPeriod01);

        pr = await proofread(await getEditor(), article);

        await wf.sleep(sleepPeriod02);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    } else {
        v = 'Release_original';
        pr = await proofread(await getEditor(), article);

        await wf.sleep(sleepPeriod01);

        te = await techEdit(await getEditor(), article);

        await wf.sleep(sleepPeriod02);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    }

    const endTime = new Date(Date.now()).toString();

    const techPub = {
        startTime,
        version: v,
        techEdit: te,
        proofread: pr,
        copyEdit: ce,
        formatEdit: fe,
        endTime
    }

    console.log(JSON.stringify(techPub, null, 2));
}
