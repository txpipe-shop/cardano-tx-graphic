import type {
  Assets,
  Certificates,
  Collateral,
  Metadata,
  Utxo,
  Withdrawal,
  Witnesses,
} from "~/napi-pallas";

export interface Redeemers {
  spends: RedeemerSpend[];
  mints: any[];
  withdrawals: any[];
}

export interface RedeemerSpend {
  script_hash: string;
  input: {
    tx_hash: string;
    index: number;
  };
  input_index: number;
  data: Data;
  ex_units: number[]; // memory & steps
}

interface Data {
  json: Record<string, any>;
  bytes: string;
}

export interface ITransaction {
  era: string;
  txHash: string;
  fee: number;
  scriptsSuccessful: boolean;
  inputs: Utxo[];
  referenceInputs: Utxo[];
  outputs: Utxo[];
  mints: Assets[];
  blockHash?: string;
  blockTxIndex?: number;
  blockHeight?: number;
  blockAbsoluteSlot?: number;
  validityStart?: number;
  ttl?: number;
  metadata?: Metadata[];
  withdrawals?: Withdrawal[];
  certificates?: Certificates[];
  collateral?: Collateral;
  witnesses?: Witnesses;
  redeemers?: Redeemers;
  size: number;
}
