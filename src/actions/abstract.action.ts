import { Converter } from "src/converter";

export abstract class AbstractAction {
  constructor(protected converter: Converter) {}

  public abstract handle(
    csvFile: string,
    options: {
      token?: boolean | string;
      date?: boolean | string;
    }
  ): Promise<void>;
}
