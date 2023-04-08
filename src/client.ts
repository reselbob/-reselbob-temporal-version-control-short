import { Connection, WorkflowClient } from '@temporalio/client';
import {techPublishingWorkflow} from './workflows';
import {timings} from "./timings";
import { nanoid } from 'nanoid';

async function run() {
    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const client = new WorkflowClient({
        connection,
    });

    const workflowId = 'workflow-v2-' + nanoid();

    const handle = await client.start(techPublishingWorkflow, {
        taskQueue: 'technical-publishing',
        cronSchedule: timings.cronSchedule,
        workflowId: workflowId
    });
    console.log(`Started workflow ${handle.workflowId} at ${new Date(Date.now()).toString()}`);
}



run().catch((err) => {
    console.error(err);
    process.exit(1);
});
