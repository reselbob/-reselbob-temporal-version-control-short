import { Connection, WorkflowClient } from '@temporalio/client';
import {techPublishingWorkflow} from './workflows';
import {timings} from "./timings";
import { nanoid } from 'nanoid';

async function run() {
    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const publisher: string = process.argv.slice(2)[0] || "Anonymous";

    const client = new WorkflowClient({
        connection,
    });

    const workflowId = 'workflow-' + nanoid();

    const handle = await client.start(techPublishingWorkflow, {
        taskQueue: 'technical-publishing',
        cronSchedule: timings.cronSchedule,
        workflowId: workflowId,
        args: [publisher],
    });
    console.log(`Started workflow ${handle.workflowId}`);
}



run().catch((err) => {
    console.error(err);
    process.exit(1);
});
