export abstract class AbstractAction {
  public abstract handle(
    csvFile: string,
    options: {
      token?: boolean | string;
      date?: boolean | string;
    }
  ): Promise<void>;
}
