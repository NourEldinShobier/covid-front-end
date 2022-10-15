import axios from "axios";
import { apiBaseUrl } from "../../shared/constants";
import { UserValue } from ".";

const resource = "users";

export class UserApi {
  async updateUser(token: string, data: UserValue): Promise<void> {
    return axios.patch(`${apiBaseUrl}/${resource}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}
