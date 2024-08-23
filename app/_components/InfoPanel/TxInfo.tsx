"use client";
import { Accordion, AccordionItem, Card } from "@nextui-org/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type ChangeEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Input } from "~/app/_components";
import { GraphicalContext } from "~/app/_contexts";
import {
  DATE_TIME_OPTIONS,
  TX_URL_PARAM,
  getTransaction,
  handleCopy,
  trimString,
} from "~/app/_utils";
import CopyIcon from "~/public/copy.svg";
import { AssetCard } from "./AssetCard";

export const TxInfo = () => {
  const [name, setName] = useState("");
  const { transactions, setTransactionBox } = useContext(GraphicalContext)!;
  const searchParams = useSearchParams();
  const selectedTxHash = searchParams.get(TX_URL_PARAM);
  const selectedTx = getTransaction(transactions)(selectedTxHash || "");

  useEffect(() => {
    const selectedTx = getTransaction(transactions)(selectedTxHash || "");
    setName(selectedTx?.alias || "");
  }, [selectedTxHash, transactions]);

  if (!selectedTx) return null;
  const {
    txHash,
    blockHeight,
    blockAbsoluteSlot,
    fee,
    metadata,
    mint,
    inputsUTXO,
    outputsUTXO,
    blockTimestamp,
  } = selectedTx;

  const totalOutput: bigint = outputsUTXO.reduce((acc, output) => {
    const lovelace = output.assets.find(
      (asset) => asset.assetName === "lovelace",
    );
    if (!lovelace) return acc;

    return acc + BigInt(lovelace.amount);
  }, BigInt(0));

  const msg =
    metadata && metadata["674"] && metadata["674"].msg
      ? metadata["674"].msg
      : "No metadata";

  const txTrim = trimString(txHash || "", 12);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleSave = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.length > 30) {
      toast.error("Alias name must be less than 30 characters");
      return;
    }
    setTransactionBox((prev) => {
      const newTransactions = prev.transactions.map((tx) =>
        tx.txHash === txHash ? { ...tx, alias: name } : tx,
      );

      return { ...prev, transactions: newTransactions };
    });
    toast.success("Transaction alias saved");
  };

  return (
    <Accordion selectionMode="multiple">
      <AccordionItem key="1" title="TxHash">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {txTrim}
          <Image
            src={CopyIcon}
            alt="Copy"
            onClick={handleCopy(txHash)}
            className="cursor-pointer"
          />
        </Card>
      </AccordionItem>
      <AccordionItem key="2" title="Fee">
        <div className="flex flex-col gap-2">
          <AssetCard
            asset={{ assetName: "lovelace", policyId: "", amount: Number(fee) }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="3" title="Block">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {blockHeight}
        </Card>
      </AccordionItem>
      <AccordionItem key="4" title="Slot">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {blockAbsoluteSlot}
        </Card>
      </AccordionItem>
      <AccordionItem key="5" title="Outputs">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {outputsUTXO.length}
        </Card>
      </AccordionItem>
      <AccordionItem key="6" title="Total Output">
        <div className="flex flex-col gap-2">
          <AssetCard
            asset={{ assetName: "lovelace", policyId: "", amount: totalOutput }}
          />
        </div>
      </AccordionItem>
      <AccordionItem key="7" title="Inputs">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {inputsUTXO.length}
        </Card>
      </AccordionItem>
      <AccordionItem key="8" title="Date">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {blockTimestamp
            ? new Date(blockTimestamp * 1000).toLocaleDateString(
                undefined,
                DATE_TIME_OPTIONS,
              )
            : "No date"}
        </Card>
      </AccordionItem>
      <AccordionItem key="9" title="Metadata">
        <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
          {msg}
        </Card>
      </AccordionItem>
      <AccordionItem key="10" title="Minting & Burning">
        <div className="flex flex-col gap-2">
          {mint.length ? (
            mint.map((asset, index) => (
              <AssetCard key={index} asset={asset} isMintBurn />
            ))
          ) : (
            <Card className="flex flex-row justify-between bg-content2 px-5 py-2 shadow-none">
              No minting or burning
            </Card>
          )}
        </div>
      </AccordionItem>
      <AccordionItem key="11" title="Alias" className="m-0">
        <form onSubmit={handleSave} className="flex justify-around">
          <Input
            inputSize="small"
            name="Name your transaction"
            onChange={handleChange}
            value={name}
          />
          <Button type="submit" className="h-10 text-sm">
            Save
          </Button>
        </form>
      </AccordionItem>
    </Accordion>
  );
};
