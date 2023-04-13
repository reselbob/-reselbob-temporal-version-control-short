# temporal-version-control-01
A project that demonstrates how to execute version control on potentially long-running Temporal Workflows

The project emulates a technical publishing workflow that consists of the following activities

- `getArticle()` //returns a string that is an article title
- `getEditor()` //returns a editor to assign to editing task for an article
- `proofread(techEditeditor:string, article:string)`
- `techEdit(techEditeditor:string, article:string)`
- `copyEdit(techEditeditor:string, article:string)`
- `formatEdit(techEditeditor:string, article:string)`

The project gets a title of a random article from the file `./data/data.json` and processes it accordingly.

The workflow will run every 10 minutes.

# Running the demonstration code:

1. Execute `git clone https://github.com/reselbob/temporal-version-control-01.git temporal-version-control`
2. Execute `cd temporal-version-control`
3. Execute `git checkout V1-error`
4. If the Temporal cluster is not running on the local machine, execute `sh ./setup-temporal-server.sh` to run the Temporal Server using Docker Compose.
5. Execute `npm install` to install the dependencies.
6. Execute `npm start` to start the Worker.
7. In another terminal window execute, `cd temporal-version-control && npm run workflow-from-client` to run the Workflow using the Temporal.io Client.
