import { makeAutoObservable } from "mobx";
import { RootStore } from "../../../app/root.store";
import { Result } from "../../shared/utils";
import { UserValue } from "./interfaces";
import { UserApi } from "./user.api";

export class UserStore {
  private rootStore: RootStore;
  private api: UserApi = new UserApi();

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;

    makeAutoObservable(this);
  }

  async updateUser(
    token: string,
    data: UserValue
  ): Promise<Result<string, string>> {
    try {
      this.api.updateUser(token, data);

      return Result.success("");
    } catch (error) {
      return Result.failure("");
    }
  }
}
