import { makeAutoObservable } from "mobx";
import { RootStore } from "../../../app/root.store";
import { Result } from "../../shared/utils";
import { LogEntry, LogEntryValue } from "./interfaces";
import { LogsApi } from "./logs.api";

export class LogsStore {
  userLogs: LogEntry[] = [];
  logsStats: LogEntry[] = [];

  private rootStore: RootStore;
  private api: LogsApi = new LogsApi();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  async createLogEntry(
    token: string,
    data: LogEntryValue
  ): Promise<Result<string, string>> {
    try {
      await this.api.createLogEntry(token, data);

      this.userLogs.push(data);

      return Result.success("");
    } catch (error) {
      return Result.failure("");
    }
  }

  async getUserLogs(token: string): Promise<Result<string, string>> {
    try {
      this.userLogs = await this.api.getUserLogs(token);

      return Result.success("");
    } catch (error) {
      return Result.failure("");
    }
  }

  async getLogsStats(): Promise<Result<string, string>> {
    try {
      this.logsStats = await this.api.getLogsStats();

      return Result.success("");
    } catch (error) {
      return Result.failure("");
    }
  }
}
