import { Connection, WorkflowClient } from '@temporalio/client';
import {techPublishingWorkflow} from './workflows';
import { nanoid } from 'nanoid';;
import path from "path";
import fs from "fs";
// dotenv looks for the existence of a .env file that has env var settings.
// if no .env file exists, dotenv look for the environment variables in memory
require('dotenv').config({ path: path.join(__dirname, '../', '.env') })

async function run() {
    //Connect to localhost with default ConnectionOptions.
    const connection = await Connection.connect({});

    const client = new WorkflowClient({
        connection,
    });

    const workflowId = 'workflow-' + nanoid();
    //console.log(`workflowId: ${workflowId}`);

    const handle = await client.start(techPublishingWorkflow, {
        taskQueue: 'technical-publishing',
        cronSchedule: '*/10 * * * *',
        workflowId: workflowId
    });
    console.log(`Started workflow ${handle.workflowId}`);
}



run().catch((err) => {
    console.error(err);
    process.exit(1);
});
