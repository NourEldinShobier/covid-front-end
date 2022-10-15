import { createContext, useContext } from "react";
import { LogsStore } from "../features/infrastructure/logs";
import { UserStore } from "../features/infrastructure/user";

export class RootStore {
  logsStore: LogsStore;
  userStore: UserStore;

  constructor() {
    this.logsStore = new LogsStore(this);
    this.userStore = new UserStore(this);
  }
}

const StoresContext = createContext(new RootStore());

export const useStores = () => useContext(StoresContext);
