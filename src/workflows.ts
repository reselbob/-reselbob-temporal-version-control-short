import * as wf from '@temporalio/workflow';
// Only import the activity types
import type * as activities from './activities';

// Get the activities function in order to make them to the workflow.
const {getArticle, getEditor, proofread, copyEdit, techEdit, formatEdit, getBrandingApproval} = wf.proxyActivities<typeof activities>({
    //More info about startToCloseTimeout is here: https://docs.temporal.io/concepts/what-is-a-start-to-close-timeout/
    startToCloseTimeout: '4 seconds',
    retry: {
        backoffCoefficient: 1,
        maximumAttempts: 2,
    }
});

export async function techPublishingWorkflow(publisher: string): Promise<void> {
    const startTime = new Date(Date.now()).toString();
    const article = await getArticle();
    let editor='';
    let techPub = {};
    if(wf.patched('V4')) {
        editor = await getEditor();
        const te = await techEdit({editor, article, publisher});

        editor = await getEditor();
        const pr = await proofread({editor, article, publisher});

        editor = await getEditor();
        const ce = await copyEdit({editor, article, publisher});

        editor = await getEditor();
        const fe = await formatEdit({editor, article, publisher});

        editor = '';
        const ba = await getBrandingApproval({editor, article, publisher});

        if(!ba){
            console.log(`${article} did not get through branding`)
        }

        const endTime = new Date(Date.now()).toString();

        techPub = {
            startTime,
            techEdit: te,
            proofread: pr,
            copyEdit: ce,
            formatEdit: fe,
            brandingApproval: ba,
            endTime
        }
    }
    else if((wf.patched('V3')) ){
        let editor=await getEditor();
        const te = await techEdit({editor, article, publisher});

        editor=await getEditor();
        const pr = await proofread({editor, article, publisher});

        editor=await getEditor();
        const ce = await copyEdit({editor, article, publisher});

        editor=await getEditor();
        const fe = await formatEdit({editor, article, publisher});

        editor=await getEditor();
        const ba = await getBrandingApproval({editor, article, publisher});

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
    }
    else {
        let editor=await getEditor();

        const pr = await proofread({editor, article, publisher});

        editor=await getEditor();
        const te = await techEdit({editor, article, publisher});

        editor=await getEditor();
        const ce = await copyEdit({editor, article, publisher});

        editor=await getEditor();
        const fe = await formatEdit({editor, article, publisher});

        techPub = {
            startTime,
            proofread: pr,
            techEdit: te,
            copyEdit: ce,
            formatEdit: fe,
            endTime: new Date(Date.now()).toString()
        }
    }

    console.log(JSON.stringify(techPub,null, 2));
}


