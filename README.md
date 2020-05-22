# vscode-code-review

[![VSCode Marketplace](https://vsmarketplacebadge.apphb.com/version/d-koppenhagen.vscode-code-review.svg)](https://marketplace.visualstudio.com/items?itemName=d-koppenhagen.vscode-code-review)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)
[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

This extension allows you to create a code review file you can hand over to a customer.

## Features

### create review notes

Simply right click somewhere in the opened file and choose the option "Code Review: Add Note".
You will be prompted for your note you wanna add.
A file `code-review.csv` will be created containing your comments and the file and line references.

The result will look like this:

```csv
sha,filename,url,lines,title,comment,priority,additional
"b45d2822d6c87770af520d7e2acc49155f0b4362","/test/a.txt","https://github.com/d-koppenhagen/vscode-code-review/tree/b45d2822d6c87770af520d7e2acc49155f0b4362/test/a.txt","1:2-4:3","foo","this should be refactored",1,"see http://foo.bar"
"b45d2822d6c87770af520d7e2acc49155f0b4362","/test/b.txt","https://github.com/d-koppenhagen/vscode-code-review/tree/b45d2822d6c87770af520d7e2acc49155f0b4362/test/b.txt","1:0-1:4|4:0-4:3","bar","wrong format",1,""
```

The line column indicates an array of selected ranges or cursor positions separated by a `|` sign.
E.g. `"1:0-1:4|4:0-4:3"` means that the comment is related to the range marked from line 1 position 0 to line 1 position 4 and line 4 position 0 to line 4 position 3.

![Demo](./images/demo.gif)

### export created notes as HTML

Once you finished your review and added your notes, you can export the results as an HTML report.
Therefore open the [VSCode Command Palette](https://code.visualstudio.com/docs/getstarted/tips-and-tricks#_command-palette) (macOS: ⇧+⌘+P, others: ⇧+Ctrl+P) and search for "Code Review":

![Code Review: Export as HTML](./images/export.png)

#### Default template

When you choose to generate the report using the default template, it will look like this in the end:

![Code Review HTML Export: Default Template](./images/default-template.png)

#### Custom handlebars template

You can also choose to export the HTML report by using a custom [Handlebars](https://handlebarsjs.com/) template.
One you choose this option you cot prompted to choose the template file (file extension must be either `*.hbs`, `*.handlebars`, `*.html` or `*.htm`)

![Code Review HTML Export: Use a custom Handlebars template](./images/template.png)

The used structure to fill the template placholders is an array of [`ReviewFileExportSection`](https://github.com/d-koppenhagen/vscode-code-review/blob/master/src/interfaces.ts#L31-L44).

Check out the example template file 
[`template.example.hbs`](https://github.com/d-koppenhagen/vscode-code-review/blob/master/template.example.hbs), to see how your template should basically look like.

## Extension Settings

The following settings can be adjusted via the configuration file `.vscode/settings.json` or globally when configuring vscode.
The listing below shows the default configuration:

```json
{
  // filename will lead into "code-review.csv"
  "code-review.filename": "code-review",
  // CSV column "url" will contain the remote link like this: "https://github.com/foo/bar/tree/e023a1831a3d5299407cac4379e83df07b383475/foo/bar.txt
  // If the project is not a git project, the SHA is empty (e.g. "code-review.baseUrl": "https://my-url/" => will become: "https://my-url/foo/bar.txt)
  "code-review.baseUrl": "https://github.com/foo/bar/tree/"
}
```

## Keybindings

To easily add a *new* comment, you can use the keybinding combination `ctrl` + ⇧ + `n`.

**Enjoy!**
