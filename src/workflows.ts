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

export async function techPublishingWorkflow(publisher: string): Promise<void> {
    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();
    let editor = '';
    let v = '';
    let pr = '';
    let te = '';
    let ce = ''
    let fe = '';
    let techPub = {};
    if (wf.patched('V4')) {
        v = 'V4';

        editor = await getEditor();
        te = await techEdit_v4({editor, article, publisher});
        //             millisec * sec * min
        await wf.sleep(1000 * 60 * 5);
        editor = await getEditor();
        pr = await proofread_v4({editor, article, publisher});

        editor = await getEditor();
        ce = await copyEdit_v4({editor, article, publisher});

        editor = await getEditor();
        fe = await formatEdit_v4({editor, article, publisher});

    }
    if (wf.patched('V3')) {
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

    const endTime = new Date(Date.now()).toString();

    techPub = {
        startTime,
        techEdit: te,
        proofread: pr,
        copyEdit: ce,
        formatEdit: fe,
        endTime
    }

    console.log(JSON.stringify(techPub, null, 2));
}
