import { CancellationToken, CodeLens, CodeLensProvider, Range, TextDocument, Command } from 'vscode';
import { ExportFactory } from './export-factory';
import { ReviewFileExportSection } from './interfaces';
import { CsvEntry } from './model';
import { symbolForPriority } from './utils/editor-utils';
import { rangesFromStringDefinition } from './utils/workspace-util';

export class CommentLensProvider implements CodeLensProvider {
  constructor(private exportFactory: ExportFactory) {}

  public provideCodeLenses(document: TextDocument, token: CancellationToken): CodeLens[] | Thenable<CodeLens[]> {
    return this.exportFactory.getFilesContainingComments().then((filesWithComments) => {
      const codeLenses: CodeLens[] = [];
      filesWithComments.forEach((el) => {
        if (document.fileName.endsWith(el.data.group)) {
          el.data.lines.forEach((csvEntry) => {
            const fileSection: ReviewFileExportSection = {
              group: csvEntry.filename,
              lines: el.data.lines,
            };
            const csvRef: CsvEntry | undefined = csvEntry;
            const prio = Number(csvEntry.priority); // be sure the value is a number
            const solved = Number(csvEntry.solved);
            const priorityString = prio
              ? ` | Priority: ${csvEntry.priority}${symbolForPriority(Number(csvEntry.priority))}`
              : '';
            const command: Command = {
              title: `Code Review: ${solved === 1 ? '✔ ' : ''}${csvEntry.title}${priorityString}`,
              tooltip: csvEntry.comment,
              command: 'codeReview.openSelection',
              arguments: [fileSection, csvRef],
            };

            rangesFromStringDefinition(csvEntry.lines).forEach((range: Range) => {
              codeLenses.push(new CodeLens(range, command));
            });
          });
        }
      });
      return codeLenses;
    });
  }
  // public resolveCodeLens?(codeLens: CodeLens, token: CancellationToken): CodeLens | Thenable<CodeLens> {
  //   return new CodeLens(new Range(new Position(0, 0), new Position(1, 2)));
  // }
}
