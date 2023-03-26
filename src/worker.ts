/***************************
 Code for the Version 1 Worker
 ****************************/
import { Worker } from '@temporalio/worker';
import * as activities from './activities';

async function run() {
//Set up a worker that listens on the taskQueue named technical-publishing
    const worker = await Worker.create({
        workflowsPath: require.resolve('./workflows'),
        activities,
        taskQueue: 'technical-publishing',
    });

    await worker.run();
}

// Set up error handling behavior
run().catch((err) => {
    console.error(err);
    process.exit(1);
});
