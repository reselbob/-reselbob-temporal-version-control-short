import * as wf from '@temporalio/workflow';
import type * as activities from './activities'

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

/*
NOTE: The workflow has a delay between the first and second activity
      as defined by the variable sleepPeriod. The delay is injected
      so as to emulate long running workflow behavior.
 */
export async function techPublishingWorkflow(publisher: string): Promise<void> {
    //                 millisec * sec * min
    const sleepPeriod = (1000 * 60 * 5)
    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();
    let editor = '';
    let v = '';
    let pr = '';
    let te = '';
    let ce = ''
    let fe = '';

    if (wf.patched('V-C')) {
        v = 'V-C';

        editor = await getEditor();
        te = await techEdit_v4({editor, article, publisher});

        await wf.sleep(sleepPeriod);

        editor = await getEditor();
        pr = await proofread_v4({editor, article, publisher});

        editor = await getEditor();
        ce = await copyEdit_v4({editor, article, publisher});

        editor = await getEditor();
        fe = await formatEdit_v4({editor, article, publisher});

    } else if (wf.patched('V-B')) {
        v = 'V-B';
        te = await techEdit(await getEditor(), article);

        await wf.sleep(sleepPeriod);

        pr = await proofread(await getEditor(), article);

        ce = await copyEdit(await getEditor(), article);

        fe = await formatEdit(await getEditor(), article);
    } else {
        v = 'V-A';
        pr = await proofread(await getEditor(), article);

        await wf.sleep(sleepPeriod);

        te = await techEdit(await getEditor(), article);

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
