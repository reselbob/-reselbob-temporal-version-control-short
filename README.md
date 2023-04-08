# temporal-version-control-01
A project that demonstrates how to execute version control on potentially long-running Temporal Workflows

The project emulates a technical publishing workflow that consists of the following activities

- `getArticle()` //returns a string that is an article title
- `proofread(article:string)`
- `techEdit(article:string)`
- `copyEdit(article:string)`
- `formatEdit(article:string)`

The project evolves the workflow scenarios over 5 versions as shown in the illustration below.

![versions](./images/versions-all.jpg)

The [**first version**](https://github.com/reselbob/temporal-version-control-01/tree/V1) has an intermittent error that needs to be fixed. This version is named V1-error. The fixed version that removes the intermittent error is named V1.

The [**V2**]() version modifies the copyEdit activity by adding style checking. Style checking is implemented in a function name checkStyle(editor, article) which is internal to the activity.

The [**V3**](https://github.com/reselbob/temporal-version-control-01/tree/V3) version implements a significant change by altering the sequence in which activities are executed within the workflow. Changing the sequence of activities affects the determinism of the workflow. Thus, special measures need to be taken in how the workflow is programmed in order for the V3 version to run and not throw a fatal error.

The [**V4**](https://github.com/reselbob/temporal-version-control-01/tree/V4) version makes another significant change. It changes the signature of all the activity functions. Activity functions in prior versions of the workflow took two parameters: editor and article, The V4 version takes a new approach and passes a single parameter which is a configuration object. The configuration object has properties for the editor, article and also a new piece of information, the publisher. The name of the publisher is declared as a command line argument when the Temporal client starts the workflow. If no publisher is declared, a default value of Anonymous is assigned as the name of the publisher.
