import { AbstractAction } from "./abstract.action";

export class DateAction extends AbstractAction {
  handle(
    csvFile: string,
    options: { token?: boolean | string; date?: boolean | string }
  ): Promise<void> {
    return Promise.resolve(undefined);
  }
}
