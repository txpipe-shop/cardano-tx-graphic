"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
} from "react";
import { useLocalStorage } from "../_hooks/useLocalStorage";
import { NETWORK } from "../_utils";

export interface IUserConfigs {
  net: NETWORK;
}

export const CONFIG_KEYS = {
  NET: "net",
} as const;

const LOCAL_STORAGE_KEYS = {
  USER_CONFIGS: "userConfigs",
} as const;

export const ConfigsContext = createContext({
  configs: {} as IUserConfigs,
  updateConfigs: <T extends keyof IUserConfigs>(
    configKey: T,
    value: IUserConfigs[T],
  ) => {},
});

export const useConfigs = () => {
  const context = useContext(ConfigsContext);
  if (!context)
    throw new Error("useConfigs must be used within a ConfigsProvider");
  return context;
};

export const ConfigsProvider = ({ children }: { children: ReactNode }) => {
  const initialState: IUserConfigs = {
    net: NETWORK.MAINNET,
  };
  const [configs, setConfigs] = useLocalStorage({
    key: LOCAL_STORAGE_KEYS.USER_CONFIGS,
    initialState,
  }) as [IUserConfigs, Dispatch<SetStateAction<IUserConfigs>>];

  const updateConfigs = <T extends keyof IUserConfigs>(
    configKey: T,
    value: IUserConfigs[T],
  ) => {
    setConfigs({ ...configs, [configKey]: value });
  };

  return (
    <ConfigsContext.Provider value={{ configs, updateConfigs }}>
      {children}
    </ConfigsContext.Provider>
  );
};
