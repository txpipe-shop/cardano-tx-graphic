import type Konva from "konva";
import type { Vector2d } from "konva/lib/types";
import type {
  IAssets,
  ICertificate,
  IDatum,
  IMetadata,
  IWithdrawal,
  Redeemers,
  RedeemerSpend,
} from ".";

export interface TransactionsBox {
  transactions: IGraphicalTransaction[];
  utxos: UtxoObject;
}

export interface UtxoObject {
  // utxoHash format: `${txHash}#${index}`
  [utxoHash: string]: IGraphicalUtxo;
}

export interface IGraphicalTransaction {
  txHash: string;
  fee: number;
  inputs: IGraphicalUtxo[];
  consumedLines: (Konva.Line | null)[];
  outputs: IGraphicalUtxo[];
  producedLines: (Konva.Line | null)[];
  mints: IAssets[];
  scriptsSuccessful: boolean;
  pos: Vector2d;
  blockHash?: string;
  blockTxIndex?: number;
  blockHeight?: number;
  blockAbsoluteSlot?: number;
  validityStart?: number;
  ttl?: number;
  withdrawals?: IWithdrawal[];
  redeemers?: Redeemers;
  metadata?: IMetadata[];
  certificates?: ICertificate[];
  size: number;
  alias: string;
}

export interface IGraphicalUtxo {
  txHash: string;
  index: number;
  bytes: string;
  address?: Address;
  lovelace: number;
  datum: IDatum | undefined;
  scriptRef?: string;
  assets: Array<IAssets>;
  isReferenceInput: boolean;
  redeemers?: RedeemerSpend;
  pos: Vector2d;
  lines: (Konva.Line | null)[];
  distance: Vector2d;
}

export interface Address {
  bech32: string;
  headerType: string;
  netType: string;
  payment: string;
  kind: "key" | "script";
}
