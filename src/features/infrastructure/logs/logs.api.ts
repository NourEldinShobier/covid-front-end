import axios from "axios";
import { apiBaseUrl } from "../../shared/constants";
import { LogEntry, LogEntryValue } from ".";

const resource = "logs";

export class LogsApi {
  async createLogEntry(token: string, data: LogEntryValue): Promise<void> {
    return axios.post(`${apiBaseUrl}/${resource}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  async getUserLogs(token: string): Promise<LogEntry[]> {
    const response = await axios.get(`${apiBaseUrl}/${resource}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  }

  async getLogsStats(): Promise<LogEntry[]> {
    const response = await axios.get(`${apiBaseUrl}/${resource}/stats`);

    return response.data.data;
  }
}
